import React from 'react';
import { Icon } from 'expo';
import { connect } from 'react-redux';

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
import ImageView from 'react-native-image-view';
import { SearchBar, Card } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

import Colors from '../constants/Colors';

import { loadedCards, searchCards } from '../redux/CardReducer';
import { loadData } from  '../services/DataSource';
import { houseIcons } from '../constants/Houses';
import TabBarIcon from '../components/TabBarIcon';

class Kard extends React.Component {

  aember = (c) => {
    if (!c) return "0 Aember"
    return c + " Aember"
  }

  render() {
    const {card} = this.props;
    return (
      <View style={styles.item}>
        <Image style={styles.image} source={{uri: card.largeImage}}/>
        <Text style={[styles.text, styles.h1]}>{card.name}</Text>
        <Text style={[styles.text, styles.h2]}>{card.type}</Text>
        <Text style={[styles.text, styles.p]}>{card.text}</Text>
        <Text style={[styles.text, styles.sm]}>{card.rarity} • {card.house}</Text>
        <Text style={[styles.text, styles.sm]}>{card.traits}</Text>
        <Text style={[styles.text, styles.sm]}>{this.aember(card.aember)}</Text>
      </View>
    )
  }
   
}

class CardScreen extends React.Component {

  static navigationOptions = ({navigation}) => { 
    return {header: null, gestureResponseDistance: {vertical: 400}}
  }

  render() {
    const { cards, navigation} = this.props;
    const cardIndex = navigation.getParam('cardIndex');
    const card = cards.data[cardIndex];
    return (
      <View style={styles.container}>
        <Carousel
          data={cards.data}
          renderItem={this._renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={299}
          firstItem={cardIndex}
        />
      </View>
    );
  }

  _renderItem = ({item, index}) => {
    return <Kard card={item}/>
  }
  _keyExtractor = (item, index) => item.id;
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

export default connect(mapStateToProps)(CardScreen);
