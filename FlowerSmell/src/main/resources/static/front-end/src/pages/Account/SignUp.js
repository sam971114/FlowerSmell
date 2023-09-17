import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import Img from "../../images/logo4.png";
import InputBox from "../../components/InputBox1";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;

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
  span {
    width: 100%;
    margin: 0;
    font-size: 12px;
    color: grey;
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

const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const RadioLabel = styled.label`
  margin: 2px 20px 0 0;
`;

const StyledLink = styled(Link)`
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
const StyledLink2 = styled(Link)`
  text-decoration: none;
`;
const SignUp = () => {
  const [userType, setUserType] = useState("buyer");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [subscribe, setSubscribe] = useState("false");
  const [address, setAddress] = useState("");
  const [isSeller, setIsSeller] = useState(false); // 판매자 여부 상태 변수 추가

  let navigate = useNavigate();
  const reduxData = useSelector((state) => state.baseUrl);
  const baseUrl = reduxData.url;

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setIsSeller(event.target.value === "seller");
  };
  const handleSubChange = (event) => {
    console.log(event.target.value);
    setSubscribe(event.target.value);
  };
  useEffect(() => {}, []);

  useEffect(() => {
    if (phoneNum.length === 10) {
      setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneNum.length === 13) {
      setPhoneNum(
        phoneNum.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [phoneNum]);

  const signUpFnc = (e) => {
    e.preventDefault();
    var num = password.search(/[0-9]/g);
    var eng = password.search(/[a-z]/gi);
    var spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (!name) {
      alert("이름을 입력해주세요.");
    } else if (password.length < 8 || password.length > 20) {
      alert("8자리 ~ 20자리 이내로 입력해주세요.");
    } else if (num < 0 || eng < 0 || spe < 0) {
      alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
    } else if (password !== passwordC) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else {
      let apiUrl = "";
      console.log("userType", userType);
      let dataToSend = null;
      if (userType == "buyer") {
        apiUrl = baseUrl.concat("/join");

        dataToSend = {
          username: name,
          password: password,
          phoneNumber: phoneNum,
        };
      } else {
        apiUrl = baseUrl.concat("/joinBusiness");
        if (!address) {
          alert("가게 주소를 입력해주세요.");
          return;
        }
        dataToSend = {
          username: name,
          password: password,
          phoneNumber: phoneNum,
          subscribe: subscribe === "true" ? true : false,
          address: address,
        };
      }
      console.log("dataToSend", dataToSend);
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      navigate("/signin");
    }
  };

  return (
    <>
      <Container>
        <SignUpContainer>
          <p></p>
          <p></p>
          <StyledLink2 to="/">
            <img alt="로고" src={Img} />
          </StyledLink2>
          <h1>회원 가입</h1>
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
            title={isSeller ? "가게 이름 *" : "이름 *"}
            comment={isSeller ? "가게 이름 입력" : "이름 입력"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <InputBox
            input_type="text"
            title="비밀번호 *"
            comment="비밀번호 8자리 ~ 20자리"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>* 영문자 1개, 숫자 1개, 특수문자 1개</span>
          <InputBox
            input_type="text"
            title="비밀번호 확인 *"
            comment="비밀번호 확인"
            value={passwordC}
            onChange={(e) => {
              setPasswordC(e.target.value);
            }}
          />
          <InputBox
            input_type="text"
            title="전화번호 *"
            comment="숫자만 입력하세요"
            value={phoneNum}
            onChange={(e) => {
              setPhoneNum(e.target.value);
            }}
          />
          {isSeller && (
            <>
              <InputBox
                input_type="text"
                title="가게 주소 *"
                comment="가게 주소 입력"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <RadioContainer>
                <RadioLabel>
                  <input
                    type="radio"
                    value="true"
                    checked={subscribe === "true"}
                    onChange={handleSubChange}
                  />
                  구독 서비스 제공
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    value="false"
                    checked={subscribe === "false"}
                    onChange={handleSubChange}
                  />
                  구독 서비스 불가
                </RadioLabel>
              </RadioContainer>
            </>
          )}

          <StyledLink to="#" onClick={signUpFnc}>
            가입 신청
          </StyledLink>
        </SignUpContainer>
      </Container>
    </>
  );
};

export default SignUp;
