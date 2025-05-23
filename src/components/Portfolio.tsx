import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../assets/styles/colors";
import { motion } from "framer-motion";

import company1Logo from "../assets/images/logo2.png";
import company2Logo from "../assets/images/logo2.png";
import company3Logo from "../assets/images/logo2.png";
import company4Logo from "../assets/images/logo2.png";

const PortfolioContainer = styled.section`
  text-align: center;
  
  padding: 100px 60px;
  font-family: "Montserrat", sans-serif;
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
    border-color: ${colors.limeGreen};
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
