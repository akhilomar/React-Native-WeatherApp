import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Card, List } from 'react-native-paper';
import SearchScreen from './components/searchscreen';
import HomeScreen from './components/homescreen';
import {  createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons'


const TabNavigator = createBottomTabNavigator({
  "Current City": HomeScreen,
  "Select City": SearchScreen,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused,  tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Current City') {
        iconName = `md-cloud`;


      } else if (routeName === 'Select City') {
        iconName = `md-options`;
      }

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#8395a7',
    activeBackgroundColor: "#130f40",
    inactiveBackgroundColor: "#30336b"
  },
}
);

export default createAppContainer(TabNavigator);