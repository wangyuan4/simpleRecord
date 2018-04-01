import React, { Component } from 'react';
import { StyleSheet, Text, View ,Button,TextInput,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import {MarkdownEditor} from './react-native-markdown-editor';

export default class MDEditor extends Component <{}>{
	constructor(props){
		super(props);
		this.state = {
			title:'',
			content:''
		}
	}
	render () {
		const {saveFile,file} = this.props;
		const {title,content} = this.state;
		const fileId = file ? file.file_id : false;
		return (
			<View style={styles.container}>
				<View style={styles.navBar}>
					<View style={styles.navBar1}>
						<Icon name='ios-arrow-back' color='#EEE' size={20} onPress={() => Actions.pop()}></Icon>
					</View>
					<View style={styles.navBar2}>
						{/* <Icon name='md-refresh' style={styles.Icon} size={20} ></Icon>
						<Icon name='md-bookmark' style={styles.Icon} size={20}></Icon> */}
						<Icon name='md-checkmark' style={styles.Icon} size={20} onPress={() => saveFile(title,content,fileId)}></Icon>
					</View>
				</View>
				<View>
					<TextInput  style={{paddingLeft:20}} placeholder='Title' value={file ? file.title : undefined} onChangeText={(title) => this.setState({title})}/>
				</View>
				<MarkdownEditor onMarkdownChange={(content) => this.setState({content})}  text={file ? file.content : undefined}/>
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
		paddingLeft:20,
	},
	navBar2:{
		paddingRight:20,
	},
	Icon:{
		color:'white',
		marginLeft:30,
	}
});
