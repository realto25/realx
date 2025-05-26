import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

// Mock data for properties with cameras
const propertiesWithCameras = [
  {
    id: '1',
    title: 'Premium Villa Plot',
    location: 'Green Valley, Pune Road',
    plotNumber: 'A-123',
    cameras: [
      { id: 'cam1', name: 'Main Entrance', status: 'online', streamUrl: 'https://example.com/stream1' },
      { id: 'cam2', name: 'Back Side', status: 'online', streamUrl: 'https://example.com/stream2' },
    ]
  },
  {
    id: '2',
    title: 'Commercial Plot',
    location: 'Tech Park, MIDC Shiroli',
    plotNumber: 'C-45',
    cameras: [
      { id: 'cam1', name: 'Entrance Gate', status: 'online', streamUrl: 'https://example.com/stream3' },
      { id: 'cam2', name: 'Parking Area', status: 'offline', streamUrl: 'https://example.com/stream4' },
      { id: 'cam3', name: 'Building Front', status: 'online', streamUrl: 'https://example.com/stream5' },
    ]
  },
];

export default function CameraFeed() {
  const [selectedProperty, setSelectedProperty] = useState(propertiesWithCameras[0]);
  const [selectedCamera, setSelectedCamera] = useState(selectedProperty.cameras[0]);
  
  // This would actually be a real camera feed URL in production
  // Using a placeholder image for demo purposes
  const demoStreamUrl = 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Live Camera Feed</Text>
          <Text style={styles.headerSubtitle}>Monitor your properties in real-time</Text>
        </View>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <FontAwesome5 name="times" size={20} color="#1F2937" />
        </TouchableOpacity>
      </View>
      
      {/* Main content */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Camera feed view */}
        <View style={styles.videoContainer}>
          {/* For demo: Using an image instead of actual WebView */}
          <Image 
            source={{ uri: demoStreamUrl }} 
            style={styles.videoFeed}
            resizeMode="cover"
          />
          
          {/* This would be used in production with real camera feeds */}
          {/* <WebView
            source={{ uri: selectedCamera.streamUrl }}
            style={styles.videoFeed}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Connecting to camera...</Text>
              </View>
            )}
          /> */}
          
          <View style={styles.cameraInfo}>
            <View style={styles.cameraNameContainer}>
              <Text style={styles.cameraName}>{selectedCamera.name}</Text>
              <View 
                style={[
                  styles.statusIndicator, 
                  selectedCamera.status === 'online' 
                    ? styles.onlineIndicator 
                    : styles.offlineIndicator
                ]}
              />
            </View>
            <Text style={styles.propertyName}>{selectedProperty.title} - {selectedProperty.plotNumber}</Text>
          </View>
        </View>
        
        {/* Camera controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.controlsHeader}>
            <Text style={styles.controlsTitle}>Camera Controls</Text>
          </View>
          
          <View style={styles.controlsGrid}>
            <TouchableOpacity style={styles.controlButton}>
              <FontAwesome5 name="search-plus" size={20} color="#1F2937" />
              <Text style={styles.controlLabel}>Zoom In</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <FontAwesome5 name="search-minus" size={20} color="#1F2937" />
              <Text style={styles.controlLabel}>Zoom Out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <FontAwesome5 name="arrows-alt" size={20} color="#1F2937" />
              <Text style={styles.controlLabel}>Pan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <FontAwesome5 name="sync-alt" size={20} color="#1F2937" />
              <Text style={styles.controlLabel}>Refresh</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Property selector */}
        <View style={styles.propertySelector}>
          <Text style={styles.selectorTitle}>Select Property</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.propertiesContainer}
          >
            {propertiesWithCameras.map((property) => (
              <TouchableOpacity 
                key={property.id}
                style={[
                  styles.propertyCard,
                  selectedProperty.id === property.id && styles.selectedPropertyCard
                ]}
                onPress={() => {
                  setSelectedProperty(property);
                  setSelectedCamera(property.cameras[0]);
                }}
              >
                <Text 
                  style={[
                    styles.propertyCardTitle,
                    selectedProperty.id === property.id && styles.selectedPropertyText
                  ]}
                >
                  {property.title}
                </Text>
                <Text 
                  style={[
                    styles.propertyCardSubtitle,
                    selectedProperty.id === property.id && styles.selectedPropertyText
                  ]}
                >
                  {property.plotNumber}
                </Text>
                <View style={styles.camerasInfo}>
                  <FontAwesome5 
                    name="video" 
                    size={12} 
                    color={selectedProperty.id === property.id ? "#FFFFFF" : "#6B7280"} 
                  />
                  <Text 
                    style={[
                      styles.camerasCount,
                      selectedProperty.id === property.id && styles.selectedPropertyText
                    ]}
                  >
                    {property.cameras.length} cameras
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Camera selector */}
        <View style={styles.cameraSelector}>
          <Text style={styles.selectorTitle}>Select Camera</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.camerasContainer}
          >
            {selectedProperty.cameras.map((camera) => (
              <TouchableOpacity 
                key={camera.id}
                style={[
                  styles.cameraCard,
                  selectedCamera.id === camera.id && styles.selectedCameraCard
                ]}
                onPress={() => setSelectedCamera(camera)}
              >
                <View 
                  style={[
                    styles.cameraStatusDot,
                    camera.status === 'online' ? styles.onlineDot : styles.offlineDot
                  ]}
                />
                <Text 
                  style={[
                    styles.cameraCardName,
                    selectedCamera.id === camera.id && styles.selectedCameraText
                  ]}
                >
                  {camera.name}
                </Text>
                <Text 
                  style={[
                    styles.cameraCardStatus,
                    selectedCamera.id === camera.id && styles.selectedCameraText,
                    camera.status === 'offline' && styles.offlineText
                  ]}
                >
                  {camera.status === 'online' ? 'Online' : 'Offline'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="camera" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Capture</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.recordButton]}
          >
            <FontAwesome5 name="record-vinyl" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Record</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.downloadButton]}
          >
            <FontAwesome5 name="cloud-download-alt" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Archives</Text>
          </TouchableOpacity>
        </View>
        
        {/* Help text */}
        <View style={styles.helpContainer}>
          <FontAwesome5 name="info-circle" size={16} color="#4B5563" />
          <Text style={styles.helpText}>
            Camera feeds are accessible only by property owners. 
            Recordings are stored for 7 days and can be downloaded from archives.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#000000',
  },
  videoFeed: {
    width: '100%',
    height: 220,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  cameraInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  cameraNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cameraName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  onlineIndicator: {
    backgroundColor: '#10B981',
  },
  offlineIndicator: {
    backgroundColor: '#EF4444',
  },
  propertyName: {
    color: '#E5E7EB',
    fontSize: 12,
    marginTop: 2,
  },
  controlsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  controlsHeader: {
    marginBottom: 12,
  },
  controlsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  controlLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  propertySelector: {
    marginBottom: 16,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  propertiesContainer: {
    paddingRight: 16,
  },
  propertyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedPropertyCard: {
    backgroundColor: '#FF6B00',
  },
  propertyCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  propertyCardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  selectedPropertyText: {
    color: '#FFFFFF',
  },
  camerasInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  camerasCount: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  cameraSelector: {
    marginBottom: 16,
  },
  camerasContainer: {
    paddingRight: 16,
  },
  cameraCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 120,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCameraCard: {
    backgroundColor: '#3B82F6',
  },
  cameraStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  onlineDot: {
    backgroundColor: '#10B981',
  },
  offlineDot: {
    backgroundColor: '#EF4444',
  },
  cameraCardName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  cameraCardStatus: {
    fontSize: 12,
    color: '#10B981',
  },
  selectedCameraText: {
    color: '#FFFFFF',
  },
  offlineText: {
    color: '#EF4444',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  recordButton: {
    backgroundColor: '#EF4444',
  },
  downloadButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  helpContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
  },
  helpText: {
    fontSize: 12,
    color: '#4B5563',
    marginLeft: 8,
    flex: 1,
  },
});