import React, { useState, useContext, useEffect } from "react";
import { addNewCategory, addNewProduct } from "../../firebase/Function";
import { Form, Button, Modal, Col, Row, Container } from "react-bootstrap";
import { AppContext, AppStore } from "../../ContextComponents/Contextes";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const { handleShow, toggleModal, toast } = useContext(AppContext);
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
  const colorNames = [
    "White",
    "Black",
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Cyan",
    "Magenta",
    "Brown",
  ];

  const hndeleAddProduct = async () => {
    try {
      if (
        categoryID === 1 ||
        prodName === "" ||
        prodDescription === "" ||
        prodImageUrl === "" ||
        categoryID === "" ||
        prodPrice === "" ||
        prodColor === 1
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
        toast.success("Greate adding");
        setProColor("");
        setCategoryId("");
        setProImageURl("");
        setProdDescription("");
        setProPrice("");
        setProdName("");
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
        await loadCategoris();
        toast.success("Greate adding");
        setCategoryName("");
        setCategoryImgeUrl("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
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
                      value={prodName}
                      placeholder="Product Name"
                      onChange={(e) => setProdName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Select
                      value={categoryID}
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                      }}
                    >
                      <option key="default" value={1}>
                        Category
                      </option>
                      {categories.length > 0 &&
                        categories.map((cate, index) => (
                          <option key={index} value={cate.id}>
                            {cate.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      value={prodPrice}
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
                      value={prodDescription}
                      placeholder="Descraption"
                      onChange={(e) => {
                        setProdDescription(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Select
                      value={prodColor}
                      onChange={(e) => {
                        setProColor(e.target.value);
                      }}
                    >
                      <option key="default" value={1}>
                        Color Type
                      </option>
                      {colorNames.length > 0 &&
                        colorNames.map((x, index) => (
                          <option key={index} value={x}>
                            {x}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      type="text"
                      placeholder="Image Url"
                      value={prodImageUrl}
                      onChange={(e) => {
                        setProImageURl(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row xl={3} md={3} xs={3}>
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
                        value={categoryImgeUrl}
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
