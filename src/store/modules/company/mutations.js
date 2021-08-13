// import {state as service_state}  from './state';

export const SET_COMPANIES = (state, data) => {
    state.companies = data;
}

export const SET_COMPANY = (state, data) => {
    state.company = data;
}

export const ADD_COMPANY = (state, data) => {
    state.companies.unshift(data);
}

// export const ADD_SERVICE_PROVIDER = (state, data) => {
//     state.service_providers.push(data);
// }

export const UPDATE_COMPANY = (state, data) => {
    state.companies.map((company) => {
        if(company.id === data.id){
            company = data;
        }
    })
}

export const REMOVE_COMPANY = (state, id) => {
    let temp = state.companies.filter((company) => {
        return company.id != id;
    })
    state.companies = temp;
}