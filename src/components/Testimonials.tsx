import React from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import placeholderImage from "../assets/images/placeholder.png"; 

const TestimonialsContainer = styled.div`
  padding: 80px 50px;
  background: linear-gradient(to bottom, ${colors.white}, ${colors.lightGrey});
  text-align: center;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  color: ${colors.royalBlue};
  margin-bottom: 40px;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  justify-content: center;
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;

  &:hover {
   background: linear-gradient(135deg, ${colors.royalBlue}, ${colors.limeGreen});
    box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.25);
  }

  &:hover div {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  ${TestimonialCard}:hover & {
    transform: scale(1.1);
  }
`;

const DetailsWrapper = styled.div`
  position: absolute;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const Quote = styled.p`
  font-size: 1rem;
  color: white;
  font-style: italic;
  margin-bottom: 8px;
`;

const Name = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
`;

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Idyllic",
      quote: "SkenVa helped us boost our sales with top-tier SEO!",
      img: placeholderImage,
    },
    {
      name: "ArtKings Builders",
      quote: "Their graphic designs elevated our brand visibility!",
      img: placeholderImage,
    },
    {
      name: "Vibe Creatives",
      quote: "Amazing branding services that transformed our online presence!",
      img: placeholderImage,
    },
  ];

  return (
    <TestimonialsContainer>
      <Title>What Our Clients Say</Title>
      <TestimonialGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <Image src={testimonial.img} alt={testimonial.name} />
            <DetailsWrapper>
              <Quote>"{testimonial.quote}"</Quote>
              <Name>- {testimonial.name}</Name>
            </DetailsWrapper>
          </TestimonialCard>
        ))}
      </TestimonialGrid>
    </TestimonialsContainer>
  );
};

export default Testimonials;
