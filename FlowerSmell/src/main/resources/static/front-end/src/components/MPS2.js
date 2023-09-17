import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CheckOrder from "./CheckOrder";
import { useSelector } from "react-redux";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 92%;
`;

const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  // justify-content: center; 삭제한 부분
  align-items: flex-start; // 변경한 부분
  flex-wrap: wrap;
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Mps_2 = () => {
  const [data, setData] = useState([]);
  const reduxUrl = useSelector((state) => state.baseUrl);
  const reduxUser = useSelector((state) => state.userS);
  const baseUrl = reduxUrl.url;

  const fetchData = async () => {
    let apiUrl = "";
    if (reduxUser.role === "buyer") {
      apiUrl = baseUrl.concat("/api/allOrders/user/", reduxUser.id);
    } else {
      apiUrl = baseUrl.concat("/api/allOrders/business/", reduxUser.id);
    }
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("응답 없음");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Fetch 도중 오류 발생");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [data]);

  return (
    <ContentWrapper>
      <StatusContainer>
        {data.map((item, index) => (
          <CheckOrder
            key={index}
            date={item.orderDate.replace("T", "\n")}
            name={
              reduxUser.role === "buyer" ? item.business_name : item.user_name
            }
            price={item.total_price}
          />
        ))}
      </StatusContainer>
    </ContentWrapper>
  );
};

export default Mps_2;
