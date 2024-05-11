import axios, { AxiosInstance } from 'axios';
const localhost = 'http://localhost:3000'
const axiosClient = axios.create({
    baseURL: localhost,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }) as AxiosInstance;

  export default axiosClient;