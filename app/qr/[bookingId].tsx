import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

// This is a placeholder QR code image URL - in a real app, this would be generated dynamically
const QR_CODE_URL = 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg';

export default function QRCodeScreen() {
  const { bookingId } = useLocalSearchParams();
  
  // Simulated booking data (in a real app, this would come from an API)
  const booking = {
    id: bookingId as string,
    projectName: 'Green Valley',
    plotNumber: 'A-123',
    date: '2025-02-15',
    time: '10:00 AM',
    name: 'Guest User',
    phone: '+91 98765 43210',
    status: 'Confirmed',
    confirmationCode: 'GV12345',
  };

  // Function to share booking details
  const handleShare = async () => {
    try {
      await Share.share({
        message: `I've booked a visit to see Plot ${booking.plotNumber} at ${booking.projectName} on ${booking.date} at ${booking.time}. My booking confirmation code is ${booking.confirmationCode}.`,
        title: 'My Property Visit Booking',
      });
    } catch (error) {
      alert('Error sharing booking details');
    }
  };

  // Function to download QR code (just a placeholder in this app)
  const handleDownload = () => {
    alert('QR code saved to your gallery');
  };

  // Function to navigate to the feedback page
  const handleFeedback = () => {
    router.push(`/feedback/${bookingId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Booking Confirmed!</Text>
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.statusText}>{booking.status}</Text>
          </View>
        </View>
        
        <Text style={styles.subTitle}>Present this QR code during your visit</Text>
        
        <View style={styles.qrContainer}>
          <Image
            source={{ uri: QR_CODE_URL }}
            style={styles.qrCode}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationLabel}>Confirmation Code</Text>
          <Text style={styles.confirmationCode}>{booking.confirmationCode}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Project</Text>
            <Text style={styles.detailValue}>{booking.projectName}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plot Number</Text>
            <Text style={styles.detailValue}>{booking.plotNumber}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Visit Date</Text>
            <Text style={styles.detailValue}>{booking.date}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Visit Time</Text>
            <Text style={styles.detailValue}>{booking.time}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{booking.name}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contact</Text>
            <Text style={styles.detailValue}>{booking.phone}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleShare}
        >
          <Ionicons name="share-social-outline" size={20} color="#3366CC" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleDownload}
        >
          <Ionicons name="download-outline" size={20} color="#3366CC" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.noteContainer}>
        <Ionicons name="information-circle-outline" size={20} color="#666" />
        <Text style={styles.noteText}>
          Please arrive 10 minutes before your scheduled time. A confirmation SMS has been sent to your registered mobile number.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.feedbackButton}
        onPress={handleFeedback}
      >
        <Text style={styles.feedbackButtonText}>Leave Feedback After Visit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.push('/(tabs)')}
      >
        <Text style={styles.backButtonText}>Return to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 4,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  confirmationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  confirmationCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3366CC',
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 4,
    fontSize: 14,
    color: '#3366CC',
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f7ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  noteText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  feedbackButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  feedbackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3366CC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  backButtonText: {
    color: '#3366CC',
    fontSize: 16,
    fontWeight: '600',
  },
});