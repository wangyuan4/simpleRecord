import React, { Component } from 'react';
import FileList from '../Component/FileList';


export default class WorkFiles extends Component <{}> {
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
          title:'md1',
          key:1
        },
        {
          title:'md1',
          key:2
        },
        {
          title:'md1',
          key:3
        },
        {
          title:'md1',
          key:4
        }
      ]
      return (<FileList
                data={data}
                title='workRecord'
                searchVal={this.searchVal}
              />);
  }
}
