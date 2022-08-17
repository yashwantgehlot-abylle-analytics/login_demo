import React, { Component } from "react";
import axios from "axios";
import {
  View,
  Text,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Home from "./Home";
export default class App extends Component {
  state = {
    username: "",
    password: "",
    auth_token: "",
  };
  Signup = async () => {
    AsyncStorage.removeItem("Token");
    AsyncStorage.clear;
    this.setState({ auth_token: "" });
    {
      /*

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


  */
    }
  };

  Login = async () => {
    //    console.log("Bearer " + AsyncStorage.getItem("Token"));
    AsyncStorage.getItem("Token", (err, item) => {
      console.log("TOK:" + item);
      axios
        .get(
          "http://vita.westus2.cloudapp.azure.com:8080/api/services/app/Profile/GetCurrentUserProfileForEdit",
          {
            headers: { Authorization: "Bearer " + item },
          }
        )
        .then((response) => {
          console.log(response.data);

          if (response.data.result == null) {
            Alert.alert("Error", "Error: " + response.data.error.message);
          } else {
            AsyncStorage.setItem("Token", response.data.result.accessToken);
            this.setState({ auth_token: response.data.result.accessToken });
            Alert.alert(
              response.data.result.emailAddress,
              "Welcome " +
                response.data.result.userName +
                " " +
                response.data.result.surname
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  render() {
    //If auth token is not present
    if (this.state.auth_token == "") {
      return (
        <View>
          <TouchableOpacity onPress={this.Signup.bind(this)}>
            <View
              style={{
                height: 50,
                marginTop: 200,
                backgroundColor: "purple",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#FFFFFF",
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.Login.bind(this)}>
            <View
              style={{
                height: 50,
                backgroundColor: "purple",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#FFFFFF",
                }}
              >
                Fetch Profile{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      /* Checking if the auth token is not empty directly sending the user to Home screen */
      return <App />;
    }
  }
}
