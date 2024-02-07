import React from "react";
import Navbar from "../components/navbar/Navbar";
import Home from "../components/home/Home";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Admin from "../components/admin/Admin";
import { AppProvider } from "../ContextComponents/Contextes";
import "./app.css";

function App() {
  return (
    <div className="app">
      {/* <AppProvider> */}
      {/* <Navbar /> */}
      <Home />
      <About />
      <Contact />
      <Admin />
      {/* </AppProvider> */}
    </div>
  );
}
export default App;
