import React, { PureComponent } from 'react';
import * as styles from './to-do-details.scss';

class ToDoDetails extends PureComponent {
    render () {
        const id = this.props.params.todo;
        const toDo = this.props.toDos.byId[id];

        if (!toDo) {
            return <h1>There is no task with this id</h1>;
        }

        return (
            <form className={styles.form}
                  onSubmit={(event) => {
                event.preventDefault();

                this.props.editToDo(id, this.name.value, this.checkbox.checked, this.details.value);
                history.back();
            }}>

                {(this.props.chosenNewCategory && this.props.categories.byId[this.props.chosenNewCategory].name !== this.props.categories.byId[this.props.toDos.byId[id].category].name) ? <div className={styles.message}>You will move the task to category <span className={styles.messageCategoryName}>{this.props.categories.byId[this.props.chosenNewCategory].name}</span></div> : null}

                <div className={styles.content}>
                    <input type='text'
                           className={styles.input}
                           defaultValue={this.props.toDos.byId[id].name}
                           ref={(input) => {this.name = input}}/>

                    <div className={styles.checkboxWrap}>
                        <input type='checkbox'
                               id='change-status'
                               className={styles.checkbox}
                               defaultChecked={this.props.toDos.byId[id].isCompleted}
                               ref={(input) => {this.checkbox = input}}/>
                        <label htmlFor='change-status'
                               className={styles.label}/>
                        <div>Done</div>
                    </div>

                    <textarea cols='50'
                              rows='10'
                              defaultValue={toDo.details}
                              className={styles.textarea}
                              ref={(input) => {this.details = input}} />
                </div>

                <div className={styles.actions}>
                    <button type='submit' className={styles.button}>Save Changes</button>
                    <button type='reset'
                            className={styles.button}
                            onClick={() => {
                                history.back();
                                this.props.handleChoseNewCategory('');
                            }}>Cancel</button>
                </div>
            </form>
        )
    }
}

export default ToDoDetails;