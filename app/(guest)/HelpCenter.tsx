import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define navigation param list for TypeScript
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock FAQ data
const faqs = [
  {
    id: '1',
    question: 'How do I save a property to my wishlist?',
    answer: 'As a guest, you can temporarily save properties to your wishlist. Log in to save them permanently.',
  },
  {
    id: '2',
    question: 'Can I contact an agent without logging in?',
    answer: 'You can view contact information, but logging in allows you to message agents directly.',
  },
  {
    id: '3',
    question: 'How do I search for properties?',
    answer: 'Use the search bar on the home screen to filter properties by location, price, or type.',
  },
];

const HelpCenter = () => {
  const navigation = useNavigation<NavigationProp>();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Log in to access personalized support or email us at support@realestateapp.com.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log In', onPress: () => navigation.navigate('Login') },
      ]
    );
  };

  const renderFAQ = ({ item }: { item: { id: string; question: string; answer: string } }) => (
    <View className="bg-white rounded-lg p-4 mb-4 mx-4 border border-gray-300">
      <TouchableOpacity onPress={() => toggleFAQ(item.id)}>
        <Text className="text-lg font-semibold text-gray-800">{item.question}</Text>
      </TouchableOpacity>
      {expanded === item.id && (
        <Text className="text-gray-600 mt-2">{item.answer}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <Text className="text-2xl font-bold text-center text-gray-800 mt-6 mb-4">
          Help Center
        </Text>
        <Text className="text-lg text-gray-600 text-center mx-4 mb-6">
          Find answers to common questions or contact support
        </Text>
        <FlatList
          data={faqs}
          renderItem={renderFAQ}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <TouchableOpacity
          className="bg-blue-600 rounded-lg p-4 mx-4 mb-4"
          onPress={handleContactSupport}
        >
          <Text className="text-white text-center font-semibold">Contact Support</Text>
        </TouchableOpacity>
        <Text className="text-center text-gray-600 mb-4">
          Log in for personalized support and faster responses!
        </Text>
        <TouchableOpacity
          className="bg-gray-200 rounded-lg p-4 mx-4"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-blue-600 text-center font-semibold">Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HelpCenter;