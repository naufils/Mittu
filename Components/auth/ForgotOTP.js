import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Platform,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import auth from "@react-native-firebase/auth";
const ForgotOTP = (props) => {
  return props.navigation.state.params.isOTP
    ? OTP(props.navigation.state.params.confirmation)
    : Forgot();
};

OTP = (confirm) => {
  const [otp, setOTP] = useState();
  const [error, setError] = useState();
  const [iserror, setisError] = useState(false);

  async function confirmCode() {
    try {
      await confirm.confirm(otp);
      setisError(false);
    } catch (error) {
      setisError(true);
      setError("Invalid code");
      console.log(error);
      console.log("Invalid code.");
    }
  }

  return (
    <View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "black",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "gray",
          alignSelf: "center",
          fontWeight: "bold",
          marginHorizontal: 100,
        }}
      >
        Please enter OTP received on your Mobile
      </Text>
      <Text
        style={{
          color: "gray",
          fontWeight: "bold",
          marginHorizontal: 100,
          marginTop: 50,
        }}
      >
        Enter OTP
      </Text>
      <OTPInputView
        style={{
          height: 20,
          marginTop: 20,
          marginHorizontal: 100,
        }}
        pinCount={6}
        codeInputFieldStyle={styles.underlineStyleBase}
        onCodeFilled={(code) => {
          setOTP(code);
        }}
      />
      {iserror ? (
        <Text style={{ color: "red", marginHorizontal: 100 }}>{error}</Text>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          confirmCode();
        }}
      >
        <Text
          style={{
            backgroundColor: "white",
            fontWeight: "bold",
            borderRadius: 10,
            textAlign: "center",
            marginHorizontal: 80,
            height: 50,
            textAlignVertical: "center",
            marginTop: 50,
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

Forgot = () => {
  const [email, setEmail] = useState();
  const [isemail, setIsEmail] = useState(false);

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setEmail(text);
      setIsEmail(false);
    } else {
      setEmail(text);
      setIsEmail(true);
    }
  };

  forgotPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        alert("Password reset email has been sent to your mail");
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  return (
    <View
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "black",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "gray",
          alignSelf: "center",
          fontWeight: "bold",
          marginHorizontal: 100,
        }}
      >
        Send password reset request
      </Text>
      <TextInput
        style={{
          fontWeight: "bold",
          marginHorizontal: 80,
          marginTop: 20,
          color: "white",
        }}
        onChangeText={(text) => {
          validate(text);
        }}
        placeholder="Enter Email"
        text
        placeholderTextColor="gray"
      />
      <View
        style={{ backgroundColor: "gray", height: 1, marginHorizontal: 80 }}
      />
      <TouchableOpacity
        onPress={() => {
          isemail ? forgotPassword() : null;
        }}
      >
        <Text
          style={{
            backgroundColor: "white",
            fontWeight: "bold",
            borderRadius: 10,
            textAlign: "center",
            marginHorizontal: 80,
            height: 50,
            textAlignVertical: "center",
            marginTop: 50,
          }}
        >
          Send Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default ForgotOTP;
