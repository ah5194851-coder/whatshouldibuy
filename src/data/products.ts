import { Product } from '../types';
import laptopImg from '../assets/images/cat_laptops_showcase_1790354718502.jpg';
import headphoneImg from '../assets/images/cat_headphones_showcase_1790354735596.jpg';
import cameraImg from '../assets/images/cat_cameras_showcase_1790354748549.jpg';
import heroImg from '../assets/images/hero_product_curation_1790354697983.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // LAPTOPS
  {
    id: 'prod-macbook-air-m3',
    slug: 'apple-macbook-air-m3-13',
    name: 'Apple MacBook Air 13-inch (M3)',
    brand: 'Apple',
    category: 'laptops',
    subcategory: 'Thin & Light Ultrabooks',
    image: laptopImg,
    price: 1099,
    originalPrice: 1199,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 1420,
    productUrl: 'https://www.apple.com/macbook-air/',
    affiliateUrl: 'https://amazon.com/dp/B0CX23V253?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 1049, originalPrice: 1199, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0CX23V253?tag=whatshouldibuy-20' },
      { name: 'Best Buy', price: 1099, inStock: true, affiliateUrl: 'https://bestbuy.com/site/macbook-air-m3?tag=whatshouldibuy-20' },
      { name: 'B&H Photo', price: 1079, inStock: true, affiliateUrl: 'https://bhphotovideo.com/c/product/macbook-air-m3?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Processor': 'Apple M3 chip (8-core CPU, 10-core GPU)',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB NVMe SSD',
      'Display': '13.6-inch Liquid Retina (2560x1664), 500 nits, P3 Wide Color',
      'Battery Life': 'Up to 18 hours mixed wireless web',
      'Weight': '2.7 lbs (1.24 kg)',
      'Ports': 'MagSafe 3, 2x Thunderbolt / USB 4, 3.5mm headphone jack',
      'Operating System': 'macOS Sequoia'
    },
    features: [
      'Fanless completely silent thermal architecture under all workloads',
      'Dual external monitor support with laptop display closed',
      'MagSafe fast charging with battery to 50% in 30 minutes',
      'Three-mic array with directional beamforming & 1080p FaceTime HD camera'
    ],
    pros: [
      'Class-leading 15-18 hour real-world battery endurance',
      'Rigid aluminum chassis with flawless hinge balance',
      'Outstanding trackpad and scissor-switch keyboard feel',
      'Maintains 100% processing speed on battery power without throttling'
    ],
    cons: [
      'Memory and internal SSD cannot be upgraded after purchase',
      'Port selection is limited to the left side without native HDMI or SD slot',
      'Supports dual external displays only when lid is clamshell closed'
    ],
    bestFor: 'College students, traveling professionals, and general everyday productivity',
    suitabilityNotes: 'Ideal if you demand silent operation, exceptional build quality, and unmatched unplugged battery life for mobile work.',
    targetPurposes: ['Student + Work', 'Travel / Portability', 'Casual / Home'],
    keyStrengths: ['Battery life', 'Lightweight', 'Quiet operation', 'Color accuracy'],
    warranty: '1-Year Limited Apple Warranty + optional AppleCare+',
    lastUpdated: '2026-09-15',
    isFeatured: true
  },
  {
    id: 'prod-lenovo-yoga-slim-7x',
    slug: 'lenovo-yoga-slim-7x-copilot',
    name: 'Lenovo Yoga Slim 7x (Snapdragon X Elite)',
    brand: 'Lenovo',
    category: 'laptops',
    subcategory: 'Thin & Light Ultrabooks',
    image: laptopImg,
    price: 1199,
    originalPrice: 1299,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 480,
    productUrl: 'https://www.lenovo.com/yoga-slim-7x',
    affiliateUrl: 'https://amazon.com/dp/B0D5N4M8Y?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Lenovo Direct', price: 1149, originalPrice: 1299, inStock: true, affiliateUrl: 'https://lenovo.com/us/en/p/yoga-slim-7x?tag=whatshouldibuy-20' },
      { name: 'Best Buy', price: 1199, inStock: true, affiliateUrl: 'https://bestbuy.com/site/lenovo-yoga-slim-7x?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Processor': 'Qualcomm Snapdragon X Elite (12-core, up to 3.4GHz)',
      'Memory': '16GB LPDDR5X-8448',
      'Storage': '512GB PCIe Gen 4 SSD',
      'Display': '14.5-inch 3K (2944x1840) 90Hz PureSight OLED Touch, 1000 nits peak',
      'Battery Life': 'Up to 16 hours video playback',
      'Weight': '2.82 lbs (1.28 kg)',
      'Ports': '3x USB4 Type-C (40Gbps, Power Delivery 3.1, DP 1.4)',
      'Operating System': 'Windows 11 Home (ARM native)'
    },
    features: [
      'Stunning 3K 90Hz OLED touch display with 100% DCI-P3 color reproduction',
      'Dedicated 45 TOPS NPU for on-device AI acceleration',
      'Quad stereo speakers with Dolby Atmos tuning',
      'Slim 12.9mm profile crafted from aerospace-grade aluminum'
    ],
    pros: [
      'Unmatched Windows battery life rivaling Apple Silicon',
      'Breathtaking high-refresh OLED panel with vibrant colors and deep contrast',
      'Exceptional keyboard ergonomics with concave keycaps',
      'Three full-speed 40Gbps USB4 ports'
    ],
    cons: [
      'Certain legacy x86 kernel-level anti-cheat games are incompatible with ARM',
      'No 3.5mm headphone jack (requires USB-C adapter)',
      'Glossy glass display can exhibit ambient light reflections'
    ],
    bestFor: 'Windows users needing all-day battery life, vivid OLED media viewing, and fast multitasking',
    suitabilityNotes: 'The premier Windows ultraportable for writers, consultants, and remote workers who want MacBook-grade battery with Windows flexibility.',
    targetPurposes: ['Student + Work', 'Creative / Video Editing', 'Travel / Portability'],
    keyStrengths: ['Battery life', 'Color accuracy', 'Lightweight', 'Fast charging'],
    warranty: '1-Year Depot or Carry-in Warranty',
    lastUpdated: '2026-09-18',
    isFeatured: true
  },
  {
    id: 'prod-acer-swift-go-14',
    slug: 'acer-swift-go-14-oled',
    name: 'Acer Swift Go 14 (Intel Core Ultra 7)',
    brand: 'Acer',
    category: 'laptops',
    subcategory: 'Budget Productivity',
    image: laptopImg,
    price: 749,
    originalPrice: 899,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 610,
    productUrl: 'https://www.acer.com/swift-go-14',
    affiliateUrl: 'https://amazon.com/dp/B0CV3N827?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 749, originalPrice: 899, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0CV3N827?tag=whatshouldibuy-20' },
      { name: 'Best Buy', price: 799, inStock: true, affiliateUrl: 'https://bestbuy.com/site/acer-swift-go-14?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Processor': 'Intel Core Ultra 7 155H (16-core, 22-thread, Intel Arc Graphics)',
      'Memory': '16GB LPDDR5X',
      'Storage': '1TB PCIe Gen 4 SSD',
      'Display': '14.0-inch 2.8K (2880x1800) 90Hz OLED, 500 nits, 100% DCI-P3',
      'Battery Life': 'Up to 10.5 hours productivity',
      'Weight': '2.91 lbs (1.32 kg)',
      'Ports': '2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.1, MicroSD card slot, 3.5mm jack',
      'Operating System': 'Windows 11 Home'
    },
    features: [
      'Sub-$800 price point with a gorgeous 2.8K 90Hz OLED screen',
      'Generous 1TB high-speed SSD included at base configuration',
      'Comprehensive port selection avoiding dongles (HDMI + USB-A included)',
      '1440p QHD webcam with temporal noise reduction'
    ],
    pros: [
      'Outstanding price-to-performance ratio',
      'Sharper, richer OLED display than laptops costing $500 more',
      'Full port array eliminates the need for USB hubs',
      'Upgraded Intel Arc integrated graphics handle casual 1080p gaming'
    ],
    cons: [
      'Chassis feel has slight flex compared to unibody MacBooks',
      'Speakers lack deep bass response',
      'Fan spins up audibly during heavy rendering passes'
    ],
    bestFor: 'Budget-conscious professionals, college students, and home office productivity under $800',
    suitabilityNotes: 'Best value recommendation for users who want premium screen quality and 1TB storage without spending four figures.',
    targetPurposes: ['Student + Work', 'Casual / Home', 'Creative / Video Editing'],
    keyStrengths: ['Color accuracy', 'Fast charging', 'Lightweight'],
    warranty: '1-Year Limited International Travelers Warranty',
    lastUpdated: '2026-09-10',
    isFeatured: false
  },
  {
    id: 'prod-asus-rog-zephyrus-g14',
    slug: 'asus-rog-zephyrus-g14-2024',
    name: 'ASUS ROG Zephyrus G14 (RTX 4060)',
    brand: 'ASUS',
    category: 'laptops',
    subcategory: 'Creative Workstations',
    image: laptopImg,
    price: 1599,
    originalPrice: 1699,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 790,
    productUrl: 'https://rog.asus.com/laptops/rog-zephyrus-g14/',
    affiliateUrl: 'https://amazon.com/dp/B0CX25X44?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Best Buy', price: 1549, originalPrice: 1699, inStock: true, affiliateUrl: 'https://bestbuy.com/site/asus-rog-zephyrus-g14?tag=whatshouldibuy-20' },
      { name: 'Amazon', price: 1599, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0CX25X44?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Processor': 'AMD Ryzen 9 8945HS (8-core, 16-thread, up to 5.2GHz)',
      'Graphics': 'NVIDIA GeForce RTX 4060 (8GB GDDR6, 90W TGP)',
      'Memory': '16GB LPDDR5X-6400',
      'Storage': '1TB PCIe 4.0 NVMe M.2 SSD',
      'Display': '14.0-inch 3K (2880x1800) 120Hz 0.2ms ROG Nebula OLED, G-Sync, 500 nits',
      'Battery Life': 'Up to 9 hours light office use',
      'Weight': '3.31 lbs (1.5 kg)',
      'Ports': '1x USB4, 1x USB-C 3.2 Gen 2, 2x USB-A 3.2, HDMI 2.1, MicroSD UHS-II, 3.5mm audio',
      'Operating System': 'Windows 11 Home'
    },
    features: [
      'Precision CNC-milled aluminum chassis with Slash Lighting LED lid array',
      'Sublime 3K 120Hz OLED gaming display with true 0.2ms response time',
      'Tri-fan thermal system with liquid metal compound on CPU',
      'Six-speaker sound system with dual force-canceling woofers'
    ],
    pros: [
      'Remarkable balance of portability (3.3 lbs) and genuine 3D/video power',
      'Reference-grade 120Hz OLED screen with G-Sync support',
      'Superb industrial design that looks professional in boardroom meetings',
      'Surprisingly decent 8-9 hour office battery life on integrated GPU mode'
    ],
    cons: [
      'RAM is soldered and cannot be expanded after purchase',
      'Surface temperatures get hot near the top deck during extended gaming',
      'High price tag compared to plastic gaming notebooks'
    ],
    bestFor: 'Hybrid creators, video editors, 3D artists, and gamers wanting a compact travel companion',
    suitabilityNotes: 'The premier compact laptop for anyone who needs dedicated NVIDIA CUDA GPU acceleration for Premiere, Blender, or high-FPS gaming in a sleek 3.3 lb package.',
    targetPurposes: ['Creative / Video Editing', 'Gaming & Performance', 'Student + Work'],
    keyStrengths: ['Color accuracy', 'Durability', 'Fast charging'],
    warranty: '1-Year Limited ASUS Hardware Warranty',
    lastUpdated: '2026-09-20',
    isFeatured: true
  },

  // SMARTPHONES
  {
    id: 'prod-iphone-16-pro',
    slug: 'apple-iphone-16-pro',
    name: 'Apple iPhone 16 Pro',
    brand: 'Apple',
    category: 'smartphones',
    subcategory: 'Flagship Phones',
    image: heroImg,
    price: 999,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 3100,
    productUrl: 'https://www.apple.com/iphone-16-pro/',
    affiliateUrl: 'https://amazon.com/dp/B0DGH9?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Apple Direct', price: 999, inStock: true, affiliateUrl: 'https://apple.com/iphone-16-pro?tag=whatshouldibuy-20' },
      { name: 'Amazon', price: 999, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0DGH9?tag=whatshouldibuy-20' },
      { name: 'Best Buy', price: 999, inStock: true, affiliateUrl: 'https://bestbuy.com/site/iphone-16-pro?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Processor': 'Apple A18 Pro chip (6-core CPU, 6-core GPU, 16-core NPU)',
      'Display': '6.3-inch Super Retina XDR OLED, 120Hz ProMotion, 2000 nits peak',
      'Rear Cameras': '48MP Fusion (OIS), 48MP Ultra Wide (macro), 12MP 5x Telephoto',
      'Front Camera': '12MP TrueDepth with autofocus',
      'Battery Life': 'Up to 27 hours video playback',
      'Weight': '199 grams (7.02 oz)',
      'Water Resistance': 'IP68 (6 meters up to 30 mins)',
      'Connectivity': 'USB-C (USB 3 up to 10Gbps), Wi-Fi 7, 5G Sub-6/mmWave'
    },
    features: [
      'Grade 5 titanium frame with micro-blasted texture and refined thin borders',
      'Dedicated capacitive Camera Control button with tactile two-stage shutter click',
      '4K 120 fps Dolby Vision video recording with studio-quality 4-mic array',
      '48MP ProRAW photos with zero shutter lag'
    ],
    pros: [
      'Unsurpassed video recording fidelity and microphone wind rejection',
      '5x optical telephoto lens now standard on the compact 6.3-inch body',
      'Smooth 120Hz ProMotion and brilliant 2000-nit outdoor screen',
      'Consistent multi-year software updates and exceptional resale value'
    ],
    cons: [
      'Base model still starts at 128GB storage for $999',
      'Wired charging speeds top out at ~27W (slower than Android flagships)',
      'Camera Control button takes muscle memory adjustment'
    ],
    bestFor: 'Mobile content creators, videographers, and iPhone users seeking top-tier cameras in a pocketable size',
    suitabilityNotes: 'Best overall choice if you value consistent video recording, high resale value, and seamless integration with Mac or iPad.',
    targetPurposes: ['Creative / Video Editing', 'Travel / Portability', 'Casual / Home'],
    keyStrengths: ['Color accuracy', 'Durability', 'Lightweight'],
    warranty: '1-Year Apple Limited Warranty',
    lastUpdated: '2026-09-22',
    isFeatured: true
  },
  {
    id: 'prod-google-pixel-9a',
    slug: 'google-pixel-9a-phone',
    name: 'Google Pixel 8a / 9a',
    brand: 'Google',
    category: 'smartphones',
    subcategory: 'Value Champions ($350–$600)',
    image: heroImg,
    price: 499,
    originalPrice: 549,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 1850,
    productUrl: 'https://store.google.com/product/pixel_8a',
    affiliateUrl: 'https://amazon.com/dp/B0CZNZ123?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 449, originalPrice: 499, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0CZNZ123?tag=whatshouldibuy-20' },
      { name: 'Google Store', price: 499, inStock: true, affiliateUrl: 'https://store.google.com?tag=whatshouldibuy-20' },
      { name: 'Best Buy', price: 449, inStock: true, affiliateUrl: 'https://bestbuy.com/site/pixel-8a?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Processor': 'Google Tensor G3 / G4 with Titan M2 security coprocessor',
      'Display': '6.1-inch Actua OLED (1080x2400), 120Hz, 2000 nits peak',
      'Rear Cameras': '64MP Quad PD main (f/1.89, OIS) + 13MP ultra-wide (120° FOV)',
      'Front Camera': '13MP ultra-wide (f/2.2)',
      'Battery Life': '24+ hour battery with Extreme Battery Saver up to 72 hours',
      'Weight': '188 grams (6.6 oz)',
      'Water Resistance': 'IP67 dust and water resistance',
      'Software Support': '7 full years of OS, security, and Feature Drop updates'
    },
    features: [
      'Guaranteed 7 full years of Android OS and security upgrades until 2031',
      'Class-leading still photography with Real Tone and Night Sight computational algorithms',
      'Smooth 120Hz OLED display with double the outdoor brightness of previous generations',
      'Matte composite back and aluminum frame with wireless charging support'
    ],
    pros: [
      'Unrivaled point-and-shoot camera quality in the sub-$500 category',
      'Industry-leading 7-year software commitment protects your investment',
      'Compact, comfortable ergonomics with rounded tactile corners',
      'Clean Android experience with zero bloatware and outstanding spam call screening'
    ],
    cons: [
      'Charging speed is limited to 18W wired',
      'Display bezels are thicker than flagship phones',
      'Tensor processor runs warm during prolonged heavy 3D gaming'
    ],
    bestFor: 'Anyone wanting flagship-level still photography and 7 years of software longevity under $500',
    suitabilityNotes: 'The smartest smartphone purchase for value-conscious buyers who refuse to sacrifice camera quality or software lifespan.',
    targetPurposes: ['Casual / Home', 'Student + Work', 'Travel / Portability'],
    keyStrengths: ['Durability', 'Color accuracy'],
    warranty: '1-Year Google Hardware Warranty',
    lastUpdated: '2026-09-12',
    isFeatured: true
  },
  {
    id: 'prod-samsung-galaxy-s25',
    slug: 'samsung-galaxy-s25-ultra',
    name: 'Samsung Galaxy S24 / S25 Ultra',
    brand: 'Samsung',
    category: 'smartphones',
    subcategory: 'Flagship Phones',
    image: heroImg,
    price: 1299,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 2200,
    productUrl: 'https://www.samsung.com/galaxy-s24-ultra/',
    affiliateUrl: 'https://amazon.com/dp/B0CS5X?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 1199, originalPrice: 1299, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0CS5X?tag=whatshouldibuy-20' },
      { name: 'Samsung Direct', price: 1299, inStock: true, affiliateUrl: 'https://samsung.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy (4nm, Octa-Core)',
      'Display': '6.8-inch Dynamic AMOLED 2X, 1-120Hz LTPO, 2600 nits, Anti-Reflective Gorilla Armor',
      'Rear Cameras': '200MP Main (OIS) + 50MP 5x Periscope + 10MP 3x Telephoto + 12MP Ultra-wide',
      'Battery': '5,000 mAh (45W fast wired charging, 15W wireless)',
      'Integrated Stylus': 'Built-in S Pen with 2.8ms latency',
      'Weight': '232 grams (8.18 oz)',
      'Support Guarantee': '7 years of Android OS and security upgrades'
    },
    features: [
      'Corning Gorilla Armor reduces ambient surface reflections by 75%',
      'Integrated S Pen for notes, drawing, document signing, and remote camera triggering',
      '200MP sensor capable of 8K video and unmatched zoom clarity up to 30x',
      'Flat front display preventing accidental palm touches and easier screen protector application'
    ],
    pros: [
      'Best-in-class outdoor reflection reduction of any consumer smartphone',
      'Versatile quad-camera system covers every focal length from macro to 100x zoom',
      'Generous 5,000 mAh battery effortlessly lasts a full intensive day',
      'Built-in stylus adds unparalleled productivity for note-takers'
    ],
    cons: [
      'Large, heavy device that can feel cumbersome in tighter pockets',
      'Substantial price tag over $1,200',
      'Shutter lag can occasionally cause slight blur on fast-running pets or kids indoors'
    ],
    bestFor: 'Power users, business travelers, note-takers, and zoom photography enthusiasts',
    suitabilityNotes: 'The ultimate do-everything Android device with unmatched zoom reach and anti-reflective screen technology.',
    targetPurposes: ['Creative / Video Editing', 'Gaming & Performance', 'Student + Work'],
    keyStrengths: ['Color accuracy', 'Durability', 'Battery life', 'Fast charging'],
    warranty: '1-Year Samsung Limited Warranty',
    lastUpdated: '2026-09-17',
    isFeatured: false
  },

  // HEADPHONES
  {
    id: 'prod-sony-wh1000xm5',
    slug: 'sony-wh-1000xm5-headphones',
    name: 'Sony WH-1000XM5 Noise-Canceling Headphones',
    brand: 'Sony',
    category: 'headphones',
    subcategory: 'Over-Ear ANC',
    image: headphoneImg,
    price: 399,
    originalPrice: 429,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 4500,
    productUrl: 'https://www.sony.com/electronics/headband-headphones/wh-1000xm5',
    affiliateUrl: 'https://amazon.com/dp/B09XS7JWHH?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 348, originalPrice: 399, inStock: true, affiliateUrl: 'https://amazon.com/dp/B09XS7JWHH?tag=whatshouldibuy-20' },
      { name: 'Best Buy', price: 349, originalPrice: 399, inStock: true, affiliateUrl: 'https://bestbuy.com/site/sony-wh1000xm5?tag=whatshouldibuy-20' },
      { name: 'B&H Photo', price: 348, inStock: true, affiliateUrl: 'https://bhphotovideo.com/c/product/sony-wh1000xm5?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Acoustic Driver': '30mm carbon fiber composite dome',
      'Active Noise Cancellation': 'Dual-chip processing (Integrated V1 + HD QN1) with 8 microphones',
      'Battery Life': '30 hours with ANC enabled (40 hours with ANC off)',
      'Quick Charging': '3 minutes of USB-PD charging gives 3 hours playback',
      'Bluetooth Codecs': 'LDAC, AAC, SBC (Multipoint 2-device connection)',
      'Weight': '250 grams (8.8 oz)',
      'Microphones': '4 beamforming mics with AI-based noise reduction for calls'
    },
    features: [
      'Auto NC Optimizer dynamically tunes noise cancellation to atmospheric pressure and hair/glasses fit',
      'Soft-fit leatherette headband distributing weight evenly without scalp hotspots',
      'Multipoint connection keeps you paired to phone and laptop simultaneously',
      'Speak-to-Chat automatically pauses playback when you start speaking'
    ],
    pros: [
      'Top-tier active noise cancellation particularly effective against office chatter and airplane roar',
      'Extremely lightweight 250g chassis for 8+ hour fatigue-free listening',
      'Clear, articulate call microphone audio filtering out sirens and cafe noise',
      'Outstanding 30-hour battery life and rapid PD charging'
    ],
    cons: [
      'Does not fold into a compact ball like the older XM4 (carries a larger flat case)',
      'Earcups can get warm in hot summer climates',
      'Default sound profile requires minor EQ tweak in app to reduce slight mid-bass bloom'
    ],
    bestFor: 'Frequent flyers, commuters, open-plan office workers, and long-session listeners',
    suitabilityNotes: 'The gold standard for noise isolation and comfortable travel listening.',
    targetPurposes: ['Travel / Portability', 'Student + Work', 'Casual / Home'],
    keyStrengths: ['Quiet operation', 'Battery life', 'Lightweight', 'Fast charging'],
    warranty: '1-Year Limited Manufacturer Warranty',
    lastUpdated: '2026-09-19',
    isFeatured: true
  },
  {
    id: 'prod-bose-qc-ultra-headphones',
    slug: 'bose-quietcomfort-ultra-headphones',
    name: 'Bose QuietComfort Ultra Headphones',
    brand: 'Bose',
    category: 'headphones',
    subcategory: 'Over-Ear ANC',
    image: headphoneImg,
    price: 429,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 2100,
    productUrl: 'https://www.bose.com/p/headphones/quietcomfort-ultra',
    affiliateUrl: 'https://amazon.com/dp/B0CCZ26F5V?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 379, originalPrice: 429, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0CCZ26F5V?tag=whatshouldibuy-20' },
      { name: 'Bose Direct', price: 429, inStock: true, affiliateUrl: 'https://bose.com?tag=whatshouldibuy-20' },
      { name: 'Best Buy', price: 379, inStock: true, affiliateUrl: 'https://bestbuy.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Acoustic Design': 'Closed-back dynamic over-ear with Bose Immersive Audio spatial DSP',
      'ANC Modes': 'Quiet Mode, Aware Mode (ActiveSense), Immersion Mode',
      'Battery Life': '24 hours (18 hours with Immersive Audio active)',
      'Folding Mechanism': 'Folds flat and collapses inward for compact travel footprint',
      'Weight': '252 grams (8.9 oz)',
      'Connectivity': 'Bluetooth 5.3 with Snapdragon Sound / aptX Adaptive, 2.5mm to 3.5mm wired'
    },
    features: [
      'CustomTune acoustic calibration customizes sound to your unique ear canal geometry',
      'Bose Immersive Audio virtualizes a 3D stage in front of you',
      'Collapsible folding design fits into a significantly smaller travel case than Sony XM5',
      'Physical volume capacitive strip with tactile multi-function buttons'
    ],
    pros: [
      'Supreme comfort with virtually zero clamp fatigue for all head shapes and glasses wearers',
      'Class-leading low-frequency cabin rumble reduction',
      'Folds down into a truly compact travel case',
      'Natural-sounding transparency Aware mode'
    ],
    cons: [
      'Slightly shorter 24-hour battery life compared to Sony (30h) or Sennheiser (60h)',
      'Immersive audio mode drops battery to ~18 hours',
      'High starting price point'
    ],
    bestFor: 'Air travelers and individuals who prioritize folding portability and maximum physical ear comfort',
    suitabilityNotes: 'Choose the Bose if you travel often and need headphones that fold small while offering zero-pressure ergonomic comfort on long flights.',
    targetPurposes: ['Travel / Portability', 'Student + Work'],
    keyStrengths: ['Quiet operation', 'Lightweight', 'Durability'],
    warranty: '1-Year Bose Limited Warranty',
    lastUpdated: '2026-09-14',
    isFeatured: false
  },

  // CAMERAS
  {
    id: 'prod-sony-a6700',
    slug: 'sony-alpha-6700-mirrorless',
    name: 'Sony Alpha 6700 (APS-C Hybrid)',
    brand: 'Sony',
    category: 'cameras',
    subcategory: 'APS-C Compact Hybrids',
    image: cameraImg,
    price: 1398,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 920,
    productUrl: 'https://electronics.sony.com/imaging/interchangeable-lens-cameras/all-interchangeable-lens-cameras/p/ilce6700-b',
    affiliateUrl: 'https://amazon.com/dp/B0CB296X3G?tag=whatshouldibuy-20',
    retailers: [
      { name: 'B&H Photo', price: 1398, inStock: true, affiliateUrl: 'https://bhphotovideo.com/c/product/sony-a6700?tag=whatshouldibuy-20' },
      { name: 'Amazon', price: 1398, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0CB296X3G?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Sensor': '26.0MP APS-C Exmor R BSI CMOS sensor',
      'Processor': 'BIONZ XR + dedicated AI Processing Unit',
      'Autofocus': '759 phase-detection points with AI subject recognition (Humans, Animals, Birds, Insects, Vehicles)',
      'Image Stabilization': '5-axis in-body image stabilization (IBIS, up to 5.0 stops)',
      'Video Capabilities': '4K 60p (oversampled from 6K), 4K 120p (with 1.58x crop), 10-bit 4:2:2 S-Log3, S-Cinetone',
      'Screen': '3.0-inch 1.03M-dot vari-angle articulating touchscreen',
      'Weight': '493 grams (1.09 lbs with battery)'
    },
    features: [
      'Dedicated AI processing unit enables infallible subject tracking even when subjects turn away',
      'Full-size NP-FZ100 battery provides over 550 stills or 100+ minutes of video per charge',
      'Fully articulating vari-angle screen ideal for self-vlogging and awkward angles',
      'Massive Sony E-mount lens selection with hundreds of affordable third-party lenses'
    ],
    pros: [
      'Unsurpassed autofocus speed and subject recognition in its class',
      'In-Body Image Stabilization enables handheld shooting in dim conditions',
      'Exceptional battery life using the pro-grade NP-FZ100 cell',
      'Full 10-bit 4:2:2 internal video grading capabilities'
    ],
    cons: [
      'Single UHS-II SD card slot (no dual card redundancy for critical paid gigs)',
      'Electronic viewfinder is on the smaller side at 2.36M dots',
      '4K 120p mode imposes a significant 1.58x crop factor'
    ],
    bestFor: 'YouTube creators, travel photographers, and hybrid videographers who want pro specs in a compact body',
    suitabilityNotes: 'The best all-round APS-C hybrid camera on the market. Gives you 95% of Sony FX3/A7 IV video features at half the bulk.',
    targetPurposes: ['Creative / Video Editing', 'Travel / Portability'],
    keyStrengths: ['Color accuracy', 'Lightweight', 'Durability'],
    warranty: '1-Year Sony Limited Warranty',
    lastUpdated: '2026-09-16',
    isFeatured: true
  },
  {
    id: 'prod-fujifilm-xt5',
    slug: 'fujifilm-x-t5-camera',
    name: 'Fujifilm X-T5',
    brand: 'Fujifilm',
    category: 'cameras',
    subcategory: 'APS-C Compact Hybrids',
    image: cameraImg,
    price: 1699,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 680,
    productUrl: 'https://fujifilm-x.com/products/cameras/x-t5/',
    affiliateUrl: 'https://amazon.com/dp/B0BKLRW?tag=whatshouldibuy-20',
    retailers: [
      { name: 'B&H Photo', price: 1699, inStock: true, affiliateUrl: 'https://bhphotovideo.com?tag=whatshouldibuy-20' },
      { name: 'Amazon', price: 1699, inStock: true, affiliateUrl: 'https://amazon.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Sensor': '40.2MP X-Trans CMOS 5 HR BSI sensor',
      'Processor': 'X-Processor 5 with deep learning AI subject AF',
      'Image Stabilization': '5-axis In-Body Image Stabilization up to 7.0 stops',
      'Card Slots': 'Dual UHS-II SD card slots',
      'Display': '3-way tilting 1.84M-dot LCD screen',
      'Viewfinder': '3.69M-dot OLED EVF with 0.8x magnification',
      'Film Simulations': '20 classic built-in Fujifilm analog film simulation recipes'
    },
    features: [
      'Tactile analog dials for shutter speed, ISO, and exposure compensation',
      'Legendary Fujifilm Film Simulations generate stunning straight-out-of-camera JPEGs without editing',
      'Massive 40.2MP sensor provides substantial cropping latitude for landscapes and portraits',
      'Dual SD card slots provide peace of mind backup for weddings and events'
    ],
    pros: [
      'Incredible mechanical dial ergonomics that make photography joyful and deliberate',
      'Gorgeous JPEG film simulation color science saves hours in Lightroom',
      'Ultra-sharp 40.2 megapixel resolution',
      'Dual SD card slots for instant in-camera redundancy'
    ],
    cons: [
      'Tilting screen does not flip 180 degrees forward for selfie vlogging',
      'Video autofocus is slightly behind Sony in continuous erratic subject tracking',
      '40MP RAW files are large and require modern computer storage'
    ],
    bestFor: 'Passionate still photographers, street shooters, and travelers who love classic mechanical controls and ready-to-share colors',
    suitabilityNotes: 'If you want to spend less time editing RAW files on a computer and more time enjoying the tactile craft of shooting, this is the camera to buy.',
    targetPurposes: ['Creative / Video Editing', 'Travel / Portability', 'Casual / Home'],
    keyStrengths: ['Color accuracy', 'Durability'],
    warranty: '1-Year Fujifilm Limited Warranty',
    lastUpdated: '2026-09-18',
    isFeatured: false
  },

  // TVs
  {
    id: 'prod-lg-c4-oled',
    slug: 'lg-c4-oled-4k-tv-65',
    name: 'LG C4 Series 65-Inch OLED 4K TV',
    brand: 'LG',
    category: 'tvs',
    subcategory: 'OLED TVs',
    image: heroImg,
    price: 1599,
    originalPrice: 1999,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 1650,
    productUrl: 'https://www.lg.com/us/tvs/lg-oled65c4pua',
    affiliateUrl: 'https://amazon.com/dp/B0CV3N8LG?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 1596, originalPrice: 1999, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0CV3N8LG?tag=whatshouldibuy-20' },
      { name: 'Best Buy', price: 1599, inStock: true, affiliateUrl: 'https://bestbuy.com/site/lg-c4-65?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Panel Type': 'Self-lit OLED evo panel (4K UHD 3840x2160)',
      'Refresh Rate': '144Hz native refresh rate (PC), 120Hz (consoles)',
      'HDR Support': 'Dolby Vision, HDR10, HLG',
      'Processor': 'α9 AI Processor Gen7',
      'Gaming Features': '4x HDMI 2.1 (48Gbps), G-Sync, FreeSync Premium, VRR, ALLM, 0.1ms response',
      'Audio': '40W 2.2 channel with Dolby Atmos & WOW Orchestra support',
      'Smart TV OS': 'webOS 24 with guaranteed 5 years of OS upgrades'
    },
    features: [
      'Self-illuminating pixels produce infinite contrast and absolute ink-black levels without haloing',
      'Full complement of 4 full-bandwidth HDMI 2.1 ports for multiple gaming consoles and PCs',
      'Brightness Booster algorithms produce vivid specular HDR highlights',
      'Ultra-thin gallery design with narrow border bezels'
    ],
    pros: [
      'Perfect black levels and infinite contrast make movie viewing sublime in dim rooms',
      'Unmatched input lag (sub-5ms) and 144Hz PC gaming compatibility',
      'Wide viewing angles with zero color degradation from side seats',
      'Dolby Vision and Dolby Atmos native decoding'
    ],
    cons: [
      'In rooms with direct blazing sunlight striking the screen, reflections can be visible',
      'Internal speakers sound thin without a dedicated soundbar',
      'Slight risk of burn-in if left on static news ticker channels 12 hours a day'
    ],
    bestFor: 'Cinephiles, PS5 / Xbox Series X / PC gamers, and dark-to-medium lit living rooms',
    suitabilityNotes: 'The benchmark TV recommendation for 90% of consumers looking for cinematic picture quality and unrivaled gaming response.',
    targetPurposes: ['Casual / Home', 'Gaming & Performance', 'Creative / Video Editing'],
    keyStrengths: ['Color accuracy', 'Durability'],
    warranty: '1-Year Parts & Labor LG Warranty',
    lastUpdated: '2026-09-21',
    isFeatured: true
  },

  // GAMING
  {
    id: 'prod-steam-deck-oled',
    slug: 'valve-steam-deck-oled-512gb',
    name: 'Valve Steam Deck OLED (512GB)',
    brand: 'Valve',
    category: 'gaming',
    subcategory: 'Handheld PC Gaming',
    image: heroImg,
    price: 549,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 3800,
    productUrl: 'https://store.steampowered.com/steamdeck',
    affiliateUrl: 'https://store.steampowered.com/steamdeck',
    retailers: [
      { name: 'Steam Direct', price: 549, inStock: true, affiliateUrl: 'https://store.steampowered.com/steamdeck' },
      { name: 'Amazon (Reseller)', price: 599, inStock: true, affiliateUrl: 'https://amazon.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'APU': '6nm AMD "Sephiroth" APU (4-core Zen 2, 8 RDNA 2 CUs)',
      'Display': '7.4-inch HDR OLED (1280x800), 90Hz, 1000 nits peak HDR, 110% DCI-P3',
      'Memory': '16GB LPDDR5 RAM at 6400 MT/s',
      'Storage': '512GB NVMe SSD + high-speed microSD slot',
      'Battery': '50Wh battery (3 to 12 hours of gameplay depending on title)',
      'Weight': '640 grams (1.41 lbs)',
      'Controls': 'Dual capacitive thumbsticks, dual trackpads, 4 assignable grip back buttons'
    },
    features: [
      'Breathtaking 90Hz HDR OLED display with pure blacks and vibrant colors',
      'SteamOS instant sleep/wake lets you suspend any PC game instantly and resume without loading',
      'Dual precision touch haptic trackpads for PC strategy, RTS, and mouse-driven games',
      'Wi-Fi 6E module downloads games 2 to 3 times faster'
    ],
    pros: [
      'The best handheld gaming ergonomics and control layout ever engineered',
      'Vivid 90Hz OLED screen transforms indie and AAA games alike',
      'Instant sleep and resume works flawlessly across your existing Steam library',
      'Huge community support and repairable parts through iFixit'
    ],
    cons: [
      'Heaviest modern competitive titles (like CoD with kernel anti-cheat) do not run natively on SteamOS',
      'Bulkier footprint than a Nintendo Switch',
      'Resolution capped at 800p (optimized for battery and frame rates)'
    ],
    bestFor: 'PC gamers wanting to play their Steam backlog on the couch, in bed, or on flights',
    suitabilityNotes: 'The undisputed king of portable PC gaming. Offers unbeatable value, battery longevity, and screen contrast in its category.',
    targetPurposes: ['Gaming & Performance', 'Travel / Portability', 'Casual / Home'],
    keyStrengths: ['Color accuracy', 'Battery life', 'Durability'],
    warranty: '1-Year Valve Limited Hardware Warranty',
    lastUpdated: '2026-09-15',
    isFeatured: true
  },

  // AUDIO & MICROPHONES
  {
    id: 'prod-shure-mv7-plus',
    slug: 'shure-mv7-plus-microphone',
    name: 'Shure MV7+ Podcast & Streamer Microphone',
    brand: 'Shure',
    category: 'audio',
    subcategory: 'Broadcast Microphones',
    image: headphoneImg,
    price: 279,
    originalPrice: 299,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 1400,
    productUrl: 'https://www.shure.com/en-US/products/microphones/mv7plus',
    affiliateUrl: 'https://amazon.com/dp/B0D18P9X3?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 279, originalPrice: 299, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0D18P9X3?tag=whatshouldibuy-20' },
      { name: 'Sweetwater', price: 279, inStock: true, affiliateUrl: 'https://sweetwater.com?tag=whatshouldibuy-20' },
      { name: 'B&H Photo', price: 279, inStock: true, affiliateUrl: 'https://bhphotovideo.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Transducer Type': 'Dynamic (moving coil) with Voice Isolation Technology',
      'Polar Pattern': 'Unidirectional Cardioid',
      'Connectivity': 'Dual USB-C and balanced XLR outputs',
      'Bit Depth / Sample Rate': 'Up to 24-bit / 48kHz',
      'DSP Features': 'Digital Popper Stopper, Real-Time Denoiser, Auto-Level Mode, Reverb',
      'Touch Panel': 'Customizable LED touch bar with mute tap and live gain metering',
      'Construction': 'All-metal die-cast aluminum yoke and barrel'
    },
    features: [
      'Hybrid USB-C and XLR outputs allow plug-and-play today with future mixer upgradeability',
      'Built-in DSP Popper Stopper eliminates harsh plosive "P" pops without bulky external pop filters',
      'Dynamic capsule focuses exclusively on your voice while rejecting keyboard clicks and room echoes',
      'Customizable multi-color LED touch strip allows one-tap mute and visual audio feedback'
    ],
    pros: [
      'Studio broadcast vocal warmth without needing expensive analog preamps',
      'Phenomenal rejection of room reverberation and noisy background fans',
      'Flexible dual USB and XLR connections',
      'Zero-latency direct headphone monitoring'
    ],
    cons: [
      'Requires speaking close to the grille (2 to 4 inches) for full broadcast warmth',
      'Does not include a weighted desk stand in the base box (needs boom arm or tripod)',
      'Higher investment than basic $50 USB mics'
    ],
    bestFor: 'Podcasters, YouTubers, streamers, and remote professionals wanting broadcast-grade voice quality',
    suitabilityNotes: 'The gold standard microphone for home creators. Because it is dynamic, it sounds pristine even in rooms with zero acoustic wall treatment.',
    targetPurposes: ['Creative / Video Editing', 'Student + Work', 'Casual / Home'],
    keyStrengths: ['Quiet operation', 'Durability'],
    warranty: '2-Year Shure Global Warranty',
    lastUpdated: '2026-09-17',
    isFeatured: true
  },

  // OFFICE
  {
    id: 'prod-herman-miller-embody',
    slug: 'herman-miller-embody-ergonomic-chair',
    name: 'Herman Miller Embody Chair',
    brand: 'Herman Miller',
    category: 'office',
    subcategory: 'Ergonomic Task Chairs',
    image: heroImg,
    price: 1795,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 1120,
    productUrl: 'https://store.hermanmiller.com/home-office-chairs/embody-chair',
    affiliateUrl: 'https://store.hermanmiller.com/home-office-chairs/embody-chair?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Herman Miller Store', price: 1795, inStock: true, affiliateUrl: 'https://store.hermanmiller.com?tag=whatshouldibuy-20' },
      { name: 'Design Within Reach', price: 1795, inStock: true, affiliateUrl: 'https://dwr.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Back Support': 'Pixelated Support matrix with dynamic spine articulation',
      'Seat Depth': 'Adjustable 15 to 18 inches with rolling coil edge',
      'Weight Capacity': 'Tested up to 300 lbs (136 kg)',
      'Armrests': '3D adjustable height and width',
      'Tilt': 'Synchronous balanced tilt with 3-stage limiter and tension control',
      'Warranty': '12-year, 3-shift 24/7 warranty including parts and labor',
      'Country of Origin': 'Made in Michigan, USA'
    },
    features: [
      'Biomechanical backrest mimics the human spine to automatically adapt to micro-movements',
      'Pixelated seat matrix evenly distributes pressure to stimulate oxygen flow during long sitting sessions',
      'Pneumatic seat extension rolls smoothly without pinching legs',
      'Backed by an industry-leading 12-year manufacturer warranty'
    ],
    pros: [
      'Eliminates lower back ache and tailbone pressure during 8-12 hour workdays',
      'Exceptional build durability designed to last 15-20+ years',
      'Flexible back allows natural thoracic stretching while seated',
      'Arrives fully assembled in a sturdy crate'
    ],
    cons: [
      'Substantial upfront financial investment',
      'Armrests do not slide forwards and backwards or pivot',
      'No integrated headrest option from the manufacturer'
    ],
    bestFor: 'Software developers, writers, executives, and anyone working 6+ hours at a desk daily',
    suitabilityNotes: 'The single most effective ergonomic investment for preventing chronic lower back fatigue. The 12-year warranty translates to less than $0.42 per day of use.',
    targetPurposes: ['Student + Work', 'Gaming & Performance'],
    keyStrengths: ['Durability'],
    warranty: '12-Year Herman Miller Full Warranty',
    lastUpdated: '2026-09-12',
    isFeatured: true
  },

  // SMARTWATCHES
  {
    id: 'prod-apple-watch-series-10',
    slug: 'apple-watch-series-10',
    name: 'Apple Watch Series 10',
    brand: 'Apple',
    category: 'smartwatches',
    subcategory: 'Everyday Smartwatches',
    image: heroImg,
    price: 399,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 2400,
    productUrl: 'https://www.apple.com/apple-watch-series-10/',
    affiliateUrl: 'https://amazon.com/dp/B0DGJ9X?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 399, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0DGJ9X?tag=whatshouldibuy-20' },
      { name: 'Apple Direct', price: 399, inStock: true, affiliateUrl: 'https://apple.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Case Thickness': '9.7 mm (10% thinner than Series 9)',
      'Display': 'Wide-angle OLED Always-On display (up to 40% brighter off-axis, up to 2000 nits)',
      'Sensors': 'Electrical ECG sensor, optical heart rate, skin temperature, depth gauge to 6m, sleep apnea notifications',
      'Battery Life': 'Up to 18 hours normal use (up to 36 hours in Low Power Mode)',
      'Charging': 'Faster charging: 0 to 80% in approximately 30 minutes',
      'Water Resistance': 'WR50 (swimproof, snorkel certified to 6m)'
    },
    features: [
      'Thinnest Apple Watch casing yet with a significantly larger active screen area than Ultra 2',
      'Wide-angle OLED panel allows checking time and metrics at steep angles without twisting wrist',
      'Sleep apnea breathing disturbance notifications approved by health agencies',
      'Sub-30-minute rapid charging simplifies wearing watch overnight for sleep tracking'
    ],
    pros: [
      'Unsurpassed smartwatch notification triage, voice dictation, and app ecosystem',
      'Noticeably thinner and lighter profile on the wrist during sleep',
      'Faster charging makes daily top-ups effortless during morning showers',
      'Accurate heart rate tracking and sleep staging metrics'
    ],
    cons: [
      'Requires daily charging (cannot match multi-day battery of Garmin watches)',
      'Incompatible with Android smartphones',
      'Aluminum casing is softer than stainless steel or titanium'
    ],
    bestFor: 'iPhone owners seeking the most refined daily health tracker, communicator, and fitness companion',
    suitabilityNotes: 'The premier daily smartwatch experience if you already use an iPhone. The new thin casing and fast charging solve sleep tracking usability.',
    targetPurposes: ['Casual / Home', 'Fitness', 'Student + Work'],
    keyStrengths: ['Lightweight', 'Fast charging'],
    warranty: '1-Year Apple Limited Warranty',
    lastUpdated: '2026-09-20',
    isFeatured: true
  },

  // KITCHEN
  {
    id: 'prod-breville-barista-touch',
    slug: 'breville-barista-touch-espresso',
    name: 'Breville Barista Touch Espresso Machine',
    brand: 'Breville',
    category: 'kitchen',
    subcategory: 'Espresso & Coffee',
    image: heroImg,
    price: 999,
    originalPrice: 1099,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 1530,
    productUrl: 'https://www.breville.com/us/en/products/espresso/bes880.html',
    affiliateUrl: 'https://amazon.com/dp/B078WML5V8?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 999, originalPrice: 1099, inStock: true, affiliateUrl: 'https://amazon.com/dp/B078WML5V8?tag=whatshouldibuy-20' },
      { name: 'Williams Sonoma', price: 999, inStock: true, affiliateUrl: 'https://williams-sonoma.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Heating System': 'ThermoJet heating system (reaches optimal extraction temp in 3 seconds)',
      'Grinder': 'Integrated precision conical burr grinder with 30 fineness settings',
      'Milk Texturing': 'Auto MilQ steam wand with adjustable temperature (113°F - 170°F) and 8 microfoam levels',
      'Interface': 'Full color touchscreen with customizable drink recipe presets',
      'Water Tank': '67 fl oz (2L) with integrated filter',
      'Material': 'Brushed stainless steel construction'
    },
    features: [
      'ThermoJet heating system reaches optimal 200°F extraction temperature in just 3 seconds',
      'Automated microfoam steam wand creates silky latte art texture automatically',
      'Intuitive touchscreen guides beginners through grind size, dose, and extraction duration',
      'Save up to 8 personalized custom coffees with custom icons and names'
    ],
    pros: [
      'Takes the intimidation out of espresso while using genuine 54mm unpressurized baskets',
      '3-second warmup time means zero waiting around in the morning',
      'Remarkably hands-off automatic milk steaming for flat whites and cappuccinos',
      'Saves hundreds of dollars compared to daily $6 cafe visits'
    ],
    cons: [
      'Requires routine descaling and cleaning cycle maintenance',
      'Built-in grinder steps are coarser than standalone $500 single-dose grinders',
      'Countertop footprint requires 13 inches of width and vertical cup clearance'
    ],
    bestFor: 'Coffee enthusiasts wanting cafe-quality lattes and espresso shots at home without barista training',
    suitabilityNotes: 'Strikes the exact sweet spot between manual craft espresso and fully automatic convenience.',
    targetPurposes: ['Casual / Home'],
    keyStrengths: ['Fast charging', 'Durability'],
    warranty: '2-Year Limited Breville Warranty',
    lastUpdated: '2026-09-14',
    isFeatured: true
  },

  // HOME APPLIANCES
  {
    id: 'prod-roborock-qrevo-maxv',
    slug: 'roborock-qrevo-maxv-robot-vacuum',
    name: 'Roborock Q Revo MaxV Robot Vacuum & Mop',
    brand: 'Roborock',
    category: 'home-appliances',
    subcategory: 'Robot Vacuums & Mops',
    image: heroImg,
    price: 999,
    originalPrice: 1199,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 880,
    productUrl: 'https://us.roborock.com/pages/roborock-qrevo-maxv',
    affiliateUrl: 'https://amazon.com/dp/B0CSB45V8?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 999, originalPrice: 1199, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0CSB45V8?tag=whatshouldibuy-20' },
      { name: 'Best Buy', price: 999, inStock: true, affiliateUrl: 'https://bestbuy.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Suction Power': '7,000 Pa HyperForce suction',
      'Mopping System': 'Dual spinning mops (200 RPM) with FlexiArm edge extension',
      'Dock Features': 'Hot water (140°F) mop washing, warm air drying, auto dust emptying, auto tank refill',
      'Obstacle Avoidance': 'Reactive AI camera with RGB visual recognition and structured light',
      'Navigation': 'PreciSense LiDAR with multi-floor 3D mapping',
      'Mop Auto-Lifting': '10mm automatic mop lift over carpets'
    },
    features: [
      'FlexiArm technology extends the right spinning mop outward to clean flush against baseboards',
      'Hot water mop washing dissolves kitchen grease and prevents mold and sour odors in the dock',
      'Reactive AI camera recognizes pet toys, cables, and shoes to navigate around them safely',
      'Up to 7 weeks of completely hands-free hands-off automated floor maintenance'
    ],
    pros: [
      'Genuinely hands-off floor cleaning with self-washing, hot air drying, and auto-dust emptying',
      'Exceptional edge mopping clears the 1-inch perimeter dead zone typical of other robots',
      'Intelligent carpet auto-lift prevents damp rugs',
      'Quiet operation on standard suction modes'
    ],
    cons: [
      'Multi-function docking station requires dedicated floor space and wall outlet clearance',
      'Dirty water tank must be emptied every 4-7 days to prevent odor accumulation',
      'Initial mapping and setup requires 20-30 minutes'
    ],
    bestFor: 'Pet owners, families with hard floors, and busy households wanting automated daily clean floors',
    suitabilityNotes: 'The best all-in-one vacuum and mop station under $1,000. Hot water cleaning and edge-reaching arms make older robot vacuums obsolete.',
    targetPurposes: ['Casual / Home'],
    keyStrengths: ['Quiet operation', 'Durability'],
    warranty: '1-Year Roborock Limited Warranty',
    lastUpdated: '2026-09-19',
    isFeatured: true
  },

  // FITNESS
  {
    id: 'prod-theragun-prime',
    slug: 'therabody-theragun-prime-gen5',
    name: 'Therabody Theragun Prime (5th Gen)',
    brand: 'Therabody',
    category: 'fitness',
    subcategory: 'Percussive Massage Guns',
    image: heroImg,
    price: 299,
    originalPrice: 329,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 1720,
    productUrl: 'https://www.therabody.com/us/en-us/theragun-prime.html',
    affiliateUrl: 'https://amazon.com/dp/B0BDGW7?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 279, originalPrice: 299, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0BDGW7?tag=whatshouldibuy-20' },
      { name: 'Therabody Direct', price: 299, inStock: true, affiliateUrl: 'https://therabody.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Amplitude': '16mm percussive stroke depth',
      'Stall Force': '30 lbs of no-stall force',
      'Speeds': '5 built-in speed presets (1750, 1900, 2100, 2200, 2400 PPM) + app customizable',
      'Handle Design': 'Patented ergonomic multi-grip triangle handle',
      'Battery Life': '120 minutes continuous runtime (USB-C charging)',
      'Attachments': '4 closed-cell foam attachments (Dampener, Standard Ball, Thumb, Micro-point)'
    },
    features: [
      'True 16mm percussive amplitude reaches 60% deeper into muscle tissue than vibrating guns',
      'Patented triangle ergonomic handle reduces wrist and forearm strain by up to 50%',
      'Bluetooth connectivity pairs with Therabody app for guided recovery routines',
      'Universal USB-C charging eliminates bulky proprietary power bricks'
    ],
    pros: [
      'Deep, therapeutic stroke depth effectively relieves post-workout soreness and tight hamstrings',
      'Ergonomic triangle shape lets you reach your mid-back without contorting',
      'Durable proprietary brushless motor with QuietForce technology',
      'Sturdy travel pouch and high-grade foam attachments'
    ],
    cons: [
      'Louder than weak vibrating massage guns due to heavy 16mm mechanical stroke',
      'Firm percussive punch may feel intense for sensitive or elderly users',
      'Battery is internal and non-swappable'
    ],
    bestFor: 'Runners, weightlifters, active individuals, and anyone suffering from chronic desk neck and back tension',
    suitabilityNotes: 'Avoids cheap surface vibration toys by delivering legitimate 16mm physical muscle stroke depth for genuine myofascial release.',
    targetPurposes: ['Fitness', 'Casual / Home'],
    keyStrengths: ['Durability', 'Fast charging'],
    warranty: '1-Year Therabody Limited Warranty',
    lastUpdated: '2026-09-11',
    isFeatured: true
  },

  // ACCESSORIES
  {
    id: 'prod-anker-prime-100w-gan',
    slug: 'anker-prime-100w-gan-wall-charger',
    name: 'Anker Prime 100W GaN Wall Charger (3-Port)',
    brand: 'Anker',
    category: 'accessories',
    subcategory: 'Multi-Port GaN Chargers',
    image: heroImg,
    price: 84,
    originalPrice: 99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 3100,
    productUrl: 'https://www.anker.com/products/a2668',
    affiliateUrl: 'https://amazon.com/dp/B0C477?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 69, originalPrice: 84, inStock: true, affiliateUrl: 'https://amazon.com/dp/B0C477?tag=whatshouldibuy-20' },
      { name: 'Anker Direct', price: 84, inStock: true, affiliateUrl: 'https://anker.com?tag=whatshouldibuy-20' }
    ],
    specifications: {
      'Total Output': '100W Max',
      'Port Configuration': '2x USB-C (Power Delivery 3.0 / PPS), 1x USB-A (PowerIQ 4.0)',
      'Single Port Max': 'USB-C1 / USB-C2 up to 100W (charges a 16-inch MacBook Pro or Dell XPS)',
      'Dimensions': '1.7 x 1.5 x 2.4 inches (43% smaller than original 96W Apple brick)',
      'Safety System': 'ActiveShield 2.0 temperature monitoring 3,000,000 times per day',
      'Prongs': 'Foldable travel prongs'
    },
    features: [
      'GaN III technology delivers 100W in a compact palm-sized travel form factor',
      'Smart dynamic power allocation adjusts wattage on the fly as devices charge',
      'Capable of charging a laptop, smartphone, and earbuds simultaneously from one wall outlet',
      'Foldable prongs prevent scratching other electronics in your backpack'
    ],
    pros: [
      'Replaces three bulky individual power bricks in one compact device',
      'Powers 13-inch and 15-inch laptops at full charging speed',
      'Runs cool and stable under sustained 100W loads',
      'Stays firmly seated in loose hotel wall sockets'
    ],
    cons: [
      'Does not include a 100W USB-C cable in the box (must buy cable separately)',
      'Plugging in a secondary device triggers a momentary 1-second power renegotiation'
    ],
    bestFor: 'Frequent travelers, digital nomads, and desk minimalists wanting one charger for phone, laptop, and tablet',
    suitabilityNotes: 'The highest utility tech accessory you can buy. Shrinks your daily tech pouch by half while charging your laptop and phone at top speed.',
    targetPurposes: ['Travel / Portability', 'Student + Work', 'Casual / Home'],
    keyStrengths: ['Lightweight', 'Fast charging', 'Durability'],
    warranty: '24-Month Anker Hassle-Free Warranty',
    lastUpdated: '2026-09-21',
    isFeatured: true
  }
];
