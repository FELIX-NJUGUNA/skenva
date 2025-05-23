import React, { useState, useEffect } from "react";
import AnimatedSection from "../components/AnimatedSection";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { FaArrowUp } from "react-icons/fa";

interface ButtonProps {
  showButton: boolean;
}

const BackToTopButton = styled.button<ButtonProps>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: ${colors.royalBlue};
  color: white;
  padding: 16px;
  border-radius: 50%;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  opacity: ${({ showButton }) => (showButton ? 1 : 0)};
  visibility: ${({ showButton }) => (showButton ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background: ${colors.limeGreen};
    transform: scale(1.2);
  }
`;


const Home: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setShowButton(window.scrollY > 300);
      });
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      {showButton && (
        <BackToTopButton showButton={showButton} onClick={scrollToTop}>
        <FaArrowUp /> {/* Display only the arrow icon */}
      </BackToTopButton>
)}


    </>
  );
};

export default Home;
