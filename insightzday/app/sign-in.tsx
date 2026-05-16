import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function SignInScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const BG_COLOR = '#ffffff';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, backgroundColor: BG_COLOR }}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        <View style={styles.container}>
          
          <View style={styles.contentOverlay}>
              {/* Back Button */}
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#0f172a" />
              </TouchableOpacity>

              {/* Header Section */}
              <View style={styles.headerContainer}>
                <Text style={styles.welcomeText}>Welcome Back</Text>
                <Text style={styles.subWelcome}>Sign in to access your curated super app experience</Text>
              </View>

              <View style={styles.formContainer}>

                {/* Email Input */}
                <View style={[
                  styles.inputGroup, 
                  focusedInput === 'email' && { borderColor: colors.accent, backgroundColor: '#ffffff' }
                ]}>
                  <MaterialCommunityIcons 
                    name="email-outline" 
                    size={20} 
                    color={focusedInput === 'email' ? colors.accent : '#94a3b8'} 
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    placeholderTextColor="#94a3b8"
                    value={email}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                {/* Password Input */}
                <View style={[
                  styles.inputGroup, 
                  focusedInput === 'password' && { borderColor: colors.accent, backgroundColor: '#ffffff' }
                ]}>
                  <MaterialCommunityIcons 
                    name="lock-outline" 
                    size={20} 
                    color={focusedInput === 'password' ? colors.accent : '#94a3b8'} 
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

                <TouchableOpacity style={styles.forgotBtn}>
                  <Text style={[styles.forgotText, { color: colors.accent }]}>Forgot password?</Text>
                </TouchableOpacity>

                {/* Primary Button */}
                <TouchableOpacity 
                   style={[styles.signInBtn, { backgroundColor: colors.accent }]} 
                   activeOpacity={0.85}
                   onPress={() => router.push('/(tabs)')}
                >
                  <Text style={styles.signInBtnText}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.dividerRow}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>or continue with</Text>
                  <View style={styles.divider} />
                </View>

                {/* Social Auth */}
                <View style={styles.socialRow}>
                  <TouchableOpacity style={styles.socialBtn}>
                    <MaterialCommunityIcons name="google" size={24} color="#db4437" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn}>
                    <MaterialCommunityIcons name="apple" size={24} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.footerRow}>
                <Text style={{ color: '#64748b' }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/sign-up')}>
                  <Text style={{ color: colors.accent, fontWeight: '700' }}>Create one</Text>
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
  contentOverlay: { flex: 1, paddingHorizontal: 28, paddingTop: 60, paddingBottom: 40 },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  headerContainer: { marginBottom: 40 },
  welcomeText: { fontSize: 32, fontWeight: '900', color: '#0f172a', marginBottom: 8, letterSpacing: -0.5 },
  subWelcome: { fontSize: 16, color: '#64748b', lineHeight: 24 },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 64,
  },
  input: { flex: 1, fontSize: 16, color: '#0f172a', marginLeft: 12 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 32, marginTop: 4 },
  forgotText: { fontSize: 14, fontWeight: '600' },
  signInBtn: { 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 32,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  signInBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  divider: { flex: 1, height: 1, backgroundColor: '#e2e8f0' },
  dividerText: { marginHorizontal: 16, color: '#94a3b8', fontSize: 14, fontWeight: '500' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  socialBtn: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
});






