import React from 'react';
import { useNavigate } from 'react-router-dom';
import './uploadeddata.css';

function Uploadeddata() {
  const navigate = useNavigate();

  const uploadedItems = [
    { id: 1, filename: '강의노트1.pdf', type: 'PDF', date: '2024-05-01' },
    { id: 2, filename: '수업녹음.mp3', type: '음성', date: '2024-05-02' },
  ];

  return (
    <div className="upload-data-page">
      {/* ✅ 유저홈으로 버튼 추가 */}
      <div className="top-nav">
        <button className="home-button" onClick={() => navigate('/userhome')}>
          ⬅ 홈으로
        </button>
      </div>

      <h2>업로드 자료 확인</h2>
      <p>업로드한 PDF 및 음성 자료를 확인하세요.</p>

      <div className="upload-list">
        {uploadedItems.map((item) => (
          <div key={item.id} className="upload-item">
            <div className="file-info">
              <span className="file-name">{item.filename}</span>
              <span className="file-type">{item.type}</span>
              <span className="upload-date">{item.date}</span>
            </div>
            <button className="view-btn">보기</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Uploadeddata;
