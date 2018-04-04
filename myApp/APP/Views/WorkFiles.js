import React, { Component } from 'react';
import List from '../Component/List';
import {fetchJSONByPost, fetchJSONByGet} from '../utils/ajax';
import { Actions } from 'react-native-router-flux';
import {fileInfoTran} from '../utils/dataTran';
import {getValue} from '../../storage'


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
  deleteFile = (id) => {
    const body = {
      userId:global.user.id,
      fileId:id
    }
    fetchJSONByPost('deleteFile')(body)
    .then(res => res.json())
    .then(res => {
      res && this.searchLifeFiles()
    })
  }
  editFile = (item) => {
    Actions.MarkdownEditor({
      file:item,
      saveFile:this.saveFile
    })
  }
  saveFile = (title,content,fileId) => {
    console.log(fileId)
    const body = {
      id:global.user.id,
      title,
      content,
      type:0,
      fileId
    }
    fetchJSONByPost('addFile')(body)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      res ? Actions.App() : console.log(res)
    })
  }
  searchWorkFiles = () => {
    getValue('userInfo',(res) => {
      console.log(res)
    },(eb => {
      console.log(eb)
    }))
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
