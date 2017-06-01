import React, { PropTypes } from 'react'
import Category from './../category/category.jsx'
import * as styles from './categories-list.scss'

const CategoriesList = ({ params, categories, todos, children, toggleCategory, removeCategory, openModal, handleChooseNewCategory }) => {
    const searchIds = children ? children : categories.ids.filter((id) => (!categories.byId[id].parentId));

    return (
        <ul className={styles.container}>
            {searchIds.map((id) => (
                <Category key={id}
                          params={params}
                          id={id}
                          categories={categories}
                          todos={todos}
                          toggleCategory={toggleCategory}
                          removeCategory={removeCategory}
                          openModal={openModal}
                          handleChooseNewCategory={handleChooseNewCategory}/>
            ))}
        </ul>
    )
};

CategoriesList.propTypes = {
    params: PropTypes.shape({
        category: PropTypes.string,
        todo: PropTypes.string
    }).isRequired,
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
    children: PropTypes.array,
    toggleCategory: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    handleChooseNewCategory: PropTypes.func.isRequired
};

export default CategoriesList;