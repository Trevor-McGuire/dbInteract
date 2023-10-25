const Category = require("../models/Category");
const Product = require("../models/Product");

const importCategories = async () => {
  try {
    const catArr = await initCategories(categoryData);
    await addParentCats(catArr);
    await addSubCategories();
    await addIdentifiers();
    await associateProducts();
  } catch (error) {
    console.error("Error importing categories:", error);
  }
};

const initCategories = async (data) => {
  const carArr = [];
  const cycleCats = async (data, depth = 1) => {
    for (const catName in data) {
      const subCats = data[catName];
      const newCat = new Category({
        name: catName,
        depth: depth,
      });
      await newCat.save();
      carArr.push({ name: catName, depth: depth, catId: newCat._id });
      if (subCats && typeof subCats === "object") {
        await cycleCats(subCats, depth + 1);
      }
    }
  };
  await cycleCats(data);
  return carArr;
};

const addParentCats = async (catArr) => {
  catArr.reverse();
  let reducedArr = [];
  for (const [i, cat] of catArr.entries()) {
    if (cat.depth === 1) continue;
    reducedArr = catArr.slice(i + 1);
    for (const reducedItem of reducedArr) {
      if (reducedItem.depth === cat.depth - 1) {
        const parentCat = await Category.findById(reducedItem.catId);
        const childCat = await Category.findById(cat.catId);
        childCat.parentCategory = parentCat._id;
        await childCat.save();
        break;
      }
    }
  }
};

const addIdentifiers = async () => {
  const cats = await Category.find();
  for (const cat of cats) {
    let identifier = cat.name.toLowerCase();
    identifier = identifier.replace(/ /g, "-");
    cat.identifier = identifier;
    await cat.save();
  }
  await checkforUniqueIdentifier();
};

const checkforUniqueIdentifier = async () => {
  console.log("checking for unique identifiers");
  const cats = await Category.find();

  for (const cat of cats) {
    const duplicates = await Category.find({ identifier: cat.identifier });
    if (duplicates.length > 1) {
      for (const duplicate of duplicates) {

        const parent = await Category.findById(duplicate.parentCategory);
        await Category.findOneAndUpdate(
          { _id: duplicate._id },
          { identifier: `${parent.identifier}_${duplicate.identifier}` }
        );
      }
    }
  }
};

const addSubCategories = async () => {
  const cats = await Category.find();
  for (const cat of cats) {
    const subCats = await Category.find({ parentCategory: cat._id });
    cat.subCategories = subCats;
    await cat.save();
  }
}

const associateProducts = async () => {
  const categories = await Category.find();

  for (const category of categories) {
    const products = await Product.find({ category: category.identifier });
    category.products = products;
    await category.save();

    let currentCategory = category;

    while (currentCategory.parentCategory) {
      const parent = await Category.findById(currentCategory.parentCategory);

      if (parent) {
        parent.products = parent.products.concat(products);
        await parent.save();
        currentCategory = parent;
      } else {
        break;
      }
    }
  }
};



const categoryData = {
  Electronics: {
    Phones: {
      Smartphones: {
        Android: null,
        iOS: null,
      },
      // Accessories: {
      //   Cases: null,
      //   Chargers: null,
      // },
    },
    // Computers: {
    //   Laptops: null,
    //   Desktops: null,
    // },
    TVs: null,
  },
  // Clothing: {
  //   "Men's": {
  //     Shirts: null,
  //     Pants: null,
  //     Shoes: {
  //       laces:null,
  //     },
  //   },
  //   "Women's": {
  //     Dresses: null,
  //     Shoes: {
  //       laces:null,
  //     },
  //   },
  // },
};

module.exports = importCategories;
