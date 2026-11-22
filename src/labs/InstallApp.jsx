import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * 「홈 화면에 추가」 단추 (Labs 허브 푸터).
 *
 * · 안드로이드 크롬처럼 설치 창을 띄울 수 있는 브라우저에서는 누르면 바로 설치 창이 뜬다.
 * · 아이폰 사파리처럼 그게 안 되는 브라우저에서는 누르는 순서를 안내한다.
 * · 이미 홈 화면 아이콘으로 연 경우(standalone)에는 아무것도 그리지 않는다.
 *
 * 이 사이트에는 서비스워커가 없다. 그래서 추가해도 인터넷이 있어야 열린다.
 * 안내 문구도 그렇게 적는다(없는 기능을 적지 않는다).
 */
function isStandalone() {
  if (typeof window === 'undefined') return false;
  return (
    (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    window.navigator.standalone === true
  );
}

function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPhone|iPad|iPod/.test(navigator.userAgent || '') ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

const InstallApp = () => {
  const [hidden, setHidden] = useState(isStandalone);
  const [open, setOpen] = useState(false);
  const [ios] = useState(isIOS);
  const deferred = useRef(null);

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      deferred.current = e;
    };
    const onInstalled = () => {
      deferred.current = null;
      setOpen(false);
      setHidden(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (hidden) return null;

  const onClick = async () => {
    const prompt = deferred.current;
    if (!prompt) {
      setOpen(true);
      return;
    }
    deferred.current = null;
    try {
      await prompt.prompt();
    } catch {
      // 설치 창을 못 띄웠으면 순서 안내로 대신한다.
      setOpen(true);
    }
  };

  return (
    <>
      <button type="button" className="lab-install" onClick={onClick}>
        홈 화면에 추가
      </button>

      {/* 허브는 들어올 때 transform 애니메이션을 쓴다. 그 안에서는 position: fixed 가 화면이 아니라
          허브 상자에 붙는다. 그래서 안내 창은 body 로 내보내고, 토큰을 쓰려고 .lab-surface 를 같이 단다. */}
      {open && createPortal(
        <div
          className="lab-surface lab-install-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lab-install-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="lab-install-card">
            <div className="lab-install-head">
              <img src="/icon-192.png" alt="" width="52" height="52" />
              <p id="lab-install-title" className="lab-install-title">
                GIJO Tour LaB 홈 화면에 추가
              </p>
            </div>
            {ios ? (
              <ol className="lab-install-steps">
                <li>
                  사파리 아래쪽 <b>공유</b> 단추(네모에서 화살표가 올라가는 모양)를 누릅니다.
                </li>
                <li>
                  <b>홈 화면에 추가</b>를 누릅니다.
                </li>
                <li>
                  오른쪽 위 <b>추가</b>를 누릅니다.
                </li>
              </ol>
            ) : (
              <ol className="lab-install-steps">
                <li>
                  브라우저 오른쪽 위 <b>메뉴(⋮)</b>를 누릅니다.
                </li>
                <li>
                  <b>앱 설치</b> 또는 <b>홈 화면에 추가</b>를 누릅니다.
                </li>
                <li>
                  <b>설치</b>를 누릅니다.
                </li>
              </ol>
            )}
            <p className="lab-install-note">
              추가해 두면 홈 화면 아이콘으로 바로 열립니다. 인터넷이 연결돼 있어야 열립니다.
              {ios ? ' 아이폰에서는 사파리로 열어야 추가할 수 있습니다.' : ''}
            </p>
            <button type="button" className="lab-install-close" onClick={() => setOpen(false)}>
              닫기
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default InstallApp;
