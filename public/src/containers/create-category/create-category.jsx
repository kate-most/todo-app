import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { addCategory, editCategory, handleCategoryErrors, handleCategoryInputChange } from '../../action-creators/index.js';
import * as styles from './create-category.scss';

let CreateCategory = ({ parentId = null, defaultValue = '', categories, addCategory, editCategory, handleCategoryErrors, handleCategoryInputChange }) => {
    let textInput;

    const checkCategoryName = (value, parentId) => {
        let siblingCategories = getSiblingCategories(parentId);

        if (value && !find(siblingCategories, { name: value })) {
            if (categories.ui && categories.ui.editing) {
                editCategory(value, categories.ui.currentCategoryId);
            } else {
                addCategory(value, parentId);
            }
        } else {
            handleCategoryErrors(!value ? 'This is an empty category name!' : (value === defaultValue) ? 'You have the same name' : 'This category already exists!');
        }
    };

    const getSiblingCategories = (parentId) => {
        let siblingCategories = {};

        if (parentId) {
            //Take only child categories of the parent
            categories.byId[parentId].children.forEach((id) => {
                siblingCategories[id] = categories.byId[id];
            });
        } else {
            //Take all categories of top level
            categories.ids.forEach((id) => {
                if (!categories.byId[id].parentId) {
                    siblingCategories[id] = categories.byId[id];
                }
            });
        }

        return siblingCategories;
    };

    return (
        <form className={styles.form}
              onSubmit={event => {
                  event.preventDefault();
                  checkCategoryName(textInput.value, parentId);

                  textInput.value = '';
              }}>
            <input type='text'
                   placeholder='Type new category name'
                   defaultValue={defaultValue}
                   ref={input => {
                       textInput = input
                   }}
                   className={styles.input} onChange={() => {
                       handleCategoryInputChange();
                   }}/>

            <button type='submit' className={styles.button}>Add</button>
        </form>
    )
};

const mapStateToProps = (state) => ({
    categories: state.categories
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addCategory,
    editCategory,
    handleCategoryErrors,
    handleCategoryInputChange
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);