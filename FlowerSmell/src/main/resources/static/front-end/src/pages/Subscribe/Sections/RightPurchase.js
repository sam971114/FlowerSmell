import React, { useState, useRef, useEffect } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import calendarImage from "../../../images/subscribe/calendar.png";
import minusImg from "../../../images/subscribe/minus.png";
import plusImg from "../../../images/subscribe/plus.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummaryBox = styled.div`
  width: 368px;
  background-color: #d9d9d9;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 20px;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 16px;
`;

const PurchaseButton = styled.button`
  width: 368px;
  height: 46px;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  border-radius: 8px;
`;
const FlowerItemContainer = styled.div`
  width: 329px;
  height: auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  box-sizing: border-box;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  background-color: white;
  padding: 10px;
`;

const FlowerItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FlowerItemQuantity = styled.div`
  width: 150px; // 추가
  height: 35px; // 추가
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #d9d9d9 inset; // 추가
  border-radius: 5px; // 추가
`;

const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  font-size: 22px; // 수정
  line-height: 24px;
  text-align: center;
  display: flex; // 추가
  justify-content: center; // 추가
  align-items: center; // 추가
  background-image: url(${(props) => props.img}); // 추가
  background-repeat: no-repeat; // 추가
  background-position: center; // 추가
  border: 1.8px solid #d9d9d9;
`;

const RightPurchaseContainer = styled.div`
  margin-top: 16px;
`;

const FormLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #707070;

  span {
    margin-left: 4px;
    color: red;
  }
`;

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border: none;
`;

const CalendarIcon = styled.img`
  width: 21px;
  height: 21px;
  margin-right: 12px;
`;

const DateText = styled.div`
  font-size: 14px;
  color: #707070;
  flex: 1;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin-top: 0px;
`;

const CustomCalendarContainer = styled(CalendarContainer)`
  width: 100%;
`;

const FlowervaseToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const FlowervaseToggleButton = styled.button`
  width: 177px;
  height: 43px;
  border-radius: 10px;
  background-color: ${({ isSelected }) => (isSelected ? "#D9D9D9" : "white")};
  border: 1.8px solid #d9d9d9;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #d9d9d9;
  }
`;

const RightPurchase = ({ initSelectedFlowers = [] }) => {
  const reduxDataUser = useSelector((state) => state.userS);
  const reduxDataShop = useSelector((state) => state.selectedShop);
  const reduxData = useSelector((state) => state.baseUrl);
  console.log("SUB 페이지 reduxDataShop", reduxDataShop);
  console.log("initSelectedFlowers", initSelectedFlowers);
  const [selectedFlowers, setSelectedFlowers] = useState(initSelectedFlowers);

  const [date, setDate] = useState(null);
  const refDatePicker = useRef(null);

  const [isFlowervaseSelected, setFlowervaseSelected] = useState(true);

  const [flowerQuantities, setFlowerQuantities] = useState(
    selectedFlowers.map((flower) => (flower.quantity ? flower.quantity : 1))
  );
  let navigate = useNavigate();

  useEffect(() => {
    setSelectedFlowers([...initSelectedFlowers]);
  }, [initSelectedFlowers]);

  useEffect(() => {
    setFlowerQuantities(
      selectedFlowers.map((flower) => (flower.quantity ? flower.quantity : 1))
    );
  }, [selectedFlowers]);

  const handleContainerClick = () => {
    refDatePicker.current.setOpen(true);
  };

  const handleFlowervaseToggleClick = (isSelected) => {
    setFlowervaseSelected(isSelected);
  };
  const flowervaseData = isFlowervaseSelected ? "0" : "1";

  const handleIncreaseQuantity = (index) => {
    setFlowerQuantities((prevFlowerQuantities) =>
      prevFlowerQuantities.map((quantity, i) =>
        i === index ? quantity + 1 : quantity
      )
    );
  };

  const handleDecreaseQuantity = (index) => {
    setFlowerQuantities((prevFlowerQuantities) => {
      const updatedQuantities = prevFlowerQuantities.map((quantity, i) => {
        // 추가: 수량이 1보다 작으면 상자를 삭제
        if (i === index && quantity === 1) {
          selectedFlowers.splice(index, 1);
          prevFlowerQuantities.splice(index, 1);
          initSelectedFlowers.splice(index, 1);
        }
        console.log("quantity", quantity);
        return i === index && quantity > 1 ? quantity - 1 : quantity;
      });
      return updatedQuantities;
    });
  };

  const flowerItems = selectedFlowers.map((flower, index) => (
    <FlowerItemContainer key={index}>
      <FlowerItemTop>
        <div>
          {flower.name} 한 단 ({flower.size}대)
        </div>
        <div>{flower.price * flowerQuantities[index]}원</div> {/* 수정 */}
      </FlowerItemTop>
      <FlowerItemQuantity>
        <QuantityButton
          img={minusImg}
          onClick={() => handleDecreaseQuantity(index)}
        />
        <span>{flowerQuantities[index]}</span> {/* 수정 */}
        <QuantityButton
          img={plusImg}
          onClick={() => handleIncreaseQuantity(index)}
        />
      </FlowerItemQuantity>
    </FlowerItemContainer>
  ));

  const totalPrice = selectedFlowers.reduce(
    (acc, flower, index) =>
      acc + flower.price * flowerQuantities[index] /* 수정 */,
    0
  );
  const handlePurchase = () => {
    if (!date) {
      alert("픽업 날짜를 선택해주세요.");
      return;
    }

    const flowersData = selectedFlowers.map((flower, index) => ({
      name: flower.name,
      engName: flower.engName,
      size: flower.size,
      price: flower.price,
      quantity: flowerQuantities[index],
    }));

    const baseUrl = reduxData.url;
    const apiUrl = baseUrl.concat("/api/makeOrder");

    let dataToSend = {
      total_price: totalPrice,
      userId: reduxDataUser.id,
      businessId: reduxDataShop.b_id,
    };
    console.log("꽃 주문", dataToSend);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((data) => {
        console.log(data);
        alert("주문 완료");
        navigate("/mypagec");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <RightPurchaseContainer>
      <FormLabel>
        픽업 날짜<span>(필수)</span>
      </FormLabel>
      <DatePickerContainer onClick={handleContainerClick}>
        <CalendarIcon src={calendarImage} alt="calendar" />
        <DatePicker
          ref={refDatePicker}
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          dateFormat="yyyy.MM.dd. tt hh:mm"
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="시간"
          showTimeSelect
          shouldCloseOnSelect={false}
          customInput={
            <div>
              <DateText>
                {date
                  ? date
                      .toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replaceAll(". ", ".")
                      .replaceAll(" ", "")
                      .replace("오후", " 오후 ")
                      .replace("오전", " 오전 ")
                  : "픽업 날짜를 선택해주세요."}
              </DateText>
            </div>
          }
          calendarContainer={CustomCalendarContainer}
          calendarClassName="custom-calendar"
        />
      </DatePickerContainer>
      <Divider />
      <FlowervaseToggleContainer>
        <FlowervaseToggleButton
          isSelected={isFlowervaseSelected}
          onClick={() => handleFlowervaseToggleClick(true)}
        >
          꽃다발
        </FlowervaseToggleButton>
        <FlowervaseToggleButton
          isSelected={!isFlowervaseSelected}
          onClick={() => handleFlowervaseToggleClick(false)}
        >
          꽃병용
        </FlowervaseToggleButton>
      </FlowervaseToggleContainer>
      <OrderSummaryBox>
        {flowerItems}
        <TotalPriceContainer>
          총 주문 금액: <span>{totalPrice}</span>원
        </TotalPriceContainer>
      </OrderSummaryBox>
      <PurchaseButton onClick={handlePurchase}>결제하기</PurchaseButton>
    </RightPurchaseContainer>
  );
};

export default RightPurchase;
