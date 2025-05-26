import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useLayoutEffect } from 'react';


export default function RoleSelect() {
  
  const router = useRouter();
  const { loginAsRole } = useContext(AuthContext);

  const handleSelect = (role: 'guest' | 'client' | 'manager') => {
    loginAsRole(role);
    if (role === 'guest') {
      router.replace('/(tabs)/Index');
    } else if (role === 'client') {
      router.replace('/(client)/MyPlot');
    } else {
      router.replace('/(manager)/Tabs');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Realto</Text>
      <Text style={styles.subtitle}>Select your role to continue</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleSelect('guest')}>
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSelect('client')}>
        <Text style={styles.buttonText}>Login as Client</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSelect('manager')}>
        <Text style={styles.buttonText}>Login as Manager</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#3366CC',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 18,
    width: 260,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 