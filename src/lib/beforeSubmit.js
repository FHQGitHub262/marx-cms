import { notification } from "antd";
export default ({ data, valid }) => {
  try {
    if (valid.length > 0) {
      notification.error({
        message: `请检查表单填写情况`,
        duration: 2
      });
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};
