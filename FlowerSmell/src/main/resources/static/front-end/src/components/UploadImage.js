import React from "react";
import styled from "styled-components";

const Upload = () => {
  return (
    <input
      type="file"
      multiple={true}
      id="fileUpload"
      style={{
        // display: "none",
        width: "40%",
        height: "300px",
        backgroundColor: "#d9d9d9",
      }}
    />
  );
};

export default Upload;
