// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {state} from './state';
import {checkResponse, get, patch, post, remove} from '../../../services/api';

const SET_SERVICES = 'SET_SERVICES';
// const SET_SERVICE  = 'SET_SERVICE';
const ADD_SERVICE = 'ADD_SERVICE';
const REMOVE_SERVICE = 'REMOVE_SERVICE';
const UPDATE_SERVICE = 'UPDATE_SERVICE';
const SET_SERVICE_INSURANCE_DETAILS = 'SET_SERVICE_INSURANCE_DETAILS';
// const SET_SERVICE_TYPES  = 'SET_SERVICE_TYPES';
// const SET_SERVICE_LIMIT_GROUPS  = 'SET_SERVICE_LIMIT_GROUPS';


export const service = {
    namespaced: true,
    actions: {
        get_services({
            commit
        }, showLoader = true) {
            get('services?include=serviceType,serviceLimitGroup', {
                showLoader: showLoader
            }).then(checkResponse).then((response) => {
                commit(SET_SERVICES, response.data.data);
            }).catch((error) => {
                console.log(error)
            });
        },

        create_service({
            commit
        }, payload) {
            var service = {
                ...payload,
                service_limit_group_id: payload.service_limit_group.id,
                service_type_id: payload.service_type.id
            };

            post(`/services`, service).then(checkResponse).then((response) => {
                commit(ADD_SERVICE, {
                    ...payload,
                    id: response.data.data.id
                });
            }).catch((error) => {
                console.log(error)
            });
        },

        update_service({
            commit
        }, payload) {
            console.log(payload);
            var service = {
                ...payload,
                service_limit_group_id: payload.service_limit_group.id,
                service_type_id: payload.service_type.id
            };
            patch(`/services/${payload.id}`, service).then(checkResponse).then((response) => {
                console.log(response);
                commit(UPDATE_SERVICE, response.data.data);
            }).catch((error) => {
                console.log(error)
            });
        },

        delete_service({
            commit
        }, id) {
            remove(`/services/${id}`).then(checkResponse).then((response) => {
                console.log(response);
                commit(REMOVE_SERVICE, id);
            }).catch((error) => {
                console.log(error)
            });
        },


        get_service_insurance_details({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                get(`/subscribers/${payload.subscriber_id}/plans/${payload.plan_id}/services/${payload.service_id}`, {
                    showLoader: false
                }).then(checkResponse).then((response) => {
                    resolve(response);
                    console.log(response);
                    commit(SET_SERVICE_INSURANCE_DETAILS, response.data.data);
                }).catch((error) => {
                    console.log(error)
                    reject(error);
                });
            });
        }
    },
    getters: {
        services(state) {
            return state.services;
        },

        service(state) {
            return state.service;
        },

        service_insurance_details(state) {
            return state.service_insurance_details;
        },
    },
    mutations: {
        SET_SERVICES(state, data) {
            console.log(data);
            state.services = data;
        },

        SET_SERVICE(state, data) {
            state.service = data;
        },

        ADD_SERVICE(state, data) {
            console.log(data);

            state.services.push(data);
        },

        UPDATE_SERVICE(state, data) {
            state.services.map((service) => {
                if (service.id === data.id) {
                    service = data;
                }
            })
        },

        SET_SERVICE_INSURANCE_DETAILS(state, data) {
            state.service_insurance_details = data;
        },

        REMOVE_SERVICE(state, id) {
            let temp = state.services.filter((service) => {
                return service.id != id;
            })
            state.services = temp;
        }
    },
    state: {
        services: [],
        service: {},
        service_insurance_details: {}
    }
}