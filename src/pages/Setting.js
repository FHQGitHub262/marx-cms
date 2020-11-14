import React from "react";
import Header from "../components/Header";
import FontSize from "../components/FontSize";
export default (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "white",
      }}
    >
      <div style={{ width: "100%" }}>
        <Header title="设置" />
      </div>
      <div style={{ flex: 1, width: "80%" }}>
        <FontSize />
      </div>
    </div>
  );
};
