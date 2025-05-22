import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../assets/styles/colors";

const ModalWrapper = styled(motion.div)<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 550px;
  width: 90%;
  text-align: center;
  font-family: "Poppins", sans-serif;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.darkGrey};
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${colors.royalBlue};
  font-weight: bold;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${colors.darkGrey};
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  text-align: left;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${colors.darkGrey};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGrey};
  margin-bottom: 16px;
  font-size: 1rem;
  background: white;
  font-family: "Poppins", sans-serif;
  outline: none;

  &::placeholder {
    color: #888;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGrey};
  margin-bottom: 16px;
  font-size: 1rem;
  background: white;
  font-family: "Poppins", sans-serif;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGrey};
  margin-bottom: 16px;
  font-size: 1rem;
  background: white;
  font-family: "Poppins", sans-serif;
  outline: none;
  resize: none;
  min-height: 100px;

  &::placeholder {
    color: #888;
  }
`;

const SubmitButton = styled.button`
  padding: 14px 30px;
  font-size: 1.3rem;
  background: ${colors.royalBlue};
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);

  &:hover {
    background: ${colors.limeGreen};
    transform: scale(1.05);
  }
`;

const SuccessMessage = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.limeGreen};
  margin-top: 20px;
`;

const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(true);

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("access_key", "f13f50ed-8d44-4d5d-8257-1bbeb5160f66");
    formData.append("replyto", formData.get("email") as string);
    formData.append("subject", "Service Booking Request - SkenVa Creatives");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } else {
      alert("Error submitting form, please try again.");
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} initial={{ opacity: 0 }} animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }}>
      <ModalContent initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: isOpen ? 1 : 0.8, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }}>
        {!success ? (
          <>
            <CloseButton onClick={onClose}>✖</CloseButton>
            <Title>Book a Service</Title>
            <Description>Select a service and provide your details below.</Description>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="name">Your Name</Label>
              <Input type="text" name="name" placeholder="Enter your name" required />

              <Label htmlFor="email">Your Email</Label>
              <Input type="email" name="email" placeholder="Enter your email" required />

              <Label htmlFor="service">Select a Service</Label>
              <Select name="service" required>
                <option value="Logos">Logos - 2,500 – 5,000 Ksh</option>
                <option value="Business Cards">Business Cards - 500 – 1,000 Ksh</option>
                <option value="Flyers & Posters">Flyers & Posters - 500 – 1,000 Ksh</option>
                <option value="Social Media Posts">Social Media Posts - 500 Ksh</option>
                <option value="Basic Website">Basic Website - 15,000 Ksh</option>
                <option value="Business Website">Business Website - 35,000 Ksh</option>
              </Select>

              <Label htmlFor="description">Describe Your Request</Label>
              <TextArea name="description" placeholder="Provide additional details about your project" required />

              <SubmitButton type="submit">Submit Booking</SubmitButton>
            </form>
          </>
        ) : (
          <SuccessMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✅ Booking Successful!</SuccessMessage>
        )}
      </ModalContent>
    </ModalWrapper>
  );
};

export default BookingModal;
