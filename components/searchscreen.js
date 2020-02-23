import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import Header from "./header";
import { TextInput, Card, List, Button } from 'react-native-paper';



export default class SearchScreen extends React.Component{
  state = {
    text: '',
    cities:[],
  };

  async buttonclick(){
      this.props.navigation.navigate('Current City',{city:this.state.text})
      await AsyncStorage.setItem("selectedCity",this.state.text )
  }

  async listclicked(name){
    this.setState({
        text:name
    })
    await AsyncStorage.setItem("selectedCity",this.state.text )
    this.props.navigation.navigate('Current City',{city:this.state.text})
  }

  fetchCities(text){
    console.log(text)
    this.setState({ text })
    fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
    .then(data=>data.json())
    .then(city=>{
      this.setState({
        cities:city.RESULTS.slice(0,9)
      })
    })
    console.log(this.state.cities);
  }
  render(){
    renderCity=<Card><List.Item title="No city selected" /></Card>
    
    if(this.state.cities.length>0){
      renderCity=this.state.cities.map(city=>{
        return (
          <Card style={{margin: 5}} key={city.lat} onPress={()=>this.listclicked(city.name)}>
            <List.Item title={city.name} />
          </Card>
        )
      })
    }
  return (
    <View style={styles.container}>
      <Header title="Select City" />
      <TextInput
        style={{borderColor: '#576574'}}
        label='Enter City Name'
        value={this.state.text}
        onChangeText={text => this.fetchCities(text)}
      />
      <Button  mode="contained" style={{margin:20, backgroundColor: '#576574'}} onPress={() => this.buttonclick()}>
        Save City
      </Button>
    
      <ScrollView>
        {renderCity}
      </ScrollView>

 

    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
   },
  
});
