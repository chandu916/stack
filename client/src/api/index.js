import axios from 'axios'

const API = axios.create({ baseURL: 'https://stack-overflow-o8mf.onrender.com/' });

API.interceptors.request.use(
  (req) => {
    if (localStorage.getItem('Profile')) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
    }
    console.info('[API Request]', req.method.toUpperCase(), req.url, req.data || '');
    return req;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (res) => {
    console.info('[API Response]', res.status, res.config.url, res.data);
    return res;
  },
  (error) => {
    if (error.response) {
      console.error('[API Response Error]', error.response.status, error.response.config.url, error.response.data);
    } else if (error.request) {
      console.error('[API No Response]', error.request);
    } else {
      console.error('[API Error]', error.message);
    }
    return Promise.reject(error);
  }
);

export const login = (authData) => API.post('/user/login', authData);
export const signup = (authData) => API.post('/user/signup', authData);

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
export const getAllQuestions = () => API.get('/questions/get')
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`)
export const voteQuestion =(id, value, userID) => API.patch(`/questions/vote/${id}`, { value, userID})

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId})
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers })


export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);