import * as actions from './../categories.js';
import uuidv4 from 'uuid/v4';

jest.mock('uuid/v4', () => jest.fn(() => 'mock_id'));

describe('categories-actions', () => {
    describe('#addCategory', () => {
        const value = 'mock_value';
        const parentId = 'mock_parent_id';

        it('should call uuidv4', () => {
            actions.addCategory(value, parentId);

            expect(uuidv4).toHaveBeenCalled();
        });

        it('should return an action with passed value and parentId', () => {
            const action = actions.addCategory(value, parentId);
            const expected = {
                type: 'ADD_CATEGORY',
                value: 'mock_value',
                parentId: 'mock_parent_id',
                id: 'mock_id'
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#editCategory', () => {
        const value = 'mock_value';
        const id = 'mock_id';

        it('should return an action with passed value and id', () => {
            const action = actions.editCategory(value, id);
            const expected = {
                type: 'EDIT_CATEGORY',
                value: 'mock_value',
                id: 'mock_id'
            };

            expect(action).toEqual(expected);
        })
    });

    describe('#removeCategory', () => {
        const id = 'mock_id';
        const categories = {
            ids: ['mock_category_id'],
            byId: {
                'mock_category_id': {
                    name: 'mock_category',
                    id: 'mock_category_id',
                    parentId: 'mock_category_parent_id',
                    children: [],
                    todos: [],
                    isCompleted: true,
                    isCollapsed: true
                }
            },
            ui: {}
        };

        it('should return an action with passed properties', () => {
            const action = actions.removeCategory(id, categories);
            const expected = {
                type: 'REMOVE_CATEGORY',
                id: 'mock_id',
                categories: {
                    ids: ['mock_category_id'],
                    byId: {
                        'mock_category_id': {
                            name: 'mock_category',
                            id: 'mock_category_id',
                            parentId: 'mock_category_parent_id',
                            children: [],
                            todos: [],
                            isCompleted: true,
                            isCollapsed: true
                        }
                    },
                    ui: {}
                }
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#toggleCategory', () => {
        const id = 'mock_id';

        it('should return an action with passed id', () => {
            const action = actions.toggleCategory(id);
            const expected = {
                type: 'TOGGLE_CATEGORY',
                id: 'mock_id'
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#handleCategoryStatusChange', () => {
        const categoryId = 'mock_category_id';
        const targetTodoId = 'mock_todo_id';
        const todos = ['mock_todo'];
        const newStatus = true;
        const editing = true;

        it('should return an action with passed properties', () => {
            const action = actions.handleCategoryStatusChange(categoryId, targetTodoId, todos, newStatus, editing);
            const expected = {
                type: 'CHANGE_CATEGORY_STATUS',
                categoryId: 'mock_category_id',
                targetTodoId: 'mock_todo_id',
                todos: ['mock_todo'],
                newStatus: true,
                editing: true
            };

            expect(action).toEqual(expected);
        });

        it('should return an action with editing equal to false if it was not passed', () => {
            const action = actions.handleCategoryStatusChange(categoryId, targetTodoId, todos, newStatus, undefined);

            const expected = {
                type: 'CHANGE_CATEGORY_STATUS',
                categoryId: 'mock_category_id',
                targetTodoId: 'mock_todo_id',
                todos: ['mock_todo'],
                newStatus: true,
                editing: false
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#handleChooseNewCategory', () => {
        const id = 'mock_id';

        it('should return an action with passed id', () => {
            const action = actions.handleChooseNewCategory(id);
            const expected = {
                type: 'CHOOSE_NEW_CATEGORY',
                id: 'mock_id'
            };

            expect(action).toEqual(expected);
        });

        it('should return an action with id equal to empty string if it was not passed', () => {
            const action = actions.handleChooseNewCategory(undefined);
            const expected = {
                type: 'CHOOSE_NEW_CATEGORY',
                id: ''
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#handleCategoryErrors', () => {
        const message = 'mock_message';

        it('should return an action with passed message', () => {
            const action = actions.handleCategoryErrors(message);
            const expected = {
                type: 'SHOW_CATEGORY_ERROR',
                message: 'mock_message'
            };

            expect(action).toEqual(expected);
        });

        it('should return an action with message equal to empty string if it was not passed', () => {
            const action = actions.handleCategoryErrors(undefined);
            const expected = {
                type: 'SHOW_CATEGORY_ERROR',
                message: ''
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#handleCategoryInputChange', () => {
        it('should return an action with a proper type', () => {
            const action = actions.handleCategoryInputChange();
            const expected = {
                type: 'INPUT_CHANGE'
            };

            expect(action).toEqual(expected);
        });
    });
});
