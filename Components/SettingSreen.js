import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage,
  StatusBar,
} from "react-native";
import config from "../config";
import { StackActions } from "react-navigation";
import auth from "@react-native-firebase/auth";

class SettingScreen extends React.Component {
  state = {
    user_details: [],
    user_name: "",
  };

  componentDidMount() {
    AsyncStorage.getItem("hometheaterToken", (err, token) => {
      if (err) {
        console.log("Error getting item", err);
      } else {
        if (token !== null) {
          console.log(token);

          let data = {
            token: token,
          };

          fetch(config.localhost_url + "/user_details", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((resJson) => {
              console.log("resJson", resJson);
              if (resJson.data) {
                this.setState({
                  user_details: resJson.result,
                });
              } else {
                if (resJson.dbError) {
                  ToastAndroid.show(
                    "Internal server error!",
                    ToastAndroid.SHORT
                  );
                } else {
                  ToastAndroid.show(
                    "Data not found!, Please try again",
                    ToastAndroid.SHORT
                  );
                }
              }
            })
            .catch((err) => {
              console.log(err);
              ToastAndroid.show("Server error!", ToastAndroid.SHORT);
            });
        } else {
          this.props.navigation.navigate("AuthScreen");
        }
      }
    });

    AsyncStorage.getItem("hometheaterusername", (err, result) => {
      console.log(err);
      console.log(result);
      if (result !== null)
        this.setState({
          user_name: result,
        });
    });
  }

  onPressSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));

    this.setState({
      user_id: "",
    });

    AsyncStorage.removeItem("hometheaterToken", (err, token) => {
      if (err) {
        console.log("Error getting item", err);
      } else {
        ToastAndroid.show("Signed Out Successfully", ToastAndroid.BOTTOM);
        this.props.navigation.navigate("AuthScreen");
      }
    });
  };


  onPressAbout = () => {
    const pushAction = StackActions.push({
      routeName: "Subscription",
    });

    this.props.navigation.dispatch(pushAction);
  };

  onPressAbout = () => {
    const pushAction = StackActions.push({
      routeName: "About",
    });

    this.props.navigation.dispatch(pushAction);
  };

  onPressPrivacy = () => {
    const pushAction = StackActions.push({
      routeName: "Privacy",
    });

    this.props.navigation.dispatch(pushAction);
  };

  onPressRefund = () => {
    const pushAction = StackActions.push({
      routeName: "Refund",
    });

    this.props.navigation.dispatch(pushAction);
  };
  render() {
    console.log("State", this.state);

    let user;

    if (this.state.user_details.length !== 0) {
      user = this.state.user_details[0].users_name;
    } else if (this.state.user_name !== null) {
      user = this.state.user_name;
    } else {
      user = "user";
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={false} animated backgroundColor="#121212" />
        <Text style={styles.header}>Settings</Text>

        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.text}>Signed in as</Text>
            <Text style={styles.textDecor}>{user}</Text>
          </View>

          {/* <View style={styles.innerContainer}>
                  <Text style={styles.text}>Video Streaming Settings</Text>
                  <Text style={styles.textDecor}>480p</Text>
                </View> */}

          {/*<View style={styles.innerContainer}>
                <Text style={styles.text}>Notifications</Text>
              </View>


              {/* <View style={styles.innerContainer}>
                <Text style={styles.text}>Clear Search History</Text>
              </View> */}

          {/*<View style={styles.innerContainer}>
                <Text style={styles.text}>Contact Us</Text>
              </View>*/}
              

              <View style={styles.innerContainer}>
            <Text style={styles.text} onPress={() => this.onPressSubscription()}>
              Subscription
            </Text>
          </View>
          
          <View style={styles.innerContainer}>
            <Text style={styles.text} onPress={() => this.onPressAbout()}>
              About
            </Text>
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.text} onPress={() => this.onPressPrivacy()}>
              Privacy Policy
            </Text>
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.text} onPress={() => this.onPressRefund()}>
              Refund Policy
            </Text>
          </View>

          {/*<View style={styles.innerContainer}>
                <Text style={styles.text}>Help</Text>
              </View>*/}

          <View style={styles.innerContainer}>
            <TouchableOpacity onPress={() => this.onPressSignOut()}>
              <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  header: {
    color: "white",
    marginTop: 20,
    fontFamily: "OpenSans-Medium",
    fontSize: 20,
    fontFamily: "OpenSans-Medium",
  },
  outerContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
    marginTop: 40,
    // borderWidth:2,
    // borderColor:'red'
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: 15,
    borderWidth: 1,
    // borderColor:'green',
    borderColor: "#121212",
    borderBottomColor: "#b8b8b8",
    fontFamily: "OpenSans-Regular",
  },
  text: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    color: "white",
    padding: 5,
  },
  textDecor: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    padding: 5,
    color: "#d1d1d1",
  },
});

export default SettingScreen;
