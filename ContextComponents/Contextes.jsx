import React, { createContext, useState } from "react";
import {
  getAllCategoris,
  getAllProducts,
  getProductsByCategory,
} from "../firebase/Function";
import { ToastContainer, toast } from "react-toastify";

export const AppContext = createContext();

export const AppStore = createContext();

// export function getCategoris(){
//   return useContext(AppStore);
// }

export const AppProvider = ({ children }) => {
  const [handleShow, setHandleShow] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});

  const toggleModal = () => {
    setHandleShow(!handleShow);
  };
  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const loadCategoris = async () => {
    try {
      const data = await getAllCategoris();
      setCategories(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  async function LoadProductsByCategory() {
    const data = await getProductsByCategory();
    setProductsByCategory(data);
  }

  return (
    <AppContext.Provider
      value={{ handleShow, setHandleShow, toggleModal, toast }}
    >
      <AppStore.Provider
        value={{
          loadCategoris,
          loadProducts,
          LoadProductsByCategory,
          productsByCategory,
          products,
          categories,
        }}
      >
        <ToastContainer />
        {children}
      </AppStore.Provider>
    </AppContext.Provider>
  );
};
