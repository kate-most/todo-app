import { omit } from 'lodash';

const updateLocalStorage = (store) => {
    let state = store.getState();

    const data = Object.keys(state).reduce((result, key) => {
        result[key] = omit(state[key], ['ui']);

        return result;
    }, {});

    localStorage.setItem('items', JSON.stringify(data));
};

export default updateLocalStorage;
