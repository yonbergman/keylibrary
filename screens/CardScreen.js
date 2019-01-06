import React from 'react';
import { connect } from 'react-redux';

import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import Colors from '../constants/Colors';

const text = (t) => {
  return function(c) {
    if (!c) return "0 " + t
    return c + " " + t
  }
}
class Kard extends React.Component {

  aember = text("Aember")
  power = text("Power")
  armor = text("Armor")

  render() {
    const { card } = this.props;
    return (
      <View style={styles.item}>
        <Image style={styles.image} source={{uri: card.largeImage}}/>
        <Text style={[styles.text, styles.h1]}>{card.name}</Text>
        <Text style={[styles.text, styles.h2]}>{card.type}</Text>
        <Text style={[styles.text, styles.p]}>{card.text}</Text>
        <Text style={[styles.text, styles.sm]}>{card.rarity} • {card.house}</Text>
        {(card.traits ? <Text style={[styles.text, styles.sm]}>{card.traits}</Text> : null)}
        <Text style={[styles.text, styles.sm]}>{this.aember(card.aember)}</Text>
        {(card.type == 'Creature' && <Text style={[styles.text, styles.sm]}>{this.power(card.power)} • {this.armor(card.armor)}</Text>)}
      </View>
    )
  }
   
}

class CardScreen extends React.Component {

  static navigationOptions = { 
    header: null, 
    gestureResponseDistance: {
      vertical: 400,
    },
  }

  render() {
    const { cards, navigation} = this.props;
    const cardIndex = navigation.getParam('cardIndex');
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

  _renderItem = ({item}) => {
    return <Kard card={item}/>
  }
  _keyExtractor = (item) => item.id;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteBackground,
  },
  item: {
    padding: 38,
    width: 299,
  },
  image: {
    width: 299,
    height: 420,
    borderRadius: 8,
    backgroundColor: Colors.loadingCard,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  text: {
    color: Colors.blackText200,
    textAlign: 'center',
    width: 299,
    alignSelf: 'center',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 22,
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
    opacity: 0.8,
  },
});

const mapStateToProps = (state) => {
  const { cards } = state
  return { cards }
};

export default connect(mapStateToProps)(CardScreen);
