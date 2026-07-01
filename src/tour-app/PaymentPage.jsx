import React, { useState } from 'react';

const PaymentPage = ({ pkg, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [step, setStep] = useState(1); // 1: Info, 2: Success
  const [taxInvoice, setTaxInvoice] = useState(false);

  if (!pkg) {
    return (
      <div className="empty-state-wrap section-padding">
        <span className="empty-icon">⚠️</span>
        <h3>상품 정보가 없습니다.</h3>
        <button className="btn-secondary mt-8" onClick={onBack}>홈으로 돌아가기</button>
      </div>
    );
  }

  const handlePayment = () => {
    // PayPal MCP 연동 시 이 부분에 로직이 들어갈 예정
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 2) {
    return (
      <section className="payment-success section-padding page-fade-in">
        <div className="container centered">
          <div className="success-card glass-card">
            <div className="check-icon-wrap">
              <span className="check-icon">✓</span>
            </div>
            <h2 className="text-3xl font-bold mt-8 mb-4">결제가 완료되었습니다!</h2>
            <p className="text-gray-400 mb-8">
              담당 여행설계사 <strong>{pkg.designer}</strong>님이 곧 상세 일정을 확정하여 연락드릴 예정입니다.<br />
              이용해 주셔서 감사합니다.
            </p>
            <div className="success-details mb-8">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>결제 금액</span>
                <span className="text-accent">{pkg.detailedPlan.pricing.split(' (')[0]}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>결제 수단</span>
                <span className="capitalize">{paymentMethod}</span>
              </div>
            </div>
            <button className="btn-primary w-full" onClick={onBack}>홈으로 돌아가기</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="payment-page section-padding page-fade-in">
      <div className="container overflow-visible">
        <div className="payment-grid">
          {/* Left: Order Info */}
          <div className="order-details-panel">
            <h2 className="section-title text-left mb-8">주문 정보 확인</h2>
            
            <div className="order-card-elite glass-card mb-8">
              <div className="pkg-thumb">
                <img src={pkg.image} alt={pkg.title} />
              </div>
              <div className="pkg-info p-6">
                <span className="badge-premium">{pkg.region}</span>
                <h3 className="text-xl font-bold mt-2">{pkg.title}</h3>
                <div className="designer-info-small mt-4">
                  <span className="label">DESIGNER</span>
                  <span className="value">{pkg.designer} 여행설계사</span>
                </div>
              </div>
            </div>

            <div className="billing-section glass-card p-8">
              <h3 className="text-xl font-bold mb-6">주문자 정보</h3>
              <div className="elite-form-group">
                <label>예약자 성함 (실명)</label>
                <input type="text" placeholder="예: 홍길동" />
              </div>
              <div className="elite-form-row">
                <div className="elite-form-group">
                  <label>연락처</label>
                  <input type="text" placeholder="010-0000-0000" />
                </div>
                <div className="elite-form-group">
                  <label>이메일</label>
                  <input type="email" placeholder="example@gijo.co.kr" />
                </div>
              </div>
              
              <div className="tax-invoice-toggle mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={taxInvoice} 
                    onChange={(e) => setTaxInvoice(e.target.checked)}
                  />
                  <span>법인 세금계산서 발행 신청 (B2B 전용)</span>
                </label>
              </div>

              {taxInvoice && (
                <div className="tax-form mt-6 pt-6 border-t border-white/10">
                  <div className="elite-form-group">
                    <label>사업자 등록 번호</label>
                    <input type="text" placeholder="000-00-00000" />
                  </div>
                  <div className="elite-form-group">
                    <label>법인명 / 사업장 주소</label>
                    <input type="text" placeholder="사업자 등록증 상의 정보 입력" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Payment Method & Summary */}
          <div className="payment-summary-panel">
            <div className="summary-sticky-card glass-card p-8">
              <h3 className="text-xl font-bold mb-8">최종 결제 금액</h3>
              
              <div className="price-breakdown mb-8">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">상품 금액</span>
                  <span>{pkg.detailedPlan.pricing.split(' (')[0]}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">예약 대행 수수료</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="total-row mt-6 pt-6 border-t border-white/20 flex justify-between items-baseline">
                  <span className="text-xl font-bold">합계</span>
                  <div className="text-right">
                    <span className="text-3xl font-black text-accent">{pkg.detailedPlan.pricing.split(' (')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="method-selection mb-10">
                <h4 className="text-sm font-bold text-gray-400 mb-4 tracking-widest">PAYMENT METHOD</h4>
                
                <div 
                  className={`payment-option-card ${paymentMethod === 'paypal' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className="radio-circle"></div>
                  <div className="method-info">
                    <span className="font-bold">PayPal (MCP Secured)</span>
                    <p className="text-xs text-gray-500">Global secure payment with PayPal</p>
                  </div>
                  <div className="method-logo">
                    <span className="text-blue-400 font-black italic">PP</span>
                  </div>
                </div>

                <div 
                  className={`payment-option-card ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="radio-circle"></div>
                  <div className="method-info">
                    <span className="font-bold">Credit / Debit Card</span>
                    <p className="text-xs text-gray-500">Corporate & Personal cards</p>
                  </div>
                </div>
              </div>

              <div className="payment-actions">
                <button className="btn-primary w-full btn-large py-5" onClick={handlePayment}>
                  {paymentMethod === 'paypal' ? 'PayPal로 안전 결제' : '카드 결제 하기'}
                </button>
                <button className="btn-secondary w-full mt-4" onClick={onBack}>주문 취소</button>
              </div>

              <div className="security-badges mt-8 pt-8 border-t border-white/10 flex justify-center gap-6 opacity-40">
                <span className="text-xs">🔒 SSL SECURED</span>
                <span className="text-xs">🛡️ ANTI-FRAUD</span>
                <span className="text-xs">💳 PCI DSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
