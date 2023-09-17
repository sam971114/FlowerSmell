// 안녕하세요 사자님 부분
import React from "react";
import styled from "styled-components";
import SettingImg from "../images/setting.png";
import UserImg from "../images/userImg.png";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 80%;
  margin: 50px auto;
`;

const Image = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  object-fit: cover;
  background-color: green;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const ProfileLeft = styled.div`
  display: flex;
  align-items: end;
`;

const ProfileText = styled.p`
  margin-bottom: 10px;
  margin-left: 20px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
`;

const ProfileSettings = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
  margin-top: 0;
  margin-bottom: 30px;
  cursor: pointer;
  p {
    font-size: 16px;
    margin: 0;
    margin-bottom: 5px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

const BoldText = styled.p`
  font-weight: bold;
  margin: 0px;
`;

function ProfileHeader() {
  const handleClick = () => {
    alert("클릭 테스트용");
  };
  const reduxData = useSelector((state) => state.userS);
  const name = reduxData.name;
  return (
    <Wrapper>
      <HeaderContainer>
        <ProfileLeft>
          <Image src={UserImg} alt="Profile" />
          <div>
            <ProfileText>안녕하세요, {name}님</ProfileText>
            <ProfileSettings onClick={handleClick}>
              <img alt="세팅 버튼" src={SettingImg} />
              <p>정보 수정하기</p>
            </ProfileSettings>
          </div>
        </ProfileLeft>
        <div
          style={{
            display: "flex",
            textAlign: "right",
            margin: " 0 20px",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <BoldText>고객 센터 9899-0001</BoldText>
          <p style={{ margin: "5px 0 0 0" }}>운영시간 10:00 - 18:00 </p>
          <p style={{ margin: "8px 0" }}>(주말, 공휴일 제외)</p>
          <p style={{ margin: "5px 0" }}>점심시간 12:00 - 13:00</p>
        </div>
      </HeaderContainer>
    </Wrapper>
  );
}

export default ProfileHeader;
