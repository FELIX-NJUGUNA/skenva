import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { colors } from "../assets/styles/colors";

const FooterWrapper = styled.footer`
  background: white;
  color: black;
  padding: 80px 20px 0;
  font-family: "Montserrat", sans-serif;
  overflow-x: hidden;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 0 10px 60px;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
  }
`;

const ContactFormContainer = styled.div`
  flex: 1;
  padding: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.royalBlue};
  margin-bottom: 20px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.limeGreen};
  background: ${colors.white};
  color: black;
  outline: none;
  font-family: "Montserrat", sans-serif;

  &::placeholder {
    color: ${colors.darkGrey};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.limeGreen};
  background: ${colors.white};
  color: black;
  outline: none;
  font-family: "Montserrat", sans-serif;

  &::placeholder {
    color: ${colors.darkGrey};
  }
`;

const Button = styled.button`
  background-color: ${colors.limeGreen};
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: ${colors.royalBlue};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  gap: 20px;
  

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  color: ${colors.royalBlue};
  font-size: 28px;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: ${colors.limeGreen};
  }
`;

const CopyrightSection = styled.div`
  background: linear-gradient(135deg, ${colors.royalBlue}, #001d6e);
  padding: 16px 0;
  text-align: center;
  color: white;
  font-size: 14px;
`;

const Footer: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("access_key", "f13f50ed-8d44-4d5d-8257-1bbeb5160f66");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setLoading(false);
    if (data.success) {
      toast.success("Message sent successfully!");
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error("Failed to send message. Try again.");
    }
  };

  return (
    <>
      <FooterWrapper>
        <ToastContainer />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <FooterContent>
            <LeftColumn>
              <div>
                <Title>Contact Us</Title>
                <p><FontAwesomeIcon icon={faWhatsapp} /> 0741553806 / 0719155919</p>
                <p><FontAwesomeIcon icon={faPhone} /> 0741553806 / 0719155919</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> skenvacreatives@gmail.com</p>
              </div>

              <div>
                <Title>Follow Us</Title>
                <SocialLinks>
                  <SocialIcon href="https://facebook.com/skenvacreatives" target="_blank">
                    <FontAwesomeIcon icon={faFacebook} />
                  </SocialIcon>
                  <SocialIcon href="https://twitter.com/skenvacreatives" target="_blank">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </SocialIcon>
                  <SocialIcon href="https://www.instagram.com/skenvacreatives?igsh=anh1aTBudWxpZWY5" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} />
                  </SocialIcon>
                  <SocialIcon href="https://linkedin.com/company/skenvacreatives" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </SocialIcon>
                </SocialLinks>
              </div>
            </LeftColumn>

            <ContactFormContainer>
              <Title>Get In Touch</Title>
              <ContactForm onSubmit={handleSubmit}>
                <Input name="name" type="text" placeholder="Your Name" required />
                <Input name="email" type="email" placeholder="Your Email" required />
                <TextArea name="message" rows={4} placeholder="Your Message" required />
                <Button type="submit">{loading ? "Sending..." : "Send Message"}</Button>
              </ContactForm>
            </ContactFormContainer>
          </FooterContent>
        </motion.div>
      </FooterWrapper>
      <CopyrightSection>
        © 2025 SkenVa Creatives. All Rights Reserved.
      </CopyrightSection>
    </>
  );
};

export default Footer;
