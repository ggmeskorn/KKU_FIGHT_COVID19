import * as React from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, Image, ScrollView, Switch, TouchableOpacity, } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import global from "../global";
import moment from 'moment';
import CheckboxFormX from 'react-native-checkbox-form';
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";



export default class AddScreen extends React.Component {
  state = {
    symtom: "",
    isEnabled1: false,
    isEnabled2: false,
    isEnabled3: false,
    isEnabled4: false,
    isEnabled5: false,
    isEnabled6: false,
    number: "",
    isSelected: false,
    times: "",

  };
  async componentDidMount() {
    var that = this;
    var date = moment()
      .utcOffset('GMT+7')
      .format('YYYY-MM-DD hh:mm:ss a');
    that.setState({ time: date });
  }

  toggleSwitch1 = (value) => {
    this.setState({ isEnabled1: value })
  }
  toggleSwitch2 = (value) => {
    this.setState({ isEnabled2: value })
  }
  toggleSwitch3 = (value) => {
    this.setState({ isEnabled3: value })
  }
  toggleSwitch4 = (value) => {
    this.setState({ isEnabled4: value })
  }
  toggleSwitch5 = (value) => {
    this.setState({ isEnabled5: value })
  }
  toggleSwitch6 = (value) => {
    this.setState({ isEnabled6: value })
  }

  save_press() {
    if (this.state.symtom.length == 0) {
      alert("กรุณากรอกข้อมูล.");
      return;
    }
    var uid = global.firebase.auth().currentUser.uid;
    global.firebase
      .database()
      .ref('qr/stmptom/' + uid).push(
        {
          symtom: this.state.symtom,
          sorethroat: this.state.isEnabled1,
          snot: this.state.isEnabled2,
          headache: this.state.isEnabled3,
          fever: this.state.isEnabled4,
          drycough: this.state.isEnabled5,
          areas: this.state.isEnabled6,
          number: this.state.number,
          times: this.state.time
        }
      );
    this.props.navigation.navigate("SerachScreen");
  }
  cancel_press() {
    this.props.navigation.navigate("SerachScreen");
  }
  _onSelect = (item) => {
    console.log(item);
  };
  Menureen() {
    var { navigation } = this.props;
    navigation.navigate("SerachScreen");
  }
  render() {

    // const [isSelected, setSelection] = useState(false);
    const { image } = this.state;
    return (
      <View style={{ flex: 1 }}>

        <TouchableOpacity
          style={{
            backgroundColor: 'transparent'
          }}
          onPress={() => this.Menureen()}>
          <Ionicons
            name="ios-arrow-back"
            style={{ color: "#000", fontSize: 40, marginLeft: 10, marginTop: 40 }}
          />

        </TouchableOpacity>
        <ScrollView>
          <View style={{}}>
            <Text style={{
              color: "#000", fontSize: 36, alignSelf: 'center', width: Dimensions.get('window').width / 2.0,
              // height:Dimensions.get('window').height /2.0, 
              maxHeight: 200,
              maxWidth: 200, marginLeft: 100
            }}>อุณหภูมิ</Text>
            <TextInput
              label='อุณหภูมิ'
              value={this.state.symtom}
              style={{ width: 250, alignSelf: "center" }}
              onChangeText={symtom => this.setState({ symtom })} />
            <Text style={{ color: "#000", fontSize: 36, alignSelf: 'center', marginTop: 4 }}>อาการ</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
              <Image
                source={require("../image/breathing.png")}
                style={{
                  // padding: 10,
                  margin: 10,

                  height: 55,
                  width: 55,
                  // resizeMode: 'stretch',
                }}
              />

              <Image
                source={require("../image/sneezing.png")}
                style={{
                  // padding: 10,
                  margin: 10,

                  height: 55,
                  width: 55,
                  // resizeMode: 'stretch',
                }}
              />
              <Image
                source={require("../image/pain.png")}
                style={{
                  // padding: 10,
                  margin: 10,
                  height: 55,
                  width: 55,
                  // resizeMode: 'stretch',
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: -10 }}>
              <Switch
                style={{ margin: 10, }}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.isEnabled1 ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch1}
                value={this.state.isEnabled1}
              />
              <Switch
                style={{ margin: 10 }}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch2}
                value={this.state.isEnabled2}
              />
              <Switch
                style={{ margin: 10 }}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.isEnabled3 ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch3}
                value={this.state.isEnabled3}
              />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: -20 }}>
              <Text style={{ margin: 15, }}>เจ็บคอ</Text>
              <Text style={{ margin: 15, }}>น้ำมูก</Text>
              <Text style={{ margin: 15, }}>ปวดหัว</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Image
                source={require("../image/fatigue.png")}
                style={{
                  // padding: 10,
                   margin: 10,

                  height: 55,
                  width: 55,
                  // resizeMode: 'stretch',
                }}
              />
              <Image
                source={require("../image/cough.png")}
                style={{
                  // padding: 10,
                   margin: 10,

                  height: 55,
                  width: 55,
                  // resizeMode: 'stretch',
                }}
              />
              <Image
                source={require("../image/allergy.png")}
                style={{
                  // padding: 10,
                   margin: 10,

                  height: 55,
                  width: 55,
                  // resizeMode: 'stretch',
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center' ,marginTop:-10}}>
              <Switch
                style={{  margin: 10,}}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.isEnabled4 ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch4}
                value={this.state.isEnabled4}
              />
              <Switch
                style={{  margin: 10,}}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.isEnabled5 ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch5}
                value={this.state.isEnabled5}
              />
              <Switch
                style={{  margin: 10,}}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={this.state.isEnabled6 ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch6}
                value={this.state.isEnabled6}
              />
            </View>
            <View style={{flexDirection:'row',alignSelf:'center',marginTop:-20,marginLeft:40}}>
            <Text style={{   margin: 15,}}>มีไข้</Text>
            <Text style={{  margin: 15,}}>ไอแห้งๆ</Text>
            <Text style={{   margin: 15,}}>ไปพื้นที่เสี่ยง</Text>
            </View>
              <TextInput
          label='เบอร์ติดต่อ'
          value={this.state.number}
          style={{ width: 250, alignSelf: "center" }}
          onChangeText={number => this.setState({ number })} />
            <View style={{ flexDirection: "row" ,alignSelf:'center',marginTop:10}}>
          <Button onPress={() => this.save_press()}>ตกลง</Button>
          <Button onPress={() => this.history()}>ประวัติ</Button>
          <Button onPress={() => this.cancel_press()}>ยกเลิก</Button>
        </View>

          </View>
        </ScrollView>
      </View>
    );
  }
history(){
  var { navigation } = this.props;
  navigation.navigate("historyTemper");

}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventImage: {
    width: 400, height: 350, margin: 10,
    borderRadius: 10,
  },
});