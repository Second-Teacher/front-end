import React, { useState } from 'react';
import './upload.css';

const SummaryViewer = () => {
  const [selectedType, setSelectedType] = useState('pdf');
  const [isLoading, setIsLoading] = useState(false);
  const [summaryList, setSummaryList] = useState([]);
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  // 요약 목록 불러오기
  const handleLoad = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/summary?type=${selectedType}`);
      const data = await response.json();
      setSummaryList(data);
    } catch (e) {
      alert('에러 발생');
    } finally {
      setIsLoading(false);
    }
  };

  // 항목 선택
  const handleSelect = (summary) => {
    setSelectedSummary(summary);
    setEditText(summary.content);
    setEditMode(false);
  };

  // 저장
  const handleSave = async () => {
    try {
      const res = await fetch(`/api/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedSummary.id,
          content: editText,
        }),
      });
      if (res.ok) {
        alert('저장 완료');
        setEditMode(false);
        handleLoad(); // 목록 새로고침
      } else {
        alert('저장 실패');
      }
    } catch (err) {
      alert('에러 발생');
    }
  };

  // 취소
  const handleCancel = () => {
    const confirmCancel = window.confirm('변경사항이 저장되지 않습니다. 취소할까요?');
    if (confirmCancel) {
      setEditText(selectedSummary.content);
      setEditMode(false);
    }
  };

  // 파일 업로드
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFileName(file.name);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('업로드 완료');
        handleLoad(); // 목록 다시 불러오기
      } else {
        alert('업로드 실패');
      }
    } catch (error) {
      console.error('업로드 오류:', error);
      alert('업로드 중 오류 발생');
    }
  };

  return (
    <div className="summary-viewer">
      <div className="container">
        <div className="top-nav">
        <button className="home-button" onClick={() => window.location.href = '/userhome'}>
         ⬅ 홈으로
         </button>
         </div>

        <h1>요약 내용 보기</h1>
        <p>저장된 PDF 요약 및 STT 변환 내용을 확인하고 수정할 수 있습니다.</p>
 
        {/* 파일 업로드 */}
        <div className="upload-section">
          <label className="upload-label">
            파일 선택
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                handleFileUpload(e);
                if (e.target.files[0]) {
                  setSelectedFileName(e.target.files[0].name);
                }
              }}
            />
          </label>
          {selectedFileName && (
            <span className="filename">{selectedFileName}</span>
          )}
        </div>

        {/* 유형 선택 버튼 */}
        <div className="type-buttons">
          <button
            className={`button ${selectedType === 'pdf' ? 'active' : ''}`}
            onClick={() => setSelectedType('pdf')}
          >
            PDF 요약 보기
          </button>
          <button
            className={`button ${selectedType === 'stt' ? 'active' : ''}`}
            onClick={() => setSelectedType('stt')}
          >
            STT 변환 내용 보기
          </button>
        </div>

        {/* 목록 + 내용 */}
        <div className="content-area">
          {/* 좌측 목록 */}
          <div className="left-panel">
            {isLoading ? (
              <p>불러오는 중...</p>
            ) : summaryList.length === 0 ? (
              <p>목록 없음</p>
            ) : (
              summaryList.map((item) => (
                <div
                  key={item.id}
                  className={`summary-item ${selectedSummary?.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                >
                  {item.title}
                </div>
              ))
            )}
          </div>

          {/* 우측 본문 */}
          <div className="right-panel">
            {!selectedSummary ? (
              <p>항목을 선택하면 내용이 여기에 표시됩니다.</p>
            ) : (
              <>
                <h3>{selectedSummary.title}</h3>
                <p><strong>유형:</strong> {selectedSummary.type}</p>
                <div className="summary-body">
                  {editMode ? (
                    <>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button onClick={handleSave}>저장하기</button>
                      <button onClick={handleCancel}>취소</button>
                    </>
                  ) : (
                    <pre>{selectedSummary.content}</pre>
                  )}
                </div>

                <div className="edit-mode-toggle">
                  <label>보기 모드</label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={editMode}
                      onChange={() => {
                        setEditMode(!editMode);
                        alert(`"${!editMode ? '편집' : '보기'} 모드"로 전환되었습니다.`);
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                  <label>편집 모드</label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryViewer;
