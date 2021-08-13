import {state as subscription_state} from './state';

export const subscriptions = () => {
    return subscription_state.subscriptions;
}

export const subscription = () => {
    return subscription_state.subscription;
}