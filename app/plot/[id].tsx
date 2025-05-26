import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

// Sample plot data (in a real app, this would come from an API)
type PlotType = {
  id: string;
  projectId: string;
  projectName: string;
  plotNumber: string;
  size: string;
  price: string;
  status: string;
  description: string;
  amenities: string[];
  images: string[];
  features: { name: string; value: string }[];
  location: { address: string; landmarks: string[] };
  documents: string[];
};

const plotsData: { [key: string]: PlotType } = {
  '1-1': {
    id: '1-1',
    projectId: '1',
    projectName: 'Green Valley',
    plotNumber: 'A-123',
    size: '2400 sq.ft.',
    price: '₹55 Lakhs',
    status: 'Available',
    description: 'East-facing premium corner plot with excellent ventilation and views. Located near the entrance of the community with easy access to amenities.',
    amenities: ['Clubhouse Access', 'Garden View', 'Corner Plot', 'Near Entrance'],
    images: [
      'https://images.pexels.com/photos/3935322/pexels-photo-3935322.jpeg',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
      'https://images.pexels.com/photos/3935331/pexels-photo-3935331.jpeg',
    ],
    features: [
      { name: 'Size', value: '2400 sq.ft.' },
      { name: 'Dimensions', value: '40ft × 60ft' },
      { name: 'Facing', value: 'East' },
      { name: 'Approval', value: 'CMDA Approved' },
      { name: 'Registration', value: 'Ready for Registration' },
    ],
    location: {
      address: 'Green Valley, East Coast Road, Chennai',
      landmarks: ['2 km from Beach', '5 km from City Center', 'Near International School'],
    },
    documents: ['Title Deed', 'Encumbrance Certificate', 'Land Survey', 'Approval Certificate'],
  },
  '2-1': {
    id: '2-1',
    projectId: '2',
    projectName: 'Lakeside Manor',
    plotNumber: 'B-456',
    size: '3200 sq.ft.',
    price: '₹85 Lakhs',
    status: 'Available',
    description: 'Premium lakefront plot with panoramic views. One of the largest plots in the community with direct access to the lake and private dock area.',
    amenities: ['Lake View', 'Private Dock Access', 'Premium Location', 'Extra Large Plot'],
    images: [
      'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg',
      'https://images.pexels.com/photos/3935330/pexels-photo-3935330.jpeg',
      'https://images.pexels.com/photos/4119135/pexels-photo-4119135.jpeg',
    ],
    features: [
      { name: 'Size', value: '3200 sq.ft.' },
      { name: 'Dimensions', value: '40ft × 80ft' },
      { name: 'Facing', value: 'North' },
      { name: 'Approval', value: 'BMRDA Approved' },
      { name: 'Registration', value: 'Ready for Registration' },
    ],
    location: {
      address: 'Lakeside Manor, Whitefield, Bangalore',
      landmarks: ['Adjacent to Lake', '10 km from Tech Park', 'Near International Hospital'],
    },
    documents: ['Title Deed', 'Encumbrance Certificate', 'Land Survey', 'Approval Certificate'],
  },
};

export default function PlotDetailsScreen() {
  const { id } = useLocalSearchParams();
  const plotId = id as string;
  const plot = plotsData[plotId];
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Function to handle booking navigation
  const handleBookVisit = () => {
    router.push(`/booking/${plotId}`);
  };

  // Function to handle wishlist
  const handleAddToWishlist = () => {
    Alert.alert(
      "Added to Wishlist",
      `${plot.plotNumber} in ${plot.projectName} has been added to your wishlist.`
    );
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
    <ScrollView style={styles.container}>
      {/* Image Gallery */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: plot.images[activeImageIndex] }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        
        <View style={styles.thumbnailsContainer}>
          {plot.images.map((image: string, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveImageIndex(index)}
              style={[
                styles.thumbnailWrapper,
                activeImageIndex === index && styles.activeThumbnail
              ]}
            >
              <Image source={{ uri: image }} style={styles.thumbnail} />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.imageIndicators}>
          {plot.images.map((_: string, index: number) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === activeImageIndex && styles.activeIndicator
              ]}
            />
          ))}
        </View>
      </View>
      
      {/* Plot Info Header */}
      <View style={styles.infoHeader}>
        <View style={styles.headerTop}>
          <Text style={styles.plotNumber}>{plot.plotNumber}</Text>
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusBadge, 
                plot.status === 'Available' ? styles.statusAvailable : styles.statusSold
              ]}
            >
              <Text style={styles.statusText}>{plot.status}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.projectName}>{plot.projectName}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>{plot.price}</Text>
          <Text style={styles.size}>Size: {plot.size}</Text>
        </View>
        
        <Text style={styles.description}>{plot.description}</Text>
      </View>
      
      {/* Features */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresGrid}>
          {plot.features.map((feature: { name: string; value: string }, index: number) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureName}>{feature.name}</Text>
              <Text style={styles.featureValue}>{feature.value}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Amenities */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {plot.amenities.map((amenity: string, index: number) => (
            <View key={index} style={styles.amenityItem}>
              <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Location */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={18} color="#3366CC" />
            <Text style={styles.addressText}>{plot.location.address}</Text>
          </View>
          
          <View style={styles.landmarksContainer}>
            {plot.location.landmarks.map((landmark: string, index: number) => (
              <View key={index} style={styles.landmarkItem}>
                <Ionicons name="navigate-outline" size={16} color="#666" />
                <Text style={styles.landmarkText}>{landmark}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Map View</Text>
          </View>
        </View>
      </View>
      
      {/* Documents */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Legal Documents</Text>
        <View style={styles.documentsContainer}>
          {plot.documents.map((document: string, index: number) => (
            <View key={index} style={styles.documentItem}>
              <Ionicons name="document-text-outline" size={18} color="#3366CC" />
              <Text style={styles.documentText}>{document}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.wishlistButton}
          onPress={handleAddToWishlist}
        >
          <Ionicons name="heart-outline" size={24} color="#3366CC" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBookVisit}
        >
          <Text style={styles.bookButtonText}>Book a Visit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 250,
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  thumbnailWrapper: {
    width: 48,
    height: 48,
    marginLeft: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    overflow: 'hidden',
  },
  activeThumbnail: {
    borderColor: '#D4AF37',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginRight: 6,
  },
  activeIndicator: {
    backgroundColor: '#D4AF37',
  },
  infoHeader: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plotNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusAvailable: {
    backgroundColor: '#e8f5e9',
  },
  statusSold: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  projectName: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3366CC',
  },
  size: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  sectionContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    width: '50%',
    marginBottom: 12,
  },
  featureName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  featureValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  amenityText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  locationContainer: {
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  landmarksContainer: {
    marginBottom: 12,
  },
  landmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  landmarkText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  mapPlaceholder: {
    height: 160,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
    color: '#999',
  },
  documentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  documentText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 12,
    marginBottom: 24,
  },
  wishlistButton: {
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    marginRight: 16,
  },
  bookButton: {
    flex: 1,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3366CC',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
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