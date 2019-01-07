import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleFilter, deselectAllFilters, selectAllFilters } from '../redux/CardReducer';
import { HeaderBackButton } from 'react-navigation';

import Colors from '../constants/Colors';

import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Filter from '../components/TextFilter'
import { HouseFilter, TypeFilter, RarityFilter } from '../services/FilterSource';
import { houseIcons } from '../constants/Houses';


class SelectButton extends React.Component {

  render() {
    return <Button onPress={this._onPress} title={this.hasAnyOff() ? "Select All" : 'Deselect All'} color="#fff"/>
  }

  hasAnyOff = () => {
    return Object.values(this.props.filterState).some((x) => !x)
  }

  _onPress = () => {
    this.hasAnyOff() ? this.props.selectAllFilters() : this.props.deselectAllFilters()
  }

}

const mapStateToProps2 = (state) => {
  const { cards } = state
  return { filterState: cards.filters }
};

const mapDispatchToProps2 = dispatch => (
  bindActionCreators({
    deselectAllFilters,
    selectAllFilters,
  }, dispatch)
);

const ConnectedSelectButton = connect(mapStateToProps2, mapDispatchToProps2)(SelectButton);



class FiltersView extends React.Component {
  render() {
    const {filter, filterState, toggleFilter, imageSource} = this.props;
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>{filter.name}</Text>
        <View style={styles.filterList}>
          {filter.items.map((item) => <Filter width={(Dimensions.get('window').width - 8 - 20)/4} image={imageSource && imageSource[item.name]} active={filterState[item.name]} text={item.name} key={item.name} onClick={(val) => toggleFilter(item.name, val)}/>)}
        </View>
      </View>
    )
  }
}

class FilterScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Filters',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    },
    headerRight: <ConnectedSelectButton />,
    headerLeft: <HeaderBackButton title="Back" onPress={() => navigation.navigate('Cards')} tintColor='#fff'/>,
  })

  render() {
    const {filterState, toggleFilter} = this.props;
    return <View style={styles.container}>
      <FiltersView filter={HouseFilter} imageSource={houseIcons} filterState={filterState} toggleFilter={toggleFilter} />
      <FiltersView filter={TypeFilter} filterState={filterState} toggleFilter={toggleFilter}/>
      <FiltersView filter={RarityFilter} filterState={filterState} toggleFilter={toggleFilter}/>
      <Text style={styles.cardCount}>{this.props.visibleCards} cards / {this.props.allCards} </Text>
    </View>;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  filterContainer: {
  },
  filterTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 32,
  },
  filterList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  cardCount: {
    marginTop: 10,
    marginRight: 2,
    color: Colors.blackText400,
    alignSelf: 'flex-end',
  },
  
});

const mapStateToProps = (state) => {
  const { cards } = state
  return { filterState: cards.filters, allCards: cards.cardData.length, visibleCards: cards.data.length }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleFilter,
  }, dispatch)
);



export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen);
