import { useState } from 'react';
import './tour-theme.css';

const METHODS = [
  { key: 'paypal', name: 'PayPal (MCP Secured)', desc: '전 세계 어디서나 안전한 결제' },
  { key: 'card', name: '신용 · 체크카드', desc: '법인카드 및 개인카드' }
];

const priceOf = (pkg) => (pkg.detailedPlan?.pricing ?? '상담 후 제안').split(' (')[0];

const PaymentPage = ({ pkg, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [step, setStep] = useState(1);
  const [taxInvoice, setTaxInvoice] = useState(false);

  if (!pkg) {
    return (
      <main className="tour-surface pay">
        <div className="t-shell pay__empty">
          <span aria-hidden="true">⚠️</span>
          <h1>상품 정보가 없습니다</h1>
          <p>결제할 상품을 먼저 선택해 주세요.</p>
          <button type="button" className="t-btn t-btn--secondary" onClick={onBack}>
            돌아가기
          </button>
        </div>
      </main>
    );
  }

  const handlePayment = () => {
    // PayPal MCP 연동 시 이 부분에 로직이 들어갈 예정
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 2) {
    return (
      <main className="tour-surface pay">
        <div className="t-shell pay__done">
          <div className="t-card pay__donecard" role="status">
            <span className="pay__check" aria-hidden="true">✓</span>
            <h1>결제가 완료되었습니다</h1>
            <p>
              담당 여행설계사 <strong>{pkg.designer}</strong>님이 곧 상세 일정을 확정하여
              연락드릴 예정입니다.
            </p>

            <dl className="pay__receipt">
              <div><dt>결제 금액</dt><dd className="pay__accent">{priceOf(pkg)}</dd></div>
              <div>
                <dt>결제 수단</dt>
                <dd>{METHODS.find((m) => m.key === paymentMethod)?.name}</dd>
              </div>
            </dl>

            <button type="button" className="t-btn t-btn--primary" onClick={onBack}>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="tour-surface pay">
      <div className="t-shell">
        <header className="pay__head">
          <span className="t-eyebrow">Checkout</span>
          <h1>주문 정보 확인</h1>
        </header>

        <div className="pay__grid">
          {/* ── 좌: 주문 상품 + 주문자 정보 ── */}
          <div className="pay__col">
            <article className="t-card pay__item">
              <img src={pkg.image} alt="" className="pay__thumb" />
              <div className="pay__iteminfo">
                <span className="t-eyebrow">{pkg.region}</span>
                <h2 className="pay__itemtitle">{pkg.title}</h2>
                <p className="pay__designer">{pkg.designer} 여행설계사</p>
              </div>
            </article>

            <section className="t-card pay__form">
              <h2 className="pay__formtitle">주문자 정보</h2>

              <div className="t-field">
                <label htmlFor="pay-name">예약자 성함 (실명)</label>
                <input id="pay-name" type="text" placeholder="홍길동" autoComplete="name" />
              </div>

              <div className="pay__row">
                <div className="t-field">
                  <label htmlFor="pay-tel">연락처</label>
                  <input id="pay-tel" type="tel" placeholder="010-0000-0000" autoComplete="tel" />
                </div>
                <div className="t-field">
                  <label htmlFor="pay-email">이메일</label>
                  <input id="pay-email" type="email" placeholder="example@gijo.co.kr" autoComplete="email" />
                </div>
              </div>

              <label className="pay__check-row" htmlFor="pay-tax">
                <input
                  id="pay-tax"
                  type="checkbox"
                  checked={taxInvoice}
                  onChange={(e) => setTaxInvoice(e.target.checked)}
                />
                <span>법인 세금계산서 발행 신청 (B2B 전용)</span>
              </label>

              {taxInvoice && (
                <div className="pay__tax">
                  <div className="t-field">
                    <label htmlFor="pay-bizno">사업자 등록 번호</label>
                    <input id="pay-bizno" type="text" placeholder="000-00-00000" />
                  </div>
                  <div className="t-field">
                    <label htmlFor="pay-bizname">법인명 · 사업장 주소</label>
                    <input id="pay-bizname" type="text" placeholder="사업자 등록증 상의 정보" />
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* ── 우: 결제 요약 (스크롤 따라감) ── */}
          <aside className="pay__side">
            <div className="t-card pay__summary">
              <h2 className="pay__formtitle">결제 금액</h2>

              <dl className="pay__breakdown">
                <div><dt>상품 금액</dt><dd>{priceOf(pkg)}</dd></div>
                <div><dt>예약 대행 수수료</dt><dd className="pay__free">무료</dd></div>
              </dl>

              <div className="pay__total">
                <span>합계</span>
                <strong>{priceOf(pkg)}</strong>
              </div>

              <fieldset className="pay__methods">
                <legend className="t-eyebrow">결제 수단</legend>
                {METHODS.map((m) => (
                  <label
                    key={m.key}
                    className={`pay__method ${paymentMethod === m.key ? 'is-active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={m.key}
                      checked={paymentMethod === m.key}
                      onChange={() => setPaymentMethod(m.key)}
                    />
                    <span className="pay__methodinfo">
                      <strong>{m.name}</strong>
                      <em>{m.desc}</em>
                    </span>
                  </label>
                ))}
              </fieldset>

              <div className="pay__actions">
                <button type="button" className="t-btn t-btn--primary" onClick={handlePayment}>
                  {paymentMethod === 'paypal' ? 'PayPal로 안전 결제' : '카드로 결제하기'}
                </button>
                <button type="button" className="t-btn t-btn--secondary" onClick={onBack}>
                  주문 취소
                </button>
              </div>

              <p className="pay__trust">🔒 SSL 암호화 · 🛡️ 이상거래 탐지 · 💳 PCI DSS</p>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .pay { padding: 3rem 0 var(--t-section); }
        .pay__head { margin-bottom: var(--t-gap-lg); }
        .pay__head h1 { font-size: 2rem; margin: 0; }

        .pay__grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: var(--t-gap-lg);
          align-items: start;
        }
        .pay__col { display: grid; gap: var(--t-gap); }

        .pay__item { display: flex; gap: var(--t-gap); align-items: center; }
        .pay__thumb {
          width: 108px; height: 78px;
          object-fit: cover;
          border-radius: var(--t-radius-sm);
          flex-shrink: 0;
        }
        .pay__itemtitle { font-size: 1.125rem; margin: 0.25rem 0 0.375rem; }
        .pay__designer { font-size: var(--t-small); color: var(--t-fg-subtle); margin: 0; }

        .pay__form { display: grid; gap: var(--t-gap); }
        .pay__formtitle { font-size: 1.125rem; margin: 0; }
        .pay__row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--t-gap-sm); }

        .pay__check-row {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: var(--t-small);
          color: var(--t-fg-muted);
          cursor: pointer;
        }
        .pay__check-row input { width: 16px; height: 16px; accent-color: var(--t-accent); }
        .pay__tax {
          display: grid;
          gap: var(--t-gap-sm);
          padding-top: var(--t-gap);
          border-top: 1px solid var(--t-line);
        }

        /* 요약은 스크롤을 따라간다 */
        .pay__side { position: sticky; top: 88px; }
        .pay__summary { display: grid; gap: var(--t-gap); }

        .pay__breakdown, .pay__receipt { margin: 0; display: grid; gap: 0.5rem; }
        .pay__breakdown > div,
        .pay__receipt > div { display: flex; justify-content: space-between; gap: 1rem; }
        .pay__breakdown dt, .pay__receipt dt { color: var(--t-fg-subtle); font-size: var(--t-small); }
        .pay__breakdown dd, .pay__receipt dd { margin: 0; color: var(--t-fg-muted); font-size: var(--t-small); }
        .pay__free { color: var(--t-accent) !important; }
        .pay__accent { color: var(--t-accent) !important; font-weight: 650; }

        .pay__total {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-top: var(--t-gap);
          border-top: 1px solid var(--t-line);
          font-weight: 650;
        }
        .pay__total strong { font-size: 1.5rem; color: var(--t-accent); letter-spacing: -0.02em; }

        .pay__methods { border: 0; padding: 0; margin: 0; display: grid; gap: 0.5rem; }
        .pay__methods legend { padding: 0; margin-bottom: 0.5rem; }
        .pay__method {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem;
          border: 1px solid var(--t-line);
          border-radius: var(--t-radius-sm);
          cursor: pointer;
          transition: border-color 0.18s ease, background 0.18s ease;
        }
        .pay__method:hover { border-color: var(--t-accent-line); }
        .pay__method.is-active { border-color: var(--t-accent); background: var(--t-accent-weak); }
        .pay__method input { width: 16px; height: 16px; accent-color: var(--t-accent); flex-shrink: 0; }
        .pay__methodinfo { display: grid; gap: 0.125rem; }
        .pay__methodinfo strong { font-size: 0.9375rem; color: var(--t-fg); font-weight: 650; }
        .pay__methodinfo em { font-style: normal; font-size: 0.8125rem; color: var(--t-fg-subtle); }

        .pay__actions { display: grid; gap: 0.5rem; }
        .pay__trust {
          margin: 0;
          padding-top: var(--t-gap);
          border-top: 1px solid var(--t-line);
          text-align: center;
          font-size: 0.75rem !important;
          color: var(--t-fg-subtle) !important;
        }

        /* 완료 화면 */
        .pay__done { display: grid; place-items: center; min-height: 60vh; }
        .pay__donecard { max-width: 480px; text-align: center; display: grid; gap: var(--t-gap); }
        .pay__check {
          justify-self: center;
          display: grid; place-items: center;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--t-accent-weak);
          border: 1px solid var(--t-accent-line);
          color: var(--t-accent);
          font-size: 1.5rem;
        }
        .pay__donecard h1 { font-size: 1.5rem; margin: 0; }
        .pay__donecard p { margin: 0; }
        .pay__receipt {
          padding: var(--t-gap) 0;
          border-top: 1px solid var(--t-line);
          border-bottom: 1px solid var(--t-line);
          text-align: left;
        }

        .pay__empty {
          display: grid; place-items: center; gap: var(--t-gap);
          min-height: 60vh; text-align: center;
        }
        .pay__empty span { font-size: 2rem; }
        .pay__empty h1 { font-size: 1.5rem; margin: 0; }
        .pay__empty p { margin: 0; }

        @media (max-width: 900px) {
          .pay__grid { grid-template-columns: 1fr; }
          .pay__side { position: static; }
        }
        @media (max-width: 600px) {
          .pay__row { grid-template-columns: 1fr; }
          .pay__item { flex-direction: column; align-items: flex-start; }
          .pay__thumb { width: 100%; height: 160px; }
        }
      `}</style>
    </main>
  );
};

export default PaymentPage;
