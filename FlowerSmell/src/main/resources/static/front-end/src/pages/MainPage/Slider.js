import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ad1 from "../../images/ad/ad1.jpeg";
import Ad2 from "../../images/ad/ad2.jpeg";
import Ad3 from "../../images/ad/ad3.png";
import { styled } from "styled-components";

const images = [Ad1, Ad2, Ad3];

const AdImage = styled.img`
  height: 100%;
  width: 100%;
`;

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 넘김 활성화
    autoplaySpeed: 3000, // 각 슬라이드 간의 전환 속도 (밀리초 단위)
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <AdImage src={image} alt={`Ad ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
