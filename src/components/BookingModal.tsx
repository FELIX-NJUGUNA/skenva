import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../assets/styles/colors";

const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  width: 90%;
  max-width: 550px;
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.4);
  font-family: "Poppins", sans-serif;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: ${colors.royalBlue};
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${colors.royalBlue};
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 25px;
  color: ${colors.darkGrey};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${colors.darkGrey};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGrey};
  font-size: 1rem;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGrey};
  font-size: 1rem;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGrey};
  margin-bottom: 16px;
  font-size: 1rem;
  resize: none;
  min-height: 100px;
  outline: none;
`;

const SubmitButton = styled.button`
  padding: 14px 30px;
  font-size: 1.2rem;
  background: ${colors.royalBlue};
  color: white;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.limeGreen};
    transform: scale(1.05);
  }
`;

const SuccessMessage = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.limeGreen};
  text-align: center;
`;

const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("access_key", "f13f50ed-8d44-4d5d-8257-1bbeb5160f66");
    formData.append("replyto", formData.get("email") as string);
    formData.append("subject", "Service Booking Request - SkenVa Creatives");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setIsSubmitting(false);
          onClose();
        }, 2000);
      } else {
        alert("❌ Submission failed. Try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      alert("❌ Network error. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper
          onClick={handleBackgroundClick}
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {!success ? (
              <>
                <CloseButton onClick={onClose}>✖</CloseButton>
                <Title>Book a Service</Title>
                <Description>Select a service and provide your details.</Description>
                <form onSubmit={handleSubmit}>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                  />

                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />

                  <Label htmlFor="service">Service</Label>
                  <Select name="service" required>
                    <option value="">-- Select a service --</option>
                    <option value="Logos">Logos - 2,500 – 5,000 Ksh</option>
                    <option value="Business Cards">Business Cards - 500 – 1,000 Ksh</option>
                    <option value="Flyers & Posters">Flyers & Posters - 500 – 1,000 Ksh</option>
                    <option value="Social Media Posts">Social Media Posts - 500 Ksh</option>
                    <option value="Basic Website">Basic Website - 15,000 Ksh</option>
                    <option value="Business Website">Business Website - 35,000 Ksh</option>
                  </Select>

                  <Label htmlFor="description">Project Description</Label>
                  <TextArea
                    name="description"
                    placeholder="Tell us what you need..."
                    required
                  />

                  <SubmitButton type="submit">
                    {isSubmitting ? "Submitting..." : "Submit Booking"}
                  </SubmitButton>
                </form>
              </>
            ) : (
              <SuccessMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✅ Booking Successful!
              </SuccessMessage>
            )}
          </ModalContent>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
