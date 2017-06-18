import todos from './../todos';

describe('todos', () => {
    const initialState = {
        ids: ['mock_id_1', 'mock_id_2'],
        byId: {
            'mock_id_1': {
                name: 'mock_name_1',
                category: 'mock_category',
                details: 'mock_details',
                isCompleted: false
            },
            'mock_id_2': {
                name: 'mock_name_2',
                category: 'mock_category',
                details: 'mock_details',
                isCompleted: false
            }
        },
        ui: {
            error: null,
            newCategory: ''
        }
    };

    let action = {};

    describe('initial state', () => {
        it('should return initial state', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    error: null,
                    newCategory: ''
                }
            };
            expect(todos(undefined, action)).toEqual(initialState);
        });
    });

    describe('unhandled action.type', () => {
        it('should return previous state', () => {
            const expected = {
                ids: [],
                byId: {},
                ui: {
                    error: null,
                    newCategory: ''
                }
            };
            action = {
                type: 'UNHANDLED'
            };

            expect(todos(expected, action)).toBe(expected);
        });
    });

    describe('action.type ADD_TODO behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'ADD_TODO',
                value: 'mock_value',
                categoryId: 'mock_category_id',
                id: 'mock_id'
            };

            expect(todos(initialState, action)).not.toBe(initialState);
        });

        it('should handle ADD_TODO', () => {
            const action = {
                type: 'ADD_TODO',
                value: 'mock_value',
                categoryId: 'mock_category_id',
                id: 'mock_id'
            };

            const expected = {
                ids: ['mock_id_1', 'mock_id_2', 'mock_id'],
                byId: {
                    'mock_id_1': {
                        name: 'mock_name_1',
                        category: 'mock_category',
                        details: 'mock_details',
                        isCompleted: false
                    },
                    'mock_id_2': {
                        name: 'mock_name_2',
                        category: 'mock_category',
                        details: 'mock_details',
                        isCompleted: false
                    },
                    'mock_id': {
                        name: 'mock_value',
                        category: 'mock_category_id',
                        details: 'This is a new category',
                        isCompleted: false
                    }
                },
                ui: {
                    error: null,
                    newCategory: ''
                }
            };

            expect(todos(initialState, action)).toEqual(expected);
        });
    });

    describe('action.type SHOW_TODO_ERROR behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'SHOW_TODO_ERROR',
                message: 'mock_message'
            };

            expect(todos(initialState, action)).not.toBe(initialState);
        });

        it('should handle SHOW_TODO_ERROR', () => {
            const action = {
                type: 'SHOW_TODO_ERROR',
                message: 'mock_message'
            };

            expect(todos(initialState, action).ui.error).toBe('mock_message');
        });
    });

    describe('action.type CHANGE_TODO_STATUS behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'CHANGE_TODO_STATUS',
                id: 'mock_id_1',
            };

            expect(todos(initialState, action)).not.toBe(initialState);
        });

        it('should handle CHANGE_TODO_STATUS', () => {
            const action = {
                type: 'CHANGE_TODO_STATUS',
                id: 'mock_id_1',
            };

            const expected = {
                'mock_id_1': {
                    name: 'mock_name_1',
                    category: 'mock_category',
                    details: 'mock_details',
                    isCompleted: true
                },
                'mock_id_2': {
                    name: 'mock_name_2',
                    category: 'mock_category',
                    details: 'mock_details',
                    isCompleted: false
                }
            };

            expect(todos(initialState, action).byId).toEqual(expected);
        });
    });

    describe('action.type CHOOSE_NEW_CATEGORY behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'CHOOSE_NEW_CATEGORY',
                id: 'mock_id_category'
            };

            expect(todos(initialState, action)).not.toBe(initialState);
        });

        it('should handle CHOOSE_NEW_CATEGORY', () => {
            const action = {
                type: 'CHOOSE_NEW_CATEGORY',
                id: 'mock_id_category'
            };

            expect(todos(initialState, action).ui.newCategory).toBe('mock_id_category');
        });
    });

    describe('action.type REMOVE_CATEGORY behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'REMOVE_CATEGORY',
                id: 'mock_id_1',
                categories: {
                    ids: ['mock_id_1'],
                    byId: {
                        'mock_id_1': {
                            id: 'mock_id_1',
                            name: 'mock_value_1',
                            parentId: null,
                            children: [],
                            todos: ['mock_id_1'],
                            isCompleted: true,
                            isCollapsed: true
                        }
                    },
                    ui: {}
                }
            };

            expect(todos(initialState, action)).not.toBe(initialState);
        });

        it('should handle REMOVE_CATEGORY', () => {
            const action = {
                type: 'REMOVE_CATEGORY',
                id: 'mock_id_parent',
                categories: {
                    ids: ['mock_id_parent'],
                    byId: {
                        'mock_id_parent': {
                            id: 'mock_id_parent',
                            name: 'mock_value_parent',
                            parentId: null,
                            children: [],
                            todos: ['mock_id_1'],
                            isCompleted: true,
                            isCollapsed: true
                        }
                    },
                    ui: {
                        modalIsOpen: false,
                        currentCategoryId: null,
                        editing: false,
                        error: null,
                        newCategory: ''
                    }
                }
            };

            const expected = {
                ids: ['mock_id_2'],
                byId: {
                    'mock_id_2': {
                        name: 'mock_name_2',
                        category: 'mock_category',
                        details: 'mock_details',
                        isCompleted: false
                    }
                },
                ui: {
                    error: null,
                    newCategory: ''
                }
            };

            expect(todos(initialState, action)).toEqual(expected);
        });
    });

    describe('action.type EDIT_TODO behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'EDIT_TODO',
                id: 'mock_id_1',
                editedTodo: {
                    name: 'mock_name',
                    status: true,
                    details: 'mock_details',
                    category: 'mock_id_catrgory'
                }
            };

            expect(todos(initialState, action)).not.toBe(initialState);
        });

        it('should handle EDIT_TODO, if newCategory was not chosen', () => {
            const action = {
                type: 'EDIT_TODO',
                id: 'mock_id_1',
                editedTodo: {
                    name: 'mock_name_edited',
                    status: true,
                    details: 'mock_details_edited'
                }
            };

            const expected = {
                'mock_id_1': {
                    name: 'mock_name_edited',
                    category: 'mock_category',
                    details: 'mock_details_edited',
                    isCompleted: true
                },
                'mock_id_2': {
                    name: 'mock_name_2',
                    category: 'mock_category',
                    details: 'mock_details',
                    isCompleted: false
                }
            };

            expect(todos(initialState, action).byId).toEqual(expected);
        });

        it('should handle EDIT_TODO, if newCategory was chosen', () => {
            const action = {
                type: 'EDIT_TODO',
                id: 'mock_id_1',
                editedTodo: {
                    name: 'mock_name_edited',
                    status: true,
                    details: 'mock_details_edited'
                }
            };

            const initialState = {
                ids: ['mock_id_1', 'mock_id_2'],
                byId: {
                    'mock_id_1': {
                        name: 'mock_name_1',
                        category: 'mock_category',
                        details: 'mock_details',
                        isCompleted: false
                    },
                    'mock_id_2': {
                        name: 'mock_name_2',
                        category: 'mock_category',
                        details: 'mock_details',
                        isCompleted: false
                    }
                },
                ui: {
                    error: null,
                    newCategory: 'mock_category_new'
                }
            };

            const expected = {
                'mock_id_1': {
                    name: 'mock_name_edited',
                    category: 'mock_category_new',
                    details: 'mock_details_edited',
                    isCompleted: true
                },
                'mock_id_2': {
                    name: 'mock_name_2',
                    category: 'mock_category',
                    details: 'mock_details',
                    isCompleted: false
                }
            };

            expect(todos(initialState, action).byId).toEqual(expected);
        });
    });

    describe('action.type OPEN_MODAL behavior', () => {
        it('should return immutable state object', () => {
            expect(todos(initialState, {type: 'OPEN_MODAL'})).not.toBe(initialState);
        });

        it('should handle OPEN_MODAL', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    error: 'mock_error',
                    newCategory: ''
                }
            };

            expect(todos(initialState, {type: 'OPEN_MODAL'}).ui.error).toBe(null);
        });
    });

    describe('action.type HANDLE_ROUTE_CHANGE behavior', () => {
        it('should return immutable state object', () => {
            expect(todos(initialState, {type: 'HANDLE_ROUTE_CHANGE'})).not.toBe(initialState);
        });

        it('should handle HANDLE_ROUTE_CHANGE', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    error: 'mock_error',
                    newCategory: ''
                }
            };

            expect(todos(initialState, {type: 'HANDLE_ROUTE_CHANGE'}).ui.error).toBe(null);
        });
    });

    describe('action.type INPUT_CHANGE behavior', () => {
        it('should return immutable state object', () => {
            expect(todos(initialState, {type: 'INPUT_CHANGE'})).not.toBe(initialState);
        });

        it('should handle INPUT_CHANGE', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    error: 'mock_error',
                    newCategory: ''
                }
            };

            expect(todos(initialState, {type: 'INPUT_CHANGE'}).ui.error).toBe(null);
        });
    });

    describe('action.type SHOW_CATEGORY_ERROR behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'SHOW_CATEGORY_ERROR',
                message: 'mock_message'
            };

            expect(todos(initialState, action)).not.toBe(initialState);
        });

        it('should handle SHOW_CATEGORY_ERROR', () => {
            const action = {
                type: 'SHOW_CATEGORY_ERROR'
            };

            expect(todos(initialState, action).ui.error).toBe(null);
        });
    });

    describe('action.type CLEAR_ERROR behavior', () => {
        it('should return immutable state object', () => {
            expect(todos(initialState, {type: 'HANDLE_ROUTE_CHANGE'})).not.toBe(initialState);
        });

        it('should handle HANDLE_ROUTE_CHANGE', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    error: 'mock_error',
                    newCategory: ''
                }
            };

            const expected = {
                ids: [],
                byId: {},
                ui: {
                    error: null,
                    newCategory: ''
                }
            };

            expect(todos(initialState, {type: 'HANDLE_ROUTE_CHANGE'})).toEqual(expected);
        });
    });
});