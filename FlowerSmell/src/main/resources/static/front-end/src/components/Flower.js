import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { changeShop } from "../store";
import { useSelector, useDispatch } from "react-redux";

const ShopContainer = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수직 정렬 */
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative; /* relative 포지션 추가 */
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

const Flower = ({ id, shopImage, name, engName, size, price, message }) => {
  price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const reduxData = useSelector((state) => state.baseUrl);
  const reduxData2 = useSelector((state) => state.selectedShop);
  const baseUrl = reduxData.url;

  let dispatch = useDispatch();

  const getData = async () => {
    console.log("reduxData2", reduxData2);
    try {
      const response = await axios.get(
        baseUrl.concat("/api/business/searchFlower/", id)
      );
      console.log("꽃을 이용한 꽃집 데이터", response.data);
      const jsonData = response.data;
      //     {/* 순서대로 꽃집 주소, 번호, 가게 이름, 구독 여부 넘겨줌
      // ex. '서울특별시 123', '010-1234-1234', '구독꽃집1', 'true' */}
      dispatch(
        changeShop({
          b_id: jsonData[0],
          address: jsonData[1],
          phoneNum: jsonData[2],
          name: jsonData[3],
          issub: jsonData[4],
        })
      );
    } catch (error) {
      console.error("(All) Axios를 통한 요청 중 오류 발생:", error.message);
    }
  };

  return (
    <StyledLink to="/subscribe" onClick={getData}>
      <ShopContainer>
        <ShopImg src={shopImage} alt="꽃 이미지" />
        <hr />
        <h3 id="name">
          {name} ({engName})
        </h3>
        <p id="size">한 단 ({size}대)</p>
        <p id="message">{message}</p>
        <p id="price">₩ {price}</p>
      </ShopContainer>
    </StyledLink>
  );
};

export default Flower;
