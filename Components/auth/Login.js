import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, ToastAndroid, AsyncStorage,BackHandler, KeyboardAvoidingView, StatusBar } from 'react-native';
import {TextField} from 'react-native-material-textfield';
import { withNavigationFocus } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';


class LoginScreen extends React.Component {

  state = {
    email:'',
    password:'',
    emailValid: false,
    passwordValid: false,
    userDetails:[]
  }

  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }
 handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }



  onEmailChanged = (value) => {
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim())){
      this.setState({
        email: value,
        emailValid: true
      })
    } else {
      this.setState({
        email: value,
        emailValid: false
      })
    }
  }


  onPasswordChanged = (value) => {
    this.setState({
      password: value,
      passwordValid: true
    })
  }

  onPressSubmit = () => {

    let login_data={
      email: this.state.email,
      pass: this.state.password
    }

    if(this.state.email.trim() === ''){
      alert("Please enter Email Address")
    } else if(!this.state.emailValid){
      alert("Please enter valid Email Address")
    } else if(this.state.password.trim() === ''){
      alert("Please enter Password")
    } else {

        fetch(config.localhost_url+'/login',{
          method: 'POST',
          headers: {
              // 'x-Auth':this.props.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(login_data)
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if(responseJson.data){
            if(responseJson.match){
              this.setState({
                userDetails:responseJson.result,
                email:'',
                password:''
              })

              let token=responseJson.token
              let userDetails=responseJson.result[0].users_id;

              AsyncStorage.setItem("hometheaterUser", userDetails);

              AsyncStorage.setItem("hometheaterToken", token);

              this.props.navigation.navigate('TabIndex', {userDetails})
              ToastAndroid.show("Logged In Successfullyy", ToastAndroid.BOTTOM)
            } else {
                this.setState({
                  userDetails:[]
                })
              alert("Email Address/Password is incorrect")
            }

          } else {
            if(responseJson.dbError){

              this.setState({
                userDetails:[]
              })

              ToastAndroid.show("Internal Error! Please try again", ToastAndroid.LONG)
            } else {
              this.setState({
                userDetails:[]
              })

              alert("Email not found! Please Sign Up")
            }

          }
        })
        .catch(err => {
          console.log(err)
          ToastAndroid.show("Connection Error! Please try again", ToastAndroid.BOTTOM)
        })

      }
  }

    render() {

      console.log("State", this.state);
      console.log("Props", this.props);

      return (
        <SafeAreaView style={{flex:1}}>
          <StatusBar hidden={false} animated backgroundColor="#121212"/>
          <KeyboardAvoidingView style={{flex:1}}>

        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow:1, flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:'black'}}>

            <View style={{flexDirection:'column', padding:10, paddingBottom:20}}>
              {/* <Text style={{fontSize: 18,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            textAlign: 'left',
                            color: '#eeeeee',
                            paddingBottom:5
                            }}>Email</Text> */}

              <TextField
                onChangeText={this.onEmailChanged}
                label="Email Address"
                value={this.state.email}
                lineWidth={2}
                tintColor="white"
                baseColor="white"
                textColor="white"
                containerStyle={{width:300, height: 50}}
              />

            </View>
            <View style={{justifyContent:'space-between', flexDirection:'row', padding:10, paddingBottom:20}}>
                <View>

                    <TextField
                      onChangeText={this.onPasswordChanged}
                      label="Password"
                      value={this.state.password}
                      lineWidth={2}
                      tintColor="white"
                      baseColor="white"
                      textColor="white"
                      containerStyle={{width:300, height: 50}}
                      secureTextEntry={this.state.showPassword ? false : true}
                    />

                </View>

                    {this.state.showPassword ?
                      <View style={{marginTop:40, right:20, position:'absolute'}}>
                        <TouchableOpacity onPress={() => this.setState({showPassword: false})}>
                          <Ionicons name="md-eye-off" color="#ebebeb" size={25}/>
                        </TouchableOpacity>
                      </View>
                    :
                      <View style={{marginTop:40, right:20, position:'absolute'}}>
                        <TouchableOpacity onPress={() => this.setState({showPassword: true})}>
                          <Ionicons name="md-eye" color="#ebebeb" size={25}/>
                        </TouchableOpacity>
                      </View>
                    }
            </View>

            <View style={{padding:20}}>
              <TouchableOpacity onPress={() => this.onPressSubmit()}>
                <LinearGradient colors={['#F9A818', '#F9A818']} style={{width: 300,
                              height: 50,
                              borderRadius: 8,
                              justifyContent:'center'
                              }}>


                                <Text
                                  style={{width: 100,
                                    fontFamily:'OpenSans-Regular',
                                      fontSize: 18,
                                      fontWeight: '500',
                                      fontStyle: 'normal',
                                      alignSelf:'center',
                                      color: 'black'}} 
                                >LOGIN</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  }

  const styles = StyleSheet.create({
      container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'black',
      }
  })

  export default withNavigationFocus(LoginScreen);
