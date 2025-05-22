import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PortfolioContainer = styled.div`
  text-align: center;
  padding: 50px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Portfolio: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <PortfolioContainer>
      <h2>Our Portfolio</h2>
      <Slider {...settings}>
        <div>
          <Image src="/assets/images/project1.jpg" alt="Project 1" />
        </div>
        <div>
          <Image src="/assets/images/project2.jpg" alt="Project 2" />
        </div>
        <div>
          <Image src="/assets/images/project3.jpg" alt="Project 3" />
        </div>
      </Slider>
    </PortfolioContainer>
  );
};

export default Portfolio;

