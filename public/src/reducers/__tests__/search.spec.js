import search from './../search';

describe('search', () => {
    const initialState = {};
    let action = {};

    describe('initial state', () => {
        it('should return initial state', () => {
            expect(search(undefined, action)).toEqual(initialState);
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

            expect(search(expected, action)).toBe(expected);
        });
    });

    describe('action.type CHANGE_SEARCH_STATUS behavior', () => {
        it('should return immutable state object', () => {
            expect(search(initialState, {
                type: 'CHANGE_SEARCH_STATUS'
            })).not.toBe(initialState);
        });

        it('should switch onlyCompleted prop from falsy to true', () => {
            expect(search(initialState, {
                type: 'CHANGE_SEARCH_STATUS'
            }).onlyCompleted).toBe(true);
        });

        it('should switch onlyCompleted prop from true to false', () => {
            expect(search({
                onlyCompleted: true
            }, {
                type: 'CHANGE_SEARCH_STATUS'
            }).onlyCompleted).toBe(false);
        });
    });

    describe('action.type CHANGE_SEARCH_NAME behavior', () => {
        it('should return immutable state object', () => {
            expect(search(initialState, {
                type: 'CHANGE_SEARCH_NAME'
            })).not.toBe(initialState);
        });

        it('should set search name prop', () => {
            expect(search(initialState, {
                type: 'CHANGE_SEARCH_NAME',
                name: 'mock_name'
            }).name).toBe('mock_name');
        });
    });

    describe('action.type CLEAR_SEARCH_NAME behavior', () => {
        it('should return immutable state object', () => {
            expect(search(initialState, {
                type: 'CLEAR_SEARCH_NAME'
            })).not.toBe(initialState);
        });

        it('should clear search name prop', () => {
            expect(search(initialState, {
                type: 'CLEAR_SEARCH_NAME'
            }).name).toBe('');
        });
    });

    describe('action.type HANDLE_ROUTE_CHANGE behavior', () => {
        it('should return immutable state object', () => {
            expect(search(initialState, {
                type: 'HANDLE_ROUTE_CHANGE'
            })).not.toBe(initialState);
        });

        it('should clear search name prop', () => {
            const expected = {
                name: '',
                onlyCompleted: false
            };

            expect(search(initialState, {
                type: 'HANDLE_ROUTE_CHANGE'
            })).toEqual(expected);
        });
    });
});
