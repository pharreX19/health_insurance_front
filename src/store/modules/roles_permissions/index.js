import {checkResponse, get, patch, post, remove} from '../../../services/api';


const SET_ROLES  = 'SET_ROLES';
const ADD_ROLE  = 'ADD_ROLE';
// const UPDATE_ROLES  = 'UPDATE_ROLES';
const DELETE_ROLE = 'DELETE_ROLE';
const SET_PERMISSIONS  = 'SET_PERMISSIONS';


export const role_permission = {
    namespaced: true, 
    actions:{
         get_roles({commit}){
            get('roles?include=permissions', {showLoader: true}).then(checkResponse).then((response)=>{
                commit(SET_ROLES, response.data.data);
            }).catch((error) => {console.log(error)});
        },
        get_permissions({commit}){
            get('permissions', {showLoader: true}).then(checkResponse).then((response)=>{
                commit(SET_PERMISSIONS, response.data.data);
            }).catch((error) => {console.log(error)});
        },
        create_role({commit}, payload){
            post('roles', payload, {showLoader: true}).then(checkResponse).then((response)=>{
                commit(ADD_ROLE, response.data.data);
            }).catch((error) => {console.log(error)});
        },
        update_role({commit}, payload){
            patch(`roles/${payload.id}`, payload, {showLoader: true}).then(checkResponse).then((response)=>{
                commit(SET_PERMISSIONS, response.data.data);
            }).catch((error) => {console.log(error)});
        },
        delete_role({commit}, id){
            remove(`roles/${id}`, {showLoader: true}).then(checkResponse).then(()=>{
                commit(DELETE_ROLE, id);
            }).catch((error) => {console.log(error)});
        },
        attach_permission(_, payload){
            post(`roles/${payload.roleId}/permissions/${payload.permissionId}`, null, {showLoader: false}).then(checkResponse).then(()=>{
                // commit(DELETE_ROLE, id);
            }).catch((error) => {console.log(error)});
        }
    },
    getters: {
         roles(state){
            return state.roles;
        },
        role(state){
            return state.role;
        },
        permissions(state){
            return state.permissions;
        },
    },
    mutations: {
        SET_ROLES(state, data){
            state.roles = data;
        },
        SET_ROLE(state, data){
            state.role = data;
        },
        ADD_ROLE(state, data){
            state.roles.push(data);
        },
        DELETE_ROLE(state, id){
            let temp = state.roles.filter((role) => role.id !== id);
            state.roles = temp;
        },
        SET_PERMISSIONS(state, data){
            state.permissions = data;
        }
    },
    state: {
        roles: [],
        role: {},
        permissions:[],
    }
} 