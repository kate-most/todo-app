import { omit, without, find } from 'lodash';

const categories = (state = {}, action) => {

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
            return {
                ...state,
                ids: without(state.ids, ...action.removeIds),
                byId: omit({
                    ...state.byId,
                    ...action.parentId && {
                        [action.parentId]: {
                            ...state.byId[action.parentId],
                            children: without(state.byId[action.parentId].children, action.id)
                        }
                    }
                }, ...action.removeIds),
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
            const getNumberOfCompletedTodos = (categoryTodosIds) => {
                let numberOfCompletedTodos = 0;

                categoryTodosIds.forEach((id) => {
                    if (action.todos.byId[id].isCompleted) {
                        ++numberOfCompletedTodos;
                    }
                });

                return numberOfCompletedTodos;
            };

            const defineCurrentCategoryStatus = () => {
                const categoryTodosIds = state.byId[action.categoryId].todos;
                const categoryTodosLength = categoryTodosIds.length;

                if (action.editing) {
                    return categoryTodosLength ? (
                        ((getNumberOfCompletedTodos(categoryTodosIds) === categoryTodosLength) && action.newStatus) ||
                        ((getNumberOfCompletedTodos(categoryTodosIds) === categoryTodosLength - 1) && action.newStatus && !action.todos.byId[action.targetTodoId].isCompleted)
                    ) : true;
                } else {
                    return ((getNumberOfCompletedTodos(categoryTodosIds) === categoryTodosLength - 1) && !action.todos.byId[action.targetTodoId].isCompleted);
                }
            };

            const defineNewCategoryStatus = () => {
                const categoryTodosIds = state.byId[action.todos.ui.newCategory].todos;
                const categoryTodosLength = categoryTodosIds.length;
                const todoStatus = action.newStatus;

                return categoryTodosLength ? ((state.byId[action.todos.ui.newCategory].isCompleted === true) && todoStatus) : todoStatus;
            };

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.categoryId]: {
                        ...state.byId[action.categoryId],
                        isCompleted: defineCurrentCategoryStatus()
                    },
                    ...action.todos.ui.newCategory && {
                        [action.todos.ui.newCategory]: {
                            ...state.byId[action.todos.ui.newCategory],
                            isCompleted: defineNewCategoryStatus()
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
                            ...state.byId[action.oldCategory],
                            todos: without(state.byId[action.oldCategory].todos, action.id)
                        },
                        [state.ui.newCategory]: {
                            ...state.byId[state.ui.newCategory],
                            todos: state.byId[state.ui.newCategory].todos ? [...state.byId[state.ui.newCategory].todos, action.id] : [action.id]
                        }
                    } : {
                        ...state.byId
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