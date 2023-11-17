// Tela de perfil
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useTheme } from 'react-native-paper';


const ProfileScreen = () => {
  const theme = useTheme();

    // Dados de usuária fictício para exemplo 
    const user = {
      // dados do usuário e qtde de pontos da lista
      name: 'Luciana',
      age: 30,
      // falta implementar busca automática da quantidade de ponto do coordinates.json
      qty: 2,
      photoUrl: 'https://th.bing.com/th/id/OIP.Veptdsbe60M3oMebj_1Y-gHaMV?pid=ImgDet&w=194&h=323&c=7', 
    };
  
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: user.photoUrl }} />
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {user.name}
        </Text>
        <Text style={[styles.age, { color: theme.colors.text }]}>
          {`Idade: ${user.age}`}
        </Text>
        <Text style={[styles.age, { color: theme.colors.text }]}>
          {`Lugares a visitar: ${user.qty}`}
        </Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 250,
      height: 250,
      borderRadius: 50,
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    age: {
      fontSize: 18,
    },
  });
  
  export default ProfileScreen;