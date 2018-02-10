import React, { Component } from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import { MarkdownEditor } from 'react-native-markdown-editor';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MDEditor extends Component <{}>{
	constructor(props){
		super(props);
		this.state = {
			content:''
		}
	}
	onTextChange = (value) => {
		this.setState({
			content:value
		})
	}
	render () {
		return (
			<View style={styles.container}>
				<View style={styles.navBar}>
					<View style={styles.navBar1}>
						<Icon name='ios-arrow-back' color='#EEE' size={20} onPress={() => Actions.pop()}></Icon>
					</View>
					<View style={styles.navBar2}>
						<Icon name='md-refresh' style={styles.Icon} size={20} ></Icon>
						<Icon name='md-bookmark' style={styles.Icon} size={20}></Icon>
						<Icon name='md-checkmark-circle' style={styles.Icon} size={20}></Icon>
					</View>
				</View>
				<MarkdownEditor onMarkdownChange={(value) => this.onTextChange(value)}  />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	navBar:{
		backgroundColor:'#6f8fa8',
		height:30,
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'space-between'
	},
	navBar1:{
		flex:1,
		flexDirection:'row',
		paddingLeft:10,
	},
	navBar2:{
		flex:1,
		flexDirection:'row',
		paddingLeft:90,
	},
	Icon:{
		color:'white',
		marginLeft:30,
	}
});
