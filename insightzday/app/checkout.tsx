import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'expo-router';

export default function CheckoutScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 15,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginLeft: 15,
    },
    content: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
      marginTop: 8,
    },
    // Item section
    orderCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    itemImage: {
      width: 60,
      height: 60,
      borderRadius: 10,
      marginRight: 16,
    },
    itemInfo: {
      flex: 1,
      justifyContent: 'center',
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    itemPrice: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    // Address Section
    addressCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconBg: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.accent + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    addressInfo: {
      flex: 1,
    },
    addressTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    addressDesc: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    // Payment Method
    paymentCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    paymentInfo: {
      flex: 1,
    },
    // Bill details
    billContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 100,
    },
    billRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    billText: {
      fontSize: 15,
      color: colors.textSecondary,
    },
    billValue: {
      fontSize: 15,
      color: colors.text,
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.accent,
    },
    // Floating Footer
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: colors.card,
      padding: 20,
      paddingBottom: 30,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    payButton: {
      backgroundColor: colors.accent,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    payButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.orderCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' }} 
            style={styles.itemImage} 
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>Nike ZoomX Invincible</Text>
            <Text style={styles.itemPrice}>$180.00</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TouchableOpacity style={styles.addressCard}>
          <View style={styles.iconBg}>
            <MaterialCommunityIcons name="map-marker" size={20} color={colors.accent} />
          </View>
          <View style={styles.addressInfo}>
            <Text style={styles.addressTitle}>Home</Text>
            <Text style={styles.addressDesc}>123 Colombo St, 00300, Sri Lanka</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textTertiary} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity style={styles.paymentCard}>
          <View style={[styles.iconBg, { backgroundColor: '#e0e7ff' }]}>
            <MaterialCommunityIcons name="credit-card" size={20} color="#4f46e5" />
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.addressTitle}>Mastercard ending in **** 4582</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textTertiary} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.billContainer}>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Subtotal</Text>
            <Text style={styles.billValue}>$180.00</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Delivery Fee</Text>
            <Text style={styles.billValue}>$5.00</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Discount (10%)</Text>
            <Text style={[styles.billValue, { color: '#10b981' }]}>-$18.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.billRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalValue}>$167.00</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton}>
          <MaterialCommunityIcons name="lock" size={18} color="#fff" />
          <Text style={styles.payButtonText}>Pay $167.00 securely</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
