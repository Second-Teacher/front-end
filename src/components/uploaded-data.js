// src/pages/upload-data.jsx
import React from 'react';
import './upload-data.css';

function UploadData() {
  // 샘플 데이터 (이후 Firebase 등에서 실제로 받아올 수 있음)
  const uploadedItems = [
    { id: 1, filename: '강의노트1.pdf', type: 'PDF', date: '2024-05-01' },
    { id: 2, filename: '수업녹음.mp3', type: '음성', date: '2024-05-02' },
  ];

  return (
    <div className="upload-data-page">
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

export default UploadData;
