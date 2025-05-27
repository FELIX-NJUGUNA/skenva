import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import company1Logo from "../assets/images/lplogo.png";
import company2Logo from "../assets/images/artkings.png";
import company3Logo from "../assets/images/logo2.png";
import company4Logo from "../assets/images/image.png"; // Placeholder for additional logos


// FLOATING BLOB EFFECT
const AnimatedBlob = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 0.12;
  animation: float 12s ease-in-out infinite;
  pointer-events: none;

  @keyframes float {
    0% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-40px) scale(1.05); }
    100% { transform: translateY(0px) scale(1); }
  }

  svg {
    width: 350px;
    height: 350px;
  }
`;

const PortfolioContainer = styled.div`
  padding: 80px 50px;
  z-index: 0;
  backdrop-filter: blur(15px);
  background: linear-gradient(135deg, #0908c3, ${colors.royalBlue});
  text-align: center;
  font-family: "Montserrat", sans-serif;
  position: relative;
  overflow: hidden;
  
`;

const Title = styled.h2`
  font-size: 2.8rem;
  z-index: 0;
  font-weight: bold;
  color: ${colors.white};
  margin-bottom: 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

// CAROUSEL STYLING
const LogoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 10px 20px;
  z-index: 0;
  @media (max-width: 480px) {
    gap: 15px; /* Reducing gap for small screens */
    padding: 5px 10px;
  }
`;


const LogoCard = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.71);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px) scale(1.1);
  }

  @media (max-width: 480px) {
    width: 120px; /* Smaller size for mobile */
    height: 120px;
  }
`;

const Logo = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;

  @media (max-width: 480px) {
    max-width: 80px; /* Adjusted size for mobile */
    max-height: 80px;
  }
`;



// CAROUSEL DOTS INDICATOR
const Dots = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 12px;
  position: relative;
  z-index: 2;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active }) => (active ? colors.limeGreen : "#ffffff")};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: all 0.3s ease;
`;

const Portfolio: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const companies = [company1Logo, company2Logo, company3Logo, company4Logo]; 

  useEffect(() => {
    const interval = setInterval(() => {
      if (wrapperRef.current) {
        const newIndex = (activeIndex + 1) % companies.length;
        wrapperRef.current.scrollTo({ left: newIndex * 180, behavior: "smooth" });
        setActiveIndex(newIndex);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, companies.length]);

  return (
    <PortfolioContainer>
      {/* Floating blobs for dynamic aesthetics */}
      <AnimatedBlob style={{ top: "-80px", left: "-100px" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.white}
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

      <Title>Companies We've Worked With</Title>

      <LogoWrapper ref={wrapperRef}>
        {companies.map((logo, index) => (
          <LogoCard key={index}>
            <Logo src={logo} alt={`Company ${index + 1}`} />
          </LogoCard>
        ))}
      </LogoWrapper>

      <Dots>{companies.map((_, idx) => <Dot key={idx} active={idx === activeIndex} />)}</Dots>
    </PortfolioContainer>
  );
};

export default Portfolio;
