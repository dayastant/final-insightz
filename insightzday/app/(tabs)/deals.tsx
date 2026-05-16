import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';


import pic1 from '../../assets/images/pic (1).jpg';
import pic2 from '../../assets/images/pic (2).jpg';
import pic3 from '../../assets/images/pic (3).jpg';
import pic4 from '../../assets/images/pic (4).jpg';
import pic5 from '../../assets/images/pic (5).jpg';
import pic6 from '../../assets/images/pic (6).jpg';
import pic7 from '../../assets/images/pic (7).jpg';
import pic8 from '../../assets/images/pic (8).jpg';
import pic9 from '../../assets/images/pic (9).jpg';
import pic10 from '../../assets/images/pic (10).jpg';
import pic11 from '../../assets/images/pic (11).jpg';
import pic12 from '../../assets/images/pic (12).jpg';
import pic13 from '../../assets/images/pic (13).jpg';
import pic14 from '../../assets/images/pic (14).jpg';
import pic15 from '../../assets/images/pic (15).jpg';

const { width } = Dimensions.get('window');
const CATEGORIES = ['All', 'Shopping', 'Food', 'Travel', 'Tech'];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'default', icon: 'sparkles' },
  { label: 'Lowest Price', value: 'price', icon: 'tag-outline' },
  { label: 'Highest Rated', value: 'rating', icon: 'star-face' },
];

export default function DealsScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('All');
  const [activeSort, setActiveSort] = useState('default');

  const filteredDeals = useMemo(() => {
    let result = [...deals];
    if (activeTab !== 'All') {
      result = result.filter(deal => deal.category === activeTab);
    }
    if (activeSort === 'price') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [activeTab, activeSort]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>

        {/* ENHANCED HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Exclusive Offers</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Handpicked for your lifestyle</Text>
          </View>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons name="bell-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* STICKY FILTER SYSTEM */}
        <View style={{ backgroundColor: colors.background, paddingTop: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryPadding}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveTab(cat)}
                style={[
                  styles.catPill,
                  { backgroundColor: colors.card },
                  activeTab === cat && { backgroundColor: colors.accent }
                ]}
              >
                <Text style={[styles.catText, activeTab === cat ? styles.textWhite : { color: colors.textSecondary }]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sortRow}>
            {SORT_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                onPress={() => setActiveSort(opt.value)}
                style={styles.sortItem}
              >
                <MaterialCommunityIcons
                  name={opt.icon}
                  size={16}
                  color={activeSort === opt.value ? colors.accent : colors.textTertiary}
                />
                <Text style={[styles.sortText, { color: activeSort === opt.value ? colors.accent : colors.textTertiary }]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* DEALS MASONRY-STYLE LIST */}
        <View style={styles.dealsGrid}>
          {filteredDeals.map((deal) => (
            <TouchableOpacity key={deal.id} style={[styles.dealCard, { backgroundColor: colors.card }]} activeOpacity={0.95}>
              <Image
                source={
                  typeof deal.image === 'string' && deal.image.startsWith('http')
                    ? { uri: deal.image } // For web URLs if any remain
                    : deal.image          // For local asset variables (pic1, pic2, etc.)
                }
                style={styles.dealImage}
                resizeMode="cover" // Recommended to keep layout styling sharp
              />

              {/* TOP FLOATING BADGES */}
              <View style={styles.cardOverlayTop}>
                <View style={styles.glassBadge}>
                  <Text style={styles.brandText}>{deal.brand}</Text>
                </View>
                <View style={styles.glassBadge}>
                  <MaterialCommunityIcons name="star" size={12} color="#fbbf24" />
                  <Text style={styles.ratingText}>{deal.rating}</Text>
                </View>
              </View>

              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)', '#000']}
                style={styles.cardGradient}
              >
                <View style={styles.contentPadding}>
                  <Text style={styles.dealOffer}>{deal.offer}</Text>
                  <Text style={styles.dealTitle} numberOfLines={1}>{deal.title}</Text>

                  <View style={styles.cardFooter}>
                    <View style={styles.timerTag}>
                      <MaterialCommunityIcons name="timer-outline" size={12} color="#f87171" />
                      <Text style={styles.timerText}>{deal.expires}</Text>
                    </View>
                    <View style={styles.claimButtonContainer}>
                      <Text style={styles.claimText}>Claim Now</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  headerTitle: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  iconButton: { padding: 10, borderRadius: 12 },
  categoryPadding: { paddingLeft: 20, paddingRight: 10, paddingBottom: 15 },
  catPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  catText: { fontSize: 14, fontWeight: '700' },
  textWhite: { color: '#FFF' },
  sortRow: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 15, justifyContent: 'space-between' },
  sortItem: { flexDirection: 'row', alignItems: 'center' },
  sortText: { fontSize: 12, fontWeight: '600', marginLeft: 5 },
  dealsGrid: { paddingHorizontal: 16, paddingBottom: 100 },
  dealCard: {
    height: 260,
    borderRadius: 24,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8
  },
  dealImage: { width: '100%', height: '100%', position: 'absolute' },
  cardOverlayTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  glassBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  brandText: { color: '#FFF', fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  ratingText: { color: '#FFF', fontSize: 11, fontWeight: '700', marginLeft: 4 },
  cardGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', justifyContent: 'flex-end' },
  contentPadding: { padding: 18 },
  dealOffer: { color: '#fbbf24', fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  dealTitle: { color: '#FFF', fontSize: 15, fontWeight: '600', marginTop: 4, opacity: 0.9 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  timerTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(248,113,113,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  timerText: { color: '#f87171', fontSize: 11, fontWeight: '700', marginLeft: 4 },
  claimButtonContainer: { backgroundColor: '#FFF', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10 },
  claimText: { color: '#000', fontSize: 12, fontWeight: '800' }
});

const deals = [
  {
    id: '1',
    brand: 'Samsung',
    title: 'Wowrutu Vasi Mega Sale',
    offer: '35% OFF',
    expires: '2 days',
    price: 'Check Store',
    rating: 4.8,
    category: 'Shopping',
    image: pic1
  },
  {
    id: '2',
    brand: 'Subway',
    title: 'Women\'s Day Special Combo',
    offer: '20% OFF',
    expires: 'Today',
    price: 2500,
    rating: 4.6,
    category: 'Food',
    image: pic2
  },
  {
    id: '3',
    brand: 'SPAR Sri Lanka',
    title: 'Fresh Pineapple Deal (per 100g)',
    offer: 'SAVE MORE',
    expires: '3 days',
    price: 112,
    rating: 4.5,
    category: 'Shopping',
    image: pic3
  },
  {
    id: '4',
    brand: 'KFC',
    title: 'Zinger Burger & Kochchi Bites Combo',
    offer: 'BUNDLE DEAL',
    expires: 'Ltd Stock',
    price: 3990,
    rating: 4.7,
    category: 'Food',
    image: pic4
  },
  {
    id: '5',
    brand: 'Damro',
    title: 'Ergonomic Executive Office Chairs',
    offer: '15% OFF',
    expires: 'Ltd Time',
    price: 'Check Store',
    rating: 4.4,
    category: 'Shopping',
    image: pic5
  },
  {
    id: '6',
    brand: 'GoodWe',
    title: 'DNS 5kW Inverter System Promo',
    offer: 'LKR 120,000 OFF',
    expires: '1 week',
    price: 'Check Store',
    rating: 4.9,
    category: 'Tech',
    image: pic6
  },
  {
    id: '7',
    brand: 'Skechers',
    title: 'ODEL Sports Performance Shoes',
    offer: '30% OFF',
    expires: 'Tonight',
    price: 9765,
    rating: 4.8,
    category: 'Shopping',
    image: pic7
  },
  {
    id: '8',
    brand: 'SPAR Qatar',
    title: 'Fresh Whole Norway Salmon (per KG)',
    offer: 'SAVE QAR 19.25',
    expires: '5 days',
    price: 'QAR 39.75',
    rating: 4.9,
    category: 'Shopping',
    image: pic8
  },
  {
    id: '9',
    brand: 'SPAR Qatar',
    title: 'Kohinoor Everyday Basmati Rice 4.5Kg',
    offer: 'QAR 3.00 OFF',
    expires: '2 days',
    price: 'QAR 25.00',
    rating: 4.7,
    category: 'Shopping',
    image: pic9
  },
  {
    id: '10',
    brand: 'SPAR Qatar',
    title: 'Imported Fresh Lebanon Peaches (per KG)',
    offer: 'FRESH DEAL',
    expires: 'Tomorrow',
    price: 'QAR 8.75',
    rating: 4.6,
    category: 'Shopping',
    image: pic10
  },
  {
    id: '11',
    brand: 'TechGear',
    title: 'Pro Noise Cancelling Earbuds',
    offer: 'LKR 5,000 OFF',
    expires: 'Ltd Stock',
    price: 24500,
    rating: 4.9,
    category: 'Tech',
    image: pic11
  },
  {
    id: '12',
    brand: 'SmartHome',
    title: 'Voice Assistant Wireless Hub',
    offer: 'LKR 2,000 OFF',
    expires: '2 days',
    price: 12500,
    rating: 4.3,
    category: 'Tech',
    image: pic12
  },
  {
    id: '13',
    brand: 'Glamour',
    title: 'Premium Organic Skincare Set',
    offer: 'FREE GIFT',
    expires: '4 days',
    price: 7800,
    rating: 4.6,
    category: 'Shopping',
    image: pic13
  },
  {
    id: '14',
    brand: 'WokWay',
    title: 'Authentic Asian Family Combo',
    offer: 'LKR 400 OFF',
    expires: 'Today',
    price: 2100,
    rating: 4.1,
    category: 'Food',
    image: pic14
  },
  {
    id: '15',
    brand: 'VoltDrive',
    title: 'Electric City Scooter Rental',
    offer: '50% OFF RIDE',
    expires: 'Ongoing',
    price: 450,
    rating: 4.7,
    category: 'Travel',
    image: pic15
  }
];