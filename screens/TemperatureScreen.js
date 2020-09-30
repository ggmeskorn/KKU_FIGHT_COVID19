import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, StatusBar, Dimensions, TouchableHighlight, Image, FlatList, ScrollView, Animated, Platform } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons, AntDesign ,Ionicons} from "@expo/vector-icons";
import global from "../global";
import * as firebase from "firebase";

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
    id: 0,
    uid: null
  };
  constructor(props) {

    super(props);
    //  var item = props.route.params['item'];
    this.state = {
      location: '',
      // id: id,
      user: null,
      uid: null
    }
  }
  componentDidMount() {
    global.firebase.auth().onAuthStateChanged((user) => {
      // setCurrentUser(user);
      if (user) {
        // var user = firebase.auth().currentUser.uid; 
        this.setState({ user: user })
      } else {
        this.props.navigation.navigate("SignIn");
      }
    }
    );
    // db.collection("cities").where("capital", "==", true)
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
    // if(this.state.user != null)
    var uid =
      global.firebase.auth().currentUser.uid;
    global.firebase
      .database()
      .ref('qr/checkout/').child(uid)
      .once('value', snapshot => {
        var v = snapshot.val();
        var data = [];
        var x = 0;
        for (var i in v) {
          v[i].index = x; x++;
          v[i].id = i;
          data.push(v[i]);
        }
        this.setState({
          data: data,
        });
      });

  }
  render() {
    return (

      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,

        }}
      >
        <TouchableOpacity
            style={{
              backgroundColor: 'transparent'
            }}
            onPress={() => this.Menureen()}>
            <Ionicons
              name="ios-arrow-back"
              style={{ color: "#000", fontSize: 40,marginTop:35,marginLeft:20 }}
            />
          </TouchableOpacity>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            backgroundColor: colors.background,
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf:"center"
          }}
        >
          <Text style={{ fontSize: 24,textAlign:'center',marginTop:-80 }}>ประวัติการเช็คอิน</Text>



        </View>

        <ScrollView
          style={{
            backgroundColor: colors.background,
          }}
        >
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
          />

        </ScrollView>

      </View>
    );
  }
  renderItem(item) {
    return (
      <View
        style={{
          backgroundColor: colors.white,
          flexDirection: "row",
          marginHorizontal: 16,
          marginVertical: 4,
          borderRadius: 20,
          paddingVertical: 20,
          paddingHorizontal: 24,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome
            name={item.icon}
            size={30}
            style={{ color: "#fed132", marginRight: 5 }}
          />
          <View style={{flexDirection:"row"}}>
            <Text style={{ fontSize: 16 }}>{item.location}
            </Text>
            </View>
            <View style={{marginLeft:20}}>
            <Text style={{ color: "#000" }}>เช็คอิน:    {item.timein}</Text>
            <Text style={{ color: "#000"}}>เช็คเอาท์: {item.timeout}</Text>
          </View>
        </View>
      </View>
    );
  }
  Symptom() {
    var { navigation } = this.props;
    navigation.navigate("Process");
  }
  Menureen() {
    var { navigation } = this.props;
   
    navigation.navigate("KKU COVID");
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 17,
    // alignItems: "center",
    // backgroundColor: '#66A78C',
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
  headertext: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: "center",
    fontWeight: 'bold',
    fontSize: 40,
    flexDirection: 'row',
  },
  im: {
    // width: 200,
    // height: 200,
    // width: width * 0.75,
    // height: width * 0.75,
    // resizeMode: 'contain',
    // marginLeft: 10,
    // borderRadius: 20,
    width: 140,
    height: 140,
    resizeMode: 'cover',
    borderRadius: 1,
    margin: 0,
    marginBottom: 10,
  },
  item: {
    marginTop: 10,
    padding: 2,
    height: 42,
    alignItems: 'center',
  },
  buttonqr: {
    color: '#fff',
    padding: 40,
    alignItems: 'center',
    width: 220,
    height: 30,
    backgroundColor: "#2B7A78",
    paddingTop: -10,

  },
  input1: {
    backgroundColor: '#f4f6fc',
    width: 360,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  input2: {
    backgroundColor: '#f4f6fc',
    width: 360,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  input3: {
    backgroundColor: '#f4f6fc',
    width: 360,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  MainNews: {
    backgroundColor: '#4285F4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 45,
    width: 258,
    marginLeft: "-8%",
    marginTop: "-7%",
    borderRadius: 0,
    margin: 5,
  },
  maintext: {
    flex: 1,
    alignItems: "center",
    marginTop: "-13%",
    marginRight: "-10%",
  },
  TextStyles2: {
    color: '#fff',
    marginTop: 90,
    marginLeft: -80,
    fontWeight: 'bold',
    fontSize: 16,
  },
  TextStyles5: {
    color: '#fff',
    alignContent: 'center',
    marginTop: 1,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 27,
  },
  TextStylesmain: {
    color: '#fff',
    marginTop: -114,
    // alignContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: -110,
    fontWeight: 'bold',
    fontSize: 30,
  },
  TextStylesmain2: {
    color: '#fff',
    marginTop: -50,
    // alignContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: -107,
    fontWeight: 'bold',
    fontSize: 30,
  },
  TextStyles: {
    color: '#fff',
    alignContent: 'center',
    marginTop: 4,
    marginLeft: 2,
    fontWeight: 'bold',
    fontSize: 14,
  },
  col1: {
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginTop: -130,
    fontSize: 30,
  },
  TextStyles0: {
    color: '#000',
    marginRight: 150,
    paddingTop: 70,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 30,
  },
  TextStyles1: {
    color: '#000',
    marginTop: 90,
    marginLeft: -70,
    fontWeight: 'bold',
    fontSize: 16,
  },
  temperatureStyle: {
    backgroundColor: '#F4B400',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 120,
    width: 120,
    marginRight: 175,
    marginTop: "-58%",
    borderRadius: 5,
    margin: 5,
  },
  symptomStyle: {
    backgroundColor: '#DB4437',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 120,
    width: 120,
    marginLeft: 105,
    marginTop: "-35%",
    borderRadius: 5,
    margin: 5,
  },
  styletemandsymptom: {
    alignItems: 'center',
    marginLeft: 45,
    margin: 10,
    marginTop: "10%",
  },
  CheckInStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
    marginLeft: 30,
    backgroundColor: '#81E76E',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 68,
    width: 360,

    borderRadius: 35,
  },
  CheckOutStyle: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#E59866',

    borderWidth: 0.5,
    borderColor: '#fff',
    height: 30,
    width: 60,

    borderRadius: 20,
    margin: 5,
  },
  MainCheckContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 50,
    margin: 10,
    marginTop: "5%",
  },
  TractorStyle: {
    flexDirection: 'row',
    marginTop: 120,

    backgroundColor: "#44443A",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  SpareStyle: {
    // marginTop:"20%",
    // backgroundColor: "#000",
    marginTop: -10,
    // borderRadius: 5,
    // borderWidth: 0.5,
    // bordercolor: '#fff',
  },
  ImageIconStyle: {

    width: 50,
    height: 50,
    marginLeft: 18,
    marginTop: 2,

  },
  ImageIconStyles: {

    width: 80,
    height: 80,
    marginRight: 10,
    marginTop: "3%",

  },
  ImageIconStylesymptom: {

    width: 80,
    height: 80,
    marginLeft: 6,
    marginTop: "-14%",

  },
  ImageIconStyletem: {

    width: 80,
    height: 80,
    marginLeft: -20,
    marginTop: "-14%",

  },
  h: {
    padding: 1,
    paddingLeft: 60,
    width: 415,
    height: 240,
    flexDirection: 'row',
  },
});

// RegisterStyle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#7093B0',
//     borderWidth: 0.5,
//     borderColor: '#fff',
//     height: 40,
//     width: 220,
//     borderRadius: 5,
//     margin: 5,
