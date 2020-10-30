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
import PaymentScreen from "./Components/payment/PaymentScreen"
import PaymentScreenFirst from "./Components/payment/PaymentScreenFirst"
import PaidScreen from "./Components/payment/PaidScreen"
//import UnpaidScreen from "./Components/payment/UnpaidScreen"
import Paid from "./Components/payment/Paid"
const AppContainer = createStackNavigator(
  {
    CoverScreen: CoverScreen,
    AuthScreen: AuthScreen,
    TabIndex: TabIndexes,
    ForgotOTP: ForgotOTP,
    Signup: Signup,
    Paid:Paid,
    PaymentScreen: PaymentScreen,
    PaymentScreenFirst: PaymentScreenFirst,
    PaidScreen: PaidScreen,
    //UnpaidScreen: UnpaidScreen,
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
