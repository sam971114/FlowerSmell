import React, { useState, useEffect } from "react"; // 수정된 부분
import styled from "styled-components";
import starImage from "../../../images/subscribe/star.png";
import reviewImage from "../../../images/subscribe/review.png";
import LowerSection from "./LowerSection";
import RightPurchase from "./RightPurchase";
import RightSubscribe from "./RightSubscribe"; // 수정된 부분
import downArrowImage from "../../../images/subscribe/downarrow.png";
import { useSelector } from "react-redux";

const InformationBox = styled.div`
  padding-top: 20px;
  box-sizing: border-box;
`;

const InformationTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
`;

const InformationText = styled.div`
  margin-top: 15px;
`;

const DownArrow = styled.img`
  width: 25px;
  height: 27px;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 210px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
`;
const florist = {
  name: "윤서네 꽃집",
  tel: "02-123-456",
  rating: 4.0,
  reviews: 42,
};

const RightSectionContainer = styled.div`
  width: 368px;
  padding: 30px;
  margin-top: 20px;
`;

const FloristInfoContainer = styled.div`
  display: flex;
  align-items: center;
  // 수정된 부분
  justify-content: flex-start;
`;

const FloristTitle = styled.div`
  font-size: 24px;
  color: #000;
  margin-bottom: 8px;
  margin-right: 16px;
`;

const FloristTel = styled.div`
  font-size: 14px;
  color: #707070;
  text-align: right;
  margin-left: 16px;
`;

const StarRatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.img`
  height: 30px;
  margin-right: 4px;
  ${({ isGray }) =>
    isGray &&
    `
    filter: grayscale(100%);
  `}
`;

const RatingText = styled.div`
  font-size: 26px;
  margin-right: 4px;
`;

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
  margin-left: 8px;
`;

const ReviewIcon = styled.img`
  margin-right: 4px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1.8px;
  background-color: #d9d9d9;
  margin-top: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ToggleButton = styled.button`
  width: 177px;
  height: 43px;
  border-radius: 10px;
  background-color: ${({ isSelected }) => (isSelected ? "#D9D9D9" : "white")};
  border: 1.8px solid #d9d9d9;
  margin-top: 10px;
  font-size: 20px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #d9d9d9;
  }
`;
const ToggleButtonWrapper = styled.div`
  display: flex;
  justify-content: ${({ fullWidth }) =>
    fullWidth ? "center" : "space-between"};
  margin-top: 16px;
`;

const FullWidthToggleButton = styled(ToggleButton)`
  width: 368px;
  height: 46px;
`;

const NaverMap = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=s31p4yrjyh";
    script.async = false;
    document.head.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.555073, 126.89203),
        zoom: 15,
      };

      const mapInstance = new window.naver.maps.Map("map", mapOptions);

      // 마커 추가
      const markerPosition = new window.naver.maps.LatLng(37.555073, 126.89203);

      new window.naver.maps.Marker({
        position: markerPosition,
        map: mapInstance,
      });
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "210px" }}></div>;
};

const RightSection = ({ selectedFlowers, handleSelectFlower }) => {
  const reduxData = useSelector((state) => state.selectedShop);
  // reduxData.name, reduxData.address, reduxData.phoneNum, reduxData.issub
  const stars = [];
  for (let i = 0; i < 5; ++i) {
    stars.push(<Star key={i} src={starImage} isGray={i >= florist.rating} />);
  }
  const [isPurchaseSelected, setIsPurchaseSelected] = useState(true);
  const [, setInitSelectedFlowers] = useState([]);

  useEffect(() => {
    setInitSelectedFlowers([...selectedFlowers]);
  }, [selectedFlowers]);
  const handleButtonClick = (isPurchase) => {
    setIsPurchaseSelected(isPurchase);
  };
  const [openBoxIndex, setOpenBoxIndex] = useState(-1);

  const handleBoxClick = (index, event) => {
    event.preventDefault();
    const { scrollTop } = document.documentElement;
    setOpenBoxIndex(openBoxIndex === index ? -1 : index);
    document.documentElement.scrollTop = scrollTop;
  };

  const informationData = [
    {
      title: "가게 위치 보기",
      content: (
        <>
          {" "}
          <MapContainer>
            <NaverMap></NaverMap>
          </MapContainer>{" "}
          <InformationText>{reduxData.address}</InformationText>{" "}
        </>
      ),
    },
    {
      title: "원산지",
      content: (
        <InformationText>
          {" "}
          [확인 부탁드려요!]
          <br />
          - 공휴일에 배송되는 정기구독 상품은 자동적으로 2주 뒤로 조정됩니다.
          [공휴일 기준: 설 명절, 추석 명절을 포함한 모든 법정 공휴일]
          <br />
          - 택배사의 물량이 많은 설, 추석 주간에는 KUKKA의 배송일이 구매시에
          자동 변경지정 됩니다. 변경된 날짜는 [마이페이지-정기구독] 탭에서 확인
          가능합니다.
          <br />
          - -9ºC 이하의 날씨에는 꽃의 냉해 방지를 위해 배송이 미뤄질 수
          있습니다.
          <br />- 택배 배송 특성상 정확한 배송 시간 안내와 배송 시간 조정이
          어렵습니다. ...
        </InformationText>
      ),
    },
    {
      title: "픽업 방법 안내",
      content: (
        <InformationText>
          안녕하세요. 저는 트위치에서 방송을 하고 있는 스트리머 케인입니다. 먼저
          저의 말과 행동으로 인해 큰 피해를 끼치고 실망을 드린 샌드백님, 시청자
          분들께 죄송합니다. 지금부터는...
        </InformationText>
      ),
    },
  ];

  return (
    <RightSectionContainer>
      <FloristInfoContainer>
        <FloristTitle>{reduxData.name}</FloristTitle>
        <FloristTel>{`문의: ${reduxData.phoneNum}`}</FloristTel>
      </FloristInfoContainer>
      <StarRatingContainer>
        {stars}
        <RatingText>{florist.rating.toFixed(1)}</RatingText>
        <ReviewContainer>
          <ReviewIcon src={reviewImage} />
          <div>{florist.reviews}</div>
        </ReviewContainer>
      </StarRatingContainer>
      <Divider />
      <LowerSection />
      <Divider />
      <ButtonContainer>
        {/* reduxData.issub이 true인 경우에만 정기 구독 버튼을 표시 */}
        {reduxData.issub && (
          <ToggleButton
            isSelected={!isPurchaseSelected}
            onClick={() => handleButtonClick(false)}
          >
            정기 구독
          </ToggleButton>
        )}
        <ToggleButton
          isSelected={isPurchaseSelected}
          onClick={() => handleButtonClick(true)}
          style={{
            width: reduxData.issub ? "177px" : "368px",
            height: reduxData.issub ? "43px" : "46px",
          }} // reduxData.issub이 false인 경우에 가로 368px, 세로 46px로 변경
        >
          구매하기
        </ToggleButton>
      </ButtonContainer>
      {isPurchaseSelected ? (
        <RightPurchase
          initSelectedFlowers={selectedFlowers}
          onSelectFlower={handleSelectFlower}
        />
      ) : (
        <RightSubscribe />
      )}
      {informationData.map((info, index) => (
        <InformationBox key={index}>
          <InformationTitle onClick={(event) => handleBoxClick(index, event)}>
            <div>{info.title}</div>
            <DownArrow src={downArrowImage} isOpen={openBoxIndex === index} />
          </InformationTitle>
          <Divider />
          {openBoxIndex === index && info.content}
        </InformationBox>
      ))}
    </RightSectionContainer>
  );
};

export default RightSection;
