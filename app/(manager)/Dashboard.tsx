import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Platform, SafeAreaView, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const summaryCards = [
  {
    title: 'Total Leads',
    value: '2,543',
    icon: <FontAwesome5 name="users" size={24} color="#3366CC" />,
    trend: '+12.5%',
    trendPositive: true,
  },
  {
    title: 'New Leads',
    value: '187',
    icon: <FontAwesome5 name="user-plus" size={24} color="#10B981" />,
    trend: '+32.1%',
    trendPositive: true,
  },
  {
    title: 'Conversion Rate',
    value: '24.3%',
    icon: <MaterialIcons name="trending-up" size={24} color="#FF6B00" />,
    trend: '-2.4%',
    trendPositive: false,
  },
  {
    title: 'Attendance',
    value: '92%',
    icon: <Ionicons name="checkmark-done-circle" size={24} color="#F59E42" />,
    trend: '+3.2%',
    trendPositive: true,
  },
];

const recentLeads = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    status: 'New',
    date: '2023-06-15',
    source: 'Website',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 234-5678',
    status: 'Contacted',
    date: '2023-06-14',
    source: 'Referral',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '(555) 345-6789',
    status: 'Qualified',
    date: '2023-06-13',
    source: 'LinkedIn',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    phone: '(555) 456-7890',
    status: 'Proposal',
    date: '2023-06-12',
    source: 'Trade Show',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    phone: '(555) 567-8901',
    status: 'Closed',
    date: '2023-06-11',
    source: 'Email Campaign',
  },
];

const statusColors = {
  New: '#3366CC',
  Contacted: '#F59E42',
  Qualified: '#10B981',
  Proposal: '#A78BFA',
  Closed: '#6B7280',
};

const assignedClients = [
  { id: 'c1', name: 'Priya Sharma', phone: '+91 98765 43210', status: 'Pending' },
  { id: 'c2', name: 'Amit Verma', phone: '+91 90000 12345', status: 'Accepted' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ManagerDashboard() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Manager Dashboard</Text>
          <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/(manager)/notifications')}>
            <Ionicons name="notifications-outline" size={24} color="#3366CC" />
          </TouchableOpacity>
        </View>

        {/* Assigned Clients/Guests */}
        <Text style={styles.sectionTitle}>Assigned Clients/Guests</Text>
        <FlatList
          data={assignedClients}
          keyExtractor={item => item.id}
          style={styles.leadsList}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={styles.leadCard}>
              <View style={styles.leadInfo}>
                <View style={[styles.leadAvatar, { backgroundColor: '#E0ECFF' }] }>
                  <Text style={{ color: '#3366CC', fontWeight: 'bold' }}>{item.name[0]}</Text>
                </View>
                <View>
                  <Text style={styles.leadName}>{item.name}</Text>
                  <Text style={styles.leadEmail}>{item.phone}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.status === 'Pending' && (
                  <>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981', paddingHorizontal: 10, paddingVertical: 6, marginRight: 8 }]}>
                      <Text style={{ color: '#fff', fontWeight: '600' }}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#EF4444', paddingHorizontal: 10, paddingVertical: 6, marginRight: 8 }]}>
                      <Text style={{ color: '#fff', fontWeight: '600' }}>Decline</Text>
                    </TouchableOpacity>
                  </>
                )}
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3366CC', paddingHorizontal: 10, paddingVertical: 6 }]}>
                  <FontAwesome5 name="phone" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Summary Cards */}
        <View style={styles.cardsRow}>
          {summaryCards.map((card, idx) => (
            <View key={idx} style={[styles.card, idx !== summaryCards.length - 1 && { marginRight: 8 }]}>
              <View style={styles.cardIcon}>{card.icon}</View>
              <Text style={styles.cardValue}>{card.value}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <View style={styles.cardTrendRow}>
                <FontAwesome5
                  name={card.trendPositive ? 'arrow-up' : 'arrow-down'}
                  size={12}
                  color={card.trendPositive ? '#10B981' : '#EF4444'}
                />
                <Text style={[styles.cardTrend, { color: card.trendPositive ? '#10B981' : '#EF4444' }]}>{card.trend}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
        <Link href="/(manager)/attendance" asChild>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981' }]}> 
              <MaterialIcons name="event-available" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Mark Attendance</Text>
            </TouchableOpacity>
        </Link>
        <Link href="/(manager)/chat" asChild>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#3366CC' }]}> 
              <MaterialIcons name="chat" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Chat with Admin</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(manager)/leave" asChild>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F59E42' }]}> 
              <MaterialIcons name="beach-access" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Request Leave</Text>
            </TouchableOpacity>
        </Link>
      </View>
      
        {/* Recent Leads */}
        <Text style={styles.sectionTitle}>Recent Leads</Text>
        <FlatList
          data={recentLeads}
          keyExtractor={item => item.id}
          style={styles.leadsList}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={styles.leadCard}>
              <View style={styles.leadInfo}>
                <View style={[styles.leadAvatar, { backgroundColor: statusColors[item.status as keyof typeof statusColors] + '22' }] }>
                  <Text style={{ color: statusColors[item.status as keyof typeof statusColors], fontWeight: 'bold' }}>{item.name[0]}</Text>
                </View>
                <View>
                  <Text style={styles.leadName}>{item.name}</Text>
                  <Text style={styles.leadEmail}>{item.email}</Text>
                  <Text style={styles.leadSource}>{item.source} • {new Date(item.date).toLocaleDateString()}</Text>
                </View>
              </View>
              <View style={[styles.leadStatus, { backgroundColor: statusColors[item.status as keyof typeof statusColors] + '22' }] }>
                <Text style={{ color: statusColors[item.status as keyof typeof statusColors], fontWeight: 'bold' }}>{item.status}</Text>
              </View>
            </View>
          )}
        />
        <Link href="/(manager)/leave" asChild>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View All Leads</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#3366CC" />
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    width: '100%',
    alignSelf: 'stretch',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 8,
    width: '100%',
    alignSelf: 'stretch',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    minWidth: 0,
    maxWidth: '100%',
    width: '100%',
    alignSelf: 'stretch',
    ...Platform.select({
      web: {
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
      },
    }),
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  cardTitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  cardTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardTrend: {
    fontSize: 12,
    marginLeft: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
    width: '100%',
    alignSelf: 'stretch',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 4,
    minWidth: 0,
    maxWidth: '100%',
    width: '100%',
    alignSelf: 'stretch',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 24,
    marginLeft: 8,
    marginBottom: 8,
    width: '100%',
    alignSelf: 'stretch',
  },
  leadsList: {
    marginHorizontal: 4,
    width: '100%',
    alignSelf: 'stretch',
  },
  flatListContent: {
    width: '100%',
    alignSelf: 'stretch',
  },
  leadCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    minWidth: 0,
    maxWidth: '100%',
    width: '100%',
    alignSelf: 'stretch',
    ...Platform.select({
      web: {
        boxShadow: '0 1px 1px rgba(0,0,0,0.06)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 1,
        elevation: 1,
      },
    }),
  },
  leadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leadAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  leadName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#1F2937',
  },
  leadEmail: {
    fontSize: 13,
    color: '#6B7280',
  },
  leadSource: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  leadStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 32,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E0ECFF',
    minWidth: 0,
    maxWidth: '100%',
    width: '100%',
    alignSelf: 'stretch',
  },
  viewAllButtonText: {
    color: '#3366CC',
    fontWeight: '600',
    fontSize: 15,
    marginRight: 8,
  },
});