import React from "react";
import styled from "styled-components";
import aboutImage from "../assets/images/bg.jpg";
import { colors } from "../assets/styles/colors";

const AboutSection = styled.section`
  background: linear-gradient(135deg, ${colors.white} 0%, #f9f9f9 100%);
  padding: 80px 40px;
  display: flex;
  justify-content: center;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  gap: 60px;
  background-color: ${colors.white};
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;

  h2 {
    font-size: 2.8rem;
    font-weight: 700;
    color: ${colors.royalBlue};
    margin-bottom: 20px;
  }

  p {
    font-size: 1.25rem;
    color: ${colors.darkGrey || "#444"};
    line-height: 1.7;
    max-width: 600px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 420px;
  max-width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.025);
  }
`;

const AccentBar = styled.div`
  position: absolute;
  width: 100px;
  height: 8px;
  background: ${colors.limeGreen};
  bottom: -14px;
  left: 20px;
  border-radius: 4px;
`;

const About: React.FC = () => {
  return (
    <AboutSection>
      <AboutContainer>
        <TextContent>
          <h2>About SkenVa Creatives</h2>
          <p>
            We ignite SME growth through innovative branding and digital marketing solutions that drive measurable impact, creativity, and brand transformation.
          </p>
        </TextContent>
        <ImageContainer>
          <Image src={aboutImage} alt="About Us" />
          <AccentBar />
        </ImageContainer>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
