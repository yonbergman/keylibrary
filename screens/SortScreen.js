import React from 'react';
import { Icon } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SortBySources } from '../services/SortSource';

import {
  Button,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ListItem } from 'react-native-elements'

import Colors from '../constants/Colors';

import { sortCards } from '../redux/CardReducer';
import TabBarIcon from '../components/TabBarIcon';

class SortScreen extends React.Component {

  static navigationOptions = ({navigation}) => { 
    return {
      title: 'Sort By',
      headerTintColor: '#FFF',
      headerBackTitle: 'Cancel',
      headerTruncatedBackTitle: 'Cancel',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      gestureResponseDistance: {
        vertical: 400
      }
    }
  }

  render() {
    // const { cards } = this.props;
    // const currentSortBysorts = cards.sort];
    return (
      <View style={styles.container}>
        <FlatList
          data={SortBySources}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }

  _renderItem = ({item, idx}) => {
    return <ListItem 
      title={item.title} 
      subtitle={item.subtitle} 
      rightIcon={{name: 'check', color: '#78DE08'}} 
      hideChevron={item !== this.props.cards.sortBy}
      onPress={() => this._onPress(item)}
      />
  }

  _onPress = (item) => {
    this.props.sortCards(item)
    this.props.navigation.goBack()
  }

  _keyExtractor = (item, index) => item.title+item.subtitle;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  item: {
    padding: 38,
    width: 299,
  },
  image: {
    width: 299,
    height: 420,
    borderRadius: 8,
    backgroundColor: "#EEE",
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16
  },
  text: {
    color: '#252729',
    textAlign: 'center',
    maxWidth: 320,
    alignSelf: 'center'
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  p: {
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 8,
  },
  sm: {
    fontWeight: '200',
    fontSize: 13,
    opacity: 0.8
  }

});

const mapStateToProps = (state) => {
  const { cards } = state
  return { cards }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    sortCards
  }, dispatch)
);



export default connect(mapStateToProps, mapDispatchToProps)(SortScreen);
