import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from "react-native";

import {
  Astrologer,
  fetchAstrologersAPI,
  getLocalizedName,
} from "@/api/astrologers";
import AnimatedPageContainer from "@/components/animated-page-container";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Cards Shuffling Loading Screen Component
function CardShuffleLoadingScreen() {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const shuffleSequence = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(anim1, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim1, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim2, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim2, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim3, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim3, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    const pulseSequence = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    shuffleSequence.start();
    pulseSequence.start();

    return () => {
      shuffleSequence.stop();
      pulseSequence.stop();
    };
  }, [anim1, anim2, anim3, pulseAnim]);

  const card1TranslateX = anim1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 65, 0],
  });
  const card1TranslateY = anim1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -14, 0],
  });
  const card1Rotate = anim1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["-12deg", "4deg", "-12deg"],
  });
  const card1Scale = anim1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.05, 1],
  });
  const card1ZIndex = anim1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 3, 1],
  });

  const card2TranslateX = anim2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -45, 0],
  });
  const card2TranslateY = anim2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 10, 0],
  });
  const card2Rotate = anim2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "-8deg", "0deg"],
  });
  const card2Scale = anim2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1.02, 0.96, 1.02],
  });
  const card2ZIndex = anim2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [2, 1, 2],
  });

  const card3TranslateX = anim3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -65, 0],
  });
  const card3TranslateY = anim3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 16, 0],
  });
  const card3Rotate = anim3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["12deg", "-6deg", "12deg"],
  });
  const card3Scale = anim3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.98, 1.03, 0.98],
  });
  const card3ZIndex = anim3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [3, 2, 3],
  });

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.backgroundGlowRing} />
      <View style={styles.deckContainer}>
        <Animated.View
          style={[
            styles.card,
            styles.cardRight,
            {
              zIndex: card3ZIndex,
              transform: [
                { translateX: card3TranslateX },
                { translateY: card3TranslateY },
                { rotate: card3Rotate },
                { scale: card3Scale },
              ],
            },
          ]}
        >
          <View style={styles.cardInnerPattern}>
            <ThemedText style={styles.cardSymbol}>🪐</ThemedText>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardCenter,
            {
              zIndex: card2ZIndex,
              transform: [
                { translateX: card2TranslateX },
                { translateY: card2TranslateY },
                { rotate: card2Rotate },
                { scale: card2Scale },
              ],
            },
          ]}
        >
          <View style={styles.cardInnerPattern}>
            <ThemedText style={styles.cardSymbol}>✨</ThemedText>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardLeft,
            {
              zIndex: card1ZIndex,
              transform: [
                { translateX: card1TranslateX },
                { translateY: card1TranslateY },
                { rotate: card1Rotate },
                { scale: card1Scale },
              ],
            },
          ]}
        >
          <View style={styles.cardInnerPattern}>
            <ThemedText style={styles.cardSymbol}>🔮</ThemedText>
          </View>
        </Animated.View>
      </View>

      <Animated.View
        style={[styles.statusContainer, { transform: [{ scale: pulseAnim }] }]}
      >
        <ThemedText type="defaultSemiBold" style={styles.loadingTitle}>
          Aligning the Cosmos...
        </ThemedText>
        <ThemedText
          type="small"
          themeColor="textSecondary"
          style={styles.loadingSubtitle}
        >
          Shuffling the celestial deck for your readings ✨
        </ThemedText>
      </Animated.View>
    </View>
  );
}

function renderCommunicationPreference(comm?: string) {
  if (!comm) return null;
  const lower = comm.toLowerCase();
  const isBoth =
    (lower.includes("chat") || lower.includes("text")) &&
    (lower.includes("call") || lower.includes("voice"));

  if (isBoth) {
    return (
      <View style={styles.commBadge}>
        <ThemedText type="small" style={styles.commBadgeText}>
          💬📞 Text & Call
        </ThemedText>
      </View>
    );
  }

  return (
    <ThemedText type="small" themeColor="textSecondary">
      💬 {comm}
    </ThemedText>
  );
}

function AstrologerAvatar({
  uri,
  name,
  isLarge = false,
  isOnline = false,
}: {
  uri?: string;
  name: string;
  isLarge?: boolean;
  isOnline?: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const firstChar = name ? name.trim().charAt(0).toUpperCase() : "A";

  return (
    <View
      style={isLarge ? styles.avatarLargeContainer : styles.avatarContainer}
    >
      {!uri || imageError ? (
        <View
          style={isLarge ? styles.avatarLargeFallback : styles.avatarFallback}
        >
          <ThemedText
            style={
              isLarge
                ? styles.avatarLargeFallbackText
                : styles.avatarFallbackText
            }
          >
            {firstChar}
          </ThemedText>
        </View>
      ) : (
        <Image
          source={{ uri }}
          style={isLarge ? styles.avatarLargeImage : styles.avatarImage}
          onError={() => setImageError(true)}
        />
      )}
      {isOnline &&
        (isLarge ? (
          <View style={styles.onlineBadge} />
        ) : (
          <View style={styles.onlineBadgeSmall} />
        ))}
    </View>
  );
}

function GenreCardItem({
  item,
  isActive,
  onPress,
}: {
  item: { label: string; icon: string };
  isActive: boolean;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={[styles.bigGenreCard, isActive && styles.activeBigGenreCard]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <View style={styles.genreIconContainer}>
          <ThemedText style={styles.genreCardEmoji}>{item.icon}</ThemedText>
        </View>
        <ThemedText
          type="smallBold"
          themeColor={isActive ? "text" : "textSecondary"}
          style={styles.genreCardText}
        >
          {item.label}
        </ThemedText>
        {isActive && <View style={styles.genreActiveGlowIndicator} />}
      </Pressable>
    </Animated.View>
  );
}

export default function AstrologerProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    language?: string;
    budget?: string;
    experience?: string;
    genre?: string;
    priceSort?: string;
    priceOrder?: string;
    ratingOrder?: string;
    langCountFilter?: string;
    communication?: string;
  }>();

  const { id } = params;

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    params.language || "All",
  );
  const [selectedBudget, setSelectedBudget] = useState<string>(
    params.budget || "All",
  );
  const [selectedExperience, setSelectedExperience] = useState<string>(
    params.experience || "All",
  );
  const [selectedGenre, setSelectedGenre] = useState<string>(
    params.genre || "All",
  );
  const [priceSort, setPriceSort] = useState<string>(
    params.priceSort || "Default",
  );
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | "none">(
    (params.priceOrder as any) || "none",
  );
  const [ratingOrder, setRatingOrder] = useState<"desc" | "asc" | "none">(
    (params.ratingOrder as any) || "none",
  );
  const [langCountFilter, setLangCountFilter] = useState<string>(
    params.langCountFilter || "All",
  );
  const [selectedCommunication, setSelectedCommunication] = useState<string>(
    params.communication || "all",
  );

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showPriceSortDropdown, setShowPriceSortDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [currentAstrologer, setCurrentAstrologer] = useState<Astrologer | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  // Sync URL query params with state when they change
  useEffect(() => {
    if (params.language && params.language !== selectedLanguage)
      setSelectedLanguage(String(params.language));
    if (params.budget && params.budget !== selectedBudget)
      setSelectedBudget(String(params.budget));
    if (params.experience && params.experience !== selectedExperience)
      setSelectedExperience(String(params.experience));
    if (params.genre && params.genre !== selectedGenre)
      setSelectedGenre(String(params.genre));
    if (params.priceSort && params.priceSort !== priceSort)
      setPriceSort(String(params.priceSort));
    if (params.priceOrder && params.priceOrder !== priceOrder)
      setPriceOrder(String(params.priceOrder) as any);
    if (params.ratingOrder && params.ratingOrder !== ratingOrder)
      setRatingOrder(String(params.ratingOrder) as any);
    if (params.langCountFilter && params.langCountFilter !== langCountFilter)
      setLangCountFilter(String(params.langCountFilter));
    if (params.communication && params.communication !== selectedCommunication)
      setSelectedCommunication(String(params.communication));
  }, [params]);

  const languageOptions = ["All", "English", "Tamil", "Hindi", "Telugu"];
  const budgetOptions = [
    "All",
    "Budget-Friendly",
    "Moderate",
    "Premium Specialist",
  ];
  const langCountOptions = [
    "All",
    "1 Language",
    "2+ Languages",
    "3+ Languages",
  ];
  const communicationOptions = ["all", "chat", "call", "chatNcall"];
  const communicationLabels: { [key: string]: string } = {
    all: "All Types",
    chat: "Chat Only",
    call: "Call Only",
    chatNcall: "Chat & Call",
  };

  // Helper function to update URL with current filter values
  const updateUrlWithFilters = (
    overrides: Partial<{
      language: string;
      budget: string;
      experience: string;
      genre: string;
      priceSort: string;
      priceOrder: string;
      ratingOrder: string;
      langCountFilter: string;
      communication: string;
    }> = {},
  ) => {
    const newParams = {
      language:
        overrides.language !== undefined
          ? overrides.language
          : selectedLanguage,
      budget:
        overrides.budget !== undefined ? overrides.budget : selectedBudget,
      experience:
        overrides.experience !== undefined
          ? overrides.experience
          : selectedExperience,
      genre: overrides.genre !== undefined ? overrides.genre : selectedGenre,
      priceSort:
        overrides.priceSort !== undefined ? overrides.priceSort : priceSort,
      priceOrder:
        overrides.priceOrder !== undefined ? overrides.priceOrder : priceOrder,
      ratingOrder:
        overrides.ratingOrder !== undefined
          ? overrides.ratingOrder
          : ratingOrder,
      langCountFilter:
        overrides.langCountFilter !== undefined
          ? overrides.langCountFilter
          : langCountFilter,
      communication:
        overrides.communication !== undefined
          ? overrides.communication
          : selectedCommunication,
    };

    // Remove "All" defaults from URL to keep it clean
    const cleanParams = Object.fromEntries(
      Object.entries(newParams).filter(([key, value]) => {
        if (key === "priceSort" && value === "Default") return false;
        if (
          (key === "language" ||
            key === "budget" ||
            key === "genre" ||
            key === "langCountFilter" ||
            key === "experience") &&
          value === "All"
        )
          return false;
        if (key === "communication" && value === "all") return false;
        if ((key === "priceOrder" || key === "ratingOrder") && value === "none")
          return false;
        return true;
      }),
    );

    router.setParams(cleanParams);
  };

  const genreOptionsWithIcons: { label: string; icon: string }[] = [
    { label: "All", icon: "✨" },
    { label: "Vedic", icon: "🌌" },
    { label: "Tarot", icon: "🃏" },
    { label: "Numerology", icon: "🔢" },
    { label: "Vastu", icon: "🏛️" },
    { label: "KP", icon: "🪐" },
    { label: "Lal Kitab", icon: "📖" },
    { label: "Nadi", icon: "📜" },
    { label: "Palmistry", icon: "✋" },
    { label: "Face Reading", icon: "👤" },
    { label: "Prashana", icon: "⏱️" },
    { label: "Psychic", icon: "🔮" },
    { label: "Reiki", icon: "⚡" },
  ];

  useEffect(() => {
    loadData();
  }, [
    id,
    selectedLanguage,
    selectedBudget,
    selectedExperience,
    selectedGenre,
    priceSort,
    priceOrder,
    ratingOrder,
    langCountFilter,
    selectedCommunication,
  ]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const apiFilters: any = {};
      if (selectedLanguage !== "All") apiFilters.language = selectedLanguage;
      if (selectedBudget !== "All") apiFilters.budget = selectedBudget;
      if (selectedExperience !== "All")
        apiFilters.experience = selectedExperience;
      if (selectedGenre !== "All") apiFilters.genre = selectedGenre;

      let results = await fetchAstrologersAPI(apiFilters);
      let list = results || [];

      // Filter by communication type
      if (selectedCommunication !== "all") {
        list = list.filter(
          (item) => item.communication === selectedCommunication,
        );
      }

      if (langCountFilter !== "All") {
        list = list.filter((item) => {
          const count = item.languages?.length || 1;
          if (langCountFilter === "1 Language") return count === 1;
          if (langCountFilter === "2+ Languages") return count >= 2;
          if (langCountFilter === "3+ Languages") return count >= 3;
          return true;
        });
      }

      const effectivePriceSort =
        priceOrder !== "none"
          ? priceOrder === "asc"
            ? "Low to High"
            : "High to Low"
          : priceSort;

      if (ratingOrder !== "none") {
        list = [...list].sort((a, b) => {
          const ratingA = parseFloat(String(a.rating || "4.9"));
          const ratingB = parseFloat(String(b.rating || "4.9"));
          return ratingOrder === "desc" ? ratingB - ratingA : ratingA - ratingB;
        });
      } else if (effectivePriceSort !== "Default") {
        list = [...list].sort((a, b) => {
          const priceA = a.price || 50;
          const priceB = b.price || 50;
          return effectivePriceSort === "Low to High"
            ? priceA - priceB
            : priceB - priceA;
        });
      }

      setAstrologers(list);

      if (id) {
        const found = list.find((item) => String(item.id) === String(id));
        setCurrentAstrologer(found || list[0] || null);
      } else {
        setCurrentAstrologer(null);
      }
    } catch (error) {
      console.error("Failed to load astrologers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleLanguage = () => {
    LayoutAnimation.configureNext({
      duration: 250,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: { type: LayoutAnimation.Types.spring, springDamping: 0.7 },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    setShowLanguageDropdown(!showLanguageDropdown);
    setShowPriceSortDropdown(false);
    setShowSortDropdown(false);
  };

  const handleToggleSortDropdown = () => {
    LayoutAnimation.configureNext({
      duration: 250,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: { type: LayoutAnimation.Types.spring, springDamping: 0.7 },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    setShowSortDropdown(!showSortDropdown);
    setShowLanguageDropdown(false);
    setShowPriceSortDropdown(false);
  };

  const handleSelectGenre = (genreLabel: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setSelectedGenre(genreLabel);
    updateUrlWithFilters({ genre: genreLabel });
  };

  const handleTogglePriceOrder = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setRatingOrder("none");
    let newPriceOrder: "asc" | "desc" | "none" = "none";
    let newPriceSort = "Default";

    if (priceOrder === "none") {
      newPriceOrder = "asc";
      newPriceSort = "Low to High";
    } else if (priceOrder === "asc") {
      newPriceOrder = "desc";
      newPriceSort = "High to Low";
    }

    setPriceOrder(newPriceOrder);
    setPriceSort(newPriceSort);
    updateUrlWithFilters({
      priceOrder: newPriceOrder,
      priceSort: newPriceSort,
      ratingOrder: "none",
    });
  };

  const handleToggleRatingOrder = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setPriceOrder("none");
    setPriceSort("Default");

    let newRatingOrder: "desc" | "asc" | "none" = "none";
    if (ratingOrder === "none") {
      newRatingOrder = "desc";
    } else if (ratingOrder === "desc") {
      newRatingOrder = "asc";
    }

    setRatingOrder(newRatingOrder);
    updateUrlWithFilters({
      ratingOrder: newRatingOrder,
      priceOrder: "none",
      priceSort: "Default",
    });
  };

  const handleStartConsultation = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      alert(
        `Connecting securely with ${currentAstrologer?.name?.en || "your guide"}... ✨`,
      );
    }, 1500);
  };

  if (isLoading) {
    return <CardShuffleLoadingScreen />;
  }

  if (id && currentAstrologer) {
    const displayName = getLocalizedName(
      currentAstrologer,
      currentAstrologer.languages?.[0] || "English",
    );

    return (
      <AnimatedPageContainer style={{ flex: 1 }} animationType="fadeInDown">
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedView type="backgroundElement" style={styles.profileHeaderCard}>
            <AstrologerAvatar
              uri={currentAstrologer.avatar}
              name={displayName}
              isLarge={true}
              isOnline={currentAstrologer.isOnline}
            />

            <View style={styles.headerInfo}>
              <View style={styles.titleRow}>
                <ThemedText type="defaultSemiBold" style={styles.name}>
                  {displayName}
                </ThemedText>
                {currentAstrologer.genre && (
                  <View style={styles.genreBadgeLarge}>
                    <ThemedText type="small" style={styles.genreBadgeText}>
                      {currentAstrologer.genre}
                    </ThemedText>
                  </View>
                )}
              </View>

              <ThemedText type="small" themeColor="textSecondary">
                {currentAstrologer.experience || "Vedic Specialist"} • ⭐{" "}
                {currentAstrologer.rating || "4.9"} • 💵 ₹
                {currentAstrologer.price || 50}/min
              </ThemedText>
              <View style={{ marginTop: 4 }}>
                {renderCommunicationPreference(currentAstrologer.communication)}
              </View>
              <ThemedText
                type="small"
                themeColor="textSecondary"
                style={{ marginTop: 2 }}
              >
                🗣️ {currentAstrologer.languages?.join(", ") || "English"}
              </ThemedText>
            </View>
          </ThemedView>

          <ThemedView type="backgroundSelected" style={styles.sectionCard}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              ✨ About the Guide
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={styles.bioText}
            >
              {currentAstrologer.bio ||
                `Master practitioner specializing in ${currentAstrologer.genre || "Vedic Astrology"} with a deep understanding of planetary alignments, natal charts, and spiritual life coaching to guide your path.`}
            </ThemedText>
          </ThemedView>

          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              pressed && styles.pressed,
              isConnecting && styles.disabledBtn,
            ]}
            onPress={handleStartConsultation}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <ThemedText type="smallBold" style={styles.actionBtnText}>
                🔮 Start Live Consultation (₹{currentAstrologer.price || 50}
                /min)
              </ThemedText>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
            onPress={() => router.back()}
          >
            <ThemedText type="small" themeColor="textSecondary">
              ← Back to Directory
            </ThemedText>
          </Pressable>
        </ScrollView>
      </AnimatedPageContainer>
    );
  }

  const getActiveSortSummary = () => {
    if (ratingOrder === "desc") return "Sort: Highest Rated";
    if (ratingOrder === "asc") return "Sort: Lowest Rated";
    if (priceOrder === "asc") return "Sort: Price (Low-High)";
    if (priceOrder === "desc") return "Sort: Price (High-Low)";
    return "Sort & Filters ⚡";
  };

  return (
    <AnimatedPageContainer style={{ flex: 1 }} animationType="fadeInDown">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.introHeader}>
          <ThemedText type="defaultSemiBold" style={styles.introTitle}>
            ✨ Cosmic Guides Directory
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Explore vetted Vedic scholars, tarot readers, and esoteric experts.
          </ThemedText>
        </View>

        <ThemedView type="backgroundSelected" style={styles.filterCard}>
          <ThemedText type="defaultSemiBold" style={styles.filterCardTitle}>
            🎛️ Filter & Sort Options
          </ThemedText>

          <View style={styles.dropdownButtonsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.bigDropdownButton,
                pressed && styles.pressed,
                showLanguageDropdown && styles.activeDropdownButton,
              ]}
              onPress={handleToggleLanguage}
            >
              <ThemedText type="smallBold">
                🌐 Language: {selectedLanguage}
              </ThemedText>
              <ThemedText type="small">
                {showLanguageDropdown ? "▲" : "▼"}
              </ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.bigDropdownButton,
                pressed && styles.pressed,
                (showSortDropdown ||
                  ratingOrder !== "none" ||
                  priceOrder !== "none") &&
                  styles.activeDropdownButton,
              ]}
              onPress={handleToggleSortDropdown}
            >
              <ThemedText type="smallBold" numberOfLines={1}>
                📊 {getActiveSortSummary()}
              </ThemedText>
              <ThemedText type="small">
                {showSortDropdown ? "▲" : "▼"}
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.quickSortChipsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.quickSortChip,
                priceOrder !== "none" && styles.activeQuickSortChip,
                pressed && styles.pressed,
              ]}
              onPress={handleTogglePriceOrder}
            >
              <ThemedText
                type="smallBold"
                themeColor={priceOrder !== "none" ? "text" : "textSecondary"}
              >
                {priceOrder === "asc"
                  ? "💵 Price: Low-High"
                  : priceOrder === "desc"
                    ? "💵 Price: High-Low"
                    : "💵 Sort by Price"}
              </ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.quickSortChip,
                ratingOrder !== "none" && styles.activeQuickSortChip,
                pressed && styles.pressed,
              ]}
              onPress={handleToggleRatingOrder}
            >
              <ThemedText
                type="smallBold"
                themeColor={ratingOrder !== "none" ? "text" : "textSecondary"}
              >
                {ratingOrder === "desc"
                  ? "⭐ Rating: High-Low"
                  : ratingOrder === "asc"
                    ? "⭐ Rating: Low-High"
                    : "⭐ Sort by Rating"}
              </ThemedText>
            </Pressable>
          </View>

          {showLanguageDropdown && (
            <View style={styles.dropdownListContainer}>
              <ThemedText type="smallBold" style={styles.dropdownListTitle}>
                Select Language Preference:
              </ThemedText>
              <View style={styles.dropdownGrid}>
                {languageOptions.map((lang) => (
                  <Pressable
                    key={lang}
                    style={[
                      styles.dropdownOptionItem,
                      selectedLanguage === lang && styles.activeDropdownItem,
                    ]}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.spring,
                      );
                      setSelectedLanguage(lang);
                      updateUrlWithFilters({ language: lang });
                      setShowLanguageDropdown(false);
                    }}
                  >
                    <ThemedText
                      type="small"
                      themeColor={
                        selectedLanguage === lang ? "text" : "textSecondary"
                      }
                    >
                      {lang === "All" ? "🌍 All Languages" : `🗣️ ${lang}`}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {showSortDropdown && (
            <View style={styles.dropdownListContainer}>
              <ThemedText type="smallBold" style={styles.dropdownListTitle}>
                Select Sorting Rule:
              </ThemedText>
              <View style={styles.dropdownGrid}>
                <Pressable
                  style={[
                    styles.dropdownOptionItem,
                    ratingOrder === "desc" && styles.activeDropdownItem,
                  ]}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setRatingOrder("desc");
                    setPriceOrder("none");
                    setPriceSort("Default");
                    updateUrlWithFilters({
                      ratingOrder: "desc",
                      priceOrder: "none",
                      priceSort: "Default",
                    });
                    setShowSortDropdown(false);
                  }}
                >
                  <ThemedText
                    type="small"
                    themeColor={
                      ratingOrder === "desc" ? "text" : "textSecondary"
                    }
                  >
                    ⭐ Highest Rating First
                  </ThemedText>
                </Pressable>

                <Pressable
                  style={[
                    styles.dropdownOptionItem,
                    ratingOrder === "asc" && styles.activeDropdownItem,
                  ]}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setRatingOrder("asc");
                    setPriceOrder("none");
                    setPriceSort("Default");
                    updateUrlWithFilters({
                      ratingOrder: "asc",
                      priceOrder: "none",
                      priceSort: "Default",
                    });
                    setShowSortDropdown(false);
                  }}
                >
                  <ThemedText
                    type="small"
                    themeColor={
                      ratingOrder === "asc" ? "text" : "textSecondary"
                    }
                  >
                    ⭐ Lowest Rating First
                  </ThemedText>
                </Pressable>

                <Pressable
                  style={[
                    styles.dropdownOptionItem,
                    priceOrder === "asc" && styles.activeDropdownItem,
                  ]}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setPriceOrder("asc");
                    setPriceSort("Low to High");
                    setRatingOrder("none");
                    updateUrlWithFilters({
                      priceOrder: "asc",
                      priceSort: "Low to High",
                      ratingOrder: "none",
                    });
                    setShowSortDropdown(false);
                  }}
                >
                  <ThemedText
                    type="small"
                    themeColor={priceOrder === "asc" ? "text" : "textSecondary"}
                  >
                    📉 Price: Low to High
                  </ThemedText>
                </Pressable>

                <Pressable
                  style={[
                    styles.dropdownOptionItem,
                    priceOrder === "desc" && styles.activeDropdownItem,
                  ]}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring,
                    );
                    setPriceOrder("desc");
                    setPriceSort("High to Low");
                    setRatingOrder("none");
                    updateUrlWithFilters({
                      priceOrder: "desc",
                      priceSort: "High to Low",
                      ratingOrder: "none",
                    });
                    setShowSortDropdown(false);
                  }}
                >
                  <ThemedText
                    type="small"
                    themeColor={
                      priceOrder === "desc" ? "text" : "textSecondary"
                    }
                  >
                    📈 Price: High to Low
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          )}

          <ThemedText
            type="defaultSemiBold"
            style={[styles.filterLabel, { marginTop: Spacing.two }]}
          >
            🗣️ Number of Languages Known
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipRow}
          >
            {langCountOptions.map((opt) => (
              <Pressable
                key={opt}
                style={[
                  styles.filterChip,
                  langCountFilter === opt && styles.activeChip,
                ]}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                  setLangCountFilter(opt);
                  updateUrlWithFilters({ langCountFilter: opt });
                }}
              >
                <ThemedText
                  type="small"
                  themeColor={
                    langCountFilter === opt ? "text" : "textSecondary"
                  }
                >
                  {opt}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>

          <ThemedText
            type="defaultSemiBold"
            style={[styles.filterLabel, { marginTop: Spacing.three }]}
          >
            ✨ Specialization / Genre
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipRow}
          >
            {genreOptionsWithIcons.map((item) => (
              <GenreCardItem
                key={item.label}
                item={item}
                isActive={selectedGenre === item.label}
                onPress={() => handleSelectGenre(item.label)}
              />
            ))}
          </ScrollView>

          <ThemedText
            type="defaultSemiBold"
            style={[styles.filterLabel, { marginTop: Spacing.three }]}
          >
            💰 Budget Tier
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipRow}
          >
            {budgetOptions.map((bgt) => (
              <Pressable
                key={bgt}
                style={[
                  styles.filterChip,
                  selectedBudget === bgt && styles.activeChip,
                ]}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                  setSelectedBudget(bgt);
                  updateUrlWithFilters({ budget: bgt });
                }}
              >
                <ThemedText
                  type="small"
                  themeColor={selectedBudget === bgt ? "text" : "textSecondary"}
                >
                  {bgt}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>

          <ThemedText
            type="defaultSemiBold"
            style={[styles.filterLabel, { marginTop: Spacing.three }]}
          >
            📞 Communication Type
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipRow}
          >
            {communicationOptions.map((comm) => (
              <Pressable
                key={comm}
                style={[
                  styles.filterChip,
                  selectedCommunication === comm && styles.activeChip,
                ]}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                  setSelectedCommunication(comm);
                  updateUrlWithFilters({ communication: comm });
                }}
              >
                <ThemedText
                  type="small"
                  themeColor={
                    selectedCommunication === comm ? "text" : "textSecondary"
                  }
                >
                  📞 {communicationLabels[comm]}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        </ThemedView>

        <View style={styles.astrologerList}>
          <View style={styles.resultsHeader}>
            <ThemedText type="defaultSemiBold">
              Available Guides ({astrologers.length})
            </ThemedText>
          </View>

          {astrologers.length === 0 ? (
            <ThemedView type="backgroundElement" style={styles.emptyCard}>
              <ThemedText
                type="defaultSemiBold"
                style={{ textAlign: "center" }}
              >
                No Guides Found
              </ThemedText>
              <ThemedText
                type="small"
                themeColor="textSecondary"
                style={{ textAlign: "center", marginTop: Spacing.one }}
              >
                No astrologers match your current filters. Try resetting your
                criteria.
              </ThemedText>
            </ThemedView>
          ) : (
            astrologers.map((astrologer, index) => {
              const displayName = getLocalizedName(
                astrologer,
                selectedLanguage,
              );

              return (
                <ThemedView
                  key={astrologer.id || index}
                  type="backgroundElement"
                  style={styles.astrologerCard}
                >
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.astrologerInfo}>
                      <AstrologerAvatar
                        uri={astrologer.avatar}
                        name={displayName}
                        isLarge={false}
                        isOnline={astrologer.isOnline}
                      />

                      <View style={styles.astrologerDetails}>
                        <View style={styles.nameAndGenre}>
                          <ThemedText
                            type="defaultSemiBold"
                            style={{ flex: 1 }}
                            numberOfLines={1}
                          >
                            {displayName}
                          </ThemedText>
                          {astrologer.genre && (
                            <View style={styles.genreBadge}>
                              <ThemedText
                                type="small"
                                style={styles.genreBadgeText}
                              >
                                {astrologer.genre}
                              </ThemedText>
                            </View>
                          )}
                        </View>

                        <ThemedText type="small" themeColor="textSecondary">
                          ⭐ {astrologer.rating || "4.9"} • 💵 ₹
                          {astrologer.price || 50}/min
                        </ThemedText>
                        <View style={{ marginTop: 2 }}>
                          {renderCommunicationPreference(
                            astrologer.communication,
                          )}
                        </View>
                        <ThemedText
                          type="small"
                          themeColor="textSecondary"
                          numberOfLines={1}
                          style={{ marginTop: 2 }}
                        >
                          🗣️ {astrologer.languages?.join(", ")}
                        </ThemedText>
                      </View>
                    </View>
                  </View>

                  <View style={styles.cardDivider} />

                  <View style={styles.cardFooterRow}>
                    <ThemedText
                      type="small"
                      themeColor="textSecondary"
                      numberOfLines={1}
                      style={{ flex: 1 }}
                    >
                      {astrologer.experience}
                    </ThemedText>

                    <Pressable
                      style={({ pressed }) => [
                        styles.connectBtn,
                        pressed && styles.pressed,
                      ]}
                      onPress={() => {
                        router.push({
                          pathname: "/astrologer-profile",
                          params: {
                            id: astrologer.id,
                            language: selectedLanguage,
                            budget: selectedBudget,
                            genre: selectedGenre,
                            priceSort: priceSort,
                            priceOrder: priceOrder,
                            ratingOrder: ratingOrder,
                            langCountFilter: langCountFilter,
                            communication: selectedCommunication,
                          },
                        });
                      }}
                    >
                      <ThemedText type="smallBold" style={{ color: "#571616" }}>
                        View Profile →
                      </ThemedText>
                    </Pressable>
                  </View>
                </ThemedView>
              );
            })
          )}
        </View>
      </ScrollView>
    </AnimatedPageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    padding: Spacing.two,
    gap: Spacing.three,
    paddingBottom: Spacing.four,
    backgroundColor: "#fcfaf8",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fcfaf8",
    padding: Spacing.four,
    position: "relative",
    overflow: "hidden",
  },
  backgroundGlowRing: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.15)",
  },
  deckContainer: {
    width: 140,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.four,
  },
  card: {
    position: "absolute",
    width: 86,
    height: 130,
    borderRadius: Spacing.two,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "rgba(239, 68, 68, 0.35)",
    padding: 6,
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  cardLeft: {
    transform: [{ rotate: "-12deg" }, { translateX: -22 }],
  },
  cardCenter: {
    transform: [{ rotate: "0deg" }],
  },
  cardRight: {
    transform: [{ rotate: "12deg" }, { translateX: 22 }],
  },
  cardInnerPattern: {
    flex: 1,
    borderRadius: Spacing.one,
    backgroundColor: "rgba(239, 68, 68, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardSymbol: {
    fontSize: 28,
  },
  statusContainer: {
    alignItems: "center",
    gap: 6,
    marginTop: Spacing.two,
  },
  loadingTitle: {
    fontSize: 18,
    color: "#571616",
    letterSpacing: 0.3,
  },
  loadingSubtitle: {
    textAlign: "center",
  },
  introHeader: {
    paddingHorizontal: Spacing.one,
    gap: 4,
  },
  introTitle: {
    fontSize: 22,
    color: "#571616",
  },
  filterCard: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    backgroundColor: "rgba(239, 68, 68, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    gap: Spacing.one,
  },
  filterCardTitle: {
    fontSize: 15,
    marginBottom: Spacing.one,
    color: "#571616",
  },
  dropdownButtonsRow: {
    flexDirection: "row",
    gap: Spacing.two,
    marginBottom: Spacing.one,
  },
  bigDropdownButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    backgroundColor: "rgba(239, 68, 68, 0.08)",
  },
  activeDropdownButton: {
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  quickSortChipsRow: {
    flexDirection: "row",
    gap: Spacing.two,
    marginBottom: Spacing.one,
  },
  quickSortChip: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.one * 1.2,
    paddingHorizontal: Spacing.one,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  activeQuickSortChip: {
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  dropdownListContainer: {
    marginTop: Spacing.one,
    padding: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    gap: Spacing.one,
  },
  dropdownListTitle: {
    marginBottom: 4,
  },
  dropdownGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.one,
  },
  dropdownOptionItem: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.one * 1.5,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    backgroundColor: "rgba(239, 68, 68, 0.05)",
  },
  activeDropdownItem: {
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  filterLabel: {
    marginBottom: Spacing.one,
    fontSize: 14,
    color: "#571616",
  },
  chipRow: {
    flexDirection: "row",
  },
  bigGenreCard: {
    width: 96,
    height: 96,
    borderRadius: Spacing.three,
    borderWidth: 1.5,
    borderColor: "rgba(239, 68, 68, 0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.two,
    padding: Spacing.one,
    gap: 6,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  activeBigGenreCard: {
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.18)",
    borderWidth: 2,
    shadowColor: "#ef4444",
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  genreIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  genreCardEmoji: {
    fontSize: 18,
  },
  genreCardText: {
    fontSize: 12,
    textAlign: "center",
  },
  genreActiveGlowIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#ef4444",
  },
  filterChip: {
    paddingVertical: Spacing.one * 1.2,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    marginRight: Spacing.one,
  },
  activeChip: {
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  astrologerList: {
    gap: Spacing.two,
  },
  resultsHeader: {
    paddingHorizontal: Spacing.one,
    marginBottom: 4,
  },
  emptyCard: {
    padding: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  astrologerCard: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    gap: Spacing.two,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  astrologerInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.two,
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  avatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarFallbackText: {
    color: "#b91c1c",
    fontSize: 22,
    fontWeight: "700",
  },
  onlineBadgeSmall: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#fcfaf8",
  },
  avatarLargeContainer: {
    position: "relative",
  },
  avatarLargeImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  avatarLargeFallback: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLargeFallbackText: {
    color: "#b91c1c",
    fontSize: 32,
    fontWeight: "700",
  },
  onlineBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#fcfaf8",
  },
  astrologerDetails: {
    flex: 1,
    gap: 2,
  },
  nameAndGenre: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one,
  },
  genreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  genreBadgeLarge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.35)",
  },
  genreBadgeText: {
    color: "#b91c1c",
    fontSize: 11,
    fontWeight: "600",
  },
  commBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: "rgba(244, 63, 94, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(244, 63, 94, 0.25)",
  },
  commBadgeText: {
    color: "#e11d48",
    fontSize: 11,
    fontWeight: "600",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    width: "100%",
  },
  cardFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  connectBtn: {
    paddingVertical: Spacing.one * 1.2,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: "#fca5a5",
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  profileHeaderCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.four,
    borderRadius: Spacing.three,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    gap: Spacing.three,
  },
  headerInfo: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: "column",
    gap: 4,
  },
  name: {
    fontSize: 20,
    color: "#571616",
  },
  sectionCard: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  sectionTitle: {
    marginBottom: Spacing.two,
    color: "#571616",
  },
  bioText: {
    lineHeight: 24,
  },
  actionBtn: {
    width: "100%",
    padding: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 15,
  },
  backBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.one,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
