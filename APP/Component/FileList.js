import React, { Component } from 'react';
import{ StyleSheet,ScrollView, Image, Text, View, TextInput, Button, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout'
import Icon from 'react-native-vector-icons/Ionicons';
import Input from './searchBar';


export default class FileList extends Component <{}> {
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
  share = () => {
  }
  render() {
      const {data,title,searchVal,backBtn,addMean} = this.props;
      const cpn = (
        <View style={styles.shareDel}>
          <Icon name='md-share' color='white' size={15}/>
          <Icon name='md-trash' color='white' size={15}/>
        </View>
      )
      const swipeoutBtns = [
        {
          component:cpn,
          backgroundColor:'#6f8fa8'
        }
      ]
      return(
        <View>
          <View style={styles.head} >
            <View style={styles.hV1}>{backBtn && <Icon name='ios-arrow-back' color='white' size={20} onPress={() => Actions.pop()}/>}</View>
            <View style={[styles.hV1,{marginRight:50}]}>
              <Text style={styles.word} >{title}</Text>
            </View>
            <View marginRight={10}>
              {
                addMean === 'md' 
                ? <Icon name="md-add" color='white' size={20}  onPress={() => Actions.MarkdownEditor()}/>
                : <Icon name='md-qr-scanner' color='white' size={20} />
              }
            </View>
          </View>
          <View style={styles.search} >
            <Input onChangeText={(val) => searchVal(val)}/>
          </View>
          <View>
            <FlatList
              data={data}
              renderItem={({item,index}) => (
                <View style={styles.list} key={index}>
                  <Swipeout right={swipeoutBtns} style={styles.swipeoutList} buttonWidth={100} >
                    <View style={{paddingTop: 14,paddingBottom: 14,}}>
                      <Text>{item.title}</Text>
                    </View>
                  </Swipeout>
                </View>
              )}>
            </FlatList>
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
    flexDirection:'column',
    justifyContent:'center',
    marginRight:20,
    paddingLeft:10
  },
  word:{
    color:'white'
  },
  search:{
    flexDirection: 'column',
    justifyContent: 'center',
  },
  list:{
    borderBottomWidth:0.5,
    borderBottomColor:'#6f8fa8',
    flex:1,
    paddingLeft:20,
    justifyContent:'center'
  },
  swipeoutList:{
    backgroundColor:'#E9E9EF',

  },
  shareDel:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  }
})