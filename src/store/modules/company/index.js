// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {
//     state
// } from './state';
// import {
//     checkResponse,
//     get,
//     patch,
//     post,
//     remove
// } from '../../../services/api';
import {actions} from '../../baseModule';
import {getters} from '../../baseModule';
import {mutations} from '../../baseModule';
import {state} from '../../baseModule';

// const SET_COMPANIES = 'SET_COMPANIES';
// const SET_COMPANY  = 'SET_COMPANY';
// const ADD_COMPANY = 'ADD_COMPANY';
// const UPDATE_COMPANY = 'UPDATE_COMPANY';
// const REMOVE_COMPANY = 'REMOVE_COMPANY';

// export const url = '/companies';

export const company = {
    namespaced: true,
    actions: {
        ...actions
    },
    getters: {
        ...getters
    },
    mutations: {
       ...mutations
    },
    state: {
        ...state
    }
}