import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CardsScreen from '../screens/CardsScreen';
import FiltersScreen from '../screens/FilterScreen';
import Colors from '../constants/Colors';
import CardScreen from '../screens/CardScreen';

const HomeStack = createStackNavigator({
  Cards: CardsScreen,
  Card: CardScreen
}, {
  mode: 'modal',
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Cards',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        // ${focused ? '' : '-outline'}
        Platform.OS === 'ios'
          ? `ios-browsers` 
          : 'md-information-circle'
      }
    />
  ),
};

const FiltersStack = createStackNavigator({
  Filters: FiltersScreen,
});

FiltersStack.navigationOptions = {
  tabBarLabel: 'Filters',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  FiltersStack,
}, {
  tabBarOptions: {
    activeTintColor: Colors.tintColor
  }
});
