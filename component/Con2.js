import React, { Component } from 'react';
import{ ScrollView, Image, Text, View } from 'react-native'

export default class Con2 extends Component {
  render() {
      return(
        <ScrollView>
          <Text style={{fontSize:40}}>Mao buyi</Text>
          <Image source={require('../img/1.jpg')} />     
          <Image source={require('../img/1.jpg')} />     
          <Image source={require('../img/1.jpg')} />
          <Image source={require('../img/1.jpg')} />
          <Text style={{fontSize:30}}>If you like</Text>
          <Image source={require('../img/1.jpg')} />     
          <Image source={require('../img/1.jpg')} />     
          <Image source={require('../img/1.jpg')} />
          <Image source={require('../img/1.jpg')} />
          <Text style={{fontSize:30}}>Scrolling down</Text>
        </ScrollView>
    );
  }
}