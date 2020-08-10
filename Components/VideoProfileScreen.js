import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  BackHandler,
  Dimensions,
  StatusBar,
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import { StackActions, withNavigationFocus } from "react-navigation";
import PlayIcon from "./assests/img/PlayIcon.png";
import Header from "./Header/Header";
import { AdMobInterstitial } from "react-native-admob";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class VideoProfileScreen extends React.Component {
  showInterstitialAd = () => {
    // Display an interstitial
    AdMobInterstitial.setAdUnitID("ca-app-pub-4418546683602188/5488488688");
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  };

  constructor(props) {
    super(props);
    this.showInterstitialAd();
  }

  state = {
    VideoData: [],
    fontLoaded: false,
  };

  componentDidMount() {
    console.log("Props in Video Profile Screen", this.props);

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );

    // this.loadAssetsAsync()

    const { params } = this.props.navigation.state;
    console.log("params", params);
    this.setState({
      VideoData: params.item,
    });

    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleBackHandler);
  }

  // _handleBackHandler = () => {

  //   this.props.navigation.navigate('HomeScreen');
  //   return true;

  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this._handleBackHandler);
  // }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  onPressVideo = (video) => {
    const pushAction = StackActions.push({
      routeName: "VideoScreen",
      params: {
        video,
      },
    });

    this.props.navigation.dispatch(pushAction);
  };

  render() {
    console.log("state", this.state);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#121212",
        }}
      >
        <StatusBar hidden={false} animatedy backgroundColor="#121212" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
        >
          {/* <View style={{position:'absolute', flex:1, justifyContent:'flex-start', alignContent:'flex-start', height:30}}>
              <Header
                  headerName={''}
                  arrowTrue={true}
                  onClickArrow={this.onClickBack}

              />
          </View> */}
          <View style={styles.container}>
            <View style={{ padding: 0 }}>
              <TouchableOpacity
                onPress={() =>
                  this.onPressVideo(this.state.VideoData.vid_location)
                }
              >
                <Image
                  width={deviceWidth}
                  height={300}
                  source={{ uri: this.state.VideoData.vid_thumbs }}
                />
                <View
                  style={{
                    position: "absolute",
                    marginLeft: "43%",
                    marginTop: 90,
                  }}
                >
                  <Image
                    source={PlayIcon}
                    style={{ position: "absolute", opacity: 1 }}
                    width={70}
                    height={70}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ padding: 5 }}>
              <Text
                style={{
                  paddingBottom: 10,
                  paddingTop: 10,
                  fontFamily: "OpenSans-Bold",
                  fontSize: 16,
                  marginLeft: 10,
                  color: "white",
                }}
              >
                {this.state.VideoData.vid_name}
              </Text>
              {/* <Text style={{fontFamily:'OpenSans-Regular', fontSize:14, marginLeft:10, color:'#e3e3e3'}}>18+ | Series | 1 40 min </Text> */}
            </View>

            {/* <View style={{padding:5, flex:1, flexDirection:'row', justifyContent:'space-around'}}>
              <Text style={{padding:5, borderColor:'white',borderWidth:0.7, borderRadius:5, width:100, textAlign:'center', color:'white'}}>Watch trailer</Text>
              <Text style={{padding:5, borderColor:'white',borderWidth:0.7, borderRadius:5, width:100, textAlign:'center', color:'white'}}>Share</Text>
              <Text style={{padding:5, borderColor:'white',borderWidth:0.7, borderRadius:5, width:100, textAlign:'center', color:'white'}}>Watch later</Text>
            </View> */}

            <View
              style={{
                padding: 10,
                paddingLeft: 15,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: "white",
                }}
              >
                {this.state.VideoData.vid_desc}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "center",
    padding: 1,
  },
  linearGradient: {
    flex: 1,
    // paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});

export default withNavigationFocus(VideoProfileScreen);
