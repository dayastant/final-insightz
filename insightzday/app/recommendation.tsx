import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
  StatusBar
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// Mock Data with Match Scores for the AI context
const recommendedProducts = [
  {
    id: '1',
    name: 'Nike ZoomX Invincible',
    shop: 'Nike Store',
    distance: '0.8 km',
    rating: 4.8,
    reviews: 124,
    price: '$180',
    originalPrice: '$200',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    isBest: true,
    offer: '10% OFF',
    matchScore: 98,
  },
  {
    id: '2',
    name: 'Adidas Ultraboost 22',
    shop: 'Sports Direct',
    distance: '0.4 km',
    rating: 4.9,
    reviews: 98,
    price: '$160',
    originalPrice: '$190',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80',
    isBest: false,
    offer: '15% OFF',
    matchScore: 92,
  },
  {
    id: '3',
    name: 'Puma Velocity Nitro',
    shop: 'Puma Official',
    distance: '1.0 km',
    rating: 4.6,
    reviews: 56,
    price: '$120',
    originalPrice: '$140',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80',
    isBest: false,
    offer: 'Flash Sale',
    matchScore: 85,
  },
  {
    id: '4',
    name: 'ASICS Gel-Kayano 29',
    shop: "Runner's World",
    distance: '0.9 km',
    rating: 4.7,
    reviews: 210,
    price: '$150',
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
    isBest: false,
    offer: null,
    matchScore: 78,
  }
];

export default function RecommendationScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [chatExpanded, setChatExpanded] = useState(false);

  const bestProduct = recommendedProducts.find(p => p.isBest);
  const otherProducts = recommendedProducts.filter(p => !p.isBest);

  // Navigation Helper
  const goToMap = (item: any) => {
    router.push({
      pathname: '/map',
      params: { 
        shopName: item.shop, 
        distance: item.distance,
        lat: '6.9271', 
        lng: '79.8612' 
      }
    });
  };

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* --- HEADER --- */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.iconCircle}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={[s.headerTitle, { color: colors.text }]}>Recommendation</Text>
          <View style={s.liveStatus}>
            <View style={s.dot} />
            <Text style={s.liveText}>Analyzing nearest options</Text>
          </View>
        </View>
        <TouchableOpacity style={s.iconCircle}>
          <MaterialCommunityIcons name="tune-variant" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scrollContent}>

        {/* --- AI CHAT BUBBLE --- */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => setChatExpanded(!chatExpanded)}
          style={[s.aiContainer, { backgroundColor: colors.card, borderColor: colors.accent + '30' }]}
        >
          <LinearGradient colors={[colors.accent, '#6c5ce7']} style={s.aiAvatar}>
            <MaterialCommunityIcons name="robot" size={20} color="#FFF" />
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={[s.aiLabel, { color: colors.accent }]}>SMART SUMMARY</Text>
            <Text style={[s.aiMessage, { color: colors.text }]} numberOfLines={chatExpanded ? undefined : 2}>
              I found <Text style={s.bold}>14 shops</Text> nearby. The <Text style={s.bold}>{bestProduct?.name}</Text> is your top match. It's only <Text style={s.bold}>{bestProduct?.distance}</Text> away with a <Text style={s.bold}>{bestProduct?.offer}</Text> deal!
            </Text>
          </View>
          <MaterialCommunityIcons name={chatExpanded ? "chevron-up" : "chevron-down"} size={20} color={colors.textTertiary} />
        </TouchableOpacity>

        {/* --- BEST MATCH SECTION --- */}
        <Text style={[s.sectionTitle, { color: colors.textTertiary }]}>TOP RECOMMENDATION</Text>
        
        {bestProduct && (
          <View style={[s.bestCard, { backgroundColor: colors.card }]}>
            <View style={s.imageSection}>
              <Image source={{ uri: bestProduct.image }} style={s.featuredImage} />
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']} style={s.imageOverlay} />
              <View style={s.matchBadge}>
                <Text style={s.matchBadgeText}>{bestProduct.matchScore}% Match</Text>
              </View>
              <View style={s.priceTag}>
                <Text style={s.priceValue}>{bestProduct.price}</Text>
              </View>
            </View>

            <View style={s.bestInfo}>
              <Text style={[s.bestName, { color: colors.text }]}>{bestProduct.name}</Text>
              
              <View style={s.metaRow}>
                <View style={s.metaItem}>
                  <MaterialCommunityIcons name="storefront" size={14} color={colors.accent} />
                  <Text style={[s.metaText, { color: colors.textSecondary }]}>{bestProduct.shop}</Text>
                </View>
                
                {/* Clickable Map Link */}
                <TouchableOpacity style={s.metaItem} onPress={() => goToMap(bestProduct)}>
                  <MaterialCommunityIcons name="map-marker" size={14} color="#FF4757" />
                  <Text style={[s.metaText, { color: '#FF4757', fontWeight: '700', textDecorationLine: 'underline' }]}>
                    {bestProduct.distance}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={s.actionRow}>
                <TouchableOpacity style={[s.mainBtn, { backgroundColor: colors.accent }]} onPress={() => router.push('/checkout')}>
                  <Text style={s.mainBtnText}>Buy Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.sqBtn, { borderColor: colors.border }]}>
                  <MaterialCommunityIcons name="cart-outline" size={22} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* --- ALTERNATIVES SECTION --- */}
        <View style={s.sectionHeaderRow}>
          <Text style={[s.sectionTitle, { color: colors.text, marginBottom: 0 }]}>Other Best Options</Text>
          <TouchableOpacity onPress={() => router.push('/map')}>
            <Text style={{ color: colors.accent, fontWeight: '700' }}>View Map</Text>
          </TouchableOpacity>
        </View>

        {otherProducts.map(item => (
          <View key={item.id} style={[s.listCard, { backgroundColor: colors.card }]}>
            <Image source={{ uri: item.image }} style={s.listImg} />
            <View style={s.listDetails}>
              <Text style={[s.listName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
              
              <View style={s.listMetaRow}>
                <Text style={{ color: colors.textTertiary, fontSize: 12 }}>{item.shop} • </Text>
                <TouchableOpacity onPress={() => goToMap(item)}>
                  <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '700', textDecorationLine: 'underline' }}>
                    {item.distance}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={s.listBottom}>
                <Text style={[s.listPrice, { color: colors.text }]}>{item.price}</Text>
                <View style={s.smallRating}>
                  <MaterialCommunityIcons name="star" size={12} color="#FFA502" />
                  <Text style={{ fontSize: 12, color: colors.textSecondary, fontWeight: '600' }}> {item.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 55 : 40,
    paddingBottom: 15,
  },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  liveStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#2ECC71', marginRight: 5 },
  liveText: { fontSize: 10, color: '#2ECC71', fontWeight: '700', textTransform: 'uppercase' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.03)', justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  aiContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 25,
    ...Platform.select({ 
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 }, 
      android: { elevation: 3 } 
    }),
  },
  aiAvatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  aiLabel: { fontSize: 10, fontWeight: '800', marginBottom: 4, letterSpacing: 0.5 },
  aiMessage: { fontSize: 14, lineHeight: 20, fontWeight: '500' },
  bold: { fontWeight: '800' },
  sectionTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: 15 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  bestCard: {
    borderRadius: 28,
    overflow: 'hidden',
    ...Platform.select({ 
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 }, 
      android: { elevation: 5 } 
    }),
  },
  imageSection: { height: 220, position: 'relative' },
  featuredImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: { ...StyleSheet.absoluteFillObject },
  matchBadge: { position: 'absolute', top: 15, left: 15, backgroundColor: '#2ECC71', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12 },
  matchBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '900' },
  priceTag: { position: 'absolute', bottom: 15, right: 15, backgroundColor: '#FFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12 },
  priceValue: { fontWeight: '900', color: '#000', fontSize: 16 },
  bestInfo: { padding: 20 },
  bestName: { fontSize: 22, fontWeight: '900' },
  metaRow: { flexDirection: 'row', marginTop: 10, gap: 15 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, fontWeight: '600' },
  actionRow: { flexDirection: 'row', marginTop: 20, gap: 10 },
  mainBtn: { flex: 1, height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  mainBtnText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  sqBtn: { width: 50, height: 50, borderRadius: 16, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  listCard: { flexDirection: 'row', padding: 12, borderRadius: 20, marginBottom: 12, alignItems: 'center' },
  listImg: { width: 80, height: 80, borderRadius: 18, marginRight: 15 },
  listDetails: { flex: 1 },
  listName: { fontSize: 15, fontWeight: '800' },
  listMetaRow: { flexDirection: 'row', marginVertical: 4 },
  listBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  listPrice: { fontSize: 16, fontWeight: '900' },
  smallRating: { flexDirection: 'row', alignItems: 'center' },
});