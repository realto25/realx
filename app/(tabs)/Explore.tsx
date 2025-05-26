import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, Animated } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type ProjectType = {
  id: string;
  name: string;
  city: string;
  description: string;
  image: string;
  rating: number;
  plotsAvailable: number;
  priceRange: string;
  amenities: string[];
  featured?: boolean;
};

const projectsData: ProjectType[] = [
  {
    id: '1',
    name: 'Green Valley',
    city: 'Chennai',
    description: 'Premium residential plots in the heart of Chennai with excellent connectivity.',
    image: 'https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg',
    rating: 4.7,
    plotsAvailable: 42,
    priceRange: '₹40L - ₹85L',
    amenities: ['Clubhouse', 'Park', 'Security', 'Gym'],
    featured: true,
  },
  {
    id: '2',
    name: 'Lakeside Manor',
    city: 'Bangalore',
    description: 'Luxury plots with lake views and modern amenities.',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    rating: 4.5,
    plotsAvailable: 18,
    priceRange: '₹60L - ₹95L',
    amenities: ['Pool', 'Clubhouse', 'Security'],
  },
  {
    id: '3',
    name: 'Sunset Heights',
    city: 'Hyderabad',
    description: 'Scenic plots with excellent infrastructure.',
    image: 'https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg',
    rating: 4.2,
    plotsAvailable: 25,
    priceRange: '₹35L - ₹70L',
    amenities: ['Park', 'Gym', 'Security'],
  },
];

const cities = ['All', 'Chennai', 'Bangalore', 'Hyderabad', 'Kochi', 'Coimbatore'];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [activeTab, setActiveTab] = useState('All');
  const [animatedValues] = useState(cities.reduce((acc, city) => {
    acc[city] = new Animated.Value(1);
    return acc;
  }, {} as { [key: string]: Animated.Value }));
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to the selected city button
  useEffect(() => {
    if (scrollViewRef.current) {
      const index = cities.indexOf(selectedCity);
      const buttonWidth = 100; // Approximate width per button (minWidth + margin)
      const scrollX = index * buttonWidth;
      scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
    }
  }, [selectedCity]);

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'All' || project.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const navigateToProject = (projectId: string) => {
    router.push(`/plot/${projectId}-1`);
  };

  const navigateToNotifications = () => {
    router.push('/(tabs)/Notification');
  };

  const handlePressIn = (city: string) => {
    Animated.spring(animatedValues[city], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (city: string) => {
    Animated.spring(animatedValues[city], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderProjectItem = ({ item }: { item: ProjectType }) => (
    <TouchableOpacity 
      style={[styles.projectCard, item.featured && styles.featuredCard]}
      onPress={() => navigateToProject(item.id)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.projectImage} />
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        />
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.projectContent}>
        <View style={styles.projectHeader}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text style={styles.projectLocation}>
            <Ionicons name="location-outline" size={14} color="#666" /> {item.city}
          </Text>
        </View>
        
        <Text style={styles.projectDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.priceRange}</Text>
          <Text style={styles.plotsText}>{item.plotsAvailable} plots available</Text>
        </View>
        
        <View style={styles.amenitiesContainer}>
          {item.amenities.slice(0, 3).map((amenity, index) => (
            <View key={index} style={styles.amenityBadge}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
          {item.amenities.length > 3 && (
            <View style={styles.amenityBadge}>
              <Text style={styles.amenityText}>+{item.amenities.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Perfect Plot</Text>
        <TouchableOpacity onPress={navigateToNotifications}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.tabsContainer}
      >
        {['All', 'Featured', 'Premium', 'Budget'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.tabButtonActive
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.tabTextActive
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Popular Locations */}
      <Text style={styles.sectionTitle}>Popular Locations</Text>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.filtersContainer}
      >
        {cities.map((city) => (
          <Animated.View
            key={city}
            style={[
              styles.filterButton,
              selectedCity === city && styles.filterButtonActive,
              { transform: [{ scale: animatedValues[city] }] }
            ]}
          >
            <TouchableOpacity
              onPress={() => setSelectedCity(city)}
              onPressIn={() => handlePressIn(city)}
              onPressOut={() => handlePressOut(city)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedCity === city && styles.filterButtonTextActive
              ]}>
                {city}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search projects, locations..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="tune" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Projects List */}
      <FlatList
        data={filteredProjects}
        renderItem={renderProjectItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Recommended Projects</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome name="search" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No matching projects found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search criteria</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#3366CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  tabButtonActive: {
    backgroundColor: '#3366CC',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 20,
    marginVertical: 12,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    flexGrow: 0, // Prevent content from stretching beyond screen
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    minWidth: 100, // Increased for larger tap targets
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#1E3A8A',
    borderColor: '#1E3A8A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  filterButtonTextActive: {
    color: '#F9FAFB',
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  projectCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featuredCard: {
    borderWidth: 2,
    borderColor: '#3366CC',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#3366CC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    zIndex: 1,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    zIndex: 1,
  },
  ratingText: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  projectContent: {
    padding: 20,
  },
  projectHeader: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  projectLocation: {
    fontSize: 14,
    color: '#666',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3366CC',
  },
  plotsText: {
    fontSize: 14,
    color: '#666',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  amenityBadge: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 12,
    color: '#3366CC',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
});