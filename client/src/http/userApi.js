import { $host, $authHost } from './index';
import jwt_decode from 'jwt-decode';

export const registrantion = async (username, password) => {
  try {
    const { data } = await $host.post('users/register', {
      username,
      password,
    });
    return jwt_decode(data);
  } catch (err) {
    return err.response.data
  }
};

export const login = async (username, password) => {
  try {
    const { data } = await $host.post('users/login', {
      username,
      password,
    });
    return jwt_decode(data);
  } catch (err) {
    return err.response.data
  }
};

export const checkAuth = async () => {
  const response = await $host.get('users/auth');
  console.log('check ', response);
  return response;
};
