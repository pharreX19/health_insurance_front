import {state as subscriber_state} from './state';

export const subscribers = () => {
    return subscriber_state.subscribers;
}

export const subscriber = () => {
    return subscriber_state.subscriber;
}