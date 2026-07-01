import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const GijoLocalLLM = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tech');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const logo = logoImg;

  const prompts = [
    { title: "1. 로그 이상 행위 탐지", text: "다음 로그를 분석해 이상 행위를 찾아라. 공격 가능성, 의심 이유, 위험 수준(낮음/중간/높음)과 대응 방법을 근거와 함께 제시하라." },
    { title: "2. 공격 유형 판단", text: "이 로그에서 brute force, 스캐닝, DDoS 가능성이 있는지 평가하고 근거와 함께 설명하라." },
    { title: "3. 정상/비정상 트래픽 판별", text: "이 트래픽 패턴이 정상인지 비정상인지 판단하고, 비정상이라면 어떤 공격 유형인지 설명하라." },
    { title: "4. 동일 IP 반복 시도 탐지", text: "다음 로그에서 동일 IP의 반복 시도를 찾아 의미와 위험도를 설명하라." },
    { title: "5. 인증 실패 패턴 분석", text: "이 로그에서 인증 실패 패턴을 분석하고 공격 가능성을 평가하라." },
    { title: "6. 정책 기반 답변", text: "질문에 대해 업로드된 보안 정책 문서를 기반으로만 답하라. 관련 정책 조항, 적용 기준, 근거 문장을 제시하고 문서에 없으면 “확인되지 않음”이라고 답하라." },
    { title: "7. 정책 위반 판단", text: "이 상황이 내부 보안 정책 위반인지 판단하고 근거 조항을 제시하라." },
    { title: "8. 접근 권한 기준 설명", text: "접근 권한 부여 기준을 관련 문서에 따라 설명하라." },
    { title: "9. 개인정보 처리 기준 요약", text: "개인정보 처리 기준을 문서 기준으로 요약하라." },
    { title: "10. 승인 가능 여부 평가", text: "이 요청이 정책 기준으로 승인 가능한지 판단하고 불확실하면 판단을 보류하라." },
    { title: "11. 사고 대응 절차 작성", text: "다음 상황에 대한 보안 사고 대응 절차를 단계별로 작성하라(초기 대응, 원인 분석, 확산 방지, 보고 절차)." },
    { title: "12. 침해 의심 대응", text: "서버 침해가 의심되는 상황이다. 확인해야 할 로그와 조치 방법을 정리하라." },
    { title: "13. 랜섬웨어 대응", text: "랜섬웨어 의심 상황에서 즉시 해야 할 조치를 우선순위대로 나열하라." },
    { title: "14. 계정 탈취 대응", text: "내부 계정 탈취가 의심된다. 확인할 포인트와 대응 절차를 작성하라." },
    { title: "15. CVE 설명", text: "다음 CVE를 설명하라. 취약점 개요, 영향 범위, 공격 방식, 대응 방법을 정리하라." },
    { title: "16. 보안 취약점 도출", text: "이 시스템 구성에서 발생할 수 있는 보안 취약점을 도출하라." },
    { title: "17. OWASP Top 10 분석", text: "OWASP Top 10 기준으로 이 서비스의 위험 요소를 분석하라." },
    { title: "18. 경영진 보고서 작성", text: "다음 분석 결과를 바탕으로 경영진용 보안 보고서를 작성하라. 요약(비기술), 주요 리스크, 대응 필요 사항을 포함하라." },
    { title: "19. 사고 분석 보고서 작성", text: "보안 사고 분석 보고서를 작성하라. 발생 개요, 원인, 영향, 대응, 재발 방지를 포함하라." },
    { title: "20. 고객 보고용 정리", text: "다음 로그 분석 내용을 고객 보고용 문서로 쉽게 이해할 수 있도록 정리하라." }
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="llm-wrapper page-fade-in">
      <div className="llm-bg">
        <div className="llm-mesh llm-mesh-1"></div>
        <div className="llm-mesh llm-mesh-2"></div>
      </div>

      <div className="container llm-container">
        {/* Header */}
        <header className="llm-header">
          <button className="btn-back-hub" onClick={() => navigate('/')}>
            <span>←</span> LABS HUB
          </button>
          
          <div className="llm-logo-wrap">
            <img src={logo} alt="GIJO LOCAL LLM" className="llm-logo-img" />
            <h1 className="logo-text llm-logo-text">GIJO Local LLM</h1>
          </div>
          <p className="llm-subtitle">SECURE OFFLINE AI COPILOT</p>
        </header>

        {/* Section 1: Intro */}
        <section className="llm-card overview-card animate-up">
          <div className="llm-card-badge">1. 추진 배경 & 목표</div>
          <h2>기업 내부 자산 보호를 위한 오프라인 보안 AI</h2>
          <p className="overview-p">
            기업 보안팀은 방대한 로그 분석과 복잡한 규정 해석에 막대한 시간을 할애하고 있습니다. 
            <strong>GIJO Local LLM</strong>은 기밀 정보를 사내망 내부에 안전하게 격리(온프레미스)한 채, 
            보안 로그 이상 징후 탐지 및 규정 해석 등을 보조하는 <strong>보안 담당자 전용 로컬 AI Copilot</strong>을 지향합니다.
          </p>
          <div className="features-highlight-grid">
            <div className="f-highlight-item">
              <span className="hl-icon">🔐</span>
              <h4>완전 오프라인 운영</h4>
              <p>민감 데이터를 외부 클라우드로 단 1바이트도 유출하지 않고 완전 격리 처리</p>
            </div>
            <div className="f-highlight-item">
              <span className="hl-icon">⚡</span>
              <h4>보안 운영 효율 극대화</h4>
              <p>방대한 로그 데이터로부터 이상 패턴을 초 단위로 탐지하여 대응 시간 단축</p>
            </div>
            <div className="f-highlight-item">
              <span className="hl-icon">📈</span>
              <h4>비용 절감 및 주권 확보</h4>
              <p>호스팅 요금 없이 로컬 하드웨어로 가동되어 TCO(총소유비용) 대폭 절감</p>
            </div>
          </div>
        </section>

        {/* Tabs Menu */}
        <div className="llm-tabs-row">
          <button className={`llm-tab-btn ${activeTab === 'tech' ? 'active' : ''}`} onClick={() => setActiveTab('tech')}>
            ⚙️ 2. 기술 조사 & 설계
          </button>
          <button className={`llm-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`} onClick={() => setActiveTab('roadmap')}>
            📅 3. 3개월 사업화 로드맵
          </button>
          <button className={`llm-tab-btn ${activeTab === 'prompts' ? 'active' : ''}`} onClick={() => setActiveTab('prompts')}>
            💬 4. 보안 AI 프롬프트 (20선)
          </button>
        </div>

        {/* Tab 1: Tech Spec */}
        {activeTab === 'tech' && (
          <div className="tab-pane page-fade-in">
            <div className="llm-grid-2">
              <div className="llm-card">
                <div className="llm-card-badge">MODEL RESEARCH</div>
                <h2>Gemma 3 & 4 로컬 최적화</h2>
                <p>로컬 구동에 최적화된 구글의 차세대 초경량 모델 가동 아키텍처입니다.</p>
                <div className="gemma-specs">
                  <div className="gemma-model-box">
                    <h4>Gemma 3</h4>
                    <p>최대 27B 규모의 경량 LLM. 128K의 확장된 콘텍스트 창을 지원하여 방대한 보안 로그와 문서를 완벽하게 기억 및 요약, 추론합니다.</p>
                  </div>
                  <div className="gemma-model-box">
                    <h4>Gemma 4 MoE</h4>
                    <p>Mixture-of-Experts 구조를 지원하는 고성능 초경량 모델. Native function-calling을 내장하여 방화벽 차단 명령 등을 효율적으로 연계합니다.</p>
                  </div>
                </div>
              </div>

              <div className="llm-card">
                <div className="llm-card-badge">INFRASTRUCTURE</div>
                <h2>하드웨어 & 플랫폼 사양</h2>
                <p>보안 AI 구동을 위한 권장 인프라 및 핵심 소프트웨어 배포 스택입니다.</p>
                <div className="infra-list">
                  <div className="infra-row">
                    <strong>Ollama Server</strong>
                    <span>로컬 모델 경량화 구동 및 API 호스팅 지원</span>
                  </div>
                  <div className="infra-row">
                    <strong>Open WebUI</strong>
                    <span>자체 RAG(지식베이스) 탑재, 오프라인 문서 업로드 분석 웹 UI</span>
                  </div>
                  <div className="infra-row">
                    <strong>권장 GPU</strong>
                    <span>VRAM 24GB 이상 (소규모: RTX 3090/4090 1장 가동 가능)</span>
                  </div>
                  <div className="infra-row">
                    <strong>권장 RAM/SSD</strong>
                    <span>RAM 64GB 이상 / SSD NVMe 2TB 이상 권장</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MVP features */}
            <div className="llm-card">
              <div className="llm-card-badge">MVP FEATURES</div>
              <h2>5대 MVP 핵심 기능</h2>
              <div className="mvp-grid">
                {[
                  { title: "로그 분석 도우미", desc: "방화벽/웹서버 로그를 주입하면 위험 패턴 및 대응 우선순위와 명확한 판단 근거 도출" },
                  { title: "보안 문서 Q&A (RAG)", desc: "ISMS-P, ISO 27001 등 내부 규정 위주의 답변 강제. 문서 외 정보 입력 시 '확인 불가' 응답 처리" },
                  { title: "사고 대응 실시간 가이드", desc: "침해 감지, 랜섬웨어 및 계정 탈취 발생 시 실시간 단계별 조치 가이드라인 및 프로세스 안내" },
                  { title: "CVE 취약점 분석", desc: "특정 CVE 코드를 주입하면 취약성 범위, 해킹 시나리오 및 예방 패치 방식에 대한 요약 제공" },
                  { title: "보안 보고서 자동 작성", desc: "위협 탐지 결과를 가공해 임원진 보고용(비기술적 요약) 및 실무 엔지니어용 보고서 초안 생성" }
                ].map((item, idx) => (
                  <div key={idx} className="mvp-item">
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="tab-pane page-fade-in">
            <div className="llm-card">
              <div className="llm-card-badge">ROADMAP & MONETIZATION</div>
              <h2>3개월 사업화 마일스톤 및 비즈니스 모델</h2>
              
              <div className="biz-model-row">
                <div className="biz-card">
                  <h4>1. 온프레미스 구축형</h4>
                  <p>초기 구축비 1,000만 ~ 5,000만 원 (조직 맞춤 RAG 포함) + 유지보수 비용 산정</p>
                </div>
                <div className="biz-card">
                  <h4>2. 월 라이선스 구독형</h4>
                  <p>사내 내부 가동 라이선스로 회사당 월 100만 ~ 500만 원 (서버 성능 규모에 비례 과금)</p>
                </div>
                <div className="biz-card">
                  <h4>3. 프라이빗 SaaS</h4>
                  <p>독립 가상머신(VM) 형태로 안전하게 패키징 배포 (월 200만 ~ 500만 원)</p>
                </div>
              </div>

              <div className="roadmap-timeline-llm">
                {[
                  { month: "Month 1", title: "실패 없는 MVP 및 데모 확보", desc: "Gemma 3/4 모델 및 Ollama, Open WebUI 통합 인터페이스 구축. 근거 표시 및 권한 관리 시스템 프로토타이핑 완성." },
                  { month: "Month 2", title: "유료 파일럿(POC) 계약 유도", desc: "IT 강소기업 및 스타트업 대상 로그 분석 데모 진행. 실제 데이터 연동 맞춤형 POC 계약 확보 (기업당 100~300만원 유료 POC)." },
                  { month: "Month 3", title: "유료 전환 및 라이선스 상용화", desc: "분석 처리 소요시간 50% 절감, 보고서 작성 소요시간 70% 단축 지표 정량화 성공 후 본 계약 전환." }
                ].map((item, idx) => (
                  <div key={idx} className="roadmap-node-llm">
                    <div className="node-badge-llm">{item.month}</div>
                    <div className="node-body-llm">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Prompts */}
        {activeTab === 'prompts' && (
          <div className="tab-pane page-fade-in">
            <div className="llm-card">
              <div className="llm-card-badge">PROMPT PRESETS</div>
              <h2>20대 보안 AI 전용 프롬프트 라이브러리</h2>
              <p className="prompts-intro">사내 Open WebUI 프리셋 버튼에 즉시 등록하여 사용할 수 있는 실전 최적화 템플릿입니다. 원하는 프롬프트 카드를 클릭하면 내용이 즉시 복사됩니다.</p>
              
              <div className="prompts-grid-llm">
                {prompts.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`prompt-card-llm ${copiedIndex === idx ? 'copied' : ''}`}
                    onClick={() => handleCopy(item.text, idx)}
                  >
                    <div className="prompt-card-header">
                      <h5>{item.title}</h5>
                      <span className="copy-indicator">{copiedIndex === idx ? "✓ 복사됨" : "📋 복사"}</span>
                    </div>
                    <p className="prompt-text">"{item.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Prompts */}
            <div className="llm-card system-prompt-card">
              <div className="llm-card-badge warning">SYSTEM PROMPTS</div>
              <h2>환각 방지를 위한 시스템 지침 구성 예시</h2>
              <p>AI가 과도한 확신을 갖거나 임의의 소설을 창작하는 것을 사전에 차단하기 위해 모델 설정 파라미터에 강제 주입되는 규칙 세트입니다.</p>
              <div className="rules-boxes">
                <span>🚫 근거 없는 추측 작성 전면 금지</span>
                <span>📋 답변 시 출처 문서나 로그 항목 인덱스 필수 표기</span>
                <span>⚠️ 확신이 모호할 경우 임의 판단을 유보하고 "판단 불가" 명시</span>
                <span>💡 보안 판단 결과 기술 시 확정형 대신 "가능성"으로 완곡 기술</span>
                <span>🔒 개인식별정보(PII) 및 계정 패스워드는 출력 시 자동 마스킹</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .llm-wrapper {
          min-height: 100vh;
          background: #05060b;
          color: #e2e8f0;
          padding: 6rem 2rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .llm-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
        }
        .llm-mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(160px);
          opacity: 0.1;
        }
        .llm-mesh-1 {
          width: 550px; height: 550px;
          background: #9b51e0;
          top: -10%; right: -5%;
        }
        .llm-mesh-2 {
          width: 480px; height: 480px;
          background: #f39c12;
          bottom: -10%; left: -5%;
        }
        .llm-container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
        }
        .btn-back-hub {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 2rem;
        }
        .btn-back-hub:hover {
          background: rgba(255,255,255,0.1);
          color: white;
          border-color: #9b51e0;
        }
        .llm-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .llm-logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .llm-logo-img {
          width: 140px;
          filter: drop-shadow(0 0 25px rgba(155, 81, 224, 0.5));
          opacity: 1;
        }
        .llm-logo-text {
          font-size: 3rem;
          margin: 0;
          letter-spacing: -0.5px;
          background: linear-gradient(90deg, #9b51e0 0%, #f39c12 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .llm-subtitle {
          font-size: 1rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          opacity: 0.7;
          font-weight: 700;
          color: #9b51e0;
        }
        
        .llm-card {
          background: rgba(15, 12, 28, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }
        .llm-card-badge {
          display: inline-block;
          padding: 5px 12px;
          background: rgba(155, 81, 224, 0.15);
          border: 1px solid rgba(155, 81, 224, 0.3);
          color: #be93e4;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1px;
          border-radius: 4px;
          margin-bottom: 1.5rem;
        }
        .llm-card-badge.warning {
          background: rgba(243, 156, 18, 0.1);
          border-color: rgba(243, 156, 18, 0.3);
          color: #f39c12;
        }
        .llm-card h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
          color: white;
        }
        .overview-p {
          font-size: 1.15rem;
          line-height: 1.7;
          opacity: 0.9;
          margin-bottom: 2.5rem;
        }
        .features-highlight-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .f-highlight-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .hl-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 1rem;
        }
        .f-highlight-item h4 {
          font-size: 1.05rem;
          margin-bottom: 0.5rem;
          color: white;
        }
        .f-highlight-item p {
          font-size: 0.85rem;
          opacity: 0.7;
          line-height: 1.5;
        }
        
        /* Tabs */
        .llm-tabs-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .llm-tab-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.6);
          border-radius: 14px;
          padding: 1.2rem 1rem;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        .llm-tab-btn:hover {
          background: rgba(255, 255, 255, 0.04);
          color: white;
        }
        .llm-tab-btn.active {
          background: rgba(155, 81, 224, 0.1);
          border-color: rgba(155, 81, 224, 0.3);
          color: #be93e4;
          box-shadow: 0 10px 25px rgba(155, 81, 224, 0.15);
        }
        
        /* Tech Specs Grid */
        .llm-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        .gemma-specs {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .gemma-model-box {
          background: rgba(255, 255, 255, 0.01);
          border-left: 3px solid #9b51e0;
          padding: 1rem 1.2rem;
          border-radius: 0 10px 10px 0;
        }
        .gemma-model-box h4 {
          margin: 0 0 6px 0;
          color: white;
        }
        .gemma-model-box p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.7;
          line-height: 1.5;
        }
        
        .infra-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .infra-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 0.8rem;
          font-size: 0.9rem;
        }
        .infra-row strong {
          color: #be93e4;
        }
        .infra-row span {
          opacity: 0.7;
          font-size: 0.85rem;
        }
        
        /* MVP Grid */
        .mvp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .mvp-item {
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .mvp-item h5 {
          font-size: 1.05rem;
          margin: 0 0 8px 0;
          color: #be93e4;
        }
        .mvp-item p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.7;
          line-height: 1.6;
        }
        
        /* Biz Model */
        .biz-model-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .biz-card {
          background: rgba(155, 81, 224, 0.04);
          border: 1px solid rgba(155, 81, 224, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .biz-card h4 {
          margin: 0 0 8px 0;
          color: #f39c12;
        }
        .biz-card p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.8;
          line-height: 1.5;
        }
        
        /* Roadmap Timeline */
        .roadmap-timeline-llm {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .roadmap-node-llm {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }
        .node-badge-llm {
          background: #9b51e0;
          color: white;
          font-weight: 800;
          font-size: 0.85rem;
          padding: 6px 14px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 5px 15px rgba(155, 81, 224, 0.4);
        }
        .node-body-llm h4 {
          margin: 0 0 4px 0;
          color: white;
        }
        .node-body-llm p {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.7;
          line-height: 1.6;
        }
        
        /* Prompts grid */
        .prompts-intro {
          opacity: 0.7;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }
        .prompts-grid-llm {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .prompt-card-llm {
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .prompt-card-llm:hover {
          background: rgba(155, 81, 224, 0.05);
          border-color: rgba(155, 81, 224, 0.3);
          transform: translateY(-3px);
        }
        .prompt-card-llm.copied {
          border-color: #27ae60;
          background: rgba(39, 174, 96, 0.08);
        }
        .prompt-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }
        .prompt-card-header h5 {
          margin: 0;
          font-size: 1rem;
          color: white;
        }
        .copy-indicator {
          font-size: 0.75rem;
          color: #9b51e0;
          font-weight: bold;
        }
        .prompt-card-llm.copied .copy-indicator {
          color: #27ae60;
        }
        .prompt-text {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.75;
          line-height: 1.6;
          font-family: monospace;
          background: rgba(0,0,0,0.2);
          padding: 0.8rem;
          border-radius: 8px;
        }
        
        /* System Prompts */
        .system-prompt-card {
          margin-top: 3rem;
        }
        .rules-boxes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-top: 1.5rem;
        }
        .rules-boxes span {
          background: rgba(243, 156, 18, 0.08);
          border: 1px solid rgba(243, 156, 18, 0.2);
          color: #f39c12;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: bold;
        }

        @media (max-width: 1024px) {
          .llm-grid-2, .mvp-grid, .biz-model-row, .prompts-grid-llm {
            grid-template-columns: 1fr;
          }
          .llm-tabs-row {
            grid-template-columns: 1fr;
          }
          .features-highlight-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default GijoLocalLLM;
