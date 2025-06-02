import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import ServiceCard from "../components/ServiceCard";
import BookingModal from "../components/BookingModal";
import { FaPaintBrush, FaFacebook, FaGlobe, FaSearch } from "react-icons/fa";

// Container for the entire services section
const ServicesContainer = styled.section`
  position: relative;
  padding: 5rem 2rem;
  font-family: "Montserrat", sans-serif;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(135deg, ${colors.royalBlue} , #001d6e); 
  color: white;
  z-index: 0;
`;


// Animated background blob styles
const AnimatedBlob = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 0.15;
  animation: float 10s ease-in-out infinite;
  pointer-events: none;

  @keyframes float {
    0% {
      transform: translateY(0px) translateX(0px) scale(1);
    }
    50% {
      transform: translateY(-40px) translateX(20px) scale(1.05);
    }
    100% {
      transform: translateY(0px) translateX(0px) scale(1);
    }
  }

  svg {
    width: 400px;
    height: 400px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${colors.white};
  margin-bottom: 1rem;
  z-index: 1;
  position: relative;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.white};
  max-width: 700px;
  margin: 0 auto 3rem;
  z-index: 1;
  position: relative;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  z-index: 1;
  position: relative;
`;

const CallToAction = styled.button`
  display: inline-block;
  margin-top: 4rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, ${colors.royalBlue}, ${colors.limeGreen});
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  }
`;

const Services: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const graphicDesignServices = [
    { name: "Logos", price: "2,500 – 5,000 Ksh" },
    { name: "Business Cards", price: "500 – 1,000 Ksh" },
    { name: "Flyers & Posters", price: "500 – 1,000 Ksh" },
    { name: "Social Media Posts", price: "500 Ksh" },
    { name: "3D Logo Makeup", price: "500 Ksh" },
  ];

  const socialMediaServices = [
    { name: "Basic Package", price: "10,000 Ksh (1 platform, 12 posts/month)" },
    { name: "Standard Package", price: "25,000 Ksh (3 platforms, 15 posts/week)" },
    { name: "Premium Package", price: "32,000 Ksh (4 platforms, SEO, WhatsApp)" },
  ];

  const webBrandingServices = [
    { name: "Basic Website", price: "15,000 Ksh (Info only, basic SEO)" },
    { name: "Business Website", price: "35,000 Ksh (With bookings, advanced SEO)" },
    { name: "Branding Consulting", price: "Customized Packages" },
  ];

  const seoServices = [
    { name: "Basic SEO Audit", price: "5,000 Ksh" },
    { name: "On-Page SEO Optimization", price: "10,000 Ksh" },
    { name: "Technical SEO Setup", price: "12,000 Ksh" },
    { name: "Monthly SEO Management", price: "20,000 Ksh" },
  ];
  


  return (
    <ServicesContainer>
      {/* Animated Background Blobs */}
      <AnimatedBlob style={{ top: "-100px", left: "-150px" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.white}
            d="M42.3,-56.8C56.7,-49.5,70.4,-38.1,72.5,-24.6C74.6,-11.1,65.1,4.5,56.6,19.2C48,33.9,40.4,47.7,28.5,56.1C16.6,64.5,0.3,67.5,-13.9,63.3C-28.1,59.1,-40.3,47.6,-49.5,35.4C-58.6,23.1,-64.8,10,-65.1,-3.5C-65.5,-17.1,-60,-31.1,-49.4,-40.5C-38.8,-50,-23.1,-54.8,-8.2,-53.3C6.6,-51.7,13.2,-43.9,42.3,-56.8Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <AnimatedBlob style={{ bottom: "-100px", right: "-120px", animationDuration: "15s" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.royalBlue}
            d="M34.2,-56.3C46.7,-45.9,59.4,-39,66.8,-28.1C74.2,-17.3,76.2,-2.7,70.8,9.5C65.5,21.6,52.8,31.3,41.3,41.4C29.7,51.6,19.3,62.3,5.2,65.1C-8.9,67.9,-17.8,62.8,-28.6,56.1C-39.4,49.3,-52.2,40.8,-59.3,28.9C-66.4,17.1,-67.9,1.9,-64.8,-11.2C-61.7,-24.3,-54,-35.2,-43.9,-45.3C-33.8,-55.4,-21.2,-64.6,-7.4,-65.5C6.4,-66.3,12.8,-59.6,34.2,-56.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      {/* Section Content */}
      <Title>Our Services</Title>
      <Subtitle>
        We offer a range of high-quality services to help businesses enhance their brand, digital presence, and engagement.
      </Subtitle>

      <CardsWrapper>
        <ServiceCard
          title="Graphic Design"
          services={graphicDesignServices}
          icon={<FaPaintBrush />}
          accentColor={colors.royalBlue}
        />
        <ServiceCard
          title="Social Media Management"
          services={socialMediaServices}
          icon={<FaFacebook />}
          accentColor={colors.limeGreen}
        />
        <ServiceCard
          title="Web & Branding"
          services={webBrandingServices}
          icon={<FaGlobe />}
          accentColor={colors.royalBlue}
        />

        <ServiceCard
          title="SEO Services"
          services={seoServices}
          icon={<FaSearch />}
          accentColor={colors.limeGreen}
        />

      </CardsWrapper>

      <CallToAction onClick={() => setModalOpen(true)}>Book a Service</CallToAction>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </ServicesContainer>
  );
};

export default Services;
