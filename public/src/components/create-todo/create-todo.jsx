import React, { PropTypes, PureComponent } from 'react';
import * as styles from './create-todo.scss';

class CreateToDo extends PureComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <form className={styles.form}
                  onSubmit={(event) => {
                      event.preventDefault();

                      this.props.addToDo(this.props.categoryId, this.textInput.value);
                      this.textInput.value='';
                  }}>
                <input type='text'
                       placeholder='Type new task name'
                       defaultValue=''
                       className={styles.input}
                       ref={(input) => {this.textInput = input}}/>
                <button type='submit' className={styles.button}>Add</button>
            </form>
        )
    }
}

CreateToDo.propTypes = {
    categoryId: PropTypes.string.isRequired,
    addToDo: PropTypes.func.isRequired
};

export default CreateToDo;