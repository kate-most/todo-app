import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { editTodo, handleTodoErrors } from '../../action-creators/todos';
import { handleCategoryStatusChange, handleChooseNewCategory } from '../../action-creators/categories';
import { clearError } from '../../action-creators/common';
import TodoDetails from './../../components/to-do-details/to-do-details';

const EditTodo = ({ params, todos, categories, editTodo, handleChooseNewCategory, handleCategoryStatusChange,handleTodoErrors, clearError, handleCategoryCompleteness }) => (
    <TodoDetails params={params}
                 todos={todos}
                 categories={categories}
                 editTodo={editTodo}
                 handleCategoryStatusChange={handleCategoryStatusChange}
                 handleChooseNewCategory={handleChooseNewCategory}
                 handleTodoErrors={handleTodoErrors}
                 clearError={clearError}/>
);

const mapStateToProps = (state) => ({
    categories: state.categories,
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    editTodo,
    handleCategoryStatusChange,
    handleChooseNewCategory,
    handleTodoErrors,
    clearError
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
