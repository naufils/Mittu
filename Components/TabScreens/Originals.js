import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  RefreshControl,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { StackActions, SafeAreaView } from "react-navigation";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { AdMobBanner } from "react-native-admob";
import config from "../../config";

const DEVICE_WIDTH = Dimensions.get("window").width;

class Featured extends React.Component {
  _scrollRef = React.createRef();

  state = {
    renderItems: [],
    carouselItems: [],
    selectedIndex: 0,
    refresh: false,
    loading: false,
  };

  componentDidMount() {
    console.log("DEVICE_WIDTH", DEVICE_WIDTH);

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );

    this.setState({
      renderItems: [],
      carouselItems: [],
      selectedIndex: 0,
      refresh: false,
      loading: true,
    });

    // setInterval(() => {
    //   this.setState(prevState => ({selectedIndex: prevState.selectedIndex + 1}),
    //   () => {
    //     if(this.state.carouselItems.length !==0){
    //       this._scrollRef.current.scrollTo({
    //         animated: true,
    //         y:0,
    //         x: DEVICE_WIDTH * this.state.selectedIndex
    //       })
    //     }
    //   })
    // }, 3000)

    fetch(config.localhost_url + "/all-features-fetch", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          renderItems: res.check,
          carouselItems: res.check[0],
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  }

  onRefresh = () => {
    this.setState({ refresh: true });

    this.componentDidMount();

    setTimeout(() => {
      this.setState({ refresh: false });
    }, 2000);

    // wait(2000).then(() => this.setState({refresh:false}));
  };

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

  setSelectedIndex = (event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const selectedIndex = Math.floor(contentOffset / viewSize);
    this.setState({ selectedIndex });
  };

  _renderItem = (item) => {
    // console.log("Item", item)
    return (
      <View
        style={{
          paddingTop: 0,
          paddingRight: 5.2,
          paddingLeft: 6.3,
          paddingBottom: 1,
          width: DEVICE_WIDTH,
        }}
        key={item.index}
      >
        <TouchableOpacity onPress={() => this.onPressImage(item.item)}>
          <Image
            style={{
              width: "100%",
              height: 215,
              borderRadius: 3,
              backgroundColor: "grey",
            }}
            source={{ uri: item.item.vid_thumbs }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let featuredList = null;
    let featname = null;

    if (this.state.renderItems.length !== 0) {
      let featureFilter = this.state.renderItems.map((item) =>
        item.filter((item1) => item1.feature_name !== "Carousel")
      );
      // console.log("featureFilter",featureFilter)

      featuredList = featureFilter.map((item, i) => {
        // let featureName= item.filter(item => item.feature_name !== "Carousel")
        item.map((feat) => (featname = feat.feature_name));

        return (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#121212",
              marginBottom: 10,
              marginTop: 1,
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
              {featname}
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
                      flexDirection: "row",
                      marginRight: 5,
                      width: 140,
                    }}
                    key={index}
                  >
                    <TouchableOpacity onPress={() => this.onPressImage(item)}>
                      <Image
                        style={{
                          width: 140,
                          height: 78,
                          borderRadius: 2,
                          backgroundColor: "#121212",
                        }}
                        source={{ uri: item.vid_thumbs }}
                      />
                      <Text
                        style={{
                          fontFamily: "OpenSans-Regular",
                          width: 140,
                          color: "white",
                          flex: 1,
                          flexWrap: "wrap",
                          paddingTop: 5,
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

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#121212",
        }}
      >
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
          <View style={{ flex: 1, paddingTop: 10 }}>
            <View>
              <Carousel
                ref={(ref) => (this._carousel = ref)}
                data={this.state.carouselItems}
                renderItem={(carousel) => this._renderItem(carousel)}
                sliderWidth={DEVICE_WIDTH}
                itemWidth={DEVICE_WIDTH}
                loop={true}
                enableMomentum={false}
                autoplay={true}
                autoplayDelay={4000}
                autoplayInterval={4000}
                firstItem={0}
                onBeforeSnapToItem={(slideIndex) =>
                  console.log("slideIndex", slideIndex)
                }
              />

              {/* {this.pagination} */}
            </View>
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
            {featuredList}
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
export default Featured;
