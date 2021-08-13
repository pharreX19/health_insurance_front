import {checkResponse, get, patch, post, remove} from '../../../services/api';
import * as mutation_types from './mutation_types';

export const get_services = ({commit}, showLoader=true) => {
    get('services?include=serviceType,serviceLimitGroup', {showLoader: showLoader}).then(checkResponse).then((response)=>{
        commit(mutation_types.SET_SERVICES, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const create_service = ({commit}, payload) => {
    var service = {
        ...payload, 
        service_limit_group_id: payload.service_limit_group.id, 
        service_type_id: payload.service_type.id
    };

    post(`/services`, service).then(checkResponse).then((response)=>{
        commit(mutation_types.ADD_SERVICE, {...payload, id: response.data.data.id});
    }).catch((error) => {console.log(error)});
}

export const update_service = ({commit}, payload) => {
    console.log(payload);
    var service = {
        ...payload, 
        service_limit_group_id: payload.service_limit_group.id, 
        service_type_id: payload.service_type.id
    };
    patch(`/services/${payload.id}`, service).then(checkResponse).then((response)=>{
        console.log(response);
        commit(mutation_types.UPDATE_SERVICE, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const delete_service = ({commit}, id) => {
    remove(`/services/${id}`).then(checkResponse).then((response)=>{
        console.log(response);
        commit(mutation_types.REMOVE_SERVICE, id);
    }).catch((error) => {console.log(error)});
}


export const get_service_insurance_details = ({commit}, payload) => {
    return new Promise((resolve, reject) => {
        get(`/subscribers/${payload.subscriber_id}/plans/${payload.plan_id}/services/${payload.service_id}`, {showLoader: false}).then(checkResponse).then((response)=>{
            resolve(response);
            console.log(response);
            commit(mutation_types.SET_SERVICE_INSURANCE_DETAILS, response.data.data);
        }).catch((error) => {
            console.log(error)
            reject(error);
        });
    });
}

