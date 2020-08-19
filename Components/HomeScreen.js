import React from 'react';
import {createMaterialTopTabNavigator, MaterialTopTabBar} from 'react-navigation';
import { SafeAreaView, Dimensions,Platform, StatusBar } from 'react-native'
import Originals from './TabScreens/Originals';
import Movies from './TabScreens/Movie';
import Comedy from './TabScreens/Comedy';
import ShortFilms from './TabScreens/ShortFilms';
import CPanti from './TabScreens/CPanti';

const HomeScreen = createMaterialTopTabNavigator(
  {
    Originals: Originals,
    Movies: Movies,
    ShortFilms: ShortFilms,
    Comedy : Comedy,
    'C Panti':CPanti
},
{
  tabBarOptions: {
      style:{
        backgroundColor: 'black'
      },
      'scrollEnabled': true,
      'tabStyle': {
        width: 140
      },
      'indicatorStyle': {
        backgroundColor: '#F9A818'
      },
      activeTintColor: '#F9A818',
      inactiveTintColor: 'white',
      labelStyle:{
        fontFamily: 'Poppins-Bold',
        fontSize:12,
        fontWeight:'500',

      }
  }
},

{
  initialLayout : {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
},

},

);

  export default HomeScreen;