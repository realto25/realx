import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type NotificationType = {
  id: string;
  title: string;
  message: string;
  type: 'approval' | 'info' | 'alert';
  timestamp: string;
  read: boolean;
};

export default function NotificationScreen() {
  const router = useRouter();

  // Sample notification data
  const notifications: NotificationType[] = [
    {
      id: '1',
      title: 'Booking Approved',
      message: 'Your visit request for Green Valley has been approved',
      type: 'approval',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'New Property Available',
      message: 'Check out the newly listed plots in Bangalore',
      type: 'info',
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: '3',
      title: 'Reminder',
      message: 'Your scheduled visit is tomorrow at 10:00 AM',
      type: 'alert',
      timestamp: '3 days ago',
      read: true,
    },
  ];

  const handleNotificationPress = (notification: NotificationType) => {
    if (notification.type === 'approval') {
      router.push('/(guest)/QrCode');
    }
    // Mark as read logic could be added here
  };

  const renderItem = ({ item }: { item: NotificationType }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadCard]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.iconContainer}>
        {item.type === 'approval' && (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        )}
        {item.type === 'info' && (
          <Ionicons name="information-circle" size={24} color="#2196F3" />
        )}
        {item.type === 'alert' && (
          <Ionicons name="alert-circle" size={24} color="#FF9800" />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3366CC',
  },
  iconContainer: {
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3366CC',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});