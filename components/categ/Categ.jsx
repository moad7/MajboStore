import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryProducts } from "../../firebase/Function";

const Categ = () => {
  let { id } = useParams();
  const [productsByCateg, setProductsByCateg] = useState("");

  async function fetchCategoryProducts(categoryId) {
    try {
      const productsData = await CategoryProducts({ categoryId });
      setProductsByCateg(productsData);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  }

  useEffect(() => {
    fetchCategoryProducts(id);
  }, []);

  return (
    <>
      <div>
        <h2>Products for Category ID: {id}</h2>
        <ul>
          {productsByCateg.length > 0 ? (
            <>
              {productsByCateg.map((product) => (
                <li key={product.id}>
                  <p>Product ID: {product.id}</p>
                  <p>Name: {product.name}</p>
                  {/* Render other product data as needed */}
                  <img
                    style={{ width: 200, height: 200 }}
                    src={product.image}
                  />
                </li>
              ))}
            </>
          ) : (
            <>
              <h1>No product</h1>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Categ;
