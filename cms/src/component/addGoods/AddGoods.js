import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;


class AddGoods extends Component {
  render() {

    return (
      <form>
        <p>商品描述: <input type="text" name="fname" /></p>
        <input type="file" id="photo" />
        <input type="submit" value="Submit" />
    </form>
    );
  }
}

export default AddGoods