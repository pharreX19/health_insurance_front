// import {state as service_state}  from './state';

export const SET_SERVICE_PROVIDERS = (state, data) => {
    state.service_providers = data;
}

export const SET_SERVICE_PROVIDER = (state, data) => {
    state.service_provider = data;
}

export const ADD_SERVICE_PROVIDER = (state, data) => {
    state.service_providers.push(data);
}

export const UPDATE_SERVICE_PROVIDERS = (state, data) => {
    state.service_providers.map((serviceProvider) => {
        if(serviceProvider.id === data.id){
            serviceProvider = data;
        }
    })
}

export const REMOVE_SERVICE_PROVIDER = (state, id) => {
    let temp = state.service_providers.filter((serviceProvider) => {
        return serviceProvider.id != id;
    })
    state.service_providers = temp;
}

