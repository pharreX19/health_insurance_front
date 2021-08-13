// import {state as country_state}  from './state';

// import Vue from "vue"

export const SET_SUBSCRIPTIONS = (state, payload) => {
    state.subscriptions = payload;
}

export const SET_SUBSCRIPTION = (state, payload) => {
    state.subscription = payload;
}

export const ADD_SUBSCRIPTION = (state, payload) => {
    state.subscriptions.push(payload);
}


