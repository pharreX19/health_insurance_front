// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {state} from './state';

// import {checkResponse, get} from '../../../services/api';
// import * as mutation_types from './mutation_types';
import {
    checkResponse,
    patch,
    remove
} from '../../../services/api';
import {
    store
} from '../../index';

// const SET_SUBSCRIPTIONS = 'SET_SUBSCRIPTIONS';
const SET_SUBSCRIPTION = 'SET_SUBSCRIPTION';
// const ADD_SUBSCRIPTION = 'ADD_SUBSCRIBER';


export const subscription = {
    namespaced: true,
    actions: {
        update_subscription({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                patch(`subscriptions/${payload.id}`, payload.data).then(checkResponse).then((response) => {
                    commit(SET_SUBSCRIPTION, response.data.data);
                    resolve(response);
                    // commit('subscriber/UPDATE_SUBSCRIBER_SUBSCRIPTION', response.data.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
            })
        },


        delete_subscription(_, id) {
            remove(`subscriptions/${id}`).then(checkResponse).then(() => {
                // commit(DELETE_SUBSCRIPTION, response.data.data);
                store.dispatch('subscriber/delete_subscription');
            }).catch((error) => {
                console.log(error)
            });
        }
    },
    mutations: {

        SET_SUBSCRIPTIONS(state, payload) {
            state.subscriptions = payload;
        },

        SET_SUBSCRIPTION(state, payload) {
            state.subscription = payload;
        },

        ADD_SUBSCRIPTION(state, payload) {
            state.subscriptions.push(payload);
        }
    },
    getters: {
        subscriptions(state){
            return state.subscriptions;
        },
        
        subscription(state){
            return state.subscription;
        }
    },
    state: {
        subscriptions: [],
        subscription: {}
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