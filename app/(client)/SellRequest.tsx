import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Switch
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

type PlotDataType = {
  id: string;
  title: string;
  location: string;
  area: string;
  plotNumber: string;
  projectName: string;
  valueEstimate: string;
  purchaseDate: string;
};

// Mock data for plots
const plotsData: { [key: string]: PlotDataType } = {
  '1': {
    id: '1',
    title: 'Premium Villa Plot',
    location: 'Green Valley, Pune Road',
    area: '2400 Sq.Ft',
    plotNumber: 'A-123',
    projectName: 'Green Valley Township',
    valueEstimate: '₹1.85 Cr',
    purchaseDate: '15 Jan 2023',
  },
  '2': {
    id: '2',
    title: 'Commercial Plot',
    location: 'Tech Park, MIDC Shiroli',
    area: '5000 Sq.Ft',
    plotNumber: 'C-45',
    projectName: 'Shiroli Business Hub',
    valueEstimate: '₹3.2 Cr',
    purchaseDate: '05 Mar 2022',
  },
  '3': {
    id: '3',
    title: 'Farm Land',
    location: 'Radhanagari Road',
    area: '2 Acres',
    plotNumber: 'F-78',
    projectName: 'Green Acres',
    valueEstimate: '₹70 Lac',
    purchaseDate: '10 Sep 2021',
  }
};

export default function SellRequest() {
  const params = useLocalSearchParams();
  const plotId = params.plotId as string;
  
  const [selectedPlot, setSelectedPlot] = useState<string | null>(plotId || null);
  const [askingPrice, setAskingPrice] = useState('');
  const [reason, setReason] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [agentAssistance, setAgentAssistance] = useState(true);
  const [documentUpload, setDocumentUpload] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Set default asking price based on plot's value estimate
  useEffect(() => {
    if (selectedPlot && plotsData[selectedPlot]) {
      const plot = plotsData[selectedPlot];
      setAskingPrice(plot.valueEstimate);
    }
  }, [selectedPlot]);
  
  const handleSubmit = () => {
    // In a real app, this would submit to Appwrite
    // For demo, just show success and go back
    router.replace('/(client)/MyPlot');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Request to Sell Plot</Text>
          <View style={{ width: 40 }} />
        </View>
        
        {/* Description */}
        <View style={styles.infoBox}>
          <FontAwesome5 name="info-circle" size={16} color="#FF6B00" />
          <Text style={styles.infoText}>
            Create a sell request for your property. Our team will review your request 
            and connect you with potential buyers or assist with the selling process.
          </Text>
        </View>
        
        {/* Plot Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Property</Text>
          <Text style={styles.sectionSubtitle}>Choose which property you want to sell</Text>
          
          <View style={styles.plotsContainer}>
            {Object.values(plotsData).map((plot) => (
              <TouchableOpacity 
                key={plot.id}
                style={[
                  styles.plotItem,
                  selectedPlot === plot.id && styles.selectedPlotItem
                ]}
                onPress={() => setSelectedPlot(plot.id)}
              >
                <View style={styles.plotContent}>
                  <Text 
                    style={[
                      styles.plotTitle,
                      selectedPlot === plot.id && styles.selectedPlotText
                    ]}
                  >
                    {plot.title}
                  </Text>
                  <Text 
                    style={[
                      styles.plotDetails,
                      selectedPlot === plot.id && styles.selectedPlotText
                    ]}
                  >
                    {plot.plotNumber}, {plot.area}
                  </Text>
                  <Text 
                    style={[
                      styles.plotLocation,
                      selectedPlot === plot.id && styles.selectedPlotText
                    ]}
                  >
                    {plot.location}
                  </Text>
                </View>
                
                <View 
                  style={[
                    styles.radioButton,
                    selectedPlot === plot.id && styles.selectedRadioButton
                  ]}
                >
                  {selectedPlot === plot.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing Details</Text>
          <Text style={styles.sectionSubtitle}>Set your desired selling price</Text>
          
          <View style={styles.valueEstimateContainer}>
            <Text style={styles.valueEstimateLabel}>Current Market Value (Estimated)</Text>
            <Text style={styles.valueEstimate}>
              {selectedPlot ? plotsData[selectedPlot].valueEstimate : 'Select a property'}
            </Text>
          </View>
          
          <Text style={styles.inputLabel}>Your Asking Price</Text>
          <View style={styles.priceInputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.priceInput}
              value={askingPrice}
              onChangeText={setAskingPrice}
              placeholder="Enter your asking price"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.priceTipsContainer}>
            <FontAwesome5 name="lightbulb" size={16} color="#FF6B00" />
            <Text style={styles.priceTipsText}>
              Setting a price within 10% of the market value typically results in faster sales.
            </Text>
          </View>
        </View>
        
        {/* Additional Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Details</Text>
          
          <Text style={styles.inputLabel}>Reason for Selling (Optional)</Text>
          <TextInput
            style={styles.textAreaInput}
            value={reason}
            onChangeText={setReason}
            placeholder="Why are you selling this property?"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <Text style={styles.inputLabel}>Urgency Level</Text>
          <View style={styles.urgencyContainer}>
            <TouchableOpacity 
              style={[
                styles.urgencyOption,
                urgency === 'low' && styles.selectedUrgencyOption
              ]}
              onPress={() => setUrgency('low')}
            >
              <Text 
                style={[
                  styles.urgencyText,
                  urgency === 'low' && styles.selectedUrgencyText
                ]}
              >
                Low
              </Text>
              <Text 
                style={[
                  styles.urgencySubtext,
                  urgency === 'low' && styles.selectedUrgencyText
                ]}
              >
                6+ months
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.urgencyOption,
                urgency === 'normal' && styles.selectedUrgencyOption
              ]}
              onPress={() => setUrgency('normal')}
            >
              <Text 
                style={[
                  styles.urgencyText,
                  urgency === 'normal' && styles.selectedUrgencyText
                ]}
              >
                Normal
              </Text>
              <Text 
                style={[
                  styles.urgencySubtext,
                  urgency === 'normal' && styles.selectedUrgencyText
                ]}
              >
                3-6 months
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.urgencyOption,
                urgency === 'high' && styles.selectedUrgencyOption
              ]}
              onPress={() => setUrgency('high')}
            >
              <Text 
                style={[
                  styles.urgencyText,
                  urgency === 'high' && styles.selectedUrgencyText
                ]}
              >
                High
              </Text>
              <Text 
                style={[
                  styles.urgencySubtext,
                  urgency === 'high' && styles.selectedUrgencyText
                ]}
              >
                ASAP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.preferenceItem}>
            <View>
              <Text style={styles.preferenceTitle}>Agent Assistance</Text>
              <Text style={styles.preferenceDescription}>
                Get help from our real estate agents
              </Text>
            </View>
            <Switch
              value={agentAssistance}
              onValueChange={setAgentAssistance}
              trackColor={{ false: '#D1D5DB', true: '#FFEDE6' }}
              thumbColor={agentAssistance ? '#FF6B00' : '#9CA3AF'}
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <View>
              <Text style={styles.preferenceTitle}>Document Upload</Text>
              <Text style={styles.preferenceDescription}>
                Upload additional documents for faster processing
              </Text>
            </View>
            <Switch
              value={documentUpload}
              onValueChange={setDocumentUpload}
              trackColor={{ false: '#D1D5DB', true: '#FFEDE6' }}
              thumbColor={documentUpload ? '#FF6B00' : '#9CA3AF'}
            />
          </View>
          
          {documentUpload && (
            <TouchableOpacity style={styles.uploadDocsButton}>
              <FontAwesome5 name="file-upload" size={16} color="#FF6B00" />
              <Text style={styles.uploadDocsText}>Upload Documents</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View 
              style={[
                styles.checkbox,
                termsAccepted && styles.checkedCheckbox
              ]}
            >
              {termsAccepted && (
                <FontAwesome5 name="check" size={12} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>
          
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text> of the selling process
            and understand that a commission fee may apply if I use agent services.
          </Text>
        </View>
      </ScrollView>
      
      {/* Submit Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!selectedPlot || !termsAccepted) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!selectedPlot || !termsAccepted}
        >
          <Text style={styles.submitButtonText}>Submit Sell Request</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#FFEDE6',
    borderRadius: 8,
    padding: 12,
    margin: 16,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#9A3412',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 16,
  },
  plotsContainer: {
    marginBottom: 8,
  },
  plotItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedPlotItem: {
    backgroundColor: '#FF6B00',
  },
  plotContent: {
    flex: 1,
  },
  plotTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  plotDetails: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  plotLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  selectedPlotText: {
    color: '#FFFFFF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: '#FFFFFF',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  valueEstimateContainer: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  valueEstimateLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  valueEstimate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#4B5563',
  },
  priceInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 8,
  },
  priceTipsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  priceTipsText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 100,
    marginBottom: 16,
  },
  urgencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  urgencyOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  selectedUrgencyOption: {
    backgroundColor: '#FF6B00',
  },
  urgencyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  urgencySubtext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  selectedUrgencyText: {
    color: '#FFFFFF',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  preferenceDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  uploadDocsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 8,
  },
  uploadDocsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF6B00',
    marginLeft: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  termsLink: {
    color: '#FF6B00',
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});