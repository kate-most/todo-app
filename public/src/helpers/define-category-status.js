export const getNumberOfCompletedTodos = (action, categoryTodosIds) => {
    let numberOfCompletedTodos = 0;

    categoryTodosIds.forEach((id) => {
        if (action.todos.byId[id].isCompleted) {
            ++numberOfCompletedTodos;
        }
    });

    return numberOfCompletedTodos;
};

export const defineCurrentCategoryStatus = (action, state) => {
    const categoryTodosIds = state.byId[action.categoryId].todos;
    const categoryTodosLength = categoryTodosIds.length;

    if (action.editing) {
        return categoryTodosLength ? (
            ((getNumberOfCompletedTodos(action, categoryTodosIds) === categoryTodosLength) && action.newStatus) ||
            ((getNumberOfCompletedTodos(action, categoryTodosIds) === categoryTodosLength - 1) && action.newStatus && !action.todos.byId[action.targetTodoId].isCompleted)
        ) : true;
    } else {
        return ((getNumberOfCompletedTodos(action, categoryTodosIds) === categoryTodosLength - 1) && !action.todos.byId[action.targetTodoId].isCompleted);
    }
};

export const defineNewCategoryStatus = (action, state) => {
    const categoryTodosIds = state.byId[action.todos.ui.newCategory].todos;
    const categoryTodosLength = categoryTodosIds.length;
    const todoStatus = action.newStatus;

    return categoryTodosLength ? ((state.byId[action.todos.ui.newCategory].isCompleted === true) && todoStatus) : todoStatus;
};