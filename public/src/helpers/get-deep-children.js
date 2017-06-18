const getDeepChildren = (categories, id, currentCategory) => {
    const deepChildren = [id];

    if (!currentCategory.children || !currentCategory.children.length) {
        return deepChildren;
    }

    function getChildren(subItem) {
        if (!subItem) {
            return;
        }

        deepChildren.push(...subItem.children);

        subItem.children.forEach(childId => {
            if (categories.byId[childId]) {
                getChildren(categories.byId[childId]);
            }
        });
    }

    getChildren(currentCategory);

    return deepChildren;
};

export default getDeepChildren;