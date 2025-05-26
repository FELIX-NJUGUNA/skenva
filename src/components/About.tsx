import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faLaptopCode, faChartLine } from "@fortawesome/free-solid-svg-icons";
import aboutImage from "../assets/images/bg.jpg";
import { colors } from "../assets/styles/colors";

const AboutSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 100px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;


const AnimatedBlob = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 0.1;
  animation: float 12s ease-in-out infinite alternate;

  @keyframes float {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    50% {
      transform: translate(30px, -20px) scale(1.05);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  svg {
    width: 500px;
    height: 500px;
  }
`;

const AboutContainer = styled(motion.div)`
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  gap: 60px;
  background: rgba(255, 255, 255, 0.9);
  padding: 50px;
  border-radius: 30px;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    padding: 40px;
  }
`;

const TextContent = styled.div`
  flex: 1;

  h2 {
    font-size: 3rem;
    font-weight: 800;
    color: ${colors.royalBlue};
    margin-bottom: 20px;
    line-height: 1.2;
  }

  p {
    font-size: 1.4rem;
    color: ${colors.darkGrey};
    line-height: 1.9;
    max-width: 600px;
  }
`;

const ImageContainer = styled(motion.div)`
  width: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 18px 35px rgba(0, 0, 0, 0.12);

  @media (max-width: 900px) {
    width: 100%;
    max-width: 400px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ServicesSection = styled(motion.section)`
  margin-top: 100px;
  padding: 60px 40px;
  width: 100%;
  max-width: 1200px;
  text-align: center;
  z-index: 1;
`;

const ServiceTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: ${colors.royalBlue};
  margin-bottom: 60px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.85);
  padding: 35px;
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.07);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.12);
  }

  h3 {
    font-size: 1.9rem;
    font-weight: 600;
    color: ${colors.royalBlue};
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    color: ${colors.darkGrey};
    line-height: 1.7;
  }
`;

const ServiceIcon = styled(FontAwesomeIcon)`
  font-size: 3.5rem;
  color: ${colors.limeGreen};
  margin-bottom: 20px;
  transition: color 0.3s ease-in-out;

  ${ServiceCard}:hover & {
    color: ${colors.royalBlue};
  }
`;

const About: React.FC = () => {
  return (
    <AboutSection>
      {/* Floating Background Blobs */}
      <AnimatedBlob style={{ top: "-100px", left: "-120px" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.limeGreen}
            d="M41.6,-58.3C53.8,-49.8,63.6,-36.4,65.5,-22.3C67.5,-8.2,61.7,6.5,53.1,19.5C44.4,32.6,32.9,44,18.8,51.6C4.8,59.3,-11.7,63.2,-26.2,57.8C-40.8,52.4,-53.4,37.8,-60.4,21.1C-67.4,4.3,-68.9,-14.6,-60.8,-28.4C-52.7,-42.2,-34.9,-51,-18.1,-58.5C-1.3,-65.9,13.4,-71.1,27.4,-65.1C41.4,-59.1,55.7,-41.5,41.6,-58.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <AnimatedBlob style={{ bottom: "-100px", right: "-120px", animationDuration: "15s" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.royalBlue}
            d="M36.6,-60.4C49.5,-51.1,62.4,-41.2,66.2,-28.2C70.1,-15.3,64.8,-0.2,60.8,15.6C56.8,31.4,54.2,47.9,43.4,58.7C32.6,69.5,13.3,74.5,-4.2,78.6C-21.6,82.8,-43.3,86.1,-53.2,75.4C-63.1,64.8,-61.1,40.2,-61.6,22.2C-62.1,4.2,-65.1,-7.1,-59.2,-20.1C-53.3,-33.2,-38.5,-48,-22.5,-55.4C-6.6,-62.7,10.7,-62.7,36.6,-60.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      {/* Main About Content */}
      <AboutContainer initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <TextContent>
          <h2>About SkenVa Creatives</h2>
          <p>We ignite SME growth through innovative branding and digital marketing solutions that drive measurable impact, creativity, and brand transformation.</p>
        </TextContent>
        <ImageContainer initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
          <Image src={aboutImage} alt="About Us" />
        </ImageContainer>
      </AboutContainer>

      {/* Services Section */}
      <ServicesSection initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.3 }}>
        <ServiceTitle>What We Do</ServiceTitle>
        <ServicesGrid>
          <ServiceCard whileHover={{ scale: 1.07 }}>
            <ServiceIcon icon={faPalette} />
            <h3>Brand Identity</h3>
            <p>From logos to full branding packages, we craft your visual identity with consistency and impact.</p>
          </ServiceCard>
          <ServiceCard whileHover={{ scale: 1.07 }}>
            <ServiceIcon icon={faLaptopCode} />
            <h3>Web Design & Development</h3>
            <p>We design and develop modern, responsive, and user-centric websites tailored to your brand.</p>
          </ServiceCard>
          <ServiceCard whileHover={{ scale: 1.07 }}>
            <ServiceIcon icon={faChartLine} />
            <h3>Digital Marketing</h3>
            <p>Reach your audience with effective SEO, paid ads, and social media strategies that drive results.</p>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>
    </AboutSection>
  );
};

export default About;
