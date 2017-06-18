const getSiblingCategories = (parentId, categories) => {
    let siblingCategories = {};

    if (parentId) {
        //Take only child categories of the parent
        categories.byId[parentId].children.forEach((id) => {
            siblingCategories[id] = categories.byId[id];
        });
    } else {
        //Take all categories of top level
        categories.ids.forEach((id) => {
            if (!categories.byId[id].parentId) {
                siblingCategories[id] = categories.byId[id];
            }
        });
    }

    return siblingCategories;
};

export default getSiblingCategories;