import categories from './../categories';

describe('categories', () => {
    const initialState = {
        ids: ['mock_id_parent', 'mock_id_child_1'],
        byId: {
            'mock_id_parent': {
                id: 'mock_id_parent',
                name: 'mock_value_parent',
                parentId: null,
                children: ['mock_id_child_1'],
                todos: [],
                isCompleted: true,
                isCollapsed: true
            },
            'mock_id_child_1': {
                id: 'mock_id_child_1',
                name: 'mock_value_child_1',
                parentId: 'mock_id_parent',
                children: [],
                todos: [],
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
    };

    let action = {};

    describe('initial state', () => {
        it('should return initial state', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    modalIsOpen: false,
                    currentCategoryId: null,
                    editing: false,
                    error: null,
                    newCategory: ''
                }
            };
            expect(categories(undefined, action)).toEqual(initialState);
        });
    });

    describe('unhandled action.type', () => {
        it('should return previous state', () => {
            const expected = {
                a: 5
            };
            action = {
                type: 'UNHANDLED'
            };

            expect(categories(expected, action)).toBe(expected);
        });
    });

    describe('action.type ADD_CATEGORY behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'ADD_CATEGORY',
                id: 'mock_id',
                value: 'mock_value',
                perentId: null
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle ADD_CATEGORY, if parentId was not passed', () => {
            const action = {
                type: 'ADD_CATEGORY',
                id: 'mock_id_child_2',
                value: 'mock_value_child_2',
                parentId: null
            };

            const expected = {
                ids: ['mock_id_child_2', 'mock_id_parent', 'mock_id_child_1'],
                byId: {
                    'mock_id_parent': {
                        id: 'mock_id_parent',
                        name: 'mock_value_parent',
                        parentId: null,
                        children: ['mock_id_child_1'],
                        todos: [],
                        isCompleted: true,
                        isCollapsed: true
                    },
                    'mock_id_child_1': {
                        id: 'mock_id_child_1',
                        name: 'mock_value_child_1',
                        parentId: 'mock_id_parent',
                        children: [],
                        todos: [],
                        isCompleted: true,
                        isCollapsed: true
                    },
                    'mock_id_child_2': {
                        id: 'mock_id_child_2',
                        name: 'mock_value_child_2',
                        parentId: null,
                        children: [],
                        todos: [],
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
            };

            expect(categories(initialState, action)).toEqual(expected);
        });

        it('should handle ADD_CATEGORY, if parentId was passed', () => {
            const action = {
                type: 'ADD_CATEGORY',
                id: 'mock_id_child_2',
                value: 'mock_value_child_2',
                parentId: 'mock_id_parent'
            };

            const expected = {
                ids: ['mock_id_child_2', 'mock_id_parent', 'mock_id_child_1'],
                byId: {
                    'mock_id_parent': {
                        id: 'mock_id_parent',
                        name: 'mock_value_parent',
                        parentId: null,
                        children: ['mock_id_child_2', 'mock_id_child_1'],
                        todos: [],
                        isCompleted: true,
                        isCollapsed: true
                    },
                    'mock_id_child_1': {
                        id: 'mock_id_child_1',
                        name: 'mock_value_child_1',
                        parentId: 'mock_id_parent',
                        children: [],
                        todos: [],
                        isCompleted: true,
                        isCollapsed: true
                    },
                    'mock_id_child_2': {
                        id: 'mock_id_child_2',
                        name: 'mock_value_child_2',
                        parentId: 'mock_id_parent',
                        children: [],
                        todos: [],
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
            };

            expect(categories(initialState, action)).toEqual(expected);
        });
    });

    describe('action.type EDIT_CATEGORY behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'EDIT_CATEGORY',
                id: 'mock_id',
                value: 'mock_value'
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle EDIT_CATEGORY', () => {
            const action = {
                type: 'EDIT_CATEGORY',
                id: 'mock_id_child_1',
                value: 'mock_value_new'
            };

            const expected = {
                'mock_id_parent': {
                    id: 'mock_id_parent',
                    name: 'mock_value_parent',
                    parentId: null,
                    children: ['mock_id_child_1'],
                    todos: [],
                    isCompleted: true,
                    isCollapsed: true
                },
                'mock_id_child_1': {
                    id: 'mock_id_child_1',
                    name: 'mock_value_new',
                    parentId: 'mock_id_parent',
                    children: [],
                    todos: [],
                    isCompleted: true,
                    isCollapsed: true
                }
            };

            expect(categories(initialState, action).byId).toEqual(expected);
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
                            todos: [],
                            isCompleted: true,
                            isCollapsed: true
                        }
                    },
                    ui: {}
                }
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle REMOVE_CATEGORY, when category does not have children', () => {
            const action = {
                type: 'REMOVE_CATEGORY',
                id: 'mock_id_child_1',
                categories: {
                    ids: ['mock_id_parent', 'mock_id_child_1'],
                    byId: {
                        'mock_id_parent': {
                            id: 'mock_id_parent',
                            name: 'mock_value_parent',
                            parentId: null,
                            children: ['mock_id_child_1'],
                            todos: [],
                            isCompleted: true,
                            isCollapsed: true
                        },
                        'mock_id_child_1': {
                            id: 'mock_id_child_1',
                            name: 'mock_value_child_1',
                            parentId: 'mock_id_parent',
                            children: [],
                            todos: [],
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
                ids: ['mock_id_parent'],
                byId: {
                    'mock_id_parent': {
                        id: 'mock_id_parent',
                        name: 'mock_value_parent',
                        parentId: null,
                        children: [],
                        todos: [],
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
            };

            expect(categories(initialState, action)).toEqual(expected);
        });

        it('should handle REMOVE_CATEGORY, when category has children', () => {
            const action = {
                type: 'REMOVE_CATEGORY',
                id: 'mock_id_parent',
                categories: {
                    ids: ['mock_id_parent', 'mock_id_child_1'],
                    byId: {
                        'mock_id_parent': {
                            id: 'mock_id_parent',
                            name: 'mock_value_parent',
                            parentId: null,
                            children: ['mock_id_child_1'],
                            todos: [],
                            isCompleted: true,
                            isCollapsed: true
                        },
                        'mock_id_child_1': {
                            id: 'mock_id_child_1',
                            name: 'mock_value_child_1',
                            parentId: 'mock_id_parent',
                            children: [],
                            todos: [],
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
                ids: [],
                byId: {},
                ui: {
                    modalIsOpen: false,
                    currentCategoryId: null,
                    editing: false,
                    error: null,
                    newCategory: ''
                }
            };

            expect(categories(initialState, action)).toEqual(expected);
        });
    });

    describe('action.type TOGGLE_CATEGORY behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'TOGGLE_CATEGORY',
                id: 'mock_id_parent',
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle TOGGLE_CATEGORY', () => {
            const action = {
                type: 'TOGGLE_CATEGORY',
                id: 'mock_id_parent',
            };

            const expected = {
                'mock_id_parent': {
                    id: 'mock_id_parent',
                    name: 'mock_value_parent',
                    parentId: null,
                    children: ['mock_id_child_1'],
                    todos: [],
                    isCompleted: true,
                    isCollapsed: false
                },
                'mock_id_child_1': {
                    id: 'mock_id_child_1',
                    name: 'mock_value_child_1',
                    parentId: 'mock_id_parent',
                    children: [],
                    todos: [],
                    isCompleted: true,
                    isCollapsed: true
                }
            };

            expect(categories(initialState, action).byId).toEqual(expected);
        });
    });

    describe('action.type CHANGE_CATEGORY_STATUS behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'CHANGE_CATEGORY_STATUS',
                categoryId: 'mock_id_parent',
                targetTodoId: 'todo_id',
                todos: {
                    ids: [],
                    byId: {},
                    ui: {}
                },
                newStatus: false,
                editing: false
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle CHANGE_CATEGORY_STATUS', () => {
            const action = {
                type: 'CHANGE_CATEGORY_STATUS',
                categoryId: 'mock_id_parent',
                targetTodoId: 'todo_id',
                todos: {
                    ids: ['mock_todo_id'],
                    byId: {
                        'mock_todo_id': {
                            name: 'mock_todo_name',
                            category: 'mock_id_parent',
                            details: 'This is a new category',
                            isCompleted: false
                        }
                    },
                    ui: {
                        error: null,
                        newCategory: ''
                    }
                },
                newStatus: false,
                editing: false
            };

            const expected = {
                'mock_id_parent': {
                    id: 'mock_id_parent',
                    name: 'mock_value_parent',
                    parentId: null,
                    children: ['mock_id_child_1'],
                    todos: [],
                    isCompleted: false,
                    isCollapsed: true
                },
                'mock_id_child_1': {
                    id: 'mock_id_child_1',
                    name: 'mock_value_child_1',
                    parentId: 'mock_id_parent',
                    children: [],
                    todos: [],
                    isCompleted: true,
                    isCollapsed: true
                }
            };

            expect(categories(initialState, action).byId).toEqual(expected);
        });
    });

    describe('action.type OPEN_MODAL behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'OPEN_MODAL',
                id: 'mock_id_1',
                editing: false
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle OPEN_MODAL, if is not being edited', () => {
            const action = {
                type: 'OPEN_MODAL',
                id: 'mock_id_1',
                editing: false
            };

            const expected = {
                modalIsOpen: true,
                currentCategoryId: 'mock_id_1',
                editing: false,
                error: null,
                newCategory: ''
            };

            expect(categories(initialState, action).ui).toEqual(expected);
        });

        it('should handle OPEN_MODAL, if is being edited', () => {
            const action = {
                type: 'OPEN_MODAL',
                id: 'mock_id_1',
                editing: true
            };

            const expected = {
                modalIsOpen: true,
                currentCategoryId: 'mock_id_1',
                editing: true,
                error: null,
                newCategory: ''
            };

            expect(categories(initialState, action).ui).toEqual(expected);
        });
    });

    describe('action.type CLOSE_MODAL behavior', () => {
        it('should return immutable state object', () => {
            expect(categories(initialState, {type: 'CLOSE_MODAL'})).not.toBe(initialState);
        });

        it('should handle CLOSE_MODAL', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    modalIsOpen: true,
                    currentCategoryId: null,
                    editing: false,
                    error: null,
                    newCategory: ''
                }
            };

            expect(categories(initialState, {type: 'CLOSE_MODAL'}).ui.modalIsOpen).toBe(false);
        });
    });

    describe('action.type SHOW_CATEGORY_ERROR behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'SHOW_CATEGORY_ERROR',
                message: 'mock_message'
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle SHOW_CATEGORY_ERROR', () => {
            const action = {
                type: 'SHOW_CATEGORY_ERROR',
                message: 'mock_message'
            };

            expect(categories(initialState, action).ui.error).toBe('mock_message');
        });
    });

    describe('action.type ADD_TODO behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'ADD_TODO',
                value: 'mock_todo',
                categoryId: 'mock_id_parent',
                id: 'mock_todo_id'
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle ADD_TODO', () => {
            const action = {
                type: 'ADD_TODO',
                value: 'mock_todo',
                categoryId: 'mock_id_parent',
                id: 'mock_todo_id'
            };

            const expected = {
                'mock_id_parent': {
                    id: 'mock_id_parent',
                    name: 'mock_value_parent',
                    parentId: null,
                    children: ['mock_id_child_1'],
                    todos: ['mock_todo_id'],
                    isCompleted: false,
                    isCollapsed: true
                },
                'mock_id_child_1': {
                    id: 'mock_id_child_1',
                    name: 'mock_value_child_1',
                    parentId: 'mock_id_parent',
                    children: [],
                    todos: [],
                    isCompleted: true,
                    isCollapsed: true
                }
            };

            expect(categories(initialState, action).byId).toEqual(expected);
        });
    });

    describe('action.type EDIT_TODO behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'EDIT_TODO',
                id: 'mock_todo_id',
                editedTodo: {
                    name: 'mock_name',
                    status: true,
                    details: 'mock_details',
                    category: 'mock_id_parent'
                }
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle EDIT_TODO, if newCategory was not chosen', () => {
            const action = {
                type: 'EDIT_TODO',
                id: 'mock_todo_id',
                editedTodo: {
                    name: 'mock_name',
                    status: true,
                    details: 'mock_details',
                    category: 'mock_id_parent'
                }
            };

            expect(categories(initialState, action)).toEqual(initialState);
        });

        it('should handle EDIT_TODO, if newCategory was chosen', () => {
            const action = {
                type: 'EDIT_TODO',
                id: 'mock_todo_id',
                oldCategory: 'mock_id_parent',
                editedTodo: {
                    name: 'mock_name',
                    status: true,
                    details: 'mock_details',
                    category: 'mock_id_parent'
                }
            };

            const initialState = {
                ids: ['mock_id_parent', 'mock_id_child_1'],
                byId: {
                    'mock_id_parent': {
                        id: 'mock_id_parent',
                        name: 'mock_value_parent',
                        parentId: null,
                        children: ['mock_id_child_1'],
                        todos: ['mock_todo_id'],
                        isCompleted: true,
                        isCollapsed: true
                    },
                    'mock_id_child_1': {
                        id: 'mock_id_child_1',
                        name: 'mock_value_child_1',
                        parentId: 'mock_id_parent',
                        children: [],
                        todos: [],
                        isCompleted: true,
                        isCollapsed: true
                    }
                },
                ui: {
                    modalIsOpen: false,
                    currentCategoryId: null,
                    editing: false,
                    error: null,
                    newCategory: 'mock_id_child_1'
                }
            };

            const expected = {
                ids: ['mock_id_parent', 'mock_id_child_1'],
                byId: {
                    'mock_id_parent': {
                        id: 'mock_id_parent',
                        name: 'mock_value_parent',
                        parentId: null,
                        children: ['mock_id_child_1'],
                        todos: [],
                        isCompleted: true,
                        isCollapsed: true
                    },
                    'mock_id_child_1': {
                        id: 'mock_id_child_1',
                        name: 'mock_value_child_1',
                        parentId: 'mock_id_parent',
                        children: [],
                        todos: ['mock_todo_id'],
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
            };

            expect(categories(initialState, action)).toEqual(expected);
        })
    });

    describe('action.type CHOOSE_NEW_CATEGORY behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'CHOOSE_NEW_CATEGORY',
                id: 'mock_id_2'
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle CHOOSE_NEW_CATEGORY', () => {
            const action = {
                type: 'CHOOSE_NEW_CATEGORY',
                id: 'mock_id_child_1'
            };

            expect(categories(initialState, action).ui.newCategory).toBe('mock_id_child_1');
        });
    });

    describe('action.type SHOW_TODO_ERROR behavior', () => {
        it('should return immutable state object', () => {
            const action = {
                type: 'SHOW_TODO_ERROR',
                message: 'mock_message'
            };

            expect(categories(initialState, action)).not.toBe(initialState);
        });

        it('should handle SHOW_TODO_ERROR', () => {
            const action = {
                type: 'SHOW_TODO_ERROR'
            };

            expect(categories(initialState, action).ui.error).toBe(null);
        });
    });

    describe('action.type CLEAR_ERROR behavior', () => {
        it('should return immutable state object', () => {
            expect(categories(initialState, {type: 'CLEAR_ERROR'})).not.toBe(initialState);
        });

        it('should handle CLEAR_ERROR', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    modalIsOpen: false,
                    currentCategoryId: null,
                    editing: false,
                    error: null,
                    newCategory: 'mock_message'
                }
            };

            expect(categories(initialState, {type: 'CLEAR_ERROR'}).ui.error).toBe(null);
        });
    });

    describe('action.type INPUT_CHANGE behavior', () => {
        it('should return immutable state object', () => {
            expect(categories(initialState, {type: 'INPUT_CHANGE'})).not.toBe(initialState);
        });

        it('should handle INPUT_CHANGE', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    modalIsOpen: false,
                    currentCategoryId: null,
                    editing: false,
                    error: 'mock_message',
                    newCategory: ''
                }
            };

            expect(categories(initialState, {type: 'INPUT_CHANGE'}).ui.error).toBe(null);
        });
    });

    describe('action.type HANDLE_ROUTE_CHANGE behavior', () => {
        it('should return immutable state object', () => {
            expect(categories(initialState, {type: 'HANDLE_ROUTE_CHANGE'})).not.toBe(initialState);
        });

        it('should handle HANDLE_ROUTE_CHANGE', () => {
            const initialState = {
                ids: [],
                byId: {},
                ui: {
                    modalIsOpen: true,
                    currentCategoryId: null,
                    editing: false,
                    error: 'mock_message',
                    newCategory: ''
                }
            };

            const expected = {
                ids: [],
                byId: {},
                ui: {
                    modalIsOpen: false,
                    currentCategoryId: null,
                    editing: false,
                    error: null,
                    newCategory: ''
                }
            };

            expect(categories(initialState, {type: 'HANDLE_ROUTE_CHANGE'})).toEqual(expected);
        });
    });
});