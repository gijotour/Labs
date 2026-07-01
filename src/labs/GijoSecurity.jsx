import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const GijoSecurity = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('arch');

  const logo = logoImg;

  return (
    <div className="security-wrapper page-fade-in">
      <div className="sec-bg">
        <div className="sec-mesh sec-mesh-1"></div>
        <div className="sec-mesh sec-mesh-2"></div>
      </div>

      <div className="container sec-container">
        {/* Header */}
        <header className="sec-header">
          <button className="btn-back-hub" onClick={() => navigate('/')}>
            <span>←</span> LABS HUB
          </button>
          
          <div className="sec-logo-wrap">
            <img src={logo} alt="GIJO Security" className="sec-logo-img" />
            <h1 className="logo-text sec-logo-text">GIJO Security</h1>
          </div>
          <p className="sec-subtitle">INTELLIGENT VULNERABILITY MANAGEMENT SYSTEM</p>
          {/* 작성일 및 분류 제거 */}
        </header>

        {/* Overview Banner */}
        <section className="sec-card overview-card animate-up">
          <div className="sec-card-badge">PROJECT OVERVIEW</div>
          <h2>1. 프로젝트 개요</h2>
          <p className="overview-p">
            Kali Linux 환경을 기반으로 내부 자산을 대상으로 한 취약점 스캔, 데이터 정규화, 위협 인텔리전스 교차검증, 
            로컬 LLM을 활용한 분석 및 리포트 자동화를 결합한 <strong>지속적 취약점 관리(Continuous Vulnerability Management) 시스템</strong>을 구축합니다.
          </p>
          <div className="goals-grid">
            <div className="goal-item">
              <span className="goal-icon">🛡️</span>
              <h4>자산 인벤토리 자동화</h4>
              <p>내부 자산 인벤토리를 자동으로 발견하고 항시 최신 상태로 유지</p>
            </div>
            <div className="goal-item">
              <span className="goal-icon">🔍</span>
              <h4>주기적 취약점 추적</h4>
              <p>주기적 스캔으로 신규 취약점 감지 및 조치 이력 추적</p>
            </div>
            <div className="goal-item">
              <span className="goal-icon">🤝</span>
              <h4>MISP 위협 교차검증</h4>
              <p>CISA KEV 및 실시간 위협 정보와 연계하여 실악용 취약성 즉각 파악</p>
            </div>
            <div className="goal-item">
              <span className="goal-icon">🤖</span>
              <h4>로컬 LLM 리포팅</h4>
              <p>폐쇄망 내에서 로컬 LLM이 분석 결과 해석 및 복구 권고안 자동 작성</p>
            </div>
          </div>
          <div className="out-of-scope-box">
            <strong>🚫 비목표 (Out of Scope):</strong> 자동 패치/조치 실행 (1차 구축 시에는 탐지·분석·권고까지만 수행) / 외부 클라우드 LLM API 연동 (전면 로컬 LLM 환경 사용)
          </div>
        </section>

        {/* Interactive Tabs */}
        <div className="sec-tabs-row">
          <button className={`sec-tab-btn ${activeTab === 'arch' ? 'active' : ''}`} onClick={() => setActiveTab('arch')}>
            🖥️ 2. 전체 아키텍처
          </button>
          <button className={`sec-tab-btn ${activeTab === 'misp' ? 'active' : ''}`} onClick={() => setActiveTab('misp')}>
            ⚡ 3. MISP 연동 & 위험 점수
          </button>
          <button className={`sec-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
            📅 4. 12주 구축 로드맵
          </button>
          <button className={`sec-tab-btn ${activeTab === 'tech' ? 'active' : ''}`} onClick={() => setActiveTab('tech')}>
            🛠️ 5. 기술 스택 & 데이터 흐름
          </button>
        </div>

        {/* Tab Content 1: Architecture */}
        {activeTab === 'arch' && (
          <div className="tab-pane page-fade-in">
            <div className="sec-card">
              <div className="sec-card-badge">ARCHITECTURE</div>
              <h2>5개 레이어 시스템 구조</h2>
              <p className="tab-intro-p">본 시스템은 수집부터 제어 및 표시 단계까지 긴밀하게 연결된 5대 핵심 레이어로 설계되었습니다.</p>
              
              <div className="layers-visualizer">
                {[
                  { name: "제어 / 표시 (Control & Display)", role: "스케줄링, 알림, 대시보드 시각화", components: "APScheduler, Slack Webhook, Streamlit", color: "#00d2ff" },
                  { name: "분석 (Analysis)", role: "LLM 기반 결과 해석 및 한국어 패치 권고안 초안 생성", components: "Ollama (로컬 LLM), LangChain", color: "#b99038" },
                  { name: "저장 (Storage)", role: "정형 데이터 적재, 이력 관리 및 벡터 임베딩 보존", components: "PostgreSQL, Chroma VectorDB", color: "#9b51e0" },
                  { name: "인텔리전스 (Threat Intelligence)", role: "위협 인텔리전스 교차검증 및 취약점 우선순위 산정", components: "MISP REST API (PyMISP), CISA KEV 피드", color: "#27ae60" },
                  { name: "수집 (Collection)", role: "자산 발견 및 포트, 취약점 스캔 수집", components: "Nmap, OpenVAS/GVM, Nuclei", color: "#e74c3c" },
                ].map((layer, idx) => (
                  <div key={idx} className="visual-layer-bar" style={{ borderLeft: `5px solid ${layer.color}` }}>
                    <div className="layer-main-info">
                      <span className="layer-num">0{5 - idx}</span>
                      <div>
                        <h4>{layer.name}</h4>
                        <p>{layer.role}</p>
                      </div>
                    </div>
                    <div className="layer-tech-badge" style={{ color: layer.color }}>{layer.components}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: MISP & Scoring */}
        {activeTab === 'misp' && (
          <div className="tab-pane page-fade-in">
            <div className="sec-grid-2">
              <div className="sec-card">
                <div className="sec-card-badge">THREAT INTEL</div>
                <h2>3. MISP 연동 설계</h2>
                <p>
                  말웨어 정보 공유 플랫폼인 <strong>MISP</strong>를 인텔리전스 허브로 활용하여 CVSS 단순 점수가 아닌 최신 악용 정보(KEV) 및 IOC 정보와 결합합니다.
                </p>
                <ul className="misp-points">
                  <li>PyMISP을 활용한 로컬 DB 캐싱으로 외부 API 호출 지연 최소화</li>
                  <li>CVE 기반 실시간 악용 탐지 시 위험도 알림 우선순위 자동 승격</li>
                  <li>수집된 IOC 데이터를 로컬 LLM 프롬프트에 제공하여 최신 위협 해석 정확도 극대화</li>
                </ul>
              </div>

              <div className="sec-card">
                <div className="sec-card-badge">SCORING SYSTEM</div>
                <h2>종합 위험 점수 산정 가중치</h2>
                <p className="small-desc">실제 위험도를 반영하기 위해 4가지 핵심 요소를 종합 계산합니다.</p>
                
                <div className="score-bars-list">
                  {[
                    { label: "CVSS 기본 점수 (스캐너 진단 결과)", weight: 40, color: "#e74c3c", desc: "OpenVAS/Nuclei 결과 기준" },
                    { label: "KEV 등재 여부 (CISA 실악용 목록)", weight: 30, color: "#f39c12", desc: "등재 시 즉시 최고순위 격상" },
                    { label: "MISP 위협 빈도 (최신 IOC 및 활성 여부)", weight: 20, color: "#00d2ff", desc: "최근 30일 내 활동 기록 등" },
                    { label: "자산 중요도 (비즈니스 중요 메타데이터)", weight: 10, color: "#9b51e0", desc: "담당 업무 및 핵심 비즈니스 자산 여부" }
                  ].map((score, idx) => (
                    <div key={idx} className="score-progress-wrap">
                      <div className="score-label-flex">
                        <span><strong>{score.label}</strong> <em style={{ opacity: 0.6, fontSize: '0.8rem' }}>- {score.desc}</em></span>
                        <span style={{ color: score.color, fontWeight: 'bold' }}>{score.weight}%</span>
                      </div>
                      <div className="progress-bg">
                        <div className="progress-fill" style={{ width: `${score.weight}%`, background: score.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Roadmap */}
        {activeTab === 'timeline' && (
          <div className="tab-pane page-fade-in">
            <div className="sec-card">
              <div className="sec-card-badge">ROADMAP</div>
              <h2>4. 단계별 구축 일정 (12주 제안)</h2>
              <p className="roadmap-subtitle">12주간 인프라 구축부터 데이터 파이프라인, 로컬 AI 통합까지 완성하는 단계별 계획입니다.</p>
              
              <div className="roadmap-timeline">
                {[
                  { range: "1~2주차", title: "자산 인벤토리 마련", details: "자산 인벤토리 스키마 설계 및 Nmap 디스커버리 매일 자동 검색 파이프라인 구축" },
                  { range: "3~4주차", title: "취약점 스캐너 통합", details: "OpenVAS/GVM 메인 스캐너 및 Nuclei 템플릿 설치 및 스캔 자동화 파싱 스크립트 구축" },
                  { range: "5~6주차", title: "정규화 및 DB 설계", details: "스캐너별 상이한 포맷 공통 스키마로 정규화 및 PostgreSQL 적재 이력 관리 완성" },
                  { range: "7~8주차", title: "MISP 인스턴스 연동", details: "PyMISP API 연동, KEV 실시간 검증 및 4대 가중치 기반 종합 위험 점수 산정 규칙 설계" },
                  { range: "9~10주차", title: "로컬 LLM & RAG 구축", details: "Ollama 서빙(Llama3.1) 환경 구축 및 Chroma 벡터 DB 연계 한국어 분석 리포트 프롬프트 튜닝" },
                  { range: "11~12주차", title: "자동화 랩업 및 대시보드", details: "APScheduler 스케줄러 등록, Slack/이메일 알림 연동 및 Streamlit 종합 통합 대시보드 구축" }
                ].map((item, idx) => (
                  <div key={idx} className="timeline-node">
                    <div className="timeline-badge-wrap">
                      <div className="node-dot" />
                      <span className="node-weeks">{item.range}</span>
                    </div>
                    <div className="node-body">
                      <h4>{item.title}</h4>
                      <p>{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Tech Stack & Flows */}
        {activeTab === 'tech' && (
          <div className="tab-pane page-fade-in">
            <div className="sec-grid-2">
              <div className="sec-card">
                <div className="sec-card-badge">TECHNICAL STACK</div>
                <h2>5. 기술 스택 요약</h2>
                <div className="tech-stack-grid">
                  <div className="tech-item"><strong>스캐너:</strong> Nmap, OpenVAS/GVM, Nuclei</div>
                  <div className="tech-item"><strong>위협 인텔리전스:</strong> MISP, CISA KEV 피드</div>
                  <div className="tech-item"><strong>데이터베이스:</strong> PostgreSQL</div>
                  <div className="tech-item"><strong>LLM 서빙:</strong> Ollama (로컬 환경 서빙)</div>
                  <div className="tech-item"><strong>RAG 프레임워크:</strong> Chroma, LangChain</div>
                  <div className="tech-item"><strong>자동화 & 스케줄러:</strong> Python, APScheduler</div>
                  <div className="tech-item"><strong>시각화 UI:</strong> Streamlit 대시보드</div>
                  <div className="tech-item"><strong>경보/알림:</strong> Slack Webhook, SMTP 이메일</div>
                </div>
              </div>

              <div className="sec-card">
                <div className="sec-card-badge">DATA FLOW</div>
                <h2>6. 데이터 흐름 요약</h2>
                <div className="data-flow-steps">
                  <div className="step-row">
                    <span className="step-num-circle">1</span>
                    <p><strong>수집 스캔:</strong> Nmap/OpenVAS/Nuclei가 내부 자산을 스캔해 원시 데이터 수집</p>
                  </div>
                  <div className="step-row">
                    <span className="step-num-circle">2</span>
                    <p><strong>정규화 적재:</strong> 수집 결과를 공통 스키마로 가공하여 PostgreSQL DB에 누적 적재</p>
                  </div>
                  <div className="step-row">
                    <span className="step-num-circle">3</span>
                    <p><strong>위협 매칭:</strong> MISP 및 KEV 정보와 연계하여 위협 인텔리전스를 로컬 DB에 캐싱</p>
                  </div>
                  <div className="step-row">
                    <span className="step-num-circle">4</span>
                    <p><strong>위험 산정:</strong> CVSS + KEV + MISP + 자산 중요도를 결합하여 최종 위험 우선순위 산정</p>
                  </div>
                  <div className="step-row">
                    <span className="step-num-circle">5</span>
                    <p><strong>LLM 권고:</strong> Ollama 로컬 LLM 분석을 거쳐 최종 요약 리포트와 권고 초안 작성 후 Slack/대시보드 전달</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security & Precautions (Always Visible) */}
        <section className="sec-card alert-card-sec animate-up">
          <div className="sec-card-badge warning">IMPORTANT</div>
          <h2>8. 주의 및 보안 고려사항</h2>
          <div className="warning-grid">
            <div className="warn-item">
              <strong>🔒 철저한 폐쇄망 로컬 처리</strong>
              <p>LLM 분석에 입력되는 모든 자산 정보(IP, 취약점 상세 기술 등)는 반드시 사내 로컬망 내부에서만 처리하며 외부 API 연동을 금지합니다.</p>
            </div>
            <div className="warn-item">
              <strong>🌐 외부 정보 유출 방지</strong>
              <p>MISP 연동 시 Sharing Group(공유 그룹) 권한 설정을 엄격히 검토하여, 사내 취약점 정보가 외부 커뮤니티로 역수집되지 않도록 방지합니다.</p>
            </div>
            <div className="warn-item">
              <strong>📋 사전 승인 기반 권한 획득</strong>
              <p>사내 전용 자산 스캔이라도 스캔 권한 및 IP 스캔 범위를 사전에 명문화하여 승인받고 진행하여 내부 정책 위반을 사전에 방지합니다.</p>
            </div>
            <div className="warn-item">
              <strong>👥 조치 확인 단계 유지</strong>
              <p>초기 단계에는 취약점 탐지, 분석, 리포팅 권고까지만 기계화하며, 실제 보완 패치 조치는 반드시 담당자의 검증과 수동 승인 하에 실행합니다.</p>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .security-wrapper {
          min-height: 100vh;
          background: #040810;
          color: #e2e8f0;
          padding: 6rem 2rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .sec-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
        }
        .sec-mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(160px);
          opacity: 0.12;
        }
        .sec-mesh-1 {
          width: 500px; height: 500px;
          background: #00d2ff;
          top: 10%; right: -5%;
        }
        .sec-mesh-2 {
          width: 450px; height: 450px;
          background: #27ae60;
          bottom: 10%; left: -5%;
        }
        .sec-container {
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
          border-color: #00d2ff;
        }
        .sec-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .sec-logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .sec-logo-img {
          width: 140px;
          filter: drop-shadow(0 0 25px rgba(0, 210, 255, 0.5));
          opacity: 1;
        }
        .sec-logo-text {
          font-size: 3rem;
          margin: 0;
          letter-spacing: -0.5px;
          background: linear-gradient(90deg, #00d2ff 0%, #27ae60 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sec-subtitle {
          font-size: 1rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          opacity: 0.7;
          font-weight: 700;
          color: #00d2ff;
        }
        .plan-doc-meta {
          margin-top: 1.5rem;
          font-size: 0.9rem;
          opacity: 0.6;
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        .plan-doc-meta .divider { opacity: 0.3; }
        
        .sec-card {
          background: rgba(10, 18, 36, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          margin-bottom: 2.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }
        .sec-card-badge {
          display: inline-block;
          padding: 5px 12px;
          background: rgba(0, 210, 255, 0.1);
          border: 1px solid rgba(0, 210, 255, 0.25);
          color: #00d2ff;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1px;
          border-radius: 4px;
          margin-bottom: 1.5rem;
        }
        .sec-card-badge.warning {
          background: rgba(231, 76, 60, 0.1);
          border-color: rgba(231, 76, 60, 0.3);
          color: #e74c3c;
        }
        .sec-card h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
        }
        .overview-p {
          font-size: 1.15rem;
          line-height: 1.7;
          opacity: 0.9;
          margin-bottom: 2.5rem;
        }
        .goals-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .goal-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        .goal-item:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(0, 210, 255, 0.2);
          transform: translateY(-5px);
        }
        .goal-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 1rem;
        }
        .goal-item h4 {
          font-size: 1.05rem;
          margin-bottom: 0.5rem;
          color: white;
        }
        .goal-item p {
          font-size: 0.85rem;
          opacity: 0.7;
          line-height: 1.5;
        }
        .out-of-scope-box {
          background: rgba(231, 76, 60, 0.06);
          border: 1px dashed rgba(231, 76, 60, 0.2);
          border-radius: 12px;
          padding: 1.2rem;
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(241, 196, 15, 0.95);
        }

        /* Tabs */
        .sec-tabs-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .sec-tab-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.6);
          border-radius: 14px;
          padding: 1.2rem 1rem;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }
        .sec-tab-btn:hover {
          background: rgba(255, 255, 255, 0.04);
          color: white;
        }
        .sec-tab-btn.active {
          background: rgba(0, 210, 255, 0.08);
          border-color: rgba(0, 210, 255, 0.3);
          color: #00d2ff;
          box-shadow: 0 10px 25px rgba(0, 210, 255, 0.1);
        }
        
        .tab-intro-p {
          font-size: 1rem;
          opacity: 0.7;
          margin-bottom: 2rem;
        }
        
        /* Architecture Layer Bar */
        .layers-visualizer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .visual-layer-bar {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 1.2rem 1.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }
        .visual-layer-bar:hover {
          background: rgba(255, 255, 255, 0.04);
          transform: translateX(5px);
        }
        .layer-main-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .layer-num {
          font-size: 1.5rem;
          font-weight: 900;
          opacity: 0.3;
        }
        .layer-main-info h4 {
          font-size: 1.05rem;
          margin: 0 0 4px 0;
          color: white;
        }
        .layer-main-info p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.6;
        }
        .layer-tech-badge {
          font-size: 0.9rem;
          font-weight: bold;
          background: rgba(255, 255, 255, 0.03);
          padding: 6px 12px;
          border-radius: 6px;
        }
        
        /* Grid 2 Column */
        .sec-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        .misp-points {
          padding-left: 1.2rem;
          line-height: 1.8;
          opacity: 0.85;
          font-size: 0.95rem;
        }
        .misp-points li {
          margin-bottom: 1rem;
        }
        
        /* Scoring progress bars */
        .score-bars-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-top: 1rem;
        }
        .score-progress-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .score-label-flex {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }
        .progress-bg {
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: 4px;
        }
        
        /* Roadmap Timeline */
        .roadmap-subtitle {
          opacity: 0.6;
          margin-bottom: 3rem;
        }
        .roadmap-timeline {
          position: relative;
          padding-left: 2rem;
          border-left: 2px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .timeline-node {
          position: relative;
        }
        .timeline-badge-wrap {
          position: absolute;
          left: calc(-2rem - 9px);
          top: 0;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .node-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00d2ff;
          border: 4px solid #040810;
          box-shadow: 0 0 10px rgba(0, 210, 255, 0.8);
        }
        .node-weeks {
          font-size: 0.8rem;
          font-weight: 800;
          color: #00d2ff;
          background: rgba(0, 210, 255, 0.08);
          border: 1px solid rgba(0, 210, 255, 0.2);
          padding: 2px 8px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .node-body {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 1.2rem 1.5rem;
        }
        .node-body h4 {
          margin: 0 0 6px 0;
          font-size: 1.1rem;
          color: white;
        }
        .node-body p {
          margin: 0;
          font-size: 0.9rem;
          opacity: 0.7;
          line-height: 1.6;
        }
        
        /* Tech and Flows */
        .tech-stack-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        .tech-item {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          padding: 0.8rem 1.2rem;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }
        .tech-item strong {
          color: #00d2ff;
          margin-right: 6px;
        }
        
        .data-flow-steps {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .step-row {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .step-num-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(39, 174, 96, 0.15);
          border: 1px solid rgba(39, 174, 96, 0.4);
          color: #27ae60;
          display: grid;
          place-items: center;
          font-size: 0.8rem;
          font-weight: bold;
          flex-shrink: 0;
        }
        .step-row p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.5;
          opacity: 0.85;
        }
        
        /* Warning Precautions Grid */
        .warning-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.8rem;
        }
        .warn-item {
          background: rgba(231, 76, 60, 0.02);
          border: 1px solid rgba(231, 76, 60, 0.08);
          border-radius: 14px;
          padding: 1.5rem;
        }
        .warn-item strong {
          color: #e74c3c;
          display: block;
          margin-bottom: 0.6rem;
          font-size: 1rem;
        }
        .warn-item p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.7;
          line-height: 1.6;
        }
        
        @media (max-width: 1024px) {
          .sec-grid-2, .warning-grid {
            grid-template-columns: 1fr;
          }
          .goals-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .sec-tabs-row {
            grid-template-columns: 1fr;
          }
          .visual-layer-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
        @media (max-width: 600px) {
          .goals-grid {
            grid-template-columns: 1fr;
          }
          .sec-logo-text { font-size: 2.2rem; }
          .plan-doc-meta { flex-direction: column; align-items: center; gap: 5px; }
          .plan-doc-meta .divider { display: none; }
        }
      `}</style>
    </div>
  );
};

export default GijoSecurity;
