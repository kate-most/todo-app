const getAllTodos = (deepChildren, categories) => {
    let todos = [];

    deepChildren.forEach((id) => {
        todos.push(...categories.byId[id].todos);
    });

    return todos;
};

export default getAllTodos;