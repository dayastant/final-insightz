import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';

const { width } = Dimensions.get('window');

import pic1 from '../../../assets/images/pic (1).jpg';
import pic2 from '../../../assets/images/pic (2).jpg';
import pic3 from '../../../assets/images/pic (3).jpg';
import pic4 from '../../../assets/images/pic (4).jpg';
import pic5 from '../../../assets/images/pic (5).jpg';
import pic11 from '../../../assets/images/pic (11).jpg';
import pic12 from '../../../assets/images/pic (12).jpg';

const PRODUCT_DETAILS = {
  rides: {
    '1': {
      title: 'Trip to Colombo',
      price: 'LKR 850',
      originalPrice: 'LKR 1,050',
      image: pic11,
      description: 'Premium ride service for your trip to Colombo city center. Experience comfortable and safe transportation with professional drivers.',
      specifications: [
        { icon: 'car', label: 'Vehicle Type', value: 'Premium Sedan' },
        { icon: 'map-marker', label: 'Distance', value: '8 KM' },
        { icon: 'clock-outline', label: 'Est. Time', value: '12 mins' },
        { icon: 'users', label: 'Capacity', value: '4 Passengers' },
      ],
      rating: 4.8,
      reviews: [
        { author: 'John D.', rating: 5, text: 'Excellent service! Driver was courteous and the ride was smooth.' },
        { author: 'Sarah M.', rating: 4, text: 'Good experience, clean car and on-time service.' },
        { author: 'Mike P.', rating: 5, text: 'Best ride option in the city. Highly recommended!' },
      ],
      inStock: true,
    },
    '2': {
      title: 'Airport Pickup',
      price: 'LKR 2,100',
      originalPrice: 'LKR 2,500',
      image: pic12,
      description: 'Reliable airport transfer service with professional drivers. Pre-booked pickup service with flight tracking.',
      specifications: [
        { icon: 'car', label: 'Vehicle Type', value: 'Executive SUV' },
        { icon: 'map-marker', label: 'Distance', value: '18 KM' },
        { icon: 'clock-outline', label: 'Est. Time', value: '22 mins' },
        { icon: 'users', label: 'Capacity', value: '6 Passengers' },
      ],
      rating: 4.9,
      reviews: [
        { author: 'Emma L.', rating: 5, text: 'Perfect for airport transfers. Punctual and professional.' },
        { author: 'Robert K.', rating: 5, text: 'Driver waited patiently for my late arrival. Excellent service!' },
      ],
      inStock: true,
    },
  },
  food: {
    '1': {
      title: 'Subway Melts & Cookies Bouquet',
      price: 'LKR 2,500',
      originalPrice: 'LKR 3,125',
      image: pic2,
      description: 'Exclusive Women\'s Day special combo bouquet featuring delicious baked savory subs and signature melt-in-the-mouth cookies.',
      specifications: [
        { icon: 'leaf', label: 'Cuisine', value: 'Sandwiches & Fast Food' },
        { icon: 'clock-outline', label: 'Delivery Time', value: '20-30 mins' },
        { icon: 'fire', label: 'Deal Type', value: 'Limited Holiday Bouquet' },
        { icon: 'check-circle', label: 'Availability', value: '10:00 AM - 10:00 PM' },
      ],
      rating: 4.6,
      reviews: [
        { author: 'Alex T.', rating: 5, text: 'Arrived beautifully organized! The cookie-sandwich combo combo is perfect value.' },
        { author: 'Lisa J.', rating: 4, text: 'Very unique presentation style, tasted incredibly fresh.' },
      ],
      inStock: true,
    },
    '2': {
      title: 'KFC Zinger Burger Combo',
      price: 'LKR 3,990',
      originalPrice: 'LKR 5,200',
      image: pic4,
      description: 'Massive party bundle containing 4 signature crisp Zinger Burgers, 8 pieces of spicy Kochchi Bites, and a cold refreshing Pepsi beverage.',
      specifications: [
        { icon: 'leaf', label: 'Cuisine', value: 'American Fried Chicken' },
        { icon: 'clock-outline', label: 'Delivery Time', value: '15-25 mins' },
        { icon: 'resize', label: 'Size', value: 'Family Sharing Bundle' },
        { icon: 'check-circle', label: 'Availability', value: '11:00 AM - 11:00 PM' },
      ],
      rating: 4.7,
      reviews: [
        { author: 'David M.', rating: 5, text: 'Kochchi bites packing real heat! Burgers were wonderfully crispy.' },
        { author: 'Nina S.', rating: 5, text: 'The perfect weekend sharing package. Arrived steaming hot.' },
      ],
      inStock: true,
    },
  },
  grocery: {
    '1': {
      title: 'Fresh Pineapple (per 100g)',
      price: 'LKR 112',
      originalPrice: 'LKR 140',
      image: pic3,
      description: 'Premium sweet handpicked pineapples sourced directly from local plantations, delivered entirely fresh.',
      specifications: [
        { icon: 'basket', label: 'Department', value: 'Fresh Fruits' },
        { icon: 'clock-outline', label: 'Delivery', value: '1-2 hours' },
        { icon: 'leaf', label: 'Freshness', value: '100% Organic Quality' },
        { icon: 'check-circle', label: 'Availability', value: 'Daily stock' },
      ],
      rating: 4.5,
      reviews: [
        { author: 'Patricia R.', rating: 5, text: 'Super juicy and exceptionally sweet. Great fresh selection by SPAR.' },
        { author: 'James H.', rating: 4, text: 'Perfect fruit quality, securely packed during transport.' },
      ],
      inStock: true,
    },
  },
  retail: {
    '1': {
      title: 'Samsung Side-by-Side Refrigerator',
      price: 'Check Store',
      originalPrice: 'LKR 450,000',
      image: pic1,
      description: 'Premium Samsung double-door smart cooling refrigerator featuring massive storage chambers and multi-flow advanced temperature ventilation.',
      specifications: [
        { icon: 'flash', label: 'Energy Class', value: 'Digital Inverter technology' },
        { icon: 'door', label: 'Design', value: 'Premium Steel Side-By-Side' },
        { icon: 'snowflake', label: 'Cooling Type', value: 'Twin Cooling Plus' },
        { icon: 'shield-check', label: 'Warranty', value: '10 Years on Compressor' },
      ],
      rating: 4.8,
      reviews: [
        { author: 'Tom W.', rating: 5, text: 'Incredible storage volume and completely noiseless operation.' },
        { author: 'Anna B.', rating: 5, text: 'Stunning premium finish. Keeps veggies fresh for ages.' },
      ],
      inStock: true,
    },
    '2': {
      title: 'Damro Ergonomic Mesh Chair',
      price: 'Check Store',
      originalPrice: 'LKR 24,500',
      image: pic5,
      description: 'Highback breathable mesh executive office chair featuring specialized lumber support structural alignment and pneumatic gas-lift configurations.',
      specifications: [
        { icon: 'seat', label: 'Support Type', value: 'Adjustable Lumbar Alignment' },
        { icon: 'hammer', label: 'Material', value: 'Heavy Duty Nylon & Mesh fabric' },
        { icon: 'arrow-up-down', label: 'Adjustment', value: 'Tilt Mechanism & Gas Lift' },
        { icon: 'shield', label: 'Durability', value: 'Tested up to 120kg weight' },
      ],
      rating: 4.4,
      reviews: [
        { author: 'Chris L.', rating: 5, text: 'Excellent lower back support structure. Perfect for remote tech work.' },
        { author: 'Sophie M.', rating: 4, text: 'Very durable base frame setup, wheels roll smoothly across carpet.' },
      ],
      inStock: true,
    },
  },
};

export default function ProductDetailScreen() {
  const { category, productId } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { colors } = useTheme();

  const categoryId = typeof category === 'string' ? category : Array.isArray(category) ? category[0] : 'rides';
  const pId = typeof productId === 'string' ? productId : Array.isArray(productId) ? productId[0] : '1';

  const categoryData = PRODUCT_DETAILS[categoryId as keyof typeof PRODUCT_DETAILS] || {};
  const product = categoryData[pId as keyof typeof categoryData];

  if (!product) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center' }}>
        <Text style={{ color: colors.error, fontSize: 16, textAlign: 'center' }}>Product not found</Text>
      </View>
    );
  }

  const discountPercent = Math.round(((parseFloat(product.originalPrice?.replace(/\D/g, '')) - parseFloat(product.price.replace(/\D/g, ''))) / parseFloat(product.originalPrice?.replace(/\D/g, ''))) * 100);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 10,
      backgroundColor: colors.card + 'b0',
      padding: 8,
      borderRadius: 8,
    },
    imageContainer: {
      width,
      height: 300,
      position: 'relative',
      backgroundColor: colors.card,
    },
    mainImage: {
      width: '100%',
      height: '100%',
    },
    discountBadge: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: '#ef4444',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    discountText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 14,
    },
    contentContainer: {
      padding: 20,
      backgroundColor: colors.background,
    },
    headerSection: {
      marginBottom: 16,
    },
    title: {
      color: colors.text,
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    priceSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    price: {
      color: colors.success || '#10b981',
      fontSize: 24,
      fontWeight: 'bold',
    },
    originalPrice: {
      color: colors.textTertiary,
      fontSize: 16,
      textDecorationLine: 'line-through',
    },
    ratingSection: {
      marginBottom: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    ratingBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    ratingValue: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    ratingCount: {
      color: colors.textSecondary,
      fontSize: 12,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    description: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 22,
    },
    specsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'space-between',
    },
    specItem: {
      width: '48%',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    specIcon: {
      marginBottom: 8,
    },
    specLabel: {
      color: colors.textSecondary,
      fontSize: 11,
      textAlign: 'center',
      marginBottom: 4,
    },
    specValue: {
      color: colors.text,
      fontSize: 13,
      fontWeight: '600',
      textAlign: 'center',
    },
    reviewCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 14,
      marginBottom: 12,
      borderLeftWidth: 3,
      borderLeftColor: colors.accent,
      borderWidth: 1,
      borderColor: colors.border,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    reviewAuthor: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 14,
    },
    reviewStars: {
      flexDirection: 'row',
      gap: 2,
    },
    reviewText: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 18,
    },
    actionSection: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20,
    },
    addToCartBtn: {
      flex: 1,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 14,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    addToCartText: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 14,
    },
    buyNowBtn: {
      flex: 1,
      backgroundColor: colors.accent,
      paddingVertical: 14,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buyNowText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 14,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
      </TouchableOpacity>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={
            typeof product.image === 'string' && product.image.startsWith('http')
              ? { uri: product.image } // Safely handles network URLs
              : product.image          // Safely handles imported local variables (pic1, pic2, etc.)
          }
          style={styles.mainImage}
        />
        {discountPercent > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercent}% OFF</Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        {/* Title and Price */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceSection}>
            <Text style={styles.price}>{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
            )}
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingBox}>
            <MaterialCommunityIcons name="star" size={20} color="#fbbf24" />
            <Text style={styles.ratingValue}>{product.rating}</Text>
            <Text style={styles.ratingCount}>(based on {product.reviews.length} reviews)</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specsGrid}>
            {product.specifications.map((spec, i) => (
              <View key={i} style={styles.specItem}>
                <View style={styles.specIcon}>
                  <MaterialCommunityIcons name={spec.icon as any} size={20} color={colors.accent} />
                </View>
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Customer Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          {product.reviews.map((review, i) => (
            <View key={i} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewAuthor}>{review.author}</Text>
                <View style={styles.reviewStars}>
                  {[...Array(5)].map((_, j) => (
                    <MaterialCommunityIcons
                      key={j}
                      name={j < review.rating ? 'star' : 'star-outline'}
                      size={14}
                      color="#fbbf24"
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.addToCartBtn}>
            <MaterialCommunityIcons name="cart-plus" size={20} color={colors.text} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowBtn} onPress={() => router.push('/checkout')}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}
