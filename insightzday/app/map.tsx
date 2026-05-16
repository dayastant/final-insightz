import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Platform } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function MapScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams();

  // Route Data
  const shopName = params.shopName || 'Premium Store';
  const distance = params.distance || '0.8 km';
  const shopLat = parseFloat(params.lat as string || '6.9271');
  const shopLng = parseFloat(params.lng as string || '79.8612');

  // Animated User Location Simulation
  const [userLoc, setUserLoc] = useState({
    latitude: shopLat - 0.006,
    longitude: shopLng - 0.006,
  });

  useEffect(() => {
    // Simulate slight movement for that "Live" feel
    const interval = setInterval(() => {
      setUserLoc(prev => ({
        latitude: prev.latitude + 0.00005,
        longitude: prev.longitude + 0.00005,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* --- FLOATING HEADER --- */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={[styles.backButton, { backgroundColor: colors.card }]}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color={colors.text} />
        </TouchableOpacity>
        
        <View style={[styles.etaBubble, { backgroundColor: colors.card }]}>
          <Text style={[styles.etaText, { color: colors.text }]}>
            <Text style={{ color: colors.accent, fontWeight: '900' }}>8 mins</Text> away
          </Text>
        </View>
      </View>

      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: (shopLat + userLoc.latitude) / 2,
          longitude: (shopLng + userLoc.longitude) / 2,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        {/* SHOP MARKER - Custom Icon */}
        <Marker coordinate={{ latitude: shopLat, longitude: shopLng }}>
          <View style={styles.markerContainer}>
            <LinearGradient colors={[colors.accent, '#6c5ce7']} style={s.shopPin}>
              <MaterialCommunityIcons name="shopping" size={18} color="#FFF" />
            </LinearGradient>
            <View style={s.pinPointer} />
          </View>
        </Marker>

        {/* USER MARKER - Pulsing Blue */}
        <Marker coordinate={userLoc}>
          <View style={s.userMarkerOuter}>
            <View style={[s.userMarkerInner, { backgroundColor: colors.accent }]} />
          </View>
        </Marker>

        {/* DASHED ROUTE */}
        <Polyline
          coordinates={[userLoc, { latitude: shopLat, longitude: shopLng }]}
          strokeColor={colors.accent}
          strokeWidth={3}
          lineDashPattern={[5, 5]}
        />
      </MapView>

      {/* --- BOTTOM NAVIGATION CARD --- */}
      <View style={[s.bottomSheet, { backgroundColor: colors.card }]}>
        <View style={s.dragHandle} />
        
        <View style={s.shopRow}>
          <View>
            <Text style={[s.shopTitle, { color: colors.text }]}>{shopName}</Text>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>Arrival: 10:45 PM • {distance}</Text>
          </View>
          <TouchableOpacity style={[s.roundBtn, { backgroundColor: colors.accent + '20' }]}>
            <MaterialCommunityIcons name="phone" size={20} color={colors.accent} />
          </TouchableOpacity>
        </View>

        <View style={s.divider} />

        {/* EXTRA FEATURE: RIDE HAILING OPTIONS */}
        <Text style={s.featureLabel}>SELECT TRANSPORT</Text>
        <View style={s.transportRow}>
          <TouchableOpacity style={[s.transportBtn, s.activeTransport, { borderColor: colors.accent }]}>
            <MaterialCommunityIcons name="walk" size={24} color={colors.accent} />
            <Text style={[s.transportText, { color: colors.accent }]}>Walk</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.transportBtn, { borderColor: colors.border }]}>
            <MaterialCommunityIcons name="bike" size={24} color={colors.textTertiary} />
            <Text style={[s.transportText, { color: colors.textSecondary }]}>LKR 120</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.transportBtn, { borderColor: colors.border }]}>
            <MaterialCommunityIcons name="car" size={24} color={colors.textTertiary} />
            <Text style={[s.transportText, { color: colors.textSecondary }]}>LKR 350</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
           style={[s.goButton, { backgroundColor: colors.accent }]}
           onPress={() => alert("Navigation Started!")}
        >
          <Text style={s.goButtonText}>START NAVIGATION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  shopPin: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  pinPointer: { width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 8, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#FFF', alignSelf: 'center', marginTop: -2 },
  userMarkerOuter: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(59, 130, 246, 0.2)', justifyContent: 'center', alignItems: 'center' },
  userMarkerInner: { width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#FFF' },
  bottomSheet: { position: 'absolute', bottom: 0, width: '100%', padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 20 },
  dragHandle: { width: 40, height: 5, backgroundColor: '#E0E0E0', borderRadius: 5, alignSelf: 'center', marginBottom: 15 },
  shopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  shopTitle: { fontSize: 20, fontWeight: '800' },
  roundBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
  featureLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1, color: '#999', marginBottom: 10 },
  transportRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  transportBtn: { width: (width - 60) / 3, paddingVertical: 12, borderRadius: 15, borderWidth: 1, alignItems: 'center', gap: 5 },
  activeTransport: { borderWidth: 2, backgroundColor: 'rgba(59, 130, 246, 0.05)' },
  transportText: { fontSize: 12, fontWeight: '700' },
  goButton: { height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  goButtonText: { color: '#FFF', fontWeight: '800', fontSize: 16, letterSpacing: 1 },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  headerContainer: { position: 'absolute', top: 50, left: 20, right: 20, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButton: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  etaBubble: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, elevation: 5 },
  etaText: { fontWeight: '700', fontSize: 14 },
});