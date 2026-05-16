import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Deal Available',
    description: 'Burger King meal with 15% off',
    time: '2 hours ago',
    icon: 'tag-heart',
    color: '#ec4899',
    read: false,
  },
  {
    id: '2',
    title: 'Order Confirmed',
    description: 'Your trip to Colombo is confirmed',
    time: '5 hours ago',
    icon: 'check-circle',
    color: '#10b981',
    read: false,
  },
  {
    id: '3',
    title: 'Delivery Update',
    description: 'Your groceries will arrive in 1 hour',
    time: '1 day ago',
    icon: 'truck-delivery',
    color: '#38bdf8',
    read: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      paddingTop: insets.top + 8,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
      textAlign: 'center',
    },
    notificationCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    notificationCardUnread: {
      backgroundColor: colors.background,
    },
    notificationIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    notificationContent: {
      flex: 1,
    },
    notificationTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 4,
    },
    notificationDescription: {
      color: colors.textSecondary,
      fontSize: 13,
      marginBottom: 4,
    },
    notificationTime: {
      color: colors.textTertiary,
      fontSize: 12,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.accent,
      marginLeft: 12,
    },
    listContent: {
      paddingVertical: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      color: colors.textTertiary,
      fontSize: 16,
      marginTop: 12,
    },
  });

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[dynamicStyles.notificationCard, !item.read && dynamicStyles.notificationCardUnread]}
      activeOpacity={0.7}
    >
      <View style={[dynamicStyles.notificationIcon, { backgroundColor: `${item.color}20` }]}>
        <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
      </View>
      <View style={dynamicStyles.notificationContent}>
        <Text style={dynamicStyles.notificationTitle}>{item.title}</Text>
        <Text style={dynamicStyles.notificationDescription}>{item.description}</Text>
        <Text style={dynamicStyles.notificationTime}>{item.time}</Text>
      </View>
      {!item.read && <View style={dynamicStyles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* List */}
      {NOTIFICATIONS.length > 0 ? (
        <FlatList
          data={NOTIFICATIONS}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={dynamicStyles.listContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={dynamicStyles.emptyContainer}>
          <MaterialCommunityIcons name="bell-off-outline" size={64} color={colors.textTertiary} />
          <Text style={dynamicStyles.emptyText}>No notifications yet</Text>
        </View>
      )}
    </View>
  );
}

// Dynamic styles are created inside the component using the theme context

