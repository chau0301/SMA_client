import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:5000"})

export const getTimelinePosts = (id) => API.get(`/api/post/${id}/timeline`)
export const likePost = (id, userId) => API.put(`/api/post/${id}/like`, {userId : userId})
