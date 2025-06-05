import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../assets/styles/colors";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import heroImage1 from "../assets/images/webdesign.webp";
import heroImage2 from "../assets/images/design.webp";
import heroImage3 from "../assets/images/marketing.webp";
import heroImage4 from "../assets/images/about4.webp";// Assuming you have a utility function for preloading images

const preloadImages = async (imagePaths: string[]) => {
  await Promise.all(
    imagePaths.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    })
  );
};


const handleScroll = (id: string) => {
  const section = document.querySelector(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const HeroContainer = styled.section`
  height: 100dvh;
  width: 100%;
  z-index: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ImageWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100dvh;
  background-size: cover;
  background-position: center;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

   @media (max-width: 768px) {
    height: 100%
  }

  @media (max-width: 480px) {
    height: 100%
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  padding: 0 1rem;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 95%;
  }
`;

const Heading = styled(motion.h1)`
  font-size: 3rem;
  color: white;
  font-weight: 800;
  margin-bottom: 20px;
  text-shadow: 4px 4px 20px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subheading = styled(motion.p)`
  font-size: 1.5rem;
  color: white;
  font-weight: 400;
  margin-bottom: 20px;
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Description = styled(motion.p)`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 20px;
  max-width: 700px;
  text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const CTAButton = styled(motion.button)`
  padding: 14px 30px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: ${colors.royalBlue};
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  border: none;

  &:hover {
    background: ${colors.limeGreen};
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }

  &:nth-child(2) {
    background: ${colors.limeGreen};

    &:hover {
      background: ${colors.royalBlue};
    }
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 12px;
  border-radius: 50%;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  z-index: 3;
  opacity: 0;
  transition: all 0.4s ease-in-out;

  ${HeroContainer}:hover & {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    opacity: 1;
    padding: 10px;
  }

  &:hover {
    background: ${colors.limeGreen};
    transform: scale(1.15);
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
      description:
        "We specialize in website design and maintenance. Let our team of experts create a stunning website that delivers an exceptional user experience.",
    },
    {
      image: heroImage2,
      heading: "Creative Branding & Identity",
      subheading: "Graphics & Logo Design",
      description:
        "Develop a strong visual identity with our creative branding solutions. We ensure your designs align with your brand values and audience appeal.",
    },
    {
      image: heroImage3,
      heading: "Powerful Marketing Strategies",
      subheading: "SEO & Digital Growth",
      description:
        "Increase visibility and boost sales with top-tier SEO and marketing strategies. We optimize your presence to ensure sustainable growth.",
    },
    {
      image: heroImage4, 
      heading: "Strategic Social Media Management",
      subheading: "Engagement & Growth",
      description:
        "Boost your brand's online presence with expert social media management. We craft compelling content, optimize engagement, and grow your audience effectively.",
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    preloadImages(slides.map((slide) => slide.image)); // Preload all images
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <HeroContainer>
      <AnimatePresence mode="wait">
        <ImageWrapper
          key={slides[currentSlideIndex].image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          style={{ backgroundImage: `url(${slides[currentSlideIndex].image})` }}
        />
      </AnimatePresence>

      <ContentWrapper>
        <Heading
          key={slides[currentSlideIndex].heading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {slides[currentSlideIndex].heading}
        </Heading>
        <Subheading>{slides[currentSlideIndex].subheading}</Subheading>
        <Description>{slides[currentSlideIndex].description}</Description>
        <CTAContainer>
          <CTAButton onClick={() => handleScroll("#services")}>Explore Services</CTAButton>
          <CTAButton onClick={() => handleScroll("#contact")}>Get in Touch</CTAButton>
        </CTAContainer>;
      </ContentWrapper>

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
