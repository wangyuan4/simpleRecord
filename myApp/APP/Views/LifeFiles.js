import React, { Component } from 'react';
import {Alert} from 'react-native'
import List from '../Component/List';
import { Actions } from 'react-native-router-flux';
import {fetchJSONByPost, fetchJSONByGet} from '../utils/ajax';
import {fileInfoTran} from '../utils/dataTran';


export default class LifeFiles extends Component <{}> {
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
  shareFile = (id) => {
    Actions.FriendsList({
      title:'choice',
      fileId:id,
      itemPress:(id) => this.shareToFri(id)
    })
  }
  shareToFri = (userId,item) => {
    console.log(userId,item)
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
      saveFile:this.props.saveFile
    })
  }
  saveFile = (title,content,fileId) => {
    const body = {
      id:global.user.id,
      title,
      content,
      type:1,
      fileId
    }
    fetchJSONByPost('addFile')(body)
    .then(res => res.json())
    .then(res => {
      res ? Actions.App({currentPage:'LifeFiles'}) : ''
    })
    

  }
  searchLifeFiles = () => {
    const query = {
      id:global.user.id,
      type:1
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
    this.searchLifeFiles()
  }
  render() {
    const {fileList} = this.state
    return (
      <List
        data={fileList}
        title='LifeRecord'
        searchVal={this.searchVal}
        backBtn={false}
        dataType={0}
        padding={14}
        saveFile={this.saveFile}
        shareFile={this.shareFile}
        deleteFile={this.deleteFile}
        itemPress={this.editFile}
      />
    );
  }
}

