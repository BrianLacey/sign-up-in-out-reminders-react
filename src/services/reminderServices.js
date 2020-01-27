import axios from "axios";

const headers = {};
const basePath = `${process.env.REACT_APP_API_BASEPATH}/reminders`;

export const createReminder = data => {
  const config = {
    method: "POST",
    headers,
    data,
    withCredentials: true
  };
  return axios(`${basePath}/create`, config)
    .then(response => Promise.resolve(response.data))
    .catch(err => Promise.reject(err.response.data));
};
