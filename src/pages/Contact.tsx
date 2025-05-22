import React, { useState } from "react";
import styled from "styled-components";

const ContactContainer = styled.div`
  padding: 50px;
  text-align: center;
`;

const Form = styled.form`
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
`;

const Button = styled.button`
  background-color: #32cd32;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const Contact: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent: ${message}`);
  };

  return (
    <ContactContainer>
      <h2>Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <TextArea placeholder="Your Message" required onChange={(e) => setMessage(e.target.value)} />
        <Button type="submit">Send Message</Button>
      </Form>
    </ContactContainer>
  );
};

export default Contact;
