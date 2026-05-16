import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Animated,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import rideImg from '../../assets/images/2.png'
import product1 from '../../assets/images/product-1 (1).png'
import product2 from '../../assets/images/product-1 (2).png'
import product3 from '../../assets/images/product-1 (3).png'
import product4 from '../../assets/images/product-1 (4).png'

import pic1 from '../../assets/images/pic (1).jpg'
import pic2 from '../../assets/images/pic (2).jpg'
import pic3 from '../../assets/images/pic (3).jpg'
import pic4 from '../../assets/images/pic (4).jpg'
import pic5 from '../../assets/images/pic (5).jpg'
import pic6 from '../../assets/images/pic (6).jpg'
import pic7 from '../../assets/images/pic (7).jpg'
import pic8 from '../../assets/images/pic (8).jpg'
import pic9 from '../../assets/images/pic (9).jpg'
import pic10 from '../../assets/images/pic (10).jpg'
import pic11 from '../../assets/images/pic (11).jpg'
import pic12 from '../../assets/images/pic (12).jpg'
import pic13 from '../../assets/images/pic (13).jpg'
import pic14 from '../../assets/images/pic (14).jpg'
import pic15 from '../../assets/images/pic (15).jpg'




const { width } = Dimensions.get('window');

// ─── Data ──────────────────────────────────────────────────────────────────

const HERO_BANNERS = [
  {
    id: '1',
    title: 'Up to 35% OFF',
    subtitle: 'Samsung Wowrutu Vasi Home Appliances Sale',
    cta: 'Shop Now',
    image: pic1,
    badge: '🔥 Mega Sale',
  },
  {
    id: '2',
    title: '20% OFF Special',
    subtitle: 'Subway Women\'s Day Special Offer',
    cta: 'Claim Deal',
    image: pic2,
    badge: '🥖 Food',
  },
  {
    id: '3',
    title: 'Fresh Pineapple Deals',
    subtitle: 'Save more on fresh produce at SPAR Sri Lanka',
    cta: 'Buy Now',
    image: pic3,
    badge: '🍍 Grocery',
  },
  {
    id: '4',
    title: 'Zinger Burger Combo',
    subtitle: '4 Burgers, 8 Pcs Kochchi Bites & Pepsi for LKR 3,990',
    cta: 'Order Now',
    image: pic4,
    badge: '🍗 Hot Deal',
  },
];

const CATEGORIES = [
  { id: 'rides', name: 'Rides', emoji: '🚗', icon: 'car', color: '#6366f1', bg: '#ede9fe' },
  { id: 'food', name: 'Food', emoji: '🍔', icon: 'food', color: '#10b981', bg: '#d1fae5' },
  { id: 'grocery', name: 'Grocery', emoji: '🛒', icon: 'basket', color: '#f59e0b', bg: '#fef3c7' },
  { id: 'retail', name: 'Retail', emoji: '🛍', icon: 'shopping', color: '#ec4899', bg: '#fce7f3' },
  { id: 'health', name: 'Health', emoji: '💊', icon: 'medical-bag', color: '#0ea5e9', bg: '#e0f2fe' },
  { id: 'travel', name: 'Travel', emoji: '✈️', icon: 'airplane', color: '#8b5cf6', bg: '#ede9fe' },
];

const RECOMMENDATIONS = [
  {
    "id": "1",
    "title": "Samsung Wowrutu Vasi",
    "subtitle": "Home Appliances Sale • Up to 35% off",
    "price": "Varies by product",
    "originalPrice": "Varies",
    "discount": "Up to 35% Off",
    "platform": "Samsung",
    "platformColor": "#0A56A4",
    "rating": 4.8,
    "reviews": "2.5k",
    "image": pic1,
    "tag": "Mega Sale",
    "tagColor": "#FF5722"
  },
  {
    "id": "2",
    "title": "Subway Women's Day Special",
    "subtitle": "Subway • Available at CCC, OGF, & Port City",
    "price": "Minimum spend Rs. 2,500",
    "originalPrice": "Varies",
    "discount": "20% Off",
    "platform": "UberEats",
    "platformColor": "#06C167",
    "rating": 4.6,
    "reviews": "1.2k",
    "image": pic2,
    "tag": "Exclusively for Women",
    "tagColor": "#E91E63"
  },
  {
    "id": "3",
    "title": "Fresh Fruit Deals",
    "subtitle": "SPAR Sri Lanka • Price per 100g",
    "price": "LKR 112",
    "originalPrice": "LKR 140",
    "discount": "Save More",
    "platform": "SPAR",
    "platformColor": "#008000",
    "rating": 4.5,
    "reviews": "980",
    "image": pic3,
    "tag": "Fresh",
    "tagColor": "#10b981"
  },
  {
    "id": "4",
    "title": "KFC Burger Combo",
    "subtitle": "KFC • 4 Zinger Burgers + 8 Pcs Kochchi Bites + 1.5L Pepsi",
    "price": "LKR 3,990",
    "originalPrice": "LKR 4,950",
    "discount": "Bundle Offer",
    "platform": "KFC",
    "platformColor": "#E4002B",
    "rating": 4.7,
    "reviews": "3.4k",
    "image": pic4,
    "tag": "✦ Top Pick",
    "tagColor": "#f59e0b"
  },
  {
    "id": "5",
    "title": "Damro Office Chairs",
    "subtitle": "Damro • Ergonomic & Mesh Chairs",
    "price": "Discounted Price",
    "originalPrice": "Varies",
    "discount": "15% Discount",
    "platform": "Damro",
    "platformColor": "#00A896",
    "rating": 4.4,
    "reviews": "520",
    "image": pic5,
    "tag": "Limited time offer",
    "tagColor": "#1e3a8a"
  },
  {
    "id": "6",
    "title": "GoodWe 5kW Inverters Combo",
    "subtitle": "GoodWe Installer Plus • Buy 10 DNS 5kW Inverters",
    "price": "Cash Discount Applied",
    "originalPrice": "Varies",
    "discount": "LKR 120,000 Off",
    "platform": "GoodWe",
    "platformColor": "#D32F2F",
    "rating": 4.9,
    "reviews": "150",
    "image": pic6,
    "tag": "Mega Promotion",
    "tagColor": "#ea580c"
  },
  {
    "id": "7",
    "title": "Skechers End of Season Sale",
    "subtitle": "ODEL Sports • Premium Performance Footwear",
    "price": "LKR 9,765",
    "originalPrice": "LKR 13,950",
    "discount": "30% Off",
    "platform": "ODEL",
    "platformColor": "#111827",
    "rating": 4.8,
    "reviews": "1.1k",
    "image": pic7,
    "tag": "Best Seller",
    "tagColor": "#ef4444"
  },
  {
    "id": "8",
    "title": "Fresh Whole Norway Salmon",
    "subtitle": "SPAR Qatar • Fresh & Quality Seafood per KG",
    "price": "QAR 39.75",
    "originalPrice": "QAR 59.00",
    "discount": "Save QAR 19.25",
    "platform": "SPAR Qatar",
    "platformColor": "#008000",
    "rating": 4.9,
    "reviews": "2.1k",
    "image": pic8,
    "tag": "Premium",
    "tagColor": "#3b82f6"
  },
  {
    "id": "9",
    "title": "Kohinoor Everyday Basmati Rice (4.5Kg)",
    "subtitle": "SPAR Qatar • Premium Grocery Staples",
    "price": "QAR 25.00",
    "originalPrice": "QAR 28.00",
    "discount": "QAR 3.00 Off",
    "platform": "SPAR Qatar",
    "platformColor": "#008000",
    "rating": 4.7,
    "reviews": "4.5k",
    "image": pic9,
    "tag": "Essential",
    "tagColor": "#8b5cf6"
  },
  {
    "id": "10",
    "title": "Fresh Lebanon Peaches",
    "subtitle": "SPAR Qatar • Imported Fresh Produce per KG",
    "price": "QAR 8.75",
    "originalPrice": "Varies",
    "discount": "Fresh Deal",
    "platform": "SPAR Qatar",
    "platformColor": "#008000",
    "rating": 4.6,
    "reviews": "830",
    "image": pic10,
    "tag": "Top Pick",
    "tagColor": "#10b981"
  }
];

const COMPARISON_CARDS = [
  {
    id: '1',
    title: 'Trip to Colombo Fort', // Location
    icon: '🚗',
    options: [
      { serviceType: 'Economy Sedan', price: 'LKR 1,100', time: '22 min', isBest: true },
      { serviceType: 'Premium Comfort', price: 'LKR 1,200', time: '24 min', isBest: false },
      { serviceType: 'Budget Nano', price: 'LKR 1,350', time: '26 min', isBest: false },
    ],
  },
  {
    id: '2',
    title: 'Chicken Burger Meal', // Product Name
    icon: '🍔',
    options: [
      { variant: 'Meal + Regular Drink', price: 'LKR 1,650', time: '28 min', isBest: true },
      { variant: 'Meal + Large Fries', price: 'LKR 1,800', time: '32 min', isBest: false },
      { variant: 'Double Cheese Variant', price: 'LKR 1,950', time: '40 min', isBest: false },
    ],
  },
];

const REVIEWS = [
  {
    id: '1',
    rating: 4.8,
    reviewedItem: 'Chicken Biryani', // Specific item/product
    comment: 'Lightning fast delivery, the food arrived steaming hot!',
    author: 'Amara S.',
    color: '#06C167',
    emoji: '🍲',
  },
  {
    id: '2',
    rating: 4.5,
    reviewedItem: 'Premium Sedan Ride', // Specific service
    comment: 'The driver was very professional and the car was spotless.',
    author: 'Ravin P.',
    color: '#8b5cf6',
    emoji: '🚗',
  },
  {
    id: '3',
    rating: 4.9,
    reviewedItem: 'Fresh Strawberries', // Specific grocery
    comment: 'Quality products, much fresher than what I usually get.',
    author: 'Dulani M.',
    color: '#0ea5e9',
    emoji: '🍓',
  },
];

const PRODUCT_GRID  = [
  {
    id: '1',
    title: 'Samsung Side-by-Side Refrigerator',
    price: 'Check Store',
    shopName: 'Samsung Official',
    rating: '4.8',
    image: pic1,
    category: 'retail',
    productId: '1',
    badge: '-35%',
  },
  {
    id: '2',
    title: 'Subway Melts & Cookies Bouquet',
    price: 'Rs. 2,500',
    shopName: 'Subway SL',
    rating: '4.6',
    image: pic2,
    category: 'food',
    productId: '2',
    badge: '-20%',
  },
  {
    id: '3',
    title: 'Fresh Pineapple (per 100g)',
    price: 'LKR 112',
    shopName: 'SPAR Sri Lanka',
    rating: '4.5',
    image: pic3,
    category: 'retail',
    productId: '3',
    badge: 'Save',
  },
  {
    id: '4',
    title: 'KFC Zinger Burger Combo',
    price: 'LKR 3,990',
    shopName: 'KFC Sri Lanka',
    rating: '4.7',
    image: pic4,
    category: 'food',
    productId: '4',
    badge: 'Hot 🔥',
  },
  {
    id: '5',
    title: 'Damro Ergonomic Mesh Chair',
    price: 'Check Store',
    shopName: 'Damro Official',
    rating: '4.4',
    image: pic5,
    category: 'retail',
    productId: '5',
    badge: '-15%',
  },
  {
    id: '6',
    title: 'GoodWe DNS 5kW Inverter',
    price: 'Check Store',
    shopName: 'GoodWe Installer Plus',
    rating: '4.9',
    image: pic6,
    category: 'retail',
    productId: '6',
    badge: 'Promo',
  },
  {
    id: '7',
    title: 'Skechers Slip-On Performance',
    price: 'LKR 9,765',
    shopName: 'ODEL Sports',
    rating: '4.8',
    image: pic7,
    category: 'retail',
    productId: '7',
    badge: 'Sale',
  },
  {
    id: '8',
    title: 'Fresh Whole Norway Salmon (per KG)',
    price: 'QAR 39.75',
    shopName: 'SPAR Qatar',
    rating: '4.9',
    image: pic8,
    category: 'retail',
    productId: '8',
    badge: 'Fresh',
  },
  {
    id: '9',
    title: 'Kohinoor Everyday Basmati Rice 4.5Kg',
    price: 'QAR 25.00',
    shopName: 'SPAR Qatar',
    rating: '4.7',
    image: pic9,
    category: 'retail',
    productId: '9',
    badge: 'Value',
  },
  {
    id: '10',
    title: 'Fresh Lebanon Peaches (per KG)',
    price: 'QAR 8.75',
    shopName: 'SPAR Qatar',
    rating: '4.6',
    image: pic10,
    category: 'retail',
    productId: '10',
    badge: 'Deals',
  }
];

// ─── Component ─────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [fabPulse] = useState(new Animated.Value(1));

  const isDark = theme === 'dark';
  const BG = isDark ? colors.background : '#F7F8FC';
  const CARD = isDark ? colors.card : '#FFFFFF';
  const TEXT = colors.text;
  const TEXT2 = colors.textSecondary;
  const TEXT3 = colors.textTertiary;
  const BORDER = colors.border;
  const ACCENT = colors.accent;

  // FAB pulse animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(fabPulse, { toValue: 1.08, duration: 900, useNativeDriver: true }),
        Animated.timing(fabPulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Auto-slide banner
  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(() => {
        setCurrentBanner(prev => (prev + 1) % HERO_BANNERS.length);
      }, 3000);
      return () => clearInterval(timer);
    }, [])
  );

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const banner = HERO_BANNERS[currentBanner];

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: BG }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ── 1. Search Bar ─────────────────────────────── */}
        <View style={[s.searchWrap, { backgroundColor: CARD, shadowColor: isDark ? '#000' : '#64748b', borderColor: BORDER }]}>
          <MaterialCommunityIcons name="magnify" size={20} color={TEXT3} />
          <TextInput
            style={[s.searchInput, { color: TEXT }]}
            placeholder="Search rides, food, grocery, products..."
            placeholderTextColor={TEXT3}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => router.push('/search')}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={18} color={TEXT3} />
            </TouchableOpacity>
          )}
          <View style={[s.searchDivider, { backgroundColor: BORDER }]} />
          <TouchableOpacity style={[s.searchFilter, { backgroundColor: ACCENT + '18' }]}>
            <MaterialCommunityIcons name="tune-variant" size={18} color={ACCENT} />
          </TouchableOpacity>
        </View>

        {/* ── 2. Hero Offer Banner ────────────────────────────── */}
        <View style={s.bannerSection}>
          <TouchableOpacity onPress={() => router.push('/deals')} activeOpacity={0.92}>
            <View style={s.bannerCard}>
              <Image source={banner.image} style={s.bannerImage} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(0,0,0,0.62)', 'rgba(0,0,0,0.28)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={s.bannerGradient}
              />
              <View style={s.bannerContent}>
                <View style={s.bannerBadge}>
                  <Text style={s.bannerBadgeText}>{banner.badge}</Text>
                </View>
                <Text style={s.bannerTitle}>{banner.title}</Text>
                <Text style={s.bannerSubtitle}>{banner.subtitle}</Text>
                <TouchableOpacity
                  style={s.bannerCta}
                  onPress={() => router.push('/deals')}
                >
                  <Text style={s.bannerCtaText}>{banner.cta}</Text>
                  <MaterialCommunityIcons name="arrow-right" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* Slide Indicators */}
          <View style={s.indicatorRow}>
            {HERO_BANNERS.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setCurrentBanner(i)}
                style={[
                  s.indicator,
                  i === currentBanner
                    ? [s.indicatorActive, { backgroundColor: ACCENT }]
                    : { backgroundColor: BORDER },
                ]}
              />
            ))}
          </View>
        </View>

        {/* ── 3. Categories ────────────────────────────────────── */}
        <View style={s.sectionHeader}>
          <Text style={[s.sectionTitle, { color: TEXT }]}>What are you looking for?</Text>
          <TouchableOpacity onPress={() => router.push('/all-category')}>
            <Text style={[s.seeAll, { color: ACCENT }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.catRow}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={s.catItem}
              onPress={() => router.push(`/product/${cat.id}`)}
              activeOpacity={0.75}
            >
              <View style={[s.catCircle, { backgroundColor: isDark ? cat.color + '30' : cat.bg }]}>
                <Text style={s.catEmoji}>{cat.emoji}</Text>
              </View>
              <Text style={[s.catLabel, { color: TEXT2 }]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── 4. Personalized Recommendations ─────────────────── */}
        <View style={s.sectionHeader}>
          <View>
            <Text style={[s.sectionTitle, { color: TEXT }]}>Recommended for you</Text>
            <Text style={[s.sectionSub, { color: TEXT3 }]}>Curated by InSightZ AI ✦</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/deals')}>
            <Text style={[s.seeAll, { color: ACCENT }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
        >
          {RECOMMENDATIONS.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              style={[s.recCard, { backgroundColor: CARD, borderColor: BORDER, shadowColor: isDark ? '#000' : '#64748b' }]}
              onPress={() => router.push(`/product-detail/${item.id}/1`)}
              activeOpacity={0.85}
            >
              <View style={s.recImageWrap}>
                <Image
                  source={
                    typeof item.image === 'string'
                      ? { uri: item.image }
                      : item.image
                  }
                  style={s.recImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.45)']}
                  style={s.recImageGradient}
                />
                {/* Tag badge */}
                <View style={[s.recTag, { backgroundColor: item.tagColor }]}>
                  <Text style={s.recTagText}>{item.tag}</Text>
                </View>
                {/* Platform badge — only show when platform field exists */}
                {item.platform && (
                  <View style={[s.recPlatformBadge, { backgroundColor: (item.platformColor ?? '#333') + 'E8' }]}>
                    <Text style={s.recPlatformText}>{item.platform}</Text>
                  </View>
                )}
                {/* Service badge for ride-type items */}
                {item.service && (
                  <View style={[s.recPlatformBadge, { backgroundColor: '#6366f1E8' }]}>
                    <MaterialCommunityIcons name="car" size={11} color="#fff" />
                    <Text style={s.recPlatformText}> {item.service}</Text>
                  </View>
                )}
              </View>
              <View style={s.recBody}>
                {/* Title: use route for rides, title for everything else */}
                <Text style={[s.recTitle, { color: TEXT }]} numberOfLines={1}>
                  {item.title ?? item.route}
                </Text>
                {/* Subtitle: use duration for rides, subtitle for others */}
                <Text style={[s.recSubtitle, { color: TEXT3 }]} numberOfLines={1}>
                  {item.subtitle ?? (item.duration ? `⏱ ${item.duration}` : '')}
                </Text>
                <View style={s.recFooter}>
                  <View>
                    <Text style={[s.recPrice, { color: TEXT }]}>{item.price}</Text>
                    <Text style={[s.recOrigPrice, { color: TEXT3 }]}>{item.originalPrice}</Text>
                  </View>
                  <View style={[s.ratingPill, { backgroundColor: colors.gold + '22' }]}>
                    <Text style={{ fontSize: 11 }}>⭐</Text>
                    <Text style={[s.ratingVal, { color: colors.gold }]}>{item.rating}</Text>
                    <Text style={[s.ratingCount, { color: TEXT3 }]}>({item.reviews})</Text>
                  </View>
                </View>
                <View style={s.discountRow}>
                  <View style={[s.discountBadge, { backgroundColor: colors.success + '20' }]}>
                    <MaterialCommunityIcons name="tag" size={10} color={colors.success} />
                    <Text style={[s.discountText, { color: colors.success }]}>{item.discount}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── 5. Best Offers & Discounts ───────────────────────── */}


        {/* ── 6. Comparison Cards ───────────────────────────────── */}


        {/* ── 7. Review Summary ─────────────────────────────────── */}
        <View style={s.sectionHeader}>
          <Text style={[s.sectionTitle, { color: TEXT }]}>What Users Say</Text>
          <TouchableOpacity>
            <Text style={[s.seeAll, { color: ACCENT }]}>All Reviews</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        >
          {REVIEWS.map(rev => (
            <View
              key={rev.id}
              style={[s.reviewCard, { backgroundColor: CARD, borderColor: BORDER, shadowColor: isDark ? '#000' : '#64748b' }]}
            >
              <View style={s.reviewTop}>
                <View style={[s.reviewEmoji, { backgroundColor: rev.color + '20' }]}>
                  <Text style={{ fontSize: 20 }}>{rev.emoji}</Text>
                </View>
                <View>
                  <View style={s.starsRow}>
                    {'★★★★★'.split('').map((s, i) => (
                      <Text
                        key={i}
                        style={{ color: i < Math.floor(rev.rating) ? colors.gold : BORDER, fontSize: 13 }}
                      >{s}</Text>
                    ))}
                    <Text style={[s.reviewRating, { color: TEXT }]}> {rev.rating}</Text>
                  </View>
                  <View style={[s.reviewPlatformBadge, { backgroundColor: rev.color + '20' }]}>
                    <Text style={[s.reviewPlatform, { color: rev.color }]}>{rev.reviewedItem}</Text>
                  </View>
                </View>
              </View>
              <Text style={[s.reviewComment, { color: TEXT2 }]} numberOfLines={2}>"{rev.comment}"</Text>
              <Text style={[s.reviewAuthor, { color: TEXT3 }]}>— {rev.author}</Text>
            </View>
          ))}
        </ScrollView>


        {/* ── 8. Product Grid ───────────────────────────────────── */}
        <View style={s.sectionHeader}>
          <View>
            <Text style={[s.sectionTitle, { color: TEXT }]}>Featured Products</Text>
            <Text style={[s.sectionSub, { color: TEXT3 }]}>Handpicked for you</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/all-category')} style={s.browseBtn}>
            <Text style={[s.seeAll, { color: ACCENT }]}>Browse All</Text>
            <MaterialCommunityIcons name="chevron-right" size={16} color={ACCENT} />
          </TouchableOpacity>
        </View>

        <View style={s.grid}>
          {PRODUCT_GRID.map(product => (
            <View key={product.id} style={s.gridItem}>
              <TouchableOpacity
                style={[s.gridCard, { backgroundColor: CARD, shadowColor: isDark ? '#000' : '#94a3b8' }]}
                onPress={() => router.push(`/product-detail/${product.category}/${product.productId}`)}
                activeOpacity={0.9}
              >
                {/* Image Container */}
                <View style={s.imageContainer}>
                  <Image
                    source={
                      typeof product.image === 'string' && product.image.startsWith('http')
                        ? { uri: product.image } // If it's an Unsplash web link string
                        : product.image          // If it's your local asset variable (pic1, pic2, etc.)
                    }
                    style={s.gridImage}
                    resizeMode="cover"
                  />

                  {/* Top Row: Badge & Heart */}
                  <View style={s.cardTopRow}>
                    <View style={[s.newGridBadge, { backgroundColor: ACCENT }]}>
                      <Text style={s.newGridBadgeText}>{product.badge}</Text>
                    </View>
                    <TouchableOpacity
                      style={s.heartCircle}
                      onPress={() => toggleWishlist(product.id)}
                    >
                      <MaterialCommunityIcons
                        name={wishlist.includes(product.id) ? "heart" : "heart-outline"}
                        size={18}
                        color={wishlist.includes(product.id) ? "#ef4444" : "#64748b"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Content Container */}
                <View style={s.cardContent}>
                  <Text style={[s.shopLabel, { color: TEXT3 }]}>{product.shopName}</Text>
                  <Text style={[s.gridTitle, { color: TEXT }]} numberOfLines={1}>{product.title}</Text>

                  <View style={s.ratingRow}>
                    <MaterialCommunityIcons name="star" size={12} color="#f59e0b" />
                    <Text style={[s.ratingText, { color: TEXT2 }]}>{product.rating}</Text>
                  </View>

                  <View style={s.cardFooter}>
                    <Text style={[s.gridPrice, { color: ACCENT }]}>{product.price}</Text>
                    <TouchableOpacity style={[s.addBtn, { backgroundColor: ACCENT }]}>
                      <MaterialCommunityIcons name="plus" size={18} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ── 9. Floating Action Button ─────────────────────── */}
      <Animated.View
        style={[
          s.fabWrap,
          { transform: [{ scale: fabPulse }] },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.push('/search')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#8b5cf6', '#6366f1', '#0ea5e9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.fab}
          >
            <MaterialCommunityIcons name="brain" size={24} color="#fff" />

          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const CARD_RADIUS = 20;
const PILL_RADIUS = 50;

const s = StyleSheet.create({
  // ─── Search ──────────────────────────────────────────
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    borderRadius: PILL_RADIUS,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  searchDivider: {
    width: 1,
    height: 20,
  },
  searchFilter: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ─── Banner ──────────────────────────────────────────
  bannerSection: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 4,
  },
  bannerCard: {
    height: 190,
    borderRadius: CARD_RADIUS + 4,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  bannerContent: {
    flex: 1,
    padding: 22,
    justifyContent: 'center',
    zIndex: 2,
    maxWidth: '65%',
  },
  bannerBadge: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 16,
    lineHeight: 18,
  },
  bannerCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  bannerCtaText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 4,
  },
  indicator: {
    height: 6,
    width: 6,
    borderRadius: 3,
  },
  indicatorActive: {
    width: 22,
    borderRadius: 3,
  },

  // ─── Section Header ──────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSub: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
  },

  // ─── Categories ──────────────────────────────────────
  catRow: {
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 4,
  },
  catItem: {
    alignItems: 'center',
    gap: 8,
  },
  catCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catEmoji: {
    fontSize: 28,
  },
  catLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ─── Recommendation Cards ─────────────────────────────
  recCard: {
    width: width * 0.58,
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  recImageWrap: {
    width: '100%',
    height: 130,
    position: 'relative',
  },
  recImage: {
    width: '100%',
    height: '100%',
  },
  recImageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  recTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  recTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  recPlatformBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  recPlatformText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  recBody: {
    padding: 12,
    gap: 4,
  },
  recTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  recSubtitle: {
    fontSize: 11,
    fontWeight: '500',
  },
  recFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
  },
  recPrice: {
    fontSize: 15,
    fontWeight: '800',
  },
  recOrigPrice: {
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  ratingVal: {
    fontSize: 12,
    fontWeight: '700',
  },
  ratingCount: {
    fontSize: 10,
    fontWeight: '500',
  },
  discountRow: {
    marginTop: 6,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '700',
  },

  // ─── Offer Cards ─────────────────────────────────────
  offerCard: {
    width: 185,
    borderRadius: CARD_RADIUS,
    padding: 18,
    paddingBottom: 14,
    gap: 6,
  },
  offerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  offerDiscountChip: {
    alignItems: 'flex-start',
  },
  offerDiscountText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 34,
  },
  offerDiscountLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  offerCatChip: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  offerCatText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  offerPlatform: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  offerCondition: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
  },
  offerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  offerExpiry: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '500',
  },
  offerCta: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  offerCtaText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },

  // ─── Comparison Cards ─────────────────────────────────
  aiChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  compCard: {
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    padding: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  compHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  compIcon: {
    fontSize: 22,
  },
  compTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  compRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
  },
  compRowBest: {
    borderWidth: 1,
  },
  compRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compPlatform: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 80,
  },
  compTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  compTimeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  compRowRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  compPrice: {
    fontSize: 15,
    fontWeight: '800',
  },
  bestBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  bestBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },

  // ─── Review Cards ─────────────────────────────────────
  reviewCard: {
    width: 200,
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
    padding: 14,
    gap: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  reviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reviewEmoji: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 12,
    fontWeight: '700',
  },
  reviewPlatformBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  reviewPlatform: {
    fontSize: 11,
    fontWeight: '700',
  },
  reviewComment: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  reviewAuthor: {
    fontSize: 11,
    fontWeight: '600',
  },

  // ─── Product Grid ─────────────────────────────────────
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 18,
  },
  gridCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  imageContainer: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  cardTopRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newGridBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newGridBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  heartCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 12,
  },
  shopLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridPrice: {
    fontSize: 15,
    fontWeight: '800',
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  // ─── FAB ─────────────────────────────────────────────
  fabWrap: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 35,
    right: 20,
    zIndex: 100,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
    shadowColor: '#8b5cf6',
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: PILL_RADIUS,
    gap: 8,
  },
  fabLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
