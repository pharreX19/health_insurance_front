import {checkResponse, get, patch, post, remove} from '../../../services/api';


const SET_SERVICE_LIMIT_GROUPS  = 'SET_SERVICE_LIMIT_GROUPS';
const ADD_SERVICE_LIMIT_GROUPS  = 'ADD_SERVICE_LIMIT_GROUPS';
const UPDATE_SERVICE_LIMIT_GROUP = 'UPDATE_SERVICE_LIMIT_GROUP';
const REMOVE_SERVICE_LIMIT_GROUP  = 'REMOVE_SERVICE_LIMIT_GROUP';


export const serviceLimitGroup = {
    namespaced: true, 
    actions:{
         get_service_limit_groups({commit}, showLoader = true){
            get('service-limit-groups', {showLoader: showLoader}).then(checkResponse).then((response)=>{
                commit(SET_SERVICE_LIMIT_GROUPS, response.data.data);
            }).catch((error) => {console.log(error)});
        },

        create_service_limit_group({commit}, payload){
            post('service-limit-groups', payload).then(checkResponse).then((response)=>{
                commit(ADD_SERVICE_LIMIT_GROUPS, response.data.data);
            }).catch((error) => {console.log(error)});
        },

        update_service_limit_group({commit}, payload){
            patch(`service-limit-groups/${payload.id}`, payload).then(checkResponse).then((response)=>{
                commit(UPDATE_SERVICE_LIMIT_GROUP, response.data.data);
            }).catch((error) => {console.log(error)});
        },

        delete_service_limit_group({commit}, id){
            remove(`service-limit-groups/${id}`,).then(checkResponse).then(()=>{
                commit(REMOVE_SERVICE_LIMIT_GROUP,id);
            }).catch((error) => {console.log(error)});
        }
    },
    getters: {
         serviceLimitGroups(state){
            return state.service_limit_groups;
        },
        serviceLimitGroup(state){
            return state.service_limit_group;
        },
    },
    mutations: {
        SET_SERVICE_LIMIT_GROUP(state, data){
            state.service_limit_group = data;
        },

        SET_SERVICE_LIMIT_GROUPS(state, data){
            state.service_limit_groups = data;
        },

        ADD_SERVICE_LIMIT_GROUPS(state, data){
            state.service_limit_groups.push(data);
        },

        UPDATE_SERVICE_LIMIT_GROUP(state, data){
            state.service_limit_groups.map((service) => {
                if(service.id === data.id){
                    service = data;
                }
            })
        },

        REMOVE_SERVICE_LIMIT_GROUP(state, id){
            let temp = state.service_limit_groups.filter((limitGroup) => {
                return limitGroup.id != id;
            })
            state.service_limit_groups = temp;
        }
    },
    state: {
        service_limit_groups: [],
        service_limit_group: {}
    }
} 