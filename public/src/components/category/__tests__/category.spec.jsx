jest.mock('./category.scss', () => ({
    buttonMove: 'button-move',
    buttonEdit: 'button-edit',
    buttonRemove: 'button-remove',
    buttonCreate: 'button-create'
}));
import React from 'react';
import { shallow } from 'enzyme';
import Category from './../category';
import Toggler from './../../toggler/toggler';
import CategoriesList from './../../categories-list/categories-list';
import { Link } from 'react-router';

describe('<Category />', () => {

    let props, wrapper;

    beforeEach(() => {
        setup();
    });

    function setup() {
        props = {
            params: {
                category: 'mock_category_id_child',
                todo: 'mock_todo_id'
            },
            id: 'mock_category_id_parent',
            categories: {
                ids: ['mock_category_id_parent', 'mock_category_id_parent_1', 'mock_category_id_child', 'mock_category_id_child_1'],
                byId: {
                    'mock_category_id_parent': {
                        name: 'mock_category_name',
                        id: 'mock_category_id_parent',
                        parentId: '',
                        children: ['mock_category_id_child'],
                        isCompleted: true,
                        isCollapsed: false,
                        todos: ['mock_todo_id']
                    },
                    'mock_category_id_child': {
                        name: 'mock_category_name',
                        id: 'mock_category_id_child',
                        parentId: 'mock_category_id_parent',
                        children: [],
                        isCompleted: true,
                        isCollapsed: true,
                        todos: []
                    },
                    'mock_category_id_parent_1': {
                        name: 'mock_category_name',
                        id: 'mock_category_id_parent_1',
                        parentId: '',
                        children: ['mock_category_id_child_1'],
                        isCompleted: true,
                        isCollapsed: true,
                        todos: []
                    },
                    'mock_category_id_child_1': {
                        name: 'mock_category_name',
                        id: 'mock_category_id_child_1',
                        parentId: 'mock_category_id_parent_1',
                        children: [],
                        isCompleted: true,
                        isCollapsed: true,
                        todos: []
                    }
                },
                ui: {
                    editing: true,
                    modalIsOpen: false,
                    currentCategoryId: 'mock_category_id_parent',
                    error: 'mock_category_error'
                }
            },
            todos: {
                ids: ['mock_todo_id'],
                byId: {
                    'mock_todo_id': {
                        name: 'mock_todo_name',
                        category: 'mock_category_id_parent',
                        details: 'mock_todo_details',
                        isCompleted: true
                    }
                },
                ui: {
                    error: 'mock_todo_error',
                    newCategory: 'mock_category_id_child'
                }
            },
            toggleCategory: jest.fn(),
            removeCategory: jest.fn(),
            openModal: jest.fn(),
            handleChooseNewCategory: jest.fn()
        };

        wrapper = shallow(<Category {...props} />);
    }

    describe('#render', () => {
        it('should render <Toggler /> if category has children', () => {
            expect(wrapper.find(Toggler).length).toBe(1);
        });

        it('should not render <Toggler /> if category has no children', () => {
            const wrapper = shallow(<Category {...props} id='mock_category_id_child'/>);

            expect(wrapper.find(Toggler).length).toBe(0);
        });

        it('should render h4 tag', () => {
            expect(wrapper.find('h4').length).toBe(1);
        });

        it('should contain <Link />', () => {
           expect(wrapper.find(Link).length).toBe(1);
        });

        it('should have <Link /> with proper to prop', () => {
            const expected = '/mock_category_id_parent';
            const link = wrapper.find(Link);

            expect(link.prop('to')).toBe(expected);
        });

        it('should render <CategoriesList /> if category has children and is not collapsed', () => {
            expect(wrapper.find(CategoriesList).length).toBe(1);
        });

        it('should not render <CategoriesList /> if category has no children', () => {
            const wrapper = shallow(<Category {...props} id='mock_category_id_child'/>);

            expect(wrapper.find(CategoriesList).length).toBe(0);
        });

        it('should not render <CategoriesList /> if category is collapsed', () => {
            const wrapper = shallow(<Category {...props} id='mock_category_id_parent_1'/>);

            expect(wrapper.find(CategoriesList).length).toBe(0);
        });

        it('should render move button if todo exists, is being edited and does not belong to current category', () => {
            expect(wrapper.find('.button-move').length).toBe(1);
        });

        it('should not render buttons if todo exists, is being edited but belongs to current category', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    category: 'mock_category_id_parent'
                }
            };
            const wrapper = shallow(<Category {...props}/>);

            expect(wrapper.find('button').length).toBe(0);
        });

        it('should render CRUD buttons if todo does not exist', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    todo: ''
                }
            };
            const wrapper = shallow(<Category {...props}/>);

            expect(wrapper.find('button').length).toBe(3);
        });

        it('should render CRUD buttons if todo is not edited', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    todo: 'mock_todo_id_undefined'
                }
            };
            const wrapper = shallow(<Category {...props}/>);

            expect(wrapper.find('button').length).toBe(3);
        })
    });

    describe('#events', () => {
        it('should call handleChooseNewCategory with passed id on button-move click', () => {
            const button = wrapper.find('.button-move');

            button.simulate('click', {});

            expect(props.handleChooseNewCategory).toHaveBeenCalledWith('mock_category_id_parent');
        });

        it('should call openModal with passed id and true flag on button-edit click', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    todo: ''
                }
            };
            const wrapper = shallow(<Category {...props}/>);
            const button = wrapper.find('.button-edit');

            button.simulate('click', {});

            expect(props.openModal).toHaveBeenCalledWith('mock_category_id_parent', true);
        });

        it('should call openModal with passed id on button-create click', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    todo: ''
                }
            };
            const wrapper = shallow(<Category {...props}/>);
            const button = wrapper.find('.button-create');

            button.simulate('click', {});

            expect(props.openModal).toHaveBeenCalledWith('mock_category_id_parent');
        });

        it('should call confirm function on button-remove click', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    todo: ''
                }
            };
            const wrapper = shallow(<Category {...props}/>);
            const button = wrapper.find('.button-remove');
            window.confirm = jest.fn();

            button.simulate('click', {});

            expect(confirm).toHaveBeenCalled();
        });

        it('should call removeCategory function with passed id and categories, if confirm returned true', () => {
            props = {
                ...props,
                params: {
                    ...props.params,
                    todo: ''
                }
            };
            const wrapper = shallow(<Category {...props}/>);
            const button = wrapper.find('.button-remove');
            const expectedCategoriesArgument = {
                ids: ['mock_category_id_parent', 'mock_category_id_parent_1', 'mock_category_id_child', 'mock_category_id_child_1'],
                    byId: {
                    'mock_category_id_parent': {
                        name: 'mock_category_name',
                            id: 'mock_category_id_parent',
                            parentId: '',
                            children: ['mock_category_id_child'],
                            isCompleted: true,
                            isCollapsed: false,
                            todos: ['mock_todo_id']
                    },
                    'mock_category_id_child': {
                        name: 'mock_category_name',
                            id: 'mock_category_id_child',
                            parentId: 'mock_category_id_parent',
                            children: [],
                            isCompleted: true,
                            isCollapsed: true,
                            todos: []
                    },
                    'mock_category_id_parent_1': {
                        name: 'mock_category_name',
                            id: 'mock_category_id_parent_1',
                            parentId: '',
                            children: ['mock_category_id_child_1'],
                            isCompleted: true,
                            isCollapsed: true,
                            todos: []
                    },
                    'mock_category_id_child_1': {
                        name: 'mock_category_name',
                            id: 'mock_category_id_child_1',
                            parentId: 'mock_category_id_parent_1',
                            children: [],
                            isCompleted: true,
                            isCollapsed: true,
                            todos: []
                    }
                },
                ui: {
                    editing: true,
                        modalIsOpen: false,
                        currentCategoryId: 'mock_category_id_parent',
                        error: 'mock_category_error'
                }
            };

            window.confirm = jest.fn(() => true);

            button.simulate('click', {});

            expect(props.removeCategory).toHaveBeenCalledWith('mock_category_id_parent', expectedCategoriesArgument);
        })
    });
});
