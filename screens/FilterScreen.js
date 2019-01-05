import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleFilter } from '../redux/CardReducer';

import Colors from '../constants/Colors';


import {
  Button,
  Image,
  Platform,
  FlatList,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import Filter from '../components/TextFilter'
import { HouseFilter, TypeFilter, RarityFilter } from '../services/FilterSource';
import { houseIcons } from '../constants/Houses';

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

const mapStateToProps = (state) => {
  const { cards } = state
  return { filterState: cards.filters }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleFilter,
  }, dispatch)
);


const ConnectedFiltersView = connect(mapStateToProps, mapDispatchToProps)(FiltersView);

export default class FilterScreen extends React.Component {
  static navigationOptions = {
    title: 'Filters',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: Colors.tintColor,
    }
  };

  render() {
    return <View style={styles.container}>
      <ConnectedFiltersView filter={HouseFilter} imageSource={houseIcons}/>
      <ConnectedFiltersView filter={TypeFilter}/>
      <ConnectedFiltersView filter={RarityFilter}/>
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
  }
  
});
