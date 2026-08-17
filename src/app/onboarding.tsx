import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  Astrologer,
  fetchAstrologersAPI,
  getLocalizedName,
} from "@/api/astrologers";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";

const formSteps = [
  {
    id: 1,
    field: "language",
    question: "What are your preferred languages? (Select multiple)",
    type: "multiselect",
    options: [
      "English / English",
      "Tamil / தமிழ்",
      "Hindi / हिन्दी",
      "Telugu / తెలుగు",
      "Malayalam / മലയാളം",
      "Kannada / ಕನ್ನಡ",
      "Bengali / বাংলা",
      "Marathi / मराठी",
    ],
  },
  {
    id: 2,
    field: "budget",
    question: "What is your cost preference for an astrologer?",
    type: "options",
    options: ["Budget-Friendly", "Moderate", "Premium Specialist"],
  },
  {
    id: 3,
    field: "communication",
    question: "Do you want to chat, text, or both?",
    type: "options",
    options: [
      "Text Only (Messaging & Notes)",
      "Chat / Voice Calls Only",
      "Both Text and Voice/Video Chat",
    ],
  },
  {
    id: 4,
    field: "experience",
    question:
      "How many years of astrological experience do you expect your guide to have?",
    type: "options",
    options: [
      "1 to 3 years (Emerging Guide)",
      "3 to 6 years (Seasoned Practitioner)",
      "6 to 10 years (Expert Astrologer)",
      "10+ years (Master Vedic Scholar)",
    ],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    language: [] as string[],
    budget: "",
    communication: "",
    experience: "",
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [matchedAstrologers, setMatchedAstrologers] = useState<Astrologer[]>([]);
  const [fallbackAstrologers, setFallbackAstrologers] = useState<Astrologer[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const currentStep = formSteps[currentIndex];

  const handleLanguageToggle = (option: string) => {
    if (selectedLanguages.includes(option)) {
      setSelectedLanguages(selectedLanguages.filter((item) => item !== option));
    } else {
      setSelectedLanguages([...selectedLanguages, option]);
    }
  };

  const handleNext = () => {
    const updatedData = { ...formData };
    if (currentStep.type === "multiselect") {
      if (selectedLanguages.length === 0) return;
      updatedData.language = selectedLanguages;
    } else {
      if (selectedOption === null) return;
      updatedData[
        currentStep.field as keyof Omit<typeof formData, "language">
      ] = currentStep.options[selectedOption];
    }

    setFormData(updatedData);
    setSelectedOption(null);

    if (currentIndex + 1 < formSteps.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleQueryAstrologers = async () => {
    setIsLoading(true);

    try {
      const results = await fetchAstrologersAPI({
        language: formData.language.join(", "),
        budget: formData.budget,
        communication: formData.communication,
        experience: formData.experience,
      });

      setMatchedAstrologers(results);

      if (!results || results.length === 0) {
        const topRatedResults = await fetchAstrologersAPI({});
        const sortedBestRated = (topRatedResults || []).sort(
          (a, b) => (Number(b.rating) || 4.9) - (Number(a.rating) || 4.9),
        );
        setFallbackAstrologers(sortedBestRated.slice(0, 3));
      }

      setHasSearched(true);
    } catch (error) {
      console.error("Error querying astrologers API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setSelectedLanguages([]);
    setFormData({
      language: [],
      budget: "",
      communication: "",
      experience: "",
    });
    setIsFinished(false);
    setIsLoading(false);
    setMatchedAstrologers([]);
    setFallbackAstrologers([]);
    setHasSearched(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <ThemedView type="backgroundElement" style={styles.widgetWrapper}>
          <View style={styles.introHeader}>
            <ThemedText type="defaultSemiBold" style={styles.introTitle}>
              Find Your Cosmic Guide ✨
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={styles.introSubtitle}
            >
              Answer a few quick questions to match with the ideal Vedic scholar
              for your path.
            </ThemedText>
          </View>

          <ThemedView type="backgroundSelected" style={styles.card}>
            {isLoading ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="large" color="#d946ef" />
                <ThemedText type="defaultSemiBold" style={styles.loadingText}>
                  Querying available astrologers for your ideal matches... ✨
                </ThemedText>
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={styles.loadingSubText}
                >
                  Filtering profiles based on language, budget, and experience
                </ThemedText>
              </View>
            ) : hasSearched ? (
              <View style={styles.resultsBox}>
                <ThemedText type="defaultSemiBold" style={styles.resultsTitle}>
                  {matchedAstrologers.length > 0
                    ? "Your Recommended Astrologers ✨"
                    : "No Astrologers Found According to Your Choices"}
                </ThemedText>
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={styles.resultsSubtitle}
                >
                  {matchedAstrologers.length > 0
                    ? `Found ${matchedAstrologers.length} guides matching your criteria.`
                    : "We couldn't find anyone matching your exact filter combination. Here are our top-rated platform guides instead:"}
                </ThemedText>

                <View style={styles.astrologerList}>
                  {(matchedAstrologers.length > 0
                    ? matchedAstrologers
                    : fallbackAstrologers
                  ).map((astrologer, index) => {
                    const displayName = getLocalizedName(
                      astrologer,
                      formData.language.join(", "),
                    );
                    const avatarInitial =
                      displayName?.trim()?.charAt(0)?.toUpperCase() || "✨";

                    return (
                      <ThemedView
                        key={astrologer.id || index}
                        type="backgroundElement"
                        style={styles.astrologerCard}
                      >
                        <View style={styles.astrologerInfo}>
                          <View style={styles.avatarPlaceholder}>
                            <ThemedText type="defaultSemiBold">
                              {avatarInitial}
                            </ThemedText>
                          </View>
                          <View style={styles.astrologerDetails}>
                            <ThemedText type="defaultSemiBold">
                              {displayName}
                            </ThemedText>
                            <ThemedText type="small" themeColor="textSecondary">
                              {astrologer.experience || "Vedic Specialist"} • ⭐{" "}
                              {astrologer.rating || "4.9"}
                            </ThemedText>
                            <ThemedText
                              type="small"
                              themeColor="textSecondary"
                              numberOfLines={1}
                            >
                              Languages:{" "}
                              {astrologer.languages?.join(", ") ||
                                formData.language.join(", ")}
                            </ThemedText>
                          </View>
                        </View>

                        <Pressable
                          style={({ pressed }) => [
                            styles.connectBtn,
                            pressed && styles.pressed,
                          ]}
                          onPress={() => {
                            router.push({
                              pathname: "/astrologer-profile",
                              params: { id: astrologer.id },
                            });
                          }}
                        >
                          <ThemedText type="smallBold" style={styles.connectText}>
                            Connect
                          </ThemedText>
                        </Pressable>
                      </ThemedView>
                    );
                  })}
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.resetBtn,
                    pressed && styles.pressed,
                    { marginTop: Spacing.two },
                  ]}
                  onPress={handleRestart}
                >
                  <ThemedText type="small" themeColor="textSecondary">
                    Start Over / Adjust Filters
                  </ThemedText>
                </Pressable>
              </View>
            ) : !isFinished ? (
              <>
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={styles.progress}
                >
                  Step {currentIndex + 1} of {formSteps.length}
                </ThemedText>

                <ThemedText type="defaultSemiBold" style={styles.question}>
                  {currentStep.question}
                </ThemedText>

                {currentStep.type === "multiselect" ? (
                  <View style={styles.optionsList}>
                    {currentStep.options.map((option, index) => {
                      const isSelected = selectedLanguages.includes(option);
                      return (
                        <Pressable
                          key={index}
                          style={[
                            styles.optionBtn,
                            isSelected && styles.selectedOption,
                          ]}
                          onPress={() => handleLanguageToggle(option)}
                        >
                          <ThemedText
                            type="small"
                            themeColor={isSelected ? "text" : "textSecondary"}
                          >
                            {isSelected ? "✓ " : ""} {option}
                          </ThemedText>
                        </Pressable>
                      );
                    })}
                  </View>
                ) : (
                  <View style={styles.optionsList}>
                    {currentStep.options.map((option, index) => (
                      <Pressable
                        key={index}
                        style={[
                          styles.optionBtn,
                          selectedOption === index && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption(index)}
                      >
                        <ThemedText
                          type="small"
                          themeColor={
                            selectedOption === index ? "text" : "textSecondary"
                          }
                        >
                          {option}
                        </ThemedText>
                      </Pressable>
                    ))}
                  </View>
                )}

                <Pressable
                  style={({ pressed }) => [
                    styles.actionBtn,
                    pressed && styles.pressed,
                    ((currentStep.type === "multiselect" &&
                      selectedLanguages.length === 0) ||
                      (currentStep.type === "options" &&
                        selectedOption === null)) &&
                      styles.disabledBtn,
                  ]}
                  onPress={handleNext}
                  disabled={
                    currentStep.type === "multiselect"
                      ? selectedLanguages.length === 0
                      : selectedOption === null
                  }
                >
                  <ThemedText type="smallBold" style={styles.actionBtnText}>
                    {currentIndex + 1 < formSteps.length
                      ? "Continue"
                      : "Complete Registration"}
                  </ThemedText>
                </Pressable>
              </>
            ) : (
              <View style={styles.resultsBox}>
                <ThemedText type="defaultSemiBold" style={styles.resultsTitle}>
                  Preferences Saved! ✨
                </ThemedText>

                {[
                  {
                    label: "Preferred Languages",
                    value: formData.language.join(", "),
                  },
                  { label: "Cost Preference", value: formData.budget },
                  {
                    label: "Communication Mode",
                    value: formData.communication,
                  },
                  {
                    label: "Astrologer Experience",
                    value: formData.experience,
                  },
                ].map((item, i) => (
                  <ThemedView
                    key={i}
                    type="backgroundElement"
                    style={styles.summaryItem}
                  >
                    <ThemedText type="small" themeColor="textSecondary">
                      {item.label}
                    </ThemedText>
                    <ThemedText type="defaultSemiBold">{item.value}</ThemedText>
                  </ThemedView>
                ))}

                <Pressable
                  style={({ pressed }) => [
                    styles.actionBtn,
                    pressed && styles.pressed,
                    { marginTop: Spacing.two },
                  ]}
                  onPress={handleQueryAstrologers}
                >
                  <ThemedText type="smallBold" style={styles.actionBtnText}>
                    ✨ Show Matching Astrologers
                  </ThemedText>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.resetBtn,
                    pressed && styles.pressed,
                  ]}
                  onPress={handleRestart}
                >
                  <ThemedText type="small" themeColor="textSecondary">
                    Start Over
                  </ThemedText>
                </Pressable>
              </View>
            )}
          </ThemedView>
        </ThemedView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    padding: Spacing.two,
  },
  widgetWrapper: {
    width: "100%",
    borderRadius: Spacing.four,
    padding: Spacing.two,
    backgroundColor: "transparent",
  },
  introHeader: {
    marginBottom: Spacing.three,
    paddingHorizontal: Spacing.one,
  },
  introTitle: {
    marginBottom: Spacing.one / 2,
  },
  introSubtitle: {
    lineHeight: 20,
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    backgroundColor: "transparent",
  },
  progress: {
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: Spacing.one,
  },
  question: { marginBottom: Spacing.three },
  optionsList: { gap: Spacing.two, marginBottom: Spacing.three },
  optionBtn: {
    width: "100%",
    padding: Spacing.three,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.3)",
    backgroundColor: "rgba(59, 7, 100, 0.3)",
  },
  selectedOption: {
    borderColor: "#d946ef",
    backgroundColor: "rgba(147, 51, 234, 0.5)",
  },
  actionBtn: {
    width: "100%",
    padding: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: "#9333ea",
    alignItems: "center",
    justifyContent: "center",
  },
  resetBtn: {
    width: "100%",
    padding: Spacing.two,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.one,
  },
  disabledBtn: { opacity: 0.5 },
  actionBtnText: { color: "#ffffff" },
  pressed: { opacity: 0.8 },
  resultsBox: { gap: Spacing.two },
  resultsTitle: { textAlign: "center", marginBottom: Spacing.one / 2 },
  resultsSubtitle: { textAlign: "center", marginBottom: Spacing.two },
  summaryItem: {
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.one,
    backgroundColor: "rgba(147, 51, 234, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.2)",
  },
  loadingBox: {
    paddingVertical: Spacing.four,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.two,
  },
  loadingText: { textAlign: "center", marginTop: Spacing.one },
  loadingSubText: { textAlign: "center" },
  astrologerList: { gap: Spacing.two },
  astrologerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.three,
    borderRadius: Spacing.two,
    backgroundColor: "rgba(147, 51, 234, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(168, 85, 247, 0.2)",
  },
  astrologerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    flex: 1,
    marginRight: Spacing.one,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(147, 51, 234, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d946ef",
  },
  astrologerDetails: {
    flex: 1,
    gap: 2,
  },
  connectBtn: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.one,
    backgroundColor: "#9333ea",
  },
  connectText: { color: "#ffffff" },
});