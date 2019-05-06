
import React from 'react'
import { createPaper,getPaperList } from '../../redux/teacher.redux'
import { Modal, Divider, Icon, Input, Button, List } from 'antd';
import { connect } from 'react-redux'

@connect(
  state => state.teacher,
  { createPaper,getPaperList }
)


class CreatePaperForm extends React.Component {
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
    this.props.createPaper(this.state.postdata)
    this.setState({ loading: false, visible: false });
    // this.props.getPaperList()
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

    return (
      <div>
        <Button type="primary" onClick={ this.showModal }>
          新增试卷
        </Button>
        <Modal
          visible={ visible }
          title="Title"
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
            { this.props.msg ? <p className='error-msg'>{ this.props.msg }</p> : null }
            <Input
              prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
              placeholder="paperName"
              onChange={ e => this.handleChange('paperName', e.target.value) } />
            <Divider></Divider>
            {/* <Input
              prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
              placeholder="questionIdarr"
              onChange={ e => this.handleChange('questionIdarr', e.target.value) } /> */}
          </List>
        </Modal>
      </div>
    );
  }
}

export default CreatePaperForm
