jest.mock('./to-do-item.scss', () => ({
    name: 'name',
    edit: 'edit'
}));

import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import TodoItem from './../to-do-item';

describe('<TodoItem />', () => {

    let wrapper, props;

    beforeEach(() => {
        setup();
    });

    function setup() {
        props = {
            id: 'mock_todo_id',
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
            categoryId: 'mock_category_id',
            handleTodoStatusChange: jest.fn(),
            handleCategoryStatusChange: jest.fn()
        };

        wrapper = shallow(<TodoItem {...props} />);
    }

    describe('#render', () => {
        it('should render an input of type checkbox', () => {
            expect(wrapper.find('input[type="checkbox"]').length).toBe(1);
        });

        it('should contain <Link />', () => {
            expect(wrapper.find(Link).length).toBe(1);
        });

        it('should have <Link /> with proper to prop', () => {
            const expected = 'mock_category_id/mock_todo_id';
            const link = wrapper.find(Link);

            expect(link.prop('to')).toBe(expected);
        });

        it('should render a button of class edit', () => {
            expect(wrapper.find('button.edit').length).toBe(1);
        });

        it('should render an element of class name', () => {
            expect(wrapper.find('label.name').length).toBe(1);
        });
    });

    describe('#events', () => {
        it('should call handleTodoStatusChange on checkbox change with passed id', () => {
            const checkbox = wrapper.find('input[type="checkbox"]');

            checkbox.simulate('change', {target: {id: 'mock_target'}});

            expect(props.handleTodoStatusChange).toHaveBeenCalledWith('mock_todo_id');
        });

        it('should call handleCategoryStatusChange on checkbox change with passed id', () => {
            const checkbox = wrapper.find('input[type="checkbox"]');

            checkbox.simulate('change', {target: {id: 'mock_target'}});

            expect(props.handleCategoryStatusChange).toHaveBeenCalledWith('mock_category_id', 'mock_target',
                {
                    ids: ['mock_todo_id'],
                    byId: {
                        'mock_todo_id': {
                            name: 'mock_todo_name',
                            category: 'mock_category_id_parent',
                            details: 'mock_todo_details',
                            isCompleted: true
                        }
                    }
                });
        });
    });
});
