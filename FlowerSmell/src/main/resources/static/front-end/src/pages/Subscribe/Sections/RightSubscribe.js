import React, { useState, useRef } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled, {css, keyframes} from "styled-components";
import calendarImage from "../../../images/subscribe/calendar.png";
import timeImage from "../../../images/subscribe/time.png";

const PayButton = styled.button`
  width: 364px;
  height: 46px;
  background-color: #D9D9D9;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #707070;
  margin-top: 24px;
  cursor: pointer;
  border: none;
  outline: none;
`;

const Container = styled.div`
  width: 368px;
  height: auto;
  padding: 3px 16px;
  background-color: #D9D9D9;
  box-sizing: border-box;
  border-radius: 8px;
  margin-top: 20px;
`;

const PaymentOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 4px;
  background-color: ${({ isSelected }) => (isSelected ? 'lightgreen' : 'transparent')};
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ToggleButton = styled.button`
  width: 177px;
  height: 43px;
  border-radius: 10px;
  background-color: ${({ isSelected }) => (isSelected ? "#D9D9D9" : "white")};
  border: 1.8px solid #D9D9D9;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${props => (props.isSelected1 ? "#D9D9D9" : "#D9D9D9")};
  }
`;

const dropdownAnimation = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 240px;
    opacity: 1;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1.0px;
  background-color: #D9D9D9;
  margin-top: 0px;
`;

const SubscribeContainer = styled.div`
  // 기존 스타일을 유지하며 필요한 스타일을 추가해주세요.
`;

const FormLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #707070;
  margin-top: 16px;

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

const DropdownContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 0;
  margin: 0;
  opacity: ${props => (props.isOpen ? "1" : "0")}; // 투명도를 변경합니다.
  max-height: ${props => (props.isOpen ? "240px" : "0")}; // 높이를 변경합니다.
  overflow: hidden;
  animation: ${props =>
    props.isOpen
      ? css`${dropdownAnimation} 0.3s ease-in-out forwards` // 여기에 css`` 태그를 추가하여 문제를 해결합니다.
      : "none"};
`;

const DropdownMenuItem = styled.li`
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0; // 구분선을 추가합니다.

  &:hover {
    background-color: #f1f1f1;
  }

  &:last-child {
    border-bottom: none; // 마지막 메뉴 아이템의 구분선을 제거합니다.
  }
`;

const Icon = styled.img`
  width: 21px;
  height: 21px;
  margin-right: 12px;
`;

const DateText = styled.div`
  font-size: 14px;
  color: #707070;
  flex: 1;
`;

const CustomCalendarContainer = styled(CalendarContainer)`
  width: 100%;
`;

const SubscribeButton = ({ selectedOption, handleOptionClick }) => {

  return (
    <Container>
      <PaymentOption isSelected={selectedOption === 1} onClick={() => handleOptionClick('monthly')}>
        <span>한 달 결제</span>
        <span>25,900원</span>
      </PaymentOption>
      <PaymentOption isSelected={selectedOption === 3} onClick={() => handleOptionClick('quarterly')}>
        <span>3개월 결제 (10% 할인)</span>
        <span>70,000원</span>
      </PaymentOption>
      <PaymentOption isSelected={selectedOption === 6} onClick={() => handleOptionClick('biannual')}>
        <span>6개월 결제 (10% 할인)</span>
        <span>139,860원</span>
      </PaymentOption>
    </Container>
  );
};

const FlowerTypeToggle = ({flowervaseData, handleToggleClick}) => {

  return (
    <ToggleContainer>
      <ToggleButton
        isSelected={flowervaseData === 0}
        onClick={() => handleToggleClick(0)}
      >
        꽃다발
      </ToggleButton>
      <ToggleButton
        isSelected={flowervaseData === 1}
        onClick={() => handleToggleClick(1)}
      >
        꽃병용
      </ToggleButton>
    </ToggleContainer>
  );
};

const RightSubscribe = () => {
  const [startDate, setStartDate] = useState(null);
  const refDatePicker = useRef(null);
  const [subscriptionPeriod, setSubscriptionPeriod] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [flowervaseData, setFlowervaseData] = useState(0);

  const handleOptionClick = (option) => {
    switch (option) {
      case "quarterly":
        setSelectedOption(3);
        break;
      case "biannual":
        setSelectedOption(6);
        break;
      default:
        setSelectedOption(1);
    }
  };

  const handleToggleClick = (selectedIndex) => {
    setFlowervaseData(selectedIndex);
};

  const handleContainerClick = () => {
    refDatePicker.current.setOpen(true);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (item) => {
    setSubscriptionPeriod(item);
    setIsDropdownOpen(false);
  };

  const subscriptionOptions = [
    { value: 7, text: "일주일 단위 (7일)" },
    { value: 14, text: "2주 단위 (14일)" },
    { value: 21, text: "3주 단위 (21일)" },
  ];

  const handlePayButtonClick = () => {
    if (!startDate || !subscriptionPeriod) {
      alert("구독 시작 날짜와 구독 주기를 선택해주세요.");
      return;
    }

    let paymentMethod;
    switch (selectedOption) {
      case 3:
        paymentMethod = "3개월 결제 (10% 할인)";
        break;
      case 6:
        paymentMethod = "6개월 결제 (10% 할인)";
        break;
      default:
        paymentMethod = "한 달 결제";
    }

    alert(
      `구독 시작 날짜: ${startDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).replaceAll(". ", ".")}
      구독 주기: ${subscriptionPeriod.text}
      ${flowervaseData === 0 ? "꽃다발" : "꽃병용"}
      결제 방식: ${paymentMethod}`
    );
  };

  return (
    <SubscribeContainer>

      {/* 구독 시작 날짜 */}
      <FormLabel>
        구독 시작 날짜<span>(필수)</span>
      </FormLabel>
      <DatePickerContainer onClick={handleContainerClick}>
        <Icon src={calendarImage} alt="calendar" />
        <DatePicker
          ref={refDatePicker}
          selected={startDate}
          onChange={(newDate) => setStartDate(newDate)}
          dateFormat="yyyy.MM.dd"
          customInput={
            <div>
              <DateText>
                {startDate ? startDate.toLocaleDateString("ko-KR", {
                    year : "numeric",
                    month : "2-digit",
                    day : "2-digit"
                  }).replaceAll(". ", ".") : 
                  "구독 시작 날짜를 선택해주세요. "}
              </DateText>
            </div>
          }
          calendarContainer={CustomCalendarContainer}
          calendarClassName="custom-calendar"
        />
      </DatePickerContainer>
      <Divider />

      {/* 구독 주기 */}
      <FormLabel>
        구독 주기<span>(필수)</span>
      </FormLabel>
      <DatePickerContainer onClick={handleDropdownClick}>
        <Icon src={timeImage} alt="time" />
        <DropdownContainer>
          <DateText>
            {subscriptionPeriod
              ? subscriptionPeriod.text
              : "구독 주기를 선택해주세요."}
          </DateText>
          <DropdownMenu isOpen={isDropdownOpen}>
            {subscriptionOptions.map(option => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleDropdownItemClick(option)}
              >
                {option.text}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
        </DropdownContainer>
      </DatePickerContainer>
      <Divider />
      <FlowerTypeToggle
        flowervaseData={flowervaseData}
        handleToggleClick={handleToggleClick}
      />
      <SubscribeButton
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      ></SubscribeButton>
      <PayButton onClick={handlePayButtonClick}>결제하기</PayButton>
    </SubscribeContainer>
  );
};

export default RightSubscribe;