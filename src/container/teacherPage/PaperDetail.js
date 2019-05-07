
import React from 'react'
import { Input, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getPaperDetail, getAllQue } from '../../redux/teacher.redux'
import EditModal from '../../component/modal/editModal'
import QueTable from '../../component/table/queTable';
import SelectClass from '../../component/modal/selectClass';

@connect(
    state => state.teacher,
    { getPaperDetail, getAllQue }
)
class PaperDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
        this.handleAddQue = this.handleAddQue.bind(this)
    }
    componentWillMount() {
        let url = this.props.location.pathname
        let id = url.split('=')[1]
        this.setState({
            paperId: id
        })
        if (this.props.refreshPaperDetail) {
            this.props.getPaperDetail(id)
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    handleAddQue() {
        this.props.getAllQue({ paperId: this.state.paperId })
    }
 

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        // console.log(this.props,'paperdetail')
        return (
            <div style={ { margin: 20 } }>
                { redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
                <Button onClick={ this.handleAddQue } style={ { float: 'left', zIndex: '1' ,margin:'10px'} }>添加题目</Button>
                <SelectClass></SelectClass>
                <QueTable id={ this.state.paperId }></QueTable>
                <EditModal></EditModal>
            </div>
        )
    }
}

export default PaperDetail