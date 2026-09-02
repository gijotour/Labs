#!/usr/bin/env python3
"""빌드된 CSS 의 최종 계산값 스냅샷.

왜 필요한가.
  CLAUDE.md 는 CSS 를 고치면 "빌드 산출물을 바이트 대조"하라고 적어 두었다.
  그건 index.css 를 순서 보존 분할할 때 쓴 방법이고, 규칙을 실제로 **병합**하면
  바이트는 당연히 달라진다. 그때 필요한 증명은 "바이트가 같다"가 아니라
  "요소가 받는 최종 선언이 같다"이다.

무엇을 하는가.
  dist/assets/*.css 를 index.html 의 <link> 순서대로 읽어
  (미디어 컨텍스트, 요소 모양) 별로 캐스케이드를 풀어 최종 선언 맵을 만든다.

  요소 모양 = 셀렉터의 주어(마지막 복합 셀렉터). 예: `.a .b:hover` 의 주어는 `.b:hover`.
  어떤 규칙이 그 모양에 적용되는지는 "주어의 단순 셀렉터 집합이 모양의 부분집합인가"로 본다.
  조상 조건(`.a `)은 무시하므로 실제보다 넓게 잡힌다. 절대값을 믿는 도구가 아니라
  **리팩터 전후 diff 가 비어 있는지**를 보는 도구라 과대 추정은 양쪽에 똑같이 걸린다.

사용:
  python scripts/css_cascade_snapshot.py > before.json
  (리팩터)
  python scripts/css_cascade_snapshot.py > after.json
  diff before.json after.json      # 비어 있어야 한다
"""
import json
import pathlib
import re
import sys

DIST = pathlib.Path('dist')


def link_order():
    """index.html 이 정한 스타일시트 순서. 순서가 곧 캐스케이드다."""
    html = (DIST / 'index.html').read_text(encoding='utf-8')
    eager = re.findall(r'<link rel="stylesheet"[^>]*href="/(assets/[^"]+\.css)"', html)
    rest = sorted(
        p.as_posix()[len('dist/'):]
        for p in DIST.glob('assets/*.css')
        if p.as_posix()[len('dist/'):] not in eager
    )
    # 지연 로드 청크는 진입 스타일 뒤에 붙는다 (런타임에 <link> 가 뒤에 추가되므로)
    return eager + rest


def strip_comments(text):
    return re.sub(r'/\*.*?\*/', '', text, flags=re.S)


def parse(text, source):
    """중첩(@media)을 포함해 규칙을 순서대로 뽑는다."""
    text = strip_comments(text)
    rules, stack, buf, i = [], [], '', 0

    def flush(stack, buf):
        decl = buf.strip()
        if ':' not in decl:
            return
        prop, _, val = decl.partition(':')
        prop = prop.strip().lower()
        if not prop or prop.startswith('@'):
            return
        media = ' && '.join(h for k, h in stack[:-1] if k == 'at')
        rules.append((len(rules), source, media, stack[-1][1], prop, val.strip()))

    while i < len(text):
        ch = text[i]
        if ch == '{':
            head = ' '.join(buf.split())
            buf = ''
            if head.startswith('@'):
                stack.append(('at', head))
            else:
                stack.append(('rule', head))
            i += 1
            continue
        if ch == '}':
            # Vite 최소화 CSS 는 블록 마지막 선언의 세미콜론을 지운다(.a{color:red}).
            # 여기서 흘려보내면 블록마다 선언 하나씩을 통째로 놓친다.
            if stack and stack[-1][0] == 'rule':
                flush(stack, buf)
            if stack:
                stack.pop()
            buf = ''
            i += 1
            continue
        if ch == ';' and stack and stack[-1][0] == 'rule':
            flush(stack, buf)
            buf = ''
            i += 1
            continue
        buf += ch
        i += 1
    return rules


COMPOUND = re.compile(r'(::?[\w-]+(?:\([^)]*\))?|[.#][\w-]+|\[[^\]]*\]|^[\w*-]+|(?<=[\s>+~])[\w*-]+)')


def subject(selector):
    """마지막 복합 셀렉터(주어)를 단순 셀렉터 집합으로."""
    last = re.split(r'\s*[\s>+~]\s*', selector.strip())[-1]
    parts = COMPOUND.findall(last)
    return frozenset(p for p in parts if p)


def specificity(selector):
    last = selector
    a = len(re.findall(r'#[\w-]+', last))
    b = len(re.findall(r'\.[\w-]+', last)) + len(re.findall(r'\[[^\]]*\]', last)) \
        + len(re.findall(r'(?<!:):(?!:)(?!hover|focus|active|visited|first-child|last-child|not)[\w-]+', last)) \
        + len(re.findall(r':(?:hover|focus|active|visited|first-child|last-child)', last))
    c = len(re.findall(r'(?:^|[\s>+~])([a-z][\w-]*)', last))
    return (a, b, c)


def main():
    rules = []
    for rel in link_order():
        p = DIST / rel
        # 파일명 해시는 내용이 바뀌면 달라지므로 스냅샷 키에서 뺀다
        name = re.sub(r'-[A-Za-z0-9_-]{8,}\.css$', '.css', rel)
        rules.extend(parse(p.read_text(encoding='utf-8'), name))

    # 모양 우주: 등장하는 모든 주어 집합
    shapes = set()
    for _, _, _, sel, _, _ in rules:
        for s in sel.split(','):
            if s.strip():
                shapes.add(subject(s))
    shapes.discard(frozenset())

    snapshot = {}
    for shape in shapes:
        winners = {}
        for order, src, media, sel, prop, val in rules:
            for s in sel.split(','):
                s = s.strip()
                if not s:
                    continue
                sub = subject(s)
                if not sub or not sub.issubset(shape):
                    continue
                important = val.rstrip().endswith('!important')
                key = (media, prop)
                rank = (important, specificity(s), order)
                cur = winners.get(key)
                if cur is None or rank > cur[0]:
                    winners[key] = (rank, val, src, s)
                break
        if not winners:
            continue
        name = ''.join(sorted(shape))
        snapshot[name] = {
            f'{m}|{p}' if m else p: f'{v}   <- {sel} ({src})'
            for (m, p), (_, v, src, sel) in sorted(winners.items())
        }

    # Windows 콘솔이 cp949 라 stdout 인코딩을 강제하지 않으면 CSS content 의
    # 유니코드 기호(✦ 등)에서 죽는다.
    sys.stdout.reconfigure(encoding='utf-8')
    json.dump(snapshot, sys.stdout, ensure_ascii=False, indent=1, sort_keys=True)


if __name__ == '__main__':
    main()
