import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CheckOrderBox = styled.div`
  width: 158px;
  border: 1px solid black;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 10px;
  text-align: center;
`;

const CheckOrder = ({ date, name, price }) => {
  return (
    <CheckOrderBox>
      <p>{date}</p>
      <p>{name}</p>
      <p>{price} 원</p>
    </CheckOrderBox>
  );
};

export default CheckOrder;
