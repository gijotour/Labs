import { TOUR_DEMO } from './demo';

/** 고객 화면 맨 위의 「체험판」 띠. 무엇이 예시이고 무엇이 아직 안 되는지 한 줄로 밝힌다. */
const DemoNotice = () => {
  if (!TOUR_DEMO) return null;
  return (
    <div className="t-demo" role="note">
      <div className="t-demo__inner">
        <strong className="t-demo__tag">체험판</strong>
        <span className="t-demo__long">
          설계사·후기·가격·공지·영상은 예시입니다. 상담 신청·결제·파트너 로그인은 아직 열지 않았습니다.
        </span>
        {/* 폰에서는 긴 문장이 세 줄이 되어 화면 위쪽을 많이 차지한다. 같은 뜻을 짧게 쓴다. */}
        <span className="t-demo__short">내용은 예시이고, 신청·결제·로그인은 아직 안 됩니다.</span>
      </div>

      <style>{`
        /* 이 띠는 .tour-surface 밖(내비 바로 아래)에 놓여 토큰을 못 받는다. Navbar 처럼 값을 직접 쓴다. */
        .t-demo {
          background: #1a2333;
          border-bottom: 1px solid rgba(53, 214, 255, 0.32);
          color: #b6c2d2;
          font-size: 0.8125rem;
          line-height: 1.5;
        }
        .t-demo__inner {
          width: min(1180px, calc(100% - 3rem));
          margin: 0 auto;
          padding: 0.625rem 0;
          display: flex;
          gap: 0.625rem;
          align-items: baseline;
          word-break: keep-all;
        }
        .t-demo__tag {
          flex-shrink: 0;
          padding: 0.125rem 0.5rem;
          border-radius: 999px;
          background: rgba(53, 214, 255, 0.12);
          color: #35d6ff;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .t-demo__short { display: none; }
        /* 폰에서는 글자와 여백을 줄이고 짧은 문장을 쓴다. */
        @media (max-width: 600px) {
          .t-demo { font-size: 0.75rem; line-height: 1.4; }
          .t-demo__inner { width: calc(100% - 2rem); padding: 0.4375rem 0; gap: 0.5rem; }
          .t-demo__tag { font-size: 0.6875rem; padding: 0.0625rem 0.4375rem; }
          .t-demo__long { display: none; }
          .t-demo__short { display: inline; }
        }
      `}</style>
    </div>
  );
};

export default DemoNotice;
