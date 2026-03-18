
import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/');
        return data;
    } catch (error) {
        console.error('[AUTH] signup failed', error);
        throw error;
    }
};

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/');
        return data;
    } catch (error) {
        console.error('[AUTH] login failed', {
          message: error?.message,
          status: error?.response?.status,
          body: error?.response?.data,
        });
        throw error;
    }
};

export const refreshAuthToken = () => async (dispatch) => {
    try {
        const { data } = await api.refreshToken();
        const storedProfile = JSON.parse(localStorage.getItem('Profile'));
        if (!storedProfile || !storedProfile.result) {
            return null;
        }

        const updatedProfile = {
            ...storedProfile,
            token: data.token,
        };

        dispatch({ type: 'AUTH', data: updatedProfile });
        dispatch(setCurrentUser(updatedProfile));
        return updatedProfile;
    } catch (error) {
        console.error('[AUTH] refresh token failed', {
            message: error?.message,
            status: error?.response?.status,
            body: error?.response?.data,
        });
        throw error;
    }
};
