import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { isQuestionSaved, toggleSavedQuestion } from '../../utils/savedQuestions'

const Questions = ({question}) => {
  const votes = question.upVote.length - question.downVote.length;
  const [saved, setSaved] = useState(() => isQuestionSaved(question._id));

  const handleToggleSave = () => {
    const nextState = toggleSavedQuestion(question._id);
    setSaved(nextState);
  };

  return (
    <div className='display-question-container'>
        <div className='display-votes-ans'>
           <div> <span>{votes}</span>
              <span> votes </span></div>
            <div><span>{question.noofAnswers}</span>
              <span> Answers </span></div>
            <div><span>0</span>
              <span> Views </span></div>
        </div>

        <div className='display-question-details'>
            <div><Link to={`/Questions/${question._id}`} className='question-title-link'>{question.questionTitle}</Link> </div> 
                <div className='display-tags-time'>
                <div className='display-tags'>
                   {
                     question.questionTags.map((tag)=>(
                     <p className='cmn-tags' key={tag}> {tag}</p>
                         ))
                    }
                </div>
                  <button
                    type='button'
                    className='edit-question-btn'
                    onClick={handleToggleSave}
                  >
                    {saved ? 'Unsave' : 'Save'}
                  </button>
                   <p className='display-time'>
                   { question.userPosted} asked {moment(question.askedon).format('MMM-D-YYYY')}
                    </p>
                </div>
        </div>
      
    </div>
  )
}

export default Questions
