import {
    Modal, Divider, Card, Select, Button, List, InputNumber
} from 'antd';
import React from 'react'
import { connect } from 'react-redux'
import { showIntelligentModal,createQue, updatePaper, getAllTags, getAllQue } from '../../redux/teacher.redux'

@connect(
    state => state.teacher,
    { showIntelligentModal, createQue, updatePaper, getAllTags, getAllQue }
)

class IntelligentModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            loading: true,
            data: [{ queList: [], num: 1, id: 0 }],
        }
        this.handleGetTags = this.handleGetTags.bind(this)
        this.addCard = this.addCard.bind(this)
        this.delCard = this.delCard.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loadQue) {
            let data = this.state.data
            let id = this.state.waitId
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    data[i].queList = nextProps.queList.listData
                    break
                }
            }
            console.log('data', data)

            this.setState({
                data: data,
                waitId: -1
            })
        }
    }
    handleOk = () => {
        // console.log(this.state.formData, 'formdata');
        this.props.showIntelligentModal(false)
        let paperData = []
        let data = this.state.data
        for (let i = 0; i < data.length; i++) {
            let selectData = this.getSomeQue(data[i].queList, data[i].num,paperData)
            paperData = paperData.concat(selectData)
        }
        console.log(paperData, 'paperData')
        paperData = paperData.join(',')+','
        let postData = {
            paperId: this.props.nowPaperId,
            questionIdarr: paperData
        }
        this.props.updatePaper(postData)
    }
    getSomeQue(arr, num,paperData) {
        let result = []
        while (num-- && arr.length) {
            let index = Math.floor(arr.length * Math.random())
            if(paperData.indexOf(arr[index].queId)==-1){
                result.push(arr[index].queId)
            }else{
                num++
            }
            arr.splice(index, 1)
        }
        return result
    }
    
    handleCancel = (e) => {
        this.props.showIntelligentModal(false)
        this.setState({ formData: this.props.postdata })
    }

    handleChange(value, id) {
        console.log(`selected ${value}`, id);
        this.props.getAllQue({ keyword: value, paperId: this.props.nowPaperId }, 'intelligent')
        this.setState({ waitId: id })
    }

    handleGetTags() {
        this.props.getAllTags()
    }

    onChange(value, item) {
        console.log('num changed', value);

        let data = this.state.data
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == item.id) {
                data[i].num = value
                break
            }
        }
        console.log('data', data)

        this.setState({
            data: data
        })
    }
    addCard() {
        let data = this.state.data
        let id = Date.now()
        data.push({ queList: [], num: 1, id: id })
        this.setState({ data: data })
    }
    delCard(id) {
        console.log(id, 'id')
        let data = this.state.data
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data.splice(i, 1)
                break
            }
        }
        console.log('data', data)

        this.setState({
            data: data
        })
    }

    render() {
        let { data } = this.state;
        const Option = Select.Option;
        let children = [];
        let allTags = this.props.allTags
        for (let i = 0; i < allTags.length; i++) {
            children.push(<Option key={ allTags[i].tagName }>{ allTags[i].tagName }({ allTags[i].relatedCount }个)</Option>);
        }
        return (
            <div>
                <Modal
                    title="组卷条件"
                    visible={ this.props.showPaperModal }
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    footer={ [
                        <Button key="back" onClick={ this.handleCancel }>取消组卷</Button>,
                        <Button key="submit" type="primary" onClick={ this.handleOk }>
                            智能组卷
                        </Button>
                    ] }
                >
                    <List
                        bordered
                        dataSource={ data }
                        renderItem={ item => (
                            <List.Item>
                                <div>
                                    <Select
                                        mode="multiple"
                                        style={ { width: '100%' } }
                                        placeholder="选择题目标签"
                                        onChange={ (value) => this.handleChange(value, item.id) }
                                        onFocus={ this.handleGetTags }
                                    >
                                        { children }
                                    </Select>
                                    <span>该类题目数量：</span>
                                    <InputNumber  style={{marginTop:'10px'}} min={ 1 } max={ item.queList.length ? item.queList.length : 5 } defaultValue={ item.num }
                                        onChange={ (value) => this.onChange(value, item) } />

                                    <Button style={{marginLeft:'15px',marginTop:'10px'}} onClick={ () => this.delCard(item.id) }>删除本条</Button>
                                </div>
                            </List.Item>
                        ) }
                    />
                    <Button style={{marginTop:'10px'}} onClick={ this.addCard }>增加题目类型</Button>


                </Modal>
            </div >
        );
    }
}

export default IntelligentModal