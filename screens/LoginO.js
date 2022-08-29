import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import axios from "axios";
import {
  View,
  Text,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Home from "./Home";
export default class Login extends Component {
  state = {
    username: "",
    password: "",
    auth_token: "",
  };

  Signup = async () => {
    fetch("https://auth.clustername+.hasura-app.io/v1/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider: "username",
        data: {
          username: this.state.username,
          password: this.state.password,
        },
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (typeof res.message != "undefined") {
          Alert.alert("Error signing up", "Error: " + res.message);
        } else {
          this.setState({ auth_token: res.auth_token });
          Alert.alert("Success", "You have succesfully signed up");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  Login = async () => {
    axios
      .post(
        "http://vita.westus2.cloudapp.azure.com:8080/api/TokenAuth/Authenticate",
        {
          userNameOrEmailAddress: this.state.username,
          password: this.state.password,
        }
      )
      .then((response) => {
        console.log(response.data.result);

        if (response.data.result == null) {
          Alert.alert("Error", "Error: " + response.data.error.message);
        } else {
          AsyncStorage.setItem("Token", response.data.result.accessToken);
          this.setState({ auth_token: response.data.result.accessToken });
          Alert.alert("Welcome", " You have succesfully logged in");
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert("Alert", " Invalid Credentials");
      });
  };

  render() {
    var isLogin = false;
    //If auth token is not present

    //  if (
    //this.state.auth_token == "" &&
    //this.state.auth_token == null &&
    //isLogin == false

    // AsyncStorage.getItem("Token", (err, item) => {
    //  console.log("TOK:" + item);
    //  if (item != null) isLogin = true;
    //      this.setState({ auth_token: item });
    // });

    if (this.state.auth_token == "") {
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
            onChangeText={(TextInputValue) =>
              this.setState({ username: TextInputValue })
            }
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
            onChangeText={(TextInputValue) =>
              this.setState({ password: TextInputValue })
            }
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
          <TouchableOpacity onPress={this.Login.bind(this)}>
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
    } else {
      /* Checking if the auth token is not empty directly sending the user to Home screen */
      return this.props.navigation.navigate("Home");
    }
  }
}
