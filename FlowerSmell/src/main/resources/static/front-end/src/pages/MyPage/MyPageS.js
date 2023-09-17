//마이페이지 - 판매자

import React from "react";
import { Link } from "react-router-dom";
import Toggle from "../../components/Toggle_MP";
import ProfileHeader from "../../components/ProfileHeader";
import Mps_1 from "../../components/MPS1";
import Mps_2 from "../../components/MPS2";
import Header from "../../components/Navi";
import styled from "styled-components";

const Container = styled.div`
  isplay: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 40px;
  h2 {
    margin-bottom: 20px;
  }
`;

const MyPageS = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <ProfileHeader name="사자" image="profile-image-url" userType="" />
        <Container>
          <h2 className="section-title">주문 / 예약 확인</h2>
          <Mps_2 />
          {/* <Mps_1 /> */}
        </Container>
      </div>
    </>
  );
};

export default MyPageS;
