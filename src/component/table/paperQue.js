import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
    Table, Badge, Menu, Dropdown, Icon,
} from 'antd';
import {getPaperDetail} from '../../redux/teacher.redux'

@connect(
    state => state.teacher,
    {getPaperDetail}
)

class NestedTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            resData: {}
        }
        this.columns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: '题目内容', dataIndex: 'content', key: 'content' },
            { title: '题目答案', dataIndex: 'answer', key: 'answer' },
            { title: 'tags', dataIndex: 'tags', key: 'tags' },
            { title: 'CreatorId', dataIndex: 'creatorId', key: 'creatorId' },
            { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
            { title: 'Action', key: 'operation', render: () => <a href="javascript:;">Publish</a> },
        ];
        this.expandedRowRender = this.expandedRowRender.bind(this)
    }
  
    componentWillMount(){
        console.log('componentWillUpdate')
        this.props.getPaperDetail(this.props.id)
    }
  
    expandedRowRender = (record, index) => {
        console.log(record, index,'expandedRowRender')
        const columns = [
            { title: 'option', dataIndex: 'option',width: '10%', key: 'option' },
            { title: 'content', dataIndex: 'content', key: 'content' },
        ];
        let options = record.options
        let abcd = ['A','B','C','D']
        const data = [];
        for (let i = 0; i < 4; ++i) {
            if(options[i] != null){
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

    render() {
        const resData = this.props.resData.listData
        console.log(resData,'resdata')
        const data = [];
        if(resData){
            for (let i = 0; i < resData.length; ++i) {
                data.push({
                    key: i,
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
                    ]
                });
            }
        }
        console.log(data,'data')
        
        return (
            <Table
                className="components-table-demo-nested"
                columns={ this.columns }
                expandedRowRender={ this.expandedRowRender }
                dataSource={ data }
            />
        );
    }


}


export default NestedTable