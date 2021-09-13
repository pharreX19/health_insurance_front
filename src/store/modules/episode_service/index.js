// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {
//     state
// } from './state';
import {
    checkResponse,
    post,
    remove
} from '../../../services/api';


const SET_ERROR = 'SET_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

export const episode_service = {
    namespaced: true,
    actions: {

        add_service_to_episode({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                commit(CLEAR_ERROR);
                post('/episode-services', payload).then(checkResponse).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                    commit(SET_ERROR, error.response);
                    console.log(error)
                });
            })
        },

        remove_service_from_episode({
            commit
        }, id) {
            return new Promise((resolve, reject) => {
                remove(`/episode-services/${id}`).then(checkResponse).then(function (response) {
                    resolve(response);
                }).catch((error) => {
                    commit(SET_ERROR, error.response);
                    reject(error);
                    console.log(error)
                });
            })
        }
    },
    mutations: {

        SET_ERROR(state, error) {
            state.error = error;
        },


        CLEAR_ERROR(state) {
            state.error = null;
        }
    },
    // getters,
    state: {
        error: {}
    }
}