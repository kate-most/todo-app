import * as actions from './../common.js';

describe('common-actions', () => {
    describe('#openModal', () => {
        const id = 'mock_id';
        const editing = true;

        it('should return an action with passed id and editing', () => {
            const action = actions.openModal(id, editing);
            const expected = {
                type: 'OPEN_MODAL',
                id: 'mock_id',
                editing: true
            };

            expect(action).toEqual(expected);
        });

        it('should return an action with editing equal to false if it was not passed', () => {
            const action = actions.openModal(id, undefined);
            const expected = {
                type: 'OPEN_MODAL',
                id: 'mock_id',
                editing: false
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#closeModal', () => {
        it('should return an action with a proper type', () => {
            const action = actions.closeModal();
            const expected = {
                type: 'CLOSE_MODAL'
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#clearError', () => {
        it('should return an action with a proper type', () => {
            const action = actions.clearError();
            const expected = {
                type: 'CLEAR_ERROR'
            };

            expect(action).toEqual(expected);
        });
    });

    describe('#handleRouteChange', () => {
        it('should return an action with a proper type', () => {
            const action = actions.handleRouteChange();
            const expected = {
                type: 'HANDLE_ROUTE_CHANGE'
            };

            expect(action).toEqual(expected);
        });
    });
});