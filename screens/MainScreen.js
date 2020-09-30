import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MenuScreen from './MenuScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SerachScreen from './SerachScreen';
import processScreen from './process'
import { MaterialCommunityIcons, Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SymptomScreen from './SymptomScreen';
import TemperScreen from './TemperatureScreen'
import CheckOutScreen from './CheckOutScreen';
import historytemScreen from './HistorytemScreen';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

function SerachStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="SerachScreen"
        component={SerachScreen}
        options={{ headerShown: false}} />
      <HomeStack.Screen name="Symptom"
        component={SymptomScreen}
        options={{ headerShown: false }} />
         <HomeStack.Screen name="Temper"
        component={TemperScreen}
        options={{ headerShown: false }} />
          <HomeStack.Screen name="historyTemper"
        component={historytemScreen}
        options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function MenuStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="KKU COVID"
        component={MenuScreen}
        options={{ headerShown: false }} />
      <SettingsStack.Screen name="CheckOut"
        component={CheckOutScreen}
        options={{ headerShown: false }} />
        <SettingsStack.Screen name="Temper"
        component={TemperScreen}
        options={{ headerShown: false }} />
    </SettingsStack.Navigator>
  );
}

const ProcessStack = createStackNavigator();
function ProcessStackScreen(){
  return (
    <ProcessStack.Navigator>
      <ProcessStack.Screen name="GLOBAL"
        component={processScreen}
        options={{ headerShown: false }} />
    </ProcessStack.Navigator>
  );
}

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="SerachScreen"
    activeColor="#000"
    color="#000"
    inactiveColor="#2B7A78"
    style={{ backgroundColor: '#000' }}
  >
    <Tab.Screen
      name="Serach"
      component={SerachStackScreen}
      options={{
        tabBarLabel: 'หน้าหลัก',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
     <Tab.Screen
      name="Oop"
      component={ProcessStackScreen}
      options={{
        tabBarLabel: 'ผู้ติดเชื้อรอบโลก',
        tabBarIcon: ({ color }) => (
          <AntDesign name="earth" color={color} size={25} />
        ),
      }}
    />
    <Tab.Screen
      name="Location"
      component={MenuStackScreen}
      options={{
        tabBarLabel: 'เช็คอินล่าสุด',
        tabBarIcon: ({ color }) => (
          <Entypo name="location-pin" color={color} size={26} />
        ),
      }}
    />
   
  </Tab.Navigator >
);

export default MainTabScreen;



