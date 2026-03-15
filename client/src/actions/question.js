import * as api from '../api'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postQuestion(questionData)
        dispatch({type:"POST_QUESTION", payload:data})
        dispatch(fetchAllQuestions())
        navigate('/')
        return data
    } catch (error) { 
        const statusCode = error?.response?.status || 500;
        const message = error?.response?.data?.message || error.message || 'Failed to post question';
        console.error('[QUESTION] askQuestion failed', { statusCode, message, error });
        throw error;
    }
}

export const fetchAllQuestions =()=> async (dispatch) =>{
    try {
        const {data} = await api.getAllQuestions()
        dispatch({type:'FETCH_ALL_QUESTIONS', payload:data})
    } catch (error) {
        const statusCode = error?.response?.status || 500;
        const message = error?.response?.data?.message || error.message || 'Failed to fetch all questions';
        console.error('[QUESTION] fetchAllQuestions failed', { statusCode, message, error });
    }
}

export const deleteQuestion = (id, navigate) => async(dispatch) => {
    try {
        await api.deleteQuestion(id)
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        const statusCode = error?.response?.status || 500;
        const message = error?.response?.data?.message || error.message || 'Failed to delete question';
        console.error('[QUESTION] deleteQuestion failed', { statusCode, message, error });
    }
}

export const voteQuestion = (id, value, userId) => async(dispatch)=>{
    try {
        await api.voteQuestion(id, value, userId)
        dispatch(fetchAllQuestions())
    } catch (error) {
        const statusCode = error?.response?.status || 500;
        const message = error?.response?.data?.message || error.message || 'Failed to vote question';
        console.error('[QUESTION] voteQuestion failed', { statusCode, message, error });
    }
}

export const postAnswer = (answerData) => async (dispatch) => {

    try {
        const { id, noOfAnswers, answerBody, userAnswered, userId}= answerData
        const { data } = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId )
        dispatch({type:'POST_ANSWER', payload: data})
        dispatch(fetchAllQuestions())  
    } catch (error) {
        const statusCode = error?.response?.status || 500;
        const message = error?.response?.data?.message || error.message || 'Failed to post answer';
        console.error('[QUESTION] postAnswer failed', { statusCode, message, error });
    }
}

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
    try {
      await api.deleteAnswer(id, answerId, noOfAnswers);
      dispatch(fetchAllQuestions());
    } catch (error) {
      const statusCode = error?.response?.status || 500;
      const message = error?.response?.data?.message || error.message || 'Failed to delete answer';
      console.error('[QUESTION] deleteAnswer failed', { statusCode, message, error });
    }
  };

