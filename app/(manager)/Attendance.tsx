import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, SafeAreaView } from 'react-native';

export default function ManagerAttendance() {
  const [loading, setLoading] = useState(false);
  const [marked, setMarked] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMarkAttendance = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate GPS check: randomly succeed or fail
      const isSuccess = Math.random() > 0.3;
      setMarked(true);
      setSuccess(isSuccess);
      Alert.alert(
        isSuccess ? 'Attendance Marked' : 'Attendance Failed',
        isSuccess ? 'You are within the office/site region.' : 'You are not within the allowed region. Please try again at the site.'
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mark Attendance</Text>
      <Text style={styles.subtitle}>GPS verification required within office or site region.</Text>
      <TouchableOpacity
        style={[styles.button, marked && success && { backgroundColor: '#10B981' }, marked && !success && { backgroundColor: '#EF4444' }]}
        onPress={handleMarkAttendance}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {marked ? (success ? 'Attendance Marked' : 'Try Again') : 'Mark Attendance'}
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3366CC',
    marginBottom: 16,
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    width: '90%',
    maxWidth: 340,
    minWidth: 180,
    alignSelf: 'center',
    backgroundColor: '#3366CC',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    ...Platform.select({
      web: {
        // No web-unsupported properties
      },
      default: {},
    }),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
}); 