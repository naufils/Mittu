import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, } from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons';
import {Platform, StatusBar } from 'react-native';

// import HomeIconWithBadge from './Icons/HomeIcomWithBage';

import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import VideoProfileScreen from './VideoProfileScreen';
import SettingsScreen from './SettingSreen';
import VideoScreen from './VideoScreen';
import About from './InfoScreens/About';
import Privacy from './InfoScreens/PrivacyPolicy';
import Refund from './InfoScreens/RefundPolicy';


// const ExploreStack = createStackNavigator({
//   ExploreScreen: ExploreScreen,
// }
// ,{
  // navigationOptions: ({navigation}) => ({
  //   header:'Ignore Offer',
  //   // headerTitle: 'Ignore Offer',
  //   // headerLeft: 'Ignore Offer',
  //   headerBackTitle
  // })
// })

 const Home = createStackNavigator({
   HomeScreen:HomeScreen,
   VideoProfileScreen: VideoProfileScreen,
   VideoScreen: VideoScreen,
 },
 {
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
  // headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,

})

Home.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
  }
  
  return {
    tabBarVisible,
  };
};
          

const Settings = createStackNavigator({
  SettingsScreen:SettingsScreen,
  About: About,
  Privacy: Privacy,
  Refund: Refund,
},
{
  initialRouteName: 'SettingsScreen',
  headerMode: 'none',
  // headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,

})

Settings.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const TabNavigator = createBottomTabNavigator(
    {
      Home: Home,
      Explore: ExploreScreen,
      Settings: Settings,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `md-home`;          
        }
        else if (routeName === 'Explore') {
            iconName = `md-search`;
        }
        else if (routeName === 'Profile') {
        iconName = `md-person`;
        }
        else if (routeName === 'Settings') {
        iconName = `md-settings`;
        }
        // You can return any component that you like here!
        return <Icons style={{padding:20}} name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
        showIcon:true,
        activeTintColor: '#42B649',
        inactiveTintColor: 'white',
        style:{
          backgroundColor:'#121212'
        }
    },
    style: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  },
  );
  
export default createAppContainer(TabNavigator);