
import React, { useState } from "react";
import "./UpperSection.css";

function UpperSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);

  const handleSmallImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleNavigationClick = (direction) => {
    let newIndex = selectedImageIndex + direction;
    if (newIndex < 0) newIndex = 4;
    if (newIndex > 4) newIndex = 0;
    setSelectedImageIndex(newIndex);
  };

  const toggleHeart = () => {
    setLiked(!liked);
  };

  const handleChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedOption((prev) => [...prev, id]);
    } else {
      setSelectedOption((prev) => prev.filter((option) => option !== id));
    }
  };

  const smallImages = [
    'path/to/small/image1.jpg',
    'path/to/small/image2.jpg',
    'path/to/small/image3.jpg',
    'path/to/small/image4.jpg',
    'path/to/small/image5.jpg',
  ];

  const productOptions = [
    {
      id: 'vase',
      label: '화병용',
      color: 'red',
    },
    {
      id: 'bouquet',
      label: '꽃다발',
      color: 'blue',
    },
  ];

  return (
    <div className="upper-section-wrapper">
      <div className="left-section">
        <img
          className="large-image"
          src={smallImages[selectedImageIndex]}
          alt="큰 이미지"
        />
        <div className="small-images">
          <span
            className="nav-arrow"
            onClick={() => handleNavigationClick(-1)}
          >
            ◀
          </span>
          {smallImages.map((img, index) => (
            <img
              key={index}
              className={`small-image${
                selectedImageIndex === index ? " selected" : ""
              }`}
              src={img}
              alt="작은 이미지"
              onClick={() => handleSmallImageClick(index)}
            />
          ))}
          <span
            className="nav-arrow"
            onClick={() => handleNavigationClick(1)}
          >
            ▶
          </span>
        </div>
      </div>
      
      <div className="middle-section">
        <h2>꽃 가게 이름</h2>
        <p>
          ⭐ 4.8 💬 (리뷰: 12)
        </p>
        <hr />
        <p>구독료: 월 259,000원 (월 2회)</p>
        <p>위치: 서울시 광진구 능동로 120</p>
        {/* 네이버 지도 */}
        <div className="map-box"></div>
      </div>
      
      <div className="right-section">
        <button className="heart-button" onClick={toggleHeart}>
          {liked ? "❤" : "♡"}
        </button>
        <p className="purchase-inquiry">구매 문의: 02-123-456</p>
        {productOptions.map((option) => (
          <label key={option.id} className="styled-label">
            <input
              className="styled-checkbox" // 클래스 추가
              type="checkbox"
              name="productOptions"
              id={option.id}
              onChange={handleChange}
            />
            {option.label}
            <div
              className={`styled-image${
                selectedOption.indexOf(option.id) > -1 ? " selected" : ""
              }`}
              style={{ backgroundColor: option.color }}
            ></div>
          </label>
        ))}
        <div className="button-container"> {/* 추가 */}
          <button className="subscribe-button">정기 구독하기</button>
          <button className="buy-button">구매하기</button>
        </div> {/* 추가 */}
      </div>
    </div>
  );
}

export default UpperSection;

