
import React from 'react'
import { Input, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getPaperDetail, getAllQue, showIntelligentModal } from '../../redux/teacher.redux'
import EditModal from '../../component/modal/editModal'
import IntelligentModal from '../../component/modal/intelligentModal'
import QueTable from '../../component/table/queTable';
import SelectClass from '../../component/modal/selectClass';

@connect(
    state => state.teacher,
    { getPaperDetail, getAllQue, showIntelligentModal }
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

    handleAddQue(type) {
        if (type == 'Manual') {
            this.props.getAllQue({ paperId: this.state.paperId })
        } else {
            this.props.showIntelligentModal(true)
        }
    }


    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        // console.log(this.props,'paperdetail')
        return (
            <div style={ { margin: 20 } }>
                { redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
                <Button onClick={ ()=>this.handleAddQue('Manual') } style={ { float: 'left', zIndex: '1', margin: '10px' } }>人工组卷</Button>
                <Button onClick={ ()=>this.handleAddQue('intelligent') } style={ { float: 'left', zIndex: '1', margin: '10px' } }>智能组卷</Button>
                <SelectClass></SelectClass>
                <QueTable id={ this.state.paperId }></QueTable>
                <EditModal></EditModal>
                <IntelligentModal></IntelligentModal>
            </div>
        )
    }
}

export default PaperDetail