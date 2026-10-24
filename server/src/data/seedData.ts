export interface TourPackage {
  _id: string;
  title: string;
  destination: string;
  country: string;
  tagline: string;
  image: string;
  gallery: string[];
  price: number;
  duration: string;
  groupSize: string;
  rating: number;
  reviewsCount: number;
  category: 'Luxury' | 'Romantic' | 'Nature' | 'Cultural' | 'Adventure';
  highlights: string[];
  itinerary: { day: number; title: string; desc: string; meals: string }[];
  included: string[];
  excluded: string[];
  featured?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  image: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  stars: number;
  amenities: string[];
  roomTypes: { type: string; price: number; capacity: number; size: string }[];
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  logo: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  class: 'Economy' | 'Business' | 'First Class';
}

export interface ReviewItem {
  id: string;
  packageId?: string;
  userName: string;
  userAvatar: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful: number;
}

export const initialPackages: TourPackage[] = [
  {
    _id: "pkg-1",
    title: "Kyoto Zen Sanctuary & Bamboo Groves",
    destination: "Kyoto",
    country: "Japan",
    tagline: "Experience the eternal harmony of tranquil imperial gardens and tea ceremonies.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80"
    ],
    price: 2450,
    duration: "7 Days, 6 Nights",
    groupSize: "Max 8 Guests",
    rating: 4.95,
    reviewsCount: 128,
    category: "Cultural",
    featured: true,
    highlights: [
      "Private sunrise access to Fushimi Inari-taisha",
      "Authentic Kaiseki dinner with a licensed Geiko artisan",
      "Traditional matcha ceremony in a 400-year-old temple",
      "Bullet train Shinkansen First-Class passes"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kyoto & Ryokan Check-in", desc: "Private transfer to your boutique ryokan with welcome matcha and traditional onsen soak.", meals: "Dinner included" },
      { day: 2, title: "Fushimi Inari & Gion Walking Tour", desc: "Marvel at thousands of vermilion torii gates followed by an evening lantern stroll.", meals: "Breakfast, Dinner" },
      { day: 3, title: "Arashiyama Bamboo Grove & Tenryu-ji", desc: "Immerse in bamboo whispers, boat ride on Hozu River, and Zen meditation.", meals: "Breakfast, Lunch" },
      { day: 4, title: "Golden Pavilion & Tea Ceremony", desc: "Visit Kinkaku-ji and partake in a sacred private tea ceremony.", meals: "Breakfast" },
      { day: 5, title: "Uji Matcha Terraces & Craft Workshop", desc: "Discover ancient matcha fields and ceramic glaze artistry in Uji.", meals: "Breakfast, Lunch" },
      { day: 6, title: "Nara Deer Sanctuary & Todai-ji", desc: "Day excursion to the historic Great Buddha and friendly sacred deer park.", meals: "Breakfast, Farewell Kaiseki Dinner" },
      { day: 7, title: "Sayonara Japan & Departure", desc: "Relaxed morning in the Japanese garden before your private airport transfer.", meals: "Breakfast" }
    ],
    included: [
      "5-star boutique Ryokan & luxury hotel accommodations",
      "Daily gourmet breakfasts and 3 Michelin-starred Kaiseki dinners",
      "Dedicated English-speaking private cultural specialist",
      "All regional transfers, bullet train passes, and temple entrance fees"
    ],
    excluded: [
      "International flights",
      "Personal shopping and souvenirs",
      "Travel insurance"
    ]
  },
  {
    _id: "pkg-2",
    title: "Amalfi Coastline & Capri Azure Escape",
    destination: "Positano & Amalfi",
    country: "Italy",
    tagline: "Cliffside pastel villas, lemon groves, and private yacht sails across azure waters.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
    ],
    price: 3200,
    duration: "6 Days, 5 Nights",
    groupSize: "Max 6 Guests",
    rating: 4.92,
    reviewsCount: 94,
    category: "Romantic",
    featured: true,
    highlights: [
      "Private Riva speedboat charter to Capri and Blue Grotto",
      "Limoncello tasting in private cliffside Ravello gardens",
      "Panoramic cooking masterclass overlooking Positano bay",
      "Sunset champagne aperitivo at Le Sirenuse"
    ],
    itinerary: [
      { day: 1, title: "Welcome to Naples & Scenic Amalfi Drive", desc: "Chauffeured Mercedes ride along the dramatic corniche into Positano.", meals: "Welcome Cocktail & Dinner" },
      { day: 2, title: "Positano Exploration & Beach Club", desc: "Stroll boutique pastel alleys and relax at reserved VIP sun loungers.", meals: "Breakfast, Lunch" },
      { day: 3, title: "Capri & Faraglioni Private Cruise", desc: "Sail to Capri, swim in secluded coves, and stroll Piazza Umberto I.", meals: "Breakfast, Seaside Lunch" },
      { day: 4, title: "Ravello & Villa Cimbrone Infinity Terrace", desc: "Gaze over the Gulf of Salerno from the Terrace of Infinity.", meals: "Breakfast, Dinner" },
      { day: 5, title: "Path of the Gods Hike or Lemon Estate", desc: "Choose gentle hiking on the gods' trail or artisan pasta-making with local nonnas.", meals: "Breakfast, Tasting Lunch" },
      { day: 6, title: "Arrivederci Amalfi Coast", desc: "Scenic transfer back to Naples International Airport.", meals: "Breakfast" }
    ],
    included: [
      "5 nights in 5-star cliffside ocean-view luxury suites",
      "Private speedboat charter to Capri with skipper and open bar",
      "Chauffeured private luxury van for all inland travel",
      "Wine and limoncello tastings at heritage estates"
    ],
    excluded: [
      "International airfare",
      "Gratuities for boat crew and drivers"
    ]
  },
  {
    _id: "pkg-3",
    title: "Swiss Alpine Luxury & Glacier Express",
    destination: "Zermatt & St. Moritz",
    country: "Switzerland",
    tagline: "Pristine snow peaks, iconic Matterhorn vistas, and grand heritage chalets.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80"
    ],
    price: 3850,
    duration: "8 Days, 7 Nights",
    groupSize: "Max 10 Guests",
    rating: 4.98,
    reviewsCount: 160,
    category: "Luxury",
    featured: true,
    highlights: [
      "Glacier Express Excellence Class panoramic journey",
      "Helicopter flyover of the iconic Matterhorn",
      "Thermal spa rejuvenation in Bad Ragaz springs",
      "Artisanal Swiss fondue and vintage wine pairings"
    ],
    itinerary: [
      { day: 1, title: "Zurich to Lucerne & Lake Steamer", desc: "First-class Swiss rail to Lucerne followed by twilight lake cruise.", meals: "Dinner" },
      { day: 2, title: "Zermatt & The Majestic Matterhorn", desc: "Ascend Gornergrat cogwheel train with panoramic 360-degree views.", meals: "Breakfast" },
      { day: 3, title: "Alpine Hiking & Glacier Paradise", desc: "Walk pristine wildflower trails and explore year-round glacier caves.", meals: "Breakfast, Lunch" },
      { day: 4, title: "The Glacier Express to St. Moritz", desc: "World-famous scenic train crossing 291 bridges in 5-course comfort.", meals: "Breakfast, Gourmet Lunch" },
      { day: 5, title: "St. Moritz Glamour & High Engadin", desc: "Explore sparkling alpine lakes and exclusive mountain boutiques.", meals: "Breakfast, Dinner" },
      { day: 6, title: "Bad Ragaz Thermal Wellness Sanctuary", desc: "Private access to therapeutic natural thermal baths.", meals: "Breakfast" },
      { day: 7, title: "Artisan Chocolate & Cheese Discovery", desc: "Visit master chocolatiers and centuries-old alpine dairy caves.", meals: "Breakfast, Farewell Dinner" },
      { day: 8, title: "Zurich Departure", desc: "Smooth first-class train transit back to Zurich airport.", meals: "Breakfast" }
    ],
    included: [
      "7 nights in iconic 5-star Swiss Alpine Palace & Chalet hotels",
      "Glacier Express Excellence Class ticket with 5-course dining",
      "Unlimited 1st-Class Swiss Travel Pass for all trains and cable cars",
      "All mountain excursions and private spa access"
    ],
    excluded: [
      "Ski gear rental (if visiting during winter season)",
      "International flights"
    ]
  },
  {
    _id: "pkg-4",
    title: "Serengeti Great Migration & Ngorongoro Crater",
    destination: "Serengeti & Ngorongoro",
    country: "Tanzania",
    tagline: "Witness nature's greatest wildlife spectacle from ultra-luxury tented suites.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80"
    ],
    price: 4900,
    duration: "7 Days, 6 Nights",
    groupSize: "Max 6 Guests",
    rating: 4.97,
    reviewsCount: 82,
    category: "Adventure",
    featured: true,
    highlights: [
      "Sunrise hot-air balloon safari over endless savannah",
      "Big Five game drives with master certified trackers",
      "Champagne bush breakfasts and stargazing boma fires",
      "Unrestricted descent into Ngorongoro Caldera"
    ],
    itinerary: [
      { day: 1, title: "Kilimanjaro to Arusha Coffee Lodge", desc: "Warm African greeting and relaxing overnight in lush coffee gardens.", meals: "Dinner" },
      { day: 2, title: "Fly to Serengeti & First Sunset Safari", desc: "Light aircraft flight into the savannah, first wildlife encounters.", meals: "All Meals" },
      { day: 3, title: "Hot Air Balloon Safari & River Crossing", desc: "Float over wildebeest herds followed by champagne breakfast.", meals: "All Meals" },
      { day: 4, title: "Full Day Big Cats Tracking", desc: "Search for lions, leopards, and cheetahs with expert trackers.", meals: "All Meals" },
      { day: 5, title: "Ngorongoro Conservation Area", desc: "Travel to the crater rim and stay at a breathtaking cliff lodge.", meals: "All Meals" },
      { day: 6, title: "Crater Floor Wildlife Expedition", desc: "Descend into the fertile volcanic amphitheater dense with wildlife.", meals: "All Meals" },
      { day: 7, title: "Maasai Cultural Exchange & Flight Out", desc: "Morning Maasai beadwork appreciation before flight home.", meals: "Breakfast, Lunch" }
    ],
    included: [
      "6 nights in Four Seasons Safari Lodge and luxury mobile camps",
      "All internal bush flights and transfers",
      "Private custom 4x4 Land Cruiser with pop-up photography roof",
      "All national park conservation fees and balloon safari"
    ],
    excluded: [
      "International flights and Tanzania visa",
      "Personal safari tips"
    ]
  },
  {
    _id: "pkg-5",
    title: "Santorini Aegean Sunset & Caldera Odyssey",
    destination: "Oia & Fira",
    country: "Greece",
    tagline: "Whitewashed architecture, cobalt domes, and private catamarans on the Aegean.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
    ],
    price: 2850,
    duration: "6 Days, 5 Nights",
    groupSize: "Max 8 Guests",
    rating: 4.89,
    reviewsCount: 142,
    category: "Romantic",
    featured: false,
    highlights: [
      "Infinity pool cave suite carved into the volcanic cliffs",
      "Private Lagoon 450 catamaran cruise with BBQ and wine",
      "Assyrtiko volcanic vineyard private cellar tour",
      "Secret sunset viewpoint in Megalochori"
    ],
    itinerary: [
      { day: 1, title: "Athens to Santorini & Sunset Toast", desc: "Private helicopter or flight to Santorini; check in to Oia cliff suite.", meals: "Dinner" },
      { day: 2, title: "Oia Cobblestones & Photography Safari", desc: "Early morning gentle walk before crowds; discover quiet hidden angles.", meals: "Breakfast" },
      { day: 3, title: "Volcanic Hot Springs & Catamaran Sail", desc: "Swim in therapeutic sulfur springs and enjoy grilled Mediterranean seafood.", meals: "Breakfast, Lunch" },
      { day: 4, title: "Akrotiri Minoan Ruins & Red Beach", desc: "Guided exploration of the prehistoric Pompeii of the Aegean.", meals: "Breakfast" },
      { day: 5, title: "Volcanic Wine Tasting & Greek Feast", desc: "Sample crisp mineral wines aged in oak casks paired with local cheeses.", meals: "Breakfast, Dinner" },
      { day: 6, title: "Farewell Cyclades", desc: "Private chauffeur transfer to Santorini airport.", meals: "Breakfast" }
    ],
    included: [
      "5 nights in a luxury Caldera-view cave suite with private heated plunge pool",
      "Private luxury catamaran sunset excursion with gourmet lunch",
      "Sommelier-guided winery tours and 4-course food pairings",
      "All airport VIP private transfers"
    ],
    excluded: ["International flights", "Personal expenditures"]
  },
  {
    _id: "pkg-6",
    title: "Bali Spiritual Serenity & Coastal Sanctuaries",
    destination: "Ubud & Uluwatu",
    country: "Indonesia",
    tagline: "Emerald rice terraces, sacred water blessings, and cliff-top ocean pavilions.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"
    ],
    price: 1950,
    duration: "7 Days, 6 Nights",
    groupSize: "Max 8 Guests",
    rating: 4.94,
    reviewsCount: 115,
    category: "Nature",
    featured: false,
    highlights: [
      "Private Melukat purification ceremony at Tirta Empul",
      "Floating villa over Ayung River rainforest valley",
      "Sunset Kecak fire dance on Uluwatu clifftops",
      "Artisan batik and silver jewelry masterclasses"
    ],
    itinerary: [
      { day: 1, title: "Denpasar to Ubud Jungle Retreat", desc: "Welcome herbal drink and flower blessing at your private pool villa.", meals: "Dinner" },
      { day: 2, title: "Tegallalang Terraces & Sacred Water Temple", desc: "Sunrise walk among rice paddies and sacred cleansing ritual.", meals: "Breakfast, Lunch" },
      { day: 3, title: "Ubud Artisan Guilds & Yoga Retreat", desc: "Woodcarving in Mas village followed by restorative sound bath.", meals: "Breakfast" },
      { day: 4, title: "Mount Batur View & Coffee Estate", desc: "Scenic volcanic vistas and single-origin coffee roasting.", meals: "Breakfast, Lunch" },
      { day: 5, title: "Transfer to Uluwatu & Cliffside Club", desc: "Drive south to the dramatic limestone cliffs of the Bukit peninsula.", meals: "Breakfast" },
      { day: 6, title: "Kecak Dance & Sunset Seafood Banquet", desc: "Watch the ancient chant performance as the sun dips into the Indian Ocean.", meals: "Breakfast, Dinner" },
      { day: 7, title: "Spa Rejuvenation & Departure", desc: "2-hour Balinese massage treatment before airport transfer.", meals: "Breakfast" }
    ],
    included: [
      "Private jungle and ocean pool villas",
      "Daily gourmet organic breakfasts and private chef dinners",
      "Personal Balinese cultural host and private vehicle",
      "All temple permissions and temple dress sarongs"
    ],
    excluded: ["International flights", "Personal spa upgrades"]
  }
];

export const initialHotels: Hotel[] = [
  {
    id: "htl-1",
    name: "The Ritz-Carlton Kyoto",
    location: "Kamigyo Ward, Kamogawa River",
    city: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    rating: 4.96,
    reviewsCount: 312,
    pricePerNight: 580,
    stars: 5,
    amenities: ["Spa & Onsen", "Kamogawa River View", "Michelin Dining", "Free High-Speed Wi-Fi", "Concierge"],
    roomTypes: [
      { type: "Deluxe River View Suite", price: 580, capacity: 2, size: "52 sqm" },
      { type: "Tatami Garden Pavilion", price: 820, capacity: 3, size: "68 sqm" },
      { type: "Imperial Presidential Suite", price: 1650, capacity: 4, size: "120 sqm" }
    ]
  },
  {
    id: "htl-2",
    name: "Le Sirenuse Positano",
    location: "Via Cristoforo Colombo",
    city: "Positano",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.98,
    reviewsCount: 245,
    pricePerNight: 790,
    stars: 5,
    amenities: ["Champagne & Oyster Bar", "Heated Pool", "Private Wooden Boat", "Boutique Spa", "Balcony Sea View"],
    roomTypes: [
      { type: "Sea View Superior", price: 790, capacity: 2, size: "45 sqm" },
      { type: "Deluxe Balcony Terrace Suite", price: 1150, capacity: 2, size: "65 sqm" },
      { type: "Penthouse Cliffside Suite", price: 2100, capacity: 3, size: "110 sqm" }
    ]
  },
  {
    id: "htl-3",
    name: "The Chedi Andermatt",
    location: "Gotthardstrasse, Swiss Alps",
    city: "Andermatt",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    rating: 4.95,
    reviewsCount: 189,
    pricePerNight: 640,
    stars: 5,
    amenities: ["Hydrothermal Pool", "Wine & Cigar Library", "Ski Butler", "Japanese Fine Dining", "Fireplace Lounges"],
    roomTypes: [
      { type: "Alpine Executive Room", price: 640, capacity: 2, size: "55 sqm" },
      { type: "Gemsstock Grand Suite", price: 950, capacity: 4, size: "85 sqm" },
      { type: "The Furka Chalet Suite", price: 1800, capacity: 5, size: "150 sqm" }
    ]
  },
  {
    id: "htl-4",
    name: "Canaves Oia Suites",
    location: "Main Pedestrian Way",
    city: "Oia, Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    rating: 4.93,
    reviewsCount: 280,
    pricePerNight: 520,
    stars: 5,
    amenities: ["Private Infinity Plunge Pool", "Sunset Caldera Views", "Helipad Access", "Daily Gourmet Breakfast", "Luxury Yacht"],
    roomTypes: [
      { type: "Classic Cave Suite", price: 520, capacity: 2, size: "40 sqm" },
      { type: "Infinity Pool Honeymoon Suite", price: 820, capacity: 2, size: "60 sqm" },
      { type: "Royal Villa Caldera", price: 1450, capacity: 4, size: "105 sqm" }
    ]
  }
];

export const initialFlights: Flight[] = [
  {
    id: "flt-101",
    flightNumber: "EK-318",
    airline: "Emirates",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=200&q=80",
    from: "New York (JFK)",
    fromCode: "JFK",
    to: "Tokyo (NRT)",
    toCode: "NRT",
    departureTime: "11:20 AM",
    arrivalTime: "03:45 PM (+1)",
    duration: "14h 25m",
    stops: "Non-stop",
    price: 1150,
    class: "Business"
  },
  {
    id: "flt-102",
    flightNumber: "SQ-26",
    airline: "Singapore Airlines",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=200&q=80",
    from: "London (LHR)",
    fromCode: "LHR",
    to: "Singapore (SIN)",
    toCode: "SIN",
    departureTime: "09:05 PM",
    arrivalTime: "05:55 PM (+1)",
    duration: "12h 50m",
    stops: "Non-stop",
    price: 980,
    class: "Economy"
  },
  {
    id: "flt-103",
    flightNumber: "QR-114",
    airline: "Qatar Airways",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=200&q=80",
    from: "Paris (CDG)",
    fromCode: "CDG",
    to: "Rome (FCO)",
    toCode: "FCO",
    departureTime: "08:15 AM",
    arrivalTime: "10:25 AM",
    duration: "2h 10m",
    stops: "Non-stop",
    price: 340,
    class: "Business"
  },
  {
    id: "flt-104",
    flightNumber: "LH-441",
    airline: "Lufthansa",
    logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=200&q=80",
    from: "Zurich (ZRH)",
    fromCode: "ZRH",
    to: "Athens (ATH)",
    toCode: "ATH",
    departureTime: "01:30 PM",
    arrivalTime: "05:10 PM",
    duration: "2h 40m",
    stops: "Non-stop",
    price: 420,
    class: "Economy"
  }
];

export const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    packageId: "pkg-1",
    userName: "Eleanor Vance",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    location: "San Francisco, USA",
    rating: 5,
    date: "October 14, 2026",
    title: "An exquisite journey through Japanese serenity",
    comment: "The Kyoto Zen itinerary was meticulously curated. Our private tea ceremony felt like stepping into an ancient realm. The ryokan onsen and kaiseki dinners were worth every penny.",
    helpful: 34
  },
  {
    id: "rev-2",
    packageId: "pkg-2",
    userName: "Lord Julian Sterling",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    location: "London, UK",
    rating: 5,
    date: "September 28, 2026",
    title: "Pure elegance on the Amalfi cliffs",
    comment: "Cruising to Capri on the Riva speedboat was the highlight of our year. Positano was vibrant yet relaxing. The team handled every transfer without a single hiccup.",
    helpful: 29
  },
  {
    id: "rev-3",
    packageId: "pkg-3",
    userName: "Dr. Clara Moreau",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    location: "Geneva, Switzerland",
    rating: 5,
    date: "August 19, 2026",
    title: "The Glacier Express was unforgettable",
    comment: "Excellence class dining with the Swiss Alps unfolding outside the panoramic windows was spectacular. Highly recommend the helicopter flight over Matterhorn!",
    helpful: 41
  }
];

export interface InitialBooking {
  _id: string;
  userId: string;
  userEmail: string;
  userName: string;
  type: 'package' | 'hotel' | 'flight';
  itemTitle: string;
  details: string;
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface InitialUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'traveler';
  avatar: string;
  createdAt: string;
}

export const initialBookings: InitialBooking[] = [
  {
    _id: "bk-1001",
    userId: "usr-demo",
    userEmail: "traveler@oasis.com",
    userName: "Sophia Lorenza",
    type: "package",
    itemTitle: "Kyoto Zen Sanctuary & Bamboo Groves",
    details: "7 Days, 2 Guests • Deluxe Ryokan Suite",
    startDate: "2026-11-10",
    endDate: "2026-11-17",
    guests: 2,
    totalPrice: 4900,
    status: "confirmed",
    createdAt: "2026-10-20"
  },
  {
    _id: "bk-1002",
    userId: "usr-demo",
    userEmail: "traveler@oasis.com",
    userName: "Sophia Lorenza",
    type: "hotel",
    itemTitle: "Le Sirenuse Positano",
    details: "Deluxe Balcony Terrace Suite • 4 Nights",
    startDate: "2026-12-01",
    endDate: "2026-12-05",
    guests: 2,
    totalPrice: 3160,
    status: "confirmed",
    createdAt: "2026-10-22"
  },
  {
    _id: "bk-1003",
    userId: "usr-guest-2",
    userEmail: "marcus.aurelius@rome.org",
    userName: "Marcus Vance",
    type: "flight",
    itemTitle: "Emirates (EK-318) JFK -> NRT",
    details: "Business Class • 1 Passenger",
    startDate: "2026-11-09",
    endDate: "2026-11-09",
    guests: 1,
    totalPrice: 1150,
    status: "pending",
    createdAt: "2026-10-23"
  }
];

export const initialUsers: InitialUser[] = [
  {
    _id: "usr-admin",
    name: "Aurelia Administrator",
    email: "admin@oasis.com",
    passwordHash: "$2a$10$wT8KzLw.dG7JgY5R8PzUauM8NfJ9S1Q9c4D2k8O1j7R0u3F5E7Qeq",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-01-01"
  },
  {
    _id: "usr-demo",
    name: "Sophia Lorenza",
    email: "traveler@oasis.com",
    passwordHash: "$2a$10$wT8KzLw.dG7JgY5R8PzUauM8NfJ9S1Q9c4D2k8O1j7R0u3F5E7Qeq",
    role: "traveler",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    createdAt: "2026-05-15"
  }
];

