import axios from 'axios'

const APIURL = process.env.REACT_APP_API_URL
const API = axios.create({baseURL: APIURL})

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }

    return req;
  });

export const uploadImage = (data) => API.post('/api/upload', data)
export const uploadPost = (data) => API.post('/api/post/create', data)
