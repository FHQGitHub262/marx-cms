import React, { useContext } from "react";
import Context from "../context";
import UserInfo from "../components/UserInfo";
// import { StudentImporter } from "../components/Form";
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
  const context = useContext(Context);
  return (
    <div style={styles.home}>
      <div style={styles.main}>
        {/* <StudentImporter /> */}
        <UserInfo {...(context.userInfo || {})} />
      </div>
    </div>
  );
};
