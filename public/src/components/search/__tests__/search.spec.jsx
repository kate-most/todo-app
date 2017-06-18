jest.mock('./search.scss', () => ({inputClose: 'input-close'}));
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import Search from './../search';

describe('<Search />', () => {

    let wrapper, props;

    beforeEach(() => {
        setup();
    });

    function setup() {
        props = {
            params: {
                category: 'mock_category'
            },
            searchParams: {
                name: 'mock_name',
                onlyCompleted: false
            },
            changeSearchName: jest.fn(),
            changeSearchStatus: jest.fn(),
            clearSearchName: jest.fn(),
            clearError: jest.fn()
        };

        wrapper = shallow(<Search {...props} />);
    }

    describe('#render', () => {
        it('should have input of type checkbox', () => {
            expect(wrapper.find('input[type="checkbox"]').length).toBe(1);
        });

        it('should have input of type text', () => {
            expect(wrapper.find('input[type="text"]').length).toBe(1);
        });

        it('should have button of class input-close', () => {
            expect(wrapper.find('.input-close').length).toBe(1);
        });

        it('should contain <Link />', () => {
            expect(wrapper.find(Link).length).toBe(1);
        });

        it('should have <Link /> with proper to prop', () => {
            const expected = 'mock_category?name=mock_name&completed=false';
            const link = wrapper.find(Link);

            expect(link.prop('to')).toBe(expected);
        });
    });

    describe('#events', () => {
        it('should call changeSearchStatus on changing checkbox', () => {
            const checkbox = wrapper.find('input[type="checkbox"]');

            checkbox.simulate('change', {});

            expect(props.changeSearchStatus).toHaveBeenCalled();
        });

        it('should call clearError on changing checkbox', () => {
            const checkbox = wrapper.find('input[type="checkbox"]');

            checkbox.simulate('change', {});

            expect(props.clearError).toHaveBeenCalled();
        });

        it('should call changeSearchName on text input change with passed value', () => {
            const textInput = wrapper.find('input[type="text"]');

            textInput.simulate('change', {target: {value: 'mock_value'}});

            expect(props.changeSearchName).toHaveBeenCalledWith('mock_value');
        });

        it('should call clearError on text input change', () => {
            const textInput = wrapper.find('input[type="text"]');

            textInput.simulate('change', {target: {value: 'mock_value'}});

            expect(props.clearError).toHaveBeenCalled();
        });

        it('should call clearSearchName on button of class input-close click', () => {
            const button = wrapper.find('.input-close');

            button.simulate('click', {});

            expect(props.clearSearchName).toHaveBeenCalled();
        });

        it('should call clearError on button of class input-close click', () => {
            const button = wrapper.find('.input-close');

            button.simulate('click', {});

            expect(props.clearError).toHaveBeenCalled();
        });
    });
});
