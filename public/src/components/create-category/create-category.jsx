import React, { PropTypes, PureComponent } from 'react';
import * as styles from './create-category.scss';

class CreateCategory extends PureComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <form className={styles.form}
                  onSubmit={(event) => {
                      event.preventDefault();

                      if (this.props.addCategory) {
                          this.props.addCategory(this.textInput.value, this.props.parentId ? this.props.parentId : null);
                      } else {
                          this.props.editCategory(this.props.id, this.textInput.value);
                      }

                      this.textInput.value='';
                  }}>
                <input type='text'
                       placeholder='Type new category name'
                       ref={(input) => {this.textInput = input}}
                       defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}
                       className={styles.input}
                       onChange={this.props.onChange}/>

                <button type='submit' className={styles.button}>Add</button>
            </form>
        )
    }
}

CreateCategory.propTypes = {
    defaultValue: PropTypes.string,
    id: PropTypes.number,
    parentId: PropTypes.string,
    onChange: PropTypes.func,
    editCategory: PropTypes.func,
    addCategory: PropTypes.func
};

export default CreateCategory;