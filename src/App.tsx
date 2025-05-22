import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AnimatedSection from "./components/AnimatedSection";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Home />
      <AnimatedSection id="contact">
        <Footer />
      </AnimatedSection>
    </>
  );
};

export default App;
