import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { handleTodoStatusChange } from '../../action-creators/todos';
import { handleCategoryStatusChange } from '../../action-creators/categories';
import { changeSearchName, changeSearchStatus, clearSearchName } from '../../action-creators/search';
import { clearError } from '../../action-creators/common';
import TodoList from './../../components/to-do-list/to-do-list';
import Search from './../../components/search/search';
import CreateTodo from './../../containers/create-todo/create-todo';
import getVisibleTodos from  './../../selectors/to-do-selectors';
import * as styles from './todos.scss';

export const Todos = ({ params, categories, todos, search, changeSearchName, changeSearchStatus, clearSearchName, clearError, handleTodoStatusChange, handleCategoryStatusChange }) => {
    const category = categories.byId[params.category];

    return (
        <div className={styles.container}>
            {category ?
                    <div>
                        <Search params={params}
                                searchParams={search}
                                changeSearchName={changeSearchName}
                                changeSearchStatus={changeSearchStatus}
                                clearSearchName={clearSearchName}
                                clearError={clearError}/>
                        <CreateTodo params={params}/>
                    </div> : null}

            <TodoList params={params}
                      categories={categories}
                      todos={todos}
                      handleTodoStatusChange={handleTodoStatusChange}
                      handleCategoryStatusChange={handleCategoryStatusChange}/>
        </div>
    )
};

const mapStateToProps = (state, props) => ({
    categories: state.categories,
    todos: getVisibleTodos(state, props),
    search: state.search
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleTodoStatusChange,
    handleCategoryStatusChange,
    changeSearchName,
    changeSearchStatus,
    clearSearchName,
    clearError
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
