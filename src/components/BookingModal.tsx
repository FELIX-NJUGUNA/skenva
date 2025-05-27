import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../assets/styles/colors";

// Service Options
const services = [
  { name: "Logos", price: "2,500 – 5,000 Ksh" },
  { name: "Business Cards", price: "500 – 1,000 Ksh" },
  { name: "Flyers & Posters", price: "500 – 1,000 Ksh" },
  { name: "Social Media Posts", price: "500 Ksh" },
  { name: "Basic Website", price: "15,000 Ksh" },
  { name: "Business Website", price: "35,000 Ksh" },
];

// Styled Components
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  position: relative;
  overflow-y: auto;
  max-height: 90vh;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 26px;
  font-weight: bold;
  color: ${colors.royalBlue};
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin: 1rem 0 0.5rem;
  font-weight: 600;
  color: ${colors.darkGrey};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  transition: box-shadow 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 0 10px ${colors.limeGreen};
    border-color: ${colors.limeGreen};
  }

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGrey};
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  outline: none;
  background: white;
  transition: box-shadow 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 0 10px ${colors.limeGreen};
    border-color: ${colors.limeGreen};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  transition: box-shadow 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 0 10px ${colors.limeGreen};
    border-color: ${colors.limeGreen};
  }

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1.5rem;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: black;
  border: none;
  padding: 12px;
  width: 50%;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #999;
  }
`;

const SubmitButton = styled.button`
  background-color: ${colors.royalBlue};
  color: white;
  border: none;
  padding: 12px;
  width: 50%;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${colors.limeGreen};
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;


const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  font-size: 22px;
  color: ${colors.limeGreen};
  font-weight: bold;
`;

const PhoneWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CountryCodeSelect = styled.select`
  padding: 12px;
  border-radius: 6px;
  width: 35%;
  font-family: "Montserrat", sans-serif;
`;

const PhoneInput = styled(Input)`
  width: 65%;
`;

const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [countryCodes, setCountryCodes] = useState<{ name: string; code: string }[]>([]);
const [selectedCode, setSelectedCode] = useState("+254");
const [, setBudgetSuggestion] = useState("");



const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selected = e.target.value;
  setSelectedService(selected);

  // Suggested budget ranges based on service selection
  const budgetRanges: Record<string, string> = {
    "Logos": "Recommended: 2,500 – 5,000 Ksh",
    "Business Cards": "Recommended: 500 – 1,000 Ksh",
    "Flyers & Posters": "Recommended: 500 – 1,000 Ksh",
    "Social Media Posts": "Recommended: 500 Ksh",
    "Basic Website": "Recommended: 15,000 Ksh",
    "Business Website": "Recommended: 35,000 Ksh",
  };

  setBudgetSuggestion(budgetRanges[selected] || "");
};


useEffect(() => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.map((c: any) => ({
        name: c.name.common,
        code: c.idd?.root + (c.idd?.suffixes?.[0] || ""),
      })).filter((c: { code: any; }) => c.code);

      setCountryCodes(countries.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name)));
    })
    .catch((error) => console.error("Error fetching country codes:", error));
}, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !selectedService) return;

    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("service", selectedService);
    formData.append("access_key", "f13f50ed-8d44-4d5d-8257-1bbeb5160f66");
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
        alert("❌ Submission failed.");
        setIsSubmitting(false);
      }
    } catch {
      alert("❌ Network error. Try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper onClick={(e) => e.target === e.currentTarget && onClose()}>
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {!success ? (
              <>
                <Title>Book a Service</Title>
                <form onSubmit={handleSubmit}>
                  <Label>Name</Label>
                  <Input type="text" name="name" placeholder="Enter your full name" required />

                  <Label>Email</Label>
                  <Input type="email" name="email" placeholder="Enter your email address" required />

                  <Label>Phone</Label>
                  <PhoneWrapper>
                  <CountryCodeSelect name="countryCode" value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}>
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name} ({country.code})
                          </option>
                            ))}
                  </CountryCodeSelect>

                    <PhoneInput type="tel" name="phone" placeholder="Enter phone number" required />
                  </PhoneWrapper>

                  <Label>Service</Label>
                  <Select name="service" required onChange={handleServiceChange}>
                    <option value="">-- Select a service --</option>
                        {services.map((s) => (
                      <option key={s.name} value={s.name}>
                      {s.name} - {s.price}
                    </option>
                          ))}
                        </Select>
                  
                      

                      <Label>Your Estimated Budget</Label>
                      <Input type="number" name="budget" placeholder="Enter your estimated budget (Ksh)" min="500" required />


                  <Label>Project Description</Label>
                  <TextArea name="description" placeholder="Provide project details..." required />

                  <ButtonGroup>
                    <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
                    <SubmitButton type="submit" disabled={isSubmitting || !selectedService}>
                      {isSubmitting ? "Submitting..." : "Submit Booking"}
                    </SubmitButton>
                  </ButtonGroup>

                </form>
              </>
            ) : (
              <SuccessMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
