import {
    Modal, Divider, Icon, Input, Button, List
} from 'antd';
import React from 'react'
import { connect } from 'react-redux'
import { openModal, updateQue, createQue, updatePaper } from '../../redux/teacher.redux'

@connect(
    state => state.teacher,
    { openModal, updateQue, createQue, updatePaper }
)

class EditModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            new:false,
            formData: {
                queId: '',
                content: '',
                tags: '',
                answer: '',
                authorId: '',
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                paperId: this.props.nowPaperId,
                isAllQue: this.props.isAllQue,
                questionIdarr: this.props.queList.questionIdarr
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextprops',nextProps)
        if (nextProps.postdata.content) {
            this.setState({ formData: nextProps.postdata })
        }
        if (this.state.new == true) {
            if (!nextProps.isAllQue && nextProps.queList.queId) {
                let newQueId = nextProps.queList.queId
                let nowQueId = this.state.formData.queId
                let addArr = nextProps.queList.questionIdarr
                addArr = addArr.split(',').filter((val) => {
                    return val != `'${nowQueId}'`
                })
                addArr = addArr.join(',') + ',' + `${newQueId}` + ','

                let updateData = {
                    paperId: nextProps.nowPaperId,
                    questionIdarr: addArr
                }
                nextProps.updatePaper(updateData)
                this.setState({new:false})
            }
        }

    }
    handleOk = () => {
        // console.log(this.state.formData, 'formdata');
        this.props.openModal(false)
        this.props.updateQue(this.state.formData)
    }
    handleNew = () => {
        this.props.openModal(false)
        // console.log(this.state.formData,'formdata')
        this.props.createQue(this.state.formData)
        this.setState({new:true})
    }

    handleCancel = (e) => {
        this.props.openModal(false)
        this.setState({ formData: this.props.postdata })
    }

    handleChange(key, val) {
        this.setState({
            formData: {
                ...this.state.formData,
                [key]: val
            }
        })
    }


    render() {
        let { loading, formData } = this.state;

        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={ this.props.showModal }
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    footer={ [
                        <Button key="back" onClick={ this.handleCancel }>取消更改</Button>,
                        <Button key="submit" type="primary" loading={ loading } onClick={ this.handleOk }>
                            保存更改
                        </Button>,
                        <Button key="submit2" type="primary" loading={ loading } onClick={ this.handleNew }>
                            保存为新题目
                        </Button>
                    ] }
                >
                    <List>
                        <Input
                            prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                            placeholder="题目内容"
                            onChange={ e => this.handleChange('content', e.target.value) }
                            value={ formData.content } />
                        <Divider></Divider>
                        <Input
                            style={ { marginBottom: 10 } }
                            prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                            placeholder="optionA"
                            onChange={ e => this.handleChange('optionA', e.target.value) }
                            value={ formData.optionA }
                        />
                        <Input
                            style={ { marginBottom: 10 } }
                            prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                            value={ formData.optionB }
                            placeholder="optionB"
                            onChange={ e => this.handleChange('optionB', e.target.value) }
                        />
                        <Input
                            style={ { marginBottom: 10 } }
                            prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                            value={ formData.optionC }
                            placeholder="optionC"
                            onChange={ e => this.handleChange('optionC', e.target.value) }
                        />
                        <Input
                            prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                            value={ formData.optionD }
                            placeholder="optionD"
                            onChange={ e => this.handleChange('optionD', e.target.value) }
                        />
                        <Divider></Divider>
                        <Input
                            style={ { marginBottom: 10 } }
                            prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                            value={ formData.answer }
                            placeholder="答案"
                            onChange={ e => this.handleChange('answer', e.target.value) }
                        />
                        <Input
                            prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
                            value={ formData.tags }
                            placeholder="标签"
                            onChange={ e => this.handleChange('tags', e.target.value) }
                        />
                        <Divider></Divider>
                    </List>
                </Modal>
            </div >
        );
    }
}

export default EditModal