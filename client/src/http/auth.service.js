import axios from 'axios';
import jwt_decode from 'jwt-decode';

const ApiUrl = process.env.REACT_APP_API_URL;

export const loginUSer = async (username, password) => {
  try {
    const response = await axios.post(ApiUrl + 'users/login', {
      username,
      password,
    });
    if (response.data) {
      localStorage.setItem('token', response.data);
    }
    return response.data;
  } catch (err) {
    return err.response.data
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(ApiUrl + 'users/register', {
      username,
      password,
    });
    return response.data
  } catch (err) {
    return err.response.data
  }
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) return jwt_decode(token);
  } catch (e) {
    alert(e.message);
  }
};
