
import React from 'react'
import { createQue} from '../../redux/teacher.redux'
import { Modal, Divider, Icon, Input, Button, List } from 'antd';
import { connect } from 'react-redux'

@connect(
  state => state.teacher,
  { createQue }
)


class CreateQueForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      visible: false,
      postdata: {}
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    this.props.createQue(this.state.postdata)
    this.setState({ loading: false, visible: false });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleChange(key, val) {
    this.setState({
      postdata: {
        ...this.state.postdata,
        [key]: val
      }
    })
  }

  render() {
    const { visible, loading } = this.state;
    const { TextArea } = Input;
    return (
      <div>
        <Button style={{float:'right',zIndex:'1',margin:'10px'}} type="primary" onClick={ this.showModal }>
          新增题目
        </Button>
        <Modal
          visible={ visible }
          title="新增题目"
          onOk={ this.handleOk }
          onCancel={ this.handleCancel }
          footer={ [
            <Button key="back" onClick={ this.handleCancel }>Return</Button>,
            <Button key="submit" type="primary" loading={ loading } onClick={ this.handleOk }>
              Submit
            </Button>,
          ] }
        >
          <List>
            <TextArea
            autosize 
              prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
              placeholder="题目内容"
              onChange={ e => this.handleChange('content', e.target.value) } />
            <Divider></Divider>
            <TextArea
            autosize 
              style={{marginBottom:10}}
              prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
              placeholder="optionA"
              onChange={ e => this.handleChange('optionA', e.target.value) } />
            <TextArea
            autosize 
              style={{marginBottom:10}}
              prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
              placeholder="optionB"
              onChange={ e => this.handleChange('optionB', e.target.value) } />
            <TextArea
             autosize 
              style={{marginBottom:10}}
              prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
              placeholder="optionC"
              onChange={ e => this.handleChange('optionC', e.target.value) } />
            <TextArea
             autosize 
              prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
              placeholder="optionD"
              onChange={ e => this.handleChange('optionD', e.target.value) } />
            <Divider></Divider>
            <Input
              style={{marginBottom:10}}
              prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
              placeholder="答案"
              onChange={ e => this.handleChange('answer', e.target.value) } />
            <Input
              prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
              placeholder="标签"
              onChange={ e => this.handleChange('tags', e.target.value) } />
            <Divider></Divider>
          </List>
        </Modal>
      </div>
    );
  }
}

export default CreateQueForm
