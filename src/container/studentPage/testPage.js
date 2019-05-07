
import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getTestPage,postAnswer } from '../../redux/student.redux'
import { Pagination, Card, List,Button } from 'antd';

@connect(
    state => state.student,
    { getTestPage,postAnswer }
)
class TestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            current: 1,
            pageSize: ['1', '20'],
            answerArr:[]
        }
        this.onChange = this.onChange.bind(this)
        this.handleSelct = this.handleSelct.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChange = (page) => {
        // console.log(page);
        this.setState({
            current: page,
        });
    }
    componentWillMount() {
        let url = this.props.location.pathname
        let id = url.split('=')[1]
        this.setState({
            testId: id
        })
        this.props.getTestPage({
            testId: id
        })
    }
    
    handleSelct(answer){
        // console.log(answer,'answer')
        let arr = this.state.answerArr
        let index = this.state.current - 1
        arr[index] = answer.toLowerCase()
        console.log(arr,'arr')
        // if(index+1 < this.props.testData.queData.length){
            this.setState({answerArr:arr,current:index+2})
        // }
    }
    handleSubmit(){
        let arr = this.state.answerArr
        let queData = this.props.testData.queData
        let empty = []
        for(let i=0;i<queData.length;i++){
            if(!arr[i]){
                empty.push(i+1)
            }
        }
        if(!empty.length && arr.length == queData.length){
            let postData = {
                stuId:this.props.testData.stuId,
                testId:this.props.testData.testId,
                paperId:this.props.testData.paperId,
                content:arr.join(',')
            }
            this.props.postAnswer(postData)
            console.log('no empty')
        }else{
            let str = empty.join(',')
            alert('第'+str+'题尚未选择答案，请选择答案')
        }
    }
    render() {
        // console.log('testpage', this.props)
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        let queData = this.props.testData.queData ? this.props.testData.queData : []
        let options = []
        for (let i = 0; i < queData.length; i++) {
            let arr = []
            if (queData[i]) {
                arr[0] = {
                    content: queData[i].optionA,
                    title: 'A'
                }
                arr[1] = {
                    content: queData[i].optionB,
                    title: 'B'
                }
                arr[2] = {
                    content: queData[i].optionC,
                    title: 'C'
                }
                arr[3] = {
                    content: queData[i].optionD,
                    title: 'D'
                }
            }
            options.push(arr)
        }
        // console.log(options, 'options')
        let currentQue = this.state.current
        return (
            <div style={ { margin: 20 } }>
                { redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
                <h2>testdetailPage</h2>
                <Button onClick={this.handleSubmit}>提交</Button>
                { queData[currentQue - 1] ? (
                    <div style={ { background: '#ECECEC', padding: '30px' } }>
                        <Card title={ '第' + currentQue + '题' } bordered={ false } >
                            <p>{ queData[currentQue - 1].content }</p>
                        </Card>
                        <List
                            style={ { marginTop: '10px' } }
                            itemLayout="horizontal"
                            dataSource={ options[currentQue-1] }
                            renderItem={ item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={ item.title +'.'+item.content }
                                        onClick={()=>this.handleSelct(item.title)}
                                        style={{cursor:'pointer',background:'rgba(216, 216, 216, 0.85)',padding: '10px',borderRadius:'3px'}}
                                    />
                                </List.Item>
                            ) }
                        />
                    </div>
                ) : null }
                <Pagination
                    // pageSizeOptions={ this.state.pageSize }
                    defaultPageSize={ 1 }
                    current={ this.state.current }
                    onChange={ this.onChange }
                    total={ queData.length } />

            </div>

        )
    }
}

export default TestPage