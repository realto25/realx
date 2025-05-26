import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
// Define navigation param list for TypeScript
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock terms content (replace with actual terms of service)
const termsContent = `
# Terms of Service

Last updated: May 26, 2025

## 1. Acceptance of Terms
By accessing or using the Real Estate App, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the app.

## 2. Use of the App
- The app is intended for users to browse, save, and explore real estate listings.
- Guest users have limited access to features such as saving properties or contacting agents.
- You must be at least 18 years old to use the app.

## 3. User Conduct
- You agree not to use the app for any unlawful purpose or in a way that violates these Terms.
- You are responsible for maintaining the confidentiality of your account information if you register.

## 4. Intellectual Property
All content, including text, images, and designs, is owned by Real Estate App or its licensors and protected by copyright law.

## 5. Limitation of Liability
The app is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the app.

## 6. Changes to Terms
We may update these Terms from time to time. Continued use of the app after changes constitutes acceptance of the new Terms.

## 7. Contact Us
For questions about these Terms, please email us at support@realestateapp.com.
`;

const Terms = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <Text className="text-2xl font-bold text-center text-gray-800 mt-6 mb-4">
          Terms of Service
        </Text>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text className="text-gray-600 leading-6">
            {termsContent}
          </Text>
        </ScrollView>
        <View className="px-4 pb-4">
          <Text className="text-center text-gray-600 mb-4">
            Log in to accept these terms and access full features!
          </Text>
          <TouchableOpacity
            className="bg-blue-600 rounded-lg p-4"
            onPress={() => navigation.navigate('Login')}
          >
            <Text className="text-white text-center font-semibold">Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Terms;