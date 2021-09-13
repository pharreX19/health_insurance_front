// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {state} from './state';
import {checkResponse, post} from '../../../services/api';
import {actions} from '../../baseModule';
import {getters} from '../../baseModule';
import {mutations} from '../../baseModule';
import {state} from '../../baseModule';

// const SET_SUBSCRIBERS  = 'SET_SUBSCRIBERS';
// const SET_SUBSCRIBER  = 'SET_SUBSCRIBER';
// const ADD_SUBSCRIBER  = 'ADD_SUBSCRIBER';
const ADD_SUBSCRIBER_EPISODE  = 'ADD_SUBSCRIBER_EPISODE';
const DELETE_SUBSCRIPTION  = 'DELETE_SUBSCRIPTION';


// import {checkResponse, get} from '../../../services/api';
// import * as mutation_types from './mutation_types';

export const subscriber = {
    namespaced: true, 
    actions: {
        ...actions,
        // get_subscribers({commit}){
        //     get('subscribers').then(checkResponse).then((response)=>{
        //         console.log(response);
        //         commit(SET_SUBSCRIBERS, response.data.data);
        //     }).catch((error) => {console.log(error)});
        // },
        
        // get_subscriber({commit}, params){
        //     get(`subscribers/${params.id}?include=${params.includes}`).then(checkResponse).then((response)=>{
        //         console.log(response);
        //         commit(SET_SUBSCRIBER, response.data.data);
        //     }).catch((error) => {console.log(error)});
        // },
        
        // create_subscriber({commit}, payload){
        //    return new Promise((resolve, reject) => {
        //     post('subscribers', payload).then(checkResponse).then((response)=>{
        //         console.log(response);
        //         resolve(response);
        //         commit(ADD_SUBSCRIBER, response.data.data);
        //     }).catch((error) => {
        //         console.log(error)
        //         reject(error);
        //     });
        //    })
        // },
        
        
        // update_subscriber(_, payload){
        //     patch(`subscribers/${payload.id}`, payload).then(checkResponse).then((response)=>{
        //         console.log(response);
        //         // commit(UPD, response.data.data);
        //     }).catch((error) => {console.log(error)});
        // },
        
        
        // search_subscriber({commit}, payload){
        //     get(`subscribers/search/${payload}`).then(checkResponse).then((response)=>{
        //         commit(SET_SUBSCRIBER, response.data.data);
        //     }).catch((error) => {console.log(error)});
        // },
        
        add_subscriber_episode({commit}, data){
            commit(ADD_SUBSCRIBER_EPISODE, data);
        },
        
        delete_subscription({commit}, data){
            commit(DELETE_SUBSCRIPTION, data);
        },
        
        import_subscribers({commit}, payload){
            post('subscribers-import', payload, true).then(checkResponse).then((response)=>{
                commit('SET_MODEL', response.data.data);
            }).catch((error) => {console.log(error)});
        }
        
    },
    mutations: {
        // SET_SUBSCRIBERS(state, payload){
        //     state.subscribers = payload;
        // },
        
        // SET_SUBSCRIBER(state, payload){
        //     state.subscriber = payload;
        // },
        
        
        // ADD_SUBSCRIBER(state, payload){
        //     state.subscribers.push(payload);
        // },
        ...mutations,
        ADD_SUBSCRIBER_EPISODE(state, payload){
            state.subscriber.episodes.push(payload);
            console.log('EPISODES NOW IS ', state.subscriber.episodes);
            console.log(state.subscriber);
        },
        
        DELETE_SUBSCRIPTION(state){
            console.log('REMOVED SUBSCRPTION');
            state.subscriber.subscriptions = [];
        }
    },
    getters: {
        // subscribers(state){
        //     return state.subscribers;
        // },
        
        // subscriber(state){
        //     return state.subscriber;
        // }
        ...getters,
    },
    state:{
        // subscribers: [],
        // subscriber: {}
        ...state
    }
} 

// actions: {
//     get_countries({commit}){
//         console.log('THIS IS', newstate);

//         get('countries').then(checkResponse).then((response)=>{
//             commit(SET_COUNTRIES, response.data.data);
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