/* Aplicativo em React Native
   Bora passear
   Versão inicial
   por Marco A. Butrico
   em 17/11/2023
   
   Infet - MIT Desnvolvimento Mobile
*/

// impports
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeAppEventEmitter, SafeAreaView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FAB, Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';

// Importa as telas de uso 
// Tela do mapa
import HomeScreen    from './assets/screens/HomeScreen';
// Tela de listagem
import ListScreen    from './assets/screens/ListScreen';
// Tela de perfil
import ProfileScreen from './assets/screens/ProfileScreen';
// Tela de buscas
import SearchScreen  from './assets/screens/SearchScreen';
// Tela de detalhes - não aparece no bottom tabs mas ela é usada para mostrar os detalhes do markers ou item da lista clicada
import DetailScreen    from './assets/screens/DetailScreen';

const Tab = createBottomTabNavigator();

// Função para criar um tema personalizado baseado no DefaultTheme
const createCustomDefaultTheme = () => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',  // Cor primária no modo claro
    accent: 'yellow',  // Cor de destaque no modo claro
    background: 'white',  // Cor de fundo no modo claro
    surface: 'lightgrey',  // Cor da superfície no modo claro
    text: 'black',  // Cor do texto no modo claro
  },
});

// Função para criar um tema personalizado baseado no DarkTheme
const createCustomDarkTheme = () => ({
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'orange',  // Cor primária no modo escuro
    accent: 'yellow',  // Cor de destaque no modo escuro
    background: 'black',  // Cor de fundo no modo escuro
    surface: 'darkgrey',  // Cor da superfície no modo escuro
    text: 'white',  // Cor do texto no modo escuro
  },
});

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const theme = isDarkTheme ? createCustomDarkTheme() : createCustomDefaultTheme();

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };
  return (
    //Implementa PaperProvider
    <PaperProvider theme={theme}>
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, marginTop: 24 }}>
          <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            // Definição dos ícones em função do estado de cada um
            if (route.name === 'Home') {
              iconName = focused ? 'map' : 'home';
            } else if (route.name === 'Listagem') {
              iconName = focused ? 'view-list' : 'list';
            } else if (route.name === 'Busca') {
              iconName = focused ? 'location-on' : 'location-searching';
            } else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Icon name={iconName} size={32} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'darkblue',
          inactiveTintColor: 'gray',
        }}
      >
        {/* Stacks */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Listagem" component={ListScreen} />
        <Tab.Screen name="Busca" component={SearchScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
        <Tab.Screen name="DetailScreen" component={DetailScreen}   
             //A tela não aparecerá no bottom bar, mas ela faz parte da navegabilidade entre as telas
            options={{
            tabBarButton: () => null, // Remove o botão da barra de navegação
            headerShown: false, // Oculta o cabeçalho da tela
    }}
  />
    </Tab.Navigator>
         {/* Floating Action Button - FAB - para alternar entre os temas */}
         <FAB
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 60,  // Ajuste a posição conforme necessário para evitar a sobreposição
            backgroundColor: isDarkTheme ? '#212121' : 'orange',  // Cor de fundo do botão
          }}
          icon={({ color, size }) => (
            <Icon name={isDarkTheme ? 'brightness-5' : 'brightness-3'} size={size} color={color} />
          )}
          onPress={toggleTheme}
          color={isDarkTheme ? 'white' : '#212121'}  // Cor do texto
        />
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;