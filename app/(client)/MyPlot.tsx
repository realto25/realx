import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

// Define PlotType
type PlotType = {
  id: string;
  title: string;
  location: string;
  plotNumber: string;
  area: string;
  thumbnailUrl: string;
  purchaseDate?: string;
  status?: string;
  valueEstimate?: string;
  projectName?: string;
};

// Mock data for owned plots
const ownedPlots: PlotType[] = [
  {
    id: '1',
    title: 'Premium Villa Plot',
    location: 'Green Valley, Pune Road',
    area: '2400 Sq.Ft',
    purchaseDate: '15 Jan 2023',
    status: 'Registered',
    plotNumber: 'A-123',
    thumbnailUrl: 'https://images.pexels.com/photos/2098405/pexels-photo-2098405.jpeg',
    valueEstimate: '₹1.85 Cr',
    projectName: 'Green Valley Township',
  },
  {
    id: '2',
    title: 'Commercial Plot',
    location: 'Tech Park, MIDC Shiroli',
    area: '5000 Sq.Ft',
    purchaseDate: '05 Mar 2022',
    status: 'Registered',
    plotNumber: 'C-45',
    thumbnailUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    valueEstimate: '₹3.2 Cr',
    projectName: 'Shiroli Business Hub',
  },
  {
    id: '3',
    title: 'Farm Land',
    location: 'Radhanagari Road',
    area: '2 Acres',
    purchaseDate: '10 Sep 2021',
    status: 'In Process',
    plotNumber: 'F-78',
    thumbnailUrl: 'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg',
    valueEstimate: '₹70 Lac',
    projectName: 'Green Acres',
  },
];

export default function MyPlots() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Residential', 'Commercial', 'Farm Land'];

  const filteredPlots = ownedPlots.filter((plot) => {
    if (activeFilter !== 'All' && !plot.title.includes(activeFilter)) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        plot.title.toLowerCase().includes(query) ||
        plot.location.toLowerCase().includes(query) ||
        plot.plotNumber.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const renderPlot = ({ item }: { item: PlotType }) => (
    <View>
      <Link href={`/(guest)/plot-detail/${item.id}`} asChild>
        <TouchableOpacity
          style={styles.plotCard}
          accessibilityLabel={`View details for ${item.title}`}
          accessibilityRole="button"
        >
          <View style={styles.plotCardHeader}>
            <Image
              source={{ uri: item.thumbnailUrl }}
              style={styles.plotThumbnail}
              accessibilityLabel={`${item.title} thumbnail`}
            />
            <View style={styles.plotHeaderContent}>
              <Text style={styles.plotTitle}>{item.title}</Text>
              <Text style={styles.plotLocation}>
                <FontAwesome5 name="map-marker-alt" size={12} color="#6B7280" />{' '}
                {item.location}
              </Text>
              <View style={styles.plotBasicInfo}>
                <Text style={styles.plotInfoText}>{item.area}</Text>
                <View style={styles.plotInfoDivider} />
                <Text style={styles.plotInfoText}>Plot {item.plotNumber}</Text>
              </View>
            </View>
          </View>

          <View style={styles.plotCardBody}>
            <View style={styles.plotDetailItem}>
              <Text style={styles.plotDetailLabel}>Project</Text>
              <Text style={styles.plotDetailValue}>{item.projectName}</Text>
            </View>
            <View style={styles.plotDetailItem}>
              <Text style={styles.plotDetailLabel}>Estimated Value</Text>
              <Text style={styles.plotDetailValue}>{item.valueEstimate}</Text>
            </View>
            <View style={styles.plotDetailItem}>
              <Text style={styles.plotDetailLabel}>Purchase Date</Text>
              <Text style={styles.plotDetailValue}>{item.purchaseDate}</Text>
            </View>
            <View style={styles.plotDetailItem}>
              <Text style={styles.plotDetailLabel}>Status</Text>
              <View
                style={[
                  styles.statusPill,
                  item.status === 'Registered' ? styles.registeredPill : styles.processPill,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.status === 'Registered' ? styles.registeredText : styles.processText,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.plotCardFooter}>
            <Link href="/(guest)/QrCode" asChild>
              <TouchableOpacity
                style={styles.actionButton}
                accessibilityLabel={`View QR code for ${item.title}`}
                accessibilityRole="button"
              >
                <FontAwesome5 name="qrcode" size={16} color="#FF6B00" />
                <Text style={styles.actionButtonText}>View QR</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity
              style={[styles.actionButton, styles.viewButton]}
              accessibilityLabel={`View details for ${item.title}`}
              accessibilityRole="button"
            >
              <Text style={styles.viewButtonText}>View Details</Text>
              <FontAwesome5 name="chevron-right" size={12} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Properties</Text>
          <Text style={styles.headerSubtitle}>Manage your plots and lands</Text>
        </View>
        <Link href="/(tabs)/Notification" asChild>
          <TouchableOpacity
            style={styles.notificationButton}
            accessibilityLabel="View notifications"
            accessibilityRole="button"
          >
            <FontAwesome5 name="bell" size={20} color="#1F2937" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome5 name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by plot number, location..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Search plots"
          accessibilityRole="search"
          returnKeyType="search"
          clearButtonMode={Platform.OS === 'ios' ? 'while-editing' : 'never'}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <FontAwesome5 name="times" size={16} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <View key={filter}>
            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === filter && styles.activeFilterPill,
              ]}
              onPress={() => setActiveFilter(filter)}
              accessibilityLabel={`Filter by ${filter}`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Plot Statistics */}
      <View style={styles.statsContainer}>
        {[
          { value: '3', label: 'Total Plots' },
          { value: '₹5.75 Cr', label: 'Est. Value' },
          { value: '2', label: 'Registered' },
        ].map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Plot List */}
      <FlatList
        data={filteredPlots}
        renderItem={renderPlot}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.plotsListContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? 'No plots match your search.'
                : 'No plots found for the selected filter.'}
            </Text>
          </View>
        }
      />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  clearButton: {
    padding: 8,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterPill: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  filterText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  plotsListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  plotCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  plotCardHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  plotThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  plotHeaderContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  plotTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  plotLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
  },
  plotBasicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  plotInfoText: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  plotInfoDivider: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 10,
  },
  plotCardBody: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  plotDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  plotDetailLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  plotDetailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  registeredPill: {
    backgroundColor: '#D1FAE5',
  },
  processPill: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  registeredText: {
    color: '#065F46',
  },
  processText: {
    color: '#92400E',
  },
  plotCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF6B00',
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B00',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  viewButton: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  viewButtonText: {
    marginRight: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});