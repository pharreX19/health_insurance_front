import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import {state} from './state';

// import {checkResponse, get} from '../../../services/api';
// import * as mutation_types from './mutation_types';

export const country = {
    namespaced: true, 
    actions,
    mutations,
    getters,
    state
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