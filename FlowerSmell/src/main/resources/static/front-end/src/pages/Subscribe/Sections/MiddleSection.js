import React, { useState } from 'react';
import styled from 'styled-components';

const MiddleSectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorBoxContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 1030px;
  height: 200px;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  color: black;
  font-size: 24px;
  cursor: pointer;
`;

const ColorBox = styled.div`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  background-color: ${(props) => props.color};
  margin-right: 6px;
`;

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'cyan',
  'lime',
  'coral',
  'teal',
  'magenta',
];

const MiddleSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideLeft = () => {
    if (currentIndex === 0) {
      setCurrentIndex(colors.length - 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const slideRight = () => {
    if (currentIndex === colors.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <MiddleSectionContainer>
      <ArrowButton onClick={slideLeft}>&lt;</ArrowButton>
      <ColorBoxContainer>
        <div
          style={{
            display: 'flex',
            transform: `translateX(-${currentIndex * (200 + 6)}px)`,
            transition: 'transform 500ms ease',
          }}
        >
          {colors.map((color, i) => (
            <ColorBox key={i} color={color} />
          ))}
        </div>
      </ColorBoxContainer>
      <ArrowButton onClick={slideRight}>&gt;</ArrowButton>
    </MiddleSectionContainer>
  );
};

export default MiddleSection;
