// import {state as service_state}  from './state';

export const SET_POLICIES = (state, data) => {
    state.policies = data;
}

export const SET_POLICY = (state, data) => {
    state.policy = data;
}

export const ADD_POLICY = (state, data) => {
    state.policies.unshift(data);
}

export const UPDATE_POLICY = (state, data) => {
    state.policies.map((policy) => {
        if(policy.id === data.id){
            policy = data;
        }
    })
}

export const REMOVE_POLICY = (state, id) => {
    console.log('REMOVING');
    let temp = state.policies.filter((policy) => {
        return policy.id != id;
    })
    state.policies = temp;
}

export const SET_PLAN = (state, data) => {
    state.plan = data;
}

export const REMOVE_SERVICE_FROM_PLAN = (state, {planId, serviceId}) => {
    // state.policies = [...state.policies, data];
    let plan = state.policy.plans.find((plan) => plan.id === planId);
    let updatedPlanServices = plan.services.map((planService) => {
        if(planService.id !== serviceId){            
        // }else{
            return planService;
        }
    })
    plan.services = updatedPlanServices;
}

export const ADD_SERVICE_TO_PLAN = (state, {planId, service}) => {
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

