import React, { useState, useEffect } from "react";
import UserInfo from "../components/UserInfo";
import Pop from "../components/Pop";
import { PaperCreator } from "../components/Form";
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

export default (props, context) => {
  console.log(props);
  const [userInfo, setUserInfo] = useState(props.history.location.query || {});
  useEffect(() => {
    window.addEventListener("userInfo", e => {
      console.log("userInfo");
      setUserInfo(e.detail);
    });
  }, []);

  return (
    <div style={styles.home}>
      <div></div>
      <div style={styles.main}>
        <UserInfo {...(userInfo || {})} />
        <Pop>
          <PaperCreator />
        </Pop>
      </div>
    </div>
  );
};
