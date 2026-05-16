import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  Switch, Dimensions, Modal, Pressable
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const { theme, toggleTheme, colors } = useTheme();

  // State for Modal
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const activityItems = [
 
    { icon: 'heart-outline', title: 'Saved Deals', subtitle: '12 active offers', color: '#f43f5e', detail: '3 of your saved deals are expiring soon! Check the Nike Store and Sports Direct offers.' },
    { icon: 'wallet-outline', title: 'Payment Methods', subtitle: 'Visa **** 4242', color: '#10b981', detail: 'Primary card ending in 4242 is active. Your next billing date for Pro is May 12, 2026.' },
  ];

  const settingItems = [
    { icon: 'bell-outline', title: 'Notifications', subtitle: 'Enabled', color: '#f59e0b', detail: 'You are receiving alerts for Price Drops, Security, and Weekly Summaries.' },
    { icon: 'shield-check-outline', title: 'Privacy & Security', subtitle: '2FA Active', color: '#3b82f6', detail: 'Your account is secured with Two-Factor Authentication. Last login: Today from Colombo.' },
    { icon: 'help-circle-outline', title: 'Support Center', subtitle: 'Get help 24/7', color: '#8b5cf6', detail: 'Need help? You can start a live chat with Insightz support or view our FAQ.' },
  ];

  const handlePress = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* --- PREMIUM HEADER --- */}
        <LinearGradient colors={[colors.accent, colors.accent + 'CC']} style={s.headerGradient}>
          <View style={s.topActions}>
            <TouchableOpacity style={s.iconBtn} onPress={() => handlePress({ title: 'Account Settings', detail: 'Manage your profile visibility, data synchronization, and linked social accounts.', color: colors.accent })}>
              <MaterialCommunityIcons name="cog" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>

          <View style={s.profileSection}>
            <View style={s.avatarContainer}>
              <Image
                source={{ uri: 'https://ui-avatars.com/api/?name=Nimal+Perera&background=fff&color=0ea5e9&size=200' }}
                style={s.avatar}
              />
              <TouchableOpacity style={s.editBadge}>
                <MaterialCommunityIcons name="camera" size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text style={s.userName}>Nimal Perera</Text>
            <Text style={s.userEmail}>nimal.p@insightz.lk</Text>
            <TouchableOpacity style={s.proBadge} onPress={() => handlePress({ title: 'Insightz Pro', detail: 'You are a premium member! Benefits include: Zero ads, Unlimited AI comparisons, and priority support.', color: '#FFD700' })}>
              <MaterialCommunityIcons name="crown" size={14} color="#FFD700" />
              <Text style={s.proText}>INSIGHTZ PRO</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* --- SAVINGS CARD --- */}
        <Pressable
          style={({ pressed }) => [s.savingsCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.9 : 1 }]}
          onPress={() => handlePress({ title: 'Monthly Insights', detail: 'You saved LKR 12,450 this month. Great job! You are in the top 5% of savers in Colombo.', color: colors.accent })}
        >
          <View style={s.savingsInfo}>
            <Text style={[s.savingsLabel, { color: colors.textSecondary }]}>Total Savings this month</Text>
            <Text style={[s.savingsValue, { color: colors.accent }]}>LKR 12,450.00</Text>
          </View>
          <View style={s.savingsGraph}>
            {[40, 70, 45, 90, 65, 80].map((h, i) => (
              <View key={i} style={[s.bar, { height: h * 0.4, backgroundColor: i === 3 ? colors.accent : colors.border }]} />
            ))}
          </View>
        </Pressable>

        {/* --- ACTIVITY SECTION --- */}
        <View style={s.section}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>Your Activity</Text>
          <View style={[s.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {activityItems.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handlePress(item)}
                style={[s.menuItem, i !== activityItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
              >
                <View style={[s.iconWrapper, { backgroundColor: item.color + '15' }]}>
                  <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
                </View>
                <View style={s.menuText}>
                  <Text style={[s.menuTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[s.menuSubtitle, { color: colors.textTertiary }]}>{item.subtitle}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- PREFERENCES --- */}
        <View style={s.section}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>App Settings</Text>
          <View style={[s.menuGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={s.menuItem}>
              <View style={[s.iconWrapper, { backgroundColor: colors.accent + '15' }]}>
                <MaterialCommunityIcons name="theme-light-dark" size={20} color={colors.accent} />
              </View>
              <View style={s.menuText}>
                <Text style={[s.menuTitle, { color: colors.text }]}>Dark Mode</Text>
                <Text style={[s.menuSubtitle, { color: colors.textTertiary }]}>Adjust visual appearance</Text>
              </View>
              <Switch value={theme === 'dark'} onValueChange={toggleTheme} trackColor={{ false: '#D1D5DB', true: colors.accent + '60' }} thumbColor={theme === 'dark' ? colors.accent : '#F3F4F6'} />
            </View>

            {settingItems.map((item, i) => (
              <TouchableOpacity key={i} onPress={() => handlePress(item)} style={[s.menuItem, { borderTopWidth: 1, borderTopColor: colors.border }]}>
                <View style={[s.iconWrapper, { backgroundColor: item.color + '15' }]}>
                  <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
                </View>
                <View style={s.menuText}>
                  <Text style={[s.menuTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[s.menuSubtitle, { color: colors.textTertiary }]}>{item.subtitle}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- LOGOUT --- */}
        <TouchableOpacity style={[s.logoutBtn, { borderColor: colors.error + '40' }]} onPress={() => handlePress({ title: 'Logout', detail: 'Are you sure you want to sign out? You will need to log back in to access your saved comparisons.', color: colors.error })}>
          <MaterialCommunityIcons name="logout" size={20} color={colors.error} />
          <Text style={[s.logoutText, { color: colors.error }]}>Log Out of Account</Text>
        </TouchableOpacity>

        <Text style={s.versionText}>Insightz v2.4.0 (Beta)</Text>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- DYNAMIC DETAIL MODAL --- */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={s.modalOverlay}>
          <View style={[s.modalContent, { backgroundColor: colors.card }]}>
            <View style={[s.modalIcon, { backgroundColor: selectedItem?.color + '20' }]}>
              <MaterialCommunityIcons name={selectedItem?.icon || 'information'} size={40} color={selectedItem?.color || colors.accent} />
            </View>
            <Text style={[s.modalTitle, { color: colors.text }]}>{selectedItem?.title}</Text>
            <Text style={[s.modalDetail, { color: colors.textSecondary }]}>{selectedItem?.detail}</Text>
            <TouchableOpacity style={[s.closeBtn, { backgroundColor: colors.accent }]} onPress={() => setModalVisible(false)}>
              <Text style={s.closeBtnText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  headerGradient: { paddingTop: 40, paddingBottom: 40, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center' },
  topActions: { position: 'absolute', top: 50, right: 20 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  profileSection: { alignItems: 'center' },
  avatarContainer: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#000', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  userName: { color: '#FFF', fontSize: 24, fontWeight: '900', marginTop: 15 },
  userEmail: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 2 },
  proBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginTop: 12 },
  proText: { color: '#FFF', fontSize: 10, fontWeight: '800', marginLeft: 5, letterSpacing: 1 },
  savingsCard: { flexDirection: 'row', marginHorizontal: 20, marginTop: -30, padding: 20, borderRadius: 24, borderWidth: 1, alignItems: 'center', justifyContent: 'space-between', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 10 },
  savingsInfo: { flex: 1 },
  savingsLabel: { fontSize: 12, fontWeight: '600' },
  savingsValue: { fontSize: 22, fontWeight: '900', marginTop: 4 },
  savingsGraph: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  bar: { width: 6, borderRadius: 3 },
  section: { marginTop: 25, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 12, marginLeft: 5 },
  menuGroup: { borderRadius: 24, borderWidth: 1, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  iconWrapper: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuText: { flex: 1, marginLeft: 15 },
  menuTitle: { fontSize: 15, fontWeight: '700' },
  menuSubtitle: { fontSize: 12, marginTop: 2 },
  logoutBtn: { marginHorizontal: 20, marginTop: 30, height: 60, borderRadius: 20, borderWidth: 1.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  logoutText: { fontSize: 16, fontWeight: '800' },
  versionText: { textAlign: 'center', color: '#999', fontSize: 12, marginTop: 20 },
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { padding: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center' },
  modalIcon: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: '900', marginBottom: 10 },
  modalDetail: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  closeBtn: { width: '100%', height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  closeBtnText: { color: '#FFF', fontSize: 18, fontWeight: '800' }
});