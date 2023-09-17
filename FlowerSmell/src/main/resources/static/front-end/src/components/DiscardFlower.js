import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
const ShopContainer = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 정렬 */
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative; /* relative 포지션 추가 */
  cursor: pointer;
  h3 {
    color: #000;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Inter;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.2px;
    margin: 10px 0;
  }
  p {
    color: var(--base-color-gray-800, #606060);
    font-feature-settings: "clig" off, "liga" off;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.2px;
    margin: 5px 0;
    text-align: center;
  }
  hr {
    width: 100%;
    margin: 3px 0;
    border: none;
    border-top: 1px solid #ccc;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ShopImg = styled.img`
  margin: 10px auto;
  height: 150px;
`;
const Chat = styled.span`
  width: 35%;
  margin: 5px 0;
  text-align: center;
  border: solid;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 400;
`;
const DiscardFlower = ({ shopImage, name, engName, size, price, message }) => {
  price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleShopClick = () => {
    alert("채팅 서비스 오픈 전입니다^^");
  };

  return (
    <ShopContainer onClick={handleShopClick}>
      <ShopImg src={shopImage} alt="꽃 이미지" />
      <hr />
      <h3 id="name">
        {name} ({engName})
      </h3>
      <p id="size">한 단 ({size}대)</p>
      <p id="message">{message}</p>
      <p id="price">₩ {price}</p>
      <Chat>채팅시작하기</Chat>
    </ShopContainer>
  );
};

export default DiscardFlower;
