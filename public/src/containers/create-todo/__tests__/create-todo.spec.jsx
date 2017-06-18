import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateTodo } from './../create-todo';

describe('<CreateTodo />', () => {

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
            addTodo: jest.fn(),
            handleTodoErrors: jest.fn(),
            clearError: jest.fn()
        };

        wrapper = shallow(<CreateTodo {...props} />);
    }

    describe('#render', () => {
        it('should render a form', () => {
            expect(wrapper.find('form').length).toBe(1);
        });

        it('should render an input of type text', () => {
            expect(wrapper.find('input[type="text"]').length).toBe(1);
        });


        it('should render a button of type submit', () => {
            expect(wrapper.find('button[type="submit"]').length).toBe(1);
        });
    });

    describe('#events', () => {
        it('should call clearError on text input change', () => {
            const input = wrapper.find('input[type="text"]');

            input.simulate('change', {});

            expect(props.clearError).toHaveBeenCalled();
        });

        it('should call preventDefault on form submit', () => {
            const wrapper = mount(<CreateTodo {...props} />);
            const form = wrapper.find('form');
            const preventDefault = jest.fn();

            form.simulate('submit', {preventDefault});

            expect(preventDefault).toHaveBeenCalled();
        });

        it('should call handleTodoErrors on form submit', () => {
            const wrapper = mount(<CreateTodo {...props} />);
            const form = wrapper.find('form');
            const preventDefault = jest.fn();

            form.simulate('submit', {preventDefault, target: {value: 'mock'}});

            expect(props.handleTodoErrors).toHaveBeenCalled();
        });
    });
});
