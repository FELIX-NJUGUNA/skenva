import React from "react";
import styled from "styled-components";

const ServicesContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const ServiceItem = styled.div`
  background-color: #3f6dee;
  padding: 20px;
  margin: 15px auto;
  max-width: 600px;
  border-radius: 10px;
  color: white;
`;

const Services: React.FC = () => {
  return (
    <ServicesContainer>
      <h2>Graphic Design Services</h2>
      <ServiceItem>Logos: 2,500 – 5,000 Ksh</ServiceItem>
      <ServiceItem>Business Cards: 500 – 1,000 Ksh</ServiceItem>
      <ServiceItem>Flyers: 500 – 1,000 Ksh</ServiceItem>
      <ServiceItem>Social Media Posts: 500 Ksh</ServiceItem>
      <ServiceItem>3D Logo Makeup: 500 Ksh</ServiceItem>
    </ServicesContainer>
  );
};

export default Services;
