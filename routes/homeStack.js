import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Home from "../screens/Home";
import Login from "../screens/Login";

const screens = {
  Login: {
    screen: Login,
  },
  Home: {
    screen: Home,
  },
};
const HomeStack = createSwitchNavigator(screens);

export default createAppContainer(HomeStack);
