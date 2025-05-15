import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MyPage from './components/MyPage';
import UserHome from './components/userhome'; // ✅ 실제 위치 확인 필요
import Upload from './components/upload';
import UploadData from './uploaded-data';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/userhome" element={<UserHome />} /> {/* ✅ 로그인 후 홈 */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/upload-data" element={<UploadData />} />
      </Routes>
    </Router>
  );
}

export default App;
