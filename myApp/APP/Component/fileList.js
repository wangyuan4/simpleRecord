import React, { Component } from 'react';
import{ StyleSheet, Text, View, FlatList,TouchableOpacity} from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class FileList extends Component {
  render(){
    const {data,padding,itemPress,swipeoutBtns} = this.props;
    return (
      <FlatList
        data={data}
        renderItem={({item,index}) => (
          <View style={styles.list} key={index} >
            <Swipeout right={swipeoutBtns(item)} style={styles.swipeoutList} buttonWidth={100} autoClose={true} >
              <TouchableOpacity onPress={() => itemPress(item)}>
                <View style={{paddingTop: padding,paddingBottom: padding,}}>
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </Swipeout>
          </View>
        )}>
      </FlatList>
    );
  }
} 

const styles = StyleSheet.create({
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
	
});