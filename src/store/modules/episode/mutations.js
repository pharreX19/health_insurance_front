
export const SET_EPISODES = (state, payload) => {
    state.episodes = payload;
}

export const SET_EPISODE = (state, payload) => {
    state.episode = payload;
}

export const ADD_EPISODE = (state, payload) => {
    state.episodes.push(payload);
}
