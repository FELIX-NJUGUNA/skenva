import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import logoImage from "../assets/images/logo2.png";

const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 15px 40px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
  box-shadow: ${({ isScrolled }) => (isScrolled ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none")};

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Logo = styled.img`
  height: 45px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  margin-right: 70px;
  font-family: "Poppins", sans-serif;

  a {
    color: ${colors.royalBlue};
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${colors.limeGreen};
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 28px;
  color: ${colors.royalBlue};
  z-index: 1001;
  position: absolute;
  right: 20px;
  top: 15px;
  margin-right: 3 0px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.nav<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: absolute;
  top: 70px;
  right: 20px;
  width: 250px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.15);
  animation: ${({ isOpen }) => (isOpen ? "fadeIn 0.3s ease-in-out" : "fadeOut 0.3s ease-in-out")};

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Logo src={logoImage} alt="SkenVa Creatives Logo" />

      <Nav>
        <a onClick={() => scrollToSection("home")}>Home</a>
        <a onClick={() => scrollToSection("about")}>About</a>
        <a onClick={() => scrollToSection("services")}>Services</a>
        <a onClick={() => scrollToSection("portfolio")}>Portfolio</a>
        <a onClick={() => scrollToSection("testimonials")}>Testimonials</a>
        <a onClick={() => scrollToSection("contact")}>Contact</a>
      </Nav>

      <MobileMenuIcon onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </MobileMenuIcon>

      <MobileNav isOpen={menuOpen}>
        <a onClick={() => { scrollToSection("home"); setMenuOpen(false); }}>Home</a>
        <a onClick={() => { scrollToSection("about"); setMenuOpen(false); }}>About</a>
        <a onClick={() => { scrollToSection("services"); setMenuOpen(false); }}>Services</a>
        <a onClick={() => { scrollToSection("portfolio"); setMenuOpen(false); }}>Portfolio</a>
        <a onClick={() => { scrollToSection("testimonials"); setMenuOpen(false); }}>Testimonials</a>
        <a onClick={() => { scrollToSection("contact"); setMenuOpen(false); }}>Contact</a>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;
