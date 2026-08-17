// api/astrologers.ts

export interface Astrologer {
  id: string;
  name: {
    en: string;
    ta?: string;
    hi?: string;
    te?: string;
    ml?: string;
    kn?: string;
    bn?: string;
    mr?: string;
  };
  languages: string[];
  budget: string;
  communication: string;
  experience: string;
  genre: string;
  rating: number;
  price: number; // Numeric price per minute for exact sorting
  isOnline: boolean; // Random online availability status
}

// Helper to generate consistent pseudo-random numbers based on ID
function getPseudoRandomPrice(id: string): number {
  const numId = parseInt(id, 10) || 1;
  // Prices ranging from 20 to 150 per minute
  return 20 + ((numId * 37) % 131);
}

function getPseudoRandomOnline(id: string): boolean {
  const numId = parseInt(id, 10) || 1;
  // Roughly 65% chance of being online
  return (numId * 17) % 100 < 65;
}

const MOCK_ASTROLOGERS_RAW: Omit<Astrologer, "price" | "isOnline">[] = [
  {
    id: "1",
    name: {
      en: "Acharya Vimal",
      hi: "आचार्य विमल",
      ta: "ஆச்சார்யா விமல்",
      te: "ఆచార్య విమల్",
      ml: "ആചാര്യ വിമൽ",
      kn: "ಆಚಾರ್ಯ ವಿಮಲ್",
      bn: "আচার্য বিমল",
      mr: "आचार्य विमल",
    },
    languages: ["Hindi / हिन्दी", "English / English"],
    budget: "Budget-Friendly",
    communication: "chat",
    experience: "3 to 6 years (Seasoned Practitioner)",
    genre: "Vedic",
    rating: 4.8,
  },
  {
    id: "2",
    name: {
      en: "Dr. Meenakshi Sundaram",
      ta: "டாக்டர் மீனாட்சி சுந்தரம்",
      hi: "डॉ. मीनाक्षी सुंदरम",
      te: "డా. మీనాక్షి సుందరం",
      ml: "ഡോ. മീനാക്ഷി സുന്ദരം",
      kn: "ಡಾ. ಮೀನಾಕ್ಷಿ ಸುಂದರಮ್",
      bn: "ড. মীনাক্ষী সুন্দরম",
      mr: "डॉ. मीनाक्षी सुंदरम",
    },
    languages: ["Tamil / തമിഴ്", "English / English", "Malayalam / മലയാളം"],
    budget: "Premium Specialist",
    communication: "chatNcall",
    experience: "10+ years (Master Vedic Scholar)",
    genre: "Tarot",
    rating: 5.0,
  },
  {
    id: "3",
    name: {
      en: "Sridevi Sharma",
      te: "శ్రీదేవి శర్మ",
      ta: "ஸ்ரீதேவி சர்மா",
      hi: "श्रीदेवी शर्मा",
      ml: "ശ്രീദേവി ശർമ്മ",
      kn: "ಶ್ರೀದೇವಿ ಶರ್ಮಾ",
      bn: "শ্রীদেবী শর্মা",
      mr: "श्रीदेवी शर्मा",
    },
    languages: ["Telugu / తెలుగు", "Kannada / ಕನ್ನಡ"],
    budget: "Moderate",
    communication: "call",
    experience: "6 to 10 years (Expert Astrologer)",
    genre: "Numerology",
    rating: 4.9,
  },
  {
    id: "4",
    name: {
      en: "Guru Raghavendra",
      kn: "ಗುರು ರಾಘವೇಂದ್ರ",
      ta: "குரு ராகவேந்திரா",
      hi: "गुरु राघवेंद्र",
      te: "గురు రాఘవేంద్ర",
      ml: "ഗുരു രാഘവേന്ദ്ര",
      bn: "গুরু রাঘবেন্দ্র",
      mr: "गुरु राघवेंद्र",
    },
    languages: [
      "Kannada / ಕನ್ನಡ",
      "Tamil / தமிழ்",
      "Telugu / తెలుగు",
      "English / English",
    ],
    budget: "Budget-Friendly",
    communication: "chatNcall",
    experience: "1 to 3 years (Emerging Guide)",
    genre: "Vastu",
    rating: 4.7,
  },
  {
    id: "5",
    name: {
      en: "Pandit Anant Joshi",
      mr: "पंडित अनंत जोशी",
      hi: "पंडित अनंत जोशी",
    },
    languages: ["Marathi / मराठी", "Hindi / हिन्दी"],
    budget: "Moderate",
    communication: "call",
    experience: "6 to 10 years (Expert Astrologer)",
    genre: "KP",
    rating: 4.9,
  },
  {
    id: "6",
    name: {
      en: "Aparna Chatterjee",
      bn: "অপর্ণা চট্টোপাধ্যায়",
    },
    languages: ["Bengali / বাংলা", "English / English"],
    budget: "Premium Specialist",
    communication: "chatNcall",
    experience: "10+ years (Master Vedic Scholar)",
    genre: "Lal Kitab",
    rating: 4.9,
  },
  {
    id: "7",
    name: {
      en: "Karthik Subramanian",
      ta: "கார்த்திக் சுப்பிரமணியன்",
      ml: "കാർത്തിക് സുബ്രഹ്മണ്യൻ",
    },
    languages: ["Tamil / தமிழ்", "Malayalam / മലയാളം", "English / English"],
    budget: "Budget-Friendly",
    communication: "chat",
    experience: "1 to 3 years (Emerging Guide)",
    genre: "Nadi",
    rating: 4.6,
  },
  {
    id: "8",
    name: {
      en: "Dr. Radhakrishnan",
      te: "డా. రాధాకృష్ణన్",
      kn: "ಡಾ. ರಾಧಾಕೃಷ್ಣನ್",
    },
    languages: ["Telugu / తెలుగు", "Kannada / ಕನ್ನಡ", "Hindi / हिन्दी"],
    budget: "Premium Specialist",
    communication: "chatNcall",
    experience: "10+ years (Master Vedic Scholar)",
    genre: "Palmistry",
    rating: 4.95,
  },
  {
    id: "9",
    name: {
      en: "Sunita Deshmukh",
      mr: "सुनीता देशमख",
      hi: "सुनीता देशमुख",
    },
    languages: ["Marathi / मराठी", "Hindi / हिन्दी", "English / English"],
    budget: "Moderate",
    communication: "call",
    experience: "3 to 6 years (Seasoned Practitioner)",
    genre: "Face Reading",
    rating: 4.85,
  },
  {
    id: "10",
    name: {
      en: "Debabrata Mukherjee",
      bn: "দেবব্রত মুখোপাধ্যায়",
    },
    languages: ["Bengali / বাংলা", "Hindi / हिन्दी"],
    budget: "Budget-Friendly",
    communication: "chat",
    experience: "1 to 3 years (Emerging Guide)",
    genre: "Psychic",
    rating: 4.7,
  },
];

// Attach dynamic prices and online availability to mock list
export const MOCK_ASTROLOGERS: Astrologer[] = MOCK_ASTROLOGERS_RAW.map(
  (item) => ({
    ...item,
    price: getPseudoRandomPrice(item.id),
    isOnline: getPseudoRandomOnline(item.id),
  }),
);

// Helper to determine localized name
export function getLocalizedName(
  astrologer: Astrologer,
  selectedLanguage?: string,
): string {
  if (!selectedLanguage) return astrologer.name.en;

  if (selectedLanguage.includes("Tamil") && astrologer.name.ta)
    return astrologer.name.ta;
  if (selectedLanguage.includes("Hindi") && astrologer.name.hi)
    return astrologer.name.hi;
  if (selectedLanguage.includes("Telugu") && astrologer.name.te)
    return astrologer.name.te;
  if (selectedLanguage.includes("Malayalam") && astrologer.name.ml)
    return astrologer.name.ml;
  if (selectedLanguage.includes("Kannada") && astrologer.name.kn)
    return astrologer.name.kn;
  if (selectedLanguage.includes("Bengali") && astrologer.name.bn)
    return astrologer.name.bn;
  if (selectedLanguage.includes("Marathi") && astrologer.name.mr)
    return astrologer.name.mr;

  return astrologer.name.en;
}

// Helper to get the first character for avatar representation
export function getAstrologerInitial(
  astrologer: Astrologer,
  selectedLanguage?: string,
): string {
  const name = getLocalizedName(astrologer, selectedLanguage);
  return name.charAt(0).toUpperCase();
}

export interface AstrologerFilters {
  language?: string;
  budget?: string;
  communication?: string;
  experience?: string;
  genre?: string;
  maxPrice?: number;
  onlineOnly?: boolean;
}

// Simulated API Handler supporting genre, language, budget, experience, communication, price range, and online status filtering
export async function fetchAstrologersAPI(
  filtersOrQuery?:
    | AstrologerFilters
    | string
    | URLSearchParams
    | Record<string, any>,
): Promise<Astrologer[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filters: AstrologerFilters = {};

      if (typeof filtersOrQuery === "string") {
        // Handle raw query strings like "?communication=chat&genre=Vedic" or "communication=chat"
        const queryString = filtersOrQuery.startsWith("?")
          ? filtersOrQuery.slice(1)
          : filtersOrQuery;
        const searchParams = new URLSearchParams(queryString);
        filters = {
          communication: searchParams.get("communication") || undefined,
          language: searchParams.get("language") || undefined,
          budget: searchParams.get("budget") || undefined,
          experience: searchParams.get("experience") || undefined,
          genre: searchParams.get("genre") || undefined,
          maxPrice: searchParams.get("maxPrice")
            ? Number(searchParams.get("maxPrice"))
            : undefined,
          onlineOnly: searchParams.get("onlineOnly") === "true",
        };
      } else if (filtersOrQuery instanceof URLSearchParams) {
        // Handle URLSearchParams objects directly
        filters = {
          communication: filtersOrQuery.get("communication") || undefined,
          language: filtersOrQuery.get("language") || undefined,
          budget: filtersOrQuery.get("budget") || undefined,
          experience: filtersOrQuery.get("experience") || undefined,
          genre: filtersOrQuery.get("genre") || undefined,
          maxPrice: filtersOrQuery.get("maxPrice")
            ? Number(filtersOrQuery.get("maxPrice"))
            : undefined,
          onlineOnly: filtersOrQuery.get("onlineOnly") === "true",
        };
      } else if (filtersOrQuery) {
        // Handle plain objects (like record from useLocalSearchParams())
        filters = {
          ...filtersOrQuery,
          communication: filtersOrQuery.communication,
        };
      }

      if (!filtersOrQuery || Object.keys(filters).length === 0) {
        resolve(MOCK_ASTROLOGERS);
        return;
      }

      const filtered = MOCK_ASTROLOGERS.filter((astrologer) => {
        // Genre Filter
        if (
          filters.genre &&
          filters.genre !== "All" &&
          astrologer.genre !== filters.genre
        ) {
          return false;
        }

        // Language Filter
        if (filters.language && filters.language !== "All") {
          const requestedLanguages = filters.language
            .split(",")
            .map((lang) => lang.trim())
            .filter(Boolean);

          if (requestedLanguages.length > 0) {
            const hasCommonLanguage = requestedLanguages.some((reqLang) =>
              astrologer.languages.some((astLang) =>
                astLang.toLowerCase().includes(reqLang.toLowerCase()),
              ),
            );
            if (!hasCommonLanguage) return false;
          }
        }

        // Budget Filter
        if (
          filters.budget &&
          filters.budget !== "All" &&
          astrologer.budget !== filters.budget
        ) {
          return false;
        }

        // Max Price Filter
        if (
          filters.maxPrice !== undefined &&
          astrologer.price > filters.maxPrice
        ) {
          return false;
        }

        // Online Only Filter
        if (filters.onlineOnly && !astrologer.isOnline) {
          return false;
        }

        // Communication Filter (chat, call, chatNcall, all)
        if (filters.communication && filters.communication !== "all") {
          const commMap: { [key: string]: string[] } = {
            chat: ["chat"],
            call: ["call"],
            chatNcall: ["chatNcall"],
          };
          const validComms = commMap[filters.communication] || [];
          if (!validComms.includes(astrologer.communication)) {
            return false;
          }
        }

        // Experience Filter
        if (
          filters.experience &&
          filters.experience !== "All" &&
          astrologer.experience !== filters.experience
        ) {
          return false;
        }

        return true;
      });

      resolve(filtered.length > 0 ? filtered : MOCK_ASTROLOGERS);
    }, 1200);
  });
}
