import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const leaveTypes = ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Other'];

export default function ManagerLeave() {
  const [type, setType] = useState(leaveTypes[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert('Leave Requested', 'Your leave request has been submitted.');
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Request Leave</Text>
      <Text style={styles.label}>Leave Type</Text>
      <View style={styles.dropdownContainer}>
        {leaveTypes.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.dropdownItem, t === type && styles.dropdownItemActive]}
            onPress={() => setType(t)}
          >
            <Text style={[styles.dropdownText, t === type && styles.dropdownTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowStart(true)}>
        <Text style={styles.dateText}>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStart && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            setShowStart(false);
            if (date) setStartDate(date);
          }}
        />
      )}
      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowEnd(true)}>
        <Text style={styles.dateText}>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEnd && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            setShowEnd(false);
            if (date) setEndDate(date);
          }}
        />
      )}
      <Text style={styles.label}>Reason</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Reason for leave..."
        value={reason}
        onChangeText={setReason}
        multiline
        numberOfLines={4}
        placeholderTextColor="#9CA3AF"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={submitting}>
        <Text style={styles.buttonText}>{submitting ? 'Submitting...' : 'Submit Request'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3366CC',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  label: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  dropdownContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
    marginBottom: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  dropdownItemActive: {
    backgroundColor: '#3366CC',
  },
  dropdownText: {
    color: '#1F2937',
    fontWeight: '500',
  },
  dropdownTextActive: {
    color: '#fff',
  },
  dateInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    width: '100%',
    minWidth: 120,
    alignSelf: 'center',
  },
  dateText: {
    color: '#1F2937',
    fontSize: 16,
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    marginBottom: 16,
    color: '#1F2937',
    width: '100%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#3366CC',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    width: '90%',
    maxWidth: 340,
    minWidth: 180,
    alignSelf: 'center',
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