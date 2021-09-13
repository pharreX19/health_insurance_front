import axios from "axios";
// import Auth from "../js/auth";
import { router } from "../router/router";
import {store} from '../store/index';
import NProgress from 'nprogress';


axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

axios.defaults.showLoader = true;
axios.defaults.showErrorSnackbar = true;
axios.defaults.showSuccessSnackbar = true;


axios.interceptors.request.use(config => {
    if(!NProgress.isStarted()){
        NProgress.start();
    }
    if(config.showLoader){
        store.dispatch('pending');
    }
    return config;
}, error => {
    if(error.config.showLoader){
        store.dispatch('done')
    }
    return Promise.reject(error);
});


axios.interceptors.response.use(response => {
    NProgress.done();
    if(response.config.showSuccessSnackbar){
        store.dispatch('show_snackbar', {type: 'success', msg: response.data.success.message});
    }
    if(response.config.showLoader){
        store.dispatch('done')
    }
    if(response.data.access_token){
        router.push({name: 'home'});
    }
    return response;
}, error => {
    NProgress.done();

    let error_msg;
    if(error.response.status){
        switch(error.response.status){
            case 400: 
                console.log('400 error case');
                break;

            case 401:
                error_msg = error.response.data.message || error.response.data.errors?.message.error;
                // this.clearLocalStorage();
                // router.push({name: 'login'});
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // console.log(this.$route);
                router.replace({'path': '/login'});
                break;

            case 403:
                error_msg = error.response.data.message;
                break;

            case 404:
                console.log('404 error case');
                error_msg = 'No such record found in our database.'
                break;

            case 409:
                if(!localStorage.getItem('serviceProvider')){
                    error.config.showErrorSnackbar = false;
                }
                break;

            case 422:                
                error_msg = Object.values(error.response.data.errors).reduce((error_msgs, currValue) => {
                    error_msgs += `${currValue} \n`
                    return error_msgs;
                }, '')
                
                console.log('422 error case', error.response.data.errors);
                break;          
                
            case 500:
            default:
                error_msg = 'Unexpected server error. Please try again.'
                console.log('500 error case');
                break;          
        }
    }
    if(error.config.showErrorSnackbar){
        store.dispatch('show_snackbar', {type: 'error', msg: error_msg});
    }
    if(error.config.showLoader){
        store.dispatch('done');

    }
    return Promise.reject(error);
})

export default axios;