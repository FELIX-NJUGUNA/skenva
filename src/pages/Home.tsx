import React from "react";
import AnimatedSection from "../components/AnimatedSection";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";


const Home: React.FC = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <AnimatedSection id="about">
        <About />
      </AnimatedSection>
      <AnimatedSection id="services">
        <Services />
      </AnimatedSection>
      <AnimatedSection id="portfolio">
        <Portfolio />
      </AnimatedSection>
      <AnimatedSection id="testimonials">
        <Testimonials />
      </AnimatedSection>
     
    </>
  );
};

export default Home;
