import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Toggler from './../toggler/toggler';
import CategoriesList from './../categories-list/categories-list';
import * as styles from './category.scss';

const Category = ({ params, id, categories, todos, toggleCategory, removeCategory, openModal, handleChooseNewCategory }) => {
    const currentCategory = categories.byId[id];
    const isTodoEditing = params.todo && todos.byId[params.todo];

    return (
        <li className={styles.container}>
            <div className={styles.inner}>
                {
                    currentCategory.children.length ?
                    <Toggler id={id} isCollapsed={currentCategory.isCollapsed} toggleCategory={toggleCategory}/> :
                    null
                }

                <h4 className={styles.title}>
                    <Link to={`/${id}`}
                          className={styles.titleLink}
                          activeClassName={styles.titleLinkActive}>{currentCategory.name}</Link>
                </h4>
                {
                    isTodoEditing && (params.category !== currentCategory.id) ? <button type='button' title='move' className={styles.buttonMove} onClick={() => {handleChooseNewCategory(id)}}/> :
                    isTodoEditing ? null :
                        <div className={styles.buttonsList}>
                            <button type='button' title='edit' className={styles.buttonEdit} onClick={() => {openModal(id, true)}}/>
                            <button type='button' title='remove' className={styles.buttonRemove} onClick={() => {
                                if (confirm('Delete the category ' + currentCategory.name + '?')) {
                                    removeCategory(id, categories);
                                }
                            }}/>
                            <button type='button' title='create child' className={styles.buttonCreate} onClick={() => {openModal(id)}}/>
                        </div>
                }
            </div>

            {currentCategory.children.length && !currentCategory.isCollapsed ?
                <div className={styles.list}>
                    <CategoriesList params={params}
                                    categories={categories}
                                    todos={todos}
                                    children={currentCategory.children}
                                    toggleCategory={toggleCategory}
                                    removeCategory={removeCategory}
                                    openModal={openModal}
                                    handleChooseNewCategory={handleChooseNewCategory}/>
                </div> : null}
        </li>
    )
};

Category.propTypes = {
    params: PropTypes.shape({
        category: PropTypes.string,
        todo: PropTypes.string
    }).isRequired,
    id: PropTypes.string.isRequired,
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
    toggleCategory: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    handleChooseNewCategory: PropTypes.func.isRequired
};

export default Category;
