import React from "react";
import styled from "styled-components";

const TestimonialsContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const TestimonialCard = styled.div`
  background-color: #222;
  color: white;
  padding: 20px;
  margin: 15px auto;
  max-width: 500px;
  border-radius: 10px;
`;

const Testimonials: React.FC = () => {
  return (
    <TestimonialsContainer>
      <h2>What Our Clients Say</h2>
      <TestimonialCard>
        <p>"SkenVa helped us boost our sales with top-tier SEO!" - Idyllic</p>
      </TestimonialCard>
      <TestimonialCard>
        <p>"Their graphic designs elevated our brand visibility!" - Artkings Builders</p>
      </TestimonialCard>
    </TestimonialsContainer>
  );
};

export default Testimonials;
