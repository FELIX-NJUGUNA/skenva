import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import client1 from "../assets/images/placeholder.webp";
import client2 from "../assets/images/artkings_prof.webp";
import client3 from "../assets/images/lp_profile.webp";
import client5 from "../assets/images/vb_prof.webp";

// Interface for reviews loaded from localStorage or used as default
interface StoredReview {
  name: string;
  quote: string;
  rating: number;
  img?: string;
  person?: string;
}

const AnimatedBlob = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 0.1;
  animation: float 10s ease-in-out infinite;
  pointer-events: none;

  @keyframes float {
    0% {
      transform: translateY(0px) translateX(0px) scale(1);
    }
    50% {
      transform: translateY(-40px) translateX(20px) scale(1.05);
    }
    100% {
      transform: translateY(0px) translateX(0px) scale(1);
    }
  }

  svg {
    width: 300px;
    height: 300px;

    @media (max-width: 480px) {
      width: 200px;
      height: 200px;
    }
  }
`;

const TestimonialsContainer = styled.div`
  padding: 80px 20px;
  background: linear-gradient(135deg, ${colors.royalBlue}, #001d6e);
  text-align: center;
  font-family: "Montserrat", sans-serif;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 40px;
  position: relative;
`;

const TestimonialWrapper = styled.div`
  overflow-x: auto;
  display: flex;
  gap: clamp(20px, 4vw, 40px);
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  scroll-behavior: smooth;
  padding: 0 10px;
  position: relative;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TestimonialCard = styled.div<{ alternate: boolean }>`
  position: relative;
  flex: 0 0 auto;
  width: clamp(260px, 80vw, 340px);
  backdrop-filter: blur(15px);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 30px 25px 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  scroll-snap-align: start;
  transition: all 0.35s ease;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  color: white;
  z-index: 1;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5);
  }

  &::before {
    content: "";
    height: 6px;
    width: 80px;
    background: ${({ alternate }) => (alternate ? colors.limeGreen : colors.royalBlue)};
    position: absolute;
    top: 20px;
    left: 25px;
    border-radius: 4px;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid ${colors.limeGreen};
  margin-right: 16px;
`;

const Name = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const StarWrapper = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
`;

const Star = styled.svg<{ filled: boolean }>`
  width: 20px;
  height: 20px;
  fill: ${({ filled }) => (filled ? colors.limeGreen : "rgba(255, 255, 255, 0.3)")};
`;

const Quote = styled.p`
  font-size: 1rem;
  font-style: italic;
  color: #e0e0e0;
  line-height: 1.6;
  position: relative;
  padding: 20px 20px 25px;
  border-left: 4px solid ${colors.limeGreen};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;

  &::after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-right: 15px solid ${colors.limeGreen};
    border-bottom: 15px solid transparent;
  }
`;

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
  cursor: pointer;
`;

const PersonName = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #e0e0e0;
  margin-top: 10px;
  text-align: left;
`;

const Testimonials: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const initialTestimonials: StoredReview[] = [
    { name: "Idyllic", quote: "SkenVa helped us boost our sales with top-tier SEO!", img: client1, rating: 5, person: "Idyllic Client" },
    { name: "ArtKings Builders Co", person: "Danson Njoroge Njiiri", quote: "Their web and graphic designs elevated our brand visibility!", img: client2, rating: 4 },
    { name: "Legacy Pixels", person: "Stephen Wanjohi", quote: "Amazing branding services that transformed our online presence!", img: client3, rating: 5 },
    { name: "Valuable Brands", person: "Victor Wambani - CEO", quote: "Best service I got out of Skenva which showed huge growth to our company", img: client5, rating: 5 },
    { name: "St Kizito VTI", person: "Peter Kimani Michuki - Coordinator", quote: "Great photo, video, and marketing work — very professional!", img: client1, rating: 5 }, // Using client1 as in original
  ];

  const [displayedTestimonials, setDisplayedTestimonials] = useState<StoredReview[]>(initialTestimonials);

  useEffect(() => {
    try {
      const storedReviewsRaw = localStorage.getItem("userReviews");
      if (storedReviewsRaw) {
        const parsedReviews = JSON.parse(storedReviewsRaw);
        if (Array.isArray(parsedReviews) && parsedReviews.length > 0) {
          // Ensure all reviews have the necessary fields, providing defaults if needed
          const validatedReviews: StoredReview[] = parsedReviews.map(review => ({
            name: review.name || "Anonymous",
            quote: review.quote || "No comment.",
            rating: review.rating || 0,
            img: review.img, // img can be undefined, TestimonialCard should handle it
            person: review.person, // person can be undefined
          }));
          setDisplayedTestimonials(validatedReviews);
        }
      }
    } catch (error) {
      console.error("Failed to load or parse reviews from localStorage:", error);
      // Defaults to initialTestimonials if localStorage is empty or parsing fails
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    // Ensure displayedTestimonials is not null and has items before setting up the interval
    if (!displayedTestimonials || displayedTestimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % displayedTestimonials.length;
        if (wrapperRef.current && wrapperRef.current.children[newIndex]) {
          const cardElement = wrapperRef.current.children[newIndex] as HTMLElement;
          // Calculate scroll position based on the specific card's offsetLeft
          const scrollPosition = cardElement.offsetLeft - (wrapperRef.current.offsetLeft || 0);
          wrapperRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
        }
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [displayedTestimonials]); // Re-run effect if displayedTestimonials array changes

  const handleDotClick = (idx: number) => {
    setActiveIndex(idx);
    if (wrapperRef.current && wrapperRef.current.children[idx]) {
      const cardElement = wrapperRef.current.children[idx] as HTMLElement;
      const scrollPosition = cardElement.offsetLeft - (wrapperRef.current.offsetLeft || 0);
      wrapperRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  const renderStars = (rating: number) => (
    <StarWrapper>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          filled={i < rating}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={i < rating ? "Filled star" : "Empty star"}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </Star>
      ))}
    </StarWrapper>
  );

  return (
    <TestimonialsContainer>
      <AnimatedBlob style={{ top: "-100px", left: "-120px" }}>
        <svg viewBox="0 0 200 200">
          <path
            fill={colors.white}
            d="M42.3,-56.8C56.7,-49.5,70.4,-38.1,72.5,-24.6C74.6,-11.1,65.1,4.5,56.6,19.2C48,33.9,40.4,47.7,28.5,56.1C16.6,64.5,0.3,67.5,-13.9,63.3C-28.1,59.1,-40.3,47.6,-49.5,35.4C-58.6,23.1,-64.8,10,-65.1,-3.5C-65.5,-17.1,-60,-31.1,-49.4,-40.5C-38.8,-50,-23.1,-54.8,-8.2,-53.3C6.6,-51.7,13.2,-43.9,42.3,-56.8Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <AnimatedBlob style={{ bottom: "-100px", right: "-120px", animationDuration: "15s" }}>
        <svg viewBox="0 0 200 200">
          <path
            fill={colors.royalBlue}
            d="M34.2,-56.3C46.7,-45.9,59.4,-39,66.8,-28.1C74.2,-17.3,76.2,-2.7,70.8,9.5C65.5,21.6,52.8,31.3,41.3,41.4C29.7,51.6,19.3,62.3,5.2,65.1C-8.9,67.9,-17.8,62.8,-28.6,56.1C-39.4,49.3,-52.2,40.8,-59.3,28.9C-66.4,17.1,-67.9,1.9,-64.8,-11.2C-61.7,-24.3,-54,-35.2,-43.9,-45.3C-33.8,-55.4,-21.2,-64.6,-7.4,-65.5C6.4,-66.3,12.8,-59.6,34.2,-56.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <Title>What Our Clients Say</Title>
      <TestimonialWrapper ref={wrapperRef}>
        {displayedTestimonials.map((t, index) => (
          <TestimonialCard key={index} alternate={index % 2 === 0}>
              <ClientInfo>
                <Image src={t.img || client1} alt={t.name} /> {/* Fallback image if t.img is undefined */}
                <Name>{t.name}</Name>
              </ClientInfo>
              {renderStars(t.rating)}
              <Quote>"{t.quote}"</Quote>
              {t.person && <PersonName>- {t.person}</PersonName>} {/* Conditionally render PersonName */}
            </TestimonialCard>
        ))}
      </TestimonialWrapper>
      <Dots>
        {displayedTestimonials.map((_, idx) => (
          <Dot
            key={idx}
            active={idx === activeIndex}
            onClick={() => handleDotClick(idx)}
          />
        ))}
      </Dots>
    </TestimonialsContainer>
  );
};

export default Testimonials;
