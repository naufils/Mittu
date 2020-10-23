import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { StackActions, SafeAreaView } from "react-navigation";
import { AdMobBanner } from "react-native-admob";

import config from "../../config";

class Movie extends React.Component {
  state = {
    renderItems: [],
    refresh: false,
    loading: false,
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    this.setState({
      renderItems: [],
      refresh: false,
      loading: true,
    });

    return fetch(config.localhost_url + "/fetch-movies", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Response Movie", res);
        if (res.data) {
          this.setState({
            renderItems: res.check,
            loading: false,
          });
        } else {
          this.setState({
            renderItems: [],
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  onPressImage = (item) => {
    const pushAction = StackActions.push({
      routeName: "VideoProfileScreen",
      params: {
        item,
      },
    });

    this.props.navigation.dispatch(pushAction);
  };

  onRefresh = () => {
    this.setState({ refresh: true });

    this.componentDidMount();

    setTimeout(() => {
      this.setState({ refresh: false });
    }, 2000);

    // wait(2000).then(() => this.setState({refresh:false}));
  };

  render() {
    console.log("Movie", this.state);

    let MoviesList = null;

    if (this.state.renderItems.length !== 0) {
      MoviesList = this.state.renderItems.map((item, i) => {
        console.log("Items in Movie", item);

        return (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#121212",
              marginBottom: 10,
              marginTop: 10,
            }}
            key={i}
          >
            <Text
              style={{
                padding: 7,
                color: "#42B649",
                fontFamily: "OpenSans-Bold",
                fontSize: 16,
              }}
            >
              {item[0].view_name}
            </Text>
            <ScrollView horizontal>
              <FlatList
                horizontal={true}
                data={item}
                renderItem={({ item, index, separators }) => (
                  <View
                    style={{
                      paddingLeft: 5,
                      paddingRight: 1,
                      marginTop: 1,
                      marginRight: 5,
                      flexDirection: "row",
                      width: 114,
                    }}
                    key={i}
                  >
                    <TouchableOpacity onPress={() => this.onPressImage(item)}>
                      <Image
                        style={{
                          width: 110,
                          height: 140,
                          backgroundColor: "grey",
                          borderWidth: 1,
                          borderRadius: 5,
                        }}
                        source={{ uri: item.vid_thumbs }}
                      />
                      <Text
                        style={{
                          fontFamily: "OpenSans-Regular",
                          width: 110,
                          color: "white",
                          flex: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {item.vid_name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </ScrollView>
          </View>
        );
      });
    }

    console.log("state", this.state);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
        <StatusBar hidden={false} animated backgroundColor="#121212" />
        {this.state.loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="#42B649" />
          </View>
        ) : null}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View style={{ flex: 1 }}>{MoviesList}</View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <AdMobBanner
              adSize="banner"
              adUnitID="ca-app-pub-7756898445257106/9371736210"
              onAdFailedToLoad={(error) => console.log(error)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default Movie;
