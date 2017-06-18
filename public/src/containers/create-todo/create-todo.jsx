import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTodo, handleTodoErrors } from '../../action-creators/todos';
import { clearError } from '../../action-creators/common';
import * as styles from './create-todo.scss';

export const CreateTodo = ({ params, addTodo, handleTodoErrors, clearError }) => {
    let textInput;

    return (
        <form className={styles.form}
              onSubmit={event => {
                  event.preventDefault();

                  if (textInput && textInput.value) {
                      addTodo(textInput.value, params.category);
                  } else {
                      handleTodoErrors('This is an empty todo name!');
                  }

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