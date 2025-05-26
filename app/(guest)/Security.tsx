import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define navigation param list for TypeScript
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Security = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    // Placeholder for actual login logic (e.g., API call)
    Alert.alert('Success', 'Login attempt successful!');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to Real Estate App
        </Text>
        <Text className="text-lg text-center text-gray-600 mb-6">
          Securely log in or create an account to explore properties
        </Text>

        <TextInput
          className="bg-white rounded-lg p-4 mb-4 border border-gray-300"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="bg-white rounded-lg p-4 mb-6 border border-gray-300"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-blue-600 rounded-lg p-4 mb-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-semibold">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-200 rounded-lg p-4 mb-4"
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="text-blue-600 text-center font-semibold">
            Create an Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text className="text-blue-600 text-center">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Security;