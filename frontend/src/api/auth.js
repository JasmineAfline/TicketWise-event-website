// src/api/auth.js
import axios from './axiosInstance';

export const loginUser = (credentials) =>
  axios.post('/auth/login', credentials);

export const registerUser = (data) =>
  axios.post('/auth/register', data);

// src/api/events.js
export const getEvents = () => axios.get('/events');
export const createEvent = (data) => axios.post('/events', data);
