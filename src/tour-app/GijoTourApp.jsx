import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import PremiumLanding from './PremiumLanding';
import DesignerShowcase from './DesignerShowcase';
import PaymentPage from './PaymentPage';

function normalizeBudget(rawBudget) {
  if (!rawBudget || !rawBudget.trim()) return '1,590,000원~';
  return rawBudget.includes('원') || rawBudget.includes('만원') ? rawBudget : `${rawBudget}원`;
}

function GijoTourApp() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([
    { id: 1, title: '방콕 루프탑 & 럭셔리 요트 3박4일', region: '태국 방콕', price: '₩1,890,000', rating: 4.9, reviewCount: 18, image: 'https://images.unsplash.com/photo-1552465011-b4e21bd6e79a?q=80&w=2039&auto=format&fit=crop', description: '방콕 최고의 야경과 럭셔리 요트 투어가 결합된 고품격 패키지', detailedPlan: { day1: '공항 픽업 및 호텔 체크인', day2: '럭셔리 요트 선셋 투어', day3: '루프탑 바 디너 및 자유 시간' } },
    { id: 2, title: '세부 아일랜드 힐링 호핑투어 4박5일', region: '필리핀 세부', price: '₩1,490,000', rating: 4.8, reviewCount: 22, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop', description: '세부 청정 해역에서의 요트 호핑 및 스파 힐링 코스', detailedPlan: { day1: '세부 입국 및 전용 리조트 체크인', day2: '호핑투어 및 바비큐 런치', day3: '올인클루시브 오션뷰 스파 마사지' } }
  ]);
  const [selectedPackageForPayment, setSelectedPackageForPayment] = useState(null);

  const handleCreateProposal = async (form) => {
    const purpose = form.purpose?.trim() || '프라이빗 힐링';
    const people = form.people?.trim() || '2명';
    const date = form.date?.trim() || '상담 후 확정';
    const budget = normalizeBudget(form.budget);
    const contact = form.contact?.trim() || '상담 필요';
    const title = `${purpose} 맞춤 전문가 매칭 요청`;

    // 카카오톡 공유/문의 메시지 텍스트 템플릿 생성
    const messageText = `[지아이조 투어 B2B 매칭 의뢰]\n\n• 동반 인원: ${people}\n• 희망 일정: ${date}\n• 예산 범위: ${budget}\n• 희망 테마: ${purpose}\n• 연락처: ${contact}\n\n위 고객 조건으로 실시간 VIP 맞춤 설계를 의뢰합니다.`;
    
    const encodedMessage = encodeURIComponent(messageText);
    
    // 간편하게 오픈 챗 링크 이동 안내
    alert(`[매칭 요청 정보가 구성되었습니다]\n\n확인 버튼을 누르시면 카카오톡 문의 화면으로 연결됩니다. 아래 의뢰 내용을 상담사에게 전달해주세요.\n\n${messageText}`);
    window.open(`https://open.kakao.com/o/sGIJOTOUR_CHAT?text=${encodedMessage}`, '_blank');

    navigate('/gijotour/proposals');
    return title;
  };

  const handleStartPayment = (pkg) => {
    setSelectedPackageForPayment(pkg);
    navigate('/gijotour/payment');
  };

  return (
    <Routes>
      <Route index element={<PremiumLanding onCreateAutoProposal={handleCreateProposal} proposals={[]} />} />
      <Route path="proposals" element={<DesignerShowcase packages={packages} onStartPayment={handleStartPayment} />} />
      <Route path="payment" element={selectedPackageForPayment ? <PaymentPage pkg={selectedPackageForPayment} onBack={() => navigate('/gijotour/proposals')} /> : <Navigate to="/gijotour" />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}

export default GijoTourApp;
