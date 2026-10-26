export const INSTRUCTORS = [
  {
    id: 'bora-yilmaz',
    slug: '@borayilmaz',
    name: 'Bora Yılmaz',
    branch: 'Kaykay (Street & Bowl)',
    category: 'Kaykay',
    level: 'Başlangıç & Orta Seviye',
    location: 'Kadıköy (Kalamış)',
    spotName: 'Kalamış Sahil Skatepark & Bowl',
    price: 1200,
    rating: 4.9,
    reviewCount: 42,
    badges: ['Milli Takım', 'Ekipman Dahil', 'İlk Seansa %10 Komisyonlu İşlem'],
    earliestSlot: 'Bugün 16:30',
    liveStatus: "Kalamış Skatepark'ta Seansı Var",
    liveStatusColor: '#10B981',
    experience: '9 Yıl Profesyonel Deneyim',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=700&q=80',
    coverImage: 'https://images.unsplash.com/photo-1520045884218-a66e133d5267?auto=format&fit=crop&w=1000&q=80',
    bio: 'Türkiye Kaykay Şampiyonası podyum dereceli milli sporcu. Kalamış Bowl ve street hatlarında sıfırdan ollie, kickflip ve güvenli drop-in eğitimi.',
    equipmentInfo: 'Tam korumalı kask, dizlik ve profesyonel kaykay ücretsiz sağlanır.',
    paymentNote: 'Öğrenciye 0 TL ek ücret, sahada ödeme',
    availableDays: ['Bugün', 'Yarın', 'Hafta Sonu'],
    timeSlots: ['10:00', '14:00', '16:30'],
    todayStudents: [
      { name: 'Arda G.', time: '14:00', phone: '0532 555 1284', status: 'Onaylandı' },
      { name: 'Selin B.', time: '16:30', phone: '0554 777 4419', status: 'Onaylandı' },
      { name: 'Kaan M.', time: '18:00', phone: '0541 333 9920', status: 'Onaylandı' }
    ]
  },
  {
    id: 'selin-kaya',
    slug: '@selinkaya',
    name: 'Selin Kaya',
    branch: 'Kitesurf & Wingfoil',
    category: 'Kitesurf',
    level: 'Tüm Seviyeler (IKO Lisanslı)',
    location: 'Akyaka (Muğla)',
    spotName: 'Akyaka Gökova Körfezi Sahili',
    price: 1800,
    rating: 5.0,
    reviewCount: 58,
    badges: ['IKO Lisanslı', 'Telsizli Güvenlik Takibi'],
    earliestSlot: 'Yarın 11:00',
    liveStatus: "Akyaka Sahili'nde Seansı Var",
    liveStatusColor: '#00B4D8',
    experience: '7 Yıl Başeğitmen',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    bio: 'Uluslararası IKO Seviye 3 Başeğitmen. Akyaka’nın sabit termik rüzgârında su içi telsizli kask ile güvenli, paniksiz kanat hakimiyeti ve su çıkışı.',
    equipmentInfo: 'Duotone kanatlar, trapez, wetsuit ve telsizli güvenlik kaskı dahildir.',
    paymentNote: 'Öğrenciye 0 TL ek ücret, sahada ödeme',
    availableDays: ['Bugün', 'Yarın', 'Hafta Sonu'],
    timeSlots: ['10:00', '14:00', '16:30'],
    todayStudents: [
      { name: 'Efe D.', time: '11:00', phone: '0533 444 8752', status: 'Onaylandı' },
      { name: 'Melis Y.', time: '14:00', phone: '0542 666 3311', status: 'Onaylandı' }
    ]
  },
  {
    id: 'mert-kaan',
    slug: '@mertkaan',
    name: 'Mert Kaan',
    branch: 'Snowboard (Freestyle & Pist)',
    category: 'Snowboard',
    level: 'Başlangıç & İleri (Snowpark)',
    location: 'Uludağ (Bursa)',
    spotName: 'Uludağ 2. Gelişim Bölgesi & Snowpark',
    price: 2200,
    rating: 4.8,
    reviewCount: 34,
    badges: ['2. Kademe Antrenör', 'Video Analizli Sürüş'],
    earliestSlot: 'Cumartesi 10:00',
    liveStatus: "Uludağ Snowpark'ta",
    liveStatusColor: '#10B981',
    experience: '11 Yıl Deneyim',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
    coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=80',
    bio: 'Türkiye Kayak Federasyonu 2. Kademe Snowboard Antrenörü. Her seans GoPro ile kayıt altına alınarak iniş sonrası slowmotion kenar & duruş analizi yapılır.',
    equipmentInfo: 'Kask ve koruyucu şort eğitmen tarafından temin edilir. Board kiralama desteği verilir.',
    paymentNote: 'Öğrenciye 0 TL ek ücret, sahada ödeme',
    availableDays: ['Bugün', 'Yarın', 'Hafta Sonu'],
    timeSlots: ['10:00', '14:00', '16:30'],
    todayStudents: [
      { name: 'Can P.', time: '10:00', phone: '0535 222 6543', status: 'Onaylandı' },
      { name: 'Zeynep T.', time: '14:00', phone: '0544 888 2190', status: 'Onaylandı' }
    ]
  },
  {
    id: 'arda-cetin',
    slug: '@ardacetin',
    name: 'Arda Çetin',
    branch: 'BMX (Flatland & Street)',
    category: 'BMX',
    level: 'Sıfırdan Başlayan & Akrobasi',
    location: 'Avcılar Skatepark',
    spotName: 'Avcılar Sahil Parkı & Akrobasi Pisti',
    price: 950,
    rating: 4.9,
    reviewCount: 18,
    badges: ['Koruyucu Ekipman Sağlanır'],
    earliestSlot: 'Bugün 18:00',
    liveStatus: "Avcılar Sahil'de",
    liveStatusColor: '#10B981',
    experience: '6 Yıl Deneyim',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
    coverImage: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1000&q=80',
    bio: 'BMX sokak ve rampa sürüşü tutkunu. Denge, bunny hop, rampa girişi ve hava kontrolü çalışmalarında güvenli teknik gelişim programı.',
    equipmentInfo: 'Özel 20 inç BMX bisiklet ve pro-tec dirseklik/kask takımı hazır.',
    paymentNote: 'Öğrenciye 0 TL ek ücret, sahada ödeme',
    availableDays: ['Bugün', 'Yarın', 'Hafta Sonu'],
    timeSlots: ['10:00', '14:00', '16:30'],
    todayStudents: [
      { name: 'Burak A.', time: '16:30', phone: '0530 111 7899', status: 'Onaylandı' }
    ]
  }
];

export const TOP_SPOT_BAR_ITEMS = [
  {
    id: 'kalamis',
    emoji: '🛹',
    spot: 'Kalamış Skatepark',
    statusDot: 'bg-emerald-500',
    statusText: 'Zemin Kuru & Işıklandırma Açık (Seanslara Uygun)',
    locationQuery: 'Kadıköy (Kalamış)'
  },
  {
    id: 'akyaka',
    emoji: '🪁',
    spot: 'Akyaka Sahili',
    statusDot: 'bg-cyan-500',
    statusText: '19 Knot Termik Rüzgâr (Öğleden sonra başlangıç için mükemmel)',
    locationQuery: 'Akyaka (Muğla)'
  },
  {
    id: 'uludag',
    emoji: '🏂',
    spot: 'Uludağ 2. Bölge',
    statusDot: 'bg-blue-500',
    statusText: '45 cm Toz Kar (Pistler ve Liftler Açık)',
    locationQuery: 'Uludağ (Bursa)'
  }
];

export const BRANCH_FILTERS = [
  { id: 'all', label: 'Tümü', icon: '⚡' },
  { id: 'Kaykay', label: 'Kaykay 🛹', icon: '🛹' },
  { id: 'Kitesurf', label: 'Kitesurf 🪁', icon: '🪁' },
  { id: 'Snowboard', label: 'Snowboard 🏂', icon: '🏂' },
  { id: 'BMX', label: 'BMX 🚲', icon: '🚲' }
];

export const SPOT_FILTERS = [
  'Tümü',
  'Kadıköy (Kalamış)',
  'Akyaka (Muğla)',
  'Uludağ (Bursa)',
  'Avcılar Skatepark'
];

export const COMMUNITY_POSTS = [
  {
    id: 1,
    type: 'event',
    author: 'Bora Yılmaz',
    authorRole: 'Milli Kaykay Sporcusu',
    authorAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80',
    badge: 'Duyuru & Atölye',
    title: 'Kalamış Bowl Ücretsiz Denge Atölyesi',
    content: 'Bora Hoca: Bu Pazar 10:00 Kalamış Bowl ücretsiz denge atölyesi. 15 kişi sınırlı.',
    spot: 'Kadıköy Kalamış Skatepark',
    time: '2 saat önce',
    maxCapacity: 15,
    initialAttendees: 11,
    likes: 58,
    comments: 8,
    isJoined: false,
  },
  {
    id: 2,
    type: 'spot_radar',
    author: 'Spot Radarı (Akyaka İstasyonu)',
    authorRole: 'Anlık Rüzgâr Telemetrisi #04',
    authorAvatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80',
    badge: 'Spot Uyarısı',
    title: 'Akyaka Rüzgâr Durumu: 22 Knot',
    content: 'Akyaka Rüzgâr Durumu: Termik rüzgâr 22 knota yükseldi, ileri seviye seanslar için ideal.',
    spot: 'Akyaka Gökova Körfezi',
    time: '15 dakika önce',
    windKnots: 22.0,
    windDirection: 'KB (Kuzeybatı)',
    stats: [
      { label: 'Rüzgâr Hızı', value: '22 Knot (Termik)', highlight: true },
      { label: 'Hava & Sıcaklık', value: '24°C Açık' },
      { label: 'Su & Dalga', value: '0.3m Düz Su' }
    ],
    likes: 84,
    comments: 19,
    isAlert: true,
  },
  {
    id: 3,
    type: 'condition_update',
    author: 'Mert Kaan',
    authorRole: 'Snowboard Koçu',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    badge: 'Kar & Park Raporu',
    title: 'Uludağ 2. Bölge: 45 cm Toz Kar & Liftler Açık',
    content: 'Pistler ezildi, Kuşaklıkaya ve Maden telesiyejleri açık. Öğleden sonra snowpark rampalarında freestyle seanslarına bekliyoruz!',
    spot: 'Bursa Uludağ 2. Gelişim Bölgesi',
    time: '1 saat önce',
    stats: [
      { label: 'Kar Kalınlığı', value: '45 cm (Toz Kar)' },
      { label: 'Sıcaklık', value: '-2°C' },
      { label: 'Lift Durumu', value: 'Tam Kapasite Açık' }
    ],
    likes: 67,
    comments: 12,
  }
];

export const SPOT_WEATHER_DATA = [
  {
    id: 'kalamis',
    name: 'Kadıköy Kalamış Skatepark',
    category: 'Kaykay & BMX',
    status: 'Zemin Kuru & Işıklandırma Açık',
    statusDot: 'bg-emerald-500',
    wind: '8 km/h',
    temp: '21°C',
    surface: 'Pürüzsüz Beton',
    crowd: 'Seanslara Uygun',
    highlight: 'Gece aydınlatmaları 23:00’e kadar aktif',
    bestBranch: 'Kaykay',
    image: 'https://images.unsplash.com/photo-1520045884218-a66e133d5267?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'akyaka',
    name: 'Akyaka Sahili (Gökova Körfezi)',
    category: 'Kitesurf & Wingfoil',
    status: '19-22 Knot Termik Rüzgâr',
    statusDot: 'bg-cyan-500',
    wind: '22 Knot (KB)',
    temp: '24°C',
    wave: '0.3m Düz Su',
    crowd: 'Öğleden Sonra İdeal',
    highlight: 'Sabit termik rüzgâr 18:30’a kadar sürecek',
    bestBranch: 'Kitesurf',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'uludag',
    name: 'Uludağ 2. Gelişim Bölgesi',
    category: 'Snowboard & Kayak',
    status: '45 cm Toz Kar (Pistler Açık)',
    statusDot: 'bg-blue-500',
    wind: '12 km/h',
    temp: '-2°C',
    snowDepth: '45 cm',
    crowd: 'Pistler & Liftler Açık',
    highlight: 'Kuşaklıkaya telesiyeji ve snowpark açık',
    bestBranch: 'Snowboard',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'avcilar',
    name: 'Avcılar Sahil Parkuru',
    category: 'BMX & Street Skate',
    status: 'Zemin Kuru & Rampa Hatları Boş',
    statusDot: 'bg-emerald-500',
    wind: '10 km/h',
    temp: '20°C',
    surface: 'Kuru Asfalt & Rampalar',
    crowd: 'Sakin & Sürüşe Uygun',
    highlight: 'Rampa yüzeyleri temiz, birebir sürüşe müsait',
    bestBranch: 'BMX',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
  }
];
