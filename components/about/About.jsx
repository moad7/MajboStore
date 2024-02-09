import React, { useState, useEffect, useContext } from "react";
import "./about.css";
import { AppStore } from "../../ContextComponents/Contextes";
import CardProduct from "./CardProduct";
const About = () => {
  const { products, loadProducts, loadCategoris } = useContext(AppStore);

  useEffect(() => {
    loadCategoris();
    loadProducts();
  }, []);

  return (
    <section className="about" id="about">
      <>
        {products.length > 0 &&
          products.map((x) => (
            <>
              <div className="cardproduct">
                <CardProduct product={x} />
              </div>
            </>
          ))}
      </>
    </section>
  );
};

export default About;
