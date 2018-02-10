import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

export default class Mine extends Component <{}> {
	render() {
		return (
			<View>
				<View style={styles.head}>
					<View style={styles.title}>
					  <Text style={styles.titleWord}>ME</Text>
					</View>
				</View>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>User Name</Text>
        </View>
        <View style={styles.item}>
          <TouchableOpacity style={styles.friendBtn}  onPress={() => Actions.jump('FriendsList')}>
            <Text style={styles.itemTitle}>Friends</Text>
            <Icon name='ios-arrow-forward' size={18}/>
          </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <TouchableOpacity style={styles.friendBtn}>
            <Text style={styles.itemTitle}>User manual</Text>
            <Icon name='ios-arrow-forward' size={18}/>
          </TouchableOpacity>
        </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	head: {
		backgroundColor:'#6f8fa8',
		height:40
	},
	title: {
		flex:1,
		justifyContent:'center',
		alignItems:'center'
  },
  titleWord:{
    color:'white',
    fontSize:20
  },
  item:{
    backgroundColor:'white',
    marginTop:25,
    height:50,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:30,
    paddingRight:30
  },
  friendBtn:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  itemTitle:{
    fontSize:16
  }
});