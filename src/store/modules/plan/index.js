import { checkResponse, patch, post } from '../../../services/api';
import {actions} from '../../baseModule';
import {getters} from '../../baseModule';
import {mutations} from '../../baseModule';
import {state} from '../../baseModule';

export const plan = {
    namespaced: true,
    actions: {
        ...actions,
        add_plan_service_limit_groups(_, payload){
            console.log('from service', payload);
           return new Promise((resolve, reject) => {
            post(payload.url, payload.data).then(checkResponse).then((response)=>{
                resolve(response);
            }).catch((error) => {
                console.log(error)
                reject(error);
            });
           })
        },

        update_plan_service_limit_group(_, payload){
           return new Promise((resolve, reject) => {
            patch(payload.url, payload.data).then(checkResponse).then((response)=>{
                resolve(response);
            }).catch((error) => {
                console.log(error)
                reject(error);

            });
           })
        },
    },
    getters: {
        ...getters,
    },
    mutations: {
        ...mutations,
    },
    state: {
        ...state,
    }
}