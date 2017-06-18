import React from 'react';
import { shallow } from 'enzyme';
import CategoriesList from './../categories-list';
import Category from './../../category/category';

describe('<CategoriesList />', () => {

    let props, wrapper;

    beforeEach(() => {
        setup();
    });

    function setup() {
        props = {
            params: {
                category: 'mock_category',
                todo: 'mock_todo'
            },
            categories: {
                ids: ['mock_category_id_parent', 'mock_category_id_child'],
                byId: {
                    'mock_category_id_parent': {
                        name: 'mock_category_name',
                        id: 'mock_category_id_parent',
                        parentId: '',
                        children: ['mock_category_id_child'],
                        isCompleted: true,
                        isCollapsed: true,
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

         wrapper = shallow(<CategoriesList {...props} />);
    }

    describe('#render', () => {
        it('should render unordered list', () => {
            expect(wrapper.find('ul').length).toBe(1);
        });
    });

    describe('searchIds', () => {
        it('should contain only top-level categories ids if children prop was not passed', () => {
            const category = wrapper.find(Category);
            const expected = 'mock_category_id_parent';

            expect(category.prop('id')).toBe(expected);

        });

        it('should contain only child categories ids if children prop was passed', () => {
            const wrapper = shallow(<CategoriesList {...props} children={['mock_category_id_child']}/>);
            const category = wrapper.find(Category);

            expect(category.prop('id')).toBe('mock_category_id_child');
        });
    });

});
