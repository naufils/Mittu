import React, { useState } from "react";
import {
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import auth from "@react-native-firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState();
  const [isemail, setIsEmail] = useState(false);
  const [isErrorEnabled, setErrorEnabled] = useState(false);
  const [password, setPassword] = useState();
  const [verifypassword, setVerifyPassword] = useState();
  const [error, setError] = useState();

  CreateAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth().currentUseruser.sendEmailVerification();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setErrorEnabled(true);
          setError("User with email already exists");
        }

        if (error.code === "auth/invalid-email") {
          setErrorEnabled(true);
          setError("Invalid email");
        }
      });
  };

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setIsEmail(false);
      setEmail(text);
    } else {
      setEmail(text);
      setIsEmail(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enabled
    >
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          backgroundColor: "black",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 0,
            height: 0,
            borderRadius: 50,
            overflow: "hidden",
            alignSelf: "center",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="Email"
          text
          placeholderTextColor="gray"
          style={{
            fontWeight: "bold",
            marginHorizontal: 80,
            marginTop: 50,
            color: "white",
          }}
          onChangeText={(text) => {
            validate(text);
          }}
        />
        <View
          style={{ backgroundColor: "gray", height: 1, marginHorizontal: 80 }}
        />
        <TextInput
          placeholder="Password"
          text
          placeholderTextColor="gray"
          style={{
            fontWeight: "bold",
            marginHorizontal: 80,
            marginTop: 50,
            color: "white",
          }}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
        <View
          style={{ backgroundColor: "gray", height: 1, marginHorizontal: 80 }}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          style={{
            fontWeight: "bold",
            marginHorizontal: 80,
            marginTop: 50,
            color: "white",
          }}
          onChangeText={(text) => {
            setVerifyPassword(text);
          }}
          secureTextEntry={true}
        />
        <View
          style={{ backgroundColor: "gray", height: 1, marginHorizontal: 80 }}
        />
        {isErrorEnabled ? (
          <Text
            style={{
              color: "red",
              marginHorizontal: 80,
              marginTop: 10,
            }}
          >
            {error}
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            if (password === verifypassword && isemail) {
              setErrorEnabled(false);
              CreateAccount();
            } else if (password !== verifypassword) {
              setErrorEnabled(true);
              setError("Passwords Don't Match");
            } else if (!isemail) {
              setErrorEnabled(true);
              setError("Please Enter Valid Email");
            } else {
              setErrorEnabled(true);
              setError("Please Try Again");
            }
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
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
