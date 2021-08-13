import {checkResponse, post, get} from '../../../services/api';
import * as mutation_types from './mutation_types';
import { store } from '../..';

export const get_episodes = ({commit}) => {
    get('episodes?include=serviceProvider,services').then(checkResponse).then((response)=>{
        commit(mutation_types.SET_EPISODES, response.data.data);
    }).catch((error) => {console.log(error)});
}

export const create_episode = ({commit}, payload) => {
    post('episodes', payload,).then(checkResponse).then((response)=>{
        commit(mutation_types.ADD_EPISODE, response.data.data);
        store.dispatch('subscriber/add_subscriber_episode', response.data.data);
    }).catch((error) => {console.log(error)});
}

export const update_episode = ({commit}, payload) => {
    post(`episodes/${payload.id}`, payload.data,).then(checkResponse).then((response)=>{
        commit(mutation_types.ADD_EPISODE, response.data.data);

    }).catch((error) => {console.log(error)});
}
