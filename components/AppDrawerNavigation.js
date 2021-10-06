import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import MyTaskScreen from '../screens/MyTaskScreen';
import SettingScreen from '../screens/SettingScreen'
import NotificationScreen from '../screens/NotificationScreen';


export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },
    MyTasks : {
    screen : MyTaskScreen
  },
  Notification : {
    screen : NotificationScreen
  },
  Setting:{
    screen: SettingScreen
  }
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })