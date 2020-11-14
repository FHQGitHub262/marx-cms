import React, { useState } from "react";
import { Upload, Button, Icon, message } from "antd";
import { UPLOAD } from "../../../lib/fetch";

export default (props) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [value, setValue] = useState("");

  const onChange = (value) => {
    props.onChange(props.name, value);
    setValue(value);
  };

  const uploadConfig = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      file.status = "uploading";
      formData.append("recfile", file);
    });

    setUploading(true);

    const { data, success } = await UPLOAD("/upload", formData);

    if (success) {
      message.info("上传成功");
      onChange(data);
      setUploaded(true);
    } else {
      message.info("上传失败");
    }

    setUploading(false);
  };

  const handleCancel = () => {
    setUploaded(false);
    onChange("");
    setFileList([]);
  };

  return uploaded ? (
    <div>
      <p>已上传：{value}</p>
      <Button ghost type="primary" onClick={handleCancel}>
        撤销
      </Button>
    </div>
  ) : (
    <div>
      <Upload {...uploadConfig}>
        <Button>
          <Icon type="upload" /> 选择文件
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "上传中" : "提交文件"}
      </Button>
    </div>
  );
};
