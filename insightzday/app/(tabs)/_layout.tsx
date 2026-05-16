import { Tabs, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import insight from '../../assets/images/insightzzzzz.png';
import { Image } from 'react-native';

const HeaderRight = () => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={styles.headerRight}>
      <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/wishlist')}>
        <View style={styles.headerIconContainer}>
          <MaterialCommunityIcons name="heart-outline" size={24} color={colors.text} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/notifications')}>
        <View style={styles.headerIconContainer}>
          <MaterialCommunityIcons name="bell-outline" size={24} color={colors.text} />
          <View style={[styles.notificationBadge, { backgroundColor: colors.error }]} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/cart')}>
        <View style={styles.headerIconContainer}>
          <MaterialCommunityIcons name="cart-outline" size={24} color={colors.text} />
          <View style={[styles.cartBadge, { backgroundColor: colors.success }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function TabLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text,
        headerRight: () => <HeaderRight />,
        headerRightContainerStyle: {
          paddingRight: 12,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: '',
          headerLeft: () => (
            <View style={{ marginLeft: 0, paddingTop: 4 }}>
              <Image
                style={{ width: 180, height: 64, resizeMode: 'contain' }}
                source={insight}
              />
            </View>
          ),
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Personalized Search',
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="deals"
        options={{
          title: 'Top Offers',
          tabBarLabel: 'Deals',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tag-heart" color={color} size={size + 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size + 2} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  headerIconContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10b981',
  },
  logoText: {
    fontSize: 26,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 1.2,
  },
});
