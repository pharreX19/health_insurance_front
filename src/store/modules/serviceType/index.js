import {checkResponse, get} from '../../../services/api';


const SET_SERVICE_TYPES  = 'SET_SERVICE_TYPES';


export const serviceType = {
    namespaced: true, 
    actions:{
         get_service_types({commit}){
            get('service-types', {showLoader: false}).then(checkResponse).then((response)=>{
                commit(SET_SERVICE_TYPES, response.data.data);
            }).catch((error) => {console.log(error)});
        }
    },
    getters: {
         serviceTypes(state){
            return state.service_types;
        },
    },
    mutations: {
        SET_SERVICE_TYPES(state, data){
            state.service_types = data;
        }
    },
    state: {
        service_types: [],
    }
} 