import React from 'react';
import { shallow } from 'enzyme';
import Error from './../error';

describe('<Error />', () => {

    let wrapper, props;

    beforeEach(() => {
        setup();
    });

    function setup() {
        props = {
            error: 'mock_error'
        };

        wrapper = shallow(<Error {...props} />);
    }

    describe('#render', () => {
        it('should have h2 tag', () => {
            expect(wrapper.find('h2').length).toBe(1);
        });

        it('should have h4 tag with error message', () => {
            expect(wrapper.find('h4').text()).toBe('mock_error');
        });
    });
});
