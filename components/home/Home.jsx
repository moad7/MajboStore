import React, { useEffect, useContext } from "react";
import "./home.css";
import { Row, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { AppStore, AppContext } from "../../ContextComponents/Contextes";
import { Link } from "react-router-dom";

const Home = () => {
  const { loadCategoris, categories } = useContext(AppStore);
  const { toast } = useContext(AppContext);

  useEffect(() => {
    loadCategoris();
  }, []);

  return (
    <>
      <Container fluid className="body" id="home">
        <section id="home" className="section">
          {categories.length > 0 &&
            categories.map((category, index) => (
              <>
                <Row key={index} className="cardCategoryImg">
                  <div key={index} className="devImgCategort">
                    <Link to={`/categ/${category.id}`}>
                      <img
                        key={category.id}
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
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
