import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Exam.css';

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
  fetch('http://localhost:8000/api/exam/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      total_questions: 5,
      short_answer_count: 2,
      multiple_choice_count: 3
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) setQuestions(data.questions);
      else alert('문제 불러오기 실패: ' + data.error);
    })
    .catch(err => {
      console.error('요청 오류:', err);
      alert('서버 요청 중 오류 발생');
    });
}, []);


  const handleSelect = (qid, optionIdx) => {
    setAnswers({ ...answers, [qid]: optionIdx });
  };

  const handleSubmit = () => {
    console.log('제출된 답안:', answers);
    alert('시험이 제출되었습니다!');
  };

  return (
    <div className="exam-page">
      <div className="top-nav">
        <button className="home-button" onClick={() => navigate('/userhome')}>
          ⬅ 홈으로
        </button>
      </div>

      <h2>📝 시험 보기</h2>
      {questions.length === 0 ? (
        <p>문제를 불러오는 중이거나 아직 생성된 문제가 없습니다.</p>
      ) : (
        questions.map((q, idx) => (
          <div key={q.id} className="question-card">
            <p><strong>Q{idx + 1}.</strong> {q.question}</p>
            <ul>
              {q.options.map((opt, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      checked={answers[q.id] === i}
                      onChange={() => handleSelect(q.id, i)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {questions.length > 0 && (
        <button className="submit-button" onClick={handleSubmit}>
          제출하기
        </button>
      )}
    </div>
  );
};

export default Exam;
