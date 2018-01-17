import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';
const image = require('./../../images/pin.png');
const imgDimension = 30,
  imgLeftMargin = 20;

export default class MarkerView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          height: imgDimension,
          width: imgDimension + imgLeftMargin
        }}>
        <Image
          source={image}
          style={{
            height: imgDimension,
            width: imgDimension,
            marginLeft: imgLeftMargin
          }}
        />
      </View>
    )
  }
}