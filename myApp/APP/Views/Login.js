import React,{Component} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {View,Text,TouchableHighlight,StyleSheet, TextInput, TouchableOpacity,Alert} from 'react-native';
import TextIpt from '../Component/TextIpt';
import {fetchJSONByGet, fetchJSONByPost} from '../utils/ajax';
import {userInfoTran} from '../utils/dataTran'

export default class Login extends Component <{}> {
  constructor(props){
    super(props);
    this.state={
      userName:'',
      userPwd:''
    }
  }
  login = () => {
    const query = {
      name:this.state.userName,
      pwd:this.state.userPwd
    }
    fetchJSONByGet('searchuser')(query)
    .then(res => res.json())
    .then(res => {
      if(res.status){
        global.user = userInfoTran(res.data,true)
        Actions.App();
      }else{
        Alert.alert(res.msg);
      }
    })
  }

  sign = () => {
    const data = {
      name:this.state.userName,
      pwd:this.state.userPwd
    }
    console.log(data)
    fetchJSONByPost('adduser')(data)
    .then(res => res.json())
    .then(res => {
      if(res.status){ 
        Alert.alert('注册成功');
        global.user = userInfoTran(res.data);
        Actions.App();
      }else{
        Alert.alert(res.msg);
      }
    })
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
            onChangeText={(value) => this.setState({
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
            onChangeText={(text) => {this.setState({userPwd:text})}}
            labelType='password'
          />
        </View>
        <View> 
          <TouchableOpacity onPress={this.login}>
            <View  style={styles.lgButton}>
              <Text  style={styles.lgText}>login in</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:10}}> 
          <TouchableOpacity onPress={this.sign}>
            <View  style={styles.lgButton}>
              <Text  style={styles.lgText}>sign up</Text>
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
    width:'90%',
    height:35,
    borderRadius:6,
    borderColor:'white',
    borderWidth:1,
    marginLeft:'5%',
    marginRight:'5%'
  },
  lgText:{
    color:'white',
    fontSize:20,
    textAlign:'center'
  }
})