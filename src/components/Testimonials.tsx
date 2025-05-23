import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import client1 from "../assets/images/placeholder.png";
import client2 from "../assets/images/placeholder.png";
import client3 from "../assets/images/placeholder.png";
import client4 from "../assets/images/placeholder.png";

const TestimonialsContainer = styled.div`
  padding: 100px 50px;
  background: linear-gradient(to bottom, ${colors.white}, ${colors.lightGrey});
  text-align: center;
  font-family: "Montserrat", sans-serif;
  position: relative;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: ${colors.royalBlue};
  margin-bottom: 60px;
`;

const TestimonialWrapper = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 40px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  scroll-behavior: smooth;
  padding: 0 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TestimonialCard = styled.div<{ alternate: boolean }>`
  position: relative;
  min-width: 340px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  scroll-snap-align: start;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    height: 6px;
    width: 80px;
    background: ${({ alternate }) => (alternate ? colors.limeGreen : colors.royalBlue)};
    position: absolute;
    top: 20px;
    left: 30px;
    border-radius: 4px;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid ${colors.royalBlue};
  margin-right: 20px;
`;

const Name = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${colors.royalBlue};
  margin: 0;
`;

const Quote = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  color: ${colors.darkGrey};
  line-height: 1.6;
`;

const Dots = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active }) => (active ? colors.royalBlue : colors.limeGreen)};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: all 0.3s ease;
`;

const Testimonials: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    { name: "Idyllic", quote: "SkenVa helped us boost our sales with top-tier SEO!", img: client1 },
    { name: "ArtKings Builders", quote: "Their graphic designs elevated our brand visibility!", img: client2 },
    { name: "Vibe Creatives", quote: "Amazing branding services that transformed our online presence!", img: client3 },
    { name: "NextGen Solutions", quote: "Best web development experience we've had!", img: client4 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (wrapperRef.current) {
        const newIndex = (activeIndex + 1) % testimonials.length;
        wrapperRef.current.scrollTo({ left: newIndex * 380, behavior: "smooth" });
        setActiveIndex(newIndex);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, testimonials.length]);

  return (
    <TestimonialsContainer>
      <Title>What Our Clients Say</Title>
      <TestimonialWrapper ref={wrapperRef}>
        {testimonials.map((t, index) => (
          <TestimonialCard key={index} alternate={index % 2 === 0}>
            <ClientInfo>
              <Image src={t.img} alt={t.name} />
              <Name>{t.name}</Name>
            </ClientInfo>
            <Quote>"{t.quote}"</Quote>
          </TestimonialCard>
        ))}
      </TestimonialWrapper>
      <Dots>
        {testimonials.map((_, idx) => (
          <Dot key={idx} active={idx === activeIndex} />
        ))}
      </Dots>
    </TestimonialsContainer>
  );
};

export default Testimonials;
