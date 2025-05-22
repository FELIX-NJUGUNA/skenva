import React from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  padding: 50px;
  min-height: 100vh;
  text-align: center;
  background-color: #222;
  color: white;
  border-radius: 10px;
  margin-bottom: 20px;
`;

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <SectionContainer id={id}>
      <h2>{title}</h2>
      {children}
    </SectionContainer>
  );
};

export default Section;
