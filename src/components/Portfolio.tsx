import React from "react";
import styled from "styled-components";
import portfolio2 from "../assets/images/portfolio2.jpg";
import portfolio3 from "../assets/images/portfolio3.jpg";
import { colors } from "../assets/styles/colors";

const PortfolioContainer = styled.div`
  text-align: center;
  padding: 100px 60px;
  background: linear-gradient(to bottom, ${colors.white},  ${colors.lightGrey});
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.royalBlue};
  margin-bottom: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }
`;

const PortfolioCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 400px;

  &:hover {
    background: linear-gradient(135deg, ${colors.royalBlue}, ${colors.limeGreen});
    box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
  border-radius: 12px;
  object-fit: cover;
  transition: filter 0.3s ease-in-out;
  filter: brightness(80%); /* Slight darkening */

  ${PortfolioCard}:hover & {
    filter: brightness(50%);
  }
`;

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
`;

const DetailsWrapper = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${PortfolioCard}:hover & {
    opacity: 1;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: white;
  max-width: 280px;
  margin: 10px auto;
  line-height: 1.6;
`;

const ViewButton = styled.a`
  display: inline-block;
  background: white;
  color: ${colors.royalBlue};
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background: ${colors.limeGreen};
    color: white;
  }
`;

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: "Graphic Design",
      img: portfolio2,
      description: "Impactful branding with strong visual identity.",
      link: "#graphic-design",
    },
    {
      title: "UI/UX Design",
      img: portfolio2,
      description: "Engaging interfaces for seamless user experience.",
      link: "#ui-ux",
    },
    {
      title: "Development",
      img: portfolio3,
      description: "Scalable, optimized websites with clean coding.",
      link: "#development",
    },
    {
      title: "Digital Marketing",
      img: portfolio3,
      description: "Strategic brand visibility for business growth.",
      link: "#marketing",
    },
  ];

  return (
    <PortfolioContainer>
      <Title>Our Portfolio</Title>
      <Grid>
        {projects.map((project, index) => (
          <PortfolioCard key={index}>
            <ImageWrapper>
              <Image src={project.img} alt={project.title} />
              <TitleOverlay>{project.title}</TitleOverlay>
            </ImageWrapper>
            <DetailsWrapper>
              <Description>{project.description}</Description>
              <ViewButton href={project.link}>View Project</ViewButton>
            </DetailsWrapper>
          </PortfolioCard>
        ))}
      </Grid>
    </PortfolioContainer>
  );
};

export default Portfolio;
