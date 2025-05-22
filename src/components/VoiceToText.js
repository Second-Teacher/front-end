import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import './VoiceToText.css';

function VoiceToText() {
  const [text, setText] = useState('');
  const [filename, setFilename] = useState('');
  const [format, setFormat] = useState('txt');
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'ko-KR';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const timestamp = new Date().toLocaleTimeString('ko-KR', { hour12: false });
          const sentence = event.results[i][0].transcript.trim();
          finalTranscript += `[${timestamp}] ${sentence}\n`;
        }
      }
      if (finalTranscript) {
        setText((prev) => prev + finalTranscript);
      }
    };

    recognition.onerror = (e) => {
      console.error('인식 오류:', e);
    };

    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleSave = () => {
    try {
      const name =
        filename.trim() ||
        `stt_result_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}`;

      if (format === 'txt') {
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        setMessage('✅ 파일이 성공적으로 저장되었습니다.');
      } else if (format === 'pdf') {
        const doc = new jsPDF();
        const title = filename.trim() || '음성 인식 결과';
        const currentDate = new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFontSize(16);
        doc.text(title, pageWidth / 2, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(currentDate, pageWidth - 10, 20, { align: 'right' });

        const lines = doc.splitTextToSize(text, 180);
        doc.text(lines, 10, 35);

        doc.save(`${name}.pdf`);
        setMessage('✅ 파일이 성공적으로 저장되었습니다.');
      }
    } catch (error) {
      console.error('저장 실패:', error);
      setMessage('❌ 파일 저장 중 오류가 발생했습니다.');
    }
  };

  // ✅ 알림 메시지 자동 삭제 (3초 후)
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="voice-card">
      <div className="top-nav">
        <button className="home-button" onClick={() => navigate('/userhome')}>
          ⬅ 홈으로
        </button>
      </div>

      <h2 className="voice-title">🎙️ 실시간 음성 인식</h2>
      <p className="voice-description">마이크에 대고 말하면 텍스트로 변환됩니다.</p>

      <button className="voice-button" onClick={isListening ? stopListening : startListening}>
        {isListening ? '중지하기' : '시작하기'}
      </button>

      <div className="form-group">
        <label>파일 제목</label>
        <input
          type="text"
          className="text-input"
          placeholder="예: my-transcript"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>저장 형식</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="txt"
              checked={format === 'txt'}
              onChange={(e) => setFormat(e.target.value)}
            />
            .txt
          </label>
          <label>
            <input
              type="radio"
              value="pdf"
              checked={format === 'pdf'}
              onChange={(e) => setFormat(e.target.value)}
            />
            .pdf
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>텍스트 편집</label>
        <textarea
          className="text-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="10"
        />
      </div>

      <button className="voice-button" onClick={handleSave} disabled={!text}>
        저장하기
      </button>

      {message && <p className="save-message">{message}</p>}
    </div>
  );
}

export default VoiceToText;
