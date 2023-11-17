// Tela de detalhes
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import data from '../../assets/Coordinates.json'; // Importa os dados do arquivo Coordinates.json


const DetailScreen = ({ route }) => {

  const theme = useTheme();
  const navigation = useNavigation();
  const { itemId } = route.params;
  const selectedItem = data.find((item) => item.id === itemId);

  if (!selectedItem) {
    return (
      <View style={styles.container}>
        <Text>Local não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={{ uri: selectedItem.foto }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{selectedItem.nome}</Text>
        <Text style={[styles.address, { color: theme.colors.text }]}>{selectedItem.endereco}</Text>
        {/* Adicione aqui qualquer outro detalhe que você queira exibir */}
      </View>
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300, // Ajuste o tamanho conforme necessário
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 18,
    marginBottom: 8,
  },
  coordinates: {
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
});

export default DetailScreen;