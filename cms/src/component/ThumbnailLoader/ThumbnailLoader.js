import React, { Component } from 'react';
import { Upload } from 'antd';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class ThumbnailLoader extends Component {

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
    }

    render() {
    
        return (
            <Upload 
                onChange={this.handleChange}>
            <Button>
                <Icon type="upload" /> Click to Upload
            </Button>
            </Upload>
        );
    }
}

export default ThumbnailLoader