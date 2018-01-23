import React, { Component } from 'react';
import{ StyleSheet,ScrollView, Image, Text, View, TextInput, Button} from 'react-native';
import SearchBar from 'antd-mobile/lib/search-bar'
import Popover from 'antd-mobile/lib/popover'

const Item = Popover.Item
export default class New extends Component {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      visible:false
    }
  }
  handleVisibleChange = () => {
    this.setState({
      visible:true
    })
  }
  render() {
      return(
        <View>
          <View style={styles.head} >
            <View style={styles.hV1}></View>
            <View style={styles.hV1}>
              <Text style={styles.word} >简记</Text>
            </View>
            <View >
              {/* <Button onPress={this.onBtPress} ><Image source={require('../img/showmore.png')} style={{width:30,height:30}}></Image></Button> */}
              <Popover 
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={this.state.visible}
                overlay={[
                  (<Item key="4" value="scan">Scan</Item>),
                  (<Item key="5" value="special">My Qrcode</Item>),
                  (<Item key="6" value="button ct" >
                    <span style={{ marginRight: 5 }}>Help</span>
                  </Item>),
                ]}
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-10, 0],
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
              ><Image source={require('../img/showmore.png')} style={{width:30,height:30}} />
              </Popover>
            </View>
          </View>
          <View style={styles.search} >
          <TextInput
          style={{width: '80%'}}
          placeholder="  search  "
          onChangeText={(text) => this.setState({text})}
        />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  head:{
    backgroundColor:'black',
    height:30,
    paddingTop:5,
    flexDirection: 'row',
    alignItems:'center'
  },
  hV1:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-around'
  },
  word:{
    color:'#EEE'
  },
  search:{
    flexDirection: 'column',
    alignItems: 'center',
  }
})