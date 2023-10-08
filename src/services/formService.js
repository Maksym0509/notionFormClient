import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `/api/form`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getTables = async (data) => {
  const response = await axios.post(`${API_URL}/getTables`, data, config);
  return response.data;
};

const getDatabase = async (data) => {
  const response = await axios.post(`${API_URL}/getDatabase`, data, config);
  return response.data;
};

const save = async (data) => {
  const response = await axios.post(`${API_URL}/save`, data, config);
  return response.data;
};

const publish = async (data) => {
  const response = await axios.post(`${API_URL}/publish`, data, config);
  return response.data;
};

const getForm = async (data) => {
  const response = await axios.post(`${API_URL}/getForm`, data, config);
  return response.data;
};

export const formService = {
  getTables,
  getDatabase,
  getForm,
  publish,
  save,
};
