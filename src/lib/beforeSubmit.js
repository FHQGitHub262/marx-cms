import { notification } from "antd";
export default ({ data, valid }) => {
  if (valid.length > 0) {
    notification.error({
      message: `请检查表单填写情况`,
      duration: 2
    });
    return false;
  } else {
    return true;
  }
};
