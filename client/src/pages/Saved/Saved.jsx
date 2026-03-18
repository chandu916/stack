import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { getSavedQuestionIds } from '../../utils/savedQuestions';
import './Saved.css';

const Saved = ({ slideIn, onClose }) => {
  const questions = useSelector((state) => state.questionReducer?.data || []);

  const savedQuestions = useMemo(() => {
    const savedIds = getSavedQuestionIds();
    if (!savedIds.length) return [];
    return questions.filter((question) => savedIds.includes(question._id));
  }, [questions]);

  return (
    <div className='home-container-1'>
      <LeftSidebar slideIn={slideIn} onClose={onClose} />
      <div className='home-container-2 saved-page'>
        <h1>Saved Questions</h1>
        <p className='saved-subtitle'>Your bookmarked questions appear here.</p>

        {savedQuestions.length === 0 ? (
          <div className='saved-empty'>
            <h3>No saved questions yet</h3>
            <p>Use Save on any question card or question details page to bookmark it.</p>
            <Link to='/Questions' className='saved-link'>Browse Questions</Link>
          </div>
        ) : (
          <div className='saved-list'>
            {savedQuestions.map((question) => (
              <article className='saved-card' key={question._id}>
                <Link to={`/Questions/${question._id}`} className='saved-title'>
                  {question.questionTitle}
                </Link>
                <div className='saved-tags'>
                  {question.questionTags?.map((tag) => (
                    <span className='saved-tag' key={`${question._id}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
