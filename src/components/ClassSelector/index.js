import { Select } from "antd";
import React from "react";
import { GET } from "../../lib/fetch";

const { Option } = Select;

export default class ClassSelector extends React.Component {
  state = {
    colleges: [],
    majors: [],
    classes: [],
    checkedCollege: undefined,
    checkedMajor: undefined,
    value: undefined,
    raw: [],
  };
  constructor(props) {
    super(props);
    this.init()
  }

  init = () => {
    (this.props.onChange || (() => { }))({});
    GET("/school/colleges").then((res) => {
      // console.log(res);
      this.setState({
        colleges: res.data || [],
        majors: [],
        classes: [],
        checkedCollege: undefined,
        checkedMajor: undefined,
        value: undefined,
        raw: [],
      });
    });
  }

  changeCollege = (e) => {
    this.setState({
      checkedCollege: e,
    });
    (this.props.onChange || (() => { }))({
      college: e,
    });
    GET("/school/majors", { id: e }).then((res) => {
      this.setState({
        majors: res.data || [],
      });
    });
  };

  changeMajor = (e) => {
    this.setState({
      checkedMajor: e,
    });
    (this.props.onChange || (() => { }))({
      college: this.state.checkedCollege,
      major: e,
    });
    GET("/school/classes", { id: e }).then((res) => {
      this.setState({
        classes: res.data || [],
      });
    });
  };

  changeClass = (e) => {
    this.setState({
      value: e,
    });
    (this.props.onChange || (() => { }))({
      college: this.state.checkedCollege,
      major: this.state.checkedMajor,
      class: e,
    });
  };

  render() {
    return (
      <div
        style={{
          marginBottom: 24,
        }}
      >
        {this.props.tips && <span class="marx-content">{this.props.tips}</span>}
        <Select
          showSearch
          value={this.state.checkedCollege}
          style={{ width: 180, marginRight: 24 }}
          placeholder="选择查看的学院"
          optionFilterProp="children"
          onChange={this.changeCollege}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.state.colleges.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>

        <Select
          showSearch
          value={this.state.checkedMajor}
          style={{ width: 180, marginRight: 24 }}
          placeholder="选择要查看的专业"
          optionFilterProp="children"
          onChange={this.changeMajor}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.state.majors.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>

        <Select
          showSearch
          value={this.state.value}
          style={{ width: 180, marginRight: 24 }}
          placeholder={"选择查看的班级"}
          optionFilterProp="children"
          onChange={this.changeClass}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.state.classes.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}
