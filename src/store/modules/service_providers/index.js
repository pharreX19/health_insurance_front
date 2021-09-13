// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {state} from './state';
import {
    checkResponse,
    get,
    patch,
    post,
    remove
} from '../../../services/api';

const SET_SERVICE_PROVIDERS = 'SET_SERVICE_PROVIDERS';
// const SET_SERVICE_PROVIDER  = 'SET_SERVICE_PROVIDER';
const UPDATE_SERVICE_PROVIDERS = 'UPDATE_SERVICE_PROVIDERS';
const ADD_SERVICE_PROVIDER = 'ADD_SERVICE_PROVIDER';
const REMOVE_SERVICE_PROVIDER = 'REMOVE_SERVICE_PROVIDER';


export const service_provider = {
    namespaced: true,
    actions: {
        get_service_providers({
            commit
        }) {
            get('/service-providers').then(checkResponse).then((response) => {
                commit(SET_SERVICE_PROVIDERS, response.data.data);
            }).catch((error) => {
                console.log(error)
            });
        },

        create_service_provider({
            commit
        }, payload) {
            post('/service-providers', payload).then(checkResponse).then((response) => {
                commit(ADD_SERVICE_PROVIDER, response.data.data);
            }).catch((error) => {
                console.log(error)
            });
        },

        update_service_providers({
            commit
        }, payload) {
            patch(`/service-providers/${payload.id}`, payload).then(checkResponse).then((response) => {
                commit(UPDATE_SERVICE_PROVIDERS, response.data.data);
            }).catch((error) => {
                console.log(error)
            });
        },


        delete_service_providers({
            commit
        }, id) {
            remove(`/service-providers/${id}`).then(checkResponse).then(() => {
                commit(REMOVE_SERVICE_PROVIDER, id);
            }).catch((error) => {
                console.log(error)
            });
        }
    },
    getters: {
        serviceProviders(state) {
            return state.service_providers;
        },

        serviceProvider(state) {
            return state.service_provider;
        }
    },
    mutations: {

        SET_SERVICE_PROVIDERS(state, data) {
            state.service_providers = data;
        },

        SET_SERVICE_PROVIDER(state, data) {
            state.service_provider = data;
        },

        ADD_SERVICE_PROVIDER(state, data) {
            state.service_providers.push(data);
        },

        UPDATE_SERVICE_PROVIDERS(state, data) {
            state.service_providers.map((serviceProvider) => {
                if (serviceProvider.id === data.id) {
                    serviceProvider = data;
                }
            })
        },

        REMOVE_SERVICE_PROVIDER(state, id) {
            let temp = state.service_providers.filter((serviceProvider) => {
                return serviceProvider.id != id;
            })
            state.service_providers = temp;
        }
    },
    state: {
        service_providers: [],
        service_provider: {}
    }
}