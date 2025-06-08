import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { colors } from "../assets/styles/colors";

interface Service {
  name: string;
  price: string;
}

interface ServiceCardProps {
  title: string;
  services: Service[];
  icon: React.ReactNode;
  image?: string;
  accentColor: string;
}

const Card = styled(motion.div)<{ accentColor: string }>`
  background: linear-gradient(135deg, ${({ accentColor }) => accentColor} 0%, #000000 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }

  @media (hover: hover) {
    &:hover .view-button {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ImageOverlay = styled.div<{ image?: string }>`
  background: ${({ image }) =>
    image
      ? `url(${image}) center/cover no-repeat`
      : "linear-gradient(to right, rgba(255,255,255,0.1), rgba(0,0,0,0.1))"};
  position: absolute;
  opacity: 0.1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  z-index: 1;
  position: relative;
  color: ${colors.limeGreen};
`;

const Title = styled.h3`
  font-size: 1.8rem;
  margin: 1rem 0 0.5rem;
  z-index: 1;
  position: relative;
  color: ${colors.lightBlue};
`;

const DetailsWrapper = styled.div`
  margin-top: 1rem;
`;

const ServicesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceItem = styled(motion.li)`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ViewMoreButton = styled.button`
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(10px);

  @media (max-width: 768px) {
    display: none;
  }

  &.view-button {
    position: relative;
    z-index: 1;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  services,
  icon,
  image,
  accentColor,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const detailsVisible = isMobile || showDetails;

  return (
    <Card
      ref={ref}
      accentColor={accentColor}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <ImageOverlay image={image} />
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>

      <DetailsWrapper>
        <div
          style={{
            opacity: detailsVisible ? 1 : 0,
            transform: detailsVisible ? "translateY(0)" : "translateY(20px)",
            maxHeight: detailsVisible ? "400px" : "0",
            overflow: "hidden",
            transition: "all 0.5s ease",
          }}
        >
          <ServicesList>
            {services.map((service, index) => (
              <ServiceItem
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={inView && detailsVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                {service.name} – <strong>{service.price}</strong>
              </ServiceItem>
            ))}
          </ServicesList>
        </div>
        {!isMobile && (
          <ViewMoreButton
            onClick={() => setShowDetails(!showDetails)}
            className="view-button"
            aria-expanded={detailsVisible}
          >
            {detailsVisible ? "Hide" : "View More"}
          </ViewMoreButton>
        )}
      </DetailsWrapper>
    </Card>
  );
};

export default ServiceCard;
