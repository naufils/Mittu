import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  BackHandler,
  AsyncStorage,
  StatusBar,
} from "react-native";
import Orientation from "react-native-orientation";
import Video from "react-native-video-controls";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  HideNavigationBar,
  ShowNavigationBar,
} from "react-native-navigation-bar-color";
import { AdMobInterstitial } from "react-native-admob";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import config from '../config';



export default class ProfileScreen extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      show_ad:false,
      show_vd:true
    }
  }
  componentDidMount() {
    console.log("Props in Video Screen", this.props);
    // this._videoRef.stopAsync()
    AsyncStorage.getItem("hometheaterusername", (err, email)=>{

      fetch(`${config.localhost_url}/iwatched`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, video_url:this.props.navigation.state.params.video})
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          show_ad:responseJson.show_ad,
          show_vd:responseJson.show_vd
        })
        if(!responseJson.show_vd){
          this.props.navigation.navigate("PaymentScreen");
        }

      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show("Connection Error! Please try again", ToastAndroid.BOTTOM)
      });
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this._handleBackHandler
      );
    });
  }


  _handleBackHandler = () => {
    Orientation.lockToPortrait();
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this._handleBackHandler
    );
  }

  onEnterFullScreen = () => {
    Orientation.lockToLandscape();
    HideNavigationBar();
    // this._videoRef.playAsync();
  };

  onExitFullScreen = () => {
    Orientation.lockToPortrait();
    ShowNavigationBar();
    // this._videoRef.playAsync();
  };

  showInterstitialAd = () => {
    // Display an interstitial
    AdMobInterstitial.setAdUnitID("ca-app-pub-7756898445257106/4950927867");
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  };

  _onDidFinish = () => {
    Orientation.lockToPortrait();
    if(this.state.show_ad){
      this.showInterstitialAd();
    }
    ShowNavigationBar();
    this.props.navigation.goBack();
  };

  render() {
    console.log("Video", this.props.navigation.state.params.video);

    return (

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 1,
          backgroundColor: "#121212",
        }}
      >
        <StatusBar hidden={true} translucent backgroundColor="#121212" />

        {
          this.state.show_vd
          ?
          <Video
            ref={(ref) => (this._videoRef = ref)}
            source={{ uri: this.props.navigation.state.params.video }}
            style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
            navigator={this.props.navigator}
            onEnterFullscreen={() => this.onEnterFullScreen()}
            onExitFullscreen={() => this.onExitFullScreen()}
            onBack={() => this._onDidFinish()}
            onEnd={() => this._onDidFinish()}
            toggleResizeModeOnFullscreen={false}
            fullscreen={true}
            resizeMode="contain"
          />
          :
          <View style={{flex:1}}>
            <Text style={{color:"white", textAlign: "center", textAlignVertical: "center"}}>Your Free trial Expired.</Text>
            <Text style={{color:"white", textAlign: "center", textAlignVertical: "center"}}>Subscribe to one of our plans</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("PaymentScreen");
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  borderRadius: 10,
                  textAlign: "center",
                  marginHorizontal: 80,
                  height: 50,
                  textAlignVertical: "center",
                  marginTop: 20,
                  color: "gray",
                  borderColor: "gray",
                  borderWidth: 2,
                }}
              >
                View Plans
              </Text>
            </TouchableOpacity>
          </View>
        }
      </View>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#000000",
  },
  fitImageWithSize: {
    height: 100,
    width: 30,
  },
});
