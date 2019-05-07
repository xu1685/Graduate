
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getClassDetail, getAllQue } from '../../redux/teacher.redux'
import {
    Table, Input, Button, Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';

@connect(
    state => state.teacher,
    { getClassDetail, getAllQue }
)

class ClassDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            id: ''
        }
    }
    componentWillMount() {
        let url = this.props.location.pathname
        let id = url.split('=')[1]
        this.setState({
            classId: id
        })
        if (this.props.refreshPaperDetail) {
            console.log(id, 'id')
            this.props.getClassDetail({ classId: id })
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
                <div style={ { padding: 8 } }>
                    <Input
                        ref={ node => { this.searchInput = node; } }
                        placeholder={ `Search ${dataIndex}` }
                        value={ selectedKeys[0] }
                        onChange={ e => setSelectedKeys(e.target.value ? [e.target.value] : []) }
                        onPressEnter={ () => this.handleSearch(selectedKeys, confirm) }
                        style={ { width: 188, marginBottom: 8, display: 'block' } }
                    />
                    <Button
                        type="primary"
                        onClick={ () => this.handleSearch(selectedKeys, confirm) }
                        icon="search"
                        size="small"
                        style={ { width: 90, marginRight: 8 } }
                    >
                        Search
                    </Button>
                    <Button
                        onClick={ () => this.handleReset(clearFilters) }
                        size="small"
                        style={ { width: 90 } }
                    >
                        Reset
                    </Button>
                </div>
            ),
        filterIcon: filtered => <Icon type="search" style={ { color: filtered ? '#1890ff' : undefined } } />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={ { backgroundColor: '#ffc069', padding: 0 } }
                searchWords={ [this.state.searchText] }
                autoEscape
                textToHighlight={ text.toString() }
            />
        ),
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    render() {
        console.log(this.props, 'paperdetail')
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        let data = []
        if (this.props.classDetail.classData) {
            let studentData = this.props.classDetail.studentData
            for (let i = 0; i < studentData.length; i++) {
                data.push({
                    key: studentData[i].stuId,
                    name: studentData[i].stuName,
                })
            }
        }
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'stuId',
                dataIndex: 'key',
                key: 'id',
                width: '30%',
                ...this.getColumnSearchProps('id'),
            },
        ];

        return (
            <div style={ { margin: 20 } }>
                { redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
                { this.props.classDetail.classData ? <h3>{ this.props.classDetail.classData.className }</h3> : null }
                <Table columns={ columns } dataSource={ data } />
            </div>
        )
    }

    // render() {
    //     const path = this.props.location.pathname
    //     const redirect = this.props.redirectTo
    //     // console.log(this.props,'paperdetail')
    //     return (
    //         <div>
    //             { redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
    //             <h2>CLASS detail</h2>
    //             {this.props.classDetail.className}
    //         </div>
    //     )
    // }
}

export default ClassDetail