import React, { useState, useEffect, useContext } from "react";
import "./home.css";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppStore } from "../../ContextComponents/Contextes";
import { Link } from "react-router-dom";

const Home = () => {
  const { loadCategoris, categories } = useContext(AppStore);
  useEffect(() => {
    loadCategoris();
  }, []);

  return (
    <>
      <ToastContainer />
      <Container fluid className="body" id="home">
        <section id="home" className="section">
          {categories.length > 0 &&
            categories.map((category) => (
              <>
                <Row className="cardCategoryImg">
                  <div className="devImgCategort">
                    <Link to={`/categ/${category.id}`}>
                      <img
                        key={category.id}
                        src={category.image}
                        alt={category.name}
                      />
                    </Link>
                  </div>
                  <div className="devNameGategory">
                    <h5 key={category.id}>{category.name}</h5>
                  </div>
                </Row>
              </>
            ))}
        </section>
        {/* <Button onClick={() => { console.log(loadCategoris) }} >get</Button> */}
      </Container>
    </>
  );
};
export default Home;
