import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import Header from './../header';

describe('<Header />', () => {

    let wrapper;

    beforeEach(() => {
        setup();
    });

    function setup() {
        wrapper = shallow(<Header />);
    }

    describe('#render', () => {
        it('should have h1 tag', () => {
            expect(wrapper.find('h1').length).toBe(1);
        });

        it('should contain <Link />', () => {
            expect(wrapper.find(Link).length).toBe(1);
        });

        it('should have <Link /> with proper to prop', () => {
            const link = wrapper.find(Link);

            expect(link.prop('to')).toBe('/');
        });
    });
});
