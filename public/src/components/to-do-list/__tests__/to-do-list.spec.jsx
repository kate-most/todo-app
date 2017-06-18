jest.mock('./to-do-list.scss', () => ({
}));

import React from 'react';
import { shallow } from 'enzyme';
import TodoList from './../to-do-list';

describe('<TodoList />', () => {

    let wrapper, props;

    beforeEach(() => {
        setup();
    });

    function setup() {
        props = {
            params: {
                category: 'mock_category_id_parent'
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
            handleTodoStatusChange: jest.fn(),
            handleCategoryStatusChange: jest.fn()
        };

        wrapper = shallow(<TodoList {...props} />);
    }

    describe('#render', () => {
        describe('#render', () => {
            it('should render unordered list', () => {
                expect(wrapper.find('ul').length).toBe(1);
            });

            it('should render h1, if there is no category with current id', () => {
                props = {
                    ...props,
                    params: {
                        ...props.params,
                        category: 'mock_category_undefined'
                    }
                };
                wrapper = shallow(<TodoList {...props} />);

                expect(wrapper.find('h1').length).toBe(1);

            });

            it('should render h3, if there is no todos in the category', () => {
                props = {
                    ...props,
                    todos: {
                        ...props.todos,
                        ids: [],
                        byId: {}
                    },

                };

                wrapper = shallow(<TodoList {...props} />);

                expect(wrapper.find('h3').length).toBe(1);
            });
        });
    });

    describe('#events', () => {

    });
});
