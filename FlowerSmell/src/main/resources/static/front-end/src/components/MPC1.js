// 주문 / 예약 조회
import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Box = styled.div`
  padding: 16px;
  border: 2px solid #000;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Item = styled.div`
  width: calc(25% - 16px);
  text-align: center;
`;

const BigNumber = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
`;

const DateBox = styled.div`
  border: 1px solid #000;
  padding: 5px;
  border-radius: 8px;
  margin-top: 10px;
`;

function Mpc_1() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Box>
      <Row>
        <Item>
          입금 완료
          <BigNumber>10</BigNumber>
        </Item>
        <Item>
          예약 완료
          <BigNumber>5</BigNumber>
        </Item>
        <Item>
          수령 날짜 확인
          <DateBox>{selectedDate.toLocaleDateString()}</DateBox>
        </Item>
        <Item>
          수령 날짜 변경
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            withPortal
          />
        </Item>
      </Row>
    </Box>
  );
}

export default Mpc_1;
