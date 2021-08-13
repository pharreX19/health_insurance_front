import axios from './axios';
import { router } from "../router/router";

var BASE_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const validStatuses = [
    200, 201, 202, 203, 204,
    300, 301, 302, 303, 304
  ]

export function post(uri, data, config=null, multipart = false){
    return axios.post(uri, data, {...config, headers: getHeaders(multipart), withCredentials: false});
}


export function patch(uri, data){
    return axios.patch(uri, data, {headers: getHeaders(), withCredentials: false});
}


export function remove(uri){
    return axios.delete(uri, {headers: getHeaders(), withCredentials: false});
}


export function get(uri, config){
    return axios.get(uri, {...config, showSuccessSnackbar: false, headers: getHeaders(), withCredentials: false});
}

function getHeaders(multipart = false){
    let defaultHeaders = BASE_HEADERS;

    if(multipart){
        defaultHeaders = {
            'Content-Type': 'multipart/form-data'
        };
    }

    if(localStorage.getItem('token')){
        defaultHeaders = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, ...defaultHeaders
        }
    }
    return defaultHeaders;
}

export function checkResponse(response){
    if(validStatuses.includes(response.status)){
        return response;
    }

    if(response.status == 401){
        localStorage.removeItem('token');
        router.push('login');
        return Promise.reject(new Error("Unauthorized user"));
    }

    let error = new Error(response.errorText);
    error.response = response;
    return Promise.reject(error);
}