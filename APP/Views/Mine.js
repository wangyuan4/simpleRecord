import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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
    justifyContent:'center'
  },
  itemTitle:{
    marginLeft:30,
    fontSize:16
  }
});