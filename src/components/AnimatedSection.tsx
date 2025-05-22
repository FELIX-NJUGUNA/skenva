import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SectionContainer = styled(motion.section)` // Changed from div to section
  opacity: 0;
  transform: translateY(50px);
  transition: 0.8s ease-in-out;
`;

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string; // Added id prop
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, id }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.8;

      if (scrollY > triggerPoint) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SectionContainer
      id={id} // Added ID to the SectionContainer
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
    >
      {children}
    </SectionContainer>
  );
};

export default AnimatedSection;
