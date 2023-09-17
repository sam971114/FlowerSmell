import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import FlowerImg from "../../../images/subscribe/freesia.png";
import FlowerShopImg1 from "../../../images/FlowerShopImg/FlowerShopImg1.png";
import FlowerShopImg2 from "../../../images/FlowerShopImg/FlowerShopImg2.png";
import FlowerShopImg3 from "../../../images/FlowerShopImg/FlowerShopImg3.png";
import FlowerShopImg4 from "../../../images/FlowerShopImg/FlowerShopImg4.png";
import FlowerShopImg5 from "../../../images/FlowerShopImg/FlowerShopImg5.png";

const images = [
  FlowerShopImg1,
  FlowerShopImg2,
  FlowerShopImg3,
  FlowerShopImg4,
  FlowerShopImg5,
  FlowerShopImg1,
  FlowerShopImg2,
  FlowerShopImg3,
  FlowerShopImg4,
  FlowerShopImg5,
  FlowerShopImg1,
  FlowerShopImg2,
  FlowerShopImg3,
  FlowerShopImg4,
];

const LeftSectionContainer = styled.div`
  width: 527px;
  position: relative;
`;

const ColorBoxContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 527px;
  height: 390px;
  position: relative;
  margin-top: 30px;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  color: black;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const LeftArrowButton = styled(ArrowButton)`
  left: 0;
`;

const RightArrowButton = styled(ArrowButton)`
  right: 0;
`;

const ColorBox = styled.img`
  width: 390px;
  height: 390px;
  flex-shrink: 0;

  margin-right: 6px;
  border-radius: 10px;
`;
const ShopImg = styled.img`
  width: 390px;
  height: 390px;
  flex-shrink: 0;

  margin-right: 6px;
  border-radius: 10px;
`;
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "cyan",
  "lime",
  "coral",
  "teal",
  "magenta",
];

const Flower = ({ src, name, engName, size, price, message, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        style={{
          width: "527px",
          height: "118px",
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          marginLeft: "75px",
          cursor: "pointer",
          marginLeft: "30px",
          marginBottom: "20px",
        }}
      >
        <img src={FlowerImg} alt={name} width="102" height="118" />
        <div style={{ marginLeft: "8px" }}>
          <h4>
            {name} ({engName})<span style={{ marginLeft: "4px" }}>한 단</span>
            <span style={{ marginLeft: "4px" }}>({size}대)</span>
            <span style={{ marginLeft: "4px" }}>{price}원</span>
          </h4>
          <h5>
            [{name} 꽃말]<span style={{ marginLeft: "4px" }}></span>
            <span style={{ marginLeft: "4px" }}>{message}</span>
          </h5>
        </div>
      </div>

      <hr />
    </>
  );
};

const useFlowers = () => {
  const [flowers, setFlowers] = useState([]);

  const reduxData = useSelector((state) => state.baseUrl);
  const baseUrl = reduxData.url;

  const reduxData2 = useSelector((state) => state.selectedShop);
  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        console.log(
          baseUrl.concat("/api/business/AllFlower/", reduxData2.name)
        );
        const response = await fetch(
          baseUrl.concat("/api/business/AllFlower/", reduxData2.name)
        );
        const data = await response.json();
        setFlowers(data);
      } catch (error) {
        console.error("Error fetching flowers:", error);
      }
    };

    fetchFlowers();
  }, [reduxData2.name]);

  return flowers;
};

const FlowerListContainer = styled.div`
  width: 527px;
  display: flex; // 추가
  flex-direction: column; // 추가
  align-items: center; // 추가
  border: 1.8px solid #d9d9d9;
  border-radius: 10px;
  margin-top: 30px;
`;

const FlowerList = ({ onSelectFlower }) => {
  const flowers = useFlowers();
  const handleFlowerClick = (flowerData) => {
    if (onSelectFlower) {
      onSelectFlower(flowerData);
    }
  };

  return (
    <FlowerListContainer>
      <h3 style={{ marginBottom: "16px" }}>꽃 종류</h3>
      {flowers.length > 0 ? (
        flowers.map((flowerData, i) => (
          <Flower
            key={i}
            {...flowerData}
            onClick={() => handleFlowerClick(flowerData)}
          />
        ))
      ) : (
        <p>꽃 없음. 돌아가.</p>
      )}
    </FlowerListContainer>
  );
};

const LeftSection = ({ onSelectFlower }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const isSliding = useRef(false);

  const slideLeft = () => {
    if (!isSliding.current) {
      isSliding.current = true;
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const slideRight = () => {
    if (!isSliding.current) {
      isSliding.current = true;
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onTransitionEnd = () => {
    if (currentIndex === 0) {
      setCurrentIndex(colors.length);
    } else if (currentIndex === colors.length + 1) {
      setCurrentIndex(1);
    }
    isSliding.current = false;
  };

  const colorSequence = [colors[colors.length - 1], ...colors, colors[0]];

  return (
    <LeftSectionContainer>
      <ColorBoxContainer>
        <LeftArrowButton onClick={slideLeft}>&lt;</LeftArrowButton>
        <div
          style={{
            display: "flex",
            margin: `0 ${(527 - 390) / 2 - 3}px`,
            transform: `translateX(-${currentIndex * (390 + 6)}px)`,
            transition: "transform 500ms ease",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {images.map(
            (
              src,
              i // images 배열의 요소를 직접 사용
            ) => (
              <ShopImg key={i} src={src} alt={`Flower ${i + 1}`} />
            )
          )}
        </div>
        <RightArrowButton onClick={slideRight}>&gt;</RightArrowButton>
      </ColorBoxContainer>
      <FlowerList onSelectFlower={onSelectFlower} />
    </LeftSectionContainer>
  );
};

export default LeftSection;
