import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Item from "../components/item/Item.jsx";
import Categ from "../components/categ/Categ.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "../ContextComponents/Contextes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/categ/:id" element={<Categ />} />
        </Routes>
      </Router>
    </AppProvider>
  </React.StrictMode>
);
