import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwMatch, setPwMatch] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(value && !emailRegex.test(value) ? '올바른 이메일 형식이 아닙니다.' : '');
  };

  const handlePwCheckChange = (e) => {
    const value = e.target.value;
    setPwCheck(value);
    setPwMatch(value === pw);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !pw || !pwCheck) {
      setError('모든 항목을 입력하세요.');
      return;
    }
    if (emailError) {
      setError('이메일 형식을 확인하세요.');
      return;
    }
    if (pw !== pwCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pw);

      // 🔹 이름을 displayName에 저장
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // ✅ 자동 로그인 해제
      await signOut(auth);

      alert('회원가입 완료! 로그인 후 이용해주세요.');
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('이미 가입된 이메일입니다.');
      } else if (err.code === 'auth/weak-password') {
        setError('비밀번호는 6자 이상이어야 합니다.');
      } else {
        setError('회원가입에 실패했습니다.');
      }
    }
  };

  return (
    <div className="signup-container">
      <button className="close-btn" onClick={() => navigate('/')}>✖</button>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <p className="error">{emailError}</p>}

        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setPwMatch(pwCheck === e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={pwCheck}
          onChange={handlePwCheckChange}
        />

        {pwMatch === true && <p className="success">비밀번호가 일치합니다.</p>}
        {pwMatch === false && <p className="error">비밀번호가 일치하지 않습니다.</p>}

        <button type="submit">회원가입</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Signup;
