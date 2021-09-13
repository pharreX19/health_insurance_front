import {checkResponse, post, remove} from '../../../services/api';
import * as mutation_types from './mutation_types';

export const add_service_to_episode = ({commit}, payload) => {
    return new Promise((resolve, reject) => {
        commit(mutation_types.CLEAR_ERROR);
        post('/episode-services', payload).then(checkResponse).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error);
        commit(mutation_types.SET_ERROR, error.response);
        console.log(error)
    });
    })
}

export const remove_service_from_episode = ({commit}, id) => {
    return new Promise((resolve, reject) => {
        remove(`/episode-services/${id}`).then(checkResponse).then(function(response){
            resolve(response);
        }).catch((error) => {
            commit(mutation_types.SET_ERROR, error.response);
            reject(error);
            console.log(error)
        });
    })
}