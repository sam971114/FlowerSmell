import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Like from "../images/like.png";
import UnLike from "../images/unlike.png";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeShop } from "../store";

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

const HeartButton = styled.button`
  position: absolute; /* absolute 포지션으로 변경 */
  top: 5px; /* 컨테이너 상단으로부터의 거리 조정 */
  right: 5px; /* 컨테이너 우측으로부터의 거리 조정 */
  background: transparent;
  border: none;
  img {
    width: 20px;
    height: 20px;
  }
`;

const Shop = ({
  id,
  shopImage,
  shopName,
  shopAddress,
  heart,
  phoneNumber,
  subscribe,
}) => {
  const [like, setLike] = useState(heart);
  const toggleLike = (e) => {
    e.preventDefault();
    setLike(!like);
    //백엔드에 post 해야할 듯
  };

  let dispatch = useDispatch();

  let navigate = useNavigate();
  const changeReduct = (e) => {
    e.preventDefault();
    //     {/* 순서대로 꽃집 주소, 번호, 가게 이름, 구독 여부 넘겨줌
    // ex. '서울특별시 123', '010-1234-1234', '구독꽃집1', 'true' */}
    dispatch(
      changeShop({
        b_id: id,
        address: shopAddress,
        phoneNum: phoneNumber,
        name: shopName,
        issub: !subscribe ? subscribe : false,
      })
    );
    navigate("/subscribe");
  };

  return (
    <StyledLink to="#" onClick={changeReduct}>
      <ShopContainer>
        <ShopImg src={shopImage} alt="꽃집 이미지" />
        <HeartButton onClick={toggleLike}>
          <img src={like ? Like : UnLike} alt="Like Button" />
        </HeartButton>
        <hr />
        <h3 id="name">{shopName}</h3>
        <p id="address">{shopAddress}</p>
        <p id="phoneNumber">{phoneNumber}</p>
      </ShopContainer>
    </StyledLink>
  );
};

export default Shop;
