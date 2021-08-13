import { router } from '../router/router';
import {post, checkResponse} from '../services/api';
import { store } from '../store';
// import { commit } from 'vuex';
// import * as mutation_types from '../store/modules/auth/mutation_types';
// import { reject, resolve } from 'core-js/fn/promise';

export default class Auth{
    constructor(){
        this.name = '';
        this.email = '';
        this.active = false;
        this.contact = '';
        this.type = '';
        this.permissions = {};
        this.role = {};
        this.providers = [];
        this.selectedProvider = null;
    }

    setRole(role){
        this.role = role.name;
        window.role = Object.assign({}, role);
    }

    setPermissions(permissions){
        permissions.forEach(element => {
            this.permissions[element.slug] = true;
        });
        window.permissions = Object.assign({}, permissions);
    }

    setProvider(serviceProvider){
        this.selectedProvider = serviceProvider;
    }

    can(permission){
        if(Object.keys(this.permissions).length <= 0){
            this.setPermissions(store.state.user.user.role.permissions);
        }
        return Object.keys(this.permissions).indexOf(permission) !== -1;
    }

    isAdmin(){
        return this.role === 'admin';
    }

    isReceptionist(){
        return this.role === 'receptionist';
    }

    isUser(){
        return this.role === 'user';
    }

    isEmployee(){
        return this.role === 'employee';
    }

    clearLocalStorage(){
        localStorage.removeItem('token');
    }

    login (payload){
        return new Promise((resolve, reject) => {
            post('/login', payload).then(checkResponse).then((response)=>{
                this.setPermissions(response.data.user.role.permissions);
                this.setRole(response.data.user.role)
                // commit(mutation_types.SET_USER, response);
                return resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        })
        
    }

    logout (){
        return new Promise((resolve, reject) => {
            post('/logout', null).then(checkResponse).then(()=>{
                this.clearLocalStorage();
                router.push({name: 'login'});
                // return resolve(this);
            }).catch((error) => {
                reject(error);
            });
        })
        
    }
}