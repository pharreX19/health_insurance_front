// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {state} from './state';

import {checkResponse, get} from '../../../services/api';
// import { state } from '../service/state';
// import * as mutation_types from './mutation_types';
const SET_COUNTRIES  = 'SET_COUNTRIES';

export const country = {
    namespaced: true, 
    actions: {
        get_countries({commit}){
            get('countries', {showLoader: false}).then(checkResponse).then((response)=>{
                commit(SET_COUNTRIES, response.data.data);
            }).catch((error) => {console.log(error)});
        }
    },
    mutations: {
        SET_COUNTRIES(state, payload){
            state.countries = payload;
        }
    },
    getters: {
        countries(state){
            return state.countries;
        }
    },
    state: {
        countries: [],
    }
} 

// actions: {
//     get_countries({commit}){
//         console.log('THIS IS', newstate);

//         get('countries').then(checkResponse).then((response)=>{
//             commit(mutation_types.SET_COUNTRIES, response.data.data);
//             Promise.resolve();
//         }).catch((error) => {console.log(error)})
//     },
// },
// getters: {
//     countries(newstate){
//         return newstate.countries;
//     }
// },
// mutations: {
//     SET_COUNTRIES(newstate, payload){
//         console.log(payload);
//         newstate.countries = payload;        
//     }
// },
// state : newstate