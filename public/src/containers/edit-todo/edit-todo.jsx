import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { editTodo, handleCategoryStatusChange, handleChooseNewCategory, handleTodoErrors, clearError } from '../../action-creators/index.js';
import TodoDetails from './../../components/to-do-details/to-do-details.jsx';

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
