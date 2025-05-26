import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type VisitPassProps = {
  bookingId: string;
  property: string;
  location: string;
  date: string;
  time: string;
  visitor: string;
};

const VisitPassScreen: React.FC<VisitPassProps> = ({
  bookingId = '998198',
  property = 'Riverside Acres',
  location = 'North Zone, Sector 12',
  date = 'May 25, 2023',
  time = '10:00 AM - 11:00 AM',
  visitor = 'Guest User',
}) => {
  const handleBack = () => {
    router.back();
  };

  const handleReturnHome = () => {
    router.push('/(tabs)/explore');
  };

  const handleRateExperience = () => {
    router.push('/feedback/bookingId');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Visit Pass Details\nProperty: ${property}\nLocation: ${location}\nDate: ${date}\nTime: ${time}\nVisitor: ${visitor}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSave = () => {
    console.log('Save button pressed');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#003087" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Visit Pass</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#003087" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status and Booking ID */}
        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" style={styles.statusIcon} />
            <Text style={styles.statusText}>Confirmed</Text>
          </View>
          <Text style={styles.bookingId}>Booking ID: {bookingId}</Text>
        </View>

        {/* QR Code Placeholder */}
        <View style={styles.qrContainer}>
          <Text style={styles.qrText}>Present this QR code at the site entrance</Text>
        </View>

        {/* Visit Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Visit Details</Text>

          <Text style={styles.propertyName}>{property}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color="#003087" />
            <Text style={styles.detailText}>Location</Text>
          </View>
          <Text style={styles.detailValue}>{location}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color="#003087" />
            <Text style={styles.detailText}>Date</Text>
          </View>
          <Text style={styles.detailValue}>{date}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#003087" />
            <Text style={styles.detailText}>Time</Text>
          </View>
          <Text style={styles.detailValue}>{time}</Text>

          <Text style={styles.visitorLabel}>Visitor</Text>
          <Text style={styles.visitorName}>{visitor}</Text>
        </View>

        {/* Simplified Visit Details (Time and Visitor) */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#003087" />
            <Text style={styles.detailText}>Time</Text>
          </View>
          <Text style={styles.detailValue}>{time}</Text>

          <Text style={styles.visitorLabel}>Visitor</Text>
          <Text style={styles.visitorName}>{visitor}</Text>
        </View>

        {/* Save and Share Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Ionicons name="download-outline" size={20} color="#003087" />
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="#003087" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Important Notes */}
        <View style={styles.notesContainer}>
          <Text style={styles.sectionTitle}>Important Notes:</Text>
          <Text style={styles.noteText}>• Please arrive 10 minutes before your scheduled time</Text>
          <Text style={styles.noteText}>• Bring a valid government ID for verification</Text>
          <Text style={styles.noteText}>• Visit duration is approximately 1 hour</Text>
          <Text style={styles.noteText}>• Parking is available at the site entrance</Text>
        </View>

        {/* Rate Your Experience */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackText}>After your visit, please share your feedback</Text>
          <TouchableOpacity onPress={handleRateExperience}>
            <Text style={styles.rateLink}>Rate Your Experience</Text>
          </TouchableOpacity>
        </View>

        {/* Return to Home Button */}
        <TouchableOpacity style={styles.returnButton} onPress={handleReturnHome}>
          <Text style={styles.returnButtonText}>Return to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003087',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  statusContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3366CC',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusIcon: {
    marginRight: 5,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bookingId: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  qrContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 20,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  qrText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003087',
    marginBottom: 15,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginLeft: 10,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    marginLeft: 30,
  },
  visitorLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 5,
  },
  visitorName: {
    fontSize: 16,
    color: '#333',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003087',
    marginLeft: 5,
  },
  notesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  feedbackContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  rateLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3366CC',
  },
  returnButton: {
    backgroundColor: '#3366CC',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  returnButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default VisitPassScreen;