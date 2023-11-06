import axios from 'axios';
const ip = window.location.href.split(/[://]/)[3];

const apiClient = () => {
  const API_URL = "http://"+ip+":8090/"
  const axiosInstance  = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    responseType: "json",
    headers: {
      'Accept': 'application/json',
      'Content-type' : 'application/json'
    },

  });
  return axiosInstance
}


export default apiClient;