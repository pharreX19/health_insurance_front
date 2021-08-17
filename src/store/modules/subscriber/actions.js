import {checkResponse, post, get, patch} from '../../../services/api';
import * as mutation_types from './mutation_types';

export const get_subscribers = ({commit}) => {
    get('subscribers').then(checkResponse).then((response)=>{
        console.log(response);
        commit(mutation_types.SET_SUBSCRIBERS, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const get_subscriber = ({commit}, params) => {
    get(`subscribers/${params.id}?include=${params.includes}`).then(checkResponse).then((response)=>{
        console.log(response);
        commit(mutation_types.SET_SUBSCRIBER, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const create_subscriber = ({commit}, payload) => {
   return new Promise((resolve, reject) => {
    post('subscribers', payload).then(checkResponse).then((response)=>{
        console.log(response);
        resolve(response);
        commit(mutation_types.ADD_SUBSCRIBER, response.data.data);
    }).catch((error) => {
        console.log(error)
        reject(error);
    });
   })
}


export const update_subscriber = (_, payload) => {
    patch(`subscribers/${payload.id}`, payload).then(checkResponse).then((response)=>{
        console.log(response);
        // commit(mutation_types.UPD, response.data.data);
    }).catch((error) => {console.log(error)});
}


export const search_subscriber = ({commit}, payload) => {
    get(`subscribers/search/${payload}`).then(checkResponse).then((response)=>{
        commit(mutation_types.SET_SUBSCRIBER, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const add_subscriber_episode = ({commit}, data) => {
    commit(mutation_types.ADD_SUBSCRIBER_EPISODE, data);
}

export const delete_subscription = ({commit}, data) => {
    commit(mutation_types.DELETE_SUBSCRIPTION, data);
}

export const import_subscribers = ({commit}, payload) => {
    post('subscribers-import', payload, true).then(checkResponse).then((response)=>{
        commit(mutation_types.SET_SUBSCRIBER, response.data.data);
    }).catch((error) => {console.log(error)});
}
