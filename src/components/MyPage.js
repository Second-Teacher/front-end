import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, updateProfile, updatePassword, deleteUser } from 'firebase/auth';
import './MyPage.css';

function MyPage() {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  // 사용자 인증 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNewName(currentUser.displayName || '');
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // 닉네임 업데이트
  const handleUpdateName = async () => {
    if (!newName.trim()) return alert('닉네임을 입력하세요.');
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      alert('닉네임이 변경되었습니다!');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('닉네임 변경 실패');
    }
  };

  // 비밀번호 변경
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) return alert('비밀번호를 모두 입력하세요.');
    if (newPassword !== confirmPassword) return alert('비밀번호가 일치하지 않습니다.');
    try {
      await updatePassword(auth.currentUser, newPassword);
      alert('비밀번호가 변경되었습니다!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      alert('비밀번호 변경 실패. 최근 로그인이 필요할 수 있어요.');
    }
  };

  // 계정 탈퇴
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('정말로 계정을 삭제하시겠습니까? 복구할 수 없습니다!');
    if (!confirmed) return;

    try {
      await deleteUser(auth.currentUser);
      alert('계정이 삭제되었습니다.');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('계정 삭제 실패. 최근 로그인 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="mypage-container">
       {/* 🔴 닫기 버튼 (userhome으로 이동) */}
       <button className="close-btn" onClick={() => navigate('/userhome')}>✖</button>

      <h2>내 프로필</h2>

      {/* 닉네임 섹션 */}
      <div className="card profile-card">
        <div className="profile-header">
          <div className="avatar">{user?.displayName?.charAt(0)?.toUpperCase() || 'U'}</div>
          <div>
            <div className="nickname">{user?.displayName || '닉네임 없음'}</div>
            <div className="email">{user?.email}</div>
          </div>
        </div>

        <div className="field-group">
          <label>닉네임</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="save-btn" onClick={handleUpdateName}>
            닉네임 업데이트
          </button>
        </div>
      </div>

      {/* 비밀번호 변경 섹션 */}
      <div className="card password-card">
        <h3>비밀번호 관리</h3>

        <div className="field-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="save-btn" onClick={handleChangePassword}>
          비밀번호 변경
        </button>
      </div>

      {/* 계정 탈퇴 섹션 */}
      <div className="card danger-card">
        <h3>계정 탈퇴</h3>
        <p className="warning-text">
          주의: 계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
        </p>
        <button className="delete-btn" onClick={handleDeleteAccount}>
          계정 탈퇴
        </button>
      </div>
    </div>
  );
}

export default MyPage;
