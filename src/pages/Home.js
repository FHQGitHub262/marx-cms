import React from "react";
import UserInfo from "../components/UserInfo";

const styles = {
  home: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%"
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default props => {
  return (
    <div style={styles.home}>
      <div></div>
      <div style={styles.main}>
        <UserInfo></UserInfo>
      </div>
    </div>
  );
};
