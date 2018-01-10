/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}
export default class App extends Component<{}> {
  render() {
    return (
      <ScrollView>
         <Text style={{fontSize:36}}>毛不易</Text>
         <Image source={require('./img/1.jpg')} />
         <Image source={require('./img/1.jpg')} />
         <Image source={require('./img/1.jpg')} />
         <Image source={require('./img/1.jpg')} />
         <Image source={require('./img/1.jpg')} />
         <Text style={{fontSize:40}}>巨星不易</Text>
         <Image source={require('./img/1.jpg')} />
         <Image source={require('./img/1.jpg')} />
         <Image source={require('./img/1.jpg')} />
         <Image source={require('./img/1.jpg')} />
         <Image source={require('./img/1.jpg')} />
       </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
