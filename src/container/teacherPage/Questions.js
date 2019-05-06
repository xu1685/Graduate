
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QueTable from '../../component/table/queTable'
import Tags from '../../component/table/tags'
import { getAllQue,gotoQue } from '../../redux/teacher.redux'
import EditModal from '../../component/modal/editModal'


@connect(
    state => state.teacher,
    { getAllQue,gotoQue }
)
class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }
    componentWillMount() {
        if (!this.props.nowPaperId) {
            let url = this.props.location.pathname
            let id = url.split('=')[1]
            // console.log(id, 'id')
            if (id) {
                this.setState({
                    paperId: id
                })
                this.props.getAllQue({ paperId: id })
            }else{
                this.props.gotoQue()
            }
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        // console.log(this.props,'QueTable')
        return (
            <div>
                { redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
                <h2>QueTable</h2>
                <Tags></Tags>
                <QueTable></QueTable>
                <EditModal></EditModal>
            </div>
        )
    }
}

export default Questions