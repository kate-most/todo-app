import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import logger from 'redux-logger';
import { Provider, connect } from 'react-redux';
import reducer from './reducers/index.js';
import { throttle } from 'lodash';
import { handleChooseNewCategory, handleCategoryErrors } from './action-creators/categories.js';
import { handleTodoErrors } from './action-creators/todos.js';
import { closeModal, handleRouteChange } from './action-creators/common.js';
import Modal from 'react-modal';
import getInitialState from './helpers/get-initial-state';
import updateLocalStorage from './helpers/update-local-storage';
import Categories from './containers/categories/categories.jsx';
import CreateCategory from './containers/create-category/create-category.jsx';
import Todos from './containers/todos/todos.jsx';
import EditTodo from './containers/edit-todo/edit-todo.jsx'
import Header from './components/header/header.jsx';
import ProgressBar from './containers/progress-bar/progress-bar.jsx';
import Error from './components/error/error.jsx';
import * as styles from './app.scss';

export class App extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.handleRouteChange = null;
    }

    componentDidMount() {
        this.handleRouteChange = browserHistory.listen(throttle(this.props.handleRouteChange, 2000));
    }

    componentWillUnmount() {
        this.handleRouteChange();
    }

    render() {
        const { params, children, categories, todos, closeModal } = this.props;

        return (
            <div className={styles.wrapper}>
                <Header/>
                <ProgressBar/>

                <section className={styles.content}>
                    <CreateCategory/>
                    <Categories params={params}/>
                    {categories.ui && categories.ui.error && <Error error={categories.ui.error}/>}
                    {todos.ui && todos.ui.error && <Error error={todos.ui.error}/>}
                </section>

                {categories.ui && categories.ui.modalIsOpen ?
                    <Modal isOpen={categories.ui.modalIsOpen} contentLabel='Category name'>
                        {categories.ui.editing ?
                            <CreateCategory defaultValue={categories.byId[categories.ui.currentCategoryId].name} data-test='editing'/> :
                            <CreateCategory parentId={categories.ui.currentCategoryId} data-test='child-creation'/>}
                        <button className={styles.closeModal} onClick={() => closeModal()}/>

                        {categories.ui.error && <Error error={categories.ui.error}/>}
                    </Modal> :
                    null
                }
                {children}
            </div>
        );
    }
}

const store = createStore(reducer, getInitialState(), applyMiddleware(logger));

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

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

store.subscribe(() => {
    updateLocalStorage(store);
});

updateLocalStorage(store);

render(
    <Provider store={store} >
        <Router history={browserHistory}>
            <Route path='/' component={AppContainer}>
                <Route path=':category' component={Todos}/>
                <Route path=':category/:todo' component={EditTodo}/>
                <Route path='*' component={Error}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('react-root') || document.body
);