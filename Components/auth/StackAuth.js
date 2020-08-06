import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Platform,
  View,
  Text,
  Image,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";
// import Login from "./Login";
// import Signup from "./Signup";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "react-native-google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk";

const AuthScreen = (props) => {
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [text, setText] = useState();
  const [pass, setPass] = useState();
  const [error, setError] = useState();
  const [isError, setIsError] = useState(false);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (user !== null) {
      console.log(user._user.displayName);
      AsyncStorage.setItem("hometheaterToken", user._user.uid);
      if (user._user.displayName !== null)
        AsyncStorage.setItem("hometheaterusername", user._user.displayName);
      else if (user._user.email !== null)
        AsyncStorage.setItem("hometheaterusername", user._user.email);
      else if (user._user.phoneNumber !== null)
        AsyncStorage.setItem("hometheaterusername", user._user.phoneNumber);

      props.navigation.navigate("TabIndex", { token: user._user.uid });
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  GoogleSignin.configure({
    webClientId:
      "1046486934392-dkmg6pjnjpk9e4egpb8lf2h6a79notf3.apps.googleusercontent.com",
  });

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);

    if (result.isCancelled) {
      console.log("User cancelled the login process");
    }

    console.log(result);

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    console.log(data);

    if (!data) {
      console.log("Something went wrong obtaining access token");
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber(text);
    props.navigation.navigate("ForgotOTP", {
      isOTP: true,
      confirmation: confirmation,
    });
  }
  async function signInWithEmail() {
    auth().signInWithEmailAndPassword(text, pass);
  }
  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      setIsEmail(false);
      validatePhone(text);
    } else {
      setIsEmail(true);
    }
  };

  validatePhone = (text) => {
    let reg = /^(\+)+(?:[0-9]+)$/;
    if (reg.test(text) !== false) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
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
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: "hidden",
            alignSelf: "center",
            marginTop: 50,
          }}
        />
        <Text
          style={{
            color: "gray",
            marginTop: 20,
            alignSelf: "center",
            fontWeight: "bold",
          }}
        >
          Signin with
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center",
            justifyContent: "space-evenly",
            marginHorizontal: 100,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onFacebookButtonPress().then(() => {
                this.props.navigation.navigate("TabIndex");
              });
            }}
          >
            <View
              style={{
                backgroundColor: "#3F86E2",
                width: 80,
                height: 80,
                borderRadius: 50,
                justifyContent: "center",
              }}
            >
              <FontAwesome
                name="facebook-f"
                color="white"
                size={20}
                style={{ alignSelf: "center" }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onGoogleButtonPress().then(() => {
                this.props.navigation.navigate("TabIndex");
              });
            }}
          >
            <View
              style={{
                backgroundColor: "#E23F3F",
                width: 80,
                height: 80,
                borderRadius: 50,
                justifyContent: "center",
              }}
            >
              <FontAwesome
                name="google"
                color="white"
                size={20}
                style={{ alignSelf: "center" }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: "gray",
            marginTop: 20,
            alignSelf: "center",
            fontWeight: "bold",
          }}
        >
          or
        </Text>
        <TextInput
          placeholder="Email/Phone"
          text
          placeholderTextColor="gray"
          style={{
            fontWeight: "bold",
            marginHorizontal: 80,
            marginTop: 50,
            color: "white",
          }}
          onChangeText={(text) => {
            setText(text);
            validate(text);
          }}
        />
        <View
          style={{ backgroundColor: "gray", height: 1, marginHorizontal: 80 }}
        />
        {isError ? (
          <Text style={{ color: "red", marginHorizontal: 80 }}>{error}</Text>
        ) : null}
        {isEmail ? (
          <>
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              style={{
                fontWeight: "bold",
                marginHorizontal: 80,
                marginTop: 20,
                color: "white",
              }}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPass(text);
              }}
            />
            <View
              style={{
                backgroundColor: "gray",
                height: 1,
                marginHorizontal: 80,
              }}
            />
          </>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ForgotOTP", { isOTP: false });
          }}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 10,
              marginLeft: 80,
              marginTop: 20,
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("\n\nPHONE");
            console.log(!isEmail && !isNaN(text));
            console.log("\nISNAN");
            console.log(isNaN(text));
            console.log("\nEMAIL");
            console.log(!isPhone && isEmail);
            console.log(isPhone + " " + isEmail);

            !isEmail && !isNaN(text)
              ? isPhone
                ? (signInWithPhoneNumber(), setIsError(false))
                : (setError("Please enter valid phone with +"),
                  setIsError(true))
              : !isPhone && isEmail
              ? (signInWithEmail(), setIsError(false))
              : (setError("Please enter valid email"), setIsError(true));

            // isPhone && !Nan
            //   ? text != null
            //     ? signInWithPhoneNumber()
            //     : (setIsError(true),
            //       setError("Please enter valid phone number with +"))
            //   : text != null && pass != null
            //   ? signInWithEmail()
            //   : (setIsError(true), setError("Please enter valid email"));
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
              marginTop: 20,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Signup");
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
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
