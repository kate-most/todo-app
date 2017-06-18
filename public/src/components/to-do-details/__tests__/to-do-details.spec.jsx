jest.mock('./to-do-details.scss', () => ({
    message: 'message'
}));

import React from 'react';
import { shallow, mount } from 'enzyme';
import TodoDetails from './../to-do-details';

describe('<TodoDetails />', () => {

    let wrapper, props;

    beforeEach(() => {
        setup();
    });

    function setup() {
        props = {
            params: {
                category: 'mock_category_id_child',
                todo: 'mock_todo_id'
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
                        isCollapsed: false,
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
                }
            },
            editTodo: jest.fn(),
            handleChooseNewCategory: jest.fn(),
            handleCategoryStatusChange: jest.fn(),
            handleTodoErrors: jest.fn(),
            clearError: jest.fn()
        };

        wrapper = shallow(<TodoDetails {...props} />);
    }

    describe('#render', () => {
        it('should render a form, if a todo with current id exists', () => {
            expect(wrapper.find('form').length).toBe(1);
        });

        it('should not render a form ,if a todo with current id does not exist', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    todo: 'mock_todo_undefined'
                }
            };
            wrapper = shallow(<TodoDetails {...props}/>);

            expect(wrapper.find('form').length).toBe(0);
        });

        it('should not render a message, if a newCategory was not chosen', () => {
            wrapper = shallow(<TodoDetails {...props}/>);

            expect(wrapper.find('.message').length).toBe(0);
        });

        it('should not render a message, if a newCategory is equal to the current', () => {
            props = {
                ...props,
                todos: {
                    ...props.todos,
                    ui: {
                        error: 'mock_todo_error',
                        newCategory: 'mock_category_id_parent'
                    }
                }
            };
            wrapper = shallow(<TodoDetails {...props}/>);

            expect(wrapper.find('.message').length).toBe(0);
        });

        it('should render a message, if a newCategory is chosen and it is not equal to current', () => {
            props = {
                ...props,
                todos: {
                    ...props.todos,
                    ui: {
                        error: 'mock_todo_error',
                        newCategory: 'mock_category_id_child'
                    }
                }
            };
            wrapper = shallow(<TodoDetails {...props}/>);

            expect(wrapper.find('.message').length).toBe(1);
        });

        it('should have an input of type checkbox', () => {
            expect(wrapper.find('input[type="checkbox"]').length).toBe(1);
        });

        it('should have an input of type text', () => {
            expect(wrapper.find('input[type="text"]').length).toBe(1);
        });

        it('should have a textarea', () => {
            expect(wrapper.find('textarea').length).toBe(1);
        });

        it('should have a button of type submit', () => {
            expect(wrapper.find('button[type="submit"]').length).toBe(1);
        });

        it('should have a button of type reset', () => {
            expect(wrapper.find('button[type="reset"]').length).toBe(1);
        });
    });

    describe('#events', () => {
        it('should call preventDefault on form submit', () => {
            const form = wrapper.find('form');
            const preventDefault = jest.fn();

            form.simulate('submit', {preventDefault, target: {value: 'mock'}});

            expect(preventDefault).toHaveBeenCalled();
        });

        it('should call handleTodoErrors on form submit', () => {
            const form = wrapper.find('form');
            const preventDefault = jest.fn();

            form.simulate('submit', {preventDefault});

            expect(props.handleTodoErrors).toHaveBeenCalled();
        });

        it('should call editTodo with passed id and editedTodo on form submit', () => {
            const wrapper = mount(<TodoDetails {...props} />);
            const form = wrapper.find('form');
            const preventDefault = jest.fn();
            const expectedEditedTodo = {
                category: 'mock_category_id_child',
                details: 'mock_todo_details',
                name: 'mock_todo_name',
                status: true
            };

            form.simulate('submit', {preventDefault});

            expect(props.editTodo).toHaveBeenCalledWith('mock_todo_id', expectedEditedTodo);
        });

        it('should call handleCategoryStatusChange with passed props on form submit', () => {
            const wrapper = mount(<TodoDetails {...props} />);
            const form = wrapper.find('form');
            const preventDefault = jest.fn();
            const expectedTodos = {
                ids: ['mock_todo_id'],
                byId: {
                    'mock_todo_id': {
                        name: 'mock_todo_name',
                        category: 'mock_category_id_parent',
                        details: 'mock_todo_details',
                        isCompleted: true
                    }
                }
            };

            form.simulate('submit', {preventDefault});

            expect(props.handleCategoryStatusChange).toHaveBeenCalledWith('mock_category_id_child', 'mock_todo_id', expectedTodos, true, true);
        });

        it('should call history.back on form submit', () => {
            const wrapper = mount(<TodoDetails {...props} />);
            const form = wrapper.find('form');
            const preventDefault = jest.fn();
            window.history.back = jest.fn();

            form.simulate('submit', {preventDefault});

            expect(window.history.back).toHaveBeenCalled();
        });

        it('should call handleChooseNewCategory on form reset', () => {
            const resetButton = wrapper.find('button[type="reset"]');

            resetButton.simulate('click', {});

            expect(props.handleChooseNewCategory).toHaveBeenCalled();
        });

        it('should call history.back on form reset', () => {
            const resetButton = wrapper.find('button[type="reset"]');
            window.history.back = jest.fn();

            resetButton.simulate('click', {});

            expect(window.history.back).toHaveBeenCalled();
        });

        it('should call clearError on checkbox change', () => {
            const checkbox = wrapper.find('input[type="checkbox"]');

            checkbox.simulate('change', {});

            expect(props.clearError).toHaveBeenCalled();
        });

        it('should call clearError on text input change', () => {
            const textInput = wrapper.find('input[type="text"]');

            textInput.simulate('change', {});

            expect(props.clearError).toHaveBeenCalled();
        });

        it('should call clearError on textarea change', () => {
            const textarea = wrapper.find('textarea');

            textarea.simulate('change', {});

            expect(props.clearError).toHaveBeenCalled();
        });
    });
});
