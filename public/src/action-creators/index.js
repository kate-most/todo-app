import uuidv4 from 'uuid/v4'

export const addCategory = (value, parentId) => {
    const id = uuidv4();

    return ({
        type: 'ADD_CATEGORY',
        value,
        parentId,
        id
    })
};

export const editCategory = (value, id) => ({
    type: 'EDIT_CATEGORY',
    value,
    id
});

export const removeCategory = (id, parentId = null, removeIds, removeTodos) => ({
    type: 'REMOVE_CATEGORY',
    id,
    parentId,
    removeIds,
    removeTodos
});

export const toggleCategory = (id) => ({
    type: 'TOGGLE_CATEGORY',
    id
});

export const handleCategoryStatusChange = (categoryId, targetTodoId, todos, newStatus, editing = false) => ({
    type: 'CHANGE_CATEGORY_STATUS',
    categoryId,
    targetTodoId,
    todos,
    newStatus,
    editing
});

export const handleChooseNewCategory = (id = '') => ({
    type: 'CHOOSE_NEW_CATEGORY',
    id
});

export const handleCategoryErrors = (message = '') => ({
    type: 'SHOW_CATEGORY_ERROR',
    message
});

export const openModal = (id, editing) => ({
    type: 'OPEN_MODAL',
    id,
    editing
});

export const closeModal = () => ({
    type: 'CLOSE_MODAL'
});

export const addTodo = (value, categoryId) => {
    const id = uuidv4();

    return ({
        type: 'ADD_TODO',
        value,
        categoryId,
        id
    })
};

export const editTodo = (id, name, status, details, oldCategory) => ({
    type: 'EDIT_TODO',
    id,
    name,
    status,
    details,
    oldCategory
});

export const handleTodoStatusChange = (id) => ({
    type: 'CHANGE_TODO_STATUS',
    id
});

export const handleTodoErrors = (message = '') => ({
    type: 'SHOW_TODO_ERROR',
    message
});

export const clearError = () => ({
    type: 'CLEAR_ERROR'
});

export const handleCategoryInputChange = () => ({
    type: 'INPUT_CHANGE'
});

export const changeSearchName = (name) => ({
    type: 'CHANGE_SEARCH_NAME',
    name
});

export const changeSearchStatus = (status) => ({
    type: 'CHANGE_SEARCH_STATUS',
    status
});

export const clearSearchName = () => ({
    type: 'CLEAR_SEARCH_NAME'
});

export const handleRouteChange = () => ({
    type: 'HANDLE_ROUTE_CHANGE'
});