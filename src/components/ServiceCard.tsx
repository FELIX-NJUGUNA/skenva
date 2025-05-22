import React from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";

interface ServiceCardProps {
  title: string;
  services: { name: string; price: string }[];
  icon: React.ReactNode;
  accentColor: string;
  featuredIndex?: number;
}

const CardWrapper = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div<{ accentColor: string }>`
  font-size: 2.5rem;
  color: ${({ accentColor }) => accentColor};
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${colors.darkGrey};
  font-weight: 700;
`;

const ServiceItem = styled.div<{ featured: boolean; accentColor: string }>`
  margin-bottom: 0.8rem;
  padding: 0.8rem;
  border-left: 4px solid ${({ featured, accentColor }) =>
    featured ? accentColor : "transparent"};
  background: ${({ featured }) => (featured ? "#eef4ff" : "#f9f9f9")};
  border-radius: 0.5rem;
  color: ${colors.darkGrey};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: ${({ featured }) => (featured ? "#e0ecff" : "#f0f0f0")};
  }
`;



const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  services,
  icon,
  accentColor,
  featuredIndex = -1,
}) => {
  return (
    <CardWrapper>
      <div>
        <IconWrapper accentColor={accentColor}>{icon}</IconWrapper>
        <Title>{title}</Title>
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            featured={index === featuredIndex}
            accentColor={accentColor}
          >
            <strong>{service.name}</strong> <br /> {service.price}
          </ServiceItem>
        ))}
      </div>
      
    </CardWrapper>

    
  );
};

export default ServiceCard;
