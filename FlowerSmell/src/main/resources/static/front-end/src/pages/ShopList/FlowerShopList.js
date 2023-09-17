//꽃집 구경하기 페이지

import styled from "styled-components";
import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Img from "../../images/FlowerShopImg/FlowerShopImg1.png";
import Shop from "../../components/Shop";
import Header from "../../components/Navi";

import Sub from "../../images/Subscribe.png";
import UnSub from "../../images/SubscribeDefault.png";

import { useSelector } from "react-redux";
import axios from "axios";
const ShopList = styled.div`
  display: grid;
  width: 98%;
  margin: 0 auto;
  height: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, minmax(250px, auto));
  grid-gap: 10px;
`;

const BtnContainer = styled.div`
  margin: 0 1%;
  display: flex;
  p {
    font-size: 17px;
    align-items: center; /* 수직 정렬 */
    justify-content: center; /* 수평 정렬 */
    font-weight: bold;
    color: ${(props) => (props.isSubscribed ? "green" : "black")};
  }
`;

const SubBtn = styled.button`
  border: none; /* 테두리 제거 */
  background-color: transparent; /* 배경색 제거 */
  padding: 0; /* 내부 여백 제거 */
  cursor: pointer; /* 커서 설정 */
  margin-right: 10px;
  img {
    height: 30px;
    width: 30px;
    align-items: center; /* 수직 정렬 */
    justify-content: center; /* 수평 정렬 */
  }
`;

// 필요한 코드를 추가하세요
const FlowerShopList = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [subBusinesses, setSubBusinesses] = useState([]);
  const reduxData = useSelector((state) => state.baseUrl);
  const baseUrl = reduxData.url;

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
    if (isSubscribed) {
      setShopList(businesses);
    } else {
      setShopList(subBusinesses);
    }
  };

  useEffect(() => {
    fetchAllBusinesses();
    fetchSubBusinesses();
  }, []);

  useEffect(() => {
    setShopList(businesses);
  }, [businesses]);

  const fetchAllBusinesses = async () => {
    try {
      const response = await axios.get(
        baseUrl.concat("/api/MainPage/allBusinesses")
      );
      const jsonData = response.data;
      setBusinesses(jsonData || []);
    } catch (error) {
      console.error("(All) Axios를 통한 요청 중 오류 발생:", error.message);
    }
  };

  const fetchSubBusinesses = async () => {
    try {
      const response = await axios.get(
        baseUrl.concat("/api/MainPage/SubBusinesses")
      );
      console.log("response.data", response.data);
      const jsonData = response.data;
      setSubBusinesses(jsonData || []);
    } catch (error) {
      console.error("(Sub) Axios를 통한 요청 중 오류 발생:", error.message);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      {/* <MedianContainer isSubscribed={isSubscribed}> */}
      <BtnContainer isSubscribed={isSubscribed}>
        <SubBtn onClick={toggleSubscription}>
          <img src={isSubscribed ? Sub : UnSub} alt="Subscription Button" />
        </SubBtn>
        <p>구독 가능한 꽃집</p>
      </BtnContainer>
      <ShopList>
        {shopList.length > 0 ? (
          shopList.map((item) => (
            <Shop
              key={item.id}
              shopImage={Img}
              shopName={item.username}
              shopAddress={item.address}
              heart={item.favorite}
              phoneNumber={item.phoneNumber}
              subscribe={item.subscribe}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ShopList>
    </>
  );
};

export default FlowerShopList;
