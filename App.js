import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SignInScreen from './screens/SignInScreen';
import MainScreen from './screens/MainScreen';
import CheckInScreen from './screens/CheckInScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import SymptomScreen from './screens/SymptomScreen';
import Covid2019Screen from './screens/Covid2019Screen';
import TemperatureScreen from './screens/TemperatureScreen';
import SignupScreen from './screens/SignUpScreen';
import ProcessScreen from './screens/process';
import historytemScreen from './screens/HistorytemScreen';
import global from './global';
import SerachScreen from './screens/SerachScreen';

console.disableYellowBox = true;

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


export default class App extends React.Component {
  state = {
    logined: false,
    user: null,
  };

  componentDidMount() {
    global.app = this;
  }
  render() {

    if (global.config['apiKey'] == undefined) {
      return <ErrorConfig />;
    }
    var screen = "SignIn";
    //if(this.state.logined) screen = "Home";   

    screen = "KKU COVID";
    return (
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName={screen}>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="KKU COVID"
            component={MainScreen}
            options={{ title: "KKU FIGHT COVID-19 ", headerShown: false }}
          />
          <Stack.Screen
            name="MENUCHECK"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SerachScreen"
            component={SerachScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CheckIn"
            component={CheckInScreen}
            options={{ title: "เช็คอิน", headerShown: false }}
          />
          <Stack.Screen
            name="CheckOut"
            component={CheckOutScreen}
            options={{ title: "เช็คเอาท์", headerShown: false }}
          />
          <Stack.Screen
            name="Symptom"
            component={SymptomScreen}
            options={{ title: "อุณหภูมิ " , headerShown: false}}
          />
          <Stack.Screen
            name="Temper"
            component={TemperatureScreen}
            options={{ title: "อาการ" }}
          />
          <Stack.Screen
            name="Covid"
            component={Covid2019Screen}
            options={{ title: "สถานการณ์" }}
          />
          <Stack.Screen
            name="Register"
            component={SignupScreen}
            options={{
              title: "Sign Up",
              headerShown: false
            }}
          />
           <Stack.Screen
            name="historys"
            component={historytemScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

function ErrorConfig() {

  return (<View style={{ marginTop: 100, backgroundColor: "#FAA", padding: 40 }}>
    <Text>Please setup Firebase config in global.js</Text>
  </View>);
}
