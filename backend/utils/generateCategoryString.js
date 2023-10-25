const { Category } = require('../models'); 

const generateCategoryString = async () => {
  try {
    const categories = await Category.find({ depth: 1 }).select('_id name subCategories identifier depth');

    const fetchSubcategories = async (category) => {
      if (category.subCategories && category.subCategories.length > 0) {
        const subcategoriesData = await Category.find({ _id: { $in: category.subCategories } })
          .select('_id name subCategories identifier depth');
        
        const subcategories = [];
        for (const subcategoryData of subcategoriesData) {
          const subcategory = {
            _id: subcategoryData._id,
            name: subcategoryData.name,
            identifier: subcategoryData.identifier,
            subCategories: await fetchSubcategories(subcategoryData),
            depth: subcategoryData.depth,
          };
          subcategories.push(subcategory);
        }
        return subcategories;
      }
      return [];
    };

    let result = [];
    for (const categoryData of categories) {
      const category = {
        _id: categoryData._id,
        name: categoryData.name,
        identifier: categoryData.identifier,
        subCategories: await fetchSubcategories(categoryData),
        depth: categoryData.depth,
      };
      result.push(category);
    }

    result = JSON.stringify(result, null, 2)
    return result;
  } catch (error) {
    console.error('Error generating category string:', error);
    throw error;
  }
};

module.exports = { generateCategoryString };
