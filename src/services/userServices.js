import axios from "axios";

const headers = {};
const basePath = `${process.env.REACT_APP_API_BASEPATH}/users`;

export const registerUser = data => {
  const config = {
    method: "POST",
    headers,
    data
  };
  return axios(`${basePath}/register`, config)
    .then(response => Promise.resolve(response.data))
    .catch(err => Promise.reject(err.response.data));
};

export const signInUser = data => {
  const config = {
    method: "POST",
    headers,
    data,
    withCredentials: true
  };
  return axios(`${basePath}/login`, config)
    .then(response => Promise.resolve(response.data))
    .catch(err => Promise.reject(err.response.data));
};

export const signOutUser = () => {
  const config = {
    method: "POST",
    headers,
    withCredentials: true
  };
  return axios(`${basePath}/logout`, config)
    .then(response => Promise.resolve(response.data))
    .catch(err => Promise.reject(err.response.data));
};

export const verifyAuth = () => {
  const config = {
    method: "GET",
    headers,
    withCredentials: true
  };
  return axios(`${basePath}/verify`, config)
    .then(response => Promise.resolve(response.data))
    .catch(err => Promise.reject(err.response.data));
};
