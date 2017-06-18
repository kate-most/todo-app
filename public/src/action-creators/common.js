export const openModal = (id, editing = false) => ({
    type: 'OPEN_MODAL',
    id,
    editing
});

export const closeModal = () => ({
    type: 'CLOSE_MODAL'
});

export const clearError = () => ({
    type: 'CLEAR_ERROR'
});

export const handleRouteChange = () => ({
    type: 'HANDLE_ROUTE_CHANGE'
});