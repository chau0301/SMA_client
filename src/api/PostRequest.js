import axios from 'axios'

const APIURL = process.env.REACT_APP_API_URL
const API = axios.create({baseURL: APIURL})

export const getTimelinePosts = (id) => API.get(`/api/post/${id}/timeline`)
export const likePost = (id, userId) => API.put(`/api/post/${id}/like`, {userId : userId})
