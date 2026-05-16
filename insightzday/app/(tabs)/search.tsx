import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// --- DATA STRUCTURES ---
const RECENT_SEARCHES = [
  { query: 'Chicken Biriyani', icon: 'food-outline', type: 'food' },
  { query: 'Summer Dress', icon: 'hanger', type: 'clothes' },
  { query: 'iPhone 15 Pro', icon: 'cellphone', type: 'retail' },
  { query: 'Cotton T-Shirt', icon: 'tshirt-crew-outline', type: 'clothes' },
];

const CATEGORIES = [
  { id: 'foods', title: 'Foods', icon: 'food-variant', color: '#FF6B6B', count: '1.2k+' },
  { id: 'clothes', title: 'Fashion', icon: 'tshirt-crew', color: '#4ECDC4', count: '850+' },
  { id: 'rides', title: 'Rides', icon: 'car-side', color: '#45B7D1', count: '24/7' },
  { id: 'groceries', title: 'Grocery', icon: 'shopping', color: '#FFA07A', count: '2k+' },
];

const FILTERS = [
  { id: 'all', label: 'All', icon: 'layers-triple-outline' },
  { id: 'price', label: 'Price', icon: 'currency-usd' },
  { id: 'top_rated', label: 'Top Rated', icon: 'star-circle-outline' },
  { id: 'fast_delivery', label: 'Fast Delivery', icon: 'truck-fast-outline' },
  { id: 'easy_returns', label: 'Easy Returns', icon: 'keyboard-return' },
];

export default function SearchScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>

      {/* ─── STICKY SEARCH HEADER ─── */}
      <View style={[s.searchHeader, { backgroundColor: colors.background }]}>
        <View style={[s.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MaterialCommunityIcons name="magnify" size={22} color={colors.accent} />
          <TextInput
            style={[s.searchInput, { color: colors.text }]}
            placeholder="Search products or stores..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => searchQuery && router.push('/recommendation')}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={s.voiceBtn}>
              <MaterialCommunityIcons name="microphone" size={22} color={colors.accent} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollPadding}
      >

        {/* ─── HORIZONTAL FILTERS ─── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={s.filtersWrapper}
          contentContainerStyle={s.filtersContainer}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.id}
              onPress={() => setActiveFilter(activeFilter === f.id ? null : f.id)}
              style={[
                s.filterBtn,
                { backgroundColor: colors.card, borderColor: colors.border },
                activeFilter === f.id && { borderColor: colors.accent, backgroundColor: colors.accent + '15' }
              ]}
            >
              <MaterialCommunityIcons
                name={f.icon as any}
                size={16}
                color={activeFilter === f.id ? colors.accent : colors.textTertiary}
              />
              <Text style={[s.filterText, { color: activeFilter === f.id ? colors.accent : colors.textSecondary }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={s.contentArea}>

          {/* ─── PREMIUM RECENT SEARCHES ─── */}
          {!searchQuery && (
            <View style={s.recentSection}>
              <View style={s.sectionHeader}>
                <View style={s.titleRow}>
                  <MaterialCommunityIcons name="history" size={18} color={colors.text} />
                  <Text style={[s.sectionTitle, { color: colors.text }]}>Recent Searches</Text>
                </View>
                <TouchableOpacity><Text style={{ color: colors.accent, fontWeight: '700' }}>Clear</Text></TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.recentTagsRow}>
                {RECENT_SEARCHES.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[s.premiumTag, { backgroundColor: colors.card, borderColor: colors.border }]}
                    onPress={() => setSearchQuery(item.query)}
                  >
                    <View style={[s.tagIconCircle, { backgroundColor: colors.accent + '15' }]}>
                      <MaterialCommunityIcons name={item.icon as any} size={14} color={colors.accent} />
                    </View>
                    <Text style={[s.tagText, { color: colors.textSecondary }]}>{item.query}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* ─── SMART BANNER ─── */}
          <LinearGradient
            colors={[colors.accent, '#4834d4']} // Added a deeper purple for a high-end look
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.heroBox}
          >
            <View style={s.heroContent}>
              <View style={{ flex: 1 }}>
                <Text style={s.heroTitle}>Smart Search</Text>
                <Text style={s.heroSubtitle}>
                  Find the best price, highest ratings, and closest location in one tap.
                </Text>

                {/* Visual Indicators for Price, Rating, Location */}
                <View style={s.bannerMetaRow}>
                  <View style={s.metaBadge}>
                    <MaterialCommunityIcons name="star" size={10} color="#FFD700" />
                    <Text style={s.metaText}>Ratings</Text>
                  </View>
                  <View style={s.metaBadge}>
                    <MaterialCommunityIcons name="map-marker" size={10} color="#FFF" />
                    <Text style={s.metaText}>Nearby</Text>
                  </View>
                  <View style={s.metaBadge}>
                    <MaterialCommunityIcons name="tag-outline" size={10} color="#FFF" />
                    <Text style={s.metaText}>Prices</Text>
                  </View>
                </View>
              </View>

              <View style={s.heroIconCircle}>
                <MaterialCommunityIcons name="magnify-scan" size={38} color="#FFF" />
              </View>
            </View>
          </LinearGradient>

          {/* ─── POPULAR CATEGORIES ─── */}
          <Text style={[s.sectionTitle, { color: colors.text, marginBottom: 16 }]}>Explore Categories</Text>
          <View style={s.categoriesGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat.id} style={s.categoryItem} activeOpacity={0.8}>
                <View style={[s.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <LinearGradient
                    colors={[`${cat.color}15`, `${cat.color}35`]}
                    style={s.catIconBg}
                  >
                    <MaterialCommunityIcons name={cat.icon as any} size={32} color={cat.color} />
                  </LinearGradient>
                  <Text style={[s.catTitle, { color: colors.text }]}>{cat.title}</Text>
                  <Text style={{ color: colors.textTertiary, fontSize: 11 }}>{cat.count} items</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  searchHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
      android: { elevation: 6 },
    }),
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  voiceBtn: { padding: 4 },
  scrollPadding: { paddingBottom: 40 },
  filtersWrapper: { marginBottom: 20 },
  filtersContainer: { paddingHorizontal: 20, gap: 10 },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
  },
  filterText: { fontSize: 13, fontWeight: '700' },
  contentArea: { paddingHorizontal: 20 },
  recentSection: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  recentTagsRow: { gap: 12, paddingRight: 20 },
  premiumTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 16,
    borderRadius: 15,
    borderWidth: 1,
  },
  tagIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tagText: { fontSize: 13, fontWeight: '600' },
  heroBox: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 32,
  },
  heroContent: { flexDirection: 'row', alignItems: 'center' },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 4 },
  heroSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 20 },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: { width: '48%', marginBottom: 16 },
  categoryCard: {
    borderRadius: 28,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  catIconBg: {
    width: 64,
    height: 64,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  catTitle: { fontSize: 16, fontWeight: '800', marginBottom: 2 },
  heroBox: {
    borderRadius: 28,
    padding: 22,
    marginBottom: 30,
    overflow: 'hidden',
  },
  heroContent: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  heroTitle: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: '900', 
    marginBottom: 4 
  },
  heroSubtitle: { 
    color: 'rgba(255,255,255,0.85)', 
    fontSize: 13, 
    lineHeight: 18,
    fontWeight: '500'
  },
  bannerMetaRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 4,
  },
  metaText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  heroIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});