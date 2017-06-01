import { createSelector } from 'reselect';

const getCategories = (state) => state.categories;
const getCategoriesIdsLength = (state) => state.categories.ids.length;

const getNumberOfCompletedCategories = createSelector(
    [getCategories],
    (categories) => {
        let number = 0;

        categories.ids.forEach((id) => {
            if (categories.byId[id].isCompleted) {
                number++;
            }
        });

        return number;
    }
);

const getProgress = createSelector(
    [getCategoriesIdsLength, getNumberOfCompletedCategories],
    (categoriesIdsLength, numberOfCompletedCategories) => {
        return categoriesIdsLength ? (numberOfCompletedCategories * 100 / categoriesIdsLength) : 100;
    }
);

export default getProgress;