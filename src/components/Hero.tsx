import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../assets/styles/colors";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import heroImage1 from "../assets/images/portfolio1.jpg";
import heroImage2 from "../assets/images/portfolio2.jpg";
import heroImage3 from "../assets/images/portfolio3.jpg";

const HeroContainer = styled.section`
  height: 90vh;
  padding: 80px;
  background: linear-gradient(to bottom right, #f4f7fb, #eaf1fd);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);

  /* Floating blobs for a dynamic feel */
  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: rgba(29, 43, 100, 0.08);
    filter: blur(90px);
    z-index: 0;
  }

  &::before {
    width: 400px;
    height: 400px;
    top: -120px;
    left: -150px;
    animation: floatBlob1 15s infinite ease-in-out;
  }

  &::after {
    width: 350px;
    height: 350px;
    bottom: 80px;
    right: -100px;
    animation: floatBlob2 20s infinite ease-in-out;
  }

  @keyframes floatBlob1 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-25px); }
  }

  @keyframes floatBlob2 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
  }
`;


const ImageWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(70%);
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Heading = styled(motion.h1)`
  font-size: 4rem;
  color: white;
  font-weight: 800;
  margin-bottom: 30px;
  text-shadow: 2px 2px 14px rgba(0, 0, 0, 0.5);
`;

const Subheading = styled(motion.p)`
  font-size: 1.7rem;
  color: white;
  font-weight: 400;
  margin-bottom: 25px;
  text-shadow: 1px 1px 12px rgba(0, 0, 0, 0.5);
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 25px;
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
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  padding: 12px;
  border-radius: 50%;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.2s;

  ${HeroContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${colors.limeGreen};
    transform: scale(1.1);
  }
`;

const LeftButton = styled(ArrowButton)`
  left: 20px;
`;

const RightButton = styled(ArrowButton)`
  right: 20px;
`;

const Hero: React.FC = () => {
  const slides = [
    {
      image: heroImage1,
      heading: "Modern & Functional Platforms",
      subheading: "Website Design & Maintenance",
      description: "We specialize in WordPress website design and maintenance. Let our team of experts create a stunning website that delivers an exceptional user experience.",
    },
    {
      image: heroImage2,
      heading: "Creative Branding & Identity",
      subheading: "Graphics & Logo Design",
      description: "Develop a strong visual identity with our creative branding solutions. We ensure your designs align with your brand values and audience appeal.",
    },
    {
      image: heroImage3,
      heading: "Powerful Marketing Strategies",
      subheading: "SEO & Digital Growth",
      description: "Increase visibility and boost sales with top-tier SEO and marketing strategies. We optimize your presence to ensure sustainable growth.",
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <HeroContainer>
      <ImageWrapper
        key={slides[currentSlideIndex].image}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ backgroundImage: `url(${slides[currentSlideIndex].image})` }}
      />

      <ContentWrapper>
        <Heading
          key={slides[currentSlideIndex].heading}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {slides[currentSlideIndex].heading}
        </Heading>
        <Subheading
          key={slides[currentSlideIndex].subheading}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {slides[currentSlideIndex].subheading}
        </Subheading>
        <motion.p
          key={slides[currentSlideIndex].description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ color: "white", fontSize: "1.2rem", marginBottom: "20px", position: "relative" }}
        >
          {slides[currentSlideIndex].description}
        </motion.p>
        <CTAContainer>
          <CTAButton initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} href="#services">
            Explore Services
          </CTAButton>
          <CTAButton initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} href="#contact">
            Get in Touch
          </CTAButton>
        </CTAContainer>
      </ContentWrapper>

      {/* Navigation Buttons */}
      <LeftButton onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)}>
        <FaArrowLeft />
      </LeftButton>
      <RightButton onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % slides.length)}>
        <FaArrowRight />
      </RightButton>
    </HeroContainer>
  );
};

export default Hero;
