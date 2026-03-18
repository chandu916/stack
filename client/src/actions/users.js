import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    const statusCode = error?.response?.status || 500;
    const message = error?.response?.data?.message || error.message || 'Failed to fetch users';
    console.error('[USERS] fetchAllUsers failed', { statusCode, message, error });
  }
};
export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, updateData);

    const storedProfile = JSON.parse(localStorage.getItem('Profile')) || null;
    let updatedProfile = null;
    if (storedProfile) {
      updatedProfile = {
        ...storedProfile,
        result: {
          ...storedProfile.result,
          ...data,
        },
      };
      localStorage.setItem('Profile', JSON.stringify(updatedProfile));
      dispatch(setCurrentUser(updatedProfile));
    }

    dispatch({ type: "UPDATE_CURRENT_USER", payload: updatedProfile || data });

    return data;
  } catch (error) {
    const statusCode = error?.response?.status || 500;
    const message = error?.response?.data?.message || error.message || 'Failed to update profile';
    console.error('[USERS] updateProfile failed', { statusCode, message, error });
    throw error;
  }
};