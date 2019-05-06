
import React from 'react'
import { getClassName, dispatchTest,getTestList } from '../../redux/teacher.redux'
import { Modal, Divider, Icon, Input, Button, List } from 'antd';
import { connect } from 'react-redux'
import { Select } from 'antd';

@connect(
    state => state.teacher,
    { getClassName, dispatchTest,getTestList }
)


class SelectClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            postdata: {}
        }
        this.handleDispatch = this.handleDispatch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleGetClass =  this.handleGetClass.bind(this)
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleDispatch(classId) {
        let date = Date()
        let postData = {
            paperId: this.props.nowPaperId,
            classId: classId,
            testName: '测试' + date
        }
        this.props.dispatchTest(postData)
    }
    handleOk = () => {
        let key = this.state.classKey;
        key += ""
        let idArr = key.split(',');
        for(let i=0;i<idArr.length;i++){
            this.handleDispatch(idArr[i])
        }
        this.setState({ visible: false });
        setTimeout(() => {
            this.props.getTestList()
        }, 2000);
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleChange(key) {
        // console.log(`selected ${key}`);
        this.setState({classKey:key})
    }
    handleGetClass() {
        this.props.getClassName()
    }


    render() {
        const { visible, loading } = this.state;
        const Option = Select.Option;
        let children = [];
        let classList = this.props.classList
        // console.log(classList,'classList')
        for (let i = 0; i < classList.length; i++) {
            children.push(<Option key={ classList[i].classId }>{ classList[i].className }</Option>);
        }
        return (
            <div>
                {/* <Button type="primary" onClick={ this.showModal }>
          新增试卷
        </Button> */}
                <Button
                    style={ { float: 'left', zIndex: '1' } }
                    onClick={ this.showModal }
                >派发</Button>
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
                    <Select
                        mode="multiple"
                        style={ { width: '100%' } }
                        placeholder="Tags Mode"
                        onChange={ this.handleChange }
                        onFocus={ this.handleGetClass }
                    >
                        { children }
                    </Select>
                </Modal>
            </div>
        );
    }
}

export default SelectClass
