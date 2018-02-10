import React,{Component} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {View,Text,TouchableHighlight,StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import TextIpt from '../Component/TextIpt';


export default class Login extends Component <{}> {
  constructor(props){
    super(props);
    this.state={
      userName:'',
      userPwd:''
    }
  }
  render(){
    const {userName,userPwd} = this.state
    return (
      <View style={styles.lgBd}>
        <View style={styles.title}>
          <FontAwesomeIcon name='user' size={50} color='white'/>
        </View>
        <View marginBottom={50}>
          <TextIpt
            label='User Name'
            iconClass={FontAwesomeIcon}
            iconName='pencil'
            autoCapitalize='none'
            autoCorrect={false}
            onChange={(value) => this.setState({
              userName:value
            })}
            labelType='textinput'
          />
          <TextIpt
            label='Password'
            iconClass={FontAwesomeIcon}
            iconName='pencil'
            autoCapitalize='none'
            autoCorrect={false}
            onChange={
              (value) => this.setState({
                userPwd:value
              }) 
            }
            labelType='password'
          />
        </View>
        <View> 
          <TouchableOpacity onPress={() => Actions.push('App')}>
            <View  style={styles.lgButton}>
              <Text  style={styles.lgText}>login in</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lgBd:{
    flex:1,
    backgroundColor:'#6f8fa8',
    padding:60
  },
  title:{
    marginLeft:120,
    marginBottom:20,
    marginTop:50
  },
  lgButton:{
    width:260,
    height:35,
    borderRadius:6,
    borderColor:'white',
    borderWidth:1,
  },
  lgText:{
    color:'white',
    fontSize:20,
    textAlign:'center'
  }
})