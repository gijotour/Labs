import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer glass-card-no-hover">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-header-footer">
              <span className="logo-text-small">GIJO Labs</span>
            </div>
            <p className="brand-desc">
              여행의 모든것. 가이드의 특색을 담은 B2B 전문 여행 포털 플랫폼입니다. <br />
              혁신적인 후불 정산 시스템으로 파트너사와 고객 모두에게 최고의 만족을 보장합니다.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-links">
              <h4>SERVICE</h4>
              <ul>
                <li><a href="#designer">여행 설계사</a></li>
                <li><a href="#regions">지역 안내</a></li>
                <li><a href="#b2b">기업 파트너십</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>SUPPORT</h4>
              <ul>
                <li><a href="#">세금계산서 문의</a></li>
                <li><a href="#">카드 결제 안내</a></li>
                <li><a href="#">이용약관</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>CONTACT</h4>
              <p>Email: contact@gijotour.com</p>
              <p>Tel: +82 (0)2-1234-5678</p>
              <div className="social-pill">
                <span>SNS 채널 준비중</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 GIJO Labs. All rights reserved. B2B Architecture.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
