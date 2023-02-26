// The selector file is where this reducer specific transformation business logic is going to live.
import { createSelector } from "reselect";

const selectCategoryReducer = state => state.categories;

// Memoize selectors | which are very intelligent in being able to determine, hey, if nothing's changed, just don't even bother re rendering.
export const selectCategories = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  categories =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  categoriesSlice => categoriesSlice.isLoading
);
