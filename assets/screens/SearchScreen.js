// tela de listagem
import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import config from '../config';
import data from '../../assets/Coordinates.json';

const SearchScreen = ({ navigation }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [addedLocations, setAddedLocations] = useState([]);
    const placesAutocompleteRef = useRef(null);
  
    const handleSelectPress = (data, details) => {
      // extrai os dados do Google Places Autocomplete do ponto selecionado
      // testes para obter nome reduzido do local, latitude, longitude e endereço
      //
      // Obtem latitude e longite
      //const { geometry } = details;
      //const { location } = geometry;
      //const { lat, lng } = location;
      // Obtem nome reduzido do local
      //const shortName = data?.structured_formatting?.main_text;
      //const photoUrl = details?.photos?.[0]?.photo_reference;
      // Obtem endereço
      //const formattedAddress = details?.formatted_address;
      //console.log('Short Name:', shortName);
      //console.log('Formatted Address:', formattedAddress);
      //console.log('Photo URL:', photoUrl);
      //console.log('Latitude:', lat);
      //console.log('Longitude:', lng);
            setSelectedLocation({
        id: addedLocations.length + 1, // Gera um novo ID
        nome: data.description,
        latitude: lat, 
        longitude: lng,
        // não está funcionando - não exporta para o aruquivo coordinates.json
        // Adicionar outras propriedades conforme necessário
      });
    };
  
    const handleClearPress = () => {
      setSelectedLocation(null);
      placesAutocompleteRef.current?.setAddressText(''); // Limpa o texto do Google Autocomplete
    };
  
    const handleInsertPress = () => {
      if (selectedLocation) {
        // Adicione o novo local aos locais adicionados
        setAddedLocations([...addedLocations, selectedLocation]);
        // Limpa o local selecionado
        setSelectedLocation(null);
        // Limpa o texto do autocomplete
        placesAutocompleteRef.current?.setAddressText('');
        // Navega para a tela HomeScreen
        navigation.navigate('HomeScreen', {
          // Adicione os dados necessários para a tela HomeScreen
          newLocation: selectedLocation,
          existingLocations: addedLocations,
        });
      } else {
        Alert.alert('Erro', 'Nenhum local selecionado !');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.promptText}>Digite o local que está buscando...</Text>
        <View style={styles.autocompleteContainer}>
          <GooglePlacesAutocomplete
            ref={placesAutocompleteRef}
            placeholder=''
            onPress={handleSelectPress}
            query={{
              key: config.GoogleAPI,
              language: 'pt-br',
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                flex: 1,
                marginRight: 10,
              },
              description: {
                fontWeight: 'bold',
                color: '#333', // Cor do texto no modo claro
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              textInput: {
                color: '#333', // Cor do texto no modo claro
              },
            }}
          />
          <TouchableOpacity onPress={handleClearPress} style={styles.clearButton}>
            <Icon name="clear" size={24} color="#999" />
          </TouchableOpacity>
        </View>
        {selectedLocation && (
          <>
            <View style={styles.addedLocationsContainer}>
              <Text>Local Escolhido:</Text>
              <Text style={{ color: '#333' }}>{selectedLocation.nome}</Text>
            </View>
            <TouchableOpacity onPress={handleInsertPress} style={styles.insertButton}>
              <Text>Inserir nas Preferências</Text>
            </TouchableOpacity>
          </>
        )}
        {addedLocations.length > 0 && (
          <View style={styles.addedLocationsContainer}>
            <Text>Locais Adicionados:</Text>
            {addedLocations.map((location) => (
              <Text key={location.id}>{location.nome}</Text>
            ))}
          </View>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#f5f5f5', // Cor de fundo claro para o modo claro
    },
    autocompleteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    promptText: {
      color: '#333', // Cor do texto no modo claro
      marginBottom: 16,
    },
    clearButton: {
      padding: 10,
    },
    addedLocationsContainer: {
      marginTop: 16,
    },
    insertButton: {
      marginTop: 16,
      backgroundColor: 'orange',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
  });
  
  export default SearchScreen;