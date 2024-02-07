import React, { useState, useContext, useEffect } from "react";
import {
  addNewCategory,
  addNewProduct,
  getAllProducts,
} from "../../firebase/Function";
import { Form, Button, Modal, Col, Row, Container } from "react-bootstrap";
import { AppContext, AppStore } from "../../ContextComponents/Contextes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const { handleShow, toggleModal } = useContext(AppContext);
  const { loadProducts, loadCategoris, categories } = useContext(AppStore);

  //product useState
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodImageUrl, setProImageURl] = useState("");
  const [prodPrice, setProPrice] = useState("");
  const [prodColor, setProColor] = useState("");
  // category useState
  const [categoryName, setCategoryName] = useState("");
  const [categoryImgeUrl, setCategoryImgeUrl] = useState("");
  const [categoryID, setCategoryId] = useState("");

  const [changeView, setChangeView] = useState("Add Product");

  const hndeleAddProduct = async () => {
    try {
      if (
        categoryID === 1 ||
        prodName === "" ||
        prodDescription === "" ||
        prodImageUrl === "" ||
        categoryID === "" ||
        prodPrice === "" ||
        prodColor === ""
      ) {
        toast.error("Something went wrong !!!");
      } else {
        await addNewProduct(
          prodName,
          prodDescription,
          prodImageUrl,
          categoryID,
          prodPrice,
          prodColor
        );
        await loadProducts();
        setProColor("");
        setCategoryId(1);
        setProImageURl("");
        setProdDescription("");
        setProPrice("");
        setProdName("");
        toast.success("Greate adding");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const hndeleAddCategory = async () => {
    try {
      if (categoryName === "" && categoryImgeUrl === "") {
        toast.error("Something went wrong !!!");
      } else {
        await addNewCategory(categoryName, categoryImgeUrl);
        toast.success("Greate adding");
        setCategoryName("");
        setCategoryImgeUrl("");
        await loadCategoris();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal style={{ display: "flex", top: 80 }} size="lg" show={handleShow}>
        <Modal.Header closeButton onClick={toggleModal}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <>
              <div className="mb-3">
                <Form.Check
                  inline
                  label="Add Product"
                  name="group1"
                  type="radio"
                  id={`inline-radio-1`}
                  defaultChecked
                  onClick={() => {
                    setChangeView("Add Product");
                  }}
                />
                <Form.Check
                  inline
                  label="Add Category"
                  name="group1"
                  type="radio"
                  id={`inline-radio-2`}
                  onClick={() => {
                    setChangeView("Add Category");
                  }}
                />
              </div>
            </>
            {changeView == "Add Product" ? (
              <>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      placeholder="Name Product"
                      onChange={(e) => {
                        setProdName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Select
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                      }}
                    >
                      <option value={1}>Open this select category</option>
                      {categories.length > 0 &&
                        categories.map((cate) => (
                          <option key={cate.id} value={cate.id}>
                            {cate.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      placeholder="Price"
                      onChange={(e) => {
                        setProPrice(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      placeholder="Descraption"
                      onChange={(e) => {
                        setProdDescription(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      placeholder="Color"
                      onChange={(e) => {
                        setProColor(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      placeholder="Image Url"
                      onChange={(e) => {
                        setProImageURl(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row xl={3} md={3} xs={3} className="text-center">
                  <Button variant="primary" onClick={hndeleAddProduct}>
                    Add
                  </Button>
                </Row>
              </>
            ) : (
              changeView == "Add Category" && (
                <>
                  <Row xl={3} style={{ marginBottom: 15 }}>
                    <Form.Group as={Col}>
                      <Form.Control
                        type="text"
                        placeholder="Name Category"
                        value={categoryName}
                        onChange={(e) => {
                          setCategoryName(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Control
                        type="text"
                        placeholder="Image Url"
                        onChange={(e) => {
                          setCategoryImgeUrl(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Button as={Col} onClick={hndeleAddCategory}>
                      Add
                    </Button>
                  </Row>
                </>
              )
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Admin;
