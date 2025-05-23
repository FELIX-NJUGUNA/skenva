import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../assets/styles/colors";
import logoImage from "../assets/images/logo2.png";

const HeaderContainer = styled(motion.header)<{ isScrolled: boolean; isHidden: boolean }>`
  background: rgba(255, 255, 255, ${({ isScrolled }) => (isScrolled ? 0.85 : 0.75)});
  backdrop-filter: blur(12px);
  padding: ${({ isScrolled }) => (isScrolled ? "10px 30px" : "15px 40px")};
  position: fixed;
  width: 100%;
  top: ${({ isHidden }) => (isHidden ? "-100px" : "0")};
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease-in-out;
  box-shadow: ${({ isScrolled }) => (isScrolled ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none")};

  @media (max-width: 768px) {
    padding: ${({ isScrolled }) => (isScrolled ? "8px 20px" : "12px 20px")};
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
  margin-right: 50px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled(motion.nav)<{ isOpen: boolean }>`
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
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true); // Hide header on fast scroll down
      } else {
        setIsHidden(false); // Show header when scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderContainer className={isScrolled ? "scrolled" : ""} isScrolled={isScrolled} isHidden={isHidden}>
      <Logo src={logoImage} alt="SkenVa Creatives Logo" />

      <Nav>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => scrollToSection("home")}>Home</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => scrollToSection("about")}>About</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => scrollToSection("services")}>Services</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => scrollToSection("portfolio")}>Portfolio</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => scrollToSection("testimonials")}>Testimonials</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => scrollToSection("contact")}>Contact</motion.a>
      </Nav>

      <MobileMenuIcon whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </MobileMenuIcon>

      <MobileNav isOpen={menuOpen}>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => { scrollToSection("home"); setMenuOpen(false); }}>Home</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => { scrollToSection("about"); setMenuOpen(false); }}>About</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => { scrollToSection("services"); setMenuOpen(false); }}>Services</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => { scrollToSection("portfolio"); setMenuOpen(false); }}>Portfolio</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => { scrollToSection("testimonials"); setMenuOpen(false); }}>Testimonials</motion.a>
        <motion.a whileHover={{ scale: 1.05 }} onClick={() => { scrollToSection("contact"); setMenuOpen(false); }}>Contact</motion.a>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;
