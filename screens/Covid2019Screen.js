import * as React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import global from '../global';



export default class Covid2019Screen extends React.Component{ 
    state = {
        type: "",
        id: 0,
        image: null,
        rec: null,

    }
    constructor(props) {
       
        super(props);
        var item = props.route.params['item'];
        this.state = {
            type: item.type,
            image: item.image,
            id: item.id,
        }
    }
    componentDidMount() {
        firebase.database().ref('covid/' + this.state.id).on('value', (snapshot) => {
            const rec = snapshot.val();
            this.setState({ rec: rec })
        });

    }
  render(){
    const { rec } = this.state;
    if (rec == null)
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
            </View>
        );
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>{rec.type}</Text>
<Image style={styles.eventImage}
                            source={{ uri: rec.image }}
                        />
      </View>
    );
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