import uuidv4 from 'uuid/v4';

export const addTodo = (value, categoryId) => {
    const id = uuidv4();

    return ({
        type: 'ADD_TODO',
        value,
        categoryId,
        id
    })
};

export const editTodo = (id, editedTodo) => ({
    type: 'EDIT_TODO',
    id,
    editedTodo
});

export const handleTodoStatusChange = (id) => ({
    type: 'CHANGE_TODO_STATUS',
    id
});

export const handleTodoErrors = (message = '') => ({
    type: 'SHOW_TODO_ERROR',
    message
});