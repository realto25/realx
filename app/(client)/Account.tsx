import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

// Mock signOut function (replace with actual auth provider, e.g., Supabase or Firebase)
const signOut = async () => {
  try {
    // Example: For Supabase, use `await supabase.auth.signOut()`
    // Example: For Firebase, use `await firebase.auth().signOut()`
    console.log('User signed out');
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

export default function Account() {
  // Mock data for user profile
  const user = {
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+91 98765 43210',
    joinDate: 'Member since Jan 2022',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    properties: 3,
    notifications: 5,
    verificationStatus: 'Verified',
    accountType: 'Premium Client'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <FontAwesome5 name="cog" size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: user.profileImage }} 
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <View style={styles.verificationBadge}>
                <FontAwesome5 name="check-circle" size={12} color="#10B981" solid />
                <Text style={styles.verificationText}>{user.verificationStatus}</Text>
              </View>
              <Text style={styles.memberSince}>{user.joinDate}</Text>
            </View>
          </View>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.properties}</Text>
              <Text style={styles.statLabel}>Properties</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.accountType}</Text>
              <Text style={styles.statLabel}>Client Type</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        {/* Menu Sections */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="user" size={16} color="#FF6B00" solid />
            </View>
            <Text style={styles.menuItemText}>Personal Information</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="key" size={16} color="#FF6B00" solid />
            </View>
            <Text style={styles.menuItemText}>Security & Login</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="bell" size={16} color="#FF6B00" solid />
            </View>
            <Text style={styles.menuItemText}>Notifications</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{user.notifications}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Properties</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="file-alt" size={16} color="#FF6B00" solid />
            </View>
            <Text style={styles.menuItemText}>My Documents</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="chart-line" size={16} color="#FF6B00" solid />
            </View>
            <Text style={styles.menuItemText}>Value Trends</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="history" size={16} color="#FF6B00" solid />
            </View>
            <Text style={styles.menuItemText}>Transaction History</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Help & Support</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="question-circle" size={16} color="#FF6B00" solid />
            </View>
            <Text style={styles.menuItemText}>Help Center</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="comment-alt" size={16} color="#FF6B00" solid />
            </View>
            <Text style={styles.menuItemText}>Contact Support</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="shield-alt" size={16} color="#FF6B00" solid />
            </View>
            <Text style={styles.menuItemText}>Privacy & Terms</Text>
            <FontAwesome5 name="chevron-right" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => {
          signOut();
          router.replace('/role-select');
        }}>
          <FontAwesome5 name="sign-out-alt" size={16} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  verificationText: {
    fontSize: 14,
    color: '#10B981',
    marginLeft: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#6B7280',
  },
  profileStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF6B00',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEDE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
  },
  notificationBadge: {
    backgroundColor: '#FF6B00',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 24,
  },
});