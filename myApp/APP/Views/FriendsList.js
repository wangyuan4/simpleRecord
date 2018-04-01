import React, { Component } from 'react';
import List from '../Component/List';
import { userInfoTran } from '../utils/dataTran';
import {fetchJSONByGet,fetchJSONByPost} from '../utils/ajax'


export default class FriendsList extends Component <{}> {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      visible:false,
      sValue:'',
      data:{
        list:[],
        isFriend:false
      }
    }
  }
  searchVal = (val) => {
    this.setState({
      sValue:val
    })
    this.searchFriends(val)
  }
  itemPress = () => {
  }
  addFriend = (id) => {
    const body = {
      userId : global.user.id,
      friendId:id
    }
    fetchJSONByPost('addfriend')(body)
    .then(res => res.json())
    .then(res => {
      res ? Alert.alert('添加成功！') :  Alert.alert('添加失败！')
    })
  }
  searchFriends = (friendName) => {
    const query = {
      userId : global.user.id,
      friendName:friendName || ''
    }
    fetchJSONByGet('getfriendslist')(query)
    .then(res => res.json())
    .then(res => {
      const list =  userInfoTran(res.list,false)
      this.setState({
        data:{
          list,
          isFriend:res.isFriend
        }
      })
    })
  }
  componentDidMount(){
    this.searchFriends()
  }
  render() {
      const {title,itemPress} = this.props
      return (<List
                data={this.state.data}
                title={title || 'myFriends'}
                searchVal={this.searchVal}
                backBtn={true}
                dataType={1}
                addFriend={this.addFriend}
                itemPress={itemPress || this.itemPress}
              />);
  }
}
