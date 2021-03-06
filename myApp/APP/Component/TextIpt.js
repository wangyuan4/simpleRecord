import React from 'react';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const LABEL_HEIGHT = 24;
const PADDING = 16;

export default class TextIpt extends BaseInput {

  static defaultProps = {
    iconColor: 'white',
    height: 48,
    animationDuration: 300,
    iconName: 'pencil',
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconName,
      label,
      style: containerStyle,
      height: inputHeight,
      inputStyle,
      labelStyle,
      labelType
    } = this.props;
    const { width, focusedAnim, value } = this.state;
    const AnimatedIcon = Animated.createAnimatedComponent(iconClass);

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + PADDING,
          },
        ]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={{
              position: 'absolute',
              bottom: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, LABEL_HEIGHT + PADDING],
              }),
            }}
          >
            <Animated.Text
              style={[
                styles.label,
                labelStyle,
                {
                  fontSize: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 12],
                  }),
                },
              ]}
            >
              {label}
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref="input"
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: inputHeight,
            },
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={'transparent'}
          secureTextEntry={labelType === 'password'}
        />
        <TouchableWithoutFeedback onPress={this.focus}>
          <AnimatedIcon
            name={iconName}
            color={iconColor}
            style={{
              position: 'absolute',
              bottom: 0,
              right: focusedAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width + PADDING],
              }),
              transform: [
                {
                  rotate: focusedAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-90deg'],
                  }),
                },
              ],
              fontSize: 20,
              backgroundColor: 'transparent',
            }}
          />
        </TouchableWithoutFeedback>
        {/* bottom border */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: 2,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width],
            }),
            backgroundColor: iconColor,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  label: {
    backgroundColor: 'transparent',
    fontFamily: 'Arial',
    color: 'white',
  },
  textInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingTop: PADDING / 2,
    paddingLeft: 10,
    color: 'white',
    fontSize: 18,
  },
});
