import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

// Mock signOut function (replace with actual auth provider, e.g., Supabase or Firebase)
const signOut = async () => {
  try {
    // Example: For Supabase, use `await supabase.auth.signOut()`
    // Example: For Firebase, use `await firebase.auth().signOut()`
    console.log('User signed out');
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

export default function ManagerProfile() {
  // In a real app, get user info from context or API
  const manager = {
    name: 'Demo Manager',
    phone: '+91 80000 00000',
    role: 'manager',
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/role-select');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.avatar}>{manager.name[0]}</Text>
        <Text style={styles.name}>{manager.name}</Text>
        <Text style={styles.phone}>{manager.phone}</Text>
        <Text style={styles.role}>Manager</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    padding: 24,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0ECFF',
    color: '#3366CC',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 16,
    lineHeight: 64,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 2,
  },
  role: {
    fontSize: 15,
    color: '#3366CC',
    marginBottom: 12,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});