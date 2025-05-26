import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type ProjectType = {
  id: string;
  name: string;
  location: string;
  image: string;
  plotsAvailable: number;
};

type BookingType = {
  id: string;
  projectName: string;
  plotNumber: string;
  date: string;
  status: string;
};

export default function DashboardScreen() {
  const { user } = useAuth();

  // Sample dashboard data
  const recentBookings: BookingType[] = [
    { id: '1', projectName: 'Green Valley', plotNumber: 'A-123', date: '2025-02-15', status: 'Upcoming' },
    { id: '2', projectName: 'Lakeside Manor', plotNumber: 'B-456', date: '2025-01-30', status: 'Completed' },
  ];

  const featuredProjects: ProjectType[] = [
    { id: '1', name: 'Green Valley', location: 'Chennai', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', plotsAvailable: 42 },
    { id: '2', name: 'Lakeside Manor', location: 'Bangalore', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', plotsAvailable: 18 },
    { id: '3', name: 'Sunset Heights', location: 'Hyderabad', image: 'https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg', plotsAvailable: 25 },
  ];

  // Navigation handler for See All buttons
  const handleSeeAll = () => {
    router.push('/(tabs)/Explore'); // Navigate to Explore screen
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, Guest</Text>
        <Text style={styles.date}>{new Date().toDateString()}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>20+</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>500+</Text>
          <Text style={styles.statLabel}>Available Plots</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>User Rating</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Bookings</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {recentBookings.length > 0 ? (
          recentBookings.map((booking: BookingType) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingInfo}>
                <Text style={styles.projectName}>{booking.projectName}</Text>
                <Text style={styles.plotNumber}>Plot: {booking.plotNumber}</Text>
                <Text style={styles.bookingDate}>Visit: {booking.date}</Text>
              </View>
              <View style={styles.statusContainer}>
                <Text 
                  style={[
                    styles.statusText, 
                    booking.status === 'Upcoming' ? styles.statusUpcoming : styles.statusCompleted
                  ]}
                >
                  {booking.status}
                </Text>
                <Ionicons 
                  name={booking.status === 'Upcoming' ? 'calendar-outline' : 'checkmark-circle-outline'} 
                  size={24} 
                  color={booking.status === 'Upcoming' ? '#3366CC' : '#4CAF50'} 
                />
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No bookings yet</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={handleSeeAll}>
              <Text style={styles.exploreButtonText}>Explore Projects</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Projects</Text>
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {featuredProjects.map((project: ProjectType) => (
            <TouchableOpacity key={project.id} style={styles.projectCard}>
              <Image source={{ uri: project.image }} style={styles.projectImage} />
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectLocation}>
                  <Ionicons name="location-outline" size={14} color="#666" /> {project.location}
                </Text>
                <View style={styles.plotBadge}>
                  <Text style={styles.plotBadgeText}>{project.plotsAvailable} plots available</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#3366CC',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  date: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3366CC',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3366CC',
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookingInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  plotNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  statusUpcoming: {
    color: '#3366CC',
  },
  statusCompleted: {
    color: '#4CAF50',
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 32,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginBottom: 16,
  },
  exploreButton: {
    backgroundColor: '#3366CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  exploreButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  featuredScroll: {
    marginBottom: 24,
  },
  projectCard: {
    width: 240,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectImage: {
    width: '100%',
    height: 140,
  },
  projectInfo: {
    padding: 12,
  },
  projectLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    marginBottom: 8,
  },
  plotBadge: {
    backgroundColor: '#e8f4fc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  plotBadgeText: {
    fontSize: 12,
    color: '#3366CC',
    fontWeight: '500',
  },
});