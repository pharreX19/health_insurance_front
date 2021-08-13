import {checkResponse, get, patch, post, remove} from '../../../services/api';
import * as mutation_types from './mutation_types';

export const get_policies = ({commit}, showLoader = false) => {
    get('policies?include=plans.services', {showLoader: showLoader}).then(checkResponse).then((response)=>{
        console.log(response)
        commit(mutation_types.SET_POLICIES, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const get_policy = ({commit}, id) => {
    get(`policies/${id}?include=plans.services`).then(checkResponse).then((response)=>{
        console.log(response)
        commit(mutation_types.SET_POLICY, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const create_policy = ({commit}, payload) => {
    post('policies', payload).then(checkResponse).then((response)=>{
        commit(mutation_types.ADD_POLICY, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const update_policy = ({commit}, payload) => {
    patch(`policies/${payload.id}`, payload).then(checkResponse).then((response)=>{
        commit(mutation_types.UPDATE_POLICY, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const delete_policy = ({commit}, id) => {
    remove(`policies/${id}`).then(checkResponse).then(()=>{
        commit(mutation_types.REMOVE_POLICY, id);
    }).catch((error) => {console.log(error)});
}

export const remove_service_from_plan = ({commit}, payload) => {
    remove(`plans/${payload.planId}/services/${payload.serviceId}/remove`).then(checkResponse).then(()=>{
        commit(mutation_types.REMOVE_SERVICE_FROM_PLAN, payload);
    }).catch((error) => {console.log(error)});
}

export const add_service_to_plan = ({commit}, payload) => {
    post(`plans/${payload.planId}/services/${payload.service.id}/add`, {limit_group_calculation_type_id: payload.calculation_type}).then(checkResponse).then(()=>{
        commit(mutation_types.ADD_SERVICE_TO_PLAN, payload);
    }).catch((error) => {console.log(error)});
}


