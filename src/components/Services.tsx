import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import ServiceCard from "../components/ServiceCard";
import BookingModal from "../components/BookingModal"; // Import the modal
import { FaPaintBrush, FaFacebook, FaGlobe } from "react-icons/fa";

const ServicesContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(to bottom, ${colors.white}, ${colors.lightGrey});
  font-family: 'Poppins', sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${colors.royalBlue};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.darkGrey};
  max-width: 700px;
  margin: 0 auto 3rem;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
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

  return (
    <ServicesContainer>
      <Title>Our Services</Title>
      <Subtitle>
        We offer a range of high-quality services to help businesses enhance their brand, digital presence, and engagement.
      </Subtitle>

      <CardsWrapper>
        <ServiceCard title="Graphic Design" services={graphicDesignServices} icon={<FaPaintBrush />} accentColor={colors.royalBlue} />
        <ServiceCard title="Social Media Management" services={socialMediaServices} icon={<FaFacebook />} accentColor={colors.limeGreen} />
        <ServiceCard title="Web & Branding" services={webBrandingServices} icon={<FaGlobe />} accentColor={colors.royalBlue} />
      </CardsWrapper>

      <CallToAction onClick={() => setModalOpen(true)}>Book a Service</CallToAction>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </ServicesContainer>
  );
};

export default Services;
