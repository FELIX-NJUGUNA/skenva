import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import company1Logo from "../assets/images/lplogo.webp";
import company2Logo from "../assets/images/artkings.webp";
import company3Logo from "../assets/images/logo2.webp";
import company4Logo from "../assets/images/image.webp"; 
import company5logo from "../assets/images/vba.webp";
import company6Logo from "../assets/images/stkvti.webp";
import company7Logo from "../assets/images/vault.webp"; // Placeholder for additional logo

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


  @media (max-width: 600px) {
    width: 200px;
    height: 200px;
  }
`;

const PortfolioContainer = styled.section`
  padding: 80px 50px;
  z-index: -1;
  backdrop-filter: blur(15px);
  background: linear-gradient(135deg, #0908c3, ${colors.royalBlue});
  text-align: center;
  font-family: "Montserrat", sans-serif;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 30px;
  }

  @media (max-width: 480px) {
    padding: 40px 20px;
  }
`;

const Title = styled.h2`
  font-size: 2.8rem;
  z-index: -1;
  font-weight: 700;
  color: ${colors.white};
  margin-bottom: 40px;
  position: relative;
  text-shadow: 0 2px 6px rgba(0,0,0,0.4);

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }

  @media (max-width: 360px) {
    font-size: 1.5rem;
  }
`;


// CAROUSEL STYLING WITH SCROLL SNAP
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 20px;
  padding: 10px 20px;
  scroll-padding-left: 20px;
  max-width: 100%;
  margin: 0 auto;

  & > div {
    scroll-snap-align: center;
    flex-shrink: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;


const LogoCard = styled.div`
  flex: 0 0 auto;
  width: 160px;
  height: 160px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;

  &:hover,
  &:focus-within {
    transform: translateY(-8px) scale(1.12);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
    padding-bottom: 12px;
  }

  @media (max-width: 360px) {
    width: 100px;
    height: 100px;
  }
`;


const Logo = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  user-select: none;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    max-width: 80px;
    max-height: 80px;
    margin-bottom: 6px;
  }
`;

const CompanyName = styled.p`
  color: ${colors.white};
  font-size: 0.7rem;
  font-weight: 600;
  user-select: none;
  pointer-events: none;
  background: linear-gradient(135deg, ${colors.royalBlue}, ${colors.limeGreen});
  padding: 5px;
  font-family: "Montserrat", sans-serif;
  border-radius: 7px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  max-width: 90%;
  overflow-wrap: break-word;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 4px 10px;
  }
`;

// CAROUSEL DOTS INDICATOR
const Dots = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 14px;
  position: relative;
  z-index: 2;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ active }) => (active ? colors.limeGreen : "#ffffff")};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  margin: 0;
  outline-offset: 3px;

  &:focus-visible {
    outline: 2px solid ${colors.limeGreen};
  }
`;

const companies = [
  { logo: company1Logo, name: "Legacy Pixels" },
  { logo: company2Logo, name: "Art Kings" },
  { logo: company3Logo, name: "Skenva Creatives" },
  { logo: company4Logo, name: "Idyllic Living" },
  { logo: company5logo, name: "Valuable Brands" },
  { logo: company6Logo, name: "St kizito VTI" },
  { logo: company7Logo, name: "Vault Retro" }, // Placeholder for additional logo 
];

const Partners: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll carousel on activeIndex change
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper && wrapper.children.length) {
      const card = wrapper.children[0] as HTMLElement;
      const cardWidth = card.offsetWidth + 20; // width + gap
      wrapper.scrollTo({
        left: activeIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);
  

  // Auto cycle logos every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % companies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PortfolioContainer aria-label="Portfolio of companies we've worked with">
      {/* Floating blobs */}
      <AnimatedBlob style={{ top: "-80px", left: "-100px" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path
            fill={colors.white}
            d="M41.6,-58.3C53.8,-49.8,63.6,-36.4,65.5,-22.3C67.5,-8.2,61.7,6.5,53.1,19.5C44.4,32.6,32.9,44,18.8,51.6C4.8,59.3,-11.7,63.2,-26.2,57.8C-40.8,52.4,-53.4,37.8,-60.4,21.1C-67.4,4.3,-68.9,-14.6,-60.8,-28.4C-52.7,-42.2,-34.9,-51,-18.1,-58.5C-1.3,-65.9,13.4,-71.1,27.4,-65.1C41.4,-59.1,55.7,-41.5,41.6,-58.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <AnimatedBlob style={{ bottom: "-80px", right: "-100px", animationDuration: "15s" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <path
            fill={colors.darkBlue}
            d="M36.6,-60.4C49.5,-51.1,62.4,-41.2,66.2,-28.2C70.1,-15.3,64.8,-0.2,60.8,15.6C56.8,31.4,54.2,47.9,43.4,58.7C32.6,69.5,13.3,74.5,-4.2,78.6C-21.6,82.8,-43.3,86.1,-53.2,75.4C-63.1,64.8,-61.1,40.2,-61.6,22.2C-62.1,4.2,-65.1,-7.1,-59.2,-20.1C-53.3,-33.2,-38.5,-48,-22.5,-55.4C-6.6,-62.7,10.7,-62.7,36.6,-60.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <Title tabIndex={-1}>Companies We've Worked With</Title>

      <LogoWrapper ref={wrapperRef} role="list">
        {companies.map(({ logo, name }, index) => (
          <LogoCard key={index} tabIndex={0} role="listitem" aria-label={`${name} company logo`}>
            <Logo src={logo} alt={`${name} logo`} loading="lazy" />
            <CompanyName>{name}</CompanyName>
          </LogoCard>
        ))}
      </LogoWrapper>

      <Dots role="tablist" aria-label="Company carousel navigation">
        {companies.map(({ name }, idx) => (
          <Dot
            key={idx}
            active={idx === activeIndex}
            role="tab"
            aria-selected={idx === activeIndex}
            aria-label={`Go to ${name}`}
            tabIndex={0}
            onClick={() => setActiveIndex(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveIndex(idx);
              }
            }}
          />
        ))}
      </Dots>
    </PortfolioContainer>
  );
};

export default Partners;
