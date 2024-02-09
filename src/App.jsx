import React, { useState, useContext, useEffect } from "react";
import Home from "../components/home/Home";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Admin from "../components/admin/Admin";
import { waveform } from "ldrs";
import { AppStore } from "../ContextComponents/Contextes";
import "./app.css";

function App() {
  const [loading, setLoading] = useState(true);
  const { loadCategoris, loadProducts } = useContext(AppStore);

  waveform.register();

  useEffect(() => {
    const fetchData = async () => {
      await loadCategoris();
      await loadProducts();
      setLoading(false);
    };
    const timeout = setTimeout(() => {
      fetchData();
    }, 1100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app">
      {loading ? (
        <div className="spinner">
          <l-waveform size="60" stroke="3.5" speed="0.8" color="black" />
        </div>
      ) : (
        <>
          <Home />
          <About />
          <Contact />
          <Admin />
        </>
      )}
    </div>
  );
}
export default App;
