import {checkResponse, get} from '../../../services/api';
import * as mutation_types from './mutation_types';

export const get_countries = ({commit}) => {
    get('countries', {showLoader: false}).then(checkResponse).then((response)=>{
        commit(mutation_types.SET_COUNTRIES, response.data.data);
    }).catch((error) => {console.log(error)});
}