import { omit, without } from 'lodash';
import { defineCurrentCategoryStatus, defineNewCategoryStatus } from '../helpers/define-category-status';
import getDeepChildren from '../helpers/get-deep-children';

const categories = (state = {
    ids: [],
    byId: {},
    ui: {
        modalIsOpen: false,
        currentCategoryId: null,
        editing: false,
        error: null,
        newCategory: ''
    }
}, action) => {

    switch (action.type) {
        case 'ADD_CATEGORY':
            return {
                ...state,
                ids: [action.id, ...state.ids],
                byId: {
                    [action.id]: {
                        name: action.value,
                        id: action.id,
                        parentId: action.parentId,
                        children: [],
                        todos: [],
                        isCompleted: true,
                        isCollapsed: true
                    },
                    ...state.byId,
                    ...action.parentId && {
                        [action.parentId]: {
                            ...state.byId[action.parentId],
                            children: [action.id, ...state.byId[action.parentId].children]
                        }
                    }
                },
                ui: {
                    ...state.ui,
                    modalIsOpen: false,
                    currentCategoryId: null,
                    error: null
                }
            };
        case 'EDIT_CATEGORY':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        name: action.value
                    }
                },
                ui: {
                    ...state.ui,
                    modalIsOpen: false,
                    currentCategoryId: null,
                    editing: false,
                    error: null
                }
            };
        case 'REMOVE_CATEGORY':
            const currentCategory = action.categories.byId[action.id];
            const parentId = currentCategory.parentId;
            const removeIds = getDeepChildren(action.categories, action.id, currentCategory);

            return {
                ...state,
                ids: without(state.ids, ...removeIds),
                byId: omit({
                    ...state.byId,
                    ...parentId && {
                        [parentId]: {
                            ...state.byId[parentId],
                            children: without(state.byId[parentId].children, action.id)
                        }
                    }
                }, ...removeIds),
                ui: {
                    ...state.ui,
                    error: null,
                    currentCategoryId: null
                }
            };
        case 'TOGGLE_CATEGORY':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        isCollapsed: !state.byId[action.id].isCollapsed
                    }
                }
            };
        case 'CHANGE_CATEGORY_STATUS':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.categoryId]: {
                        ...state.byId[action.categoryId],
                        isCompleted: defineCurrentCategoryStatus(action, state)
                    },
                    ...action.todos.ui.newCategory && {
                        [action.todos.ui.newCategory]: {
                            ...state.byId[action.todos.ui.newCategory],
                            isCompleted: defineNewCategoryStatus(action, state)
                        }
                    }
                },
                ui: {
                    ...state.ui,
                    error: null
                }
            };
        case 'OPEN_MODAL':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    modalIsOpen: true,
                    currentCategoryId: action.id,
                    editing: action.editing,
                    error: null
                }
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    modalIsOpen: false,
                    currentCategoryId: null,
                    editing: false,
                    error: null
                }
            };
        case 'SHOW_CATEGORY_ERROR':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    error: action.message
                }
            };
        case 'ADD_TODO':
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.categoryId]: {
                        ...state.byId[action.categoryId],
                        todos: state.byId[action.categoryId].todos.length ? [action.id, ...state.byId[action.categoryId].todos] : [action.id],
                        isCompleted: false
                    }
                }
            };
        case 'EDIT_TODO':
            return {
                ...state,
                byId: state.ui.newCategory ?
                    {
                        ...state.byId,
                        [action.oldCategory]: {
                            ...state.byId[action.editedTodo.category],
                            todos: without(state.byId[action.editedTodo.category].todos, action.id)
                        },
                        [state.ui.newCategory]: {
                            ...state.byId[state.ui.newCategory],
                            todos: state.byId[state.ui.newCategory].todos ? [...state.byId[state.ui.newCategory].todos, action.id] : [action.id]
                        }
                    } : {
                        ...state.byId
                    },
                ui: {
                    ...state.ui,
                    newCategory: ''
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
        case 'SHOW_TODO_ERROR':
        case 'CLEAR_ERROR':
        case 'INPUT_CHANGE':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    error: null
                }
            };
        case 'HANDLE_ROUTE_CHANGE':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    modalIsOpen: false,
                    error: null
                }
            };
        default:
            return state;
    }
};

export default categories;