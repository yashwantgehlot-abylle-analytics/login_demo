import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginComponent = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {});

  const navigateToHome = (response) => {
    console.log("inside navigate to home");

    navigation.navigate("Home");
    console.log("after navigate to home");
  };

  const login = async () => {
    axios
      .post(
        "http://vita.westus2.cloudapp.azure.com:8080/api/TokenAuth/Authenticate",
        {
          userNameOrEmailAddress: username,
          password: password,
        }
      )
      .then((response) => {
        console.log(response.data.result);

        if (response.data.result == null) {
          Alert.alert("Error", "Error: " + response.data.error.message);
        } else {
          console.log("in Else");

          AsyncStorage.setItem("Token", response.data.result.accessToken).then(
            () => {
              console.log("async storage set item inside");

              navigateToHome();
            }
          );
          console.log("outside async storage");

          //          Alert.alert("Welcome", " You have succesfully logged in");
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("Alert", " Invalid Credentials");
      });
  };

  const getLatestUsername = (TextInputValue) => {
    setUsername(TextInputValue);
  };
  const getLatestPassword = (TextInputValue) => {
    setPassword(TextInputValue);
  };

  return (
    <View
      style={{
        height: "100%",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "purple",
      }}
    >
      <TextInput
        placeholder="Enter User name"
        onChangeText={(TextInputValue) => getLatestUsername(TextInputValue)}
        underlineColorAndroid="transparent"
        style={{
          marginTop: 300,
          textAlign: "center",
          width: "90%",
          backgroundColor: "white",
          marginBottom: 7,

          height: 40,
          borderRadius: 5,
          fontSize: 20,
        }}
      />
      <TextInput
        placeholder="Enter password"
        onChangeText={(TextInputValue) => getLatestPassword(TextInputValue)}
        underlineColorAndroid="transparent"
        secureTextEntry={true}
        style={{
          textAlign: "center",
          width: "90%",
          backgroundColor: "white",
          marginBottom: 7,
          height: 40,
          borderRadius: 5,
          fontSize: 20,
        }}
      />
      <TouchableOpacity onPress={login}>
        <View
          style={{
            width: "90%",
            backgroundColor: "white",

            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              padding: 10,
              width: "90%",
              fontSize: 20,
              color: "purple",
            }}
          >
            Login{" "}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default LoginComponent;
