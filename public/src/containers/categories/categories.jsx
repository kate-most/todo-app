import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleCategory, removeCategory, openModal, handleChooseNewCategory } from '../../action-creators/index.js';
import CategoriesList from './../../components/categories-list/categories-list.jsx';

const Categories = ({ params, children, categories, todos, toggleCategory, removeCategory, openModal, handleChooseNewCategory }) => (
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
