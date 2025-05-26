import React from "react";
import styled, { keyframes } from "styled-components";

interface ServiceCardProps {
  title: string;
  services: { name: string; price: string }[];
  icon: React.ReactNode;
  accentColor?: string;
}

const DEFAULT_ACCENT = "#0038ff";

// Blob float animation
const floatBlob = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translate(20px, -10px) scale(1.1);
    opacity: 0.25;
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.4;
  }
`;

const Card = styled.div<{ accentColor?: string }>`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  width: 320px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  color: white;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px ${({ accentColor }) => accentColor || DEFAULT_ACCENT}88;
  }

  &::before {
    content: "";
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    border-radius: 24px;
    background: ${({ accentColor }) =>
      `linear-gradient(135deg, ${accentColor || DEFAULT_ACCENT}, #ffffff22)`};
    z-index: -2;
  }

  &::after {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 200px;
    height: 200px;
    background: ${({ accentColor }) => accentColor || DEFAULT_ACCENT};
    opacity: 0.2;
    filter: blur(80px);
    border-radius: 50%;
    animation: ${floatBlob} 6s ease-in-out infinite;
    z-index: -3;
  }
`;

const IconWrapper = styled.div<{ accentColor?: string }>`
  width: 60px;
  height: 60px;
  background: ${({ accentColor }) => accentColor || DEFAULT_ACCENT};
  color: white;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 1.8rem;
  margin: 0 auto 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #e0e8ff;

  span {
    display: block;
    font-weight: 600;
    color: #ffffff;
  }
`;

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  services,
  icon,
  accentColor = DEFAULT_ACCENT,
}) => {
  return (
    <Card accentColor={accentColor}>
      <IconWrapper accentColor={accentColor}>{icon}</IconWrapper>
      <Title>{title}</Title>
      <ServiceList>
        {services.map((service, index) => (
          <ServiceItem key={index}>
            <span>{service.name}</span>
            {service.price}
          </ServiceItem>
        ))}
      </ServiceList>
    </Card>
  );
};

export default ServiceCard;
