import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SignUpScreen extends React.Component{ 
  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text activeOpacity={0.5} onPress={() => this.back()}>Sign Up Screen</Text>
      </View>
    );
  }
  back() {
    var { navigation } = this.props;
    navigation.navigate("SignIn");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});