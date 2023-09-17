import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Navi";
import styled from "styled-components";
import Upload from "../../components/UploadImage";

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
  padding: 14px;
  p {
    margin-right: 10px;
  }
  input {
    width: 85%;
    height: 36px;
  }
`;

const StyledBtn = styled.button`
  width: 100%;
  height: 50px;
  margin: 10px;
  background-color: #ffffff;
  border-color: #bdbdbd;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 161px;
  border: 1px solid #000;
  background: rgba(96, 96, 96, 0);
`;

const ShopR = () => {
  const navigate = useNavigate();

  const move = (e) => {
    e.preventDefault();
    //여기서 일반꽃임을 넘겨줘야함
    navigate("/mypages");
  };
  return (
    <>
      <Header />
      <Container>
        <h2>가게 등록 하기</h2>
        <MedianContainer>
          <Upload />
          <div style={{ marginLeft: "20px", width: "60%" }}>
            <Detail style={{ marginTop: "10px" }}>
              <p style={{ width: "15%" }}>가게 이름 : </p>
              <input />
            </Detail>
            <Detail style={{ marginTop: "10px" }}>
              <p style={{ width: "15%" }}>가게 위치 : </p>
              <input />
            </Detail>
            <h4 style={{ margin: "10px" }}>정기 구독 가능 유무</h4>
            <div
              style={{
                margin: "0",
                display: "flex",
                justifyContent: "center",
                padding: "4px",
              }}
            >
              <StyledBtn>구독 가능</StyledBtn>
              <StyledBtn>구독 불가</StyledBtn>
            </div>
          </div>
        </MedianContainer>
        <h2>가게 소개글 :</h2>
        <StyledInput
          placeholder="가게 이미지 옆에 반영됩니다.
          \n
          (한글 기준 500자 이내)"
        ></StyledInput>
        <div style={{ width: "100%", display: "flex" }}>
          <StyledBtn onClick={move}>가게 등록</StyledBtn>
        </div>
      </Container>
    </>
  );
};
export default ShopR;
