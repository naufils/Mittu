import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  AsyncStorage,
  StatusBar,
} from "react-native";
import Orientation from "react-native-orientation";

export default class CoverScreen extends React.Component {
  // state={
  //     top,
  //     bottom
  // }
  componentDidMount() {
    Orientation.lockToPortrait();

    setTimeout(() => {
      AsyncStorage.getItem("hometheaterToken", (err, token) => {
        if (err) {
          console.log("Error getting item", err);
        } else {
          if (token !== null) {
            this.props.navigation.navigate("TabIndex", { token });
          } else {
            this.props.navigation.navigate("AuthScreen");
          }
        }
      });

      // setTimeout(() => {
      //     this.setState({
      //         top:0
      //     },100)
      // })

      // setTimeout(() => {
      //     this.setState({
      //         bottom:0
      //     },100)
      // })
    }, 3000);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
        <StatusBar hidden={false} animated backgroundColor="#121212" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{ width: 230, height: 230 }}
            source={require("../../assets/CoverLogo.png")}
          />
        </View>
      </SafeAreaView>
    );
  }
}
