import { omit, without } from 'lodash';
import getDeepChildren from '../helpers/get-deep-children';
import getAllTodos from '../helpers/get-all-todos'

const todos = (state = {
    ids: [],
    byId: {},
    ui: {
        error: null,
        newCategory: ''
    }
}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                ids: [...state.ids, action.id],
                byId: {
                    ...state.byId,
                    [action.id]: {
                        name: action.value,
                        category: action.categoryId,
                        details: 'This is a new category',
                        isCompleted: false
                    }
                },
                ui: {
                    error: null,
                    newCategory: ''
                }
            };
        case 'SHOW_TODO_ERROR':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    error: action.message
                }
            };
        case 'CHANGE_TODO_STATUS':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        isCompleted: !state.byId[action.id].isCompleted
                    }
                },
                ui: {
                    ...state.ui,
                    error: null
                }
            };
        case 'CHOOSE_NEW_CATEGORY':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    newCategory: action.id,
                    error: null
                }
            };
        case 'REMOVE_CATEGORY':
            const removeTodos = getAllTodos(getDeepChildren(action.categories, action.id, action.categories.byId[action.id]), action.categories);

            return {
                ...state,
                ids: without(state.ids, ...removeTodos),
                byId: omit({
                    ...state.byId,
                }, removeTodos),
                ui: {
                    ...state.ui,
                    error: null
                }
            };
        case 'EDIT_TODO':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        name: action.editedTodo.name,
                        category: state.ui.newCategory ? state.ui.newCategory : state.byId[action.id].category,
                        details: action.editedTodo.details,
                        isCompleted: action.editedTodo.status
                    }
                },
                ui: {
                    ...state.ui,
                    error: null,
                    newCategory: ''
                }
            };
        case 'OPEN_MODAL':
        case 'HANDLE_ROUTE_CHANGE':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    error: null,
                    newCategory: ''
                }
            };
        case 'INPUT_CHANGE':
        case 'SHOW_CATEGORY_ERROR':
        case 'CLEAR_ERROR':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    error: null
                }
            };
        default:
            return state;
    }
};

export default todos;