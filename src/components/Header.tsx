import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../assets/styles/colors";
import logoImage from "../assets/images/logo2.webp";

const HeaderContainer = styled(motion.header)<{ isScrolled: boolean; isHidden: boolean }>`
  background: ${({ isScrolled }) =>
    isScrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.7)"};
  backdrop-filter: blur(10px); /* Adds glassmorphic effect */
  padding: ${({ isScrolled }) => (isScrolled ? "10px 28px" : "12px 29px")};
  position: fixed;
  width: 95%;
  z-index: 10;
  max-width: 1100px;
  top: ${({ isHidden }) => (isHidden ? "-100px" : "30px")};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ isScrolled }) => (isScrolled ? "12px" : "50px")};
  transition: all 0.5s ease-in-out;
  box-shadow: ${({ isScrolled }) => (isScrolled ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "0px 8px 20px rgba(0, 0, 0, 0.15)")};

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    top: 0; /* Keep it fixed for mobile */
    left: 0;
    transform: none;
    background: rgba(255, 255, 255, 0.85);
  }
`;




const Logo = styled(motion.img)`
  height: 50px;
  transition: height 0.3s ease-in-out, transform 0.3s ease-in-out;

  ${HeaderContainer}.scrolled & {
    height: 40px;
  }

  &:hover {
    transform: scale(1.08);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  margin-right: 70px;
  font-family: "Montserrat", sans-serif;

  a {
    color: ${colors.royalBlue};
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${colors.limeGreen};
      transform: translateY(-3px);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuIcon = styled(motion.div)`
  display: none;
  cursor: pointer;
  font-size: 28px;
  color: ${colors.royalBlue};
  z-index: 1001;
  position: absolute;
  right: 20px;
  top: 15px;
  margin-right: 70px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  position: absolute;
  top: 70px;
  right: 20px;
  width: 250px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.15);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

  a {
    color: ${colors.royalBlue};
    padding: 12px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: ${colors.limeGreen};
    }
  }
`;

const scrollToSection = (id: string) => {
  const section = document.querySelector(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
  
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsHidden(true);  // Hide header on fast scroll down
      } else {
        setIsHidden(false); // Reveal header fully when scrolling up
      }
  
      lastScrollY = currentScrollY;
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [menuOpen]);
  
  
  

  return (
    <HeaderContainer className={isScrolled ? "scrolled" : ""} isScrolled={isScrolled} isHidden={isHidden}>
      <Logo
        src={logoImage}
        alt="SkenVa Creatives Logo"
        onClick={() => scrollToSection("home")}
        style={{ cursor: "pointer" }}
      />


      <Nav>
      <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}>Home</a>
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("#about"); }}>About</a>
        <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("#services"); }}>Services</a>
        <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection("#portfolio"); }}>Portfolio</a>
        <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection("#testimonials"); }}>Testimonials</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}>Contact</a>
      </Nav>

      <MobileMenuIcon whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </MobileMenuIcon>

      <MobileNav isOpen={menuOpen}>
      <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("#home"); setMenuOpen(false); }}>Home</a>
      <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("#about"); setMenuOpen(false); }}>About</a>
      <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("#services"); setMenuOpen(false); }}>Services</a>
      <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection("#portfolio"); setMenuOpen(false); }}>Portfolio</a>
      <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection("#testimonials"); setMenuOpen(false); }}>Testimonials</a>
      <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); setMenuOpen(false); }}>Contact</a>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;
