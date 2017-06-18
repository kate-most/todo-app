import * as actions from './../todos.js';
import uuidv4 from 'uuid/v4';

jest.mock('uuid/v4', () => jest.fn(() => 'mock_id'));

describe('todos-action', () => {
    describe('#addTodo', () => {
        const value = 'mock_value';
        const categoryId = 'mock_category_id';

        it('should call uuidv4', () => {
            actions.addTodo(value, categoryId);

            expect(uuidv4).toHaveBeenCalled();
        });

        it('should return an action with passed value and categoryId', () => {
            const action = actions.addTodo(value, categoryId);
            const expected = {
                type: 'ADD_TODO',
                value: 'mock_value',
                categoryId: 'mock_category_id',
                id: 'mock_id'
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#editTodo', () => {
        const id = 'mock_id';
        const editedTodo = {
            name: 'mock_name',
            status: true,
            details: 'mock_details',
            category: 'mock_old_category'
        };

        it('should return an action with passed properties', () => {
            const action = actions.editTodo(id, editedTodo);
            const expected = {
                type: 'EDIT_TODO',
                id: 'mock_id',
                editedTodo: {
                    name: 'mock_name',
                    status: true,
                    details: 'mock_details',
                    category: 'mock_old_category'
                }
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#handleTodoStatusChange', () => {
        const id = 'mock_id';

        it('should return an action with passed id', () => {
            const action = actions.handleTodoStatusChange(id);
            const expected = {
                type: 'CHANGE_TODO_STATUS',
                id: 'mock_id'
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#handleTodoErrors', () => {
        const message = 'mock_message';

        it('should return an action with passed message', () => {
            const action = actions.handleTodoErrors(message);
            const expected = {
                type: 'SHOW_TODO_ERROR',
                message: 'mock_message'
            };

            expect(action).toEqual(expected);
        });

        it('should return an action with message equal to empty string if it was not passed', () => {
            const action = actions.handleTodoErrors(undefined);
            const expected = {
                type: 'SHOW_TODO_ERROR',
                message: ''
            };

            expect(action).toEqual(expected);
        });
    });
});