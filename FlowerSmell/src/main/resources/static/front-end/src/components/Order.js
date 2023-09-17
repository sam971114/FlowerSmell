import React from "react";
import styled from "styled-components";

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: calc(
    150px * var(--max-orders-per-row) +
      (var(--gap-size) * (var(--max-orders-per-row) -1))
  );
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
`;

const HorizontalScrollBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-bottom: 30px;
  max-height: calc(50vh - var(--container-padding));
`;

const OrderBox = styled.div`
  display: flex;
  padding-left: 16px;
  border-radius: 8px;
  border-right: 2px solid #000;
  margin-right: -2px;
`;

const Info = styled.p`
  padding: 16px;
  width: 150px;
  border-left: 2px solid #000;
  margin-right: -2px;
`;

const orderData = [
  { date: "2021-09-01", store: "스타벅스" },
  { date: "2021-09-02", store: "투썸플레이스" },
];

const Order = ({ orderData }) => {
  return (
    <OrderContainer>
      <SectionTitle>주문 / 예약 조회</SectionTitle>
      <HorizontalScrollBox>
        {orderData.map(({ date, store }, index) => (
          <OrderBox key={index}>
            <Info>{date}</Info>
            <Info>{store}</Info>
          </OrderBox>
        ))}
      </HorizontalScrollBox>
    </OrderContainer>
  );
};

export default Order;
