import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
      <StatusBar style="dark" />
      
      {/* Decorative Background Elements */}
      <View style={[styles.decorativeCircle, { backgroundColor: colors.accent, opacity: 0.1, top: -100, right: -100 }]} />
      <View style={[styles.decorativeCircle2, { backgroundColor: colors.warning, opacity: 0.1, bottom: 200, left: -150 }]} />

      <View style={styles.contentContainer}>
        
        {/* Brand Icon/Logo Placeholder */}
        <View style={styles.logoContainer}>
          <View style={[styles.iconWrapper, { backgroundColor: colors.card, shadowColor: colors.textTertiary }]}>
            <MaterialCommunityIcons name="lightning-bolt" size={48} color={colors.accent} />
          </View>
        </View>

        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: '#0f172a' }]}>InSightZ</Text>
          <Text style={[styles.subtitle, { color: '#334155' }]}>Your Ultimate Super App</Text>
          <Text style={[styles.description, { color: '#64748b' }]}>
            Rides, Food, Grocery & Retail all unified in one premium experience.
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.accent, shadowColor: colors.accent }]}
            onPress={() => router.push('/sign-in')}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonTextPrimary}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.buttonSecondary, { borderColor: '#cbd5e1', backgroundColor: '#ffffff' }]}
            onPress={() => router.push('/sign-up')}
            activeOpacity={0.85}
          >
            <Text style={[styles.buttonTextSecondary, { color: '#0f172a' }]}>Create an Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.7}
          >
            <Text style={[styles.skipText, { color: '#64748b' }]}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 120 : 100,
    paddingBottom: Platform.OS === 'ios' ? 60 : 40,
    zIndex: 2,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  iconWrapper: {
    width: 84,
    height: 84,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16 },
      android: { elevation: 8 },
    }),
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    maxWidth: '90%',
  },
  actionContainer: {
    gap: 16,
    marginTop: 40,
  },
  button: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: { shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 10 },
      android: { elevation: 5 },
    }),
  },
  buttonSecondary: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  buttonTextPrimary: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 8,
    padding: 12,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '700',
  }
});
