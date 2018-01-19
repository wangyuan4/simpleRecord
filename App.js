
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Con1 from './component/Con1'
import Con2 from './component/Con2'


export default class App extends Component<{}> {
  state = {
    selectedTab:'Home'
  }
  _renderTabar = (selectedTab,Component) => {
    return (
      <TabNavigator.Item 
        selected={this.state.selectedTab === selectedTab}
        title={selectedTab}
        onPress={() => this.setState({ selectedTab: selectedTab })}
      >
        <Component />
      </TabNavigator.Item>
    )
  }
  render() {
    return (
      <TabNavigator>
        {this._renderTabar('Home',Con1)}
        {this._renderTabar('Find',Con2)}
        {this._renderTabar('+',Con1)}
        {this._renderTabar('collection',Con2)}
        {this._renderTabar('mine',Con2)}
      </TabNavigator>
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
