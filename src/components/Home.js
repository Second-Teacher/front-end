import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="main-logo">Second-Teacher</h1>

      {/* 강조된 설명 + 버튼 영역 */}
      <div className="highlight-box">
        <p className="main-subtext">
          학습 자료 관리부터 시험 문제 생성까지,<br />
          AI 도우미가 당신의 시험 준비를 더욱 효율적으로 만들어줍니다.
        </p>

        <div className="cta-buttons">
          <button className="primary-btn" onClick={() => navigate('/login')}>로그인</button>
          <button className="secondary-btn" onClick={() => navigate('/signup')}>회원가입</button>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>📄 학습자료 업로드</h3>
          <p>긴 PDF 형식의 학습자료를 AI가 자동으로 요약해 핵심 내용을 빠르게 파악 및 저장할 수 있습니다.</p>
        </div>
        <div className="feature-card">
          <h3>🎤 음성자료 변환기</h3>
          <p>강의 녹음 파일을 텍스트로 변환하여 학습 자료로 활용할 수 있습니다.</p>
        </div>
        <div className="feature-card">
          <h3>🧠 시험 문제 생성</h3>
          <p>업로드한 자료를 바탕으로 시험 문제를 자동 생성하여 학습 효과를 확인할 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
