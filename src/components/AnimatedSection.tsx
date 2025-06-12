import React from "react"; // Removed useEffect, useState
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const SectionContainer = styled(motion.section)` // Changed from div to section
  // opacity: 0; // Framer Motion handles initial state
  // transform: translateY(50px); // Framer Motion handles initial state
  // transition: 0.8s ease-in-out; // This might conflict or be redundant with Framer Motion's transition
`;

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string; // Added id prop
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, id }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Keeps the animation triggered once
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  return (
    <SectionContainer
      ref={ref} // Attach the ref here
      id={id} // Added ID to the SectionContainer
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Use inView directly
      transition={{ duration: 0.8, ease: "easeOut" }} // Define transition in Framer Motion
    >
      {children}
    </SectionContainer>
  );
};

export default AnimatedSection;