import React from "react";
import "./cardproduct.css";
import { FaCartPlus } from "react-icons/fa";
function CardProduct(props) {
  return (
    <div className="card">
      <div className="imgcard">
        <img src={props.product.image} />
      </div>
      <div className="nd">
        <h6>
          <span style={{ fontWeight: "bold" }}>SKU: </span>
          {props.product.id.slice(0, 7)}
        </h6>
        <h6>{props.product.name}</h6>
        {/* <p>{props.product.description.split(".")[0]}</p> */}
      </div>
      <div className="price">₪{props.product.price}</div>
      <div className="btn1">
        <button>Buy Now</button>
        <button>
          <FaCartPlus size={20} />
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
