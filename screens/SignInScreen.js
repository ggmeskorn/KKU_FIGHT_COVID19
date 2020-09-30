import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import global from "../global";
// icon สามารถเลือกได้ที่ 
// https://callstack.github.io/react-native-paper/icons.html
//

export default class SignInScreen extends React.Component {
  state = {
    email: "",
    password: "",
    // location :null
  }
  componentDidMount() {
    global.firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.props.navigation.navigate("KKU COVID");
        }
      }
    )
  }
  render() {
    return (
      <View style={styles.container} >
        <View style={styles.centers} >
          <Text resizeMode='contain'
            style={styles.hder}>KKU FIGHT
 </Text>
          <Text resizeMode='contain'
            style={styles.hderr}>

            COVID-19 </Text>
          <Image
          resizeMode = 'contain'
            source={require("../image/virus.png")}
            style={styles.h} />
        </View>
        <View style={styles.oop}>
          <TextInput
            style={styles.input1}
            label='Email'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            style={styles.input2}
            label='Password'
            value={this.state.password}
            secureTextEntry={true} autoCorrect={false}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View  
        style={styles.MainContainer}>
          <TouchableOpacity 
          style={styles.SugninStyle} activeOpacity={0.5} onPress={() => this.login()}>
            <Text  style={styles.TextStyles}> Sign In </Text>
          </TouchableOpacity>
        </View>
        <View 
        style={styles.conregister}>
          <Text style={styles.testregister}>Don’t have an account? </Text>
          <Text style={styles.buttonregister} activeOpacity={0.5} onPress={() => this.register()}>
            Sign up

</Text>
        </View>
      </View>
    );
  }
  async login() {
    try {
      await global.firebase.auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      );
    } catch (error) {
      alert(error);
    }
  }

  
  logout_pressed() {
    global.firebase.auth().signOut();
  }
  SignUp() {
    var { navigation } = this.props;
    navigation.navigate("Register");
  }
  async register() {
    try {
      await global.firebase.auth().createUserWithEmailAndPassword(
        this.state.email,
        this.state.password
      );
    } catch (error) {
      alert(error);
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
    paddingTop: 150,
  },
  testregister: {
    color: "#747474"
  },
  conregister: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 130,
    width: Dimensions.get('window').width / 2.0,
    height:Dimensions.get('window').height /2.0, 
    maxHeight: 200,
    maxWidth: 200
  },
  buttonregister: {
    flexDirection:'row',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
   
    width: Dimensions.get('window').width / 2.0,
    maxHeight: 200,
    maxWidth: 200
  },
  input1: {
    backgroundColor: '#fff',
  },
  input2: {
    backgroundColor: '#fff',

  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    paddingTop: "5%",
  },
  centers: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  SugninStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B7A78',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 266,
    marginTop: "10%",
    borderRadius: 5,
    margin: 5,
  },
  GooglePlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },

  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  RegisterStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7093B0',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  oop: {
    paddingTop: "5%",
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },

  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    paddingLeft: 15,
    marginRight: 20,
  },
  TextStyles: {
    color: '#fff',
    marginBottom: 4,
    fontSize: 16,
    // paddingLeft:50,
    // marginRight: 20,
  },
  h: {
    padding: 1,
    paddingLeft: 60,
    width: 120,
    height: 120,
    marginTop: "12%",
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2.0,
    // height:Dimensions.get('window').width /2.0,
    maxHeight: 200,
    maxWidth: 200
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  hder: {
    marginLeft: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    color: '#525252',
    marginTop: "-10%",
    width: Dimensions.get('window').width / 2.0,
    // height:Dimensions.get('window').width /2.0,
    maxHeight: 200,
    maxWidth: 200

  },
  hderr: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#525252',
    marginTop: "1%",
    marginLeft: 90,
    width: Dimensions.get('window').width / 2.0,
    // height:Dimensions.get('window').width /2.0,
    maxHeight: 200,
    maxWidth: 200
  },
});

