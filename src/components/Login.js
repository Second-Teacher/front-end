// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // 🔑 Firebase 연결

function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !pw) {
      setError('이메일과 비밀번호를 입력하세요.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, pw);
      alert('로그인 성공!');
      setError('');
      navigate('/userhome');  // ✅ 로그인 후 전용 홈으로 이동

    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('존재하지 않는 사용자입니다.');
      } else if (err.code === 'auth/wrong-password') {
        setError('비밀번호가 틀렸습니다.');
      } else {
        setError('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <div className="login-container">
      <button className="close-btn" onClick={() => navigate('/')}>✖</button>

      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
