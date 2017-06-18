import * as actions from './../search.js';

describe('search-actions', () => {
    describe('#changeSearchName', () => {
        const name = 'mock_name';

        it('should return an action with passed name', () => {
            const action = actions.changeSearchName(name);
            const expected = {
                type: 'CHANGE_SEARCH_NAME',
                name: 'mock_name'
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#changeSearchStatus', () => {
        it('should return an action with a proper type', () => {
            const action = actions.changeSearchStatus();
            const expected = {
                type: 'CHANGE_SEARCH_STATUS'
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#clearSearchName', () => {
        it('should return an action with a proper type', () => {
            const action = actions.clearSearchName();
            const expected = {
                type: 'CLEAR_SEARCH_NAME'
            };

            expect(action).toEqual(expected);
        });
    });
});