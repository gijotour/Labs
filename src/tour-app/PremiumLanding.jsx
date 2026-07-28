import { useState } from 'react';
import './tour-theme.css';
import './PremiumLanding.css';
import HeroSection from './components/HeroSection';
import PainPoints from './components/PainPoints';
import Solutions from './components/Solutions';
import FeatureLinks from './components/FeatureLinks';
import { hasKakaoChannel, openKakaoChannel } from './kakaoConfig';

const initialForm = {
  people: '',
  date: '',
  budget: '',
  purpose: '',
  contact: ''
};

const REQUIRED_FIELDS = [
  { key: 'people', label: '동반 인원' },
  { key: 'date', label: '희망 여행 일정' },
  { key: 'contact', label: '연락처' }
];

const PremiumLanding = ({ onCreateMatchingRequest }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const submitMatchingRequest = async () => {
    const nextErrors = {};
    REQUIRED_FIELDS.forEach(({ key, label }) => {
      if (!form[key].trim()) nextErrors[key] = `${label}을(를) 입력해 주세요.`;
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const result = await onCreateMatchingRequest?.(form);
      setReceipt(result ?? { title: '맞춤 제안서' });
      setForm(initialForm);
    } finally {
      setSubmitting(false);
    }
  };

  const formProps = {
    form,
    errors,
    submitting,
    receipt,
    onUpdateForm: updateForm,
    onSubmit: submitMatchingRequest,
    hasKakao: hasKakaoChannel,
    onOpenKakao: openKakaoChannel
  };

  return (
    <main className="tour-surface t-landing">
      <HeroSection formProps={formProps} />
      <PainPoints />
      <Solutions />
      <FeatureLinks />
    </main>
  );
};

export default PremiumLanding;
