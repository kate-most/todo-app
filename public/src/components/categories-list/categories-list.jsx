import React, { PropTypes } from 'react';
import Category from './../category/category.jsx';
import * as styles from './categories-list.scss';

const CategoriesList = ({ parentId, children, categories, toDos, params, removeCategory, collapseCategory, handleChoseNewCategory, openModal }) => {
    const searchIds = children ? children : categories.ids.filter((id) => (!categories.byId[id].parentId));
    return (
        <ul className={styles.container}>
            {searchIds.map((id) => (
                <Category key={id}
                          id={id}
                          parentId={parentId}
                          categories={categories}
                          toDos={toDos}
                          params={params}
                          removeCategory={removeCategory}
                          collapseCategory={collapseCategory}
                          handleChoseNewCategory={handleChoseNewCategory}
                          openModal={openModal}/>
            ))}
        </ul>
    )
};

CategoriesList.propTypes = {
    parentId: PropTypes.string,
    children: PropTypes.array,
    categories: PropTypes.shape({
        ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        byId: PropTypes.objectOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            parentId: PropTypes.string,
            children: PropTypes.arrayOf(PropTypes.string).isRequired,
            toDos: PropTypes.arrayOf(PropTypes.string).isRequired,
            isComplete: PropTypes.bool.isRequired,
            isCollapsed: PropTypes.bool.isRequired
        }).isRequired).isRequired
    }).isRequired,
    toDos: PropTypes.shape({
        ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        byId: PropTypes.objectOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            details: PropTypes.string.isRequired,
            isCompleted: PropTypes.bool.isRequired
        }).isRequired).isRequired
    }).isRequired,
    params: PropTypes.shape({
        category: PropTypes.string,
        todo: PropTypes.string
    }).isRequired,
    removeCategory: PropTypes.func.isRequired,
    collapseCategory: PropTypes.func.isRequired,
    handleChoseNewCategory: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
};

export default CategoriesList;