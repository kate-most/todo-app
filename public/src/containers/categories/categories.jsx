import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleCategory, removeCategory, handleChooseNewCategory } from '../../action-creators/categories';
import { openModal } from '../../action-creators/common';
import CategoriesList from './../../components/categories-list/categories-list';

export const Categories = ({ params, children, categories, todos, toggleCategory, removeCategory, openModal, handleChooseNewCategory }) => (
    <div>
        <CategoriesList params={params}
                        categories={categories}
                        todos={todos}
                        toggleCategory={toggleCategory}
                        removeCategory={removeCategory}
                        openModal={openModal}
                        handleChooseNewCategory={handleChooseNewCategory}/>
        {children}
    </div>
);

const mapStateToProps = (state) => ({
    categories: state.categories,
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleCategory,
    removeCategory,
    openModal,
    handleChooseNewCategory
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
