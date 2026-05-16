import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const CLOTH_ITEMS = [
  'Dresses',
  'Pants',
  'Skirts',
  'Shorts',
  'Jackets',
  'Hoodies',
  'Shirts',
  'Polo',
  'T-Shirts',
  'Tunics',
];

const OTHER_CATEGORIES = [
  { name: 'Food', icon: 'silverware-fork-and-knife', color: '#10b981' },
  { name: 'Rides', icon: 'car', color: '#6366f1' },
  { name: 'Grocery', icon: 'basket', color: '#f59e0b' },
  { name: 'Retail', icon: 'shopping', color: '#ec4899' },
];

export default function AllCategoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [selectedGender, setSelectedGender] = useState('Male');
  const [expandedCategory, setExpandedCategory] = useState('Clothe');

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const dynamicStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingTop: insets.top + 8,
    },
    headerTitle: { color: colors.text, fontSize: 22, fontWeight: '700' },
    content: { flex: 1, paddingHorizontal: 20, paddingVertical: 20 },
    toggleContainer: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 25,
      padding: 4,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 22,
      alignItems: 'center',
    },
    toggleButtonActive: {
      backgroundColor: colors.accent,
    },
    toggleText: { color: colors.textTertiary, fontSize: 13, fontWeight: '600' },
    toggleTextActive: { color: colors.background, fontWeight: '700' },
    categoryCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    categoryTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    categoryTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
    clotheGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, gap: 10 },
    clotheButton: {
      width: '48%',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    clotheButtonText: { color: colors.textSecondary, fontSize: 13, fontWeight: '500' },
    justForYouCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginTop: 16,
      position: 'relative',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    justForYouContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    justForYouText: { color: colors.text, fontSize: 16, fontWeight: '600' },
    floatingButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.headerTitle}>All Category</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={dynamicStyles.content} showsVerticalScrollIndicator={false}>
        {/* Segmented Toggle */}
        <View style={dynamicStyles.toggleContainer}>
          {['All', 'Male', 'Female'].map(gender => (
            <TouchableOpacity
              key={gender}
              style={[
                dynamicStyles.toggleButton,
                selectedGender === gender && dynamicStyles.toggleButtonActive,
              ]}
              onPress={() => setSelectedGender(gender)}
            >
              <Text
                style={[
                  dynamicStyles.toggleText,
                  selectedGender === gender && dynamicStyles.toggleTextActive,
                ]}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clothe Category */}
        <TouchableOpacity
          style={dynamicStyles.categoryCard}
          onPress={() => toggleCategory('Clothe')}
          activeOpacity={0.7}
        >
          <View style={dynamicStyles.categoryHeader}>
            <View style={dynamicStyles.categoryTitleContainer}>
              <MaterialCommunityIcons name="shirt" size={24} color={colors.accent} />
              <Text style={dynamicStyles.categoryTitle}>Clothe</Text>
            </View>
            <MaterialCommunityIcons
              name={expandedCategory === 'Clothe' ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={colors.accent}
            />
          </View>

          {expandedCategory === 'Clothe' && (
            <View style={dynamicStyles.clotheGrid}>
              {CLOTH_ITEMS.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={dynamicStyles.clotheButton}
                >
                  <Text style={dynamicStyles.clotheButtonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>

        {/* Other Categories */}
        {OTHER_CATEGORIES.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={dynamicStyles.categoryCard}
            onPress={() => toggleCategory(category.name)}
            activeOpacity={0.7}
          >
            <View style={dynamicStyles.categoryHeader}>
              <View style={dynamicStyles.categoryTitleContainer}>
                <MaterialCommunityIcons
                  name={category.icon as any}
                  size={24}
                  color={category.color}
                />
                <Text style={dynamicStyles.categoryTitle}>{category.name}</Text>
              </View>
              <MaterialCommunityIcons
                name={expandedCategory === category.name ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={category.color}
              />
            </View>
          </TouchableOpacity>
        ))}

        {/* Just for You Card */}
        <TouchableOpacity style={dynamicStyles.justForYouCard} activeOpacity={0.9}>
          <View style={dynamicStyles.justForYouContent}>
            <Text style={dynamicStyles.justForYouText}>Just for You</Text>
            <MaterialCommunityIcons name="star" size={20} color={colors.gold} />
          </View>
          <View style={dynamicStyles.floatingButton}>
            <MaterialCommunityIcons name="arrow-right" size={22} color={colors.background} />
          </View>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// All styles are now in dynamicStyles within the component

