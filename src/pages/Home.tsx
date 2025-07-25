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
import { FaWhatsapp } from "react-icons/fa";
import FAQ from "../components/Faq";
import Partners from "../components/Partners";
import ReviewForm from "../components/ReviewForm"; // ReviewForm is already imported

interface ButtonProps {
  showButton: boolean;
}

const BackToTopButton = styled.button<ButtonProps>`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1000; /* Ensures it's above most components */
  background: ${colors.royalBlue};
  color: white;
  padding: 14px;
  border-radius: 20%;
  font-size: 1.25rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  opacity: ${({ showButton }) => (showButton ? 1 : 0)};
  visibility: ${({ showButton }) => (showButton ? "visible" : "hidden")};
  transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s ease;
  transform: ${({ showButton }) => (showButton ? "translateY(0)" : "translateY(50px)")};


  &:hover {
    background: ${colors.limeGreen};
    transform: translateY(-5px) scale(1.15);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
  bottom: 20px;
  right: 20px;
  padding: 12px;
}

`;

const WhatsAppButton = styled.a<ButtonProps>`
  position: fixed;
  bottom: 40px;
  left: 40px;
  z-index: 1000; 
  background: ${colors.limeGreen};
  color: white;
  padding: 14px;
  border-radius: 20%;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  opacity: ${({ showButton }) => (showButton ? 1 : 0)};
  visibility: ${({ showButton }) => (showButton ? "visible" : "hidden")};
  transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s ease;
  transform: ${({ showButton }) => (showButton ? "translateY(0)" : "translateY(50px)")};

  &:hover {
    background: ${colors.royalBlue};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    left: 20px;
    padding: 12px;
    font-size: 1.3rem;
  }
`;

// AddReviewButton styled component is removed

const Home: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  // isReviewModalOpen state is removed

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
      <AnimatedSection id="partners">
        <Partners />
      </AnimatedSection>
      <AnimatedSection id="testimonials">
        <Testimonials />
      </AnimatedSection>

      {/* Re-embed ReviewForm as a static section */}
      <AnimatedSection id="review-form">
        <ReviewForm />
      </AnimatedSection>

      <AnimatedSection id="faq">
        <FAQ />
      </AnimatedSection>

      {/* Modal trigger button and conditional modal rendering are removed */}

      <WhatsAppButton
          href="https://wa.me/254741553806" 
          target="_blank"
          rel="noopener noreferrer"
          showButton={showButton}
        >
          <FaWhatsapp /> {/* WhatsApp Icon */}
        </WhatsAppButton>


      {showButton && (
        <BackToTopButton showButton={showButton} onClick={scrollToTop}>
        <FaArrowUp /> {/* Display only the arrow icon */}
      </BackToTopButton>
      )}
    </>
  );
};

export default Home;
