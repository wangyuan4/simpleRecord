import React, { Component } from 'react';
import FileList from '../Component/FileList';


export default class LifeFiles extends Component <{}> {
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
          title:'lff1',
          key:1
        },
        {
          title:'lff2',
          key:2
        },
        {
          title:'lff3',
          key:3
        },
        {
          title:'lff4',
          key:4
        }
      ]
      return (<FileList
                data={data}
                title='LifeRecord'
                searchVal={this.searchVal}
                backBtn={false}
                addMean='md'
              />);
  }
}
