// Tela de Listagem
import React from 'react';
import { View, FlatList } from 'react-native';
import Cards from '../components/Cards';
import data from '../../assets/Coordinates.json';

const ListScreen = ({ navigation }) => {
  const handleCardPress = (id) => {
    // Navega para a tela de detalhes e passa o ID do item clicado
    navigation.navigate('DetailScreen', { itemId: id });
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Cards local={item} onPress={() => handleCardPress(item.id)} />
        )}
      />
    </View>
  );
};

export default ListScreen;
