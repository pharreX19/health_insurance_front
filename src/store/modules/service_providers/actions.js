import {checkResponse, get, patch, post, remove} from '../../../services/api';
import * as mutation_types from './mutation_types';

export const get_service_providers = ({commit}) => {
    get('/service-providers').then(checkResponse).then((response)=>{
        commit(mutation_types.SET_SERVICE_PROVIDERS, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const create_service_provider = ({commit}, payload) => {
    post('/service-providers', payload).then(checkResponse).then((response)=>{
        commit(mutation_types.ADD_SERVICE_PROVIDER, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const update_service_providers = ({commit}, payload) => {
    patch(`/service-providers/${payload.id}`, payload).then(checkResponse).then((response)=>{
        commit(mutation_types.UPDATE_SERVICE_PROVIDERS, response.data.data);
    }).catch((error) => {console.log(error)});
}


export const delete_service_providers = ({commit}, id) => {
    remove(`/service-providers/${id}`).then(checkResponse).then(()=>{
        commit(mutation_types.REMOVE_SERVICE_PROVIDER, id);
    }).catch((error) => {console.log(error)});
}

