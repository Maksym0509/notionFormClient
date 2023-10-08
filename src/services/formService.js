import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `/api/form`;
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem('token')
  },
};

const getTables = async (data) => {
  const response = await axios.post(`${API_URL}/getTables`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token')
    },
  });
  return response.data;
};

const getDatabase = async (data) => {
  const response = await axios.post(`${API_URL}/getDatabase`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token')
    },
  });
  return response.data;
};

const save = async (data) => {
  const response = await axios.post(`${API_URL}/save`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token')
    },
  });
  return response.data;
};

const publish = async (data) => {
  const response = await axios.post(`${API_URL}/publish`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token')
    },
  });
  return response.data;
};

const getForm = async (data) => {
  const response = await axios.post(`${API_URL}/getForm`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token')
    },
  });
  return response.data;
};

export const formService = {
  getTables,
  getDatabase,
  getForm,
  publish,
  save,
};
