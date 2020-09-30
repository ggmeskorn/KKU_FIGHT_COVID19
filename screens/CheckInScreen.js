import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { MaterialCommunityIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import moment from 'moment';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    // scanned: false,
    location: false,
    user: null,
    status:false,
    numberstudent: "",
    icon: "hospital-o",
    // location: "",
    timein: "",
    id: 0,
    rec: null

  };

 

  async componentDidMount() {
    var that = this;
    var date = moment()
      .utcOffset('GMT+7')
      .format('YYYY-MM-DD hh:mm:ss a');
    that.setState({ time: date });
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, location } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={location ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent'
            }}
            onPress={() => this.Menureen()}>
            <Ionicons
              name="ios-arrow-back"
              style={{ color: "#fff", fontSize: 40 }}
            />
          </TouchableOpacity>
        </View>
        {location && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ location: '0' })}
          />
        )}
      </View>
    );
  }
  Menureen() {
    var { navigation } = this.props;
   
    navigation.navigate("Serach");
  }
  handleBarCodeScanned = ({ data, item, location,user }) => {
    this.setState({ location: true });
    if (this.state.location.length )
    
    // alert(`${data} `);
    {
      return;
    }
    var uid = 
    global.firebase.auth().currentUser.uid;
    global.firebase
      .database()
      .ref('qr/checkin/' + uid).push({
        location: data,
        timein: this.state.time,
        icon: this.state.icon,
      }
      );
      this.props.navigation.navigate("Location");
            // this.props.navigation.dispatch(
      //   NavigationActions.navigate({ routeName: "Login" })
      //  );

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
  
}



