import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, Navigate, Link } from 'react-router-dom';
import PremiumLanding from './PremiumLanding';
import DesignerShowcase from './DesignerShowcase';
import PaymentPage from './PaymentPage';
import NoticeBoard from './NoticeBoard';
import DesignerTV from './DesignerTV';
import B2BInfo from './B2BInfo';
import Login from './Login';
import DesignerDashboard from './DesignerDashboard';
import AdminPanel from './AdminPanel';
import AdminGuideUserManager from './AdminGuideUserManager';
import { mockDb } from '../data/mockDb';
import { railwayApi, isRailwayApiEnabled } from '../services/railwayApi';
import './tour-theme.css';

/** 고객 화면 공통 셸. 정제된 다크 토큰을 적용한다. */
function TourPage({ children }) {
  return <div className="tour-surface t-page">{children}</div>;
}

function normalizeBudget(rawBudget) {
  if (!rawBudget || !rawBudget.trim()) return '1,590,000원~';
  return rawBudget.includes('원') || rawBudget.includes('만원') ? rawBudget : `${rawBudget}원`;
}

function NotFound() {
  return (
    <TourPage>
      <section className="t-section">
        <div className="t-shell" style={{ textAlign: 'center' }}>
          <span className="t-eyebrow">404</span>
          <h1>요청하신 페이지를 찾을 수 없습니다</h1>
          <p>주소가 변경되었거나 삭제된 페이지입니다.</p>
          <Link to="/gijotour" className="t-btn t-btn--primary">지아이조 투어 홈으로</Link>
        </div>
      </section>
    </TourPage>
  );
}

/**
 * 역할 기반 라우트 가드.
 * 주의: localStorage의 값을 신뢰하는 클라이언트 측 가드이므로 실제 보안 장치가 아니다.
 * 목업 단계에서 역할별 동선을 분리하는 용도이며, 실제 인증은 서버에서 검증해야 한다.
 */
function RequireRole({ isLoggedIn, userRole, allow, children }) {
  if (!isLoggedIn || !allow.includes(userRole)) {
    return <Navigate to="/gijotour/login" replace />;
  }
  return children;
}

function GijoTourApp({
  isLoggedIn = false,
  setIsLoggedIn,
  userRole,
  setUserRole,
  userName,
  setUserName,
  forceBoardWrite,
  setForceBoardWrite,
  boardFilterAuthor,
  setBoardFilterAuthor
}) {
  const navigate = useNavigate();

  // DesignerShowcase / PaymentPage 는 mockDb.packages 모양(designer, youtubeUrl,
  // reviews, detailedPlan.pricing …)을 기대한다. 이전에 여기 하드코딩돼 있던 배열은
  // detailedPlan이 {day1,day2,day3} 모양이라 상세 모달과 결제 화면에서 크래시했다.
  const [packages, setPackages] = useState(() =>
    mockDb.packages.map((pkg, index) => ({ id: index + 1, ...pkg }))
  );
  const [selectedPackageForPayment, setSelectedPackageForPayment] = useState(null);

  const [notices, setNotices] = useState(mockDb.notices);
  const [pendingDesigners, setPendingDesigners] = useState(mockDb.pendingDesigners ?? []);
  const [designers, setDesigners] = useState(mockDb.admin.designers);
  const [designerProposals, setDesignerProposals] = useState(mockDb.designerDashboard.proposals);
  const [tvVideos, setTvVideos] = useState(mockDb.tv);
  const [matchingRequests, setMatchingRequests] = useState([]);

  // ── 고객: 매칭 신청 접수 ────────────────────────────────────────────
  const handleCreateMatchingRequest = useCallback(async (form) => {
    const purpose = form.purpose?.trim() || '프라이빗 힐링';
    const people = form.people?.trim() || '2명';
    const travelDate = form.date?.trim() || '상담 후 확정';
    const budget = normalizeBudget(form.budget);
    const contact = form.contact?.trim() || '상담 필요';
    const title = `${purpose} 맞춤 전문가 매칭 요청`;

    const payload = { people, travel_date: travelDate, budget, purpose, contact };

    let saved = null;
    let saveError = null;

    if (isRailwayApiEnabled()) {
      try {
        saved = await railwayApi.createMatchingRequest(payload);
      } catch (err) {
        // 서버 저장에 실패해도 고객 동선을 끊지 않는다. 카카오 채널 안내는 그대로 노출.
        saveError = err instanceof Error ? err.message : String(err);
      }
    }

    // 관리자 화면이 API 없이도 동작하도록 로컬에도 반영한다.
    const localRecord = {
      id: saved?.id ?? Date.now(),
      ...payload,
      title,
      status: saved?.status ?? '접수',
      created_at: saved?.created_at ?? new Date().toISOString().slice(0, 19)
    };
    setMatchingRequests((prev) => [localRecord, ...prev]);

    return {
      title,
      receiptNo: `GJ-${String(localRecord.id).slice(-6)}`,
      savedToServer: Boolean(saved),
      apiConfigured: isRailwayApiEnabled(),
      saveError
    };
  }, []);

  const handleStartPayment = (pkg) => {
    setSelectedPackageForPayment(pkg);
    navigate('/gijotour/payment');
  };

  /** 고객이 남긴 평점·후기를 해당 설계사의 패키지에 반영한다. */
  const handleRate = (designerName, nickname, rating, comment) => {
    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.designer !== designerName) return pkg;

        const reviews = [
          {
            nickname,
            rating,
            comment,
            date: new Date().toISOString().slice(0, 10)
          },
          ...(pkg.reviews ?? [])
        ];

        const reviewCount = (pkg.reviewCount ?? 0) + 1;
        // 기존 평균에 새 평점을 가중 반영
        const nextRating = ((pkg.rating ?? 0) * (reviewCount - 1) + rating) / reviewCount;

        return { ...pkg, reviews, reviewCount, rating: Number(nextRating.toFixed(1)) };
      })
    );
  };

  // ── 게시판 ──────────────────────────────────────────────────────────
  const handleAddNotice = (formData) => {
    setNotices((prev) => [
      {
        ...formData,
        id: prev.reduce((max, n) => Math.max(max, n.id ?? 0), 0) + 1,
        date: new Date().toISOString().slice(0, 10),
        author: userName
      },
      ...prev
    ]);
    setForceBoardWrite?.(false);
  };

  const handleDeleteNotice = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  // ── 인증 ────────────────────────────────────────────────────────────
  const handleLoginSuccess = (role, name) => {
    setUserRole?.(role);
    setUserName?.(name);
    setIsLoggedIn?.(true);
    navigate(role === 'admin' ? '/gijotour/admin' : '/gijotour/designer');
  };

  const handleLogout = () => {
    setIsLoggedIn?.(false);
    setUserRole?.('designer');
    setUserName?.('방문객');
    navigate('/gijotour');
  };

  const handleDesignerSignup = (data) => {
    setPendingDesigners((prev) => [
      ...prev,
      { ...data, id: Date.now(), date: new Date().toISOString().slice(0, 10) }
    ]);
  };

  // ── 관리자: 설계사 승인 ─────────────────────────────────────────────
  const handleApproveDesigner = (request) => {
    setDesigners((prev) => [
      ...prev,
      {
        id: prev.reduce((max, d) => Math.max(max, d.id ?? 0), 0) + 1,
        name: request.name,
        region: request.region,
        totalProposals: 0,
        rating: 0,
        reviewCount: 0,
        status: 'Active',
        reviews: []
      }
    ]);
    setPendingDesigners((prev) => prev.filter((r) => r.id !== request.id));
  };

  // ── 설계사: 제안서 / 영상 등록 ──────────────────────────────────────
  const handleAddProposal = (proposal) => {
    setDesignerProposals((prev) => [
      {
        ...proposal,
        id: prev.reduce((max, p) => Math.max(max, p.id ?? 0), 0) + 1,
        designer: userName,
        status: '검토중',
        date: new Date().toISOString().slice(0, 10)
      },
      ...prev
    ]);
  };

  const handleAddTvVideo = (video) => {
    setTvVideos((prev) => [
      { ...video, id: prev.reduce((max, v) => Math.max(max, v.id ?? 0), 0) + 1, designer: userName, views: '0' },
      ...prev
    ]);
  };

  const guard = (allow, element) => (
    <RequireRole isLoggedIn={isLoggedIn} userRole={userRole} allow={allow}>
      {element}
    </RequireRole>
  );

  return (
    <Routes>
      {/* ── 고객 여정 ── */}
      <Route index element={<PremiumLanding onCreateMatchingRequest={handleCreateMatchingRequest} />} />
      <Route
        path="proposals"
        element={
          <TourPage>
            <DesignerShowcase
              packages={packages}
              onRate={handleRate}
              onStartPayment={handleStartPayment}
            />
          </TourPage>
        }
      />
      <Route
        path="payment"
        element={
          selectedPackageForPayment
            ? <TourPage><PaymentPage pkg={selectedPackageForPayment} onBack={() => navigate('/gijotour/proposals')} /></TourPage>
            : <Navigate to="/gijotour" replace />
        }
      />
      <Route
        path="reviews"
        element={
          <TourPage>
          <NoticeBoard
            notices={notices}
            isLoggedIn={isLoggedIn}
            userName={userName}
            onAddNotice={handleAddNotice}
            onDeleteNotice={handleDeleteNotice}
            forceWrite={forceBoardWrite}
            filterUserName={boardFilterAuthor}
            onClearFilter={() => setBoardFilterAuthor?.(null)}
          />
          </TourPage>
        }
      />
      <Route path="tv" element={<TourPage><DesignerTV videos={tvVideos} /></TourPage>} />
      <Route path="about" element={<B2BInfo />} />

      {/* ── 인증 ── */}
      <Route
        path="login"
        element={
          isLoggedIn
            ? <Navigate to={userRole === 'admin' ? '/gijotour/admin' : '/gijotour/designer'} replace />
            : (
              <Login
                onBack={() => navigate('/gijotour')}
                onLoginSuccess={handleLoginSuccess}
                onDesignerSignup={handleDesignerSignup}
                pendingRequests={pendingDesigners}
                activeDesigners={designers}
              />
            )
        }
      />

      {/* ── 설계사 여정 ── */}
      <Route
        path="designer"
        element={guard(['designer', 'admin'], (
          <DesignerDashboard
            userName={userName}
            onLogout={handleLogout}
            proposals={designerProposals}
            onAddProposal={handleAddProposal}
            tvVideos={tvVideos}
            onAddTvVideo={handleAddTvVideo}
            matchingRequests={matchingRequests}
          />
        ))}
      />

      {/* ── 관리자 여정 ── */}
      <Route
        path="admin"
        element={guard(['admin'], (
          <AdminPanel
            onLogout={handleLogout}
            designers={designers}
            setDesigners={setDesigners}
            stats={mockDb.admin.stats}
            pendingRequests={pendingDesigners}
            onApprove={handleApproveDesigner}
            matchingRequests={matchingRequests}
          />
        ))}
      />
      <Route path="admin/guides" element={guard(['admin'], <AdminGuideUserManager />)} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default GijoTourApp;
