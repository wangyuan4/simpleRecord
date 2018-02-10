
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
import Icon from 'react-native-vector-icons/Ionicons';
import WorkFiles from './WorkFiles';
import LifeFiles from './LifeFiles';
import Mine from './Mine';


export default class App extends Component <{}> {
  state = {
    selectedTab:'Files'
  }
  _renderTabar = (selectedTab,icon,Component) => {
    return (
      <TabNavigator.Item 
        selected={this.state.selectedTab === selectedTab}
        title={selectedTab}
        renderIcon={() => <Icon name={icon} color='gray' size={20}/>}
        renderSelectedIcon={()=><Icon name={icon} color='#6f8fa8' size={20}/>}
        onPress={() => this.setState({ selectedTab: selectedTab })}
      >
        <Component />
      </TabNavigator.Item>
    )
  }
  render() {
    return (
      <TabNavigator>
        {this._renderTabar('Files','ios-albums-outline',WorkFiles)}
        {this._renderTabar('LifeFiles','ios-create',LifeFiles)}
        {this._renderTabar('Mine','md-person',Mine)}
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
