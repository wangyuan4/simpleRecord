import React, { Component } from 'react';
import List from '../Component/List';
import {fetchJSONByPost, fetchJSONByGet} from '../utils/ajax';
import { Actions } from 'react-native-router-flux';
import {fileInfoTran} from '../utils/dataTran'


export default class WorkFiles extends Component <{}> {
  constructor(props){
    super(props)
    this.state = {
      sValue:'',
      fileList:[]
    }
  }
  searchVal = (val) => {
    this.setState({
      sValue:val
    })
  }
  shareFile = () => {
  }
  deleteFile = () => {

  }
  editFile = (item) => {
    Actions.MarkdownEditor({
      file:item,
      saveFile:this.props.saveFile
    })
  }
  saveFile = (title,content,fileId) => {
    const body = {
      id:global.user.id,
      title,
      content,
      type:0,
      fileId
    }
    const result = fetchJSONByPost('addFile')(body)
    result ? Actions.App() : ''

  }
  searchWorkFiles = () => {
    const query = {
      id:global.user.id,
      type:0
    }
    fetchJSONByGet('getFileList')(query)
    .then(res => res.json())
    .then(res => {
      const data = fileInfoTran(res)
      data.map((el) => ({
          ...el,
          key:el.user_id
        })
      )
      this.setState({
        fileList:data
      })
    })
  }
  componentWillMount(){
    this.searchWorkFiles()
  }
  render() {
      const {fileList} = this.state;
      return (<List
                data={fileList}
                title='workRecord'
                searchVal={this.searchVal}
                backBtn={false}
                dataType={0}
                padding={14}
                saveFile={this.saveFile}
                shareFile={this.shareFile}
                deleteFile={this.deleteFile}
                itemPress={this.editFile}
              />);
  }
}
