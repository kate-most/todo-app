import { createSelector } from 'reselect';

const getTodos = (state) => state.todos;

const getProps = (state, props) => props;
const getCategoryTodos = (state, props) => {
    return state.categories.byId[props.params.category] ? state.categories.byId[props.params.category].todos : []
};

const filterByStatus = createSelector(
    [getTodos, getCategoryTodos, getProps],
    (todos, categoryTodos, props) => {
        const queryStatus = props.location.query.completed;

        if (queryStatus === 'true') {
            return categoryTodos.filter((id) => (todos.byId[id].isCompleted))
        } else {
            return categoryTodos;
        }
    }
);

const filterByName = createSelector(
    [getTodos, filterByStatus, getProps],
    (todos, filteredTodos, props) => {
        const queryName = props.location.query.name;

        if (queryName) {
            return filteredTodos.filter((id) => (todos.byId[id].name.search(queryName) >= 0))
        } else {
            return filteredTodos;
        }
    }
);

const getVisibleTodos = createSelector(
    [getTodos, getCategoryTodos, filterByName],
    (todos, categoryTodos, filteredTodos) => {
        let visibleTodos = {
            ids: [],
            byId: {},
            ui: {
                error: null,
                newCategory: ''
            }
        };

        filteredTodos.forEach(function(item) {
            visibleTodos.ids.push(item);
            visibleTodos.byId[item] = todos.byId[item];
        });

        return visibleTodos;
    }
);

export default getVisibleTodos;