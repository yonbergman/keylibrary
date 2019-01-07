import React from 'react';
import { Icon } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import Colors from '../constants/Colors';
import { loadedCards, searchCards } from '../redux/CardReducer';
import { loadData } from  '../services/DataSource';
import { houseIcons } from '../constants/Houses';

class CardRow extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  icon() {
    return houseIcons[this.props.house];
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.item}>
          <Image
              source={this.icon()}
              style={styles.itemImage}
            />
          <View style={styles.itemData}>
            <Text style={styles.itemCardName}> {this.props.name} </Text>
            <Text style={styles.itemCardDetails}> {this.props.subtitle} </Text>
          </View>
          
        </View>
      </TouchableOpacity>
    );
  }
}

class CardsScreen extends React.Component {

  static navigationOptions = ({navigation}) => { 
    const graphMode = navigation.getParam('graphMode')
    return {
      title: 'Cards',
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      headerRight: (
        <TouchableOpacity onPress={() => {navigation.setParams({graphMode: !graphMode})}}>
          <Image style={styles.headerIcon} tintColor="#fff" source={graphMode ? require('../assets/images/list.png') : require('../assets/images/grid.png')}/>
        </TouchableOpacity>
      )
  }}

  async loadData() {
    this.setState({
      isImageViewVisible: false,
    })
    const cards = await loadData();
    this.props.loadedCards(cards);
  }

  componentWillMount() {
    this.loadData()
  }

  render() {
    const graphMode = this.props.navigation.getParam('graphMode')
    return (
      <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <SearchBar 
          placeholder="Search for card..."
          lightTheme
          round
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          inputStyle={{backgroundColor: '#E4E4E5', borderRadius: 10, color: '#8E8E93'}}
          containerStyle={{backgroundColor: 'white', flex: 2}}
          onChangeText={this._onChangeText}
          onClear={this._onChangeText}
        />
        <TouchableOpacity onPress={this._onSort} style={{borderBottomWidth: 1, borderBottomColor: '#E1E1E1'}}>
          <Icon.Ionicons
            size={24}
            style={{padding: 8, alignSelf: 'center', marginTop: 3, marginRight: 4}}
            name='ios-swap'
            color="#000"
          />
        </TouchableOpacity>
      </View>
        {graphMode ? this._renderGraph() : this._renderList()}
      </View>
    );
  }

  _renderGraph = () => {
    return <FlatList
          key="GRID"
          data={this.props.cards.data}
          renderItem={this._renderCell}
          keyExtractor={this._keyExtractor}
          numColumns={2}
          contentContainerStyle={styles.grid}
          />
  }
  _renderCell = ({item, index}) => {
    const width = (Dimensions.get('window').width - 40)/2;
    const height = width * 150/106
    return (
      <TouchableOpacity onPress={() => this._onPressItem(index)}>
        <Image style={[{height: height, width: width}, styles.cardItem]} source={{uri: item.smallImage}}/>
      </TouchableOpacity>
    )
  }

  _renderList = () => {
    return <FlatList
          key="LIST"
          data={this.props.cards.data}
          renderItem={this._renderRow}
          keyExtractor={this._keyExtractor}
          />
  }

  _renderRow = ({item, index}) => {
    return <CardRow onPressItem={() => this._onPressItem(index)} {...item}/>
  }

  _keyExtractor = (item, index) => item.id.toString();

  _onChangeText = (text ) => {
    this.props.searchCards(text);
  }
  
  _onPressItem = (idx) => {
    const { navigate } = this.props.navigation;
    navigate('Card', {cardIndex: idx})
  }

  _onSort = () => {
    const { navigate } = this.props.navigation;
    navigate("Sort")
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    width: 24, 
    height: 24, 
    marginRight: 10, 
    tintColor: Colors.iconWhite,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.whiteBackground,
  },
  grid: {
    padding: 8,
  },
  cardItem: {
    flex: 1, 
    margin: 4,
    backgroundColor: Colors.loadingCard,
    borderRadius: 2, 
  },
  item: {
    fontSize: 18,
    height: 44,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    borderBottomColor: Colors.seperatorLine,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: 44,
    height: 44,
  },
  itemData: {
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
  },
  itemCardName: {

  },
  itemCardDetails: {
    color: Colors.blackText400,
  },
});

const mapStateToProps = (state) => {
  const { cards } = state
  return { cards }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    loadedCards,
    searchCards,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CardsScreen);
