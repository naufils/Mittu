import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  HeaderBackButton,
} from "react-navigation";

import TabIndexes from "./Components/TabIndexes";
import AuthScreen from "./Components/auth/StackAuth";
import CoverScreen from "./Components/auth/coverScreen";
import ForgotOTP from "./Components/auth/ForgotOTP";
import Signup from "./Components/auth/Signup";
const AppContainer = createStackNavigator(
  {
    CoverScreen: CoverScreen,
    AuthScreen: AuthScreen,
    TabIndex: TabIndexes,
    ForgotOTP: ForgotOTP,
    Signup: Signup,
    // ExploreScreen: ExploreScreen
  },
  {
    initialRouteName: "CoverScreen",
    headerMode: "none",
    headerTitleAlign: "center",
    title: "Mittu",
    defaultNavigationOptions: {
      headerStyle: {
        height: 20,
        color: "black",
        backgroundColor: "white",
      },
    },
  }
);

const App = createAppContainer(AppContainer);

export default App;
