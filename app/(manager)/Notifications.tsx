import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform, SafeAreaView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const notifications = [
  { id: '1', type: 'info', message: 'New client assigned: Priya Sharma', date: '2024-05-25' },
  { id: '2', type: 'success', message: 'Attendance marked successfully', date: '2024-05-24' },
  { id: '3', type: 'alert', message: 'Leave request approved', date: '2024-05-23' },
  { id: '4', type: 'info', message: 'System update scheduled for 28 May', date: '2024-05-22' },
  { id: '5', type: 'alert', message: 'Attendance failed: Not in site region', date: '2024-05-21' },
];

const typeIcons = {
  info: <FontAwesome5 name="info-circle" size={20} color="#3366CC" />,
  success: <MaterialIcons name="check-circle" size={20} color="#10B981" />,
  alert: <MaterialIcons name="error" size={20} color="#EF4444" />,
};

export default function ManagerNotifications() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <View style={styles.icon}>{typeIcons[item.type as keyof typeof typeIcons]}</View>
            <View style={styles.content}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3366CC',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  list: {
    paddingBottom: 24,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    minWidth: 180,
    width: '100%',
    alignSelf: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 1px 1px rgba(0,0,0,0.06)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 1,
        elevation: 1,
      },
    }),
  },
  icon: {
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
  },
}); 