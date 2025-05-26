import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define navigation param list for TypeScript
type RootStackParamList = {
  Login: undefined;
  PropertyDetails: { propertyId: string };
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Define location type
type Location = {
  id: string;
  name: string;
  address: string;
  price: string;
  latitude: number;
  longitude: number;
};

// Mock initial data (replace with actual data source if needed)
const initialLocations: Location[] = [
  { id: '1', name: 'Cozy Apartment', address: '123 Main St, City', price: '$250,000', latitude: 37.7749, longitude: -122.4194 },
  { id: '2', name: 'Modern Villa', address: '456 Oak Ave, Town', price: '$450,000', latitude: 37.7849, longitude: -122.4294 },
];

const SavedLocation = () => {
  const navigation = useNavigation<NavigationProp>();
  const [savedLocations, setSavedLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load saved locations from AsyncStorage on mount
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const storedLocations = await AsyncStorage.getItem('savedLocations');
        if (storedLocations) {
          setSavedLocations(JSON.parse(storedLocations));
        } else {
          // Initialize with mock data if no stored locations
          setSavedLocations(initialLocations);
          await AsyncStorage.setItem('savedLocations', JSON.stringify(initialLocations));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load saved locations');
      }
    };
    loadLocations();
  }, []);

  // Save locations to AsyncStorage when they change
  useEffect(() => {
    const saveLocations = async () => {
      try {
        await AsyncStorage.setItem('savedLocations', JSON.stringify(savedLocations));
      } catch (error) {
        Alert.alert('Error', 'Failed to save locations');
      }
    };
    if (savedLocations.length > 0) {
      saveLocations();
    }
  }, [savedLocations]);

  const handleRemoveLocation = (id: string) => {
    Alert.alert(
      'Remove Location',
      'Are you sure you want to remove this location?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setSavedLocations(savedLocations.filter((location) => location.id !== id));
            Alert.alert('Success', 'Location removed!');
          },
        },
      ]
    );
  };

  // Filter locations based on search query
  const filteredLocations = savedLocations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLocation = ({ item }: { item: Location }) => (
    <View className="bg-white rounded-lg p-4 mb-4 mx-4 border border-gray-300">
      <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
      <Text className="text-gray-600">{item.address}</Text>
      <Text className="text-blue-600 font-semibold">{item.price}</Text>
      <MapView
        className="w-full h-40 mt-4 rounded-lg"
        initialRegion={{
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled={false}
      >
        <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }} />
      </MapView>
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-blue-600 rounded-lg p-2 flex-1 mr-2"
          onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
        >
          <Text className="text-white text-center">View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-600 rounded-lg p-2 flex-1 ml-2"
          onPress={() => handleRemoveLocation(item.id)}
        >
          <Text className="text-white text-center">Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <Text className="text-2xl font-bold text-center text-gray-800 mt-6 mb-4">
          Saved Locations
        </Text>
        <TextInput
          className="bg-white rounded-lg p-4 mx-4 mb-4 border border-gray-300"
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {filteredLocations.length === 0 ? (
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-lg text-gray-600 text-center mb-4">
              {searchQuery
                ? 'No locations match your search.'
                : 'No saved locations yet. Log in to save your favorite properties!'}
            </Text>
            <TouchableOpacity
              className="bg-blue-600 rounded-lg p-4"
              onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-white text-center font-semibold">Log In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredLocations}
            renderItem={renderLocation}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SavedLocation;