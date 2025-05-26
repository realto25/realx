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

export default function FeedbackScreen() {
  const { bookingId } = useLocalSearchParams();
  
  // Simulated booking data (in a real app, this would come from an API)
  const booking = {
    id: bookingId as string,
    projectName: 'Green Valley',
    plotNumber: 'A-123',
    date: '2025-02-15',
    time: '10:00 AM',
  };
  
  const [rating, setRating] = useState(0);
  const [experience, setExperience] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [interestedInPurchase, setInterestedInPurchase] = useState<boolean | null>(null);
  
  // Function to handle submit
  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please provide a rating');
      return;
    }
    
    // In a real app, this would submit to an API
    Alert.alert(
      'Thank You!',
      'Your feedback has been submitted successfully.',
      [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)')
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Share Your Feedback</Text>
          <Text style={styles.subtitle}>
            Tell us about your visit to {booking.projectName}, Plot {booking.plotNumber}
          </Text>
        </View>
        
        <View style={styles.card}>
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.label}>How would you rate your visit?</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Ionicons
                    name={rating >= star ? 'star' : 'star-outline'}
                    size={36}
                    color={rating >= star ? '#FFD700' : '#ccc'}
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingText}>
              {rating > 0 ? 
                [`Poor`, `Fair`, `Good`, `Very Good`, `Excellent`][rating - 1] 
                : 'Tap to rate'}
            </Text>
          </View>
          
          {/* Experience */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tell us about your experience</Text>
            <TextInput
              style={styles.textArea}
              placeholder="What did you like or dislike about the property and your visit?"
              multiline
              numberOfLines={4}
              value={experience}
              onChangeText={setExperience}
            />
          </View>
          
          {/* Purchase Interest */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Are you interested in purchasing this property?</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={[
                  styles.optionButton,
                  interestedInPurchase === true && styles.selectedOption
                ]}
                onPress={() => setInterestedInPurchase(true)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    interestedInPurchase === true && styles.selectedOptionText
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.optionButton,
                  interestedInPurchase === false && styles.selectedOption
                ]}
                onPress={() => setInterestedInPurchase(false)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    interestedInPurchase === false && styles.selectedOptionText
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.optionButton,
                  interestedInPurchase === null && styles.selectedOption
                ]}
                onPress={() => setInterestedInPurchase(null)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    interestedInPurchase === null && styles.selectedOptionText
                  ]}
                >
                  Maybe
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Suggestions */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Do you have any suggestions for improvement?</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Your suggestions help us improve our services"
              multiline
              numberOfLines={4}
              value={suggestions}
              onChangeText={setSuggestions}
            />
          </View>
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
        
        {/* Cancel Button */}
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  starIcon: {
    marginHorizontal: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textArea: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedOption: {
    backgroundColor: '#3366CC',
    borderColor: '#3366CC',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#3366CC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});