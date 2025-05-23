import React from "react";
import styled from "styled-components";

interface ServiceCardProps {
  title: string;
  services: { name: string; price: string }[];
  icon: React.ReactNode;
  accentColor: string;
}

const Card = styled.div<{ accentColor: string }>`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  width: 320px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
      `linear-gradient(135deg, ${accentColor}, #ffffff22)`};
    z-index: -1;
  }
`;

const IconWrapper = styled.div<{ accentColor: string }>`
  width: 60px;
  height: 60px;
  background: ${({ accentColor }) => accentColor};
  color: white;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 1.8rem;
  margin: 0 auto 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #111;
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;

  span {
    display: block;
    font-weight: 600;
    color: #000;
  }
`;

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  services,
  icon,
  accentColor,
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
