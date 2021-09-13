// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {
//     state
// } from './state';
// import {
    // checkResponse,
    // get,
    // patch,
    // post,
    // remove
// } from '../../../services/api';
// import { state } from '../service/state';
import {actions} from '../../baseModule';
import {getters} from '../../baseModule';
import {mutations} from '../../baseModule';
import {state} from '../../baseModule';


// const SET_CALCULATION_TYPES = 'SET_CALCULATION_TYPES';

export const calculation_type = {
    namespaced: true,
    actions: {
        // get_calculation_types({
        //     commit
        // }) {
        //     get('/service-limit-group-calculations').then(checkResponse).then((response) => {
        //         commit(SET_CALCULATION_TYPES, response.data.data);
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        // },
        ...actions
    },
    getters: {
        // calculation_types() {
        //     return state.calculation_types;
        // }
        ...getters
    },
    mutations: {
        // SET_CALCULATION_TYPES(state, data) {
        //     state.calculation_types = data;
        //     console.log(state.calculation_types);
        // }
        ...mutations
    },
    state: {
        // calculation_types: [],
        ...state
    }
}