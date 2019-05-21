import React from 'react'
import { Select } from 'antd';
import { connect } from 'react-redux'
import { getAllTags, getAllQue } from '../../redux/teacher.redux'

@connect(
    state => state.teacher,
    { getAllTags, getAllQue }
)

class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleGetTags = this.handleGetTags.bind(this)
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        this.props.getAllQue({ keyword: value, paperId: this.props.nowPaperId })
    }
    handleGetTags() {
        this.props.getAllTags()
    }
  
    render() {
        const Option = Select.Option;
        let children = [];
        let allTags = this.props.allTags
        // console.log(this.props,'allTags props')
        for (let i = 0; i < allTags.length; i++) {
            children.push(<Option key={ allTags[i].tagName }>{ allTags[i].tagName }({ allTags[i].relatedCount }个)</Option>);
        }
        return (
            <div>
                <Select
                    mode="multiple"
                    style={ { width: '100%' } }
                    placeholder="选择题目标签"
                    onChange={ this.handleChange }
                    onFocus={ this.handleGetTags }
                >
                    { children }
                </Select>
            </div>
        )
    }
}

export default Tags