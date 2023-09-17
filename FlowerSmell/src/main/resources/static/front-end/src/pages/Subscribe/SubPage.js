import React, { useState, useLocation } from "react";
import "./SubPage.css";
import LeftSection from "./Sections/LeftSection";
import RightSection from "./Sections/RightSection";
import Header from "../../components/Navi";
import { useSelector } from "react-redux";

const SubPage = () => {
  const reduxData = useSelector((state) => state.selectedShop);
  // reduxData.name, reduxData.address, reduxData.phoneNum, reduxData.issub

  // API 콜 등 데이터 로딩 작업을 이곳에서 수행하고 하위 컴포넌트들에 전달
  const [selectedFlowers, setSelectedFlowers] = useState([]);

  const handleSelectFlower = (flower) => {
    if (flower === null) {
      setSelectedFlowers([]);
      return;
    }
    // 이미 선택되있다면 수량만 수정
    const index = selectedFlowers.findIndex(
      (selectedFlowers) => selectedFlowers.name === flower.name
    );
    if (index >= 0) {
      setSelectedFlowers((prevState) => {
        const newState = [...prevState];
        newState[index].quantity += 1;
        return newState;
      });
    } else {
      setSelectedFlowers((prevState) => [
        ...prevState,
        {
          ...flower,
          quantity: 1,
        },
      ]);
    }
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="subpage-container">
        <div className="subpage-content">
          <LeftSection onSelectFlower={handleSelectFlower} />
          <RightSection selectedFlowers={selectedFlowers} />
        </div>
      </div>
    </>
  );
};

export default SubPage;
