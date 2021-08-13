// import {state as service_state}  from './state';

export const SET_SERVICES = (state, data) => {
    console.log(data);
    state.services = data;
}

export const SET_SERVICE = (state, data) => {
    state.service = data;
}

export const ADD_SERVICE = (state, data) => {
    console.log(data);

    state.services.push(data);
}

export const UPDATE_SERVICE = (state, data) => {
    state.services.map((service) => {
        if(service.id === data.id){
            service = data;
        }
    })
}

export const SET_SERVICE_INSURANCE_DETAILS = (state, data) => {
    state.service_insurance_details = data;
}

export const REMOVE_SERVICE = (state, id) => {
    let temp = state.services.filter((service) => {
        return service.id != id;
    })
    state.services = temp;
}
