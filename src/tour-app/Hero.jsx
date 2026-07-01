import React from 'react';
import { mockDb } from '../data/mockDb';

const Hero = () => {
  const { hero } = mockDb;
  // 새로 생성된 이미지 경로 사용
  const heroImage = '/assets/hero_bg.png';

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <img src={heroImage} alt="Elite Business Travel Background" style={{ objectPosition: 'center 40%' }} />
        <div className="overlay-cinema"></div>
      </div>
      
      <div className="container hero-content centered">
        <div className="hero-text-container">
          <div className="hero-badge animate-up">Elite B2B Tour Platform</div>
          <p className="hero-subtext animate-up delay-1">Premium Experiences for Partners</p>
          <h1 className="hero-main-title animate-up delay-2">
            GIJO <span className="highlight">TOUR</span>
          </h1>
          <p className="hero-description animate-up delay-3">
            여행설계사와 비즈니스 파트너를 연결하는 하이엔드 B2B 투어 플랫폼.
            당신의 기업을 위한 최고의 여행을 설계합니다.
          </p>
          
          <div className="hero-cta animate-up delay-4">
            <button className="btn-primary" onClick={() => document.getElementById('designer').scrollIntoView({ behavior: 'smooth' })}>상품 탐색하기</button>
            <button className="btn-secondary" onClick={() => window.location.href='/gijotour/tv'}>여행설계사 TV 시청</button>
          </div>
        </div>

        <div className="hero-stats-row animate-up delay-5">
          {hero.stats.map((stat, index) => (
            <div key={index} className="stat-pill glass-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }
        .hero-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
        }
        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .overlay-cinema {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(circle at center, rgba(3, 5, 8, 0.2) 0%, rgba(3, 5, 8, 0.8) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 10;
          padding-top: 100px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
