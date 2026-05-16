import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Product data for each category
import pic1 from '../../../assets/images/pic (1).jpg';
import pic2 from '../../../assets/images/pic (2).jpg';
import pic3 from '../../../assets/images/pic (3).jpg';
import pic4 from '../../../assets/images/pic (4).jpg';
import pic5 from '../../../assets/images/pic (5).jpg';
import pic6 from '../../../assets/images/pic (6).jpg';
import pic7 from '../../../assets/images/pic (7).jpg';
import pic8 from '../../../assets/images/pic (8).jpg';
import pic9 from '../../../assets/images/pic (9).jpg';
import pic10 from '../../../assets/images/pic (10).jpg';
import pic11 from '../../../assets/images/pic (11).jpg';
import pic12 from '../../../assets/images/pic (12).jpg';
import pic13 from '../../../assets/images/pic (13).jpg';
import pic14 from '../../../assets/images/pic (14).jpg';
import pic15 from '../../../assets/images/pic (15).jpg';

const CATEGORY_PRODUCTS = {
  rides: {
    name: 'Ride Services',
    icon: 'car',
    products: [
      { id: '1', name: 'Trip to Colombo', from: 'Galle Face', to: 'Colombo Fort', distance: '8 km', image: pic11 },
      { id: '2', name: 'Airport Pickup', from: 'Your Location', to: 'CMB Airport', distance: '18 km', image: pic12 },
      { id: '3', name: 'Mall Visit', from: 'Home', to: 'Colombo Shopping Mall', distance: '5 km', image: pic13 },
      { id: '4', name: 'Office Commute', from: 'Home', to: 'Downtown Office', distance: '12 km', image: pic14 },
    ]
  },
  food: {
    name: 'Food Delivery',
    icon: 'food',
    products: [
      { id: '1', name: 'Women\'s Day Bouquet Deal', restaurant: 'Subway', category: 'Sandwich', image: pic2 },
      { id: '2', name: 'Zinger Burger & Bites Combo', restaurant: 'KFC', category: 'Fast Food', image: pic4 },
      { id: '3', name: 'Authentic Family Asian Combo', restaurant: 'WokWay', category: 'Asian', image: pic15 },
      { id: '4', name: 'Midnight Burger Feast', restaurant: 'UrbanEats', category: 'Burgers', image: pic12 },
    ]
  },
  grocery: {
    name: 'Grocery Shopping',
    icon: 'basket',
    products: [
      { id: '1', name: 'Fresh Pineapple (per 100g)', store: 'SPAR Sri Lanka', items: 'Fresh Produce', image: pic3 },
      { id: '2', name: 'Fresh Whole Norway Salmon (KG)', store: 'SPAR Qatar', items: 'Seafood', image: pic8 },
      { id: '3', name: 'Kohinoor Everyday Basmati Rice 4.5Kg', store: 'SPAR Qatar', items: 'Pantry Staples', image: pic9 },
      { id: '4', name: 'Imported Fresh Lebanon Peaches (KG)', store: 'SPAR Qatar', items: 'Fresh Produce', image: pic10 },
    ]
  },
  retail: {
    name: 'Retail Shopping',
    icon: 'shopping',
    products: [
      { id: '1', name: 'Samsung Side-by-Side Refrigerator', brand: 'Samsung', price: 'Wowrutu Vasi Sale', image: pic1 },
      { id: '2', name: 'Ergonomic Executive Mesh Chair', brand: 'Damro', price: '15% Off Promo', image: pic5 },
      { id: '3', name: 'GoodWe DNS 5kW Inverter System', brand: 'GoodWe', price: 'LKR 120,000 Off', image: pic6 },
      { id: '4', name: 'Skechers Performance Shoes', brand: 'ODEL Sports', price: 'LKR 9,765', image: pic7 },
    ]
  },
};

export default function ProductListingScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  
  const categoryId = typeof category === 'string' ? category : Array.isArray(category) ? category[0] : 'rides';
  const data = CATEGORY_PRODUCTS[categoryId as keyof typeof CATEGORY_PRODUCTS] || CATEGORY_PRODUCTS.rides;

  const handleProductSelect = (productId: string) => {
    router.push(`/product/${categoryId}/${productId}`);
  };

  const renderProductCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => handleProductSelect(item.id)}
    >
      <Image
        source={
          typeof item.image === 'string' && item.image.startsWith('http')
            ? { uri: item.image } // For network strings
            : item.image          // For local asset variables (pic1, pic2, etc.)
        }
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productOverlay} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDetails}>
          {item.from && item.to && `${item.from} → ${item.to}`}
          {item.restaurant && `${item.restaurant} • ${item.category}`}
          {item.store && `${item.store} • ${item.items}`}
          {item.brand && `${item.brand} • ${item.price}`}
        </Text>
        {item.distance && <Text style={styles.productDistance}>📍 {item.distance}</Text>}
      </View>
      <View style={styles.selectButton}>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#38bdf8" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#0f172a" />
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <MaterialCommunityIcons name={CATEGORY_PRODUCTS[categoryId as keyof typeof CATEGORY_PRODUCTS]?.icon || 'package' as any} size={24} color="#38bdf8" />
          <Text style={styles.headerText}>{data.name}</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={data.products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f6ef',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50, // Increased padding to adjust for StatusBar
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    height: 180,
    position: 'relative',
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  productOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    zIndex: 1,
  },
  productName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  productDetails: {
    color: '#cbd5e1',
    fontSize: 13,
    marginBottom: 6,
  },
  productDistance: {
    color: '#94a3b8',
    fontSize: 12,
  },
  selectButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 8,
    zIndex: 2,
  },
});
