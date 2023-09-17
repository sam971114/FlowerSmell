import React, { useState } from "react";
import styled, { css } from "styled-components";

import Img from "../../images/logo4.png";
import InputBox from "../../components/InputBox1";

import Sub from "../../images/Subscribe.png";
import UnSub from "../../images/SubscribeDefault.png";
import { useSelector, useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { changeName } from "../../store";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const SignInContainer = styled.div`
  display: flex;
  width: 400px;
  align-items: center;
  flex-direction: column;

  img {
    width: 200px;
    height: 100px;
    margin: 25px 0;
  }
  h1 {
    width: 100%;
    margin: 5px 0;
    font-size: 30px;
  }
`;
const LoginBtn = styled.button`
  width: 100%;
  height: 45px;
  margin: 10px 0;
  background: #4a84ba;
  color: white;
  border: none;
  font-weight: bold;
`;
const BtnContainer = styled.div`
  margin: 5px;
  width: 100%;
  display: flex;
  p {
    margin: 0;
  }
`;

const SubBtn = styled.button`
  border: none; /* 테두리 제거 */
  background-color: transparent; /* 배경색 제거 */
  padding: 0; /* 내부 여백 제거 */
  cursor: pointer; /* 커서 설정 */
  margin-right: 5px;
  img {
    height: 20px;
    width: 20px;
    align-items: center; /* 수직 정렬 */
    justify-content: center; /* 수평 정렬 */
    margin: 0;
  }
`;

const NavBar = styled.div`
  flex-shrink: 0;
  width: 100%;
  margin: 40px 5%;
  display: flex;
  align-items: center; /* 수직 정렬 */
  height: 30px;
  justify-content: space-between;
  p {
    font-weight: bold;
  }
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
`;

const StyledLink2 = styled(Link)`
  width: 100%;
  height: 45px;
  margin: 10px 0;
  background: #4a84ba;
  color: white;
  border: none;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;
const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const RadioLabel = styled.label`
  margin: 2px 20px 0 0;
`;

const SignIn = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("buyer");

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  let navigate = useNavigate();
  const reduxData = useSelector((state) => state.baseUrl);
  const baseUrl = reduxData.url;

  let dispatch = useDispatch();

  const signInFnc = async (e) => {
    // async 키워드 추가
    e.preventDefault();

    if (!name) {
      alert("이름을 입력해주세요.");
    } else if (!password) {
      alert("비밀번호를 입력해주세요.");
    } else {
      let apiUrl = "";
      if (userType === "buyer") {
        apiUrl = baseUrl.concat("/loginUser/", name, "/", password);
      } else {
        apiUrl = baseUrl.concat("/loginBusiness/", name, "/", password);
      }
      try {
        const response = await fetch(apiUrl); // await를 사용하여 비동기적으로 fetch 요청
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          alert("이름과 비밀번호를 다시 확인하세요.");
        } else {
          if (userType === "buyer") {
            dispatch(
              changeName({
                name: data.username,
                role: "buyer",
                id: data.id,
              })
            );
            navigate("/mypagec");
          } else {
            //가게 이름 리덕스로 저장
            dispatch(
              changeName({
                name: data.username,
                role: "seller",
                id: data.id,
              })
            );
            console.log();
            navigate("/mypages");
          }
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }
  };
  return (
    <>
      <Container>
        <SignInContainer>
          <p></p>
          <p></p>
          <StyledLink to="/">
            <img alt="로고" src={Img} />
          </StyledLink>

          <h1>로그인</h1>
          <RadioContainer>
            <RadioLabel>
              <input
                type="radio"
                value="buyer"
                checked={userType === "buyer"}
                onChange={handleUserTypeChange}
              />
              구매자
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                value="seller"
                checked={userType === "seller"}
                onChange={handleUserTypeChange}
              />
              판매자
            </RadioLabel>
          </RadioContainer>
          <InputBox
            input_type="text"
            title={userType === "buyer" ? "사용자 이름" : "가게 이름"}
            comment={
              userType === "buyer"
                ? "사용자 이름을 입력하세요"
                : "가게 이름을 입력하세요"
            }
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputBox
            input_type="password"
            title="비밀번호"
            comment="비밀번호 입력"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <StyledLink2 to="#" onClick={signInFnc}>
            로그인
          </StyledLink2>
          <BtnContainer>
            <SubBtn onClick={toggleSubscription}>
              <img src={isSubscribed ? Sub : UnSub} alt="Subscription Button" />
            </SubBtn>
            <p>로그인 상태 유지</p>
          </BtnContainer>
          <NavBar>
            <p>아이디 찾기</p>
            <p>비밀번호 찾기</p>
            <StyledLink to="/signup">회원가입</StyledLink>
          </NavBar>
        </SignInContainer>
      </Container>
    </>
  );
};

export default SignIn;
