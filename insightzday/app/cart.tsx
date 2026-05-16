import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

import pic1 from '../assets/images/pic (1).jpg';
import pic2 from '../assets/images/pic (2).jpg';
import pic3 from '../assets/images/pic (3).jpg';
import pic4 from '../assets/images/pic (4).jpg';
import pic5 from '../assets/images/pic (5).jpg';
import pic6 from '../assets/images/pic (6).jpg';
import pic7 from '../assets/images/pic (7).jpg';
import pic8 from '../assets/images/pic (8).jpg';
import pic9 from '../assets/images/pic (9).jpg';
import pic10 from '../assets/images/pic (10).jpg';
import pic11 from '../assets/images/pic (11).jpg';
import pic12 from '../assets/images/pic (12).jpg';
import pic13 from '../assets/images/pic (13).jpg';
import pic14 from '../assets/images/pic (14).jpg';
import pic15 from '../assets/images/pic (15).jpg';

const CART_ITEMS = [
  {
    id: '1',
    title: 'Samsung Side-by-Side Refrigerator',
    price: '285000',
    quantity: 1,
    image: pic1,
  },
  {
    id: '2',
    title: 'Subway Melts & Cookies Bouquet',
    price: '2500',
    quantity: 2,
    image: pic2,
  },
  {
    id: '3',
    title: 'Fresh Pineapple (per 100g)',
    price: '112',
    quantity: 5,
    image: pic3,
  },
  {
    id: '4',
    title: 'KFC Zinger Burger Combo',
    price: '3990',
    quantity: 1,
    image: pic4,
  },
  {
    id: '5',
    title: 'Damro Ergonomic Mesh Chair',
    price: '18500',
    quantity: 1,
    image: pic5,
  },
  {
    id: '6',
    title: 'GoodWe DNS 5kW Inverter',
    price: '345000',
    quantity: 1,
    image: pic6,
  },
  {
    id: '7',
    title: 'Skechers Slip-On Performance',
    price: '9765',
    quantity: 1,
    image: pic7,
  },
  {
    id: '8',
    title: 'Fresh Whole Norway Salmon (1KG)',
    price: '40',
    quantity: 2,
    image: pic8,
  },
  {
    id: '9',
    title: 'Kohinoor Everyday Basmati Rice 4.5Kg',
    price: '25',
    quantity: 1,
    image: pic9,
  },
  {
    id: '10',
    title: 'Fresh Lebanon Peaches (1KG)',
    price: '9',
    quantity: 3,
    image: pic10,
  },
  {
    id: '11',
    title: 'Trip to Colombo (Galle Face → Fort)',
    price: '850',
    quantity: 1,
    image: pic11,
  },
  {
    id: '12',
    title: 'Midnight Burger Feast Combo',
    price: '1800',
    quantity: 2,
    image: pic12,
  },
  {
    id: '13',
    title: 'Pro Noise Cancelling Buds',
    price: '24500',
    quantity: 1,
    image: pic13,
  },
  {
    id: '14',
    title: 'Authentic Family Asian Combo',
    price: '2100',
    quantity: 1,
    image: pic14,
  },
  {
    id: '15',
    title: 'Electric City Scooter Rental',
    price: '450',
    quantity: 1,
    image: pic15,
  }
];

export default function CartScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: insets.top + 10,
      paddingBottom: 15,
      backgroundColor: colors.background,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.5,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    cartCard: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      // Subtle elevation
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    itemImage: {
      width: 90,
      height: 90,
      borderRadius: 14,
      backgroundColor: colors.border,
    },
    itemInfo: {
      flex: 1,
      marginLeft: 15,
      justifyContent: 'space-between',
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      flex: 1,
      marginRight: 8,
    },
    itemPrice: {
      fontSize: 17,
      fontWeight: '800',
      color: colors.accent,
    },
    currency: {
      fontSize: 12,
      fontWeight: '600',
      opacity: 0.7,
    },
    controlsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    quantityPill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingHorizontal: 4,
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    qtyBtn: {
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    qtyText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
      marginHorizontal: 12,
    },
    // Footer Section
    footer: {
      backgroundColor: colors.card,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 25,
      paddingTop: 20,
      paddingBottom: insets.bottom + 10,
      borderTopWidth: 1,
      borderColor: colors.border,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    summaryLabel: {
      fontSize: 15,
      color: colors.textSecondary,
    },
    summaryValue: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    totalRow: {
      marginTop: 5,
      paddingTop: 15,
      borderTopWidth: 1,
      borderColor: colors.border,
      marginBottom: 20,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    totalValue: {
      fontSize: 22,
      fontWeight: '900',
      color: colors.accent,
    },
    checkoutBtn: {
      backgroundColor: colors.accent,
      height: 60,
      borderRadius: 18,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 6,
    },
    checkoutText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 10,
    },
  });

  const subtotal = CART_ITEMS.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
  const delivery = 200;

  const renderCartItem = ({ item }) => (
    <View style={styles.cartCard}>
      <Image
  source={
    typeof item.image === 'string' && item.image.startsWith('http')
      ? { uri: item.image } // For web links
      : item.image          // For local asset variables (pic1, pic2, etc.)
  }
  style={styles.itemImage}
  resizeMode="cover"
/>
      <View style={styles.itemInfo}>
        <View style={styles.titleRow}>
          <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
          <TouchableOpacity hitSlop={10}>
            <MaterialCommunityIcons name="close-circle-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.controlsRow}>
          <View style={styles.quantityPill}>
            <TouchableOpacity style={styles.qtyBtn}>
              <MaterialCommunityIcons name="minus" size={16} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn}>
              <MaterialCommunityIcons name="plus" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>
            <Text style={styles.currency}>LKR </Text>{item.price}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity>
          <Text style={{ color: colors.error, fontWeight: '600' }}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={CART_ITEMS}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Grounded Footer */}
      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>LKR {subtotal.toLocaleString()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>LKR {delivery}</Text>
        </View>
        
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>LKR {(subtotal + delivery).toLocaleString()}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.8}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}