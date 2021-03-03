import { $host, $authHost } from './index';
import jwt_decode from 'jwt-decode';

export const registrantion = async (username, password) => {
  try {
    const { data } = await $host.post('users/register', {
      username,
      password,
    });
    console.log('registration axios data',data);
    localStorage.setItem('token', data.token);
    // return jwt_decode(data);
  } catch (err) {
    return err.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const { data } = await $host.post('users/login', {
      username,
      password,
    });
    console.log('login axios data',data);
    localStorage.setItem('token', data);
    // return jwt_decode(data);
  } catch (err) {
    return err.response.data;
  }
};

export const checkAuth = async () => {
  try {
    const { data } = await $authHost.get('users/auth');
    console.log('check data ',data);
    console.log('check ', jwt_decode(data));
    localStorage.setItem('token', data);
    // return await jwt_decode(data);
  } catch (err) {
    return err.response.data;
  }
};
