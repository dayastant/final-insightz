import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const WISHLIST_ITEMS = [
  { id: '1', category: 'Grocery', productId: '1', title: 'Weekly Groceries', shop: 'Keells Super', price: 'LKR 4,500', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300&auto=format&fit=crop', rating: 4.9 },
  { id: '13', category: 'Retail', productId: '1', title: 'Wireless Headphones', shop: 'AudioCenter', price: 'LKR 5,999', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop', rating: 4.8 },
  { id: '5', category: 'Food', productId: '1', title: 'Burger King Meal', shop: 'Burger King', price: 'LKR 1,800', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop', rating: 4.5 },
];

export default function WishlistScreen() {
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
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.5,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 12,
      marginBottom: 16,
      // Sophisticated Shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 16,
      backgroundColor: colors.border,
    },
    ratingBadge: {
      position: 'absolute',
      top: 6,
      left: 6,
      backgroundColor: 'rgba(255,255,255,0.9)',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000',
      marginLeft: 2,
    },
    infoContainer: {
      flex: 1,
      marginLeft: 16,
      justifyContent: 'space-between',
    },
    categoryText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.accent,
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    title: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 4,
    },
    shopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      opacity: 0.7,
    },
    shopText: {
      fontSize: 13,
      color: colors.textSecondary,
      marginLeft: 4,
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    price: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.accent,
    },
    actionButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconBtn: {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      marginLeft: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    primaryBtn: {
      backgroundColor: colors.accent,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 12,
      marginLeft: 8,
    },
    btnText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 13,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
    }
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.ratingBadge}>
          <MaterialCommunityIcons name="star" size={10} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.categoryText}>{item.category}</Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <View style={styles.shopRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.shopText}>{item.shop}</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialCommunityIcons name="trash-can-outline" size={18} color="#FF5252" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.btnText}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={WISHLIST_ITEMS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="heart-outline" size={80} color={colors.border} />
            <Text style={{ color: colors.textSecondary, marginTop: 10 }}>Nothing saved yet.</Text>
          </View>
        }
      />
    </View>
  );
}