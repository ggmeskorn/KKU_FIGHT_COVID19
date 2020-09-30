import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, ScrollView, Linking, Animated, Platform, Dimensions } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import global from "../global";
import * as firebase from "firebase";
import imgcovid from '../imgcovid.json';
import { getThailandReport } from '../src/utils/apiFunction';
import moment from 'moment';
import i18n from '../src/i18n/i18n';


const colors = {
  themeColor: "#2B7A78",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3",
};

export default class MenuScreen extends React.Component {
  state = {
    data: [],
    sum: [],
    // CurrentUser:null,
    user: null,
    barcode: '',
    currentUser: null,
    uid: null,
    id:0
  };
  constructor(props) {
    super(props);
    // var item = props.route.params['item'];
    this.state = {
      location: '',
      uid: null,
      id: 0,
      user: null,
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      lastUpdate: '',
    }
  }
  componentDidMount() {
    global.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user })
      } else {
        this.props.navigation.navigate("SignIn");
      }
    }
    );
    getThailandReport().then(res => {
      this.setState({
        confirmed: res.confirmed.value,
        recovered: res.recovered.value,
        deaths: res.deaths.value,
        lastUpdate: moment.utc(res.lastUpdate).format(i18n.TIME_FORMAT),
      });
    });

  }
  userbox() {
    if (this.state.user) {
      return <View>
        <Text style={{ color: "#000", fontSize: 30, marginRight: 130, marginTop: -40 }}>{this.state.user.email}</Text>
      </View>
    }
  }
  render() {

    return (

      <View
        style={{
          flex: 1,
          backgroundColor: "#2B7A78",

        }}
      >
        <ScrollView>
          <View style={{ backgroundColor: "#2B7A78", marginTop: 70 }}>
            <View style={{ padding: 16 }}>
              <Button style={{ marginLeft: 270, marginTop: -40 }} activeOpacity={0.5} onPress={() => this.logout_pressed()}>Logout</Button>
              <View style={{
                backgroundColor: "#17A589",
                padding: 10,
                borderRadius: 15,
              }}>
                <Text style={{ color: "#fff", fontSize: 27, marginLeft: 10 }}>
                  {"ผู้ติดเชื้อในประเทศไทย\n"}
                </Text>
                <Text style={{ color: "#fff", fontSize: 16, marginLeft: 10, marginTop: -20 }}>
                  {i18n.THAILAND_REPORT.DATE_THAILAND_REPORT}{' '}
                  {this.state.lastUpdate}
                </Text>
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                  <View
                    style={{
                      height: 100,
                      width: 110,
                      backgroundColor: "#F1C40F",
                      borderRadius: 10,
                      margin: 5
                    }}
                  >
                    <Text style={{ marginTop: 12, color: "#fff", fontSize: 20, textAlign: 'center' }}>{'ผู้ติดเชื้อ\n\n'}{this.state.confirmed}</Text>
                  </View>
                  <View
                    style={{
                      height: 100,
                      width: 110,
                      backgroundColor: "#58D68D",
                      borderRadius: 10,
                      margin: 5

                    }}
                  >
                    <Text style={{ marginTop: 12, color: "#fff", fontSize: 20, textAlign: 'center' }}>{'หายแล้ว\n\n'}{this.state.recovered}</Text>

                  </View>
                  <View
                    style={{
                      height: 100,
                      width: 110,
                      backgroundColor: "#E74C3C",
                      borderRadius: 10,
                      margin: 5
                    }}
                  >
                    <Text style={{ marginTop: 12, color: "#fff", fontSize: 20, textAlign: 'center' }}>{'ผู้เสียชีวิต\n\n'}{this.state.deaths}</Text>

                  </View>
                </View>
                {/* </View> */}
                <View style={{ alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                  <TouchableOpacity style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#F08080",
                    borderWidth: 0.5,
                    borderColor: '#F08080',
                    height: 68,
                    width: 360,
                    borderRadius: 20,
                  }} activeOpacity={0.5} onPress={() => this.CheckIn()}>
                    <Image
                      source={require("../image/qr-code.png")}
                      style={{
                        width: 50,
                        height: 50,
                        marginLeft: 18,
                        marginTop: 2,
                      }}
                    />
                    <Text style={{
                      color: '#fff',
                      alignItems: 'center',
                      alignContent: 'center',
                      marginTop: 1,
                      marginLeft: 15,
                      fontWeight: 'bold',
                      fontSize: 27,
                    }}> เช็คอิน </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
                <TouchableOpacity style={{
                  // alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F2ECEC',
                  borderWidth: 1.5,
                  borderColor: '#fff',
                  height: 180,
                  width: 175,
                  borderRadius: 20,
                  margin: 5,
                }} activeOpacity={0.5} onPress={() => this.sym()}>
                  <Image
                    source={require("../image/medical-mask.png")}
                    style={{
                      alignSelf: 'center',
                      padding: 10,
                      margin: 5,
                      height: 105,
                      width: 105,
                      resizeMode: 'stretch',
                    }}
                  />
                  <Text style={{
                    textAlign: 'center',
                    color: '#000',
                    marginTop: 1,
                    // fontWeight: 'bold',
                    fontSize: 19,
                  }}> อุณหภูมิ/อาการ </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{

                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F2ECEC',
                  borderWidth: 1.5,
                  borderColor: '#fff',
                  height: 180,
                  width: 175,
                  borderRadius: 20,
                  margin: 5,
                }} activeOpacity={0.5} onPress={() => Linking.openURL('https://www.who.int/')}>
                  <Image
                    source={require("../image/who-emblem.png")}
                    style={{
                      alignSelf: 'center',
                      padding: 10,
                      margin: 5,
                      height: 105,
                      width: 105,
                      resizeMode: 'stretch',
                    }}
                  />
                  <Text style={{
                    color: '#000',
                    textAlign: 'center',
                    marginTop: 1,
                    fontSize: 19,
                  }}>  องค์การอนามัยโลก </Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => Linking.openURL('https://www.facebook.com/KKU-Fight-Covid-19-101077331719786/?eid=ARDlyL88ytP_tLz9xE-mqSFWxMqQDw-Y76G-LL2qduDCEr3xZLp8L4ToM2I5xcud2ktabjStS0SW8CUL')}>
              <Image
                source={require("../image/facebook.png")
                }
                style={styles.ImageIconStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.youtubeStyle} activeOpacity={0.5} onPress={() => Linking.openURL('https://www.youtube.com/channel/UCbewflo59uOdLGFUh71DPiQ')}>
              <Image
                source={require("../image/youtube.png")
                }
                style={styles.ImageIconStyle}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  renderItem(item) {
    return (
      <View style={styles.item}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.im}
        />
        <Text style={{ fontSize: 22, color: "#fff", marginTop: -200, marginLeft: 195, backgroundColor: "#F4B400", borderRadius: 10 }}>{item.type}</Text>
      </View>
    );
  }
  logout_pressed() {
    global.firebase.auth().signOut()
  }
  CheckIn(item) {
    var { navigation } = this.props;
    navigation.navigate("CheckIn", { item: item });
  }
  CheckOut(item) {
    var { navigation } = this.props;
    navigation.navigate("CheckOut", { item: item });
  }
  Temper() {
    var { navigation } = this.props;
    navigation.navigate("Temper");
  }
  sym() {
    var { navigation } = this.props;
    navigation.navigate("Symptom");
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 17,
    // alignItems: "center",
    // backgroundColor: '#66A78C',
  },
  item: {
    marginTop: 10,
    padding: 2,
    height: 42,
    alignItems: 'center',
  },
  SeparatorLine: {
    backgroundColor: '#000',
    marginLeft: 80,
    marginTop: -34,
    width: 1,
    height: 80,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 55,
    width: 55,
    resizeMode: 'stretch',
  },
  headertext: {
    fontSize: 18,
    color: "#000",
    alignItems: 'center',
    justifyContent: "center",
    fontWeight: 'bold',
    fontSize: 40,

    flexDirection: 'row',
  },
  FacebookStyle: {
    // width: 44,
    margin: 5,
    height: 65,
    width: 65,
    alignSelf: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    // marginTop: 5,
    // marginRight: 60,
    borderColor: '#485a96',
    borderRadius: 40,
    // margin: 5,// 
    resizeMode: 'contain'
  },
  youtubeStyle: {
    // width: 44,
    margin: 5,
    height: 65,
    width: 65,
    alignSelf: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#FF0000',
    borderWidth: 0.5,
    // marginTop: -45,
    // marginRight: -50,
    borderColor: '#FF0000',
    borderRadius: 40,
    // margin: 5,
  },
  im: {
    // width: 200,
    // height: 200,
    // width: width * 0.75,
    // height: width * 0.75,
    // resizeMode: 'contain',
    // marginLeft: 10,
    // borderRadius: 20,
    width: 240,
    height: 190,
    resizeMode: 'cover',
    borderRadius: 1,
    margin: 0,
    marginBottom: 10,
  },
});


//     width: 220,
//     borderRadius: 5,
//     margin: 5,
