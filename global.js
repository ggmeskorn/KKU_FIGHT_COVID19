import * as firebase from "firebase";
import 'firebase/storage';
import {DarkTheme, DefaultTheme} from 'react-native-paper';

const firebaseConfig = {
   apiKey: "AIzaSyDPxca8S30EAXDhd6jGasCfsOuG6qKJBAM",
   authDomain: "kkucovid19-9ae87.firebaseapp.com",
   databaseURL: "https://kkucovid19-9ae87.firebaseio.com",
   projectId: "kkucovid19-9ae87",
   storageBucket: "kkucovid19-9ae87.appspot.com",
   messagingSenderId: "625262373924",
   appId: "1:625262373924:web:42534f3e5f2b8f33fefcb1",
   measurementId: "G-CKCC1J8MPV"
 };
 
  // Initialize Firebase

 if(firebaseConfig.apiKey != undefined && !firebase.inited ){    
    firebase.initializeApp(firebaseConfig);  
    firebase.inited = true;
 }
//  const storage = firebase.storage();
//  export{
//     storage, firebase as default
//  }



const theme = {
  dark: false,
  colors: {
          primary: '#fff',
          accent: '#fff',
          background: '#E5E5E5',
          surface : '#777',
          text: '#000',
          card: '#2B7A78',
          border : '#000',
    },    
}   


global.app = null;
global.firebase = firebase, 
global.theme = theme, 
global.config = firebaseConfig, 

global.comma = function(num){
   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default global;