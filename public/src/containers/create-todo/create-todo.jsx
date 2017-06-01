import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodo, handleTodoErrors, clearError } from '../../action-creators/index.js';
import * as styles from './create-todo.scss';

let CreateTodo = ({ params, addTodo, handleTodoErrors, clearError }) => {
    let textInput;

    const checkTodoName = (value) => {
        if (value) {
            addTodo(value, params.category);
        } else {
            handleTodoErrors('This is an empty todo name!');
        }
    };

    return (
        <form className={styles.form}
              onSubmit={event => {
                  event.preventDefault();

                  checkTodoName(textInput.value);

                  textInput.value = '';
              }}>
            <input type='text'
                   placeholder='Type new todo name'
                   defaultValue=''
                   ref={input => {
                       textInput = input
                   }}
                   className={styles.input} onChange={() => {
                        clearError();
                   }}/>

            <button type='submit' className={styles.button}>Add</button>
        </form>
    )
};

const mapStateToProps = (state) => ({
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addTodo,
    handleTodoErrors,
    clearError
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo);