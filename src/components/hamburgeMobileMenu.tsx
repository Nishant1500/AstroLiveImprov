import React from 'react';
import { StyleSheet, Pressable, Modal, ScrollView, View } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme'; // Assuming your custom useTheme hook is located here
import { Spacing } from '@/constants/theme';
import {
  Home,
  ShoppingBag,
  Sun,
  Globe,
  BookOpen,
  Moon,
  FileText,
  Heart,
  Calendar,
  BookMarked,
  SlidersHorizontal,
  Users,
  Calculator,
  Compass,
} from 'lucide-react-native';

interface MobileDrawerProps {
  visible: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  href: string;
  enabled: boolean;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

const MENU_ITEMS: MenuItem[] = [
  { name: 'Home', href: '/', enabled: true, icon: Home },
  { name: 'Store', href: '/store', enabled: false, icon: ShoppingBag },
  { name: 'Horoscope', href: '/horoscope', enabled: false, icon: Sun },
  { name: 'Astrology', href: '/astrology', enabled: false, icon: Globe },
  { name: 'Blog', href: '/blog', enabled: false, icon: BookOpen },
  { name: 'Occult', href: '/occult', enabled: false, icon: Moon },
  { name: 'Free Reports', href: '/free-reports', enabled: false, icon: FileText },
  { name: 'Healing', href: '/healing', enabled: false, icon: Heart },
  { name: 'Panchang', href: '/panchang', enabled: false, icon: Calendar },
  { name: 'Lal Kitab', href: '/lal-kitab', enabled: false, icon: BookMarked },
  { name: 'KP', href: '/kp', enabled: false, icon: SlidersHorizontal },
  { name: 'Compatibility', href: '/compatibility', enabled: false, icon: Users },
  { name: 'Calculators', href: '/calculators', enabled: false, icon: Calculator },
  { name: 'Explore', href: '/explore', enabled: true, icon: Compass },
];

export default function MobileDrawer({ visible, onClose }: MobileDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { colors } = useTheme(); // Pulling colors from your useTheme hook

  const handleNavigate = (href: string, enabled: boolean) => {
    if (!enabled) return;
    onClose();
    router.push(href as any);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* Backdrop to close drawer when tapped */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        {/* Sliding Drawer Container */}
        <ThemedView type="backgroundElement" style={styles.drawerContainer}>
          <View style={styles.drawerHeader}>
            <ThemedText type="defaultSemiBold" style={styles.drawerTitle}>
              Menu
            </ThemedText>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <ThemedText style={styles.closeText}>✕</ThemedText>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.menuList}>
            {MENU_ITEMS.map((item) => {
              const isFocused = pathname === item.href;
              const IconComponent = item.icon;

              // Dynamically color icons using your useTheme colors or fallback values
              const iconColor = isFocused
                ? colors?.tint ?? '#9b46e5'
                : item.enabled
                ? colors?.icon ?? 'rgba(150, 150, 150, 0.9)'
                : colors?.tabIconDefault ?? 'rgba(150, 150, 150, 0.3)';

              return (
                <Pressable
                  key={item.href}
                  onPress={() => handleNavigate(item.href, item.enabled)}
                  disabled={!item.enabled}
                  style={({ pressed }) => [
                    styles.menuItem,
                    isFocused && styles.activeMenuItem,
                    !item.enabled && styles.disabledMenuItem,
                    pressed && item.enabled && { opacity: 0.7 },
                  ]}
                >
                  <View style={styles.menuItemContent}>
                    <IconComponent
                      size={20}
                      strokeWidth={isFocused ? 2.5 : 2}
                      color={iconColor}
                    />
                    <ThemedText
                      type={isFocused ? 'defaultSemiBold' : 'default'}
                      themeColor={isFocused ? 'text' : item.enabled ? 'textSecondary' : undefined}
                      style={!item.enabled && styles.disabledText}
                    >
                      {item.name}
                    </ThemedText>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '75%',
    maxWidth: 300,
    paddingTop: Spacing.four,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'rgba(150, 150, 150, 0.2)',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  drawerTitle: {
    fontSize: 18,
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: Spacing.one,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuList: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    gap: Spacing.one,
  },
  menuItem: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(150, 150, 150, 0.15)',
  },
  disabledMenuItem: {
    opacity: 0.4,
  },
  disabledText: {},
});