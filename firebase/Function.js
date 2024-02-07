import { database } from "./Firebase";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
} from "firebase/firestore";

export async function CategoryProducts({ categoryId }) {
  try {
    const productsRef = query(
      collection(database, "Products"),
      where("categoryId", "==", categoryId)
    );
    const querySnapshot = await getDocs(productsRef);
    const productsData = [];
    querySnapshot.forEach((doc) => {
      productsData.push({ id: doc.id, ...doc.data() });
    });
    return productsData;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
export const getProductsByCategory = async () => {
  const products = await getAllProducts();
  const categories = await getAllCategoris();
  const productsByCategory = {};

  // Populate the productsByCategory object
  products.forEach((product) => {
    const category = categories.find((cat) => cat.id === product.categoryId);
    if (category) {
      const categoryName = category.name;
      const categoryId = category.id; // Add category id
      const categoryImageUrl = category.image;
      if (!productsByCategory[categoryName]) {
        productsByCategory[categoryName] = {
          id: categoryId,
          image: categoryImageUrl,
          products: [],
        };
      }
      productsByCategory[categoryName].products.push(product);
    }
  });
  console.log(
    "=====================================" + JSON.stringify(productsByCategory)
  );
  return productsByCategory;
};
export const getAllProducts = async () => {
  try {
    const query = await getDocs(collection(database, "Products"));
    const dataList = [];
    query.forEach((doc) => {
      dataList.push({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        image: doc.data().image,
        categoryId: doc.data().categoryId,
        price: doc.data().price,
        color: doc.data().color,
        createdAt: doc.data().createdAt,
        ...doc,
      });
    });
    if (dataList) {
      return dataList;
    }
  } catch (error) {
    console.log("Error getting documents:", error.message);
    throw error;
  }
};
export const getAllCategoris = async () => {
  try {
    const query = await getDocs(collection(database, "Categores"));
    const dataList = [];
    query.forEach((doc) => {
      dataList.push({
        id: doc.id,
        name: doc.data().name,
        image: doc.data().image,
        createdAt: doc.data().createdAt,
        ...doc,
      });
    });
    if (dataList) {
      return dataList;
    }
  } catch (error) {
    console.log("Error getting documents:", error.message);
    throw error;
  }
};
export const addNewProduct = async (name, desc, img, cate, price, col) => {
  try {
    await addDoc(collection(database, "Products"), {
      name: name,
      description: desc,
      image: img,
      categoryId: cate,
      price: price,
      color: col,
      createdAt: getCurrentDate(),
    });
  } catch (err) {
    console.log(err);
  }
};
export async function addNewCategory(category, imgUrl) {
  try {
    await addDoc(collection(database, "Categores"), {
      name: category,
      image: imgUrl,
      createdAt: getCurrentDate(),
    });
  } catch (err) {
    console.log(err);
  }
}
function getCurrentDate() {
  // Create a new Date object
  const currentDate = new Date();

  // Extract day, month, and year components
  const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = currentDate.getFullYear();

  // Return the formatted date string
  return `${day}/${month}/${year}`;
}
