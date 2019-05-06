import React from 'react'
import { Select } from 'antd';
import { connect } from 'react-redux'
import {getAllTags,getAllQue} from '../../redux/teacher.redux'

@connect(
    state => state.teacher,
    {getAllTags,getAllQue}
)

class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleGetTags =  this.handleGetTags.bind(this)
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        this.props.getAllQue({keyword:value})
    }
    handleGetTags() {
      this.props.getAllTags()
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const Option = Select.Option;
        let children = [];
        let allTags = this.props.allTags
        // console.log(allTags,'allTags')
        for (let i = 0; i < allTags.length; i++) {
            children.push(<Option key={ allTags[i].tagName }>{ allTags[i].tagName }({ allTags[i].relatedCount }个)</Option>);
        }
        return (
            <div>
                <Select
                    mode="multiple"
                    style={ { width: '100%' } }
                    placeholder="Tags Mode"
                    onChange={ this.handleChange }
                    onFocus={this.handleGetTags}
                >
                    { children }
                </Select>
            </div>
        )
    }
}

export default Tags