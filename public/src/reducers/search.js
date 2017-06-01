const search = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_NAME':
            return {
                ...state,
                name: action.name
            };
        case 'CHANGE_SEARCH_STATUS':
            return {
                ...state,
                onlyCompleted: !state.onlyCompleted
            };
        case 'CLEAR_SEARCH_NAME':
            return {
                ...state,
                name: ''
            };
        case 'HANDLE_ROUTE_CHANGE':
            return {
                ...state,
                name: '',
                onlyCompleted: false
            };
        default:
            return state;
    }
};

export default search;