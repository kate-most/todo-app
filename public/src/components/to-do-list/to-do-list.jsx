import React, { PureComponent } from 'react';
import ToDoItem from './../to-do-item/to-do-item.jsx';
import CreateTodo from './../create-todo/create-todo.jsx';
import Search from './../search/search.jsx'
import * as styles from './to-do-list.scss';

class ToDoList extends PureComponent {
    render() {
        const category = this.props.categories.byId[this.props.params.category];

        if (!category) {
            return <h1>There is no category with this id</h1>;
        }

        return (
            <section className={styles.container}>
                {category && <div>
                    <Search categoryId={this.props.params.category}
                            searchParams={this.props.searchParams}
                            handleChangeSearchName={this.props.handleChangeSearchName}
                            handleChangeSearchStatus={this.props.handleChangeSearchStatus}
                            clearSearchName={this.props.clearSearchName}/>
                    <CreateTodo categoryId={this.props.params.category}
                                addToDo={this.props.addToDo}/>

                    {category.toDos.length ?
                        <ul className={styles.list}>
                            {category.toDos.filter((id) => {
                                if (this.props.location.query.name && this.props.location.query.completed === 'true') {
                                    return ((this.props.toDos.byId[id].name.search(this.props.location.query.name) >= 0) && this.props.toDos.byId[id].isCompleted);
                                } else if (this.props.location.query.name) {
                                    return (this.props.toDos.byId[id].name.search(this.props.location.query.name) >= 0);
                                } else if (this.props.location.query.completed === 'true') {
                                    return this.props.toDos.byId[id].isCompleted;
                                } else {
                                    return this.props.toDos.byId[id];
                                }
                            }).map((id) => (
                                <ToDoItem key={id}
                                          id={id}
                                          categoryId={this.props.params.category}
                                          name={this.props.toDos.byId[id].name}
                                          isCompleted={this.props.toDos.byId[id].isCompleted}
                                          onChange={this.props.onStatusChange}/>
                            ))}
                        </ul> :
                        <h3>There are no tasks</h3>
                    }
                    {React.Children.map(this.props.children, child => React.cloneElement(child, {
                        categories: this.props.categories,
                        toDos: this.props.toDos,
                        editToDo: this.props.editToDo,
                        handleChoseNewCategory: this.props.handleChoseNewCategory,
                        chosenNewCategory: this.props.chosenNewCategory
                    }))}
                </div>}
            </section>
        )
    }
}

export default ToDoList;