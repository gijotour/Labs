import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import '../tour-app/tour-theme.css';

const GijoResearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 활성 탭은 URL에서 파생한다. 별도 state로 두면 useEffect로 다시 동기화해야 하고
  // 뒤로가기 시 어긋난다.
  //  · security / llm  → 경로로 구분 (/security, /llm)
  //  · progress        → 전용 경로가 없어 쿼리로 구분 (?tab=progress)
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab =
    searchParams.get('tab') === 'progress'
      ? 'progress'
      : location.pathname === '/llm' ? 'llm' : 'security';

  const handleTabChange = (tab) => {
    if (tab === 'progress') {
      setSearchParams({ tab: 'progress' });
      return;
    }
    navigate(tab === 'llm' ? '/llm' : '/security');
  };

  const logo = logoImg;

  return (
    <div className="lab-surface research-wrapper page-fade-in">
      {/* 폰트는 index.html <head>에서 preconnect와 함께 로드 */}
      <div className="res-bg">
        <div className="res-mesh res-mesh-1"></div>
        <div className="res-mesh res-mesh-2"></div>
        <div className="res-mesh res-mesh-3"></div>
      </div>

      <div className="container res-container">
        {/* Header */}
        <header className="res-header">
          <button className="btn-back-hub" onClick={() => navigate('/')}>
            <span>←</span> LABS HUB
          </button>
          
          <div className="res-logo-wrap">
            <img src={logo} alt="GIJO Labs" className="res-logo-img" />
            <h1 className="logo-text res-logo-text">GIJO Research</h1>
          </div>
          <p className="res-subtitle">PROJECT INTELLIGENCE & TECHNICAL ARCHIVE</p>
        </header>

        {/* Unified Banner */}
        <section className="res-card overview-card animate-up">
          <div className="res-card-badge">INTEGRATED ROADMAP</div>
          <h2>통합 연구 기획서</h2>
          <p className="overview-p">
            NVIDIA RTX 3090 GPU 사양에 맞춤 구축된 <strong>오프라인 로컬 LLM 추론 엔진(llama.cpp)</strong>과
            Kali Linux 스캔 도구를 융합한 <strong>지속적 내부 자산 취약점 관리 시스템(GIJO Security)</strong>의 핵심 설계 및 진척 상황을 관리합니다.
          </p>
          
          <div className="specs-bar">
            <div className="spec-info-item">
              <span className="spec-label">GPU</span>
              <span className="spec-value">RTX 3090 24GB</span>
            </div>
            <div className="spec-info-item">
              <span className="spec-label">CUDA CC</span>
              <span className="spec-value">8.6 (Toolkit 13.3)</span>
            </div>
            <div className="spec-info-item">
              <span className="spec-label">TEST MODEL</span>
              <span className="spec-value">Qwythos-9B (Q4_K_M)</span>
            </div>
            <div className="spec-info-item">
              <span className="spec-label">BACKEND</span>
              <span className="spec-value">TS / Node.js (Express)</span>
            </div>
          </div>
        </section>

        {/* Global Navigation Tabs */}
        <div className="res-tabs-row">
          <button 
            className={`res-tab-btn ${activeTab === 'security' ? 'active sec-active' : ''}`} 
            onClick={() => handleTabChange('security')}
          >
            🛡️ 1. GIJO SECURITY
          </button>
          <button 
            className={`res-tab-btn ${activeTab === 'llm' ? 'active llm-active' : ''}`} 
            onClick={() => handleTabChange('llm')}
          >
            🤖 2. GIJO LOCAL LLM
          </button>
          <button 
            className={`res-tab-btn ${activeTab === 'progress' ? 'active prog-active' : ''}`} 
            onClick={() => handleTabChange('progress')}
          >
            📊 3. 개발 진척도 & 타임라인
          </button>
        </div>

        {/* ========================================================================= */}
        {/* Tab 1: GIJO Security */}
        {/* ========================================================================= */}
        {activeTab === 'security' && (
          <div className="tab-pane page-fade-in">
            <div className="res-card">
              <div className="res-card-badge sec-badge">CORE MISSION</div>
              <h3>1.1 취약점 관리 시스템 개요</h3>
              <p>
                Kali Linux 환경의 수집 분석 모듈과 로컬 LLM을 결합하여, 실시간 자산 발견부터 취약점 스캔, 위협 인텔리전스(CTI) 교차 분석, 
                및 조치 리포팅을 폐쇄망 내에서 안전하게 수행하는 지속적 보안 상태 평가 프레임워크를 수립합니다.
              </p>
              <div className="out-of-scope-box border-sec">
                <strong>🚫 비목표 (Out of Scope):</strong> 자산 취약점 자동 패치 직접 실행 (시스템은 오직 위협 발견, 정규화, 심각도 산정 및 권고안 리포트 작성까지만 수행하며 조치는 관리자 승인 하에 실행)
              </div>
            </div>

            <div className="res-card">
              <div className="res-card-badge sec-badge">ARCHITECTURE</div>
              <h3>1.2 5개 레이어 시스템 구조</h3>
              <p className="tab-intro-p">본 시스템은 원격 수집 단계부터 제어 및 화면 표시 단계까지 긴밀하게 연계된 5대 레이어로 이루어져 있습니다.</p>
              
              <div className="layers-visualizer">
                {[
                  { name: "제어 / 표시 (Control & Display)", role: "APScheduler를 통한 주기적 탐지 작업 실행 제어, Connect AI 클라이언트 UI 표시", components: "Connect AI Electron UI, WebSockets", color: "#00d2ff" },
                  { name: "분석 (Analysis)", role: "로컬 LLM 기반 자연어 의도 라우팅(intent.ts) 및 취약점 결과 분석(localengine.ts)", components: "Qwythos-9B, llama-server", color: "#be93e4" },
                  { name: "저장 (Storage)", role: "인메모리/로컬 DB를 통한 스캔 자산 및 취약점 이력 보존", components: "SQLite (임베디드), localstorage", color: "#f5c249" },
                  { name: "인텔리전스 (Threat Intelligence)", role: "CVE 기반 실악용 정보 교차검증 및 취약점 우선순위 자동 승격", components: "CISA KEV 피드 연동, mcp.ts (SBOM 요약)", color: "#27ae60" },
                  { name: "수집 (Collection)", role: "자산 탐지 및 포트, 취약점 스캔 어댑터", components: "Nmap, Nuclei, Scan Adapters", color: "#ff2d55" },
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

            <div className="res-grid-2">
              <div className="res-card">
                <div className="res-card-badge sec-badge">SCORING</div>
                <h3>1.3 실시간 위험 우선순위 산정</h3>
                <p>
                  단순 CVSS 기본 수치 외에, 실제 악용 가능성과 자산의 비즈니스 가치를 결합하여 위협 우선순위를 정밀 산정합니다.
                </p>
                <div className="score-bars-list">
                  {[
                    { label: "CVSS 기본 점수", weight: 40, color: "#ff2d55", desc: "스캐너 진단 결과 (Critical, High 등)" },
                    { label: "CISA KEV 등재 여부", weight: 30, color: "#f5c249", desc: "실제 와일드카드 공격 탐지 시 최우선 순위 격상" },
                    { label: "자산 중요도", weight: 20, color: "#00d2ff", desc: "비즈니스 핵심 DB 및 서비스 운영 자산 여부" },
                    { label: "MISP CTI 빈도", weight: 10, color: "#27ae60", desc: "외부 위협 피드 내 최근 활동성 정보 가중치" }
                  ].map((score, idx) => (
                    <div key={idx} className="score-progress-wrap">
                      <div className="score-label-flex">
                        <span><strong>{score.label}</strong> <em style={{ opacity: 0.5, fontSize: '0.8rem' }}>({score.desc})</em></span>
                        <span style={{ color: score.color, fontWeight: 'bold' }}>{score.weight}%</span>
                      </div>
                      <div className="progress-bg">
                        <div className="progress-bar" style={{ width: `${score.weight}%`, backgroundColor: score.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="res-card">
                <div className="res-card-badge sec-badge">VULNERABILITY LEVEL</div>
                <h3>1.4 최근 개선 완료 로직 (2026-07-14)</h3>
                <div className="update-status-list">
                  <div className="update-status-item">
                    <span className="status-dot green"></span>
                    <div className="status-info">
                      <h4>자산 ID 기반 스캔 경로 매핑</h4>
                      <p>기존 스캐너 어댑터가 자산 ID 문자열을 경로로 오인하던 구조를 개선, `assets.ts` 레지스트리에서 자산의 실제 파일/IP 경로(`asset.path`)를 조회해 실행하도록 수정 완료.</p>
                    </div>
                  </div>
                  <div className="update-status-item">
                    <span className="status-dot green"></span>
                    <div className="status-info">
                      <h4>심각도 기반 동적 우선순위 덮어쓰기</h4>
                      <p>스캔이 완료되면 검출된 finding 심각도에 따라 초기 우선순위를 `critical ➔ P0`, `high ➔ P1`, `medium ➔ P2`, `low ➔ P3`로 즉시 업데이트하도록 `priorityForFindings()` 로직을 구현 완료.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Tab 2: GIJO Local LLM */}
        {/* ========================================================================= */}
        {activeTab === 'llm' && (
          <div className="tab-pane page-fade-in">
            <div className="res-grid-2">
              <div className="res-card">
                <div className="res-card-badge llm-badge">LLM CONFIG</div>
                <h3>2.1 로컬 추론 엔진 및 제원</h3>
                <p>
                  사내 보안 기밀 유출 방지를 위해 전면 폐쇄망에서 작동하는 **llama-server.exe** 기반의 API 환경을 구축합니다.
                </p>
                <div className="spec-table">
                  <div className="spec-row">
                    <span className="spec-th">기본 모델</span>
                    <span className="spec-td">Qwythos-9B-Claude-Mythos-5-1M (Q4_K_M 양자화)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-th">KV 캐시 사이즈</span>
                    <span className="spec-td">8192 (VRAM 부족 시 4096 유동 조정)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-th">GPU 오프로딩</span>
                    <span className="spec-td">-ngl -1 (RTX 3090 VRAM에 100% 탑재, 6~7GB 점유)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-th">서빙 방식</span>
                    <span className="spec-td">llama-server.exe 구동 (OpenAI 호환 포트 8080)</span>
                  </div>
                </div>
              </div>

              <div className="res-card">
                <div className="res-card-badge llm-badge">LLM MODEL SWAP</div>
                <h3>2.2 모델 스왑 및 성능 로드맵</h3>
                <p>
                  현재 초기 개발 및 테스트 속도 확보를 위해 가벼운 **Qwythos-9B** 모델을 탑재했습니다. 향후 실제 배포 단계에서의 모델 운영안입니다.
                </p>
                <div className="model-comparison">
                  <div className="model-compare-box">
                    <h4 style={{ color: '#00d2ff' }}>Qwythos-9B (현재 적용)</h4>
                    <ul>
                      <li>VRAM 점유율: ~6.5GB (매우 가벼움)</li>
                      <li>특징: 초기 빌드 테스트 및 기민한 반응 속도</li>
                    </ul>
                  </div>
                  <div className="model-compare-box">
                    <h4 style={{ color: '#be93e4' }}>Qwen3-30B-A3B (향후 검토)</h4>
                    <ul>
                      <li>VRAM 점유율: ~20GB 내외</li>
                      <li>특징: 대규모 MoE(활성 3B), 취약점 심층 요약 및 정교한 리포트 작성용 고사양 모델</li>
                    </ul>
                  </div>
                </div>
                <p className="extra-note">※ 모델 스왑 제어 로직 자체는 Express 서버의 `localengine.ts` 내에 자식 프로세스 제어 방식으로 완전 구축되어 있습니다.</p>
              </div>
            </div>

            <div className="res-card">
              <div className="res-card-badge llm-badge">INTENT SERVICE</div>
              <h3>2.3 최근 완료 사항: 자연어 의도 라우팅 (2026-07-14)</h3>
              <p>
                기존의 정규식(Regex) 기반의 임시 라우터 분석기를 고도화하여, 로컬 LLM을 통한 **Few-shot 의도 분류 및 JSON 파싱** 기능으로 전환을 마쳤습니다.
              </p>
              
              <div className="feature-flow-box">
                <div className="flow-step">
                  <span className="flow-num">1</span>
                  <h5>사용자 프롬프트 수신</h5>
                  <p>"웹 자산 스캔해줘" 등의 보안 명령어를 입력받습니다.</p>
                </div>
                <div className="flow-step">
                  <span className="flow-num">2</span>
                  <h5>Few-shot LLM 분석</h5>
                  <p>등록된 자산 목록을 프롬프트에 포함하여 LLM에 의도 파악과 개체명(Entity) 인식을 동시에 위임합니다.</p>
                </div>
                <div className="flow-step">
                  <span className="flow-num">3</span>
                  <h5>JSON 파싱 및 라우팅</h5>
                  <p>JSON 응답 결과에 맞춰 알맞은 분석 도구(스캐너 등)로 라우팅을 매핑합니다.</p>
                </div>
                <div className="flow-step">
                  <span className="flow-num">4</span>
                  <h5>하이브리드 폴백 탑재</h5>
                  <p>LLM 모델이 꺼져 있거나 결과가 정상 파싱되지 않으면 기존의 정규식 라우팅으로 자동 풀백하여 작동 안전성을 보장합니다. (`server/test/intent.test.ts` 검증 완료)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* Tab 3: Timeline & Progress */}
        {/* ========================================================================= */}
        {activeTab === 'progress' && (
          <div className="tab-pane page-fade-in">
            <div className="res-card">
              <div className="res-card-badge prog-badge">CURRENT STATUS</div>
              <h3>프로젝트 진척 현황판</h3>
              <p>최근 구현된 기능들과 앞으로 완료해야 할 필수 개발 목록입니다.</p>
              
              <div className="todo-lists-grid">
                <div className="todo-column">
                  <h4 style={{ color: '#27ae60' }}>🟢 완료된 개발 항목 (Done)</h4>
                  <ul className="progress-todo-list">
                    <li><span className="chk-box checked">✓</span> <strong>Stdio 기반 MCP 서버 구축 (`mcp.ts`)</strong>: 보안 스캔 시뮬레이션 및 SBOM 정보 조회를 외부 도구로 노출</li>
                    <li><span className="chk-box checked">✓</span> <strong>초기 개발 모델 단일화</strong>: Qwythos-9B 모델을 `models/qwythos-9b/qwythos-9b.gguf` 규격에 매핑 완료</li>
                    <li><span className="chk-box checked">✓</span> <strong>자연어 라우팅 고도화</strong>: `intent.ts` Few-shot 분석 및 예외 폴백 모듈 작성 완료</li>
                    <li><span className="chk-box checked">✓</span> <strong>스캐너 자산 매핑 & 우선순위 보완</strong>: `assets.ts` 파일 경로 바인딩 및 finding 심각도 동적 반영 로직 구현 완료</li>
                    <li><span className="chk-box checked">✓</span> <strong>GUI 타이틀바/메뉴바 정리</strong>: 화면 내 중복되던 불필요 가짜 윈도우 UI 띠 일괄 제거 완료</li>
                  </ul>
                </div>
                
                <div className="todo-column">
                  <h4 style={{ color: '#be93e4' }}>🟡 남은 핵심 구현 항목 (Todo)</h4>
                  <ul className="progress-todo-list">
                    <li><span className="chk-box">☐</span> <strong>로컬 LLM 실기동 검증</strong>: 실제 로그인 환경에서 API/WebSocket 루프를 돌려 실시간 취약성 분류 결과 확인</li>
                    <li><span className="chk-box">☐</span> <strong>Express 백엔드 MCP(SSE) 확장</strong>: 포트 4000번에서 HTTP SSE(Server-Sent Events)를 통해 외부 협업 도구들에 MCP 기능을 제공하도록 어댑터 탑재</li>
                    <li><span className="chk-box">☐</span> <strong>대시보드 실데이터 연동</strong>: 프론트엔드의 가짜 목업 데이터를 SQLite DB 스캔 결과와 바인딩</li>
                    <li><span className="chk-box">☐</span> <strong>JWT 로그인 인증 보강</strong>: Access Token / Refresh Token 이중화 처리</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="res-card">
              <div className="res-card-badge prog-badge">ROADMAP</div>
              <h3>12주 전체 개발 로드맵</h3>
              
              <div className="timeline-flow">
                {[
                  { week: "1-2주차", title: "환경 구축 & 로컬 LLM 오프라인 세팅", desc: "CUDA 백엔드 빌드, llama.cpp 서버 구축 및 Qwythos-9B GGUF 모델 연동 완료" },
                  { week: "3-4주차", title: "스캐너 어댑터 및 자산 수집 설계", desc: "Nmap/Nuclei 수집 모듈 연동 및 SQLite 자산 인벤토리 DB 매핑 완료" },
                  { week: "5-6주차", title: "지능형 의도 분석 및 CTI 우선순위 산정", desc: "Few-shot intent.ts 라우터 고도화 및 CISA KEV 피드 위협 교차 검증 구현" },
                  { week: "7-8주차", title: "API 오케스트레이터 및 알림 연동", desc: "Express 백엔드 통합, WebSocket 로그 전파, MCP 서버 SSE 프로토콜 확장" },
                  { week: "9-10주차", title: "프론트엔드 연동 & 대시보드 시각화", desc: "Electron UI와 API 바인딩, 자산 정보 실시간 추이 및 조치 리포트 모달 완성" },
                  { week: "11-12주차", title: "보안성 검토 및 최종 필드 테스트", desc: "폐쇄망 모의 침투를 통한 스캔 탐지 신뢰성 검증 및 패키징 완료" }
                ].map((item, idx) => (
                  <div key={idx} className="timeline-node">
                    <div className="timeline-time">{item.week}</div>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content-box">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .research-wrapper {
          min-height: 100vh;
          padding: 3.5rem 1.5rem;
          position: relative;
          /* blur(150px) 메시 3개 + 무한 애니메이션 → 정지된 그라데이션 1개 */
          background:
            radial-gradient(1100px 550px at 50% -8%, rgba(53, 214, 255, 0.06), transparent 70%),
            var(--t-bg);
        }
        
        .res-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .res-mesh { display: none; }
        .res-mesh-1 {
          width: 600px; height: 600px;
          background: #00d2ff;
          top: -10%; left: -10%;
        }
        .res-mesh-2 {
          width: 500px; height: 500px;
          background: #9b51e0;
          bottom: -10%; right: -10%;
          animation-delay: 4s;
        }
        .res-mesh-3 {
          width: 400px; height: 400px;
          background: #27ae60;
          top: 40%; left: 30%;
          opacity: 0.04;
          animation-delay: 8s;
        }
        
        .res-container {
          position: relative;
          z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        /* Header */
        .res-header {
          position: relative;
          margin-bottom: 3.5rem;
          text-align: center;
        }
        .btn-back-hub {
          position: absolute;
          top: 0; left: 0;
          background: transparent;
          border: 1px solid var(--t-line-strong);
          color: var(--t-fg-muted);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }
        .btn-back-hub:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-color: rgba(0, 210, 255, 0.4);
          transform: translateX(-3px);
        }
        .res-logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .res-logo-img {
          width: 64px;
          filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.35));
        }
        .res-logo-text {
          font-family: 'Syncopate', sans-serif;
          font-size: 2.2rem;
          letter-spacing: -1px;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 40%, #c7d2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .res-subtitle {
          font-size: 0.8rem;
          letter-spacing: 0.4em;
          color: var(--t-fg-subtle);
          font-weight: 700;
          margin-left: 0.4em;
        }
        
        /* General Cards */
        .res-card {
          background: var(--t-surface-1);
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius);
          padding: 2rem;
          margin-bottom: 1rem;
          text-align: left;
          transition: border-color 0.18s ease;
        }
        .res-card:hover {
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        
        .overview-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border-color: rgba(255, 255, 255, 0.06);
        }
        .overview-p {
          font-size: 1.1rem;
          line-height: 1.7;
          opacity: 0.75;
          margin: 0 0 2rem;
        }
        
        .res-card-badge {
          display: inline-block;
          padding: 4px 10px;
          background: var(--t-accent-weak);
          border: 1px solid var(--t-accent-line);
          color: var(--t-accent);
          border-radius: 6px;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 1.25rem;
        }
        
        /* Specs bar */
        .specs-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 1.25rem 2rem;
        }
        .spec-info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .spec-label {
          font-size: 0.7rem;
          color: var(--t-fg-subtle);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .spec-value {
          font-size: 1.05rem;
          font-weight: 600;
          color: #a5b4fc;
        }
        
        /* Navigation Tabs */
        .res-tabs-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 6px;
          border-radius: 50px;
        }
        .res-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--t-fg-muted);
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .res-tab-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.03);
        }
        .res-tab-btn.active {
          color: var(--t-accent);
          background: var(--t-accent-weak);
          font-weight: 700;
        }
        .sec-active {
          background: rgba(0, 210, 255, 0.12) !important;
          border: 1px solid rgba(0, 210, 255, 0.2) !important;
          color: #00d2ff !important;
          box-shadow: 0 5px 15px rgba(0, 210, 255, 0.1);
        }
        .llm-active {
          background: rgba(155, 81, 224, 0.12) !important;
          border: 1px solid rgba(155, 81, 224, 0.2) !important;
          color: #be93e4 !important;
          box-shadow: 0 5px 15px rgba(155, 81, 224, 0.1);
        }
        .prog-active {
          background: rgba(39, 174, 96, 0.12) !important;
          border: 1px solid rgba(39, 174, 96, 0.2) !important;
          color: #27ae60 !important;
          box-shadow: 0 5px 15px rgba(39, 174, 96, 0.1);
        }
        
        /* Badges */
        .sec-badge {
          background: rgba(0, 210, 255, 0.08) !important;
          border-color: rgba(0, 210, 255, 0.25) !important;
          color: #00d2ff !important;
        }
        .llm-badge {
          background: rgba(155, 81, 224, 0.08) !important;
          border-color: rgba(155, 81, 224, 0.25) !important;
          color: #be93e4 !important;
        }
        .prog-badge {
          background: rgba(39, 174, 96, 0.08) !important;
          border-color: rgba(39, 174, 96, 0.25) !important;
          color: #27ae60 !important;
        }
        
        .out-of-scope-box {
          border-radius: 16px;
          padding: 1.25rem 1.75rem;
          background: rgba(255, 255, 255, 0.01);
          font-size: 0.95rem;
          line-height: 1.5;
          margin-top: 1.5rem;
        }
        .border-sec {
          border-left: 4px solid #00d2ff;
        }
        
        /* Layers visualizer */
        .layers-visualizer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .visual-layer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: transform 0.3s ease;
        }
        .visual-layer-bar:hover {
          transform: translateX(6px);
          background: rgba(255, 255, 255, 0.03);
        }
        .layer-main-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .layer-num {
          font-size: 1.2rem;
          font-weight: 800;
          opacity: 0.45;
        }
        .layer-main-info h4 {
          margin: 0 0 4px;
          font-size: 1.05rem;
          font-weight: 700;
        }
        .layer-main-info p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.5;
        }
        .layer-tech-badge {
          font-size: 0.85rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.02);
          padding: 6px 14px;
          border-radius: 8px;
        }
        
        /* Grid */
        .res-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        
        /* Progress bars */
        .score-bars-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
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
          background: rgba(255, 255, 255, 0.04);
          border-radius: 10px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          border-radius: 10px;
        }
        
        /* Update status list */
        .update-status-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1rem;
        }
        .update-status-item {
          display: flex;
          gap: 1rem;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }
        .status-dot.green {
          background: #27ae60;
          box-shadow: 0 0 8px #27ae60;
        }
        .status-info h4 {
          margin: 0 0 6px;
          font-size: 1rem;
          font-weight: 700;
        }
        .status-info p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.6;
          line-height: 1.5;
        }
        
        /* Spec Table */
        .spec-table {
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          overflow: hidden;
          margin-top: 1rem;
        }
        .spec-row {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .spec-row:last-child {
          border-bottom: none;
        }
        .spec-th {
          width: 35%;
          padding: 1rem;
          font-weight: 700;
          font-size: 0.85rem;
          background: rgba(255, 255, 255, 0.01);
          color: var(--t-fg-subtle);
          border-right: 1px solid rgba(255, 255, 255, 0.03);
        }
        .spec-td {
          width: 65%;
          padding: 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
        }
        
        /* Comparison */
        .model-comparison {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem 0;
        }
        .model-compare-box {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 1rem 1.25rem;
        }
        .model-compare-box h4 {
          margin: 0 0 6px;
          font-size: 0.95rem;
        }
        .model-compare-box ul {
          margin: 0;
          padding-left: 1.2rem;
          font-size: 0.85rem;
          opacity: 0.6;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .extra-note {
          font-size: 0.8rem;
          color: var(--t-fg-subtle);
          margin: 0;
        }
        
        /* Few shot flowchart */
        .feature-flow-box {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .flow-step {
          position: relative;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .flow-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(155, 81, 224, 0.15);
          color: #be93e4;
          font-size: 0.85rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .flow-step h5 {
          margin: 0 0 6px;
          font-size: 0.95rem;
          font-weight: 700;
        }
        .flow-step p {
          margin: 0;
          font-size: 0.8rem;
          opacity: 0.55;
          line-height: 1.4;
        }
        
        /* Todo grid */
        .todo-lists-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .todo-column h4 {
          margin: 0 0 1rem;
          font-size: 1.05rem;
          font-weight: 700;
        }
        .progress-todo-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .progress-todo-list li {
          display: flex;
          gap: 8px;
          font-size: 0.85rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.75);
        }
        .chk-box {
          color: var(--t-fg-subtle);
          font-weight: bold;
          flex-shrink: 0;
        }
        .chk-box.checked {
          color: #27ae60;
        }
        
        /* Timeline */
        .timeline-flow {
          display: flex;
          flex-direction: column;
          margin-top: 2rem;
          position: relative;
        }
        .timeline-flow::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: 120px;
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
        }
        .timeline-node {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
          position: relative;
          z-index: 5;
        }
        .timeline-node:last-child {
          margin-bottom: 0;
        }
        .timeline-time {
          width: 100px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--t-fg-subtle);
          text-align: right;
          padding-top: 6px;
        }
        .timeline-marker {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid #030508;
          margin: 11px 16px 0;
          z-index: 10;
        }
        .timeline-node:hover .timeline-marker {
          background: #00d2ff;
          box-shadow: 0 0 10px #00d2ff;
        }
        .timeline-content-box {
          flex: 1;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 1rem 1.5rem;
        }
        .timeline-content-box h4 {
          margin: 0 0 4px;
          font-size: 0.95rem;
          font-weight: 700;
        }
        .timeline-content-box p {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.5;
          line-height: 1.4;
        }
        
        @keyframes floatGlow {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(30px) scale(1.05); }
        }
        
        @media (max-width: 960px) {
          .res-grid-2, .todo-lists-grid {
            grid-template-columns: 1fr;
          }
          .feature-flow-box {
            grid-template-columns: repeat(2, 1fr);
          }
          .timeline-flow::after { left: 90px; }
          .timeline-time { width: 70px; }
          .btn-back-hub { position: relative; margin-bottom: 1.5rem; }
        }
        @media (max-width: 640px) {
          .feature-flow-box {
            grid-template-columns: 1fr;
          }
          .specs-bar {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default GijoResearch;
