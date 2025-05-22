import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faInstagram, faLinkedin, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${colors.royalBlue}, ${colors.limeGreen});
  color: white;
  padding: 60px 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1000px;
  margin: auto;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Column = styled.div`
  padding: 20px;
`;

const ContactFormContainer = styled.div`
  text-align: center;
  margin: 50px auto;
  max-width: 600px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.limeGreen};
  font-family: 'Poppins', sans-serif;

  &::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    color: #ccc;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid ${colors.limeGreen};
  font-family: 'Poppins', sans-serif;

  &::placeholder {
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    color: #ccc;
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
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 28px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${colors.limeGreen};
  }
`;

const Footer: React.FC = () => {
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult("Sending...");

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("access_key", "f13f50ed-8d44-4d5d-8257-1bbeb5160f66");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setResult("We have received your message!");
      (e.target as HTMLFormElement).reset();
    } else {
      setResult(data.message);
    }
  };

  return (
    <FooterContainer>
      
      {/* Send Us a Message - Centered */}
      <ContactFormContainer>
        <h3>Talk to Us</h3>
        <ContactForm onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Your Name" required />
          <Input type="email" name="email" placeholder="Your Email" required />
          <TextArea name="message" placeholder="Your Message" required />
          <Button type="submit">Send Message</Button>
          <p>{result}</p>
        </ContactForm>
      </ContactFormContainer>


      <FooterGrid>
        <Column>
          <h3>Contact Us</h3>
          <p>
            <FontAwesomeIcon icon={faWhatsapp} /> 0741553806
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} />  0741553806
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} />    skenvacreatives@gmail.com
          </p>
        </Column>

        <Column>
          <h3>Follow Us</h3>
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
        </Column>

        <Column>
          <h3>Quick Links</h3>
          <p><a href="#about">About</a></p>
          <p><a href="#services">Services</a></p>
          <p><a href="#portfolio">Portfolio</a></p>
          <p><a href="#testimonials">Testimonials</a></p>
        </Column>
      </FooterGrid>

      

      <p style={{ marginTop: "20px", fontSize: "14px" }}>© 2025 SkenVa Creatives. All Rights Reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
