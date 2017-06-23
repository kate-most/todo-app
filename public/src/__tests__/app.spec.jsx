jest.mock('./../helpers/get-initial-state', () => jest.fn(() => ({})));
jest.mock('./../helpers/update-local-storage', () => jest.fn(() => ({})));
jest.mock('./../containers/progress-bar/progress-bar', () => () => <div />);
jest.mock('./../containers/create-category/create-category', () => () => <div />);
jest.mock('./../containers/create-category/create-category', () => () => <div />);
jest.mock('./../containers/categories/categories', () => () => <div />);

import React from 'react';
import { shallow, mount } from 'enzyme';
import { App } from '../app';
import { browserHistory } from 'react-router';
import Header from '../components/header/header';
import ProgressBar from '../containers/progress-bar/progress-bar';
import CreateCategory from '../containers/create-category/create-category';
import Categories from '../containers/categories/categories';
import Error from '../components/error/error';
import Modal from 'react-modal';

describe('<App />', () => {

    let props, wrapper;

    beforeEach(() => {
        setup();
    });

    function setup() {
        props = {
            params: {
                category: 'mock_category',
                todo: 'mock_todo'
            },
            categories: {
                ids: ['mock_category_id_parent', 'mock_category_id_child'],
                byId: {
                    'mock_category_id_parent': {
                        name: 'mock_category_name',
                        id: 'mock_category_id_parent',
                        parentId: '',
                        children: ['mock_category_id_child'],
                        isCompleted: true,
                        isCollapsed: true,
                        todos: ['mock_todo_id']
                    },
                    'mock_category_id_child': {
                        name: 'mock_category_name',
                        id: 'mock_category_id_child',
                        parentId: 'mock_category_id_parent',
                        children: [],
                        isCompleted: true,
                        isCollapsed: true,
                        todos: []
                    }
                },
                ui: {
                    editing: true,
                    modalIsOpen: false,
                    currentCategoryId: 'mock_category_id_parent',
                    error: 'mock_category_error'
                }
            },
            todos: {
                ids: ['mock_todo_id'],
                byId: {
                    'mock_todo_id': {
                        name: 'mock_todo_name',
                        category: 'mock_category_id_parent',
                        details: 'mock_todo_details',
                        isCompleted: true
                    }
                },
                ui: {
                    error: '',
                    newCategory: 'mock_category_id_child'
                }
            },
            closeModal: jest.fn(),
            handleRouteChange: jest.fn()
        };

        wrapper = shallow(<App {...props} />);
    }

    describe('#render', () => {
        it('should render <Header />', () => {
            expect(wrapper.find(Header).length).toBe(1);
        });

        it('should render <ProgressBar />', () => {
            expect(wrapper.find(ProgressBar).length).toBe(1);
        });

        it('should render <CreateCategory />', () => {
            expect(wrapper.find(CreateCategory).length).toBe(1);
        });

        it('should render <Categories />', () => {
            expect(wrapper.find(Categories).length).toBe(1);
        });

        it('should render <Modal />, if modalIsOpen', () => {
            props = {
                ...props,
                categories: {
                    ...props.categories,
                    ui: {
                        ...props.categories.ui,
                        modalIsOpen: true
                    }
                }
            };
            wrapper = shallow(<App {...props} />);

            expect(wrapper.find(Modal).length).toBe(1);
        });

        it('should render <CreateCategory /> with data-test value child-creation, if modalIsOpen and editing is false', () => {
            props = {
                ...props,
                categories: {
                    ...props.categories,
                    ui: {
                        ...props.categories.ui,
                        modalIsOpen: true,
                        editing: false
                    }
                }
            };

            wrapper = shallow(<App {...props} />);

            expect(wrapper.find('[data-test="child-creation"]').length).toBe(1);
        });

        it('should render <CreateCategory /> with data-test value editing, if modalIsOpen and editing is true', () => {
            props = {
                ...props,
                categories: {
                    ...props.categories,
                    ui: {
                        ...props.categories.ui,
                        modalIsOpen: true
                    }
                }
            };

            wrapper = shallow(<App {...props} />);

            expect(wrapper.find('[data-test="editing"]').length).toBe(1);
        });

        it('should render <Error /> if it exists it categories', () => {
            expect(wrapper.find(Error).length).toBe(1);
        });

        it('should render <Error /> if it exists in todos', () => {
            props = {
                ...props,
                categories: {
                    ...props.categories,
                    ui: {
                        ...props.categories.ui,
                        error: ''
                    }
                },
                todos: {
                    ...props.todos,
                    ui: {
                        ...props.todos.ui,
                        error: 'mock_error'
                    }
                }
            };

            wrapper = shallow(<App {...props} />);

            expect(wrapper.find(Error).length).toBe(1);
        });
    });

    describe('lifecycle', () => {
        it('should listen for history changes after mount', () => {
            browserHistory.listen = jest.fn();
            wrapper = mount(<App {...props} />);

            expect(browserHistory.listen).toHaveBeenCalled();
        });

        it('should unlisten for history changes before unmount', () => {
            const unlisten = jest.fn();
            browserHistory.listen = jest.fn(() => unlisten);
            wrapper = mount(<App {...props} />);

            wrapper.unmount();

            expect(unlisten).toHaveBeenCalled();
        });
    });
});