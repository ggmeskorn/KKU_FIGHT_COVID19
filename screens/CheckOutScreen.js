import * as React from 'react';
import { View, Text, Alert, Image, ScrollView ,TouchableOpacity} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import global from "../global";
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import moment from 'moment';

export default class CheckOutScreen extends React.Component {

  state = {
    icon: "hospital-o",
    location: "",
    timeout:"",
    timein:"",
    id: 0,
    rec: null
  }
  constructor(props) {
    super(props);

    var item = props.route.params['item'];
    this.state = {
      timein: item.timein,
      location: item.location,
      icon: item.icon,
      timeout :'',
      id: item.id,
    }
  }
  async componentDidMount() {
    var that = this;
    var date = moment()
      .utcOffset('GMT+7')
      .format('YYYY-MM-DD hh:mm:ss a');
    that.setState({ time: date });
  }
  save_press(){
    if(this.state.time.length==0){
      alert("Area Name cannot be empty.");
      return;
    }
      var uid = global.firebase.auth().currentUser.uid;
    global.firebase
    .database()
    .ref('qr/checkout/'+ uid).push(
      {
        id:this.state.id,
        icon: this.state.icon,
        location :this.state.location,
        timein :this.state.timein,
        timeout : this.state.time
      }
    );
    this.props.navigation.navigate("KKU COVID");
  }
  cancel_press(){
    this.props.navigation.navigate("KKU COVID");
  }
  Menureen() {
    var { navigation } = this.props;
    navigation.navigate("KKU COVID");
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 50, backgroundColor: "#fff" }}>
         <TouchableOpacity
            style={{
              backgroundColor: 'transparent'
            }}
            onPress={() => this.Menureen()}>
            <Ionicons
              name="ios-arrow-back"
              style={{ color: "#000", fontSize: 40 }}
            />
          </TouchableOpacity>
        <Text style={{ fontSize: 40 }}>กรุณาเช็คเอาท์</Text>
        <TextInput
          label=''
          value={this.state.id}
          onChangeText={id => this.setState({ id })}
          style={{ marginTop: 20, backgroundColor: "#fff" }} />
        <TextInput
          label='Location'
          value={this.state.location}
          onChangeText={location => this.setState({ location })}
          style={{ marginTop: 20, backgroundColor: "#fff" }} />
           <TextInput
          label='Time In'
          value={this.state.timein}
          onChangeText={timein => this.setState({ timein })}
          style={{ marginTop: 20, backgroundColor: "#fff" }} />
        <TextInput
          label='Time Out'
          value={this.state.time}
          onChangeText={timeout => this.setState({ timeout })}
          style={{ marginTop: 20, backgroundColor: "#fff" }} />
        <View style={{ flexDirection: "row", marginTop: 10 }}></View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>

          <Button onPress={() => this.save_press()}>Check Out</Button>
        </View>
      </View>
    );
  }
}