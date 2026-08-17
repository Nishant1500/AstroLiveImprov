import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/themed-view'; // Adjust import path as needed

interface ServiceCardProps {
  title: string;
  icon: string;
  bgColor: string;
  accentColor: string;
  onPress?: () => void;
}

export default function AstrologicalServicesScreen() {
  const services = [
    {
      title: "Daily Horoscope",
      icon: "✨",
      bgColor: "#4f46e5", // Indigo
      accentColor: "#6366f1",
    },
    {
      title: "Today's Panchang",
      icon: "🕉️",
      bgColor: "#7c3aed", // Purple
      accentColor: "#8b5cf6",
    },
    {
      title: "Kundli’s Match",
      icon: "💑",
      bgColor: "#db2777", // Pink/Rose
      accentColor: "#ec4899",
    },
    {
      title: "Free Kundli",
      icon: "📜",
      bgColor: "#0284c7", // Sky Blue
      accentColor: "#0ea5e9",
    },
    {
      title: "Love Calculator",
      icon: "💖",
      bgColor: "#e11d48", // Red
      accentColor: "#f43f5e",
    },
    {
      title: "Wallet",
      icon: "💰",
      bgColor: "#059669", // Emerald Green
      accentColor: "#10b981",
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.rowContainer}>
          {services.map((service, index) => (
            <TouchableOpacity 
              key={index} 
              activeOpacity={0.85}
              style={[styles.card, { backgroundColor: service.bgColor }]}
              onPress={() => console.log(`Clicked on ${service.title}`)}
            >
              {/* Decorative background glow circle */}
              <View style={[styles.glowCircle, { backgroundColor: service.accentColor }]} />

              <View style={styles.cardContent}>
                <Text style={styles.icon}>{service.icon}</Text>
                <Text style={styles.cardTitle}>{service.title}</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.actionText}>Explore →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 14,
  },
  card: {
    width: 150,
    height: 160,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  glowCircle: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.4,
  },
  cardContent: {
    zIndex: 1,
  },
  icon: {
    fontSize: 28,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 20,
  },
  cardFooter: {
    zIndex: 1,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },
});