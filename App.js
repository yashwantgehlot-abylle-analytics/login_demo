import React, { Component } from "react";
import Navigator from "./routes/homeStack";

import {
  View,
  Text,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class App extends Component {
  render() {
    return <Navigator />;
  }
}
