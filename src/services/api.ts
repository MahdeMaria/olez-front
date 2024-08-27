import axios from 'axios'

export const api = axios.create({
    //baseURL: 'https://zelo-api-1.onrender.com',
    baseURL: 'http://localhost:8000',
    headers: { 'X-API-Key': import.meta.env.VITE_API_KEY },
})
