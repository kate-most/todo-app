import { combineReducers } from 'redux';
import categories from './categories.js';
import todos from './todos.js';
import search from './search.js';

const todoApp = combineReducers({
    categories,
    todos,
    search
});

export default todoApp;