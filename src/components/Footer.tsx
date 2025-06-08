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


    const Divider = styled.div`
    width: 100%;
    height: 3px;
    background: ${colors.limeGreen};
    margin: 0;
    border-radius: 2px;
  `;

  const FooterWrapper = styled.footer`
    //background: linear-gradient(135deg, ${colors.royalBlue}, #001d6e);
    background: ${colors.darkBlue};
    color: white;
    z-index: 0;
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

  const ContactFormContainer = styled(motion.div)`
    flex: 1;
    padding: 30px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 24px rgba(255, 255, 255, 0.12);
  `;

  const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 18px;
  `;

  const Title = styled.h3`
    font-size: 24px;
    font-weight: 600;
    color: ${colors.white};
    margin-bottom: 20px;
  `;

  const Input = styled.input`
    width: 97%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${colors.white};
    background: rgba(255, 255, 255, 0.2);
    color: white;
    outline: none;
    font-family: "Montserrat", sans-serif;
    transition: box-shadow 0.3s ease-in-out;

    &:focus {
      box-shadow: 0 0 12px ${colors.limeGreen};
      border-color: ${colors.limeGreen};
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  `;

  const TextArea = styled.textarea`
    width: 97%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${colors.white};
    background: rgba(255, 255, 255, 0.2);
    color: white;
    outline: none;
    font-family: "Montserrat", sans-serif;
    transition: box-shadow 0.3s ease-in-out;

    &:focus {
      box-shadow: 0 0 12px ${colors.limeGreen};
      border-color: ${colors.limeGreen};
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
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
      background-color: ${colors.white};
      color: ${colors.limeGreen};
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

  const SocialIcon = styled(motion.a)`
    color: ${colors.white};
    font-size: 28px;
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.limeGreen};
    }
  `;

  const CopyrightSection = styled(motion.div)`
    background: linear-gradient(135deg, #001d6e,${colors.royalBlue}, #001d6e);
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${colors.lightBlue};
    font-size: 14px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }
  `;

  const Footer: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      formData.append("access_key", "f13f50ed-8d44-4d5d-8257-1bbeb5160f66");
      formData.append("subject", "Contact Form  - SkenVa Creatives");

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
        <Divider /> {/* Lime Green Divider */}
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
                  
                  <a href="tel:+254741553806" aria-label="Phone"><p><FontAwesomeIcon icon={faPhone} /> 0741553806</p></a>
                  <a href="tel:+254719155919" aria-label="Phone"><p><FontAwesomeIcon icon={faPhone} /> 0719155919</p></a>
                  <a href="mailto:skenvacreativs@gmail.com" aria-label="Email"><p><FontAwesomeIcon icon={faEnvelope} /> skenvacreatives@gmail.com</p></a>
                </div>

                <div>
                  <Title>Follow Us</Title>
                  <SocialLinks>
                    <SocialIcon href="https://wa.me/254741553806" target="_blank" whileHover={{ scale: 1.2, y: -3 }}>
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </SocialIcon>
                    
                    <SocialIcon href="https://www.facebook.com/share/19R96edYQy/" target="_blank" whileHover={{ scale: 1.2, y: -3 }}>
                      <FontAwesomeIcon icon={faFacebook} />
                    </SocialIcon>
                    <SocialIcon href="https://x.com/SkenVacreatives?t=WNivIjuNztjCsCZT-8iqfQ&s=09" target="_blank" whileHover={{ scale: 1.2, y: -3 }}>
                      <FontAwesomeIcon icon={faXTwitter} />
                    </SocialIcon>
                    <SocialIcon href="https://www.instagram.com/skenvacreatives?igsh=anh1aTBudWxpZWY5" target="_blank" whileHover={{ scale: 1.2, y: -3 }}>
                      <FontAwesomeIcon icon={faInstagram} />
                    </SocialIcon>
                    <SocialIcon href="https://linkedin.com/company/skenvacreatives" target="_blank" whileHover={{ scale: 1.2, y: -3 }}>
                      <FontAwesomeIcon icon={faLinkedin} />
                    </SocialIcon>
                  </SocialLinks>
                </div>
              </LeftColumn>

              <ContactFormContainer
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
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

        <CopyrightSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>© {new Date().getFullYear()}</div>
          <div>SkenVa Creatives. All Rights Reserved.</div>
        </CopyrightSection>
      </>
    );
  };

  export default Footer;
