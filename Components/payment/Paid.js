import React from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from "react-native";

import { StackActions, SafeAreaView } from "react-navigation";
import Icon from 'react-native-vector-icons/Feather';

class Paid extends React.Component {

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  render() {

    return (
        <View style={{ flex: 1 , backgroundColor: "#121212", justifyContent: "center", alignItems: "center"}}>
            <View style={{justifyContent: "center", alignItems: "center", backgroundColor: "white", marginLeft:20, marginRight:20 , backgroundColor: "white", padding:20, borderRadius:20}}>
              <Icon name="check-circle" color="#42B649" size={45}/>
              <View style={{marginTop:20, marginBottom:20}}>
                <Text style={{fontFamily:"Poppins-Light", margin:"auto", textAlign:"center", fontWeight:"bold"}}>Payment Successful</Text>
                <Text style={{fontFamily:"Poppins-Light", textAlign:"center", margin:"auto"}}>Enjoy Unlimited Ad Free Videos for 12 months</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("HomeScreen");
                }}
              >
                <Text style={{margin:"auto", marginTop:20, fontFamily:"Poppins-Light", marginBottom:20}}>Continue <Icon name="chevron-right" color="#42B649"/></Text>
              </TouchableOpacity>
            </View>
        </View>
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
export default Paid;
