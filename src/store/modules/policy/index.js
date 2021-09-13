// import * as actions from './actions';
// import * as getters from './getters';
// import * as mutations from './mutations';
// import {state} from './state';
import {
    checkResponse,
    // get,
    // patch,
    post,
    remove
} from '../../../services/api';
import {actions} from '../../baseModule';
import {getters} from '../../baseModule';
import {mutations} from '../../baseModule';
import {state} from '../../baseModule';

// const SET_POLICIES = 'SET_POLICIES';
// const SET_POLICY = 'SET_POLICY';
// const ADD_POLICY = 'ADD_POLICY';
// const UPDATE_POLICY = 'UPDATE_POLICY';
// const REMOVE_POLICY = 'REMOVE_POLICY';
// const SET_PLAN  = 'SET_PLAN';
const ADD_SERVICE_TO_PLAN = 'ADD_SERVICE_TO_PLAN';
const REMOVE_SERVICE_FROM_PLAN = 'REMOVE_SERVICE_FROM_PLAN';

export const policy = {
    namespaced: true,
    actions: {
        // get_policies({
        //     commit
        // }, showLoader = false) {
        //     get('policies?include=plans.services', {
        //         showLoader: showLoader
        //     }).then(checkResponse).then((response) => {
        //         console.log(response)
        //         commit(SET_POLICIES, response.data.data);
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        // },

        // get_policy({
        //     commit
        // }, id) {
        //     get(`policies/${id}?include=plans.services`).then(checkResponse).then((response) => {
        //         console.log(response)
        //         commit(SET_POLICY, response.data.data);
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        // },

        // create_policy({
        //     commit
        // }, payload) {
        //     post('policies', payload).then(checkResponse).then((response) => {
        //         commit(ADD_POLICY, response.data.data);
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        // },

        // update_policy({
        //     commit
        // }, payload) {
        //     patch(`policies/${payload.id}`, payload).then(checkResponse).then((response) => {
        //         commit(UPDATE_POLICY, response.data.data);
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        // },

        // delete_policy({
        //     commit
        // }, id) {
        //     remove(`policies/${id}`).then(checkResponse).then(() => {
        //         commit(REMOVE_POLICY, id);
        //     }).catch((error) => {
        //         console.log(error)
        //     });
        // },
        ...actions,
        remove_service_from_plan({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                remove(`plans/${payload.planId}/services/${payload.serviceId}/remove`).then(checkResponse).then(() => {
                    commit(REMOVE_SERVICE_FROM_PLAN, payload);
                    resolve(payload);
                }).catch((error) => {
                    console.log(error)
                    reject(error);
                });
            })
        },

        add_service_to_plan({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                post(`plans/${payload.planId}/services/${payload.service.id}/add`, {
                    limit_group_calculation_type_id: payload.calculation_type,
                    limit_total: parseFloat(payload.limit_total)
                }).then(checkResponse).then(() => {
                    resolve(payload);
                    commit(ADD_SERVICE_TO_PLAN, payload);
                }).catch((error) => {
                    reject(error);
                    console.log(error)
                });
            })
        }
    },
    getters: {
        // policies(state) {
        //     return state.policies;
        // },

        // policy(state) {
        //     return state.policy;
        // },

        ...getters,
        plan(state) {
            return state.plan;
        },
    },
    mutations: {
        // SET_POLICIES(state, data){
        //     state.policies = data;
        // },
        
        // SET_POLICY(state, data){
        //     state.policy = data;
        // },
        
        // ADD_POLICY(state, data){
        //     state.policies.unshift(data);
        // },
        
        // UPDATE_POLICY(state, data){
        //     state.policies.map((policy) => {
        //         if(policy.id === data.id){
        //             policy = data;
        //         }
        //     })
        // },
        
        // REMOVE_POLICY(state, id){
        //     console.log('REMOVING');
        //     let temp = state.policies.filter((policy) => {
        //         return policy.id != id;
        //     })
        //     state.policies = temp;
        // },
        ...mutations,
        SET_PLAN(state, data){
            state.plan = data;
        },
        
        REMOVE_SERVICE_FROM_PLAN(state, {planId, serviceId}){
            // state.policies = [...state.policies, data];
            let plan = state.policy.plans.find((plan) => plan.id === planId);
            let updatedPlanServices = plan.services.map((planService) => {
                if(planService.id !== serviceId){            
                // }else{
                    return planService;
                }
            })
            plan.services = updatedPlanServices;
        },
        
        ADD_SERVICE_TO_PLAN(state, {planId, service}){
            // state.policies = [...state.policies, data];
            let plan = state.policy.plans.find((plan) => plan.id === planId);
            plan.services.push(service);
            // let updatedPlanServices = plan.services.map((planService) => {
                // if(planService.id !== serviceId){            
                // }else{
                    // return planService;
                // }
            // })
            // plan.services = updatedPlanServices;
        }
        
    },
    state: {
        // 'policies': [],
        // 'policy': {},
        ...state,
        plan: {}
    }
}