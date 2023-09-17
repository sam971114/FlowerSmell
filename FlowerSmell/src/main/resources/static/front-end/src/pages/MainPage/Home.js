//ppt page 1
import styled, { css } from "styled-components";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Navi";
import SimpleSlider from "./Slider";
import Shop from "../../components/Shop";
import Sub from "../../images/Subscribe.png";
import UnSub from "../../images/SubscribeDefault.png";

import Img from "../../images/FlowerShopImg/FlowerShopImg1.png";

import axios from "axios";
import { useSelector } from "react-redux";

const AdContainer = styled.div`
  width: 100%;
  height: auto;
`;

const ShopList = styled.div`
  display: grid;
  width: 98%;
  margin: 0 auto;
  height: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, minmax(250px, auto));
  grid-gap: 10px;
`;
const MedianContainer = styled.div`
  margin: 0 1%;
  h2 {
    margin-top: 25px;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  p {
    font-size: 17px;
    align-items: center; /* 수직 정렬 */
    justify-content: center; /* 수평 정렬 */
    font-weight: bold;
    color: ${(props) => (props.isSubscribed ? "green" : "black")};
  }
`;
const BtnContainer = styled.div`
  margin: 10px 0;
  display: flex;
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

const StyledLink = styled(Link)`
  color: black;
  font-size: 15px;
  text-decoration: none;
  font-weight: bold;
`;

// 필요한 코드를 추가하세요
const Home = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [subBusinesses, setSubBusinesses] = useState([]);
  const reduxData = useSelector((state) => state.baseUrl);
  const baseUrl = reduxData.url;
  console.log(baseUrl);

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
      <div>
        <AdContainer>
          <SimpleSlider />
        </AdContainer>
      </div>
      <MedianContainer isSubscribed={isSubscribed}>
        <h2>꽃집 구경하기</h2>
        <div>
          <BtnContainer>
            <SubBtn onClick={toggleSubscription}>
              <img src={isSubscribed ? Sub : UnSub} alt="Subscription Button" />
            </SubBtn>
            <p>구독 가능한 꽃집</p>
          </BtnContainer>
          <StyledLink to="/shoplist">전체 보기 {">"}</StyledLink>
        </div>
      </MedianContainer>
      <ShopList>
        {shopList.length > 0 ? (
          shopList.map((item) => (
            <Shop
              key={item.id}
              id={item.id}
              shopImage={Img}
              shopName={item.username}
              shopAddress={item.address}
              heart={item.favorite}
              phoneNumber={item.phoneNumber}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ShopList>
    </>
  );
};

export default Home;
