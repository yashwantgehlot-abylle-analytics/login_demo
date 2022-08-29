import React, { Component, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginComponent from "../components/LoginComponent";

export default function Login({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getLayout = async () => {
    const token = await AsyncStorage.getItem("Token");
    if (token !== null) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  };

  useEffect(() => {
    getLayout();
  });

  if (!isLoggedIn) {
    return <LoginComponent navigation={navigation} />;
  } else {
    return navigation.navigate("Home");
  }
}
