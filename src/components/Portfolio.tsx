import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../assets/styles/colors";
import { motion } from "framer-motion";

import company1Logo from "../assets/images/logo2.png";
import company2Logo from "../assets/images/logo2.png";
import company3Logo from "../assets/images/logo2.png";
import company4Logo from "../assets/images/logo2.png";

// FLOAT ANIMATION
const float = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(30px, -20px) scale(1.05); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

// BLOB STYLES
const AnimatedBlob = styled.div<{ top?: string; left?: string; bottom?: string; right?: string; duration?: string }>`
  position: absolute;
  z-index: 0;
  opacity: 0.08;
  animation: ${float} ${({ duration }) => duration || "12s"} ease-in-out infinite alternate;
  pointer-events: none;

  ${({ top }) => top && `top: ${top};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}
  ${({ right }) => right && `right: ${right};`}

  svg {
    width: 500px;
    height: 500px;
  }
`;

const PortfolioContainer = styled.section`
  text-align: center;
  padding: 100px 60px;
  font-family: "Montserrat", sans-serif;
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.royalBlue};
  margin-bottom: 50px;

  @media (max-width: 600px) {
    font-size: 2.4rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  justify-content: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease-in-out;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    border-color: ${colors.royalBlue};
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  }

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    left: -40%;
    width: 180%;
    height: 180%;
    background: linear-gradient(120deg, ${colors.royalBlue}, ${colors.limeGreen});
    transform: rotate(45deg);
    opacity: 0;
    transition: 0.5s;
    z-index: 0;
  }

  &:hover::before {
    opacity: 0.15;
  }
`;

const Logo = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 20px;
  z-index: 1;
`;

const CompanyName = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${colors.royalBlue};
  margin-bottom: 10px;
  z-index: 1;
`;

const Category = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${colors.darkGrey};
  margin-bottom: 20px;
  z-index: 1;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.limeGreen};
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: ${colors.royalBlue};
    transform: scale(1.1);
  }
`;

const Portfolio: React.FC = () => {
  const companies = [
    { name: "Tech Innovations", logo: company1Logo, category: "AI Solutions", link: "#tech-innovations" },
    { name: "Creative Agency", logo: company2Logo, category: "Branding & Design", link: "#creative-agency" },
    { name: "E-Commerce Solutions", logo: company3Logo, category: "Online Business Platforms", link: "#ecommerce" },
    { name: "Marketing Experts", logo: company4Logo, category: "Digital Marketing", link: "#marketing-experts" },
  ];

  return (
    <PortfolioContainer>
      {/* Floating blobs */}
      <AnimatedBlob top="-100px" left="-100px">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.limeGreen}
            d="M41.6,-58.3C53.8,-49.8,63.6,-36.4,65.5,-22.3C67.5,-8.2,61.7,6.5,53.1,19.5C44.4,32.6,32.9,44,18.8,51.6C4.8,59.3,-11.7,63.2,-26.2,57.8C-40.8,52.4,-53.4,37.8,-60.4,21.1C-67.4,4.3,-68.9,-14.6,-60.8,-28.4C-52.7,-42.2,-34.9,-51,-18.1,-58.5C-1.3,-65.9,13.4,-71.1,27.4,-65.1C41.4,-59.1,55.7,-41.5,41.6,-58.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <AnimatedBlob bottom="-120px" right="-120px" duration="16s">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.royalBlue}
            d="M36.6,-60.4C49.5,-51.1,62.4,-41.2,66.2,-28.2C70.1,-15.3,64.8,-0.2,60.8,15.6C56.8,31.4,54.2,47.9,43.4,58.7C32.6,69.5,13.3,74.5,-4.2,78.6C-21.6,82.8,-43.3,86.1,-53.2,75.4C-63.1,64.8,-61.1,40.2,-61.6,22.2C-62.1,4.2,-65.1,-7.1,-59.2,-20.1C-53.3,-33.2,-38.5,-48,-22.5,-55.4C-6.6,-62.7,10.7,-62.7,36.6,-60.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <Title>Companies We've Worked With</Title>
      <Grid>
        {companies.map((company, index) => (
          <Card
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <Logo src={company.logo} alt={company.name} />
            <CompanyName>{company.name}</CompanyName>
            <Category>{company.category}</Category>
            <LinkButton href={company.link}>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </LinkButton>
          </Card>
        ))}
      </Grid>
    </PortfolioContainer>
  );
};

export default Portfolio;
