import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryProducts } from "../../firebase/Function";
import CardProduct from "../about/CardProduct";
import { waveform } from "ldrs";
import "./categ.css";

const Categ = () => {
  const [productsByCateg, setProductsByCateg] = useState([]);
  const [cateName, setCateName] = useState("");
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  const fetchCategoryProducts = async (categoryId) => {
    try {
      const productsData = await CategoryProducts({ categoryId });
      setProductsByCateg(productsData);
      if (productsData.length > 0) {
        setCateName(productsData[0].categoryName);
      }
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchCategoryProducts(id);
      setLoading(false); // Set loading to false after fetching products
    };
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 1500);

    // Clear the timeout if the component unmounts or if the products are fetched before the timeout
    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <div className="categBody">
      {loading ? (
        <div>
          <l-waveform size="60" stroke="3.5" speed="0.8" color="black" />
        </div>
      ) : (
        <>
          <h2>{cateName}</h2>
          {productsByCateg.length > 0 ? (
            <div className="item">
              {productsByCateg.map((product) => (
                <div key={product.id} className="cardproduct">
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          ) : (
            <h2>No Products Available for this Category</h2>
          )}
        </>
      )}
    </div>
  );
};

export default Categ;
