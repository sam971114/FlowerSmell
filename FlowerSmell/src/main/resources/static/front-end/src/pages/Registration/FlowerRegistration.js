import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Navi";
import styled from "styled-components";
import Upload from "../../components/UploadImage";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 90%;
  height: auto;
  border: solid;
  border-color: #bdbdbd;
  margin: 20px auto;
  padding: 10px 30px;
`;

const MedianContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* 수직 정렬 */
`;

const Detail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* 수직 정렬 */
  padding: 0 14px;
  p {
    margin-right: 10px;
  }
  input {
    width: 55%;
    height: 36px;
  }
`;

const StyledBtn = styled.button`
  width: 60%;
  height: 50px;
  margin: 30px auto;
  background-color: #ffffff;
  border-color: #bdbdbd;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100px;
  border: 1px solid #000;
  background: rgba(96, 96, 96, 0);
`;

const FlowerR = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [engName, setEngName] = useState("");
  const [message, setMessage] = useState("");
  const reduxData = useSelector((state) => state.userS);

  const move = (e) => {
    e.preventDefault();
    sendData();
  };

  const reduxData2 = useSelector((state) => state.baseUrl);
  const baseUrl = reduxData2.url;

  const sendData = (e) => {
    //로그인 되면 꽃집 이름 저장 필요
    if (!name || !size || !price || !engName || !message) {
      alert("빠짐없이 입력해주세요.");
      return;
    } else {
      //맨 끝에 수정 필요 (구독 꽃집2)
      let apiUrl = "";
      if (state.to === "/board") {
        apiUrl = baseUrl.concat(
          "/api/business/RegisterFlower/",
          reduxData.name
        );
      } else {
        apiUrl = baseUrl.concat("/api/saveDiscardFlower/", reduxData.name);
      }

      console.log("꽃 등록에 제대로 넘어왔는지 확인", reduxData.name);
      console.log("apiUrl", apiUrl);
      const dataToSend = {
        name: name,
        size: Number(size),
        price: Number(price),
        engName: engName,
        message: message,
      };
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((data) => {
          console.log("꽃 등록 성공");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      navigate(state.to);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h2 style={{ margin: "10px" }}>
          {state.to === "/board" ? "" : "폐기"}상품 등록 하기
        </h2>
        <MedianContainer>
          <Upload />
          <div style={{ marginLeft: "20px", width: "60%" }}>
            <Detail style={{ marginTop: "0" }}>
              <p style={{ width: "40%" }}>
                {state.to === "/board" ? "" : "폐기"} 꽃 이름 (한글) :{" "}
              </p>
              <input
                input_type="text"
                placeholder="꽃의 이름을 적어주세요"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Detail>
            <Detail style={{ marginTop: "10px" }}>
              <p style={{ width: "40%" }}>
                {state.to === "/board" ? "" : "폐기"} 꽃 이름 (영어) :{" "}
              </p>
              <input
                input_type="text"
                placeholder="꽃의 이름(영어)을 적어주세요"
                onChange={(e) => {
                  setEngName(e.target.value);
                }}
              />
            </Detail>
            <Detail style={{ marginTop: "10px" }}>
              <p style={{ width: "40%" }}>상품 단 수 : </p>
              <input
                input_type="number"
                placeholder="한 단에 몇 송이인지 입력해주세요"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </Detail>
            <Detail style={{ marginTop: "10px" }}>
              <p style={{ width: "40%" }}>상품 가격(원) : </p>
              <input
                input_type="number"
                placeholder="꽃의 판매 가격을 입력해주세요"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Detail>
          </div>
        </MedianContainer>
        <h2>상품 소개 :</h2>
        <StyledInput
          input_type="text"
          placeholder="상품 이미지 아래에 반영됩니다.
                (한글 기준 200자 이내)"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <div style={{ width: "100%", display: "flex" }}>
          <StyledBtn onClick={move}>꽃 등록</StyledBtn>
        </div>
      </Container>
    </>
  );
};
export default FlowerR;
