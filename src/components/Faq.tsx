import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { colors } from "../assets/styles/colors";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  { question: "What services do you offer?", answer: "We offer full-service digital marketing tailored for SMEs. Our core services include social media management, local SEO, content creation, and paid advertising." },
  { question: "How much do your services cost?", answer: "Our pricing is flexible based on your needs. Monthly packages range from KSh 10,000 – 50,000, SEO starts at KSh 15,000/month, and content projects begin at KSh 10,000." },
  { question: "How soon will I see results?", answer: "Engagement starts within a few weeks. For measurable leads and sales, campaigns typically perform strongly within 30–60 days." },
  { question: "Do you only work with businesses in Kakamega?", answer: "We serve businesses across Western Kenya, including Kisumu, Bungoma, and Busia, with locally optimized strategies." },
  { question: "What makes SkenVa different from other agencies?", answer: "Our local expertise, affordable transparent pricing, and 60-day ROI guarantee set us apart." },
  { question: "Can you manage my business's Instagram or WhatsApp page?", answer: "Yes! We specialize in mobile-first platforms like Instagram and WhatsApp, handling content creation, posting, and engagement." },
  { question: "Will I get reports or updates?", answer: "Yes! We provide bi-monthly reports tracking reach, engagement, leads, and strategic recommendations." },
  { question: "Do you help with business branding too?", answer: "Absolutely! We create logos, brand kits, social media templates, and messaging for startups and rebrands." },
  { question: "How do I get started?", answer: "Book a free consultation, discuss your goals, receive a custom proposal, and start within 5–10 days." },
  { question: "Do you offer one-time services or only monthly packages?", answer: "Both! Choose project-based services or a monthly retainer for full campaign management." },
];

const FAQSection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 60px 20px;
  background: linear-gradient(to bottom right, #0908c3, ${colors.royalBlue});
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 40px 12px;
  }
`;

const AnimatedBlob = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 0.15;
  pointer-events: none;
  animation: float 12s ease-in-out infinite;
  

  @keyframes float {
    0% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-40px) scale(1.05); }
    100% { transform: translateY(0px) scale(1); }
  }

  svg {
    width: 350px;
    height: 350px;

    @media (max-width: 600px) {
      width: 200px;
      height: 200px;
    }
  }
`;

const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 40px;
  text-align: center;
  color: #fff;
  font-weight: 800;
  letter-spacing: 1px;

  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 24px;
  }
`;

const FAQWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;

  @media (max-width: 600px) {
    max-width: 100%;
    gap: 12px;
  }
`;

const Item = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const QuestionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionText = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Icon = styled(FaChevronDown)<{ expanded: boolean }>`
  transition: transform 0.3s ease;
  transform: ${({ expanded }) => (expanded ? "rotate(180deg)" : "rotate(0deg)")};
  color: #fff;
`;

const Answer = styled(motion.p)`
  margin-top: 12px;
  font-size: 1rem;
  color: #e0e8ff;
  line-height: 1.6;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <FAQSection>
      {/* Top Left Blob */}
      <AnimatedBlob style={{ top: "-80px", left: "-100px" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.white}
            d="M41.6,-58.3C53.8,-49.8,63.6,-36.4,65.5,-22.3C67.5,-8.2,61.7,6.5,53.1,19.5C44.4,32.6,32.9,44,18.8,51.6C4.8,59.3,-11.7,63.2,-26.2,57.8C-40.8,52.4,-53.4,37.8,-60.4,21.1C-67.4,4.3,-68.9,-14.6,-60.8,-28.4C-52.7,-42.2,-34.9,-51,-18.1,-58.5C-1.3,-65.9,13.4,-71.1,27.4,-65.1C41.4,-59.1,55.7,-41.5,41.6,-58.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      {/* Bottom Right Blob */}
      <AnimatedBlob style={{ bottom: "-80px", right: "-100px", animationDuration: "15s" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill={colors.darkBlue}
            d="M36.6,-60.4C49.5,-51.1,62.4,-41.2,66.2,-28.2C70.1,-15.3,64.8,-0.2,60.8,15.6C56.8,31.4,54.2,47.9,43.4,58.7C32.6,69.5,13.3,74.5,-4.2,78.6C-21.6,82.8,-43.3,86.1,-53.2,75.4C-63.1,64.8,-61.1,40.2,-61.6,22.2C-62.1,4.2,-65.1,-7.1,-59.2,-20.1C-53.3,-33.2,-38.5,-48,-22.5,-55.4C-6.6,-62.7,10.7,-62.7,36.6,-60.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </AnimatedBlob>

      <Title>Frequently Asked Questions</Title>
      <FAQWrapper ref={ref}>
        {faqs.map((faq, index) => (
          <Item
            key={index}
            onClick={() => toggleFAQ(index)}
            initial="hidden"
            animate={controls}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <QuestionRow>
              <QuestionText>{faq.question}</QuestionText>
              <Icon expanded={expandedIndex === index} />
            </QuestionRow>
            <AnimatePresence>
              {expandedIndex === index && (
                <Answer
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </Answer>
              )}
            </AnimatePresence>
          </Item>
        ))}
      </FAQWrapper>
    </FAQSection>
  );
};

export default FAQ;
