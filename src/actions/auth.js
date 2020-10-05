import axiosService from 'services/AxiosService';
import { extractApiErrors } from './index';
const { bpvAxios } = axiosService;

export const registerUser = (registerData) => {
  return bpvAxios
    .post('/users/register', registerData)
    .catch((error) => Promise.reject(extractApiErrors(error.response || [])));
};

export const loginUser = (loginData) => {
  return bpvAxios
    .post('/users/login', loginData)
    .then((response) => response.data)
    .catch((error) => Promise.reject(extractApiErrors(error.response || [])));
};

export const userAuthenticated = (decodedToken) => {
  return { type: 'USER_AUTHENTICATED', username: decodedToken.username };
};
