import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {View,Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';


export default function App() {

  const [gifs, setGifs] = useState([]);
  const [term, updateTerm] = useState('');
  
  async function fetchGifs1() {
    try {
      const API_KEY = 'N56M9CsP6Mub3rp88ytohLpVbgUwNZn9';
      const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
      const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${term}`);
      const res = await resJson.json();
      setGifs(res.data);
    } catch (error) {
      console.warn(error);
    }
  }
  function onEdit(newTerm) {
    updateTerm(newTerm);
    fetchGifs1();
    
  }

  return (
    <View style={styles.view}>
          <Text></Text>

    <Image source={require('./assets/dev-logo-lg.gif')} resizeMode='contain' style={styles.image1} />
      <TextInput
        placeholder="Please type to search Giphy..."
        placeholderTextColor='#fff'
        style={styles.textInput}
        onChangeText={(text) => onEdit(text)}
        
      />
      <FlatList
      
        data={gifs}
        renderItem={({item}) => (
          <Image
            resizeMode='contain'
            style={styles.image}
            source={{uri: item.images.original.url}}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#121212'
  },
  textInput: {
    width: '100%',
    height: 50,
    color: 'white'
  },
  image: {
    width: 300,
    height: 150,
    borderWidth: 3,
    marginBottom: 5
  },
  image1: {
    alignSelf:'auto',
    width: 300,
    height: 150,
    borderWidth: 3,
    marginBottom: 5
  },
  text1: {
    fontSize:30,
    fontFamily: 'Helvetica',
    color:'white',
  }
});