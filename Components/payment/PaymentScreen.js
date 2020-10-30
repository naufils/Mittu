import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  ToastAndroid,
  BackHandler,
  ActivityIndicator,
} from "react-native";

import config from "../../config";
import { StackActions, SafeAreaView } from "react-navigation";
import Icon from 'react-native-vector-icons/Feather';
import RazorpayCheckout from 'react-native-razorpay';

class PaymentScreen extends React.Component {
  state = {
    plan1:"plan_FubzToqy3J6meH",
    plan2:"plan_FubzToqy3J6meH",
    plan3:"plan_FubzToqy3J6meH",
    sel1:false,
    sel2:false,
    sel3:false,
    payment_id:false
  }
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

  reSave(){
    fetch(`${config.localhost_url}/confirmnsave`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: this.state.email, payment_id: this.state.payment_id })
    })
    .then((res)=>{
      if(res.success){
        this.props.navigation.navigate("TabIndex");
      }
    })
    .catch((err) => {
      alert(`Error: ${err} | ${error.description} why so?`);
    });
  }
  onPay(planId){
    AsyncStorage.getItem("hometheaterusername", (err, email)=>{
      this.setState({email:email})

      fetch(`${config.localhost_url}/paynsubscribe`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, planId: planId })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var options = {
        description: 'Subscription',
        currency: 'INR',
        key: 'rzp_test_NMgZi8ScAmUifN',
        amount: `${responseJson.amount}`,
        order_id: responseJson.orderId,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
        theme: {color: 'black'}
        }
        RazorpayCheckout.open(options).then((data) => {
          fetch(`${config.localhost_url}/confirmnsave`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, payment_id: data.razorpay_payment_id })
          })
          .then((response) => response.json())
          .then((result)=>{
            if(result.success){
              this.props.navigation.navigate("Paid");
            }
          })
          .catch((err)=>{
            alert(`'err'  ${err} | ${error.description}`);
          });
        })
        .catch((err) => {
          alert(`Error: ${err} | ${error.description}`);
        });
      })
      .catch((err)=>{
        alert(`Error: ${error.code} | ${error.description}`);
        console.log("err")
      })
    })
  }


  render() {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{flex: 1 ,padding:10, backgroundColor:"black"}}>
            <View style={{margin:20}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Text style={{color:"white", fontFamily:"Poppins-Light", paddingRight:20, paddingBottom:20}}><Icon name="chevron-left" size={15} color="white" /> Subscription</Text>
              </TouchableOpacity>
              <Text style={{color:"#42B649", fontFamily:"Poppins-Light", paddingBottom:20, textTransform:"uppercase"}}>Please subscribe to watch</Text>
              <Text style={{color:"white", fontFamily:"Poppins-Light", paddingRight:20, paddingBottom:20}}><Icon name="check" color="#42B649" /> Unlimited HD videos</Text>
              <Text style={{color:"white", fontFamily:"Poppins-Light", paddingRight:20, paddingBottom:20}}><Icon name="check" color="#42B649" /> Ad Free Content</Text>
              <View
                style={{
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1,
                }}
              />
              <Text style={{color:"white", fontFamily:"Poppins-Light", paddingTop:40, paddingBottom:40, fontSize:30, fontWeight:'bold'}}>Choose Your Plan</Text>
              <TouchableOpacity
                onPress={() => {

                  this.onPay(this.state.plan1);
                  this.setState({sel1:true});
                }}
              >
                <View
                  style={
                            this.state.sel1
                          ?
                            {
                              marginTop:10,
                              padding:25,
                              backgroundColor:"white",
                              borderRadius:10,
                              flexDirection: 'row',
                              borderWidth: 4,
                              borderColor:"#42B649"
                            }
                          :
                            {
                              marginTop:10,
                              padding:25,
                              backgroundColor:"white",
                              borderRadius:10,
                              flexDirection: 'row'
                            }
                          }
                >
                <View>
                  <Text style={{fontFamily:"Poppins-Light"}}>12 Months</Text>
                  <Text style={{fontFamily:"Poppins-Light", fontSize:11}}>Ad Free Unlimited Videos</Text>
                </View>
                <Text style={{fontFamily:"Poppins-Light", fontWeight:"bold", marginLeft: 'auto'}}>₹199</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({sel2:true});
                  this.onPay(this.state.plan2);
                }}
              >
                <View
                style={
                          this.state.sel2
                        ?
                          {
                            marginTop:10,
                            padding:25,
                            backgroundColor:"white",
                            borderRadius:10,
                            flexDirection: 'row',
                            borderWidth: 4,
                            borderColor:"#42B649"
                          }
                        :
                          {
                            marginTop:10,
                            padding:25,
                            backgroundColor:"white",
                            borderRadius:10,
                            flexDirection: 'row'
                          }
                        }
                >
                <View>
                  <Text style={{fontFamily:"Poppins-Light"}}>6 Months</Text>
                  <Text style={{fontFamily:"Poppins-Light", fontSize:11}}>Ad Free Unlimited Videos</Text>
                </View>
                <Text style={{fontFamily:"Poppins-Light", fontWeight:"bold", marginLeft: 'auto'}}>₹149</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({sel3:true});
                  this.onPay(this.state.plan3);
                }}
              >
                <View
                style={
                          this.state.sel3
                        ?
                          {
                            marginTop:10,
                            padding:25,
                            backgroundColor:"white",
                            borderRadius:10,
                            flexDirection: 'row',
                            borderWidth: 4,
                            borderColor:"#42B649"
                          }
                        :
                          {
                            marginTop:10,
                            padding:25,
                            backgroundColor:"white",
                            borderRadius:10,
                            flexDirection: 'row'
                          }
                        }
                >
                <View>
                  <Text style={{fontFamily:"Poppins-Light"}}>3 Months</Text>
                  <Text style={{fontFamily:"Poppins-Light", fontSize:11}}>Ad Free Unlimited Videos</Text>
                </View>
                <Text style={{fontFamily:"Poppins-Light", fontWeight:"bold", marginLeft: 'auto'}}>₹99</Text>
                </View>
              </TouchableOpacity>
              <Text style={{fontFamily:"Poppins-Light", color:"grey", marginTop:20, marginBottom:0, fontSize:12}}>Subscription Plans are One time purchase only</Text>
              <Text style={{fontFamily:"Poppins-Light", color:"grey", fontSize:12}}>We do not renew your subscription automatically</Text>
            </View>
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
export default PaymentScreen;
