
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
        return (
            <div style={ { margin: 20 } }>
                { redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
                <h2>PAPER PAGE</h2>
                {/* 新建 */ }
                <CreatePaperForm></CreatePaperForm>
                {/* card列表 */ }
                <Row gutter={ 16 }>
                    { (this.props.paperList) ?
                        (this.props.paperList.map((v, index) => (
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
                                        <h4>《{ v.paperName }》</h4>
                                        <p>试卷描述</p>
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