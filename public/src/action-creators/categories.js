import uuidv4 from 'uuid/v4';

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

export const removeCategory = (id, categories) => ({
    type: 'REMOVE_CATEGORY',
    id,
    categories
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

export const handleCategoryInputChange = () => ({
    type: 'INPUT_CHANGE'
});