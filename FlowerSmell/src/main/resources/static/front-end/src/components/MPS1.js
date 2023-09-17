// 꽃집 등록하기
import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const StoreAddContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const AddIcon = styled.span`
  font-size: 3rem;
`;

const AddText = styled.span`
  font-size: 1.25rem;
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Mps_1 = () => {
  const handleClick = () => {};

  return (
    <StyledLink to="/shopR">
      <ContentWrapper>
        <StoreAddContainer onClick={handleClick}>
          <AddIcon>➕</AddIcon>
          <AddText>가게 등록하기</AddText>
        </StoreAddContainer>
      </ContentWrapper>
    </StyledLink>
  );
};

export default Mps_1;
