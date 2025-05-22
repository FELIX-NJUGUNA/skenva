import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../assets/styles/colors";

const HeroContainer = styled.section`
  height: 90vh;
  border-radius: 25px;
  margin: 50px auto;
  padding: 80px;
  max-width: auto;
  background: linear-gradient(135deg, ${colors.royalBlue}, ${colors.limeGreen});
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
`;

const Overlay = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  padding: 70px 50px;
  border-radius: 25px;
  max-width: 900px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.25);
`;

const Heading = styled(motion.h1)`
  font-size: 4rem;
  color: white;
  font-weight: 800;
  margin-bottom: 25px;
  text-shadow: 2px 2px 14px rgba(0, 0, 0, 0.3);
`;

const Subheading = styled(motion.p)`
  font-size: 1.7rem;
  color: white;
  font-weight: 400;
  margin-bottom: 45px;
  text-shadow: 1px 1px 12px rgba(0, 0, 0, 0.25);
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
`;

const CTAButton = styled(motion.a)`
  padding: 16px 36px;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &:nth-child(1) {
    background: ${colors.royalBlue};
    &:hover {
      background: ${colors.limeGreen};
      transform: translateY(-5px);
      box-shadow: 0px 8px 22px rgba(0, 0, 0, 0.3);
    }
  }

  &:nth-child(2) {
    background: ${colors.limeGreen};
    &:hover {
      background: ${colors.royalBlue};
      transform: translateY(-5px);
      box-shadow: 0px 8px 22px rgba(0, 0, 0, 0.3);
    }
  }

  &::after {
    content: "";
    position: absolute;
    width: 150%;
    height: 150%;
    top: -40%;
    left: -40%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 10%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <Overlay>
        <Heading initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Elevate Your Brand with SkenVa Creatives
        </Heading>
        <Subheading initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3 }}>
          Turning skips to clicks and strategy to sales.
        </Subheading>
        <CTAContainer>
          <CTAButton initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} href="#services">
            Explore Services
          </CTAButton>
          <CTAButton initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} href="#contact">
            Get in Touch
          </CTAButton>
        </CTAContainer>
      </Overlay>
    </HeroContainer>
  );
};

export default Hero;
