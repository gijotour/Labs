import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const GijoLab = () => {
  const navigate = useNavigate();
  const onEnterApp = () => navigate('/gijotour');

  const logo = logoImg;

  return (
    <div className="lab-hub-wrapper page-fade-in">
      {/* 폰트 임포트 */}
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Syncopate:wght@700&display=swap" rel="stylesheet" />
      
      <div className="hub-background">
        <div className="hub-mesh hub-mesh-1"></div>
        <div className="hub-mesh hub-mesh-2"></div>
        <div className="hub-mesh hub-mesh-3"></div>
      </div>

      <div className="container hub-container">
        <div
          className="hub-top-banner animate-up"
          onClick={() => window.open('https://gijo.ai', '_blank', 'noopener,noreferrer')}
        >
          <div className="hub-top-banner-content">
            <div className="hub-top-banner-badge">MAIN SECURITY SYSTEM</div>
            <h2 className="hub-top-banner-title">GIJO.AI</h2>
            <p className="hub-top-banner-desc">글로벌 인텔리전스 보안 시스템 유통</p>
          </div>
          <div className="hub-top-banner-cta">
            <span>VISIT SITE</span>
            <span className="hub-arrow">→</span>
          </div>
        </div>

        <header className="hub-header animate-up">
          <div className="hub-logo-wrap">
            <img src={logo} alt="GIJO Labs" className="hub-logo-img" />
            <h1 className="logo-text hub-logo-text">GIJO Labs</h1>
          </div>
          <p className="hub-subtitle">Advanced Travel Technology & Innovation</p>
          
          <div className="dev-news-container">
            {/* 뉴스 1: GIJO AS 보안 관제 제품 실시간 개발 진행 중 */}
            <div className="dev-news-banner banner-cyan">
              <div className="news-badge spec-badge-news">SPEC ACTIVE</div>
              <div className="news-ticker">
                <span className="pulse-dot-cyan"></span>
                <span className="news-text">
                  <strong>GIJO AS (보안전문담당자용 보안 툴)</strong> 보안 관제 제품 실시간 개발 진행 중
                </span>
              </div>
            </div>

            {/* 뉴스 2: 지아이조 투어 슬로건 */}
            <div className="dev-news-banner banner-red">
              <div className="news-badge">LIVE NEWS</div>
              <div className="news-ticker">
                <span className="pulse-dot-red"></span>
                <span className="news-text">
                  <strong>지아이조 투어</strong> "검증된 현지 전문가와 함께하는 실패 없는 맞춤형 여정" 서비스 활성화 중
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="hub-selection-grid">
          {/* Main Entry: GIJO TOUR (지아지조 -> 지아이조 오타 정정) */}
          <div className="hub-card flagship animate-up delay-1" onClick={onEnterApp}>
            <div className="hub-card-content">
              <div className="hub-card-badge">FLAGSHIP PROJECT</div>
              <h2 className="hub-card-title">지아이조 투어</h2>
              <p className="hub-card-desc">
                전문 여행설계사와 비즈니스를 연결하는 <br />
                하이엔드 B2B 투어 플랫폼
              </p>
              <div className="hub-card-footer">
                <span className="hub-cta">ENTER PORTAL</span>
                <span className="hub-arrow">→</span>
              </div>
            </div>
            <div className="hub-card-bg-glow"></div>
          </div>

          {/* Secondary Entries: GIJO Security */}
          <div className="hub-card card-security animate-up delay-2" onClick={() => navigate('/security')}>
            <div className="hub-card-content">
              <div className="hub-card-badge badge-security">ACTIVE RESEARCH</div>
              <h2 className="hub-card-title">GIJO SECURITY</h2>
              <p className="hub-card-desc">
                Kali Linux 및 로컬 LLM 기반 <br />
                지속적 내부 자산 취약점 관리 시스템
              </p>
              <div className="hub-card-footer footer-security">
                <span className="hub-cta">OPEN PLANNING</span>
                <span className="hub-arrow">→</span>
              </div>
            </div>
            <div className="hub-card-bg-glow glow-security"></div>
          </div>

          {/* Tertiary Entries: GIJO LOCAL LLM */}
          <div className="hub-card card-llm animate-up delay-3" onClick={() => navigate('/llm')}>
            <div className="hub-card-content">
              <div className="hub-card-badge badge-llm">ACTIVE RESEARCH</div>
              <h2 className="hub-card-title">GIJO LOCAL LLM</h2>
              <p className="hub-card-desc">
                Gemma 3/4 및 Ollama 기반 <br />
                오프라인 보안 AI Copilot 구축 계획
              </p>
              <div className="hub-card-footer footer-llm">
                <span className="hub-cta">OPEN PLANNING</span>
                <span className="hub-arrow">→</span>
              </div>
            </div>
            <div className="hub-card-bg-glow glow-llm"></div>
          </div>

          {/* Notion Research Notes */}
          <div
            className="hub-card card-notion animate-up delay-4"
            onClick={() => window.open('https://app.notion.com/p/394c101e9b2081488281dad0ab1e308d', '_blank', 'noopener,noreferrer')}
          >
            <div className="hub-card-content">
              <div className="hub-card-badge badge-notion">RESEARCH NOTES</div>
              <h2 className="hub-card-title">GIJO 연구노트</h2>
              <p className="hub-card-desc">
                프로젝트 리서치와 아이디어를 기록하는 <br />
                노션 워크스페이스
              </p>
              <div className="hub-card-footer footer-notion">
                <span className="hub-cta">OPEN NOTION</span>
                <span className="hub-arrow">→</span>
              </div>
            </div>
            <div className="hub-card-bg-glow glow-notion"></div>
          </div>
        </div>

        <footer className="hub-footer animate-up delay-5">
          <p>© 2026 GIJO Labs. All projects are part of the GIJO Ecosystem.</p>
          <div className="gijo-game-launcher" title="GIJO Drink Party Game 실행" onClick={() => window.open('/GIJO_Drink_v3_0_1.html', '_blank')}>
            <div className="game-icon-glow">🎮</div>
            <span>GIJO GAME</span>
          </div>
        </footer>
      </div>

      <style>{`
        /* 개발 상태 뉴스 컨테이너 & 배너들 */
        .dev-news-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 800px;
          margin: 2.2rem auto 0;
          width: 100%;
        }
        .dev-news-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 18px;
          border-radius: 12px;
          width: 100%;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
          text-align: left;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        
        /* 배너 색상 클래스별 스타일링 */
        .banner-red {
          background: rgba(255, 45, 85, 0.02);
          border: 1px solid rgba(255, 45, 85, 0.08);
        }
        .banner-red:hover {
          border-color: rgba(255, 45, 85, 0.25);
          background: rgba(255, 45, 85, 0.04);
        }
        .banner-red .news-text strong {
          color: #ff2d55;
          font-weight: 800;
        }

        .banner-cyan {
          background: rgba(0, 210, 255, 0.02);
          border: 1px solid rgba(0, 210, 255, 0.08);
        }
        .banner-cyan:hover {
          border-color: rgba(0, 210, 255, 0.25);
          background: rgba(0, 210, 255, 0.04);
        }
        .banner-cyan .news-text strong {
          color: #00d2ff;
          font-weight: 800;
        }

        .news-badge {
          background: #ff2d55;
          color: white;
          padding: 4px 8px;
          font-size: 0.68rem;
          font-weight: 900;
          border-radius: 4px;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 0 0 10px rgba(255, 45, 85, 0.3);
          animation: badgeBlink 2.5s infinite ease-in-out;
          flex-shrink: 0;
        }
        .spec-badge-news {
          background: #00d2ff !important;
          box-shadow: 0 0 10px rgba(0, 210, 255, 0.3) !important;
        }
        @keyframes badgeBlink {
          0% { opacity: 0.85; }
          50% { opacity: 1; filter: brightness(1.15); }
          100% { opacity: 0.85; }
        }
        .news-ticker {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #f3f4f6;
          font-weight: 600;
          letter-spacing: 0.2px;
        }
        .pulse-dot-red {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ff2d55;
          box-shadow: 0 0 8px #ff2d55;
          animation: pulseRed 1.8s infinite ease-in-out;
          flex-shrink: 0;
        }
        .pulse-dot-cyan {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00d2ff;
          box-shadow: 0 0 8px #00d2ff;
          animation: pulseCyan 1.8s infinite ease-in-out;
          flex-shrink: 0;
        }
        @keyframes pulseRed {
          0% { transform: scale(0.85); opacity: 0.5; }
          50% { transform: scale(1.25); opacity: 1; box-shadow: 0 0 12px #ff2d55; }
          100% { transform: scale(0.85); opacity: 0.5; }
        }
        @keyframes pulseCyan {
          0% { transform: scale(0.85); opacity: 0.5; }
          50% { transform: scale(1.25); opacity: 1; box-shadow: 0 0 12px #00d2ff; }
          100% { transform: scale(0.85); opacity: 0.5; }
        }

        /* 글로벌 Outfit 폰트 지정 */
        .lab-hub-wrapper {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
          min-height: 100vh;
          background: #030508;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .hub-background {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
        }
        .hub-mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(160px);
          opacity: 0.12;
          animation: floatGlow 12s infinite alternate ease-in-out;
        }
        .hub-mesh-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, #00d2ff 0%, transparent 80%);
          top: -20%; left: -10%;
          animation-delay: 0s;
        }
        .hub-mesh-2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #9b51e0 0%, transparent 80%);
          bottom: -15%; right: -10%;
          animation-delay: 3s;
        }
        .hub-mesh-3 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #ff2d55 0%, transparent 80%);
          top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.06;
          animation-duration: 18s;
        }
        @keyframes floatGlow {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(40px) scale(1.1); }
        }
        
        .hub-container {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 5rem 2rem;
          max-width: 1200px;
          width: 100%;
        }
        
        .hub-top-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto 4rem;
          padding: 1.5rem 2.5rem;
          background: rgba(255, 45, 85, 0.04);
          border: 1px solid rgba(255, 45, 85, 0.2);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          text-align: left;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hub-top-banner:hover {
          background: rgba(255, 45, 85, 0.1);
          border-color: rgba(255, 45, 85, 0.5);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(255, 45, 85, 0.08);
        }
        .hub-top-banner-badge {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(255, 45, 85, 0.12);
          border: 1px solid rgba(255, 45, 85, 0.25);
          color: #ff2d55;
          border-radius: 50px;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 0.75rem;
        }
        .hub-top-banner-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin: 0 0 0.25rem;
          letter-spacing: 0.5px;
        }
        .hub-top-banner-desc {
          font-size: 0.95rem;
          opacity: 0.6;
          margin: 0;
        }
        .hub-top-banner-cta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #ff2d55;
          font-weight: 700;
          letter-spacing: 1.5px;
          white-space: nowrap;
          font-size: 0.85rem;
        }
        .hub-top-banner:hover .hub-arrow {
          transform: translateX(8px);
        }

        .hub-header {
          margin-bottom: 4.5rem;
        }
        .hub-logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1rem;
        }
        .hub-logo-img {
          width: 120px;
          filter: drop-shadow(0 0 25px rgba(0, 210, 255, 0.35));
          transition: transform 0.8s ease;
        }
        .hub-logo-wrap:hover .hub-logo-img {
          transform: rotate(360deg);
        }
        .hub-logo-text {
          font-family: 'Syncopate', sans-serif;
          font-size: 3rem;
          font-weight: 700;
          letter-spacing: -1px;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 40%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hub-subtitle {
          font-size: 0.95rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          opacity: 0.4;
          font-weight: 600;
          margin-left: 0.4em;
        }
        .hub-slogan {
          font-size: 1.15rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          margin-top: 1.8rem;
          margin-bottom: 0;
          letter-spacing: 0.5px;
          background: linear-gradient(135deg, #ffffff 60%, #a5b4fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-style: italic;
          opacity: 0.9;
        }

        .hub-selection-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .hub-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 28px;
          padding: 3.5rem 2.5rem;
          text-align: left;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        /* 플래그십 카드 (지아이조 투어) */
        .hub-card.flagship {
          background: rgba(0, 210, 255, 0.02);
          border-color: rgba(0, 210, 255, 0.15);
        }
        .hub-card.flagship:hover {
          border-color: rgba(0, 210, 255, 0.6);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 210, 255, 0.15);
          background: rgba(0, 210, 255, 0.04);
        }
        .hub-card.flagship .hub-card-bg-glow {
          background: radial-gradient(circle at 80% 20%, rgba(0, 210, 255, 0.15) 0%, transparent 60%);
        }

        /* 보안 카드 */
        .hub-card.card-security {
          background: rgba(39, 174, 96, 0.02);
          border-color: rgba(39, 174, 96, 0.15);
        }
        .hub-card.card-security:hover {
          border-color: rgba(39, 174, 96, 0.6);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(39, 174, 96, 0.15);
          background: rgba(39, 174, 96, 0.04);
        }
        .badge-security {
          background: rgba(39, 174, 96, 0.1) !important;
          border-color: rgba(39, 174, 96, 0.25) !important;
          color: #27ae60 !important;
        }
        .footer-security { color: #27ae60 !important; }
        .glow-security {
          background: radial-gradient(circle at 80% 20%, rgba(39, 174, 96, 0.15) 0%, transparent 60%);
        }

        /* LLM 카드 */
        .hub-card.card-llm {
          background: rgba(155, 81, 224, 0.02);
          border-color: rgba(155, 81, 224, 0.15);
        }
        .hub-card.card-llm:hover {
          border-color: rgba(155, 81, 224, 0.6);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(155, 81, 224, 0.15);
          background: rgba(155, 81, 224, 0.04);
        }
        .badge-llm {
          background: rgba(155, 81, 224, 0.1) !important;
          border-color: rgba(155, 81, 224, 0.25) !important;
          color: #be93e4 !important;
        }
        .footer-llm { color: #be93e4 !important; }
        .glow-llm {
          background: radial-gradient(circle at 80% 20%, rgba(155, 81, 224, 0.15) 0%, transparent 60%);
        }

        /* 노션 카드 */
        .hub-card.card-notion {
          background: rgba(245, 194, 73, 0.02);
          border-color: rgba(245, 194, 73, 0.15);
        }
        .hub-card.card-notion:hover {
          border-color: rgba(245, 194, 73, 0.6);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(245, 194, 73, 0.15);
          background: rgba(245, 194, 73, 0.04);
        }
        .badge-notion {
          background: rgba(245, 194, 73, 0.12) !important;
          border-color: rgba(245, 194, 73, 0.3) !important;
          color: #f5c249 !important;
        }
        .footer-notion { color: #f5c249 !important; }
        .glow-notion {
          background: radial-gradient(circle at 80% 20%, rgba(245, 194, 73, 0.15) 0%, transparent 60%);
        }

        .hub-card:hover {
          transform: translateY(-10px) scale(1.01);
        }
        
        .hub-card-badge {
          display: inline-block;
          padding: 5px 12px;
          background: rgba(0, 210, 255, 0.08);
          border: 1px solid rgba(0, 210, 255, 0.2);
          color: #00d2ff;
          border-radius: 50px;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 2.5rem;
        }
        .hub-card-title {
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .hub-card-desc {
          font-size: 1rem;
          line-height: 1.6;
          opacity: 0.6;
          margin-bottom: 3.5rem;
        }
        .hub-card-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #00d2ff;
          font-weight: 700;
          letter-spacing: 1px;
          font-size: 0.85rem;
          margin-top: auto;
        }
        .hub-card-bg-glow {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: -1;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }
        
        .hub-arrow {
          transition: transform 0.3s ease;
        }
        .hub-card:hover .hub-arrow {
          transform: translateX(8px);
        }
        
        .gijo-game-launcher {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 0, 85, 0.08);
          border: 1px solid rgba(255, 0, 85, 0.25);
          padding: 8px 16px;
          border-radius: 20px;
          margin-top: 1.5rem;
          cursor: pointer;
          color: #ff0055;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          box-shadow: 0 0 15px rgba(255, 0, 85, 0.1);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gijo-game-launcher:hover {
          background: rgba(255, 0, 85, 0.16);
          border-color: rgba(255, 0, 85, 0.5);
          color: white;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 5px 20px rgba(255, 0, 85, 0.3), 0 0 10px rgba(255, 0, 85, 0.2);
        }
        .game-icon-glow {
          filter: drop-shadow(0 0 6px rgba(255, 0, 85, 0.8));
          font-size: 1.1rem;
        }
        .hub-footer {
          margin-top: 6rem;
          opacity: 0.8;
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .hub-footer p {
          opacity: 0.3;
        }

        @media (max-width: 1024px) {
          .hub-selection-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
          }
          .hub-logo-text { font-size: 2.25rem; }
          .hub-card { padding: 2.5rem 2rem; }
        }
      `}</style>
    </div>
  );
};

export default GijoLab;
