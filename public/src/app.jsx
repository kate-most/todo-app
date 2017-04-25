import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, Redirect} from 'react-router';
import Modal from 'react-modal';
import Header from './components/header/header.jsx';
import ProgressBar from './components/progress-bar/progress-bar.jsx';
import CreateCategory from './components/create-category/create-category.jsx';
import CategoriesList from './components/categories-list/categories-list.jsx';
import Error from './components/error/error.jsx';
import ToDoList from './components/to-do-list/to-do-list.jsx';
import ToDoDetails from './components/to-do-details/to-do-details.jsx'
import { omit, without, find } from 'lodash';
import uuidv4 from 'uuid/v4';
import * as styles from './app.scss';

const items = JSON.parse(localStorage.getItem('items')) || {
        categories: {
            ids: [],
            byId: {}
        },
        toDos: {
            ids: [],
            byId: {}
        },
        searchParams: {
            name: '',
            onlyCompleted: false
        },
        appTitle: 'To-Do List',
        toDo: '',
        error: null,
        modalIsOpen: false,
        currentId: '',
        editing: false,
        progress: 100
    };

class App extends PureComponent {
    static getDeepChildren = (categories, id) => {
        const deepChildren = [id];

        if (!categories.byId[id].children || !categories.byId[id].children.length) {
            return deepChildren;
        }

        function getChildren(subitem) {
            if (!subitem) {
                return;
            }

            deepChildren.push(...subitem.children);

            subitem.children.forEach(childId => {
                if (categories.byId[childId]) {
                    getChildren(categories.byId[childId]);
                }
            });
        }

        getChildren(categories.byId[id]);

        return deepChildren;
    };

    constructor() {
        super();

        this.state = items;
    }

    openModal = (currentId, editingState) => {
        this.setState({
            modalIsOpen: true,
            currentId: currentId,
            error: '',
            editing: editingState
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
            currentId: '',
            error: ''
        });
    };

    checkCategoryName = (value, parentId) => {
        let isNameAllowed = null;

        if (parentId) {
            const arrayOfChildIds = this.state.categories.byId[parentId].children;

            let childCategories = {};

            arrayOfChildIds.forEach((id) => {
                childCategories[id] = this.state.categories.byId[id];
            });
            isNameAllowed = value && !find(childCategories, { name: value });
        } else {
            let topLevelCategories = {};

            this.state.categories.ids.forEach((id) => {
                if (!this.state.categories.byId[id].parentId) {
                    topLevelCategories[id] = this.state.categories.byId[id];
                }
            });

            isNameAllowed = value && !find(topLevelCategories, { name: value });
        }

        return isNameAllowed;
    };

    addCategory = (value, parentId = null) => {

        if (this.checkCategoryName(value, parentId)) {
            const id = uuidv4();

            this.setState({
                categories: {
                    ...this.state.categories,
                    ids: [id, ...this.state.categories.ids],
                    byId: {
                        [id]: {
                            name: value,
                            id,
                            parentId,
                            children: [],
                            toDos: [],
                            isComplete: true,
                            isCollapsed: true
                        },
                        ...this.state.categories.byId,
                        ...parentId && {
                            [parentId]: {
                                ...this.state.categories.byId[parentId],
                                children: [id, ...this.state.categories.byId[parentId].children]
                            }
                        }
                    },
                },
                error: null,
                childCategoryCreation: false,
                modalIsOpen: false,
                currentId: ''
            }, () => {
                this.updateLocalStorage(this.state);
                this.updateProgress();
            });
        } else {
            this.handleErrors('category', value);
        }
    };

    editCategory = (id, value) => {

        if (this.checkCategoryName(value)) {
            this.setState({
                categories: {
                    ...this.state.categories,
                    byId: {
                        ...this.state.categories.byId,
                        [id]: {
                            ...this.state.categories.byId[id],
                            name: value
                        }
                    }
                },
                error: null,
                modalIsOpen: false,
                editing: false
            }, () => {
                this.updateLocalStorage(this.state);
            });
        } else {
            this.handleErrors('category', value, id);
        }
    };

    removeCategory = (id, parentId = null) => {
        const removeIds = App.getDeepChildren(this.state.categories, id);

        this.setState({
            categories: {
                ...this.state.categories,
                ids: without(this.state.categories.ids, ...removeIds),
                byId: omit({
                    ...this.state.categories.byId,
                    ...parentId && {
                        [parentId]: {
                            ...this.state.categories.byId[parentId],
                            children: without(this.state.categories.byId[parentId].children, id)
                        }
                    }
                }, ...removeIds)
            }
        }, () => {
            this.updateLocalStorage(this.state);
            this.updateProgress();
        });
    };

    collapseCategory = (id) => {
        this.setState(prevState => ({
            categories: {
                ...this.state.categories,
                byId: {
                    ...this.state.categories.byId,
                    [id]: {
                        ...this.state.categories.byId[id],
                        isCollapsed: !prevState.categories.byId[id].isCollapsed
                    }
                },
            }
        }));
    };

    addToDo = (categoryId, toDoName) => {
        if (categoryId && toDoName) {
            const toDoId = uuidv4();

            this.setState({
                categories: {
                    ...this.state.categories,
                    byId: {
                        ...this.state.categories.byId,
                        [categoryId]: {
                            ...this.state.categories.byId[categoryId],
                            toDos: this.state.categories.byId[categoryId].toDos ? [toDoId, ...this.state.categories.byId[categoryId].toDos] : [toDoId]
                        }
                    },
                },
                toDos: {
                    ...this.state.toDos,
                    ids: [...this.state.toDos.ids, toDoId],
                    byId: {
                        ...this.state.toDos.byId,
                        [toDoId]: {
                            name: toDoName,
                            category: categoryId,
                            details: 'This is a new category',
                            isCompleted: false
                        }
                    },
                },
                error: ''

            }, () => {
                this.updateLocalStorage(this.state);
                this.handleCompleteness(categoryId);
            })
        } else {
            this.handleErrors('todo');
        }

    };

    editToDo = (id, newValue, completeStatus, newDetails) => {

        this.setState({
            categories: this.state.chosenNewCategory ? {
                ...this.state.categories,
                byId: {
                    ...this.state.categories.byId,
                    [this.state.toDos.byId[id].category]: {
                        ...this.state.categories.byId[this.state.toDos.byId[id].category],
                        toDos: without(this.state.categories.byId[this.state.toDos.byId[id].category], id)
                    },
                    [this.state.chosenNewCategory]: {
                        ...this.state.categories.byId[this.state.chosenNewCategory],
                        toDos: this.state.categories.byId[this.state.chosenNewCategory].toDos ? [...this.state.categories.byId[this.state.chosenNewCategory].toDos, id] : [id]
                    }
                },
            } : {
                ...this.state.categories
            },
            toDos: {
                ...this.state.toDos,
                byId: {
                    ...this.state.toDos.byId,
                    [id]: {
                        ...this.state.toDos.byId[id],
                        name: newValue,
                        category: this.state.chosenNewCategory ? this.state.chosenNewCategory : this.state.toDos.byId[id].category,
                        details: newDetails,
                        isCompleted: completeStatus
                    }
                }
            },
            chosenNewCategory: ''
        }, () => {
            this.updateLocalStorage(this.state);
            this.handleCompleteness(this.state.toDos.byId[id].category);
        });
    };

    updateProgress = () => {

        this.setState({
            progress: this.state.categories.ids.length ? (this.getNumberOfCompletedCategories() * 100 / this.state.categories.ids.length) : 100
        }, () => {
            this.updateLocalStorage(this.state);
        });
    };

    getNumberOfCompletedCategories = () => {
        let number = 0;

        this.state.categories.ids.forEach((id) => {
            if (this.state.categories.byId[id].isComplete)
            number++;
        });

        return number;
    };

    handleErrors = (type, value, id) => {
        let errorMessage;

        if (type === 'category') {
            errorMessage = !value ? 'This is an empty category name!' : (id && (value === this.state.categories.byId[id].name)) ? 'You have the same name' : 'This category already exists!';
        } else if (type === 'todo') {
            errorMessage = (!this.state.toDo) ? 'This is an empty to-do name!' : 'You are trying to create a to-do without category!';
        } else {
            errorMessage = 'Unknown error';
        }

        this.setState({
            error: errorMessage
        })
    };

    handleChangeCategoryName = () => {
        this.setState({
            error: null
        });
    };

    handleChangeToDoItemStatus = (id) => {
        this.setState(prevState => ({
            toDos: {
                ...this.state.toDos,
                byId: {
                    ...this.state.toDos.byId,
                    [id]: {
                        ...this.state.toDos.byId[id],
                        isCompleted: !prevState.toDos.byId[id].isCompleted
                    }
                }
            }
        }), () => {
            this.updateLocalStorage(this.state);
            this.handleCompleteness(this.state.toDos.byId[id].category);
        });
    };

    handleCompleteness = (categoryId) => { //defines whether operations with a task change category completeness status
        const startingCompletenessStatus = this.state.categories.byId[categoryId].isComplete;
        const categoryToDosIds = this.state.categories.byId[categoryId].toDos;
        let categoryToDos = {};

        categoryToDosIds.forEach((id) => {
            categoryToDos[id] = this.state.toDos.byId[id];
        });

        const isCompletedCategory = !find(categoryToDos, {isCompleted: false});

        if (startingCompletenessStatus !== isCompletedCategory) {

            this.setState({
                categories: {
                    ...this.state.categories,
                    byId: {
                        ...this.state.categories.byId,
                        [categoryId]: {
                            ...this.state.categories.byId[categoryId],
                            isComplete: isCompletedCategory
                        }
                    },
                }
            }, () => {
                this.updateLocalStorage(this.state);
                this.updateProgress();
            });
        }
    };

    handleChoseNewCategory = (newCategory) => {
        this.setState({
            chosenNewCategory: newCategory
        });
    };

    handleChangeSearchName = (event) => {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                name: event.target.value
            }
        }, () => {
            this.updateLocalStorage(this.state);
        });
    };

    handleChangeSearchStatus = () => {
        this.setState(prevState => ({
            searchParams: {
                ...this.state.searchParams,
                onlyCompleted: !prevState.searchParams.onlyCompleted
            }
        }), () => {
            this.updateLocalStorage(this.state);
        })
    };

    clearSearchName = () => {
        this.setState({
            searchParams: {
                ...this.state.searchParams,
                name: ''
            }
        }, () => {
            this.updateLocalStorage(this.state);
        });
    };

    updateLocalStorage = state => {
        localStorage.setItem('items', JSON.stringify(state));
    };

    render() {

        return (
            <div className={styles.wrapper}>
                <Header appTitle={this.state.appTitle}/>
                <ProgressBar progress={this.state.progress}/>

                <section className={styles.content}>
                    <CreateCategory onChange={this.handleChangeCategoryName}
                                    addCategory={this.addCategory}/>
                    <CategoriesList categories={this.state.categories}
                                    toDos={this.state.toDos}
                                    params={this.props.params}
                                    removeCategory={this.removeCategory}
                                    collapseCategory={this.collapseCategory}
                                    handleChoseNewCategory={this.handleChoseNewCategory}
                                    openModal={this.openModal}/>
                    {this.state.error && <Error error={this.state.error}/>}
                </section>

                <Modal
                    isOpen={ this.state.modalIsOpen }
                    onRequestClose={this.closeModal}
                    contentLabel='Category name'>
                    {
                        this.state.editing ?
                            <CreateCategory defaultValue={this.state.categories.byId[this.state.currentId] ? this.state.categories.byId[this.state.currentId].name : ''}
                                            id={this.state.currentId}
                                            editCategory={this.editCategory}/> :
                            <CreateCategory parentId={this.state.currentId}
                                            onChange={this.handleChangeCategoryName}
                                            addCategory={this.addCategory}/>
                    }
                    <button className={styles.closeModal} onClick={() => {this.closeModal()}}/>
                    {this.state.error && <Error error={this.state.error}/>}
                </Modal>

                {React.Children.map(this.props.children, child => React.cloneElement(child, {
                    categories: this.state.categories,
                    toDos: this.state.toDos,
                    addToDo: this.addToDo,
                    onStatusChange: this.handleChangeToDoItemStatus,
                    toDo: this.state.toDo,
                    editToDo: this.editToDo,
                    startEditToDo: this.startEditToDo,
                    handleChoseNewCategory: this.handleChoseNewCategory,
                    chosenNewCategory: this.state.chosenNewCategory,
                    handleChangeSearchName: this.handleChangeSearchName,
                    handleChangeSearchStatus: this.handleChangeSearchStatus,
                    searchParams: this.state.searchParams,
                    clearSearchName: this.clearSearchName
                }))}
            </div>
        )
    }
}

render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <Route path=':category' component={ToDoList}>
                <Route path=':todo' component={ToDoDetails}/>
                <Redirect from='*' to=':category' />
            </Route>
            <Route path='*' component={Error}/>
        </Route>
    </Router>,
    document.getElementById('react-root')
);