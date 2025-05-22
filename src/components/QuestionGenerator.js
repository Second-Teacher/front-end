import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuestionGenerator.css';

function QuestionGenerator() {
  const [materials, setMaterials] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedType, setSelectedType] = useState('pdf');
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    axios.get('http://localhost:8000/api/materials?type=pdf', { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setMaterials(res.data.materials);
        } else {
          alert('자료를 불러오는 데 실패했습니다.');
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleGenerate = async () => {
    if (!selectedId) {
      alert('자료를 선택해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/generate-question', {
        material_id: selectedId,
        material_type: selectedType,
      }, { withCredentials: true });

      if (response.data.success) {
        setQuestion(response.data.question);
      } else {
        alert('문제 생성 실패: ' + response.data.error);
      }
    } catch (error) {
      console.error('에러 발생:', error);
      alert('문제 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="voice-card">
      {/* ✅ 홈으로 버튼 */}
      <div className="top-nav">
        <button className="home-button" onClick={() => navigate('/userhome')}>
          ⬅ 홈으로
        </button>
      </div>

      <h2>🧠 문제 생성</h2>
      <p>업로드한 자료를 기반으로 시험 문제를 자동 생성해보세요!</p>

      <select onChange={(e) => setSelectedId(e.target.value)}>
        <option value="">자료 선택</option>
        {materials.map((mat) => (
          <option key={mat.id} value={mat.id}>
            {mat.title || mat.id}
          </option>
        ))}
      </select>

      <button onClick={handleGenerate}>문제 만들기</button>

      {question && (
        <div>
          <h3>📋 생성된 문제</h3>
          <p>{question.question}</p>
          <ul>
            {question.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuestionGenerator;
