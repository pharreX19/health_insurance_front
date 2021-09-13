// import {checkResponse, get, patch, post, remove} from '../../../services/api';
// import * as mutation_types from './mutation_types';

// export const get_companies = ({commit}, showLoader = true) => {
//     get('companies', {showLoader: showLoader}).then(checkResponse).then((response)=>{
//         console.log(response)
//         commit(mutation_types.SET_COMPANIES, response.data.data);
//     }).catch((error) => {console.log(error)});
// }

// export const create_company = ({commit}, payload) => {
//     post('companies', payload).then(checkResponse).then((response)=>{
//         commit(mutation_types.ADD_COMPANY, response.data.data);
//     }).catch((error) => {console.log(error)});
// }

// export const update_company = ({commit}, payload) => {
//     patch(`companies/${payload.id}`, payload).then(checkResponse).then((response)=>{
//         commit(mutation_types.UPDATE_COMPANY, response.data.data);
//     }).catch((error) => {console.log(error)});
// }

// export const delete_company = ({commit}, id) => {
//     remove(`companies/${id}`).then(checkResponse).then(()=>{
//         commit(mutation_types.REMOVE_COMPANY, id);
//     }).catch((error) => {console.log(error)});
// }

// export const search_company = ({commit}, registration) => {
//     get(`companies/search/${registration}`,  {showLoader: false}).then(checkResponse).then((response)=>{
//         commit(mutation_types.SET_COMPANIES, response.data.data);
//     }).catch((error) => {console.log(error)});
// }