import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const productsImport = [
  {
    id: 1,
    title: "Product 1",
    photo: "photo",
    category: null,
  },
  {
    id: 2,
    title: "Product 2",
    photo: "photo",
    category: null,
  },
  {
    id: 3,
    title: "Product 3",
    photo: "photo",
    category: null,
  },
];

const categorySuggestions = [
  {
    category: {
      categoryId: "9355",
      categoryName: "Cell Phones & Smartphones",
    },
    categoryTreeNodeLevel: 2,
    categoryTreeNodeAncestors: [
      {
        categoryId: "15032",
        categoryName: "Cell Phones & Accessories",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=15032",
      },
    ],
  },
  {
    category: {
      categoryId: "12",
      categoryName: "Other Antiques",
    },
    categoryTreeNodeLevel: 2,
    categoryTreeNodeAncestors: [
      {
        categoryId: "20081",
        categoryName: "Antiques",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=20081",
      },
    ],
  },
  {
    category: {
      categoryId: "20349",
      categoryName: "Cases, Covers & Skins",
    },
    categoryTreeNodeLevel: 3,
    categoryTreeNodeAncestors: [
      {
        categoryId: "9394",
        categoryName: "Cell Phone Accessories",
        categoryTreeNodeLevel: 2,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=9394",
      },
      {
        categoryId: "15032",
        categoryName: "Cell Phones & Accessories",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=15032",
      },
    ],
  },
  {
    category: {
      categoryId: "43304",
      categoryName: "Cell Phone & Smartphone Parts",
    },
    categoryTreeNodeLevel: 2,
    categoryTreeNodeAncestors: [
      {
        categoryId: "15032",
        categoryName: "Cell Phones & Accessories",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=15032",
      },
    ],
  },
  {
    category: {
      categoryId: "123422",
      categoryName: "Cables & Adapters",
    },
    categoryTreeNodeLevel: 3,
    categoryTreeNodeAncestors: [
      {
        categoryId: "9394",
        categoryName: "Cell Phone Accessories",
        categoryTreeNodeLevel: 2,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=9394",
      },
      {
        categoryId: "15032",
        categoryName: "Cell Phones & Accessories",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=15032",
      },
    ],
  },
  {
    category: {
      categoryId: "58540",
      categoryName: "Screen Protectors",
    },
    categoryTreeNodeLevel: 3,
    categoryTreeNodeAncestors: [
      {
        categoryId: "9394",
        categoryName: "Cell Phone Accessories",
        categoryTreeNodeLevel: 2,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=9394",
      },
      {
        categoryId: "15032",
        categoryName: "Cell Phones & Accessories",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=15032",
      },
    ],
  },
  {
    category: {
      categoryId: "80077",
      categoryName: "Headsets",
    },
    categoryTreeNodeLevel: 3,
    categoryTreeNodeAncestors: [
      {
        categoryId: "9394",
        categoryName: "Cell Phone Accessories",
        categoryTreeNodeLevel: 2,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=9394",
      },
      {
        categoryId: "15032",
        categoryName: "Cell Phones & Accessories",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=15032",
      },
    ],
  },
  {
    category: {
      categoryId: "123417",
      categoryName: "Chargers & Cradles",
    },
    categoryTreeNodeLevel: 3,
    categoryTreeNodeAncestors: [
      {
        categoryId: "9394",
        categoryName: "Cell Phone Accessories",
        categoryTreeNodeLevel: 2,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=9394",
      },
      {
        categoryId: "15032",
        categoryName: "Cell Phones & Accessories",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=15032",
      },
    ],
  },
  {
    category: {
      categoryId: "58543",
      categoryName: "Accessory Bundles",
    },
    categoryTreeNodeLevel: 3,
    categoryTreeNodeAncestors: [
      {
        categoryId: "9394",
        categoryName: "Cell Phone Accessories",
        categoryTreeNodeLevel: 2,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=9394",
      },
      {
        categoryId: "15032",
        categoryName: "Cell Phones & Accessories",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=15032",
      },
    ],
  },
  {
    category: {
      categoryId: "45071",
      categoryName: "Cell Phones",
    },
    categoryTreeNodeLevel: 3,
    categoryTreeNodeAncestors: [
      {
        categoryId: "45065",
        categoryName: "Wholesale Lots",
        categoryTreeNodeLevel: 2,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=45065",
      },
      {
        categoryId: "15032",
        categoryName: "Cell Phones & Accessories",
        categoryTreeNodeLevel: 1,
        categorySubtreeNodeHref:
          "https://api.ebay.com/commerce/taxonomy/v1/category_tree/0/get_category_subtree?category_id=15032",
      },
    ],
  },
];

const categoryOptions = () => {
  return categorySuggestions.map((category, index) => (
    <option key={index} value={category.category.categoryName}>
      {category.category.categoryName}
    </option>
  ));
};

const tableHeaders = () => {
  const keysArray = Object.keys(productsImport[0]);
  keysArray.forEach((key, index) => {
    keysArray[index] = key.replace(/([A-Z])/g, " $1").trim();
    keysArray[index] =
      keysArray[index].charAt(0).toUpperCase() + keysArray[index].slice(1);
  });

  return (
    <thead>
      <tr>
        {keysArray.map((key, index) => (
          <th key={index}>{key}</th>
        ))}
      </tr>
    </thead>
  );
};

const ViewNeedCategory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(productsImport);
  const [finished, setFinished] = useState(false);
  const [categories, setCategories] = useState(
    new Array(products.length).fill(null)
  );

  const handleSelectChange = (e, index) => {
    const newCategories = [...categories];
    newCategories[index] = e.target.value;
    console.log(e.target.value.toString());
    setCategories(newCategories);
  };

  useEffect(() => {
    const newFinished = categories.every((category) => category != null);
    setFinished(newFinished);
  }, [categories]);

  return (
    <>
      <table
        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        {tableHeaders()}
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              <td>{product.photo}</td>
              <td>
                <select
                  onChange={(e) => handleSelectChange(e, index)}
                  value={categories[index]}
                >
                  <option>{product.category}</option>
                  {categoryOptions()}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        disabled={!finished}
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Submit
      </button>

      <div>
        <p>Categories: {categories.join(", ")}</p>
        {/* map though the categories state and tell me if it is === null */}
        {categories.map((category, index) => {
          if (category == null) {
            return <p key={index}>Category {index + 1} is missing</p>;
          }
        })}

      </div>
    </>
  );
};

export default ViewNeedCategory;
