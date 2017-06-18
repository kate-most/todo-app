import todoApp from './../index';
import { combineReducers } from 'redux';

jest.mock('redux');

describe('todoApp', () => {
    it('should call combineReducers', () => {
        expect(combineReducers).toHaveBeenCalled();
    });
});