import axios from 'axios'

const APIURL = process.env.REACT_APP_API_URL
const API = axios.create({baseURL: APIURL})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
export const getUser = (userId) => API.get(`/api/user/${userId}`)
export const updateUser = (id, formData) => API.put(`/api/user/${id}`, formData)
export const getAllUser = () => API.get(`/api/user/`)
export const followUser = (id, data) => API.put(`/api/user/${id}/follow`, data)
export const unFollowUser = (id, data) => API.put(`/api/user/${id}/unfollow`, data)