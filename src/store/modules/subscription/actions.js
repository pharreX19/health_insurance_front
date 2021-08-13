import { store } from '../..';
import {checkResponse, patch, remove} from '../../../services/api';
import * as mutation_types from './mutation_types';


export const update_subscription = ({commit}, payload) => {
    return new Promise((resolve, reject) => {
        patch(`subscriptions/${payload.id}`, payload.data).then(checkResponse).then((response)=>{
            commit(mutation_types.SET_SUBSCRIPTION, response.data.data);
            resolve(response);
            // commit('subscriber/UPDATE_SUBSCRIBER_SUBSCRIPTION', response.data.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    })
}


export const delete_subscription = (_, id) => {
    remove(`subscriptions/${id}`).then(checkResponse).then(()=>{
        // commit(mutation_types.DELETE_SUBSCRIPTION, response.data.data);
        store.dispatch('subscriber/delete_subscription');
    }).catch((error) => {console.log(error)});
}