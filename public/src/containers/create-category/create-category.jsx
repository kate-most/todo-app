import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { addCategory, editCategory, handleCategoryErrors, handleCategoryInputChange } from '../../action-creators/categories';
import getSiblingCategories from './../../helpers/get-sibling-categories';
import * as styles from './create-category.scss';

let CreateCategory = ({ parentId = null, defaultValue = '', categories, addCategory, editCategory, handleCategoryErrors, handleCategoryInputChange }) => {
    let textInput;

    return (
        <form className={styles.form}
              onSubmit={event => {
                  event.preventDefault();

                  let siblingCategories = getSiblingCategories(parentId, categories);

                  if (textInput.value && !find(siblingCategories, { name: textInput.value })) {
                      if (categories.ui && categories.ui.editing) {
                          editCategory(textInput.value, categories.ui.currentCategoryId);
                      } else {
                          addCategory(textInput.value, parentId);
                      }
                  } else {
                      handleCategoryErrors(!textInput.value ? 'This is an empty category name!' : (textInput.value === defaultValue) ? 'You have the same name' : 'This category already exists!');
                  }

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