import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'

//import TaskCompletionScreen from '../screens/TaskCompletionScreen';
import TaskAssignScreen from '../screens/TaskAssignScreen';



export const AppTabNavigator = createBottomTabNavigator({
  ViewTasks : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/home-icon.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "View Tasks",
    }
  },
  AssignTasks: {
    screen: TaskAssignScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/ads-icon.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Assign Tasks",
    }
  }
});