import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {service} from './modules/service';
import {company} from './modules/company';
import {country} from './modules/country';
import {subscriber} from './modules/subscriber';
import {policy} from './modules/policy';
import {subscription} from './modules/subscription';
import {episode} from './modules/episode';
import {episode_service} from './modules/episode_service';
import {calculation_type} from './modules/calculation_type';
import {service_provider} from './modules/service_providers'
import {serviceLimitGroup} from './modules/serviceLimitGroup'
import {serviceType} from './modules/serviceType'
import {role_permission} from './modules/roles_permissions'; 
import { router } from '../router/router';
import createPersistedState from "vuex-persistedstate";


export const store = new Vuex.Store({
    plugins: [createPersistedState({
        paths: ['user']
    })],
    state: {
        user: {},
        loading: false,
        snackbar : {
            show: false,
            message: null,
            color: null,
        },
        requestsPending: 0
    },
    
    actions: {
        pending : () => {
            store.commit('pending');
        },
        show() {
            store.commit('show_loading');
        },
        hide() {
            store.commit('hide_loading');
        },
        done() {
            store.commit('done');
        },
        show_snackbar(_ ,data){
            store.commit('showSnackbar', data)
        },
    },

    mutations: {
        set_user(state, data){
            localStorage.setItem('token', data.access_token)
            console.log('SERVICE PROVIDER IS', data.service_provider);
            state.user = {...data.user, serviceProviderId: data.service_provider
            };
        },
        clear_user(state){
            localStorage.removeItem('token');
            state.user = null;
            router.push({name: 'login'});
        },

        show(state) {
            state.loading = true;
        },

        pending: (state) => {
            if (state.requestsPending === 0) {
                store.commit('loading')
            }
        
            state.requestsPending++;
        },

        loading : (state) => {
            state.loading = true;
        },

        hide_loading : (state) => {
            state.loading = false;
        },

        done : (state) => {
            if (state.requestsPending >= 1) {
                state.requestsPending--;
            }
        
            if (state.requestsPending <= 0) {
                store.commit('hide_loading');
            }
        },
        showSnackbar: (state, data) => {
            state.snackbar.show = true;
            setTimeout(()=>{state.snackbar.show = false}, 3000);
            if(data.type === 'success'){

                state.snackbar.message = data.msg;
                state.snackbar.color = "success"
                state.snackbar.icon = "mdi-check"
            }else{
                state.snackbar.message = data.msg;
                state.snackbar.color = "red darken-2"
            }
        }
    },

    modules: {
        service,
        company,
        country,
        subscriber,
        policy,
        subscription,
        episode,
        episode_service,
        calculation_type,
        service_provider,
        serviceLimitGroup,
        serviceType,
        role_permission
    }
})

