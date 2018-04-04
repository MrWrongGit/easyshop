import React, { Component } from 'react';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

class Home extends Component {
  render() {
    let content = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        slideIndex: 0,
    }
    return (
        <Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
        >
          {content.data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: 176 }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
              />
            </a>
          ))}
        </Carousel>
    )
  }
}

export default Home;
