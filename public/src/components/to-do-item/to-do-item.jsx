import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as styles from './to-do-item.scss';

const ToDoItem = ({ id, categoryId, name, isCompleted, onChange }) => (
    <div className={ styles.container }>
        <input id={id} type='checkbox' className={styles.input} checked={isCompleted} onChange={() => {
            onChange(id);
        }}/>
        <label htmlFor={id} className={styles.label}/>
        <label className={styles.label}>
            {name}
        </label>
        <Link to={categoryId + '/' + id}>
            <button type='button' className={styles.edit}/>
        </Link>
    </div>
);

ToDoItem.propTypes = {
    id: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default ToDoItem;