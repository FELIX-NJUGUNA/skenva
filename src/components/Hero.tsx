import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../assets/styles/colors";

import heroImage1 from "../assets/images/webdesign.webp";
import heroImage2 from "../assets/images/design.webp";
import heroImage3 from "../assets/images/marketing.webp";
import heroImage4 from "../assets/images/about4.webp";

// Helper to preload images
const preloadImages = async (srcs: string[]) => {
  await Promise.all(
    srcs.map((src) => {
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
  overflow: hidden;
  position: relative;
`;

const ContactBar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  background: #001d6e;
  border-bottom: 2px solid ${colors.limeGreen};
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  z-index: 100;
  font-size: 0.9rem;
  row-gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0.7rem 1rem;
  }
`;



const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;

  a {
    color: ${colors.limeGreen};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    text-align: center;
  }
`;



const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-left: 100px;

  a {
    color: ${colors.limeGreen};
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.lightBlue};
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
    margin: 0;
  }
`;



const ImageLayer = styled(motion.div)<{ bg: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  text-align: center;
`;

const ContentBox = styled.div`
  max-width: 900px;
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
`;

const Description = styled(motion.p)`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
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
  }

  @media (max-width: 768px) {
    opacity: 1;
  }

  &:hover {
    background: ${colors.limeGreen};
    transform: translateY(-50%) scale(1.15);
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
  const [previousSlideIndex, setPreviousSlideIndex] = useState<number | null>(null);

  useEffect(() => {
    preloadImages(slides.map((slide) => slide.image));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousSlideIndex(currentSlideIndex);
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [currentSlideIndex]);

  const currentSlide = slides[currentSlideIndex];
  const previousSlide = previousSlideIndex !== null ? slides[previousSlideIndex] : null;

  return (
    <HeroContainer>
      <ContactBar>
        <ContactInfo>
          Call us:{" "}
          <div><a href="tel:+254741553806">+254741553806/</a></div>
          <div><a href="tel:+254719155919">+254719155919</a></div>
        </ContactInfo>

        <SocialIcons>
          <a href="https://wa.me/254741553806" target="_blank" aria-label="WhatsApp" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href="https://www.facebook.com/share/19R96edYQy/" target="_blank" aria-label="Facebook" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://x.com/SkenVacreatives?t=WNivIjuNztjCsCZT-8iqfQ&s=09" target="_blank" aria-label="Twitter" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a href="https://www.instagram.com/skenvacreatives?igsh=anh1aTBudWxpZWY5" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://linkedin.com/company/skenvacreatives" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </SocialIcons>
      </ContactBar>

      {previousSlide && (
        <ImageLayer
          bg={previousSlide.image}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}
      <ImageLayer
        bg={currentSlide.image}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <ContentWrapper>
        <ContentBox>
          <Heading>{currentSlide.heading}</Heading>
          <Subheading>{currentSlide.subheading}</Subheading>
          <Description>{currentSlide.description}</Description>
          <CTAContainer>
            <CTAButton whileHover={{ scale: 1.05 }} onClick={() => handleScroll("#services")}>
              Explore Services
            </CTAButton>
            <CTAButton whileHover={{ scale: 1.05 }} onClick={() => handleScroll("#contact")}>
              Get in Touch
            </CTAButton>
          </CTAContainer>
        </ContentBox>
      </ContentWrapper>

      <LeftButton
        onClick={() => {
          setPreviousSlideIndex(currentSlideIndex);
          setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
        }}
      >
        <FaArrowLeft />
      </LeftButton>
      <RightButton
        onClick={() => {
          setPreviousSlideIndex(currentSlideIndex);
          setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
        }}
      >
        <FaArrowRight />
      </RightButton>
    </HeroContainer>
  );
};

export default Hero;
