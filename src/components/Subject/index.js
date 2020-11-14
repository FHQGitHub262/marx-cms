import { Select } from "antd";
import React from "react";
import { GET } from "../../lib/fetch";

const { Option } = Select;

export default class Subject extends React.Component {
  state = {
    value: "",
    raw: [],
  };
  constructor(props) {
    super(props);

    GET("/educational/subjects", { id: 1 }).then((res) => {
      // console.log(res);
      if (res.data instanceof Array && res.data.length > 0) {
        this.props.onChange(res.data[0]);
      }
      this.setState({
        value: (res.data || []).length > 0 ? res.data[0].id : "",
        raw: res.data || [],
      });
    });
  }

  handleChange = (e) => {
    this.setState({ value: e });
    let item = this.state.raw.find((item) => item.id === e);
    console.log(item);
    this.props.onChange(item);
  };

  render() {
    return (
      <div>
        {this.props.tips && (
          <span className="marx-content">{this.props.tips}</span>
        )}
        <Select
          showSearch
          value={this.state.value}
          style={{ width: 200 }}
          placeholder={this.props.placeholder || "选择查看的课程"}
          optionFilterProp="children"
          onChange={this.handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.state.raw.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}
