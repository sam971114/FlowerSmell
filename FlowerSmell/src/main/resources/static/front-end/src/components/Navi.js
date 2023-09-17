import styled from "styled-components";
import React, { useState } from "react";
import FloralScentLogo from "../images/logo4.png";
import User from "../images/userIcon.png";
import Alarm from "../images/alarmIcon.png";
import Menu from "../images/menu.png";
import Drop from "../images/Dropdown.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const images = {
  logo: FloralScentLogo,

  userIcon: User,
  alarmIcon: Alarm,
  menuIcon: Menu,
  dropdown: Drop,
};

const HeaderContainer = styled.div`
  margin: 0px auto;
  display: flex;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    margin: 20px 0;
    width: auto;
  }
`;

const Logo = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 20px;
`;

const Logo2 = styled.img`
  width: 180px;
  height: 90px;
  margin-left: 20px;
`;

const NavBar = styled.div`
  flex-shrink: 0;
  margin: 0 5%;
  display: flex;
  align-items: center; /* 수직 정렬 */
  height: 30px;
  justify-content: space-between;
`;

const MenuLi = styled.li`
  list-style-type: none;
  font-size: 15px;
  font-weight: bold;
`;

const NavImg = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 30px 0 30px;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;
const Header = () => {
  const reduxData = useSelector((state) => state.userS);

  return (
    <>
      <HeaderContainer>
        <div>
          {/* <Logo alt="FloralScent Logo" src={images.logo} />
          <ServiceName>
            <StyledLink to="/">꽃내음</StyledLink>
          </ServiceName> */}
          <LogoLink to="/">
            <Logo2 alt="FloralScent Logo" src={images.logo} />
          </LogoLink>
        </div>
      </HeaderContainer>
      <hr />
      <NavBar>
        <MenuLi>
          <StyledLink to="/intro">서비스 소개</StyledLink>
        </MenuLi>
        <MenuLi>
          <StyledLink to="/shoplist">꽃집 구경하기</StyledLink>
        </MenuLi>
        <MenuLi>
          <StyledLink to="/discard">폐기 꽃 게시판</StyledLink>
        </MenuLi>
        <MenuLi>
          <StyledLink to="/board">일반 꽃 게시판</StyledLink>
        </MenuLi>
        <MenuLi>
          {reduxData.role === "buyer" ? (
            <StyledLink to="/mypageC">마이페이지</StyledLink>
          ) : reduxData.role === "seller" ? (
            <StyledLink to="/mypageS">마이페이지</StyledLink>
          ) : (
            <StyledLink to="/signin">로그인</StyledLink>
          )}
        </MenuLi>
      </NavBar>
      <hr />
    </>
  );
};
export default Header;
