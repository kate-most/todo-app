import React from 'react';
import { shallow } from 'enzyme';
import { Todos } from './../todos';
import Search from './../../../components/search/search';
import CreateTodo from './../../create-todo/create-todo';
import TodoList from '../../../components/to-do-list/to-do-list';

describe('Todos', () => {
    let props, wrapper;

    beforeEach(() => {
        setup();
    });

    function setup() {
        props = {
            params: {
                category: 'mock_category_id_parent',
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
                    error: 'mock_todo_error',
                    newCategory: 'mock_category_id_child'
                }
            },
            search: {
                name: '',
                onlyCompleted: false
            },
            changeSearchName: jest.fn(),
            changeSearchStatus: jest.fn(),
            clearSearchName: jest.fn(),
            clearError: jest.fn(),
            handleTodoStatusChange: jest.fn(),
            handleCategoryStatusChange: jest.fn()
        };

        wrapper = shallow(<Todos {...props} />);
    }

    describe('#render', () => {
        it('should render <Search />, if category exists', () => {

            expect(wrapper.find(Search).length).toBe(1);
        });

        it('should not render <Search />, if category does not exist', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    category: 'mock_category_id_undefined'
                }
            };

            wrapper = shallow(<Todos {...props} />);

            expect(wrapper.find(Search).length).toBe(0);
        });

        it('should render <CreateTodo />, if category exists', () => {

            expect(wrapper.find(CreateTodo).length).toBe(1);
        });

        it('should not render <CreateTodo />, if category does not exist', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    category: 'mock_category_id_undefined'
                }
            };

            wrapper = shallow(<Todos {...props} />);

            expect(wrapper.find(CreateTodo).length).toBe(0);
        });

        it('should render <TodoList />', () => {

            expect(wrapper.find(TodoList).length).toBe(1);
        });
    });
});