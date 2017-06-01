import React, { PropTypes } from 'react';
import TodoItem from './../to-do-item/to-do-item.jsx';
import * as styles from './to-do-list.scss';

const TodoList = ({ params, categories, todos, handleTodoStatusChange, handleCategoryStatusChange }) => {
    const category = categories.byId[params.category];

    return (
        <section className={styles.container}>
            {category ?
            <div>
                {todos.ids.length ?
                    <ul className={styles.list}>
                        {
                            todos.ids.map((id) => {
                                return (
                                    <TodoItem key={id}
                                              id={id}
                                              todos={todos}
                                              categoryId={params.category}
                                              handleTodoStatusChange={handleTodoStatusChange}
                                              handleCategoryStatusChange={handleCategoryStatusChange}/>
                                )
                            })
                        }
                    </ul> :
                    <h3>There are no tasks</h3>
                }
            </div> :
            <h1>There is no category with this id</h1>}
        </section>
    )
};

TodoList.propTypes = {
    params: PropTypes.shape({
        category: PropTypes.string.isRequired
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
    handleTodoStatusChange: PropTypes.func.isRequired,
    handleCategoryStatusChange: PropTypes.func.isRequired
};

export default TodoList;