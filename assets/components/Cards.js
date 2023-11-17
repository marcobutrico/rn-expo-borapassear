// Cards.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Cards = ({ local, onPress }) => {
  const { id, nome, foto, endereco, coordenadas } = local;
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: foto }} style={styles.cardImage} />
        <View style={styles.overlay}>
            <Text style={styles.cardText}>{nome}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    cardContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      margin: 10,
      position: 'relative',
    },
    cardImage: {
      width: '100%',
      height: 200, // Ajuste conforme necessário
      resizeMode: 'cover',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end', // Alinhamento à esquerda
      alignItems: 'flex-end', // Alinhamento à esquerda
      flexDirection: 'row',
    },
    cardText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginRight: 10, // Ajuste conforme necessário
      textAlign: 'left', // Alinhar à esquerda
    },
  });
  
  export default Cards;