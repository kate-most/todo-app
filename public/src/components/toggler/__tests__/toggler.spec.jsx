import React from 'react';
import { shallow } from 'enzyme';
import Toggler from './../toggler';

describe('<Toggler />', () => {

    const props = {
        id: 'mock_id',
        isCollapsed: true,
        toggleCategory: jest.fn()
    };

    describe('#render', () => {
        it('should have button tag', () => {
            const wrapper = shallow(<Toggler {...props} />);

            expect(wrapper.find('button').length).toBe(1);
        });
    });

    describe('#events', () => {
        it('should call toggleCategory with passed value', () => {
            const wrapper = shallow(<Toggler {...props} />);

            wrapper.simulate('click', {});

            expect(props.toggleCategory).toHaveBeenCalledWith('mock_id');
        });

        it('should change title value to ellapse if it was collapsed', () => {
            const wrapper = shallow(<Toggler {...props} />);

            wrapper.simulate('click', {});

            expect(wrapper.prop('title')).toBe('ellapse');
        });


        it('should change title value to collapse if it was ellapsed', () => {
            const wrapper = shallow(<Toggler {...props} isCollapsed={false}/>);

            wrapper.simulate('click', {});

            expect(wrapper.prop('title')).toBe('collapse');

        });
    });
});