const getInitialState = (localStorage = window.localStorage) => {
    return JSON.parse(localStorage.getItem('items')) || {
            categories: {
                ids: [],
                byId: {},
                ui: {
                    modalIsOpen: false,
                    currentCategoryId: null,
                    editing: false,
                    error: null,
                    newCategory: ''
                }
            },
            todos: {
                ids: [],
                byId: {},
                ui: {
                    error: null,
                    newCategory: ''
                }
            },
            search: {
                name: '',
                onlyCompleted: false
            }
        };
};

export default getInitialState;
