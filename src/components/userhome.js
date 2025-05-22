import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './userhome.css';

function UserHome() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || '사용자');
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <div className="user-home">
     <div className="header">
     <div className="logo" onClick={() => navigate('/')}>
        Second-Teacher
     </div>
       <div className="nav-buttons">
       <button onClick={() => navigate('/mypage')}>내 프로필</button>
       <button onClick={handleLogout}>로그아웃</button>
     </div>
   </div>


      <div className="welcome-box">
        <h2>안녕하세요, {userName}님!</h2>
        <p>오늘도 효율적인 시험 준비를 위한 우리의 서비스를 이용해보세요.</p>
      </div>

<div className="feature-grid">
  {/* 🔼 첫 줄 */}
  <div className="feature-card">
    <h3>📄 학습자료 업로드</h3>
    <p>PDF 학습자료를 업로드하고 AI가 요약하도록 해보세요!</p>
    <button onClick={() => navigate('/upload')}>교안 업로드</button>
  </div>

  <div className="feature-card">
    <h3>📦 업로드 자료 확인</h3>
    <p>이전에 업로드했던 학습자료 및 음성자료를 확인하고 관리하세요!</p>
    <button onClick={() => navigate('/uploaded-data')}>업로드 자료 확인</button>
  </div>

  <div className="feature-card">
    <h3>🎤 음성자료 변환기</h3>
    <p>강의 녹음을 텍스트로 변환해보세요.</p>
    <button onClick={() => navigate('/VoiceToText')}>음성 변환</button>
  </div>
</div>

<div className="feature-grid">
  {/* 🔽 두 번째 줄 */}
  <div className="feature-card">
    <h3>🧠 문제 생성</h3>
    <p>업로드한 자료를 기반으로 시험 문제를 자동 생성해보세요!</p>
    <button onClick={() => navigate('/generate-quiz')}>문제 만들기</button>
  </div>

  <div className="feature-card">
    <h3>📝 시험 보기</h3>
    <p>생성된 문제로 직접 시험을 풀 수 있습니다.</p>
    <button onClick={() => navigate('/exam')}>시험 보기</button>
  </div>
</div>
  </div> 
  );
}       // ✅ return 블록 닫기

export default UserHome;
