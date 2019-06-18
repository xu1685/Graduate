
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getClassList,getClassDetail } from '../../redux/teacher.redux'
import { Radio, Button, Card, Col, Row } from 'antd'
import UploadClass from '../../component/modal/uploadModal'

@connect(
	state=>state.teacher,
	{getClassList,getClassDetail}
)
class Class extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			title:''
		}
	
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
    }
	render(){
        // console.log(this.props,'props')
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		return (
			<div style={ { margin: 20 } }>
				{redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
                <UploadClass></UploadClass>
                <Row gutter={ 16 }>
                    { (this.props.classList) ?
                        (this.props.classList.map((v, index) => (
                            v ?
                                (<Col span={ 6 } key={ v.classId }>
                                    <Card
                                        style={ { height: 165, marginTop: 20, minWidth: 130 } }
                                        size="small"
                                        title={ index }
                                        extra={
                                            <Radio.Group size="small">
                                                <Radio.Button onClick={ () => this.props.getClassDetail({classId:v.classId})}>查看</Radio.Button>
                                                {/* <Radio.Button onClick={ () => this.deletePaper(v.paperId)}>删除</Radio.Button> */}
                                            </Radio.Group> }
                                    >
                                        <h4 style={{textAlign:'center',
                                        marginTop:'20px',
                                        fontWeight:'bold',
                                        color:'rgba(23, 23, 23, 0.85)'}}>{ v.className }</h4>
                                        
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

export default Class