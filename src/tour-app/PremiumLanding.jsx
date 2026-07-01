import React, { useState } from 'react';
import './PremiumLanding.css';
import HeroSection from './components/HeroSection';
import PainPoints from './components/PainPoints';
import Solutions from './components/Solutions';
import FeatureLinks from './components/FeatureLinks';
import AutoProposalForm from './components/AutoProposalForm';

const initialForm = {
  people: '',
  date: '',
  budget: '',
  purpose: '',
  contact: ''
};

// 미니 제안서 카드를 렌더링하는 서브 컴포넌트 (단가 숨김 상태 관리)
const RecentProposalCard = ({ p }) => {
  const [showPrice, setShowPrice] = useState(false);

  return (
    <div className="mini-proposal-card">
      <span className="mini-p-region-tag">{p.region}</span>
      <h3>{p.title}</h3>
      <p className="mini-p-desc">{p.description || '고객 맞춤 설계 전용 초개인화 일정표'}</p>
      <div className="mini-p-footer">
        <span className="mini-p-designer">By {p.designer}</span>
        {showPrice ? (
          <span className="mini-p-price" style={{ animation: 'fadeIn 0.3s ease' }}>{p.price || '상담 후 제안'}</span>
        ) : (
          <button 
            type="button" 
            onClick={() => setShowPrice(true)} 
            className="btn-show-price-mini"
            style={{
              background: 'rgba(0, 210, 255, 0.1)',
              color: 'var(--accent-color, #00d2ff)',
              border: '1px solid rgba(0, 210, 255, 0.3)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            단가 보기
          </button>
        )}
      </div>
    </div>
  );
};

const PremiumLanding = ({ onCreateAutoProposal, proposals = [] }) => {
  const kakaoUrl = 'https://pf.kakao.com/_YOUR_CHANNEL';
  const [form, setForm] = useState(initialForm);
  const [createdTitle, setCreatedTitle] = useState('');

  const openKakao = () => {
    window.location.href = kakaoUrl;
  };

  const updateForm = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const submitAutoProposal = () => {
    if (!form.people.trim() || !form.date.trim() || !form.contact.trim()) {
      alert('인원, 여행 날짜, 연락처는 필수입니다.');
      return;
    }

    const title = onCreateAutoProposal?.(form);
    setCreatedTitle(title || '맞춤 제안서');
    setForm(initialForm);
  };

  return (
    <main className="premium-landing">
      <HeroSection onOpenKakao={openKakao} />
      <PainPoints />
      <Solutions />
      <FeatureLinks />
      


      <AutoProposalForm
        form={form}
        onUpdateForm={updateForm}
        onSubmit={submitAutoProposal}
        createdTitle={createdTitle}
        onOpenKakao={openKakao}
      />
    </main>
  );
};

export default PremiumLanding;
