import React, { Component } from 'react';
import { Form, Input, Button, InputNumber, Upload, Icon } from 'antd';
import ThumbnailLoader from '../ThumbnailLoader/ThumbnailLoader'

const FormItem = Form.Item;
const { TextArea } = Input;

class AddGoods extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

/*
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
*/
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
        md: { span: 4 },
        lg: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 18 },
        lg: { span: 12 },
      },
    };

    const buttonItemLayout = {
      wrapperCol: {
        xs: { offset: 0 },
        sm: { offset: 3 },
        md: { offset: 4 },
        lg: { offset: 6 },
      }
    };

    return (
      <div>
        <ThumbnailLoader />

        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="描述">
            <TextArea placeholder="添加描述" autosize={{ minRows: 2, maxRows: 6 }} />
          </FormItem>
          <FormItem {...formItemLayout} label="价格">
            <InputNumber min={0} step={10} />
          </FormItem>
          <FormItem {...formItemLayout} label="标签">
            <Input placeholder="输入标签" />
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">确认</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default AddGoods = Form.create()(AddGoods)