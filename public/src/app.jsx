import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import logger from 'redux-logger';
import { Provider, connect } from 'react-redux';
import reducer from './reducers/index.js';
import { omit, throttle } from 'lodash';
import { closeModal, handleChooseNewCategory, handleTodoErrors, handleCategoryErrors, handleRouteChange } from './action-creators/index.js';
import Modal from 'react-modal';
import Categories from './containers/categories/categories.jsx';
import CreateCategory from './containers/create-category/create-category.jsx';
import Todos from './containers/todos/todos.jsx';
import EditTodo from './containers/edit-todo/edit-todo.jsx'
import Header from './components/header/header.jsx';
import ProgressBar from './containers/progress-bar/progress-bar.jsx';
import Error from './components/error/error.jsx';
import * as styles from './app.scss';

let App = ({ params, children, categories, todos, progress, closeModal, handleRouteChange }) => (
    <div className={styles.wrapper}>
        {browserHistory.listen(throttle(handleRouteChange, 2000))}

        <Header/>
        <ProgressBar/>

        <section className={styles.content}>
            <CreateCategory/>
            <Categories params={params}/>
            {categories.ui && categories.ui.error && <Error error={categories.ui.error}/>}
            {todos.ui && todos.ui.error && <Error error={todos.ui.error}/>}
        </section>

        {categories.ui ?
            <Modal isOpen={categories.ui.modalIsOpen} contentLabel='Category name'>
                {categories.ui.editing ?
                    <CreateCategory defaultValue={categories.byId[categories.ui.currentCategoryId].name}/> :
                    <CreateCategory parentId={categories.ui.currentCategoryId}/>}
                <button className={styles.closeModal} onClick={() => closeModal()}/>

                {categories.ui.error && <Error error={categories.ui.error}/>}
            </Modal> :
            null
        }
        {children}
    </div>
);

const initialState = JSON.parse(localStorage.getItem('items')) || {
        categories: {
            ids: [],
            byId: {},
            ui: {
                modalIsOpen: false,
                currentCategoryId: null,
                editing: false,
                error: null
            }
        },
        todos: {
            ids: [],
            byId: {},
            ui: {
                error: null,
                newCategory: ''
            }
        },
        search: {
            name: '',
            onlyCompleted: false
        }
    };

const store = createStore(reducer, initialState, applyMiddleware(logger));

const mapStateToProps = state => ({
    categories: state.categories,
    todos: state.todos,
    search: state.search
});

const mapDispatchToProps = dispatch => bindActionCreators({
    closeModal,
    handleChooseNewCategory,
    handleTodoErrors,
    handleCategoryErrors,
    handleRouteChange
}, dispatch);

App = connect(mapStateToProps, mapDispatchToProps)(App);


const updateLocalStorage = () => {
    let state = store.getState();

    const data = Object.keys(state).reduce((result, key) => {
        result[key] = omit(state[key], ['ui']);

        return result;
    }, {});

    localStorage.setItem('items', JSON.stringify(data));
};

store.subscribe(updateLocalStorage);
updateLocalStorage();

render(
    <Provider store={store} >
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <Route path=':category' component={Todos}/>
                <Route path=':category/:todo' component={EditTodo}/>
                <Route path='*' component={Error}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('react-root')
);