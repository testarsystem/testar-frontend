import axios from 'axios'
import router from './router'

const url = 'http://104.248.241.155:5000/';

const baseInstance = axios.create({
    baseURL: url
});

baseInstance.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    if ( token != null ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
  
baseInstance.interceptors.response.use( response => {
    return response;
}, error => {
  if(error.response) {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')     
      if(router.currentRoute.path != '/login')
        router.replace('/login');
      else
        return Promise.reject(error.response.data);
    }
    else if (error.response.status === 404) {
      router.replace('/not_found');
    }
    else
      return Promise.reject(error.response.data);
  }
  else
    return Promise.reject(error);
});

export default baseInstance;