import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as styles from './to-do-item.scss';

const TodoItem = ({ id, todos, categoryId, handleTodoStatusChange, handleCategoryStatusChange }) => {
    const currentTodo = todos.byId[id];

    return (
        <div className={styles.container}>
            <input id={id} type='checkbox' className={styles.input} checked={currentTodo.isCompleted} onChange={(event) => {
                handleTodoStatusChange(id);
                handleCategoryStatusChange(categoryId, event.target.id, todos);
            }}/>
            <label htmlFor={id} className={styles.label}/>
            <label className={styles.name}>
                {currentTodo.name}
            </label>
            <Link to={categoryId + '/' + id}>
                <button type='button' className={styles.edit}/>
            </Link>
        </div>
    )
};

TodoItem.propTypes = {
    id: PropTypes.string.isRequired,
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
    categoryId: PropTypes.string.isRequired,
    handleTodoStatusChange: PropTypes.func.isRequired,
    handleCategoryStatusChange: PropTypes.func.isRequired
};

export default TodoItem;