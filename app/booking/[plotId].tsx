import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

type PlotDataType = {
  id: string;
  projectId: string;
  projectName: string;
  plotNumber: string;
  size: string;
  price: string;
};

const plotsData: { [key: string]: PlotDataType } = {
  '1-1': {
    id: '1-1',
    projectId: '1',
    projectName: 'Green Valley',
    plotNumber: 'A-123',
    size: '2400 sq.ft.',
    price: '₹55 Lakhs',
  },
  '2-1': {
    id: '2-1',
    projectId: '2',
    projectName: 'Lakeside Manor',
    plotNumber: 'B-456',
    size: '3200 sq.ft.',
    price: '₹85 Lakhs',
  },
};

// Available time slots
const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export default function BookingScreen() {
  const { plotId } = useLocalSearchParams();
  const plot = plotsData[plotId as string];
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [message, setMessage] = useState('');

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  
  // Function to validate the form
  const validateForm = () => {
    if (!name || !phone || !date || !selectedTimeSlot) {
      Alert.alert('Error', 'Please fill all required fields');
      return false;
    }
    
    if (phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }
    
    return true;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, this would submit to an API
      // For now, we'll just simulate it
      const bookingId = `booking-${Date.now()}`;
      router.push(`/qr/${bookingId}`);
    }
  };

  if (!plot) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#F44336" />
        <Text style={styles.errorText}>Plot not found</Text>
        <TouchableOpacity 
          style={styles.errorButton}
          onPress={() => router.back()}
        >
          <Text style={styles.errorButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        {/* Plot Summary */}
        <View style={styles.plotSummary}>
          <View style={styles.plotInfo}>
            <Text style={styles.projectName}>{plot.projectName}</Text>
            <Text style={styles.plotNumber}>{plot.plotNumber}</Text>
            <Text style={styles.plotSize}>{plot.size}</Text>
          </View>
          <Text style={styles.price}>{plot.price}</Text>
        </View>
        
        {/* Booking Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Book a Site Visit</Text>
          
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number <Text style={styles.required}>*</Text></Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="10-digit mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
          
          {/* Date Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Preferred Date <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={setDate}
              keyboardType="numbers-and-punctuation"
              // In a real app, use a date picker
            />
          </View>
          
          {/* Time Slots */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Preferred Time <Text style={styles.required}>*</Text></Text>
            <View style={styles.timeSlotContainer}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.timeSlot,
                    selectedTimeSlot === slot && styles.selectedTimeSlot
                  ]}
                  onPress={() => setSelectedTimeSlot(slot)}
                >
                  <Text 
                    style={[
                      styles.timeSlotText,
                      selectedTimeSlot === slot && styles.selectedTimeSlotText
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Message Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Additional Information</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Any specific requirements or questions?"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />
          </View>
          
          {/* Disclaimer */}
          <View style={styles.disclaimerContainer}>
            <Ionicons name="information-circle-outline" size={20} color="#666" />
            <Text style={styles.disclaimerText}>
              By booking a visit, you agree to our terms and conditions. Our representative will contact you to confirm your appointment.
            </Text>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  plotSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  plotInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    color: '#666',
  },
  plotNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 2,
  },
  plotSize: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3366CC',
  },
  formContainer: {
    padding: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: '#F44336',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  countryCode: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: '#3366CC',
    borderColor: '#3366CC',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTimeSlotText: {
    color: 'white',
  },
  messageInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  disclaimerContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f7ff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  disclaimerText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#3366CC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 16,
  },
  errorButton: {
    backgroundColor: '#3366CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  errorButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});