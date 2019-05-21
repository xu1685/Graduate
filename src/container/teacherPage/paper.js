
import React from 'react'
import { Radio, Button, Card, Col, Row } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CreatePaperForm from '../../component/modal/createPaperModal'
import { getPaperDetail, getPaperList,deletePaper } from '../../redux/teacher.redux'

@connect(
    state => state.teacher,
    { getPaperDetail, getPaperList, deletePaper}
)
class Paper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.gotoDetail = this.gotoDetail.bind(this)
        this.deletePaper = this.deletePaper.bind(this)
    }

    componentWillMount() {
        // console.log('componentWillMount')
        if (this.props.paperList.length == 0) {
            console.log('paperlist=[]')
            this.props.getPaperList()
        }
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    gotoDetail(paperId) {
        this.props.getPaperDetail(paperId)
    }
    deletePaper(paperId){
        this.props.deletePaper(paperId)
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        console.log('props', this.props)

        let paperList = this.props.paperList
        for(let i=0;i<paperList.length;i++){
            if(typeof paperList[i].questionIdarr != 'string'){
                paperList[i].questionIdarr = ''
            }
            paperList[i].queLength = paperList[i].questionIdarr.length
            let date = new Date(paperList[i].createtime)
            let Str=date.getFullYear() + '-' + 
            ((date.getMonth() + 1).toString().length==1?'0'+(date.getMonth()+1):date.getMonth()+1) + '-' + 
            (date.getDate().toString().length==1?'0'+date.getDate():date.getDate() ) + ' ' + 
            (date.getHours().toString().length==1?'0'+date.getHours():date.getHours() )+ ':' + 
            (date.getMinutes().toString().length==1?'0'+date.getMinutes():date.getMinutes())+ ':' + 
            (date.getSeconds().toString().length==1?'0'+date.getSeconds():date.getSeconds()); 
            paperList[i].time = Str
        }

        return (
            <div style={ { margin: 20 } }>
                { redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
                {/* 新建 */ }
                <CreatePaperForm></CreatePaperForm>
                {/* card列表 */ }
                <Row gutter={ 16 }>
                    { (paperList) ?
                        (paperList.map((v, index) => (
                            v ?
                                (<Col span={ 6 } key={ v.paperId }>
                                    <Card
                                        style={ { height: 165, marginTop: 20, minWidth: 130 } }
                                        size="small"
                                        title={ index }
                                        // extra={ <Button onClick={ () => this.gotoDetail(v.paperId) }>查看</Button> }
                                        extra={
                                            <Radio.Group size="small">
                                                <Radio.Button onClick={ () => this.gotoDetail(v.paperId)}>查看</Radio.Button>
                                                <Radio.Button onClick={ () => this.deletePaper(v.paperId)}>删除</Radio.Button>
                                            </Radio.Group> }
                                    >
                                        <h3 style={{textAlign:'center',
                                        marginTop:'10px',
                                        fontWeight:'bold',
                                        color:'rgba(23, 23, 23, 0.85)'}}>{ v.paperName }</h3>
                                        <p style={{marginTop:'20px'}}>共有{v.queLength}道题目</p>
                                        <p style={{marginTop:'-10px'}}>{v.time}</p>
                                    </Card>
                                </Col>) : null)
                        )
                        ) : null
                    }
                </Row>
            </div>
        )
    }
}



export default Paper