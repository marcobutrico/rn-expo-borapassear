// Tela de mapa
import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import data from '../../assets/Coordinates.json';

const HomeScreen = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const navigation = useNavigation();
  const theme = useTheme();

  const initialRegion = {
    latitude: -23.550520,
    longitude: -46.633308,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  };

  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === 'granted') {
          const location = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
            (newLocation) => {
              const { latitude, longitude } = newLocation.coords;
              setUserLocation({ latitude, longitude });
              handleMapZoomAndMarkers([...data.map((local) => local.coordenadas), { latitude, longitude }]);
            }
          );
        } else {
          handleMapZoomAndMarkers(data.map((local) => local.coordenadas));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLocationPermission();

    return () => {
      if (userLocation) {
        userLocation.remove();
      }
    };
  }, []);

  const handleMapZoomAndMarkers = (coordinates) => {
    if (mapRef.current && coordinates.length > 0) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  const handleMarkerPress = (local) => {
    const { id, nome } = local;
    // Vai para a DetailScreen
    navigation.navigate('DetailScreen', { itemId: id });
  };
  
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {data.map((local) => (
          <Marker
            key={local.id}
            coordinate={local.coordenadas}
            title={local.nome}
            description={local.endereco}
            pinColor={theme.dark ? 'black' : 'red'} // Cor do marcador ajustada ao tema
            onPress={() => handleMarkerPress(local)}
          />
        ))}

        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Você está aqui!"
            pinColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen;
