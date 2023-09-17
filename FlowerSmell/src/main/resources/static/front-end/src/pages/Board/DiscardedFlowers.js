import styled, { css } from "styled-components";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DiscardFlower from "../../components/DiscardFlower";
import Header from "../../components/Navi";
import Img from "../../images/Flower.png";

import { useSelector } from "react-redux";
import SellImg from "../../images/SellImg.png";
import SearchBox from "../../components/SearchBox";
const ShopList = styled.div`
  display: grid;
  width: 98%;
  margin: 0 auto;
  height: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, minmax(250px, auto));
  grid-gap: 10px;
`;

const BoardBtn = styled.button`
  width: 70%;
  height: 80%;
  background: #4aba4e;
  color: #ffffff;
  font-size: 15px;
  border: none;
  font-weight: bold;
  border-radius: 60px;
  margin: 7px;
  ${(props) =>
    props.isSelected &&
    css`
      background: none;
      color: #453e3e;
    `}
`;
const SellBtn = styled.img`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  z-index: 2;
  cursor: pointer;
`;
const DiscardedFlowers = () => {
  const reduxData = useSelector((state) => state.selectedShop);
  const reduxDataUrl = useSelector((state) => state.baseUrl);
  const reduxUser = useSelector((state) => state.userS);
  const baseUrl = reduxDataUrl.url;

  const [flowers, setFlowers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredFlowers, setFilteredFlowers] = useState([]);

  useEffect(() => {
    fetchAllFlowers();
  }, []);

  const fetchAllFlowers = async () => {
    try {
      const response = await axios.get(
        baseUrl.concat("/api/allDiscardFlowers")
      );
      const jsonData = response.data;
      setFilteredFlowers(jsonData || []);
      setFlowers(jsonData || []);
    } catch (error) {
      console.error("(All) Axios를 통한 요청 중 오류 발생:", error.message);
    }
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const filtered = flowers.filter((item) => item.name.includes(searchValue));
    setFilteredFlowers(filtered);
  }, [searchValue, flowers]);

  const history = useNavigate();
  const add = (e) => {
    e.preventDefault();
    history("/flowerR", { state: { to: "/discard" } });
  };

  return (
    <>
      <div>
        <Header />
      </div>
      {reduxUser.role === "seller" ? (
        <SellBtn src={SellImg} onClick={add} />
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          margin: " 10px 20px",
        }}
      >
        <SearchBox
          input_type="text"
          comment="  원하는 꽃의 이름을 검색하세요"
          onChange={handleSearchChange}
        />
      </div>
      <ShopList>
        {filteredFlowers.length > 0 ? (
          filteredFlowers.map((item) => (
            <DiscardFlower
              key={item.id}
              shopImage={Img}
              name={item.name}
              engName={item.engName}
              size={item.size}
              price={item.price}
              message={item.message}
            />
          ))
        ) : (
          <h4>검색결과가 없습니다</h4>
        )}
      </ShopList>
    </>
  );
};

export default DiscardedFlowers;
