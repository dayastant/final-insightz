import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Premium Light Palette
  const NEON_CYAN = '#0891b2'; // Slightly deeper for contrast on white
  const NEON_PINK = '#db2777'; 
  const LIGHT_BG = '#ffffff'; 
  const INPUT_BG = '#f8fafc';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, backgroundColor: LIGHT_BG }}
    >
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          
          {/* Subtle Ambient Glow Orbs (Pastel versions for white bg) */}
          <View style={[styles.glowOrb, { backgroundColor: '#fae8ff', top: -100, right: -80, opacity: 0.8 }]} />
          <View style={[styles.glowOrb, { backgroundColor: '#ecfeff', bottom: 50, left: -100, opacity: 0.8 }]} />

          <View style={styles.contentOverlay}>
              {/* Back Button - Clean Minimal Style */}
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <MaterialCommunityIcons name="chevron-left" size={28} color="#0f172a" />
              </TouchableOpacity>

              {/* Header Section */}
              <View style={styles.headerContainer}>
                <MaskedView
                  style={styles.logoMaskedView}
                  maskElement={<Text style={styles.logoText}>Create Account</Text>}
                >
                  <LinearGradient
                    colors={[NEON_CYAN, NEON_PINK]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                  />
                </MaskedView>
                <Text style={styles.subWelcome}>Join the next generation of connectivity</Text>
              </View>

              <View style={styles.formContainer}>
                
                {/* Full Name Input */}
                <View style={[
                  styles.inputGroup, 
                  focusedInput === 'name' && { borderColor: NEON_CYAN, backgroundColor: '#fff', elevation: 8 }
                ]}>
                  <MaterialCommunityIcons 
                    name="account-outline" 
                    size={22} 
                    color={focusedInput === 'name' ? NEON_CYAN : '#94a3b8'} 
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#94a3b8"
                    value={name}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={setName}
                  />
                </View>

                {/* Email Input */}
                <View style={[
                  styles.inputGroup, 
                  focusedInput === 'email' && { borderColor: NEON_CYAN, backgroundColor: '#fff', elevation: 8 }
                ]}>
                  <MaterialCommunityIcons 
                    name="email-outline" 
                    size={22} 
                    color={focusedInput === 'email' ? NEON_CYAN : '#94a3b8'} 
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#94a3b8"
                    value={email}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Password Input */}
                <View style={[
                  styles.inputGroup, 
                  focusedInput === 'password' && { borderColor: NEON_PINK, backgroundColor: '#fff', elevation: 8 }
                ]}>
                  <MaterialCommunityIcons 
                    name="lock-outline" 
                    size={22} 
                    color={focusedInput === 'password' ? NEON_PINK : '#94a3b8'} 
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="#94a3b8" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <View style={[
                  styles.inputGroup, 
                  focusedInput === 'confirm' && { borderColor: NEON_PINK, backgroundColor: '#fff', elevation: 8 },
                  { marginBottom: 35 }
                ]}>
                  <MaterialCommunityIcons 
                    name="shield-check-outline" 
                    size={22} 
                    color={focusedInput === 'confirm' ? NEON_PINK : '#94a3b8'} 
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#94a3b8"
                    value={confirmPassword}
                    onFocus={() => setFocusedInput('confirm')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                  />
                </View>

                {/* Primary Button */}
                <TouchableOpacity 
                   activeOpacity={0.85}
                   onPress={() => router.push('/(tabs)')}
                   style={styles.signUpBtnWrapper}
                >
                  <LinearGradient
                    colors={[NEON_CYAN, '#06b6d4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.signUpBtn}
                  >
                    <Text style={styles.signUpBtnText}>CREATE ACCOUNT</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <Text style={styles.termsText}>
                  By creating an account, you agree to our <Text style={{ color: NEON_CYAN, fontWeight: '700' }}>Terms</Text> and <Text style={{ color: NEON_PINK, fontWeight: '700' }}>Privacy Policy</Text>.
                </Text>
              </View>

              {/* Footer */}
              <View style={styles.footerRow}>
                <Text style={{ color: '#64748b', fontSize: 15 }}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/sign-in')}>
                  <Text style={{ color: NEON_CYAN, fontWeight: '800', fontSize: 15 }}>LOGIN</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, minHeight: height },
  glowOrb: { position: 'absolute', width: width * 1.2, height: width * 1.2, borderRadius: 300 },
  contentOverlay: { flex: 1, paddingHorizontal: 28, paddingTop: 50, paddingBottom: 40 },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    // Soft shadow for light mode
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  headerContainer: { marginBottom: 35 },
  logoMaskedView: { height: 50, width: '100%' },
  logoText: { fontSize: 36, fontWeight: '900', letterSpacing: -1 },
  subWelcome: { fontSize: 15, color: '#64748b', marginTop: 4, fontWeight: '500' },
  formContainer: { flex: 1 },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 20,
    marginBottom: 16,
    paddingHorizontal: 20,
    height: 64,
    // Shadow for focused state
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0, // Controlled by focused logic
    shadowRadius: 20,
  },
  input: { flex: 1, fontSize: 16, color: '#0f172a', marginLeft: 12, fontWeight: '500' },
  signUpBtnWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#0891b2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  signUpBtn: { 
    height: 64, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  signUpBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
  termsText: { fontSize: 12, textAlign: 'center', color: '#94a3b8', lineHeight: 20, paddingHorizontal: 20 },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 30, alignItems: 'center' },
});