import React,{Component} from 'react';
import { 
	StyleSheet, 
	PropTypes, 
	View, 
	Text, 
	Image,
	TextInput,
	TouchableOpacity, 
	TouchableNativeFeedback,
	Dimensions,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Input extends Component <{}>{

    constructor(props){
        super(props);
        this.state = {
			isediting: false
        }
    }
    static defaultProps = {
        autoFocus: false,
        placeholder: 'Search',
        autoCorrect: false,
        keyboardType: 'default',
        placeholderTextColor: '#c3c3c3',
        editable: true,
    }

	render() {
			return (
				<View style={[styles.inputWrap]}>
                    <Icon name='md-search' color='#7C7C7C' size={20}/>
					<TextInput 
						style={{flex: 1,marginLeft: 0,paddingLeft: 5}}
						autoFocus={this.props.autoFocus}
						autoCorrect={this.props.autoCorrect}
						keyboardType={this.props.keyboardType}
						onChangeText={(text) => {
							this.setState({
								isediting: true
							});
							this.props.onChangeText(text);
						}}
						onFocus={() => {
						}}
						onBlur={() => {
							this.setState({
								isediting: false
							});
						}}
						value={this.state.value}
						placeholder={this.props.placeholder}
						placeholderTextColor={this.props.placeholderTextColor}
						editable={this.props.editable}
						underlineColorAndroid={'#fff'}
					/>
                    {
                        this.state.isediting ? <Icon name='md-close-circle' style={styles.inputDel} size={15} onPress={() =>  this.setState({
							value:''
						})} /> : <View></View>
                    }
                    
				</View>
			);
	}

}

var styles = StyleSheet.create({
	inputWrap: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		height: 35,
		justifyContent: 'center',
        alignItems: 'center',
        margin:20,
        paddingLeft:10,
        borderRadius:4,
        paddingRight:10
	},
	inputText: {
		color: '#7C7C7C',
	},
	inputDel: {
        color:'#7C7C7C'
	}
});
