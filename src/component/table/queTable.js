import React from 'react'
import { connect } from 'react-redux'
import { Table, Button, Modal } from 'antd';
import { updatePaper, createQue, deleteQue, deletePaperQue,openModal, } from '../../redux/teacher.redux'
import CreateQueForm from '../modal/createQueModal'

@connect(
    state => state.teacher,
    { updatePaper, createQue, deleteQue, deletePaperQue,openModal, }
)

class QueTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resData: {},
            selectedRowKeys: [],
            loading: false
        }
        this.columns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: '题目内容', dataIndex: 'content', key: 'content' },
            { title: '题目答案', dataIndex: 'answer', key: 'answer' },
            { title: 'tags', dataIndex: 'tags', key: 'tags' },
            { title: 'CreatorId', dataIndex: 'creatorId', key: 'creatorId' },
            { title: 'Action', key: 'operation', render: (record) => <Button onClick={()=> this.edit(record) }>编辑</Button> }
        ];
        this.expandedRowRender = this.expandedRowRender.bind(this)
        this.delete = this.delete.bind(this)
        // this.edit = this.edit.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ resData: nextProps.queList.listData })
    }
    componentWillMount() {
        // console.log('wiimount')
        this.setState({ resData: this.props.queList.listData })

    }
    expandedRowRender = (record, index) => {
        // console.log(record, index,'expandedRowRender')
        const columns = [
            { title: 'option', dataIndex: 'option', width: '10%', key: 'option' },
            { title: 'content', dataIndex: 'content', key: 'content' },
        ];
        let options = record.options
        let abcd = ['A', 'B', 'C', 'D']
        const data = [];
        for (let i = 0; i < 4; ++i) {
            if (options[i] != null) {
                data.push({
                    key: i,
                    option: abcd[i],
                    content: options[i]
                });
            }
        }
        return (
            <Table
                columns={ columns }
                dataSource={ data }
                pagination={ false }
            />
        );
    };

    onSelectChange = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    edit = (record) => {
        // console.log('edit',record)
        let postData = {
            queId:record.id,
            content:record.content,
            tags:record.tags,
            answer:record.answer,
            authorId:record.creatorId,
            optionA:record.options[0],
            optionB:record.options[1],
            optionC:record.options[2],
            optionD:record.options[3],
            paperId:this.props.nowPaperId,
            isAllQue: this.props.isAllQue,
            questionIdarr: this.props.queList.questionIdarr
        }
        this.props.openModal(true,postData)
    }

    add = () => {
        this.setState({ loading: true });
        let { selectedRowKeys } = this.state
        let addArr = ''
        for (let i = 0; i < selectedRowKeys.length; i++) {
            addArr = addArr + selectedRowKeys[i] + ','
        }
        let postData = {
            paperId: this.props.nowPaperId,
            questionIdarr: addArr
        }
        this.props.updatePaper(postData)
        this.setState({ loading: false })
    }

    queOut = () => {
        this.setState({ loading: true });
        let { selectedRowKeys } = this.state
        let questionIdarr = this.props.queList.questionIdarr.split(',').filter(function (x) {
            return x != ''
        })
        selectedRowKeys = selectedRowKeys.map((val) => {
            return val.toString()
        })
        for (let i = 0; i < selectedRowKeys.length; i++) {
            let delIndex = questionIdarr.indexOf(selectedRowKeys[i])
            if (delIndex !== -1) {
                questionIdarr.splice(delIndex, 1)
            }
        }
        questionIdarr = questionIdarr.join(',') + ','
        // console.log(questionIdarr, 'questionIdarr')

        let postData = {
            paperId: this.props.nowPaperId,
            questionIdarr: questionIdarr
        }
        this.props.deletePaperQue(postData)
        this.setState({ loading: false })
    }

    deleteConfirm = () => {
        this.setState({ visible: true });
    }

    delete = () => {
        this.setState({ loading: true, visible: false });
        let { selectedRowKeys } = this.state
        let tableData = this.props.queList.listData
        let deleteArr = ''
        for (let i = 0; i < tableData.length; i++) {
            if (selectedRowKeys.indexOf(tableData[i].queId) !== -1) {
                deleteArr = deleteArr + tableData[i].queId + ','
            }
        }
        let postData = {
            // paperId: this.props.nowPaperId,
            deleteArr: deleteArr
        }
        // console.log('postData',postData)
        this.props.deleteQue(postData)
        this.setState({ loading: false })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
  
    render() {
        // console.log(this.props,'quetable')
        let resData = this.state.resData
        // console.log(resData, 'resdata')
        const data = [];
        const { selectedRowKeys, loading } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        if (resData) {
            for (let i = 0; i < resData.length; ++i) {
                data.push({
                    key: resData[i].queId,
                    id: resData[i].queId,
                    content: resData[i].content,
                    answer: resData[i].answer,
                    tags: resData[i].tags,
                    creatorId: resData[i].authorId,
                    options: [
                        resData[i].optionA,
                        resData[i].optionB,
                        resData[i].optionC,
                        resData[i].optionD,
                    ],
                });
            }
        }
        console.log(data, '处理后的表格data')

        return (
            <div>
                { this.props.isAllQue == true ? (
                    <span>
                        { this.props.nowPaperId !== -1 ? (<Button
                            style={ { float: 'left', zIndex: '1',margin:'10px' } }
                            onClick={ this.add }
                            disabled={ !hasSelected }
                            loading={ loading }
                        >
                            添加到试卷
                        </Button>) : null }
                        
                        <Button
                            style={ { float: 'left', zIndex: '1',margin:'10px' } }
                            onClick={ this.deleteConfirm }
                            disabled={ !hasSelected }
                        >删除所选</Button>
                        <CreateQueForm></CreateQueForm>
                    </span>
                ) : null }

                { this.props.isAllQue == false ? (
                    <Button
                        style={ { float: 'left', zIndex: '1' ,margin:'10px'} }
                        onClick={ this.queOut }
                        disabled={ !hasSelected }>删除所选</Button>
                ) : null }
                <Modal
                    title="Basic Modal"
                    visible={ this.state.visible }
                    onOk={ this.delete }
                    onCancel={ this.handleCancel }
                >
                    <p>所选题目将会从数据库中永久删除！请勿随意删除</p>
                </Modal>
                <Table
                    className="components-table-demo-nested"
                    columns={ this.columns }
                    rowSelection={ rowSelection }
                    dataSource={ data }
                    expandedRowRender={ this.expandedRowRender }
                />
            </div>

        );
    }


}


export default QueTable