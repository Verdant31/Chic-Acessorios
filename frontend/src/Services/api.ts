import axios from 'axios';

const baseUrl = process.env['API_URL']
export const api = axios.create({
  baseURL: 'http://192.168.100.6:3001',
})
