import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../assets/styles/colors";

const GlobalStyle = createGlobalStyle`
  .loader {
    border: 4px solid #fff;
    border-top: 4px solid ${colors.limeGreen};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const services = [
  { name: "Logos", price: "2,500 – 5,000 Ksh" },
  { name: "Business Cards", price: "500 – 1,000 Ksh" },
  { name: "Flyers & Posters", price: "500 – 1,000 Ksh" },
  { name: "Social Media Posts", price: "500 Ksh" },
  { name: "Basic Website", price: "15,000 Ksh" },
  { name: "Business Website", price: "35,000 Ksh" },
  { name: "SEO Optimization", price: "5,000 – 10,000 Ksh" },
];

// ================= Styled Components =================
const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 14px;
  padding: 2rem;
  width: 90%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);

  @media (max-width: 480px) {
    padding: 1rem 1.25rem;
    width: 95%;
    max-height: 88vh;
  }
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 24px;
  font-weight: bold;
  color: ${colors.royalBlue};
  text-align: center;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Label = styled.label`
  margin: 1rem 0 0.5rem;
  display: block;
  font-weight: 600;
  color: ${colors.darkGrey};
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;

  &:focus {
    border-color: ${colors.limeGreen};
    box-shadow: 0 0 8px ${colors.limeGreen};
  }

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 10px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;

  &:focus {
    border-color: ${colors.limeGreen};
    box-shadow: 0 0 8px ${colors.limeGreen};
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 10px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: "Montserrat", sans-serif;

  &:focus {
    border-color: ${colors.limeGreen};
    box-shadow: 0 0 8px ${colors.limeGreen};
  }

  &::placeholder {
    color: #aaa;
    font-style: italic;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 10px;
  }
`;

const PhoneWrapper = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const CountryCodeSelect = styled.select`
  width: 35%;
  padding: 12px;
  font-family: "Montserrat", sans-serif;
  border-radius: 6px;
  border: 1px solid #ccc;

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }
`;

const PhoneInput = styled(Input)`
  width: 65%;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const SubmitButton = styled.button`
  width: 50%;
  padding: 12px;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  background-color: ${colors.royalBlue};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.limeGreen};
  }

  &:disabled {
    background: #999;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const CancelButton = styled(SubmitButton)`
  background-color: #ccc;
  color: #000;

  &:hover {
    background-color: #aaa;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: ${colors.limeGreen};
  font-weight: bold;
`;

// ================= Component =================
const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [countryCodes, setCountryCodes] = useState<{ name: string; code: string }[]>([]);
  const [selectedCode, setSelectedCode] = useState("+254");

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [isOpen]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countries = data
          .map((c: any) => ({
            name: c.name.common,
            code: c.idd?.root + (c.idd?.suffixes?.[0] || ""),
          }))
          .filter((c: { code: string }) => c.code);
        setCountryCodes(countries.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name)));
      })
      .catch(console.error);
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
      <GlobalStyle />
      {isOpen && (
        <ModalWrapper onClick={(e) => e.target === e.currentTarget && onClose()}>
          <ModalContent
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
          >
            {!success ? (
              <>
                <Title>Book a Service</Title>
                <form onSubmit={handleSubmit}>
                  <Label>Name</Label>
                  <Input name="name" required placeholder="Full name" />
                  <Label>Email</Label>
                  <Input type="email" name="email" required placeholder="Email address" />
                  <Label>Phone</Label>
                  <PhoneWrapper>
                    <CountryCodeSelect value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)} name="countryCode">
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name} ({c.code})
                        </option>
                      ))}
                    </CountryCodeSelect>
                    <PhoneInput type="tel" name="phone" required placeholder="Phone number" />
                  </PhoneWrapper>
                  <Label>Service</Label>
                  <Select name="service" required onChange={(e) => setSelectedService(e.target.value)}>
                    <option value="">-- Select a service --</option>
                    {services.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} – {s.price}
                      </option>
                    ))}
                  </Select>
                  <Label>Estimated Budget</Label>
                  <Input type="number" name="budget" placeholder="Budget (Ksh)" required min={500} />
                  <Label>Project Description</Label>
                  <TextArea name="description" required placeholder="Tell us about your project..." />
                  <ButtonGroup>
                    <CancelButton type="button" onClick={onClose}>
                      Cancel
                    </CancelButton>
                    <SubmitButton type="submit" disabled={isSubmitting || !selectedService}>
                      {isSubmitting ? <span className="loader" /> : "Submit Booking"}
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
