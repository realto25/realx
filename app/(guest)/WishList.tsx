import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define navigation param list for TypeScript
type RootStackParamList = {
  Login: undefined;
  PropertyDetails: { propertyId: string };
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Define wishlist item type
type WishlistItem = {
  id: string;
  name: string;
  address: string;
  price: string;
  image?: string; // Optional image URL or placeholder
};

// Mock initial data (replace with actual data source if needed)
const initialWishlist: WishlistItem[] = [
  { id: '1', name: 'Cozy Apartment', address: '123 Main St, City', price: '$250,000' },
  { id: '2', name: 'Modern Villa', address: '456 Oak Ave, Town', price: '$450,000' },
];

const Wishlist = () => {
  const navigation = useNavigation<NavigationProp>();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load wishlist from AsyncStorage on mount
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedWishlist = await AsyncStorage.getItem('wishlist');
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        } else {
          // Initialize with mock data if no stored wishlist
          setWishlist(initialWishlist);
          await AsyncStorage.setItem('wishlist', JSON.stringify(initialWishlist));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load wishlist');
      }
    };
    loadWishlist();
  }, []);

  // Save wishlist to AsyncStorage when it changes
  useEffect(() => {
    const saveWishlist = async () => {
      try {
        await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
      } catch (error) {
        Alert.alert('Error', 'Failed to save wishlist');
      }
    };
    if (wishlist.length > 0) {
      saveWishlist();
    }
  }, [wishlist]);

  const handleRemoveFromWishlist = (id: string) => {
    Alert.alert(
      'Remove from Wishlist',
      'Are you sure you want to remove this property from your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setWishlist(wishlist.filter((item) => item.id !== id));
            Alert.alert('Success', 'Property removed from wishlist!');
          },
        },
      ]
    );
  };

  // Filter wishlist based on search query
  const filteredWishlist = wishlist.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderWishlistItem = ({ item }: { item: WishlistItem }) => (
    <View className="bg-white rounded-lg p-4 mb-4 mx-4 border border-gray-300">
      <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
      <Text className="text-gray-600">{item.address}</Text>
      <Text className="text-blue-600 font-semibold">{item.price}</Text>
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-blue-600 rounded-lg p-2 flex-1 mr-2"
          onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
        >
          <Text className="text-white text-center">View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-600 rounded-lg p-2 flex-1 ml-2"
          onPress={() => handleRemoveFromWishlist(item.id)}
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
          Your Wishlist
        </Text>
        <TextInput
          className="bg-white rounded-lg p-4 mx-4 mb-4 border border-gray-300"
          placeholder="Search wishlist..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {filteredWishlist.length === 0 ? (
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-lg text-gray-600 text-center mb-4">
              {searchQuery
                ? 'No properties match your search.'
                : 'Your wishlist is empty. Log in to save your favorite properties!'}
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
            data={filteredWishlist}
            renderItem={renderWishlistItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Wishlist;