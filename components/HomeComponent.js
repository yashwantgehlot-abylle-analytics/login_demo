import React from "react";
import axios from "axios";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeComponent = ({ navigation }) => {
  const getProfile = async () => {
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

  const performLogout = async () => {
    AsyncStorage.removeItem("Token");
    AsyncStorage.clear;
    navigation.navigate("Login");
  };

  return (
    <View>
      <TouchableOpacity onPress={performLogout}>
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
      <TouchableOpacity onPress={getProfile}>
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
};
export default HomeComponent;
