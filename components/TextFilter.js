import React from 'react';
import { Image,View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import {houseIcons} from '../constants/Houses';
import Colors from '../constants/Colors';

export default class Filter extends React.Component {
  render() {
    const {width, text, image, active} = this.props;

    return (
      <TouchableOpacity onPress={this._onClick}>
        <View style={[{width: width, marginLeft: 2, marginRight: 2, marginBottom: 4},styles.container, active ? styles.activeContainer : styles.disabledContainer]}>
          {(image && <Image style={[styles.image, active ? null : styles.disabledImage]} source={image}/>)}
          <Text style={[styles.text, active ? styles.activeText : styles.disabledText]}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _onClick = () => {
    this.props.onClick(!this.props.active)
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#D8D3D3',
    padding: 6,
  },
  disabledContainer: {
    borderColor: '#D8D3D3',
  },
  activeContainer: {
    borderColor: Colors.tintColor,
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    alignSelf: 'center'
  },
  disabledText: {
    fontWeight: '200',
    color: '#000'
  },
  activeText: {
    fontWeight: '700',
    color: Colors.tintColor,
  },
  image: {
    width: 44,
    height: 44,
    alignSelf: 'center'
  },
  disabledImage: {
    tintColor: "#ccc"
  },
  
});
