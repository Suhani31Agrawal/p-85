import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import TaskCompletionScreen from '../screens/TaskCompletionScreen';
import RecieverDetailsScreen  from '../screens/RecieverDetailsScreen';

export const AppStackNavigator = createStackNavigator({
  
  TaskCompletedList:{
      screen: TaskCompletionScreen,
      navigationOptions:{
        headerShown:false
      }
  },
  RecieverDetails:{
      screen: RecieverDetailsScreen,
      navigationOptions:{
        headerShown:false
      }
  },

    },
    {
    initialRouteName : 'TaskCompletedList'
  })