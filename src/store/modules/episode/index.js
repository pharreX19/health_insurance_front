// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {
//     state
// } from './state';
import {
    checkResponse,
    post,
    get
} from '../../../services/api';
import {
    store
} from '../..';

const SET_EPISODES = 'SET_EPISODES';
// const SET_EPISODE  = 'SET_EPISODE';
const ADD_EPISODE = 'ADD_EPISODE';


export const episode = {
    namespaced: true,
    actions: {
        get_episodes({
            commit
        }) {
            get('episodes?include=serviceProvider,services').then(checkResponse).then((response) => {
                commit(SET_EPISODES, response.data.data);
            }).catch((error) => {
                console.log(error)
            });
        },

        create_episode({
            commit
        }, payload) {
            post('episodes', payload, ).then(checkResponse).then((response) => {
                commit(ADD_EPISODE, response.data.data);
                store.dispatch('subscriber/add_subscriber_episode', response.data.data);
            }).catch((error) => {
                console.log(error)
            });
        },

        update_episode({
            commit
        }, payload) {
            post(`episodes/${payload.id}`, payload.data, ).then(checkResponse).then((response) => {
                commit(ADD_EPISODE, response.data.data);

            }).catch((error) => {
                console.log(error)
            });
        }
    },
    mutations: {
        SET_EPISODES(state, payload) {
            state.episodes = payload;
        },

        SET_EPISODE(state, payload) {
            state.episode = payload;
        },

        ADD_EPISODE(state, payload) {
            state.episodes.push(payload);
        },

    },
    getters: {
        episodes(state) {
            return state.episodes;
        },


        episode(state) {
            return state.episode;
        },
    },
    state: {
        episodes: [],
        episode: {}
    }
}