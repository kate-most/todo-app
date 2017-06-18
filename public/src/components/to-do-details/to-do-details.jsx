import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './to-do-details.scss';

const TodoDetails = ({ params, categories, todos, editTodo, handleChooseNewCategory, handleCategoryStatusChange, handleTodoErrors, clearError }) => {
    const id = params.todo;
    const categoryId = params.category;
    const todo = todos.byId[id];
    const newCategory = todos.ui ? todos.ui.newCategory : false;

    let name;
    let status;
    let details;

    if (!todo) {
        return <h1>There is no task with this id</h1>;
    }

    return (
        <form className={styles.form}
              onSubmit={event => {
                  event.preventDefault();

                  if (name && name.value) {
                      const editedTodo = {
                          name: name.value,
                          status: status.checked,
                          details: details.value,
                          category: categoryId
                      };

                      editTodo(id, editedTodo);
                      handleCategoryStatusChange(categoryId, id, todos, editedTodo.status, true);
                      history.back();
                  } else {
                      handleTodoErrors('This is an empty todo name!');
                  }
              }}>

            {
                newCategory && (newCategory !== todo.category)  ?
                <div className={styles.message}>
                    You will move the task to category <span className={styles.messageCategoryName}>{categories.byId[newCategory].name}</span>
                </div> :
                null
            }

            <div className={styles.content}>
                <input type='text'
                       className={styles.input}
                       defaultValue={todo.name}
                       ref={(input) => {name = input}}
                       onChange={() => {clearError()}}/>

                <div className={styles.checkboxWrap}>
                    <input type='checkbox'
                           id='change-status'
                           className={styles.checkbox}
                           defaultChecked={todo.isCompleted}
                           ref={(input) => {status = input}}
                           onChange={() => {clearError()}}/>
                    <label htmlFor='change-status'
                           className={styles.label}/>
                    <div>Done</div>
                </div>

                <textarea cols='50'
                          rows='10'
                          defaultValue={todo.details}
                          className={styles.textarea}
                          ref={(input) => {details = input}}
                          onChange={() => {clearError()}}/>
            </div>

            <div className={styles.actions}>
                <button type='submit' className={styles.button}>Save Changes</button>
                <button type='reset'
                        className={styles.button}
                        onClick={() => {
                            history.back();
                            handleChooseNewCategory();
                        }}>Cancel</button>
            </div>
        </form>
    )
};

TodoDetails.propTypes = {
    params: PropTypes.shape({
        category: PropTypes.string.isRequired,
        todo: PropTypes.string.isRequired
    }),
    categories: PropTypes.shape({
        ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        byId: PropTypes.objectOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            parentId: PropTypes.string,
            children: PropTypes.arrayOf(PropTypes.string).isRequired,
            isCompleted: PropTypes.bool.isRequired,
            isCollapsed: PropTypes.bool.isRequired,
            todos: PropTypes.array.isRequired
        }).isRequired).isRequired,
        ui: PropTypes.shape({
            editing: PropTypes.bool,
            modalIsOpen: PropTypes.bool,
            currentCategoryId: PropTypes.string,
            error: PropTypes.string
        })
    }).isRequired,
    todos: PropTypes.shape({
        ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        byId: PropTypes.objectOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            details: PropTypes.string.isRequired,
            isCompleted: PropTypes.bool.isRequired
        }).isRequired).isRequired,
        ui: PropTypes.shape({
            error: PropTypes.string,
            newCategory: PropTypes.string
        })
    }).isRequired,
    editTodo: PropTypes.func.isRequired,
    handleChooseNewCategory: PropTypes.func.isRequired,
    handleCategoryStatusChange: PropTypes.func.isRequired,
    handleTodoErrors: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired
};

export default TodoDetails;