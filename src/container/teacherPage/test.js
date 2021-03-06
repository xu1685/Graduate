
import React from 'react'
import {
	Table, Input, Button, Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getTestList } from '../../redux/teacher.redux'

@connect(
	state => state.teacher,
	{ getTestList }
)
class Test extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			searchText: ''
		}
		this.columns = [{
			title: '测试名称',
			dataIndex: 'testName',
			key: 'testName',
			width: '60%',
			...this.getColumnSearchProps('testName'),
		}, {
			title: '试卷名称',
			dataIndex: 'paperName',
			key: 'paperName',
			width: '20%',
			...this.getColumnSearchProps('paperName'),
		}, {
			title: '班级',
			dataIndex: 'className',
			key: 'className',
			...this.getColumnSearchProps('className'),
		}];

	}

	componentWillMount() {
		// console.log('componentWillMount')
		if (this.props.testList.length == 0) {
			console.log('testList=[]')
			this.props.getTestList()
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
		console.log(this.props, 'props')
		const path = this.props.location.pathname
		const redirect = this.props.redirectTo
		const columns = this.columns
		const data = []
		let resData = this.props.testList
		if (resData) {
			for (let i = 0; i < resData.length; ++i) {
				data.push({
					key: resData[i].testId,
					testName: resData[i].testName,
					paperName: resData[i].paperName,
					className: resData[i].className,
				});
			}
		}
		// console.log(data, '处理后的表格data',columns)
		return (
			<div style={ { margin: 20 } }>
				{ redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
				<Table columns={ columns } dataSource={ data } />;
			</div>

		)
	}
}

export default Test