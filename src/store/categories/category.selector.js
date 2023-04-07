export const selectCategoriesMap = (state) => {
  const { categories } = state.categories;
  // Check if categoriesMap is empty
  if (!Object.keys(categories).length) return {};
  // Return categoriesMap with title as key and items as value
  return categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};
