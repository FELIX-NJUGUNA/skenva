import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faLaptopCode,
  faChartLine,
  faPhotoVideo,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../assets/styles/colors";
import about1 from "../assets/images/about1.webp";
import about3 from "../assets/images/about3.webp";
import about4 from "../assets/images/about5.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// === Assets ===
const aboutImages = [about1, about3, about4];

const sliderSettings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 1200,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

// === Styled Components ===
const AboutSection = styled.section.attrs(() => ({
  role: "region",
  "aria-label": "About SkenVa Creatives section",
}))`
  position: relative;
  font-family: "Montserrat", sans-serif;
  overflow: hidden;
  padding: 100px 40px;
  display: flex;
  z-index: 0;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #0908c3, ${colors.royalBlue});
  color: white;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const AnimatedBlob = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 0.1;
  animation: float 12s ease-in-out infinite alternate;

  @keyframes float {
    0% { transform: translate(0px, 0px) scale(1); }
    50% { transform: translate(30px, -20px) scale(1.05); }
    100% { transform: translate(0px, 0px) scale(1); }
  }

  svg {
    width: 500px;
    height: 500px;
  }
`;

const AboutContainer = styled(motion.article)`
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  gap: 60px;
  background: rgba(255, 255, 255, 0.12);
  padding: 50px;
  border-radius: 30px;
  backdrop-filter: blur(20px);
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 20px;
    border-radius: 20px;
    gap: 30px;
  }
`;

const TextContent = styled.div`
  flex: 1;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 20px;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.4rem;
    color: #dbeeff;
    line-height: 1.9;
    max-width: 600px;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      line-height: 1.7;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      line-height: 1.6;
    }
  }
`;

const ImageContainer = styled(motion.figure)`
  flex: 1;
  max-width: 500px;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 18px 35px rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 22px 40px rgba(255, 255, 255, 0.3);
  }

  .slick-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    transition: transform 0.5s ease-in-out;
    display: block;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

const ServicesSection = styled(motion.section)`
  margin-top: 100px;
  padding: 60px 40px;
  width: 100%;
  max-width: 1200px;
  text-align: center;
`;

const ServiceTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 60px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ServiceCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.1);
  padding: 35px;
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 28px rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.07);
    box-shadow: 0 18px 36px rgba(255, 255, 255, 0.12);
  }

  h3 {
    font-size: 1.9rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    color: #dbeeff;
    line-height: 1.7;
  }
`;

const ServiceIcon = styled(FontAwesomeIcon)`
  font-size: 3.5rem;
  color: ${colors.limeGreen};
  margin-bottom: 20px;
  transition: color 0.3s ease-in-out;

  ${ServiceCard}:hover & {
    color: ${colors.white};
  }
`;

// === Main Component ===
const About: React.FC = () => {
  return (
    <AboutSection>
      {/* Decorative Floating Backgrounds */}
      <AnimatedBlob style={{ top: "-100px", left: "-120px" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.lightBlue}
            d="M41.6,-58.3C53.8,-49.8,63.6,-36.4,65.5,-22.3C67.5,-8.2,61.7,6.5,53.1,19.5C44.4,32.6,32.9,44,18.8,51.6C4.8,59.3,-11.7,63.2,-26.2,57.8C-40.8,52.4,-53.4,37.8,-60.4,21.1C-67.4,4.3,-68.9,-14.6,-60.8,-28.4C-52.7,-42.2,-34.9,-51,-18.1,-58.5C-1.3,-65.9,13.4,-71.1,27.4,-65.1C41.4,-59.1,55.7,-41.5,41.6,-58.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <AnimatedBlob style={{ bottom: "-80px", right: "-100px", animationDuration: "15s" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.darkBlue}
            d="M36.6,-60.4C49.5,-51.1,62.4,-41.2,66.2,-28.2C70.1,-15.3,64.8,-0.2,60.8,15.6C56.8,31.4,54.2,47.9,43.4,58.7C32.6,69.5,13.3,74.5,-4.2,78.6C-21.6,82.8,-43.3,86.1,-53.2,75.4C-63.1,64.8,-61.1,40.2,-61.6,22.2C-62.1,4.2,-65.1,-7.1,-59.2,-20.1C-53.3,-33.2,-38.5,-48,-22.5,-55.4C-6.6,-62.7,10.7,-62.7,36.6,-60.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <ServiceTitle>About SkenVa Creatives</ServiceTitle>

      <AboutContainer>
        <TextContent>
          <h1>Igniting SME Growth through Branding & Marketing</h1>
          <p>
            At SkenVa Creatives, we specialize in digital marketing, brand identity, and visual content creation. Our solutions spark growth, enhance brand recognition, and elevate your business online.
          </p>
        </TextContent>
        <ImageContainer>
          <Slider {...sliderSettings}>
            {aboutImages.map((imgSrc, index) => (
              <div key={index}>
                <img src={imgSrc} alt={`SkenVa Creative team showcasing project ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </ImageContainer>
      </AboutContainer>

      <ServicesSection>
        <ServiceTitle>Our Creative Services</ServiceTitle>
        <ServicesGrid>
          <ServiceCard>
            <ServiceIcon icon={faPalette} />
            <h3>Brand Identity</h3>
            <p>We craft visually stunning branding solutions to boost your company’s identity.</p>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon icon={faChartLine} />
            <h3>Social Media Management</h3>
            <p>We manage, grow, and elevate your social presence like never before.</p>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon icon={faLaptopCode} />
            <h3>Web Development</h3>
            <p>We create modern, responsive websites tailored to your brand vision.</p>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon icon={faChartLine} />
            <h3>Digital Marketing</h3>
            <p>Expand your audience reach with SEO, paid ads, and growth strategies.</p>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon icon={faPalette} />
            <h3>Graphic Design</h3>
            <p>From social assets to product visuals, we make your brand visually unforgettable.</p>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon icon={faPhotoVideo} />
            <h3>Photography & Videography</h3>
            <p>We capture and produce high-quality content that tells your story visually.</p>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>
    </AboutSection>
  );
};

export default About;
