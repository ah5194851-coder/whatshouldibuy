import { Category } from '../types';
import laptopImg from '../assets/images/cat_laptops_showcase_1790354718502.jpg';
import headphoneImg from '../assets/images/cat_headphones_showcase_1790354735596.jpg';
import cameraImg from '../assets/images/cat_cameras_showcase_1790354748549.jpg';
import heroImg from '../assets/images/hero_product_curation_1790354697983.jpg';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'laptops',
    slug: 'laptops',
    name: 'Laptop',
    pluralName: 'Laptops',
    tagline: 'Ultrabooks, student notebooks, creators & workhorses',
    description: 'Independent evaluation of battery life, display color gamut, thermals, and real-world multitasking speed across Windows, macOS, and ChromeOS.',
    iconName: 'Laptop',
    image: laptopImg,
    subcategories: ['Thin & Light Ultrabooks', 'Student Laptops', 'Creative Workstations', 'Budget Productivity', '2-in-1 Convertibles'],
    topFeaturesToLookFor: [
      'Minimum 16GB unified RAM for longevity and modern browser tabs',
      'Display with at least 350-400 nits brightness and 100% sRGB or DCI-P3 coverage',
      'Realistic 10+ hour mixed productivity battery endurance',
      'Comfortable keyboard travel with responsive multi-touch glass trackpad'
    ],
    commonMistakes: [
      'Purchasing 8GB RAM in non-upgradable thin machines',
      'Overpaying for discrete GPU when integrated silicon handles daily tasks with superior battery life',
      'Choosing low-resolution 250-nit TN panels that wash out in daylight'
    ],
    buyingGuideSummary: 'For most users, efficiency and battery runtime matter far more than theoretical peak clock speeds. Apple silicon (M3/M4) and latest Snapdragon X / Intel Core Ultra / AMD Ryzen chips run cool while offering all-day unplugged longevity.',
    faqs: [
      {
        question: 'How much RAM do I actually need in a laptop?',
        answer: 'For everyday browsing, documents, and media, 16GB is our recommended baseline. Avoid 8GB configurations if you plan to keep the machine past 2 years, as memory cannot be upgraded in most modern ultrabooks.'
      },
      {
        question: 'Mac vs Windows: which is right for my budget?',
        answer: 'MacBook Air models excel in battery life, speaker quality, and build durability, holding resale value exceptionally well. Windows offers broader price tiers under $600, touchscreen options, and compatibility with specialized legacy software and PC gaming.'
      },
      {
        question: 'Are OLED laptop screens worth the battery hit?',
        answer: 'OLED provides infinite contrast and deep blacks ideal for video editors and movie watchers, but typically consumes 15–25% more power on white backgrounds (documents, spreadsheets). If all-day battery is your priority, high-grade IPS panels remain optimal.'
      }
    ],
    relatedCategorySlugs: ['smartphones', 'accessories', 'office', 'headphones']
  },
  {
    id: 'smartphones',
    slug: 'smartphones',
    name: 'Smartphone',
    pluralName: 'Smartphones',
    tagline: 'Flagship cameras, battery endurance & value champs',
    description: 'Rigorous side-by-side analysis of camera sensors, real-world battery drain, long-term software support guarantees, and sunlight readability.',
    iconName: 'Smartphone',
    image: heroImg,
    subcategories: ['Flagship Phones', 'Value Champions ($350–$600)', 'Compact Phones', 'Foldables', 'Battery Endurance'],
    topFeaturesToLookFor: [
      'Guaranteed 5 to 7 years of major OS and security patch support',
      'Primary sensor with optical image stabilization (OIS) and large pixel pitch',
      'Display with 120Hz adaptive refresh rate and 1500+ nits outdoor peak brightness',
      'Fast wired charging and all-day mixed usage battery endurance'
    ],
    commonMistakes: [
      'Buying base storage (128GB) if shooting high-bitrate 4K video',
      'Paying flagship $1,200 prices when $500 mid-rangers deliver 90% of the daily experience',
      'Ignoring software update roadmaps and carrier bloatware'
    ],
    buyingGuideSummary: 'Modern mid-range smartphones have closed the gap with flagships on everyday responsiveness and primary photo quality. Focus on software longevity, battery life, and ergonomic hand feel over synthetic benchmark scores.',
    faqs: [
      {
        question: 'Is 128GB storage enough for a modern smartphone?',
        answer: 'If you store photos locally, record 4K video, or install large games, 128GB fills up rapidly within 12–18 months. 256GB provides comfortable breathing room for longevity.'
      },
      {
        question: 'How long should I expect a phone to receive security updates?',
        answer: 'Top tier brands (Google Pixel, Samsung Galaxy, Apple) now provide 5 to 7 years of full software and security updates, making longer ownership cycles practical.'
      }
    ],
    relatedCategorySlugs: ['smartwatches', 'headphones', 'accessories']
  },
  {
    id: 'headphones',
    slug: 'headphones',
    name: 'Headphones',
    pluralName: 'Headphones',
    tagline: 'Noise-cancelling, audiophile clarity & travel comfort',
    description: 'Acoustic frequency response testing, Active Noise Cancellation (ANC) attenuation in transit, ear-pad pressure distribution, and microphone background noise rejection.',
    iconName: 'Headphones',
    image: headphoneImg,
    subcategories: ['Over-Ear ANC', 'True Wireless Earbuds', 'Audiophile Open-Back', 'Workout & Running', 'Office Communication'],
    topFeaturesToLookFor: [
      'Effective active noise cancelling that blocks low-frequency rumble without cabin pressure',
      'Comfortable headband clamping force and breathable memory foam earcups',
      'Multipoint Bluetooth for seamless switching between phone and laptop',
      'Physical control buttons or dependable touch gestures'
    ],
    commonMistakes: [
      'Prioritizing heavy bass boost that muddies vocal and acoustic midrange',
      'Neglecting headband weight distribution during prolonged 4+ hour flights or desk work',
      'Relying solely on touch controls in freezing or damp weather'
    ],
    buyingGuideSummary: 'Travelers prioritize ANC depth and foldability, while home listeners benefit significantly from open-back acoustic spatiality. For everyday commuters, multi-device Bluetooth switching and physical mute buttons save constant frustration.',
    faqs: [
      {
        question: 'What is the real difference between Sony and Bose ANC?',
        answer: 'Bose leads slightly in passive ergonomic comfort and consistent high-frequency isolation, whereas Sony provides richer equalizer customization, LDAC high-res audio codec support, and slightly longer single-charge battery life.'
      },
      {
        question: 'Does ANC reduce battery life significantly?',
        answer: 'Running ANC typically decreases battery runtime by 15–25%. Most premier over-ear models deliver 24–30 hours with ANC activated, which is ample for international round-trips.'
      }
    ],
    relatedCategorySlugs: ['audio', 'accessories', 'smartphones', 'laptops']
  },
  {
    id: 'tvs',
    slug: 'tvs',
    name: 'TV',
    pluralName: 'TVs',
    tagline: 'OLED contrast, Mini-LED punch & low-latency gaming',
    description: 'Black level measurement, HDR peak specular highlight brightness, color accuracy out of the box, viewing angle stability, and HDMI 2.1 gaming capability.',
    iconName: 'Tv',
    image: heroImg,
    subcategories: ['OLED TVs', 'Mini-LED Bright Rooms', 'Budget 4K HDR', 'Gaming 120Hz/144Hz', 'Large Format 75"+'],
    topFeaturesToLookFor: [
      'Self-lit OLED pixels or Mini-LED with hundreds of local dimming zones',
      'At least 2 full-bandwidth HDMI 2.1 ports with 4K/120Hz, VRR, and ALLM support',
      'Peak HDR brightness exceeding 800+ nits for true specular highlights',
      'Intuitive smart TV interface without intrusive full-screen advertisement takeover'
    ],
    commonMistakes: [
      'Placing standard OLED TVs in direct sunlight hitting the glass panel',
      'Relying on built-in TV speakers without budgeting for a dedicated soundbar or audio setup',
      'Buying edge-lit LED TVs that exhibit noticeable clouding in dark rooms'
    ],
    buyingGuideSummary: 'OLED remains the reference standard for dark cinema rooms and critical movie viewing. For sunlit living rooms with walls of windows, high-nit Mini-LED displays deliver far superior reflection handling and peak punch.',
    faqs: [
      {
        question: 'What size TV should I get for my room?',
        answer: 'Measure your seating distance: divide viewing distance in inches by 1.2 to find the recommended screen size for a cinematic 40-degree field of view. For example, 8 feet (96 inches) pairs best with a 65 to 75-inch screen.'
      }
    ],
    relatedCategorySlugs: ['gaming', 'audio', 'home-appliances']
  },
  {
    id: 'cameras',
    slug: 'cameras',
    name: 'Camera',
    pluralName: 'Cameras',
    tagline: 'Mirrorless creators, full-frame hybrids & vloggers',
    description: 'Sensor dynamic range, autofocus tracking reliability, in-body image stabilization (IBIS), thermal runtime limits, and lens ecosystem value.',
    iconName: 'Camera',
    image: cameraImg,
    subcategories: ['APS-C Compact Hybrids', 'Full-Frame Creator Bodies', 'Vlogging & Travel', 'Action & Rugged', 'Medium Format'],
    topFeaturesToLookFor: [
      'Class-leading real-time eye and subject tracking autofocus',
      'In-Body Image Stabilization (IBIS) for handheld video and slow shutter shots',
      '10-bit 4:2:2 internal video recording with Log profiles for color grading',
      'Extensive native and third-party lens catalog (E-mount, X-mount, etc.)'
    ],
    commonMistakes: [
      'Spending the entire budget on the camera body and using a slow kit lens',
      'Overlooking lens weight and dimensions for casual travel photography',
      'Buying specialized cinema rigs when hybrid photo-video bodies offer greater flexibility'
    ],
    buyingGuideSummary: 'Modern APS-C and Micro Four Thirds sensors offer phenomenal quality in packages you will actually carry. Reserve full-frame for demanding low-light event photography, extreme shallow depth-of-field portraits, and large commercial prints.',
    faqs: [
      {
        question: 'Do I really need full frame, or is APS-C enough?',
        answer: 'APS-C delivers 90% of full-frame image quality with lenses that are 40% lighter and half the price. Unless you shoot weddings in dark venues or require extreme high-ISO prints, APS-C is often the smarter investment.'
      }
    ],
    relatedCategorySlugs: ['accessories', 'audio', 'laptops']
  },
  {
    id: 'gaming',
    slug: 'gaming',
    name: 'Gaming',
    pluralName: 'Gaming',
    tagline: 'Consoles, high-refresh monitors & handheld PCs',
    description: 'Frame pacing, input lag response, thermal throttling under sustained loads, and ergonomic controller precision.',
    iconName: 'Gamepad2',
    image: heroImg,
    subcategories: ['Handheld PC Gaming', 'Home Consoles', 'High-Refresh Monitors', 'Mechanical Keyboards & Mice', 'Sim Racing & Controllers'],
    topFeaturesToLookFor: [
      'OLED or Fast-IPS panels with variable refresh rate (G-Sync/FreeSync)',
      'Sub-2ms pixel response times to eliminate ghosting and motion smearing',
      'Comfortable controller ergonomics with Hall-effect anti-drift joysticks',
      'Sufficient high-speed SSD storage for modern 100GB+ titles'
    ],
    commonMistakes: [
      'Buying high-resolution 4K monitors without a GPU capable of driving 100+ FPS',
      'Using standard potentiometers prone to stick drift instead of magnetic Hall-effect sticks',
      'Skimping on comfortable seating for multi-hour sessions'
    ],
    buyingGuideSummary: 'Handheld gaming PCs (like Steam Deck OLED) have transformed portable play, while PS5 and Xbox Series X offer frictionless 4K living room gaming. On PC desktop, 1440p 240Hz OLED represents the current sweet spot of clarity and responsiveness.',
    faqs: [
      {
        question: 'Is 1440p or 4K better for gaming?',
        answer: '1440p (2K) strikes the ideal balance between crisp visual density and high frame rates without requiring a $1,500 graphics card.'
      }
    ],
    relatedCategorySlugs: ['tvs', 'headphones', 'office', 'accessories']
  },
  {
    id: 'smartwatches',
    slug: 'smartwatches',
    name: 'Smartwatch',
    pluralName: 'Smartwatches',
    tagline: 'Cardio tracking, sleep recovery & notification triage',
    description: 'Heart rate sensor accuracy against medical ECG baselines, GPS multi-band satellite lock speed, battery longevity, and sapphire glass scratch resilience.',
    iconName: 'Watch',
    image: heroImg,
    subcategories: ['Everyday Smartwatches', 'Multi-Sport GPS Watches', 'Hybrid Mechanicals', 'Budget Fitness Bands', 'Rugged Outdoor'],
    topFeaturesToLookFor: [
      'Multi-band dual-frequency GPS for precision tracking under urban towers or tree canopy',
      'Optical heart rate sensor with solid optical sensor array',
      'Water resistance to at least 5 ATM (50 meters)',
      'Display brightness readable under glaring direct noon sun'
    ],
    commonMistakes: [
      'Buying an Apple Watch for an Android smartphone (incompatible)',
      'Expecting multi-week battery life from full-feature watchOS/Wear OS screens that require daily charging',
      'Relying on sleep tracking without considering watch case bulk in bed'
    ],
    buyingGuideSummary: 'If you want interactive apps and quick voice replies, Apple Watch or Galaxy Watch are unmatched. If you want serious training analytics and 7 to 14-day battery life, dedicated fitness trackers from Garmin are vastly superior.',
    faqs: [
      {
        question: 'Which watch works best with Android vs iPhone?',
        answer: 'Apple Watch only works with iOS. For Android users, the Samsung Galaxy Watch and Google Pixel Watch deliver the tightest notification and app integration.'
      }
    ],
    relatedCategorySlugs: ['fitness', 'smartphones', 'accessories']
  },
  {
    id: 'home-appliances',
    slug: 'home-appliances',
    name: 'Home Appliance',
    pluralName: 'Home Appliances',
    tagline: 'Robot vacuums, air purifiers & climate control',
    description: 'HEPA filtration efficiency, LiDAR obstacle mapping, decibel noise levels under load, and long-term filter replacement costs.',
    iconName: 'Home',
    image: heroImg,
    subcategories: ['Robot Vacuums & Mops', 'True HEPA Air Purifiers', 'Cordless Stick Vacuums', 'Smart Thermostats', 'Dehumidifiers'],
    topFeaturesToLookFor: [
      'LiDAR navigation with reactive camera obstacle avoidance for pet toys and cables',
      'True HEPA H13 filtration capturing 99.97% of airborne particles down to 0.3 microns',
      'Low decibel silent sleep modes under 28 dB',
      'Readily available and reasonably priced replacement consumable parts'
    ],
    commonMistakes: [
      'Buying cheap bump-and-turn robot vacuums that get trapped on cords',
      'Under-sizing air purifiers for the target room volume (CADR ratings matter)',
      'Overlooking battery replacement availability on cordless vacuum sticks'
    ],
    buyingGuideSummary: 'True HEPA air purifiers and intelligent LiDAR robot vacuums dramatically cut down household allergens and routine chore time. Focus on clean air delivery rate (CADR) and replacement filter pricing rather than proprietary smart gimmicks.',
    faqs: [
      {
        question: 'How often do air purifier filters actually need replacing?',
        answer: 'Most HEPA filters last 6 to 12 months depending on household dust levels, pet dander, and cooking habits. Look for purifiers with washable pre-filters to extend main filter lifespan.'
      }
    ],
    relatedCategorySlugs: ['kitchen', 'office', 'accessories']
  },
  {
    id: 'kitchen',
    slug: 'kitchen',
    name: 'Kitchen',
    pluralName: 'Kitchen',
    tagline: 'Espresso machines, dual-zone air fryers & blenders',
    description: 'Thermal stability, motor wattage under load, PTFE-free ceramic nonstick durability, and ease of dishwasher cleanup.',
    iconName: 'UtensilsCrossed',
    image: heroImg,
    subcategories: ['Espresso & Coffee', 'Dual-Zone Air Fryers', 'High-Speed Blenders', 'Sous Vide & Cookware', 'Stand Mixers'],
    topFeaturesToLookFor: [
      'PID temperature control for consistent brewing and cooking extraction',
      'Ceramic nonstick or 18/10 stainless steel construction without toxic coatings',
      'High-torque motors that crush ice and dense dough without stalling',
      'Intuitive manual dials alongside reliable automated presets'
    ],
    commonMistakes: [
      'Buying undersized single-basket air fryers for multi-person dinners',
      'Underestimating grinder quality when investing in home espresso',
      'Purchasing appliances with non-detachable parts that are difficult to sanitize'
    ],
    buyingGuideSummary: 'In the kitchen, build material and thermal consistency trump complex touchscreens. A top-tier burr grinder and dual-basket air fryer are two of the highest-utility upgrades for modern home cooks.',
    faqs: [
      {
        question: 'Is a dual-basket air fryer worth the extra counter space?',
        answer: 'Yes, if you cook proteins and side dishes at different temperatures or times. Synchronized finish timers prevent food from getting cold while waiting for the other component.'
      }
    ],
    relatedCategorySlugs: ['home-appliances', 'fitness', 'accessories']
  },
  {
    id: 'fitness',
    slug: 'fitness',
    name: 'Fitness',
    pluralName: 'Fitness',
    tagline: 'Recovery tools, adjustable weights & cardio trainers',
    description: 'Amplitude stall force on massage guns, footprint efficiency for home gyms, Bluetooth cadence connectivity, and joint impact absorption.',
    iconName: 'Activity',
    image: heroImg,
    subcategories: ['Percussive Massage Guns', 'Adjustable Dumbbells', 'Smart Rowers & Bikes', 'Resistance & Mobility', 'Recovery Boots'],
    topFeaturesToLookFor: [
      'High stall force (35+ lbs) and 12-16mm percussive stroke amplitude',
      'Space-saving quick-pin adjustment mechanisms on weights',
      'Open FTMS Bluetooth connectivity that does not lock you into expensive subscriptions',
      'Sturdy heavy-gauge steel framing with minimal floor footprint'
    ],
    commonMistakes: [
      'Buying cardio machines that turn into paperweights without a $40/month ongoing app subscription',
      'Underestimating ceiling clearance and floor mat vibration dampening in apartments',
      'Selecting weak vibrating massage guns that lack true deep tissue percussive stroke depth'
    ],
    buyingGuideSummary: 'Invest in versatile equipment that does not lock you behind expensive monthly paywalls. Adjustable dumbbells and high-amplitude recovery massage guns offer outstanding versatility per dollar.',
    faqs: [
      {
        question: 'What stroke amplitude is required for a massage gun to be effective?',
        answer: 'True percussive therapy requires a stroke amplitude of 12mm to 16mm to reach deep muscle tissue. Cheap units with 6-8mm strokes merely vibrate the skin surface.'
      }
    ],
    relatedCategorySlugs: ['smartwatches', 'headphones', 'accessories']
  },
  {
    id: 'office',
    slug: 'office',
    name: 'Office',
    pluralName: 'Office',
    tagline: 'Ergonomic seating, dual-motor standing desks & monitors',
    description: 'Spinal lumbar support adjustments, anti-collision motor stability, eye-strain reducing color uniformity, and cable management design.',
    iconName: 'Briefcase',
    image: heroImg,
    subcategories: ['Ergonomic Task Chairs', 'Dual-Motor Standing Desks', 'Ultrawide Monitors', 'Ergonomic Keyboards & Mice', 'Webcams & Lighting'],
    topFeaturesToLookFor: [
      'Synchronous tilt mechanism with independent lumbar tension tuning',
      'Dual-motor 3-stage desk frames supporting 250+ lbs with anti-collision sensors',
      'Single-cable USB-C monitor hubs with 90W+ Power Delivery to charge your laptop',
      'Matte display coatings that eliminate ambient glare and reflection fatigue'
    ],
    commonMistakes: [
      'Buying flashy gaming bucket seats with zero breathable lumbar support for 8-hour workdays',
      'Choosing wobbly single-motor standing desks that shake at standing heights',
      'Positioning monitors too low, causing chronic forward-head neck strain'
    ],
    buyingGuideSummary: 'Your chair and monitor height determine your physical comfort for 2,000+ work hours each year. Prioritize breathable mesh or articulated spine support, paired with a dual-motor desk and single-cable USB-C monitor dock.',
    faqs: [
      {
        question: 'Is an expensive ergonomic chair worth the money?',
        answer: 'Yes. Chairs from reputable ergonomic manufacturers like Herman Miller and Steelcase carry 12-year warranties, modular replacement components, and dynamic biomechanical lumbar support that prevents chronic spine and hip strain.'
      }
    ],
    relatedCategorySlugs: ['laptops', 'accessories', 'audio', 'headphones']
  },
  {
    id: 'audio',
    slug: 'audio',
    name: 'Audio',
    pluralName: 'Audio',
    tagline: 'Studio microphones, powered desktop monitors & DACs',
    description: 'Dynamic cardioid polar pattern isolation, signal-to-noise ratio, amplifier clean headroom, and DAC conversion fidelity.',
    iconName: 'Mic',
    image: headphoneImg,
    subcategories: ['Broadcast Microphones', 'Powered Studio Monitors', 'USB Audio Interfaces', 'Headphone DAC/Amps', 'Portable Bluetooth Speakers'],
    topFeaturesToLookFor: [
      'Dynamic capsules with tight cardioid pickup to reject untreated room echo and keyboard clicks',
      'Balanced XLR and class-compliant high-bitrate USB-C outputs',
      'High-headroom preamps with transparent gain and negligible noise floor',
      'Physical gain dials with LED peak clipping meters'
    ],
    commonMistakes: [
      'Using highly sensitive condenser microphones in echoey, untreated rooms',
      'Placing studio monitor speakers flush against drywall without acoustic isolation pads',
      'Relying on built-in laptop microphones that pick up fan noise and room hollow reverberation'
    ],
    buyingGuideSummary: 'For podcasting, streaming, and voice calls in regular home offices, dynamic microphones (like the Shure MV7+ or SM7B) provide vastly cleaner vocal isolation than sensitive condenser mics by naturally ignoring room reverberation.',
    faqs: [
      {
        question: 'Should I buy a USB or XLR microphone?',
        answer: 'USB is easiest for plug-and-play simplicity on one computer. Hybrid microphones (USB + XLR) give you the convenience today with the upgrade path to connect to dedicated audio interfaces later.'
      }
    ],
    relatedCategorySlugs: ['headphones', 'office', 'cameras', 'accessories']
  },
  {
    id: 'accessories',
    slug: 'accessories',
    name: 'Accessories',
    pluralName: 'Accessories',
    tagline: 'GaN chargers, Thunderbolt docks & protective travel bags',
    description: 'Wattage power allocation profiles, high-speed thermal dissipation, port throughput standards (USB4 / TB4), and durable water-resistant fabrics.',
    iconName: 'Layers',
    image: heroImg,
    subcategories: ['Multi-Port GaN Chargers', 'Thunderbolt & USB-C Docks', 'Travel Tech Pouches & Backpacks', 'Power Banks & MagSafe', 'Ergonomic Mice & Keyboards'],
    topFeaturesToLookFor: [
      'Gallium Nitride (GaN III) technology for cool, compact high-wattage (100W+) delivery',
      'Intelligent power distribution that doesn’t drop laptop power when plugging in a second phone',
      '10Gbps+ USB-C ports with 4K/60Hz display pass-through',
      'Cordura or weatherproof recycled ballistic nylon exteriors'
    ],
    commonMistakes: [
      'Using slow generic cables that throttle fast charging and drop external monitor connections',
      'Carrying 3 separate heavy power bricks instead of one consolidated compact GaN multi-charger',
      'Purchasing cheap power banks lacking UL safety certification and proper wattage handshakes'
    ],
    buyingGuideSummary: 'A single high-output multi-port GaN charger and a durable braided 240W USB-C cable will streamline your travel bag and desk setup more than any other accessory investment.',
    faqs: [
      {
        question: 'What is GaN and why does it matter for chargers?',
        answer: 'Gallium Nitride (GaN) conducts electricity far more efficiently than traditional silicon, producing less heat and allowing power bricks to be up to 50% smaller while outputting higher wattage safely.'
      }
    ],
    relatedCategorySlugs: ['laptops', 'smartphones', 'headphones', 'office']
  }
];
