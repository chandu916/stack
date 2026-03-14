import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './AskQuestion.css'
import {askQuestion} from '../../actions/question'

const AskQuestion = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const User = useSelector((state) => state.currentUserReducer);

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')
    const [error, setError] = useState('')

    const handleSumit = async (e) =>{
        e.preventDefault()
        setError('')

        if (!User?.result?._id) {
          setError('Please login before posting a question.')
          return
        }

        const title = questionTitle.trim()
        const body = questionBody.trim()
        const tagsStr = questionTags.trim()

        if (!title || !body || !tagsStr) {
          setError('Title, body and tags are required.')
          return
        }

        if (body.length < 20) {
          setError('Question body must be at least 20 characters.')
          return
        }

        const tags = tagsStr.split(/[ ,]+/).filter((tag) => tag)
        if (tags.length === 0) {
          setError('Please add at least one valid tag.')
          return
        }

        try {
          await dispatch(askQuestion(
            {
              questionTitle: title,
              questionBody: body,
              questionTags: tags,
              userPosted: User.result.name,
              userId: User.result._id
            },
            navigate
          ))
        } catch (err) {
          setError(err?.response?.data?.message || 'Unable to post question. Please try again.')
          console.error(err)
        }
    }
    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            setQuestionBody(questionBody + "\n")
        }
    }
  return (
    <div className='ask-question'>
        <div className="ask-ques-container">
            <h1>Ask a Public Question</h1>
            {error && <div className='ask-error' style={{color:'red', marginBottom:'12px'}}>{error}</div>}
            <form onSubmit={handleSumit} >
                <div className='ask-form-container'>
                    <label htmlFor="ask-ques-title">
                        <h4> Title</h4>
                        <p> Be specific and imagine you’re asking a question to another person.</p>
                        <input type="text" id='ask-ques-title' onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='e.g. Is there an R function for finding the index of an element in a vector?'/>
                    </label>
                    <label htmlFor="ask-ques-body">
                        <h4>   What are the details of your problem?</h4>
                        <p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
                        <textarea name="" cols="30" rows="10" onChange={(e) => {setQuestionBody(e.target.value)}} onKeyPress={handleEnter} id='ask-ques-body'></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4> Tags</h4>
                        <p> Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
                        <input type="text" id='ask-ques-tags' onChange={(e) => {setQuestionTags(e.target.value)}} value={questionTags} placeholder='e.g. windows ,ruby etc ..'/>
                    </label>
                </div>
                <input type="submit" value='review your question' className='review-btn'/>
            </form>

        </div>
    </div>
  )
}

export default AskQuestion
