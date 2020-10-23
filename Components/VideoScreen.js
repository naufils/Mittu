import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  BackHandler,
  StatusBar,
} from "react-native";
import Orientation from "react-native-orientation";
import Video from "react-native-video-controls";
import {
  HideNavigationBar,
  ShowNavigationBar,
} from "react-native-navigation-bar-color";
import { AdMobInterstitial } from "react-native-admob";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class ProfileScreen extends PureComponent {
  componentDidMount() {
    console.log("Props in Video Screen", this.props);
    // this._videoRef.stopAsync()
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this._handleBackHandler
    );
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
    this.showInterstitialAd();
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
