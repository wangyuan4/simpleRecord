import React, { Component } from 'react';
import{ StyleSheet, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from './searchBar';
import FileList from './fileList'
import FriendsList from './friendsList'


export default class List extends Component <{}> {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      visible:false
    }
  }
  handleVisibleChange = () => {
    this.setState({
      visible:true
    })
  }
  swipeoutBtns = (item) => {
    return ([
      {
        component:(
          <View style={styles.shareDel}>
            <Icon name='md-share' color='white' size={15} onPress={() => this.props.shareFile(item.id)}/>
            <Icon name='md-trash' color='white' size={15} onPress={() => this.props.deleteFile(item.id)}/>
          </View>
        ),
        backgroundColor:'#6f8fa8'
      }
    ])
  }
  render() {
    const {
      data,
      title,
      searchVal,
      backBtn,
      dataType,
      saveFile,
      shareFile,
      deleteFile
    } = this.props;
    return(
      <View>
        <View style={styles.head} >
          <View style={styles.hV1}>
            <View>{backBtn && <Icon name='ios-arrow-back' color='white' size={20} onPress={() => Actions.pop()}/>}</View>
            <View >
              <Text style={styles.word} >{title}</Text>
            </View>
            <View>
              {
                dataType 
                ? <Icon name='md-qr-scanner' color='white' size={20} />
                : <Icon name="md-add" color='white' size={20}  onPress={() => Actions.MarkdownEditor({saveFile:saveFile})}/>
              }
            </View>
        </View>
        </View>
        <View style={styles.search} >
          <Input onChangeText={(val) => searchVal(val)}/>
        </View>
        <View>
          {dataType ? 
            <FriendsList {...this.props} swipeoutBtns={this.swipeoutBtns} /> :
            <FileList {...this.props} swipeoutBtns={this.swipeoutBtns}/>
          }
        </View>
      </View>
    );
    }
    }


const styles = StyleSheet.create({
  head:{
    backgroundColor:'#6f8fa8',
    height:40,
    flexDirection: 'row',
    alignItems:'center'
  },
  hV1:{
    flex:1,
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'space-between'
  },
  word:{
    color:'white'
  },
  search:{
    flexDirection: 'column',
    justifyContent: 'center',
  },
  shareDel:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  }
})