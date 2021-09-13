import {
    checkResponse,
    get,
    patch,
    post,
    remove
} from '../services/api';


const SET_MODELS = 'SET_MODELS';
const SET_MODEL = 'SET_MODEL';
const ADD_MODEL = 'ADD_MODEL';
const UPDATE_MODEL = 'UPDATE_MODEL';
const REMOVE_MODEL = 'REMOVE_MODEL';

export const actions = {
    get_models({
        commit
    }, url, showLoader = true) {
        return new Promise((resolve, reject) => {
            get(url, {
                showLoader: showLoader
            }).then(checkResponse).then((response) => {
                commit(SET_MODELS, response.data.data);
                resolve(response);
            }).catch((error) => {
                console.log(error)
                reject(error);
            });
        })
    },

    get_model({
        commit
    }, url, showLoader = true) {
        return new Promise((resolve, reject) => {
            get(url, {
                showLoader: showLoader
            }).then(checkResponse).then((response) => {
                commit(SET_MODEL, response.data.data);
                resolve(response);
            }).catch((error) => {
                console.log(error)
                reject(error);
            });
        })
    },

    create_model({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            post(payload.url, payload.data).then(checkResponse).then((response) => {
                commit(ADD_MODEL, response.data.data);
                resolve(response);
            }).catch((error) => {
                console.log(error)
                reject(error);
            });
        })
    },

    update_model({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            patch(`${payload.url}/${payload.data.id}`, payload.data).then(checkResponse).then((response) => {
                commit(UPDATE_MODEL, response.data.data);
                resolve(response);
            }).catch((error) => {
                console.log(error)
                reject(error);
            });
        })
    },

    delete_model({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            remove(`${payload.url}/${payload.id}`).then(checkResponse).then(() => {
                commit(REMOVE_MODEL, payload.id);
                resolve(payload.id);
            }).catch((error) => {
                console.log(error)
                reject(error);
            });
        })
    },

    search_model({
        commit
    }, payload) {
        return new Promise((resolve, reject) => {
            get(`${payload.url}/${payload.data}`, {
                showLoader: false
            }).then(checkResponse).then((response) => {
                commit(SET_MODEL, response.data.data);
                resolve(response);
            }).catch((error) => {
                console.log(error)
                reject(error);
            });
        })
    }
}

export const getters = {
    models(state) {
        return state.models;
    },
    model(state) {
        return state.model;
    }
};

export const mutations = {
    SET_MODELS(state, data) {
        state.models = data;
    },

    SET_MODEL(state, data) {
        state.model = data;
    },

    ADD_MODEL(state, data) {
        state.models.unshift(data);
    },

    UPDATE_MODEL(state, data) {
        state.models.map((model) => {
            if (model.id === data.id) {
                model = data;
            }
        })
    },

    REMOVE_MODEL(state, id) {
        let temp = state.models.filter((model) => {
            return model.id != id;
        })
        state.models = temp;
    }
};

export const state = {
    models: [],
    model: {}
}