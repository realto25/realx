import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Sample bookings data
const bookingsData = [
  {
    id: '1',
    projectName: 'Green Valley',
    plotNumber: 'A-123',
    date: '2025-02-15',
    time: '10:00 AM',
    status: 'Upcoming',
  },
  {
    id: '2',
    projectName: 'Lakeside Manor',
    plotNumber: 'B-456',
    date: '2025-01-30',
    time: '2:30 PM',
    status: 'Completed',
  },
  {
    id: '3',
    projectName: 'Sunset Heights',
    plotNumber: 'C-789',
    date: '2024-12-18',
    time: '11:15 AM',
    status: 'Cancelled',
  },
];

type BookingType = {
  id: string;
  projectName: string;
  plotNumber: string;
  date: string;
  status: string;
  time: string;
};

export default function BookingsScreen() {
  const navigateToBookingQR = (bookingId: string) => {
    router.push(`/qr/${bookingId}`);
  };

  const navigateToFeedback = (bookingId: string) => {
    router.push(`/feedback/${bookingId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return '#3366CC';
      case 'Completed':
        return '#4CAF50';
      case 'Cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'calendar-outline';
      case 'Completed':
        return 'checkmark-circle-outline';
      case 'Cancelled':
        return 'close-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderBookingItem = ({ item }: { item: BookingType }) => (
    <View style={styles.bookingCard}>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
      
      <View style={styles.bookingContent}>
        <View style={styles.bookingHeader}>
          <Text style={styles.projectName}>{item.projectName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
            <Ionicons name={getStatusIcon(item.status)} size={14} color={getStatusColor(item.status)} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
        </View>
        
        <Text style={styles.plotNumber}>Plot: {item.plotNumber}</Text>
        
        <View style={styles.bookingDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          {item.status === 'Upcoming' && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigateToBookingQR(item.id)}
            >
              <Ionicons name="qr-code-outline" size={16} color="#3366CC" />
              <Text style={styles.actionButtonText}>QR Code</Text>
            </TouchableOpacity>
          )}
          
          {item.status === 'Completed' && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigateToFeedback(item.id)}
            >
              <Ionicons name="star-outline" size={16} color="#3366CC" />
              <Text style={styles.actionButtonText}>Give Feedback</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="information-circle-outline" size={16} color="#3366CC" />
            <Text style={styles.actionButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookingsData}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>My Bookings</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No bookings yet</Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => router.push('/(tabs)/Explore')}
            >
              <Text style={styles.exploreButtonText}>Explore Projects</Text>
            </TouchableOpacity>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusIndicator: {
    width: 5,
    backgroundColor: '#3366CC',
  },
  bookingContent: {
    flex: 1,
    padding: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f4fc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  plotNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bookingDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#3366CC',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: '#3366CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});