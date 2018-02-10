import React, { Component } from 'react';
import FileList from '../Component/FileList';


export default class FriendsList extends Component <{}> {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      visible:false,
      sValue:''
    }
  }
  searchVal = (val) => {
    this.setState({
      sValue:val
    })
  }
  share = () => {
  }
  render() {
      const data = [
        {
          title:'friend1',
          key:1
        },
        {
          title:'friend2',
          key:2
        },
        {
          title:'friend3',
          key:3
        },
        {
          title:'friend4',
          key:4
        }
      ]
      return (<FileList
                data={data}
                title='myFriends'
                searchVal={this.searchVal}
                backBtn={true}
                addMean='scan'
              />);
  }
}
