import { Link } from 'react-router-dom';

const FIELDS = [
  { key: 'people', label: '동반 인원', placeholder: '성인 2명, 아동 1명', required: true },
  { key: 'date', label: '희망 여행 일정', placeholder: '2026년 8월 중순 3박4일', required: true },
  { key: 'budget', label: '희망 예산', placeholder: '1인당 150만원 내외', required: false },
  { key: 'purpose', label: '희망 테마', placeholder: '골프 투어, VIP 럭셔리, 미식', required: false },
  { key: 'contact', label: '연락처', placeholder: '매칭 알림을 받으실 번호 또는 이메일', required: true }
];

const MatchingForm = ({
  form,
  errors = {},
  submitting = false,
  receipt,
  onUpdateForm,
  onSubmit,
  hasKakao,
  onOpenKakao
}) => {
  if (receipt) {
    return (
      <div className="t-card t-receipt" role="status">
        <span className="t-eyebrow">접수 완료</span>
        <h2 className="t-receipt__title">{receipt.title}</h2>

        {receipt.receiptNo && (
          <p className="t-receipt__no">
            접수번호 <b>{receipt.receiptNo}</b>
          </p>
        )}

        {/* 저장 실패를 조용히 넘기지 않는다 */}
        {receipt.apiConfigured && !receipt.savedToServer && (
          <p className="t-error t-receipt__warn">
            서버 접수 처리에 실패했습니다. 아래 카카오 채널로 문의해 주시면 즉시 도와드리겠습니다.
          </p>
        )}

        <p>담당 매니저가 확인 후 연락드립니다. 더 빠른 상담을 원하시면 카카오 채널을 이용해 주세요.</p>

        <div className="t-receipt__actions">
          {hasKakao && (
            <button type="button" className="t-btn t-btn--primary" onClick={onOpenKakao}>
              카카오 채널로 상담하기
            </button>
          )}
          <Link to="/gijotour/proposals" className="t-btn t-btn--secondary">
            제안서 둘러보기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      className="t-card t-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="t-form__head">
        <h2>1:1 전문가 무료 매칭</h2>
        <p>조건을 남겨 주시면 전담 설계사를 매칭해 드립니다.</p>
      </div>

      {FIELDS.map((field) => {
        const errorId = `${field.key}-error`;
        const hasError = Boolean(errors[field.key]);

        return (
          <div className="t-field" key={field.key}>
            <label htmlFor={`m-${field.key}`}>
              {field.label}
              {field.required && <span className="t-req" aria-hidden="true"> *</span>}
              {field.required && <span className="sr-only"> (필수)</span>}
            </label>
            <input
              id={`m-${field.key}`}
              placeholder={field.placeholder}
              value={form[field.key]}
              onChange={(e) => onUpdateForm(field.key, e.target.value)}
              required={field.required}
              disabled={submitting}
              aria-invalid={hasError || undefined}
              aria-describedby={hasError ? errorId : undefined}
            />
            {hasError && (
              <p className="t-error" id={errorId}>{errors[field.key]}</p>
            )}
          </div>
        );
      })}

      <button type="submit" className="t-btn t-btn--primary t-form__submit" disabled={submitting}>
        {submitting ? '접수 중…' : '무료로 매칭받기'}
      </button>

      {hasKakao && (
        <button type="button" className="t-btn t-btn--secondary" onClick={onOpenKakao} disabled={submitting}>
          카카오 채널로 바로 상담
        </button>
      )}
    </form>
  );
};

export default MatchingForm;
