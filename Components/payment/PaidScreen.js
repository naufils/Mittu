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
import config from "../../config";

import { StackActions, SafeAreaView } from "react-navigation";
import Icon from 'react-native-vector-icons/Feather';

class PaidScreen extends React.Component {

  state = {
    planB:'',
    planE:'',
    payId:'',
    amount:'',
    months:''
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    AsyncStorage.getItem("hometheaterusername", (err, email)=>{
      fetch(config.localhost_url + "/payInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:email}),
      })
      .then((res) => res.json())
      .then((resJson) => {
        if(resJson.unpaid){
          this.props.navigation.navigate("PaymentScreenFirst");
        } else {
          this.setState({
            planB:resJson.planB,
            planE:resJson.planE,
            payId:resJson.payId,
            amount:resJson.amount,
            months:resJson.months
          })
        }
      });
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  getParsedDate(strDate){
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  dd + "-" + mm + "-" + yyyy;
    return date.toString();
  }
  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  };

  render() {

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "#121212" }}>
        <View style={{ flex: 1 ,  marginTop:10, marginRight:20 }}>
          <ScrollView>
            <View style={{marginLeft:20}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Text style={{color:"white",fontFamily:"Poppins-Light", paddingBottom:20}}><Icon name="chevron-left" size={15} color="white" /> Subscription</Text>
              </TouchableOpacity>
              <View
              style={{
                  marginTop:40,
                  padding:25,
                  backgroundColor:"white",
                  borderRadius:10,
                  flexDirection: 'row',
                  borderWidth: 4,
                  borderColor:"#42B649"
                }}
                >
                <View>
                  <Text style={{fontFamily:"Poppins-Light"}}>{this.state.months} Months</Text>
                  <Text style={{fontFamily:"Poppins-Light", fontSize:11}}>Ad Free Unlimited Videos</Text>
                </View>
                <Text style={{fontFamily:"Poppins-Light", fontSize:18, fontWeight:"bold", marginLeft: 'auto'}}>₹{this.state.amount}</Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  marginTop:40,
                  marginBottom:20,
                }}
              />
              <Text style={{color:"white", fontSize:18, fontWeight:"bold", fontFamily:"Poppins-Light", paddingBottom:30}}>Subscription Details</Text>
              <Text style={{color:"white", fontSize:12, fontFamily:"Poppins-Light", paddingBottom:10}}>Valid Till <Text style={{fontWeight:"bold"}}>{this.getParsedDate(this.state.planE)}</Text></Text>
              <Text style={{color:"white", fontSize:12, fontFamily:"Poppins-Light", paddingBottom:10}}>Purchased On <Text style={{fontWeight:"bold"}}>{this.getParsedDate(this.state.planB)}</Text></Text>
              <Text style={{color:"white", fontSize:12, fontFamily:"Poppins-Light", paddingBottom:10}}>Payment ID <Text style={{fontWeight:"bold"}}>{this.state.payId}</Text></Text>

              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                  marginTop:10,
                  marginBottom:20,
                }}
              />
            </View>
            <Text style={{color:"white", fontSize:11, fontFamily:"Poppins-Light",paddingLeft:20, paddingBottom:10}}>For Queries, Complaints or Feedbacks please reach out to us at mittuapplication@gmail.com</Text>
          </ScrollView>
        </View>
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
export default PaidScreen;
