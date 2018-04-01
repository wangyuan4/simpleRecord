import React, { Component } from 'react';
import{ StyleSheet, Text, View, FlatList,TouchableOpacity} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons';



export default class FriendsList extends Component {
  render(){
    const {data,itemPress,swipeoutBtns,addFriend} = this.props;
    return (
      <FlatList
        data={data.list}
        renderItem={({item,index}) => (
          <View style={styles.list} key={index} >
            <Swipeout right={swipeoutBtns(item)} style={styles.swipeoutList} buttonWidth={100} autoClose={true} disabled={!data.isFriend} >
              <TouchableOpacity onPress={() => itemPress(item)}>
                <View style={styles.items}>
                  <Text>{item.name}</Text>
                  {!data.isFriend && <Icon name='md-person-add' color='#6f8fa8' size={15} onPress={() => addFriend(item.id)} />}
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
  items:{
    paddingTop: 10,
    paddingBottom: 10,
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingRight:20
  }
});