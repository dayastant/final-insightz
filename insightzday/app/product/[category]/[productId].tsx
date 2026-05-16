import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Animated, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 400;

// Generic UE Shop Data

import pic2 from '../../../assets/images/pic (2).jpg';
import pic11 from '../../../assets/images/pic (11).jpg';
import pic12 from '../../../assets/images/pic (12).jpg';

// Generic UE Shop Data
const UE_SHOP_DATA = {
  rides: {
    '1': {
      title: 'City Transfer',
      description: 'Find the most efficient transport for your urban commute.',
      image: pic11,
      badge: 'Transport',
      options: [
        { label: 'Standard Provider', price: 'LKR 850', duration: '12 mins', isBest: true },
        { label: 'Premium Provider', price: 'LKR 920', duration: '15 mins', isBest: false },
        { label: 'Elite Service', price: 'LKR 1100', duration: '10 mins', isBest: false },
      ],
      reviews: [
        { text: "Highly punctual and consistent vehicle quality.", positive: true },
        { text: "Dynamic pricing applies during high demand.", positive: false },
      ]
    },
    '2': {
      title: 'Airport Shuttle',
      description: 'Scheduled pickups for stress-free travel.',
      image: pic12,
      badge: 'Airport',
      options: [
        { label: 'Provider Alpha', price: 'LKR 2100', duration: '22 mins', isBest: true },
        { label: 'Provider Beta', price: 'LKR 2300', duration: '25 mins', isBest: false },
      ],
      reviews: [
        { text: "Spacious luggage compartments.", positive: true },
        { text: "Requires 24h advance booking for best rates.", positive: false },
      ]
    }
  },
  food: {
    '1': {
      title: 'Subway Melts & Cookies Bouquet',
      description: 'Exclusive Women\'s Day special combo bouquet featuring delicious baked savory subs and signature melt-in-the-mouth cookies.',
      image: pic2,
      badge: 'Culinary',
      options: [
        { label: 'Express Delivery', price: 'LKR 2500', duration: '25 mins', isBest: true },
        { label: 'Eco-Friendly Courier', price: 'LKR 2650', duration: '35 mins', isBest: false },
      ],
      reviews: [
        { text: "Packaging keeps the meal crisp and hot.", positive: true },
        { text: "Limited delivery radius for this specific menu.", positive: false },
      ]
    }
  }
};
export default function UEShopScreen() {
  const { category, productId } = useLocalSearchParams();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const categoryId = (typeof category === 'string' ? category : 'rides') as keyof typeof UE_SHOP_DATA;
  const pId = typeof productId === 'string' ? productId : '1';

  const categoryData = UE_SHOP_DATA[categoryId] || UE_SHOP_DATA.rides;
  const data = categoryData[pId as keyof typeof categoryData] || Object.values(categoryData)[0];

  const imageScale = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
    outputRange: [2, 1, 1],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
    outputRange: [0, 0, -50],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Animated Parallax Header */}
      <View style={[styles.headerContainer, StyleSheet.absoluteFill]}>
        <Animated.Image
          source={
            typeof data.image === 'string' && data.image.startsWith('http')
              ? { uri: data.image } // For network URLs
              : data.image          // For local asset variables (pic1, pic2, etc.)
          }
          style={[
            styles.heroImage,
            { transform: [{ scale: imageScale }, { translateY: imageTranslateY }] }
          ]}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent', '#f9f6ef']}
          locations={[0, 0.4, 0.98]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Floating Top Nav */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
          <View style={styles.iconButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#0f172a" />
          </View>
        </TouchableOpacity>
        <View style={styles.badgeTop}>
          <Text style={styles.badgeTextTop}>{data.badge}</Text>
        </View>
      </View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT - 60, paddingBottom: 140 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.contentSheet}>
          <View style={styles.dragHandle} />
          
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.subtitle}>{data.description}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <MaterialCommunityIcons name="shield-check" size={16} color="#0ea5e9" style={{marginRight: 4}}/>
              <Text style={styles.ratingText}>Verified</Text>
            </View>
          </View>

          <Text style={styles.sectionHeading}>Available Selection</Text>
          <View style={styles.optionsContainer}>
            {data.options.map((opt: any, i: number) => (
              <TouchableOpacity key={i} activeOpacity={0.9} style={[styles.optionCard, opt.isBest && styles.bestOptionCard]}>
                {opt.isBest && (
                  <LinearGradient
                    colors={['#0f172a', '#1e293b']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.bestBadgeCard}
                  >
                    <MaterialCommunityIcons name="crown" size={12} color="#fbbf24" style={{marginRight: 4}}/>
                    <Text style={styles.bestBadgeTextCard}>Recommended</Text>
                  </LinearGradient>
                )}
                
                <View style={styles.optionContent}>
                  <View style={styles.optionMain}>
                    <View style={[styles.optionIconContainer, opt.isBest && { backgroundColor: '#e0f2fe' }]}>
                      <MaterialCommunityIcons 
                        name="tag-outline" 
                        size={24} 
                        color={opt.isBest ? '#0ea5e9' : '#64748b'} 
                      />
                    </View>
                    <View style={styles.optionDetails}>
                      <Text style={styles.platformName}>{opt.label}</Text>
                      <View style={styles.durationRow}>
                        <MaterialCommunityIcons name="clock-fast" size={14} color="#94a3b8" />
                        <Text style={styles.durationText}>{opt.duration}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>{opt.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionHeading}>UE Shop Insights</Text>
          <View style={styles.insightsContainer}>
            <LinearGradient colors={['rgba(14, 165, 233, 0.05)', 'transparent']} style={styles.insightGradient} />
            <View style={styles.insightHeader}>
              <View style={styles.aiIconWrapper}>
                <MaterialCommunityIcons name="sparkles" size={24} color="#0ea5e9" />
              </View>
              <Text style={styles.insightTitle}>Product Feedback</Text>
            </View>
            {data.reviews.map((review: any, i: number) => (
              <View key={i} style={styles.reviewRow}>
                <View style={[styles.dot, { backgroundColor: review.positive ? '#10b981' : '#f43f5e' }]} />
                <Text style={styles.reviewComment}>{review.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>

      {/* Floating Bottom Action */}
      <View style={styles.floatingActionBox}>
        <View style={styles.floatingActionBlur}>
          <View style={styles.floatingActionContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.floatingActionDesc}>Recommended</Text>
              <Text style={styles.floatingActionPrice}>{data.options.find((o: any) => o.isBest)?.price || data.options[0].price}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <LinearGradient 
                colors={['#0f172a', '#1e293b']}
                style={styles.bookButton}
              >
                <Text style={styles.bookButtonText}>Confirm Selection</Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f6ef' },
  headerContainer: { height: HEADER_HEIGHT, width: '100%', overflow: 'hidden' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  topNav: {
    position: 'absolute', top: Platform.OS === 'ios' ? 60 : 40, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, zIndex: 10,
  },
  iconButton: {
    width: 46, height: 46, borderRadius: 23, overflow: 'hidden',
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  badgeTop: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2,
  },
  badgeTextTop: { color: '#0f172a', fontWeight: '800', fontSize: 12, letterSpacing: 0.5, textTransform: 'uppercase' },
  contentSheet: {
    backgroundColor: '#f9f6ef', borderTopLeftRadius: 40, borderTopRightRadius: 40,
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40,
    minHeight: height - 100,
  },
  dragHandle: {
    width: 48, height: 5, borderRadius: 2.5, backgroundColor: '#cbd5e1',
    alignSelf: 'center', marginBottom: 28,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
  title: { fontSize: 34, fontWeight: '900', color: '#0f172a', marginBottom: 8, letterSpacing: -1 },
  subtitle: { fontSize: 16, color: '#64748b', lineHeight: 24, fontWeight: '500' },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff',
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16,
    shadowColor: '#64748b', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 3,
  },
  ratingText: { fontWeight: '800', color: '#0f172a', fontSize: 15 },
  sectionHeading: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginBottom: 20, letterSpacing: -0.5 },
  optionsContainer: { marginBottom: 36 },
  optionCard: {
    backgroundColor: '#ffffff', borderRadius: 24, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: '#e2e8f0',
    shadowColor: '#64748b', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2,
  },
  bestOptionCard: { borderColor: '#38bdf8', backgroundColor: '#f4fafd' },
  bestBadgeCard: {
    position: 'absolute', top: -14, right: 24, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12,
    shadowColor: '#0f172a', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  bestBadgeTextCard: { color: '#ffffff', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  optionContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  optionMain: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  optionIconContainer: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#f1f5f9',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  optionDetails: { flex: 1 },
  platformName: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 4 },
  durationRow: { flexDirection: 'row', alignItems: 'center' },
  durationText: { fontSize: 14, color: '#64748b', marginLeft: 6, fontWeight: '600' },
  priceContainer: { alignItems: 'flex-end', justifyContent: 'center' },
  priceText: { fontSize: 22, fontWeight: '900', color: '#10b981' },
  insightsContainer: {
    backgroundColor: '#ffffff', borderRadius: 32, padding: 24, paddingBottom: 32,
    borderWidth: 1, borderColor: '#e2e8f0', position: 'relative', overflow: 'hidden',
  },
  insightGradient: { position: 'absolute', top: 0, left: 0, right: 0, height: 120 },
  insightHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  aiIconWrapper: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#f0f9ff',
    justifyContent: 'center', alignItems: 'center',
  },
  insightTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginLeft: 12 },
  reviewRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 7, marginRight: 14 },
  reviewComment: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 24, fontWeight: '500' },
  floatingActionBox: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 34 : 20, paddingTop: 10,
  },
  floatingActionBlur: {
    borderRadius: 32, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)',
    ...Platform.select({
      ios: { shadowColor: '#64748b', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20 },
      android: { elevation: 10 }
    }),
  },
  floatingActionContent: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, paddingHorizontal: 24,
  },
  floatingActionDesc: { fontSize: 13, color: '#64748b', fontWeight: '700', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  floatingActionPrice: { fontSize: 26, fontWeight: '900', color: '#0f172a' },
  bookButton: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 28, paddingVertical: 16,
    borderRadius: 24,
  },
  bookButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '800', marginRight: 8 },
});