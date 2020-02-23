import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image, AsyncStorage  } from 'react-native';
import Header from "./header";
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, Card, List, Title } from 'react-native-paper';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';


export default class HomeScreen extends React.Component{
  state={
      info:{
          name:"loading !!",
          temp: "loading",
          humidity: "loading",
          desc: "loading",
          icon: "loading"
      },
      loading: true,
 
  }

  
  
  async getWeather(){
      var Mycity;
       Mycity = await AsyncStorage.getItem("selectedCity");
      
       if(!Mycity){
       Mycity=this.props.navigation.getParam('city','goa')
       }

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&APPID=14f80e4fa0bdf8e6166184b3c5a57edb`)
      .then(data=>data.json())
      .then(data2=>{
         // console.log(data2);
         this.setState({
              info:{
                name:data2.name,
                temp:data2.main.temp,
                humidity:data2.main.humidity,
                desc: data2.weather[0].description,
                icon: data2.weather[0].icon
              }
              
          })
          
      }).catch(err=>{
          Alert.alert("Error"+err.message+"Connect to Internet or WiFi",[{text:"OK"}])
      })
      
  }
 
async componentDidMount(){

    await Font.loadAsync({
        'FredokaOne_Regular': require('../assets/fonts/FredokaOne-Regular.ttf'),
        'Montserrat_Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        ...Ionicons.font,
      });
      this,this.setState({loading: false})
    this.getWeather();
}

  render(){
    if(this.props.navigation.getParam('city')){
        this.getWeather()
    }
  return (
    <View style={styles.container}>
     
      <Header title="Current Weather" />
      <Card style={{margin: 20, backgroundColor:"#30336b" }} >
                <View style={{padding:20, alignItems:'center'}} >
            <Title style={styles.text1}>{this.state.info.name}</Title>
            <Image  style={{width:120, height:120}}
                source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}}
             />
            <Title style={styles.text2} >TEMPERATURE : {this.state.info.temp} °C</Title>
            <Title style={styles.text2}>DESCRIPTION : {this.state.info.desc}</Title>
            <Title style={styles.text2}>HUMIDITY : {this.state.info.humidity}</Title>
           
        </View>    
        
      
   
      </Card>
      <Card >
      <LottieView style={styles.animationContainer} 
        source={require('../assets/animation.json')}
        autoPlay
        loop
      />
      </Card>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {

    backgroundColor: '#f4f4f4'
   },
   text1:{
       fontFamily : 'FredokaOne_Regular',
       textAlign: 'center',
       marginBottom: 15,
       color: '#00d2d3',
       fontSize: 30
   },
   text2:{
    fontFamily : 'Montserrat_Bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#48dbfb',
    fontSize: 20
},
animationContainer:{
paddingTop: 200,
backgroundColor:"#30336b"
}
});

// background-image: linear-gradient( 122.3deg,  rgba(111,71,133,1) 14.6%, rgba(232,129,166,1) 29.6%, rgba(237,237,183,1) 42.1%, rgba(244,166,215,1) 56.7%, rgba(154,219,232,1) 68.7%, rgba(238,226,159,1) 84.8% );