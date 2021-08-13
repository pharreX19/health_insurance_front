// import {state as country_state}  from './state';

// import Vue from "vue"

export const SET_SUBSCRIBERS = (state, payload) => {
    state.subscribers = payload;
}

export const SET_SUBSCRIBER = (state, payload) => {
    state.subscriber = payload;
}


export const ADD_SUBSCRIBER = (state, payload) => {
    state.subscribers.push(payload);
}

export const ADD_SUBSCRIBER_EPISODE = (state, payload) => {
    state.subscriber.episodes.push(payload);
    console.log('EPISODES NOW IS ', state.subscriber.episodes);
    console.log(state.subscriber);
}

export const DELETE_SUBSCRIPTION = (state) => {
    console.log('REMOVED SUBSCRPTION');
    state.subscriber.subscriptions = [];
}

// export const UPDATE_SUBSCRIBER_SUBSCRIPTION = (state, data) => {
//     console.log(state);
//     console.log(data);
// }
