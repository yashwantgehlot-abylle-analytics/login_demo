import React, { Component, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeComponent from "../components/HomeComponent";

export default function Home({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  console.log("INSIDE HOME");

  const getLayout = async () => {
    const token = await AsyncStorage.getItem("Token");
    if (token !== null) {
      //setIsLoggedIn(true);
      console.log("Home Token True");
    } else {
      //setIsLoggedIn(false);
      console.log("Home Token False");
    }
  };

  useEffect(() => {
    getLayout();
  });

  if (isLoggedIn) {
    console.log("Logged In showing HomeComponent");

    return <HomeComponent navigation={navigation} />;
  } else {
    console.log("Not Logged in going back to login");

    return navigation.navigate("Login");
  }
}
