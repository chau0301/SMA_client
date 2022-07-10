import axios from 'axios'

const APIURL = process.env.REACT_APP_API_URL
const API = axios.create({baseURL: APIURL})

export const logIn = (formData) => API.post('/api/auth/login', formData)
export const signUp = (formData) => API.post('/api/auth/register', formData)