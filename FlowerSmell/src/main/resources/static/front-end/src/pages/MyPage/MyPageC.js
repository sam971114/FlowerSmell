// 마이페이지 - 구매자
import React from "react";
import { Link } from "react-router-dom";
import Toggle from "../../components/Toggle_MP";
import ProfileHeader from "../../components/ProfileHeader";
import Mpc_1 from "../../components/MPC1";
import Mpc_2 from "../../components/MPC2";
import Header from "../../components/Navi";
import Mps_2 from "../../components/MPS2";
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
const MyPageC = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <ProfileHeader name="사자" image="profile-image-url" userType="" />
      <Container>
        <h2>주문 / 예약 조회</h2>
        <Mps_2 />
      </Container>
    </>
  );
};

export default MyPageC;
