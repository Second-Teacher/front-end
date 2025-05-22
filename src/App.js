import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MyPage from './components/MyPage';
import UserHome from './components/userhome';
import Upload from './components/upload';
import Uploadeddata from './components/uploadeddata';
import VoiceToText from './components/VoiceToText';
import QuestionGenerator from './components/QuestionGenerator'; // 🔹 컴포넌트 이름 대문자 필수!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/uploaded-data" element={<Uploadeddata />} />
        <Route path="/VoiceToText" element={<VoiceToText />} />
        <Route path="/generate-quiz" element={<QuestionGenerator />} />

      </Routes>
    </Router>
  );
}

export default App;
