
import React from 'react'
import { getClassName, createClass, getTestList } from '../../redux/teacher.redux'
import { connect } from 'react-redux'
import { Upload, Icon, message, Modal, Divider, Button } from 'antd';
import * as XLSX from 'xlsx';

@connect(
    state => state.teacher,
    { getClassName, createClass, getTestList }
)


class UploadClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            postdata: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.uploadFilesChange = this.uploadFilesChange.bind(this)
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({ visible: false });
        let postdata = {
            excelData:this.state.fileData
        }
        console.log('ok',postdata)
        this.props.createClass(postdata)
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleChange(key) {
        // console.log(`selected ${key}`);
        this.setState({ classKey: key })
    }
    handleGetClass() {
        this.props.getClassName()
    }
    uploadFilesChange(file) {
        // 通过FileReader对象读取文件
        const fileReader = new FileReader();
        fileReader.onload = event => {
          try {
            const { result } = event.target;
            // 以二进制流方式读取得到整份excel表格对象
            const workbook = XLSX.read(result, { type: 'binary' });
            // 存储获取到的数据
            let data = {};
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            for (const sheet in workbook.Sheets) {
              let tempData = [];
              // esline-disable-next-line
              if (workbook.Sheets.hasOwnProperty(sheet)) {
                // 利用 sheet_to_json 方法将 excel 转成 json 数据
                data[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
              }
            }
            //上传成功啦,data为上传后的数据
            console.log(data);
            this.setState({fileData:data})
            // 最终获取到并且格式化后的 json 数据
            message.success('上传成功！')
          } catch (e) {
            // 这里可以抛出文件类型错误不正确的相关提示
            message.error('文件类型不正确！');
          }
        }
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(file.file);
    }

    render() {
        const { visible, loading } = this.state;
        const Dragger = Upload.Dragger;

      
        return (
            <div>
                <Button
                    // style={ { float: 'left', zIndex: '1', margin: '10px' } }
                    onClick={ this.showModal }
                >新增课堂</Button>
                <Modal
                    visible={ visible }
                    title="Title"
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    footer={ [
                        <Button key="back" onClick={ this.handleCancel }>Return</Button>,
                        <Button key="submit" type="primary" loading={ loading } onClick={ this.handleOk }>
                            Submit
                         </Button>,
                    ] }
                >
                    <Dragger
                        accept='.xlsx, .xls'
                        beforeUpload={ function () { return false; } }
                        onChange={ this.uploadFilesChange }
                        showUploadList={ false }>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或者拖拽班级excle表上传</p>
                    </Dragger>
                </Modal>
            </div>
        );
    }
}

export default UploadClass
