import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import {state} from './state';

export const episode = {
    namespaced: true, 
    actions,
    mutations,
    getters,
    state
} 
