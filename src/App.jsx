import React, { useState, useMemo } from 'react';
import { 
  INSTRUCTORS, 
  TOP_SPOT_BAR_ITEMS, 
  BRANCH_FILTERS, 
  SPOT_FILTERS, 
  COMMUNITY_POSTS, 
  SPOT_WEATHER_DATA 
} from './data/mockData';
import { 
  Zap, 
  Search, 
  Compass, 
  Radio, 
  CloudSun, 
  UserCheck, 
  MapPin, 
  SlidersHorizontal, 
  CheckCircle, 
  Flame, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Waves, 
  RotateCcw, 
  X, 
  Calendar, 
  User, 
  Phone, 
  CheckCircle2, 
  Package, 
  MessageSquare, 
  AlertCircle, 
  Loader2, 
  Gauge, 
  CreditCard, 
  Copy, 
  Check, 
  AlertTriangle, 
  Link as LinkIcon, 
  Users, 
  Heart, 
  Send, 
  Thermometer, 
  Wind, 
  Activity,
  Menu,
  Plus,
  Bell,
  RefreshCw,
  Award,
  TrendingUp,
  CheckCheck
} from 'lucide-react';

export default function App() {
  // User Role Simulation: 'student' (Öğrenci) | 'instructor' (Eğitmen)
  const [userRole, setUserRole] = useState('student');
  
  // Navigation & View state: 'explore' | 'community' | 'weather' | 'instructor_portal'
  const [activeTab, setActiveTab] = useState('explore');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSpot, setSelectedSpot] = useState('Tümü');

  // Booking Modal State (Canlı Seans Rezervasyonu)
  const [selectedInstructorForBooking, setSelectedInstructorForBooking] = useState(null);
  const [bookingStep1Day, setBookingStep1Day] = useState('Bugün');
  const [bookingStep1Time, setBookingStep1Time] = useState('16:30');
  const [bookingStep2Level, setBookingStep2Level] = useState('Sıfırdan Başlayan');
  const [bookingStep3Equipment, setBookingStep3Equipment] = useState('included');
  const [bookingStep4Name, setBookingStep4Name] = useState('');
  const [bookingStep4Phone, setBookingStep4Phone] = useState('');
  const [bookingErrorMsg, setBookingErrorMsg] = useState('');
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingConfirmedData, setBookingConfirmedData] = useState(null);

  // Instructor Management Portal State
  const [isInstructorPortalOpen, setIsInstructorPortalOpen] = useState(false);
  const [activePortalInstructorId, setActivePortalInstructorId] = useState(INSTRUCTORS[0].id);
  const [isCopiedBioLink, setIsCopiedBioLink] = useState(false);
  const [emergencyCancelled, setEmergencyCancelled] = useState(false);

  // Community Feed State & Interactive Form
  const [communityFeed, setCommunityFeed] = useState(COMMUNITY_POSTS);
  const [commentInputs, setCommentInputs] = useState({});
  const [activeCommentsPostId, setActiveCommentsPostId] = useState(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Duyuru & Atölye');
  const [newPostSpot, setNewPostSpot] = useState('Kadıköy Kalamış Skatepark');

  // Global Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // Dynamic Instructor Filtering
  const filteredInstructors = useMemo(() => {
    return INSTRUCTORS.filter((inst) => {
      // Branch filter
      const matchesBranch = 
        selectedBranch === 'all' || 
        inst.category.toLowerCase() === selectedBranch.toLowerCase() ||
        inst.branch.toLowerCase().includes(selectedBranch.toLowerCase());

      // Spot filter
      const matchesSpot = 
        selectedSpot === 'Tümü' || 
        inst.location.toLowerCase() === selectedSpot.toLowerCase() ||
        inst.spotName.toLowerCase().includes(selectedSpot.toLowerCase());

      // Search query filter
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = 
        !q || 
        inst.name.toLowerCase().includes(q) ||
        inst.branch.toLowerCase().includes(q) ||
        inst.location.toLowerCase().includes(q) ||
        inst.spotName.toLowerCase().includes(q) ||
        inst.badges.some(b => b.toLowerCase().includes(q)) ||
        (inst.level && inst.level.toLowerCase().includes(q));

      return matchesBranch && matchesSpot && matchesSearch;
    });
  }, [selectedBranch, selectedSpot, searchQuery]);

  // Handle Booking Confirmation
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!bookingStep4Name.trim()) {
      setBookingErrorMsg('Lütfen ad ve soyadınızı girin.');
      return;
    }
    if (!bookingStep4Phone.trim() || bookingStep4Phone.trim().length < 10) {
      setBookingErrorMsg('Lütfen geçerli bir telefon numarası girin (Örn: 05xx xxx xxxx).');
      return;
    }

    setBookingErrorMsg('');
    setIsBookingLoading(true);

    // Simulate calendar lock and dual notification dispatch
    setTimeout(() => {
      setIsBookingLoading(false);
      const randomCode = 'RP-' + Math.floor(1000 + Math.random() * 9000);
      const confData = {
        code: randomCode,
        instructorName: selectedInstructorForBooking.name,
        branch: selectedInstructorForBooking.branch,
        day: bookingStep1Day,
        time: bookingStep1Time,
        level: bookingStep2Level,
        equipment: bookingStep3Equipment === 'included' ? 'Hocadan Temin Edilecek (Dahil)' : 'Kendi Ekipmanını Getirecek',
        studentName: bookingStep4Name,
        phone: bookingStep4Phone,
        price: selectedInstructorForBooking.price
      };
      setBookingConfirmedData(confData);
      showToast(`🎉 ${confData.studentName}, ${confData.instructorName} ile seansınız başarıyla onaylandı!`);
    }, 900);
  };

  const handleCloseBookingModal = () => {
    setSelectedInstructorForBooking(null);
    setBookingConfirmedData(null);
    setBookingErrorMsg('');
  };

  // Copy Bio Link Handler (riderpass.app/@...)
  const handleCopyBioLink = (slug) => {
    const cleanSlug = slug.startsWith('@') ? slug : `@${slug}`;
    const linkText = `https://riderpass.app/${cleanSlug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(linkText);
    }
    setIsCopiedBioLink(true);
    showToast(`📋 Instagram biyosu için link kopyalandı: ${linkText}`);
    setTimeout(() => setIsCopiedBioLink(false), 2500);
  };

  // Community RSVP Handler (+1 Katılıyorum)
  const handleToggleRSVP = (postId) => {
    setCommunityFeed(prev => prev.map(post => {
      if (post.id === postId && post.type === 'event') {
        const currentlyJoined = post.isJoined;
        const newCount = currentlyJoined 
          ? post.initialAttendees - 1 
          : post.initialAttendees + 1;

        if (!currentlyJoined) {
          showToast(`🛹 Harika! ${post.title} atölyesine kaydınız alındı (+1 eklendi).`);
        } else {
          showToast(`Kaydınız geri çekildi.`);
        }

        return {
          ...post,
          isJoined: !currentlyJoined,
          initialAttendees: newCount
        };
      }
      return post;
    }));
  };

  // Community Like Handler
  const handleToggleLike = (postId) => {
    setCommunityFeed(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.userLiked;
        return {
          ...post,
          userLiked: !isLiked,
          likes: isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // New Post Submission in Community Feed
  const handleCreateNewPost = (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      showToast('⚠️ Lütfen başlık ve mesaj içeriğini doldurun.');
      return;
    }

    const newPostObj = {
      id: Date.now(),
      type: newPostCategory.includes('Atölye') ? 'event' : 'condition_update',
      author: userRole === 'instructor' ? 'Bora Yılmaz' : 'Caner Yılmaz',
      authorRole: userRole === 'instructor' ? 'Milli Kaykay Sporcusu & Eğitmen' : 'RiderPass Sporcusu',
      authorAvatar: userRole === 'instructor'
        ? 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      badge: newPostCategory,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      spot: newPostSpot,
      time: 'Az önce',
      maxCapacity: 20,
      initialAttendees: 1,
      likes: 1,
      comments: 0,
      isJoined: true,
      userLiked: true
    };

    setCommunityFeed([newPostObj, ...communityFeed]);
    setNewPostTitle('');
    setNewPostContent('');
    setIsCreatePostOpen(false);
    showToast('🚀 Yeni duyurunuz RiderPass topluluk akışında yayınlandı!');
  };

  const activePortalInstructor = INSTRUCTORS.find(i => i.id === activePortalInstructorId) || INSTRUCTORS[0];

  return (
    <div className="min-h-screen bg-white bg-studio-pattern text-[#0F172A] flex flex-col justify-between selection:bg-[#FF5500] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <aside 
          aria-label="Bildirimler"
          className="fixed top-24 right-6 z-50 bg-[#0F172A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in max-w-md border border-slate-700/80"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 stroke-[2.5]" />
          <span className="text-xs sm:text-sm font-bold leading-snug">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-auto text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}

      {/* =========================================================================
          1. CANLI SPOT VE HAVA DURUMU DURUM ÇUBUĞU (EN ÜST KISIM)
          Kalamış Skatepark (zemin kuru), Akyaka (19 knot rüzgâr), Uludağ (45 cm kar)
         ========================================================================= */}
      <div className="w-full bg-[#F8FAFC] border-b border-slate-200/90 py-2.5 px-4 text-xs font-semibold text-slate-700 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          
          <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-slate-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              CANLI SPOT BARI:
            </span>
          </div>

          {/* 3 Ana Spot Bilgisi */}
          <div className="flex items-center gap-4 sm:gap-7 shrink-0">
            
            {/* Kalamış Skatepark (zemin kuru) */}
            <button 
              onClick={() => {
                setSelectedSpot('Kadıköy (Kalamış)');
                setActiveTab('explore');
              }}
              className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer transition-colors group text-left"
              title="Kalamış seanslarını filtrele"
            >
              <span className="text-base">🛹</span>
              <span className="font-black text-slate-900 group-hover:text-[#FF5500] transition-colors">
                Kalamış Skatepark:
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-bold text-emerald-700">Zemin Kuru</span>
                <span className="text-slate-500 text-[11px] hidden md:inline">(Seanslara Uygun)</span>
              </span>
            </button>

            {/* Akyaka (19 knot rüzgâr) */}
            <button 
              onClick={() => {
                setSelectedSpot('Akyaka (Muğla)');
                setActiveTab('explore');
              }}
              className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer transition-colors group text-left"
              title="Akyaka seanslarını filtrele"
            >
              <span className="text-base">🪁</span>
              <span className="font-black text-slate-900 group-hover:text-[#FF5500] transition-colors">
                Akyaka:
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                <span className="font-bold text-cyan-800">19 Knot Rüzgâr</span>
                <span className="text-slate-500 text-[11px] hidden md:inline">(Termik Başlangıç İdeal)</span>
              </span>
            </button>

            {/* Uludağ (45 cm kar) */}
            <button 
              onClick={() => {
                setSelectedSpot('Uludağ (Bursa)');
                setActiveTab('explore');
              }}
              className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer transition-colors group text-left"
              title="Uludağ seanslarını filtrele"
            >
              <span className="text-base">🏂</span>
              <span className="font-black text-slate-900 group-hover:text-[#FF5500] transition-colors">
                Uludağ:
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <span className="font-bold text-blue-700">45 cm Kar</span>
                <span className="text-slate-500 text-[11px] hidden md:inline">(Toz Kar &amp; Liftler Açık)</span>
              </span>
            </button>

          </div>

          <button 
            onClick={() => setActiveTab('weather')}
            className="hidden lg:flex items-center gap-1 text-[11px] font-black text-slate-600 hover:text-[#FF5500] transition-colors shrink-0 pl-3 border-l border-slate-200 cursor-pointer"
          >
            Radar Telemetrisi
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Role Banner Notification if Instructor Mode Active */}
      {userRole === 'instructor' && (
        <div className="w-full bg-[#0F172A] text-white py-2 px-4 text-xs font-semibold border-b border-slate-800 animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#FF5500] text-white text-[10px] font-black uppercase tracking-wider">
                EĞİTMEN MODU AKTİF
              </span>
              <span className="text-slate-200 font-bold hidden sm:inline">
                {activePortalInstructor.name} ({activePortalInstructor.branch}) • riderpass.app/{activePortalInstructor.slug}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsInstructorPortalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Sekreterlik &amp; Kota Masası</span>
              </button>
              <button 
                onClick={() => {
                  setUserRole('student');
                  showToast('🎓 Öğrenci moduna geçildi.');
                }}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
              >
                Öğrenci Görünümüne Dön
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. NAVBAR & ROL DEĞİŞTİRME SİMÜLASYONU
         ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/90 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3">
            
            {/* Sol: RiderPass Logosu */}
            <div 
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF5500] to-amber-500 p-[2px] shadow-sm group-hover:shadow-md transition-all">
                <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#0F172A] flex items-center">
                  Rider<span className="text-[#FF5500]">Pass</span>
                  <span className="ml-1.5 text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hidden sm:inline-block">
                    MVP
                  </span>
                </span>
                <span className="text-[10px] tracking-wide text-slate-500 font-bold -mt-0.5 hidden sm:block">
                  Ekstrem Spor Pazaryeri &amp; Canlı Takvim
                </span>
              </div>
            </div>

            {/* Orta Sekmeler: 'Eğitmen Keşfi' ve 'Topluluk & Spot Akışı' */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-[#F8FAFC] p-1.5 rounded-2xl border border-slate-200/80">
              {[
                { id: 'explore', label: 'Eğitmen Keşfi', icon: Compass },
                { id: 'community', label: 'Topluluk & Spot Akışı', icon: Radio, badge: 'Canlı' },
                { id: 'weather', label: 'Spot Radarı', icon: CloudSun }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`nav-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF5500]' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className="text-[10px] uppercase font-black px-1.5 py-0.2 rounded-full bg-emerald-500 text-white shadow-xs">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sağ: Arama ve Rol Değiştirme / Giriş Yap Simülasyonu */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Hoca, spot veya branş ara..."
                  className="w-44 lg:w-52 pl-9 pr-3.5 py-2 bg-slate-100/90 border border-slate-200 focus:bg-white focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* ROL DEĞİŞTİRME SİMÜLASYONU ('Giriş Yap') */}
              <div className="flex items-center bg-[#F8FAFC] border border-slate-200 p-1 rounded-2xl shadow-xs">
                <button
                  id="role-switch-student"
                  onClick={() => {
                    setUserRole('student');
                    showToast('🎓 Öğrenci hesabı aktif: 0 TL komisyonla ders ayırtabilirsiniz.');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    userRole === 'student'
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Öğrenci Modu"
                >
                  <User className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Öğrenci</span>
                </button>

                <button
                  id="role-switch-instructor"
                  onClick={() => {
                    setUserRole('instructor');
                    setIsInstructorPortalOpen(true);
                    showToast('🛹 Eğitmen Portalı aktif: Instagram linki ve freemium kota paneli açıldı.');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    userRole === 'instructor'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Eğitmen Modu"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Eğitmen Paneli</span>
                </button>
              </div>

            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => {
                  setUserRole(userRole === 'student' ? 'instructor' : 'student');
                  if (userRole === 'student') setIsInstructorPortalOpen(true);
                }}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                  userRole === 'instructor' ? 'bg-[#FF5500] text-white' : 'bg-[#0F172A] text-white'
                }`}
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">{userRole === 'student' ? 'Hoca Girişi' : 'Panel'}</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200"
                aria-label="Menü"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 space-y-3 animate-fade-in">
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Hoca, spot veya branş ara..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'explore', label: 'Eğitmen Keşfi', icon: Compass },
                  { id: 'community', label: 'Topluluk & Spot Akışı', icon: Radio, badge: 'Canlı' },
                  { id: 'weather', label: 'Spot Radarı', icon: CloudSun }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold ${
                        isActive 
                          ? 'bg-[#FF5500] text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </span>
                      {tab.badge && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-bold">Aktif Rol: {userRole === 'student' ? 'Öğrenci' : 'Eğitmen'}</span>
                <button
                  onClick={() => {
                    const next = userRole === 'student' ? 'instructor' : 'student';
                    setUserRole(next);
                    if (next === 'instructor') setIsInstructorPortalOpen(true);
                  }}
                  className="font-black text-[#FF5500] underline"
                >
                  Rolü Değiştir
                </button>
              </div>
            </div>
          )}

        </div>
      </header>

      {/* =========================================================================
          MAIN CONTENT AREA
         ========================================================================= */}
      <main className="flex-1">
        
        {/* =========================================================================
            TAB 1: EĞİTMEN KEŞFİ & DİNAMİK FİLTRELEME & RANDEVU
           ========================================================================= */}
        {activeTab === 'explore' && (
          <div>
            {/* Hero Alanı: 'Hocanı Keşfet. Spotu Seç. Seansını Anında Ayarla.' */}
            <section className="relative pt-10 pb-6 sm:pt-16 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-black text-slate-800 mb-6 shadow-xs">
                  <Flame className="w-4 h-4 text-[#FF5500]" />
                  <span>RIDERPASS • CANLI DERS VE SPORCU PAZARYERİ</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <h1 
                  id="hero-main-title" 
                  className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#0F172A] leading-[1.08] mb-6"
                >
                  Hocanı Keşfet.{' '}
                  <span className="text-[#FF5500]">
                    Spotu Seç.
                  </span>{' '}
                  <span className="text-slate-900">
                    Seansını Anında Ayarla.
                  </span>
                </h1>

                <p className="text-[#475569] text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto mb-8">
                  Mesaj trafiği ve belirsizlik yok; eğitmenlerin canlı takviminden boş saatini seçip 30 saniyede dersini ayırt.
                </p>

                {/* Guarantees badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600 mb-8">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Öğrenciye 0 TL Ek Ücret</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs">
                    <CheckCircle className="w-4 h-4 text-[#FF5500]" />
                    <span>Hava Muhalefetinde İade/Erteleme Garantisi</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-xs">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Tüm Seviyeler İçin Ekipman Temini</span>
                  </div>
                </div>
              </div>

              {/* Dinamik Filtreleme Kartı */}
              <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs text-left">
                {/* Branş Filtreleri */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#FF5500]" /> BRANŞ SEÇİMİ
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                      {filteredInstructors.length} uzman eğitmen aktif
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                    {BRANCH_FILTERS.map((branch) => {
                      const isSelected = selectedBranch === branch.id;
                      return (
                        <button
                          key={branch.id}
                          id={`filter-branch-${branch.id}`}
                          onClick={() => setSelectedBranch(branch.id)}
                          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-[#FF5500] text-white shadow-neon-orange scale-[1.02]'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs hover:border-slate-300'
                          }`}
                        >
                          <span className="text-base">{branch.icon}</span>
                          <span>{branch.label.replace(/[🛹🪁🏂🚲]/g, '').trim()}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Spot Filtreleri */}
                <div className="pt-4 border-t border-slate-200/80">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-emerald-600" /> SPOT &amp; LOKASYON SEÇİMİ
                  </div>
                  
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {SPOT_FILTERS.map((loc) => {
                      const isSelected = selectedSpot === loc;
                      return (
                        <button
                          key={loc}
                          id={`filter-spot-${loc.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => setSelectedSpot(loc)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-[#0F172A] text-white shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-xs'
                          }`}
                        >
                          <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                          <span>{loc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </section>

            {/* Eğitmen Kartları Listesi */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-24">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight flex items-center gap-2.5">
                    <Flame className="w-6 h-6 text-[#FF5500]" />
                    <span>Öne Çıkan Branş Eğitmenleri</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    Lisanslı ve onaylı ekstrem sporculardan birebir canlı takvimli seanslar.
                  </p>
                </div>

                {(selectedBranch !== 'all' || selectedSpot !== 'Tümü' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedBranch('all');
                      setSelectedSpot('Tümü');
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Filtreleri Sıfırla</span>
                  </button>
                )}
              </div>

              {filteredInstructors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
                  {filteredInstructors.map((instructor) => {
                    const isWaterSport = instructor.category === 'Kitesurf';

                    return (
                      <div 
                        key={instructor.id}
                        className="group relative bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Top Cover Image & Overlays */}
                        <div className="relative">
                          <div className="h-56 w-full overflow-hidden relative bg-slate-100">
                            <img 
                              src={instructor.coverImage} 
                              alt={instructor.spotName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            
                            {/* Live Status Badge */}
                            <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md border border-emerald-200 text-slate-900 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-2 shadow-xs">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="tracking-tight font-black text-slate-800">{instructor.liveStatus}</span>
                            </div>

                            {/* En Yakın Boş Seans Saati */}
                            <div className="absolute top-3.5 right-3.5 bg-black/65 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 border border-white/10">
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>En Yakın: {instructor.earliestSlot}</span>
                            </div>
                          </div>

                          {/* Profile Avatar Overlap */}
                          <div className="px-6 -mt-12 flex items-end justify-between relative z-10">
                            <div className="relative">
                              <div className="w-22 h-22 rounded-2xl overflow-hidden border-3 border-white shadow-md bg-white">
                                <img 
                                  src={instructor.image} 
                                  alt={instructor.name} 
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <div 
                                className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-xs border-2 border-white" 
                                title="Onaylı Lisanslı Eğitmen"
                              >
                                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                              </div>
                            </div>

                            {/* Rating & Reviews */}
                            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              <span className="text-sm font-black text-slate-900">{instructor.rating}</span>
                              <span className="text-xs text-slate-500 font-semibold">({instructor.reviewCount} ders)</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="mt-1">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="text-xl font-black text-[#0F172A] group-hover:text-[#FF5500] transition-colors">
                                  {instructor.name}
                                </h3>
                                
                                {/* Seviye Rozeti */}
                                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                                  {instructor.level || 'Tüm Seviyeler'}
                                </span>
                              </div>
                              
                              <p className="text-sm font-bold text-[#FF5500] mt-0.5 flex items-center justify-between">
                                <span>{instructor.branch}</span>
                                {isWaterSport && (
                                  <span className="text-[10px] text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 font-bold flex items-center gap-1">
                                    <Waves className="w-3 h-3" /> SU SPORU
                                  </span>
                                )}
                              </p>
                            </div>

                            {/* Spot Location */}
                            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{instructor.spotName}</span>
                            </div>

                            {/* Bio */}
                            <p className="mt-3 text-xs text-[#475569] leading-relaxed">
                              {instructor.bio}
                            </p>

                            {/* Badges */}
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {instructor.badges.map((badge, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200/90 flex items-center gap-1"
                                >
                                  <Sparkles className="w-3 h-3 text-[#FF5500]" />
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Card Footer: Price, Payment Note, and 'Randevu Al' Button */}
                          <div className="mt-6 pt-4 border-t border-slate-100">
                            {/* Şeffaf Ödeme Notu */}
                            <div className="mb-3 px-3 py-1.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-[11px] font-semibold text-emerald-800 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <CreditCard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>Öğrenciye 0 TL ek ücret, sahada ödeme</span>
                              </div>
                              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                                KOMİSYONSUZ
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">SEANS ÜCRETİ</div>
                                <div className="text-xl font-black text-slate-900 flex items-baseline gap-1">
                                  {instructor.price.toLocaleString('tr-TR')} <span className="text-xs font-semibold text-slate-500">TL / Saat</span>
                                </div>
                              </div>

                              <button
                                id={`book-btn-${instructor.id}`}
                                onClick={() => {
                                  setSelectedInstructorForBooking(instructor);
                                  setBookingConfirmedData(null);
                                }}
                                className="px-6 py-3 rounded-xl font-black text-xs sm:text-sm bg-[#FF5500] hover:bg-[#FF6B1A] active:scale-95 text-white shadow-[0_0_20px_rgba(255,85,0,0.35)] hover:shadow-[0_0_30px_rgba(255,85,0,0.6)] transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                              >
                                <span>Randevu Al</span>
                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto my-8 shadow-xs">
                  <div className="w-16 h-16 rounded-2xl bg-orange-100 text-[#FF5500] flex items-center justify-center mx-auto mb-4 border border-orange-200 shadow-xs">
                    <Flame className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Aramanızla Eşleşen Eğitmen Bulunamadı
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Seçtiğiniz filtreler ({selectedBranch !== 'all' ? selectedBranch : ''} {selectedSpot !== 'Tümü' ? `• ${selectedSpot}` : ''}) için şu an aktif profil bulunmuyor.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedBranch('all');
                      setSelectedSpot('Tümü');
                      setSearchQuery('');
                    }}
                    className="px-8 py-3 rounded-xl bg-[#FF5500] hover:bg-[#FF6B1A] text-white font-black text-xs sm:text-sm shadow-neon-orange transition cursor-pointer"
                  >
                    Tüm Eğitmenleri Göster
                  </button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* =========================================================================
            TAB 2: TOPLULUK & SPOT AKIŞI (Duyuru Formu, Kalamış Atölyesi RSVP)
           ========================================================================= */}
        {activeTab === 'community' && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
                  <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>RIDERPASS TOPLULUK &amp; SPOT AKIŞI</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Spotlardaki Anlık Nabız &amp; Atölyeler
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  RiderPass topluluğundan hafta sonu buluşmaları, rüzgar radar uyarıları ve ücretsiz spor atölyeleri.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="open-create-post-btn"
                  onClick={() => setIsCreatePostOpen(!isCreatePostOpen)}
                  className="px-4 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#FF6B1A] text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-neon-orange transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Duyuru / Soru Paylaş</span>
                </button>
              </div>
            </div>

            {/* YENİ DUYURU / SORU EKLEME FORMU */}
            {isCreatePostOpen && (
              <div className="mb-8 p-6 rounded-3xl bg-[#F8FAFC] border-2 border-orange-200 shadow-md animate-scale-up text-left">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5500] flex items-center justify-center font-black">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-black text-slate-900 text-base">Toplulukta Duyuru, Soru veya Rapor Paylaş</span>
                  </div>
                  <button 
                    onClick={() => setIsCreatePostOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleCreateNewPost} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                        Kategori
                      </label>
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-[#FF5500]"
                      >
                        <option value="Duyuru & Atölye">Duyuru &amp; Atölye</option>
                        <option value="Spot Sorusu">Spot Sorusu / Buluşma</option>
                        <option value="Kar & Park Raporu">Kar &amp; Pist Raporu</option>
                        <option value="Spot Uyarısı">Spot Rüzgar &amp; Dalga Uyarısı</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                        Spot / Lokasyon
                      </label>
                      <select
                        value={newPostSpot}
                        onChange={(e) => setNewPostSpot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-[#FF5500]"
                      >
                        <option value="Kadıköy Kalamış Skatepark">Kadıköy Kalamış Skatepark</option>
                        <option value="Akyaka Gökova Körfezi">Akyaka Gökova Körfezi</option>
                        <option value="Bursa Uludağ 2. Gelişim Bölgesi">Bursa Uludağ 2. Gelişim Bölgesi</option>
                        <option value="Avcılar Sahil Parkuru">Avcılar Sahil Parkuru</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                      Başlık
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Hafta Sonu Kalamış'ta buluşup ollie pratiği yapacak var mı?"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">
                      Mesaj İçeriği
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Spot koşulu, ekipman durumu veya buluşma saatini detaylandırın..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatePostOpen(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      Vazgeç
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition"
                    >
                      Toplulukta Paylaş
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Post Feed */}
            <div className="space-y-6">
              {communityFeed.map((post) => (
                <article 
                  key={post.id}
                  className={`bg-white border rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 ${
                    post.isAlert ? 'border-orange-300 bg-orange-50/20' : 'border-slate-200/90'
                  }`}
                >
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 shadow-xs">
                        <img 
                          src={post.authorAvatar} 
                          alt={post.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-base">
                            {post.author}
                          </span>
                          {post.isAlert && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#FF5500] text-white">
                              SPOT RADARI
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{post.authorRole}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wide border ${
                      post.type === 'event' 
                        ? 'bg-orange-50 text-[#FF5500] border-orange-200'
                        : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                    }`}>
                      {post.badge}
                    </span>
                  </div>

                  {/* Title & Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-slate-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200/80 font-normal">
                      {post.content}
                    </p>
                  </div>

                  {/* DUYURU KARTI ÖZEL AKSİYONU: '+1 Katılıyorum' RSVP Butonu ve Sayaç */}
                  {post.type === 'event' && (
                    <div className="mb-5 p-5 rounded-2xl bg-orange-50/70 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                          <MapPin className="w-4 h-4 text-[#FF5500]" />
                          <span>{post.spot}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-black text-slate-900">
                            Katılımcı Durumu: {post.initialAttendees} / {post.maxCapacity} Kişi
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-52 h-2 rounded-full bg-slate-200 overflow-hidden mt-1.5">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FF5500] to-emerald-500 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, (post.initialAttendees / post.maxCapacity) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <button
                        id="rsvp-button-event"
                        onClick={() => handleToggleRSVP(post.id)}
                        className={`px-6 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                          post.isJoined
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-[#FF5500] hover:bg-[#FF6B1A] text-white shadow-neon-orange active:scale-95'
                        }`}
                      >
                        {post.isJoined ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Katıldın! (Yerin Ayrıldı ✓)</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 stroke-[3]" />
                            <span>+1 Katılıyorum ({post.maxCapacity - post.initialAttendees} Yer Kaldı)</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Spot Uyarısı Telemetrisi (Akyaka Rüzgâr Durumu 22 Knot) */}
                  {post.windKnots && (
                    <div className="my-5 p-4.5 rounded-2xl bg-cyan-50/60 border border-cyan-200 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-18 h-18 rounded-2xl bg-white border border-cyan-300 flex flex-col items-center justify-center shadow-xs">
                          <Wind className="w-4 h-4 text-cyan-600 mb-0.5" />
                          <span className="text-xl font-black text-slate-900 leading-none">
                            {post.windKnots}
                          </span>
                          <span className="text-[9px] uppercase font-black text-cyan-700 mt-0.5">
                            KNOT
                          </span>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase font-black tracking-wider text-slate-500">
                            CANLI ANEMOMETRE VERİSİ
                          </div>
                          <div className="text-base font-black text-slate-900 flex items-center gap-2 mt-0.5">
                            <span>Rüzgar Yönü: {post.windDirection}</span>
                            <Wind className="w-4 h-4 text-cyan-600" />
                          </div>
                          <div className="text-xs text-emerald-700 font-bold mt-0.5">
                            ✓ Termik rüzgâr 22 knota yükseldi, ileri seviye seanslar için ideal.
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
                        <div className="px-3.5 py-2 rounded-xl bg-white border border-cyan-100 text-center shadow-xs">
                          <span className="text-[10px] uppercase text-slate-400 font-bold block">Sıcaklık</span>
                          <span className="text-xs font-black text-slate-900">24°C Açık</span>
                        </div>
                        <div className="px-3.5 py-2 rounded-xl bg-white border border-cyan-100 text-center shadow-xs">
                          <span className="text-[10px] uppercase text-slate-400 font-bold block">Dalga</span>
                          <span className="text-xs font-black text-cyan-800">0.3m Düz Su</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions: Likes, Comments, Location */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          post.userLiked ? 'text-[#FF5500] font-bold' : 'hover:text-slate-800'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-[#FF5500] text-[#FF5500]' : ''}`} />
                        <span>{post.likes} Beğeni</span>
                      </button>

                      <button 
                        onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                        className="flex items-center gap-1.5 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments} Yorum</span>
                      </button>
                    </div>

                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {post.spot}
                    </span>
                  </div>

                  {/* Comment Input Box */}
                  {activeCommentsPostId === post.id && (
                    <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="Spot veya atölye hakkında soru sor..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#FF5500]"
                        />
                        <button 
                          onClick={() => {
                            if (commentInputs[post.id]?.trim()) {
                              setCommunityFeed(prev => prev.map(p => p.id === post.id ? { ...p, comments: p.comments + 1 } : p));
                              setCommentInputs({ ...commentInputs, [post.id]: '' });
                              showToast('💬 Yorumunuz iletildi.');
                            }
                          }}
                          className="px-4 py-2 bg-[#0F172A] text-white font-black text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            TAB 3: HAVA DURUMU & SPOT RADARI
           ========================================================================= */}
        {activeTab === 'weather' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-black uppercase tracking-wider mb-3">
                <Gauge className="w-4 h-4 text-cyan-600" />
                <span>CANLI TELEMETRİ &amp; PİST RADARI</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Anlık Spot Koşulları &amp; Seans Uygunluğu
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-3">
                Hava muhalefetine takılmayın. Rüzgar anemometreleri, kar kalınlıkları ve pist zemin durumları canlı güncellenir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {SPOT_WEATHER_DATA.map((spot) => (
                <div 
                  key={spot.id}
                  className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                    <img 
                      src={spot.image} 
                      alt={spot.name} 
                      className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black text-slate-900 border border-slate-200 flex items-center gap-2 shadow-xs">
                      <span className={`w-2 h-2 rounded-full ${spot.statusDot}`} />
                      <span>{spot.status}</span>
                    </div>

                    <div className="absolute top-4 right-4 bg-black/60 text-xs font-bold px-3 py-1 rounded-xl text-white backdrop-blur-md">
                      {spot.category}
                    </div>

                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-2xl font-black text-white flex items-center gap-2 drop-shadow-md">
                        <MapPin className="w-5 h-5 text-[#FF5500]" />
                        {spot.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 text-center">
                        <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center justify-center gap-1">
                          <Wind className="w-3.5 h-3.5 text-cyan-600" /> RÜZGAR
                        </div>
                        <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
                          {spot.wind}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 text-center">
                        <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center justify-center gap-1">
                          <Thermometer className="w-3.5 h-3.5 text-[#FF5500]" /> SICAKLIK
                        </div>
                        <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
                          {spot.temp}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 text-center">
                        <div className="text-[10px] uppercase font-bold text-slate-500 flex items-center justify-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-emerald-600" /> DURUM
                        </div>
                        <div className="text-sm sm:text-base font-black text-slate-900 mt-1 truncate">
                          {spot.crowd}
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-xs text-slate-700 flex items-center gap-2.5 mb-5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span><strong>Radar Notu:</strong> {spot.highlight}</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedBranch(spot.bestBranch);
                        setActiveTab('explore');
                        window.scrollTo({ top: 450, behavior: 'smooth' });
                      }}
                      className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Bu Spottaki {spot.bestBranch} Eğitmenlerini Gör</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* =========================================================================
          5. CANLI REZERVASYON MODALI (Gün, Saat, Seviye, Ekipman, Telefon)
         ========================================================================= */}
      {selectedInstructorForBooking && (
        <div 
          id="booking-modal-backdrop"
          onClick={handleCloseBookingModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div 
            id="booking-modal-card"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden animate-scale-up my-8"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF5500] via-amber-400 to-[#10B981]" />

            <button
              id="close-booking-modal-btn"
              onClick={handleCloseBookingModal}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmedData ? (
              <div>
                {/* Header */}
                <div className="flex items-start gap-4 pb-5 border-b border-slate-100 pr-8">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-200 shrink-0 bg-slate-100 shadow-xs">
                    <img 
                      src={selectedInstructorForBooking.image} 
                      alt={selectedInstructorForBooking.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5500] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60 inline-block">
                      CANLI SEANS REZERVASYONU
                    </span>
                    <h2 className="text-xl font-black text-slate-900 mt-1">
                      {selectedInstructorForBooking.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="font-bold text-slate-700">{selectedInstructorForBooking.branch}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {selectedInstructorForBooking.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Bar */}
                <div className="mt-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">Ders Ücreti (Birebir Seans)</span>
                    <span className="text-[11px] text-emerald-600 font-semibold">Öğrenciye 0 TL ek komisyon, sahada ödeme</span>
                  </div>
                  <span className="text-xl font-black text-slate-900">
                    {selectedInstructorForBooking.price.toLocaleString('tr-TR')} TL <span className="text-xs text-slate-500 font-normal">/ Saat</span>
                  </span>
                </div>

                {bookingErrorMsg && (
                  <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{bookingErrorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleConfirmBooking} className="mt-5 space-y-4 sm:space-y-5">
                  
                  {/* Adım 1: Gün ve Seans Saati seçimi */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF5500]" /> ADIM 1: GÜN VE SEANS SAATİ
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {['Bugün', 'Yarın', 'Hafta Sonu'].map((day) => (
                        <button
                          type="button"
                          key={day}
                          onClick={() => setBookingStep1Day(day)}
                          className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                            bookingStep1Day === day
                              ? 'bg-[#FF5500] text-white shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>

                    {/* Saat Dilimleri */}
                    <div className="grid grid-cols-3 gap-2">
                      {['10:00', '14:00', '16:30'].map((time) => {
                        const isSelected = bookingStep1Time === time;
                        return (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setBookingStep1Time(time)}
                            className={`py-2 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                              isSelected
                                ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-500 shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Adım 2: Seviye seçimi */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-[#0F172A]" /> ADIM 2: SEVİYE SEÇİMİ
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        'Sıfırdan Başlayan',
                        'Orta Seviye',
                        'İleri Seviye'
                      ].map((lvl) => {
                        const isSelected = bookingStep2Level === lvl;
                        return (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => setBookingStep2Level(lvl)}
                            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                              isSelected
                                ? 'bg-[#0F172A] text-white shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Adım 3: Ekipman durumu */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-slate-600" /> ADIM 3: EKİPMAN DURUMU
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <label 
                        onClick={() => setBookingStep3Equipment('own')}
                        className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                          bookingStep3Equipment === 'own'
                            ? 'bg-orange-50 border-[#FF5500] text-slate-900 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="equipment" 
                          checked={bookingStep3Equipment === 'own'} 
                          onChange={() => setBookingStep3Equipment('own')}
                          className="accent-[#FF5500] w-4 h-4 cursor-pointer"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">Kendi ekipmanımı getireceğim</div>
                          <div className="text-[11px] text-slate-500">Board / bisiklet / koruma mevcut</div>
                        </div>
                      </label>

                      <label 
                        onClick={() => setBookingStep3Equipment('included')}
                        className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                          bookingStep3Equipment === 'included'
                            ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="equipment" 
                          checked={bookingStep3Equipment === 'included'} 
                          onChange={() => setBookingStep3Equipment('included')}
                          className="accent-emerald-600 w-4 h-4 cursor-pointer"
                        />
                        <div className="text-xs">
                          <div className="font-bold text-slate-900">Hocadan temin edilsin</div>
                          <div className="text-[11px] text-emerald-700 font-semibold">Seansa dahil / ücretsiz temin ✓</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Adım 4: İsim, Soyisim ve Telefon Numarası girişi */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" /> ADIM 4: İLETİŞİM BİLGİLERİ
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={bookingStep4Name}
                          onChange={(e) => setBookingStep4Name(e.target.value)}
                          placeholder="Ad Soyad (Örn: Caner Yılmaz)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#FF5500] focus:ring-1 focus:ring-[#FF5500] text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          required
                          value={bookingStep4Phone}
                          onChange={(e) => setBookingStep4Phone(e.target.value)}
                          placeholder="Telefon (Örn: 05xx xxx xxxx)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ödeme Notu */}
                  <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                    <CreditCard className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Ödeme Şeffaflığı:</strong> Ders ücreti sahada nakit veya havale ile hocaya iletilir (Öğrenciye 0 TL ek komisyon).
                    </span>
                  </div>

                  {/* Dersi Onayla Butonu */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isBookingLoading}
                      id="confirm-booking-btn"
                      className="w-full py-3.5 px-6 rounded-xl font-black text-sm sm:text-base bg-[#FF5500] hover:bg-[#FF6B1A] active:scale-[0.98] text-white shadow-neon-orange hover:shadow-neon-orange-hover transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                    >
                      {isBookingLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-white" />
                          <span>Seans Takvimi Kilitleniyor...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Dersi Onayla ({selectedInstructorForBooking.price.toLocaleString('tr-TR')} TL)</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            ) : (
              /* Dersi Onayla Simülasyon Ekranı */
              <div className="py-8 text-center animate-fade-in relative">
                <div className="w-18 h-18 rounded-3xl bg-emerald-50 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
                  KOD: {bookingConfirmedData.code}
                </span>

                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Randevu Onaylandı!
                </h3>
                
                {/* Onay Simülasyon Metni */}
                <div className="my-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-bold leading-relaxed max-w-md mx-auto text-center">
                  "Randevu onaylandı! Hoca takviminde saat kapatıldı ve WhatsApp teyit mesajı oluşturuldu."
                </div>

                <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs text-left space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Öğrenci:</span>
                    <span className="font-bold text-slate-900">{bookingConfirmedData.studentName}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Eğitmen &amp; Branş:</span>
                    <span className="font-bold text-slate-900">{bookingConfirmedData.instructorName} • {bookingConfirmedData.branch}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Seviye &amp; Seans:</span>
                    <span className="font-bold text-[#FF5500]">{bookingConfirmedData.level} • {bookingConfirmedData.day} {bookingConfirmedData.time}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Ekipman:</span>
                    <span className="font-bold text-slate-800">{bookingConfirmedData.equipment}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 pt-2 border-t border-slate-200">
                    <span>İletişim:</span>
                    <span className="font-mono text-slate-900 font-bold">{bookingConfirmedData.phone}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    id="booking-finish-btn"
                    onClick={handleCloseBookingModal}
                    className="w-full sm:w-auto px-10 py-3 rounded-xl font-black text-sm bg-[#0F172A] hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer"
                  >
                    Tamamla &amp; Kapat
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* =========================================================================
          7. EĞİTMEN HIZLI SEKRETERLİK & YÖNETİM PANELİ (Freemium Widget & Acil Durum)
         ========================================================================= */}
      {isInstructorPortalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setIsInstructorPortalOpen(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden animate-scale-up my-6"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF5500] via-amber-400 to-[#10B981]" />

            <button
              onClick={() => setIsInstructorPortalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 text-[#FF5500] flex items-center justify-center font-black">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  RiderPass Eğitmen Portalı &amp; Sekreterlik
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Instagram biyo linkiniz, freemium gelir modeliniz ve acil erteleme masası
                </p>
              </div>
            </div>

            {/* Eğitmen Seçimi */}
            <div className="mb-5">
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
                Aktif Eğitmen Profili Seçin:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {INSTRUCTORS.map((inst) => (
                  <button
                    key={inst.id}
                    onClick={() => {
                      setActivePortalInstructorId(inst.id);
                      setEmergencyCancelled(false);
                    }}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                      activePortalInstructorId === inst.id
                        ? 'bg-orange-50/80 border-[#FF5500] text-slate-900 shadow-xs'
                        : 'bg-[#F8FAFC] border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <img 
                      src={inst.image} 
                      alt={inst.name} 
                      className="w-7 h-7 rounded-lg object-cover" 
                    />
                    <span className="text-xs font-bold truncate">{inst.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kişisel Link: riderpass.app/@borayilmaz + 'Linki Kopyala' Butonu */}
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-[#FF5500]" /> KİŞİSEL REZERVASYON LİNKİ
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Canlı Takvim Açık
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-mono font-bold text-slate-800 flex items-center gap-2 shadow-xs truncate select-all">
                  <span className="text-slate-400">https://</span>
                  <span className="text-[#FF5500]">riderpass.app/{activePortalInstructor.slug}</span>
                </div>

                <button
                  id="copy-bio-link-btn"
                  onClick={() => handleCopyBioLink(activePortalInstructor.slug)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    isCopiedBioLink 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-[#FF5500] hover:bg-[#FF6B1A] text-white shadow-neon-orange'
                  }`}
                >
                  {isCopiedBioLink ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Kopyalandı! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Linki Kopyala (Instagram Biyosu İçin)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Freemium Gelir Modeli Widget'ı: 'Mevcut Plan: Ücretsiz (Bu ay 7/15 ders kullanıldı)' */}
            <div className="p-4.5 rounded-2xl bg-white border border-slate-200 mb-4 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  İŞ MODELİ &amp; FREEMIUM KOTA GÖSTERGESİ
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Freemium Plan
                </span>
              </div>

              <div className="text-base font-black text-slate-900">
                Mevcut Plan: Ücretsiz (Bu ay 7/15 ders kullanıldı)
              </div>

              {/* Progress bar (7/15) */}
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mt-2.5">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#FF5500] rounded-full transition-all duration-500" 
                  style={{ width: `${(7 / 15) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                <span>8 ücretsiz seans hakkınız kaldı</span>
                <span className="font-bold text-slate-700">7 / 15 Doluluk</span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <p className="text-[11px] text-slate-500 max-w-xs">
                  15 seansa kadar %0 komisyon! Kota dolduğunda seans başı sembolik mikro-komisyon veya aylık Pro abonelik devreye girer.
                </p>
                <button
                  onClick={() => showToast('⭐ Pro plana yükseltme talebiniz alındı! Satış ekibi sizinle iletişime geçecek.')}
                  className="px-3 py-1.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-[11px] font-black shrink-0 transition cursor-pointer"
                >
                  Pro'ya Geç (499 TL/ay)
                </button>
              </div>
            </div>

            {/* ACİL DURUM BUTONU: 'Hava Koşulu Nedeniyle Bugünkü Seansları Ertele' */}
            <div className="p-4.5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#FF5500]" /> HAVA MUHALEFETİ &amp; ERTELEME MASASI
                </span>
                <span className="text-xs font-bold text-slate-600">
                  Bugünkü Kayıtlı Öğrenci: <strong className="text-slate-900">{activePortalInstructor.todayStudents?.length || 3}</strong>
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
                Rüzgarsızlık, fırtına, şiddetli yağış veya pist kapanması durumunda tek tıkla bugünün öğrencilerine otomatik bildirim iletin ve takvimi erteleyin.
              </p>

              {!emergencyCancelled ? (
                <button
                  id="emergency-weather-postpone-btn"
                  onClick={() => {
                    setEmergencyCancelled(true);
                    showToast('⚠️ Bugünkü 3 öğrenciye hava muhalefeti erteleme bildirimi iletildi.');
                  }}
                  className="w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-red-600 to-[#FF5500] hover:from-red-700 hover:to-[#FF6B1A] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Hava Koşulu Nedeniyle Bugünkü Seansları Ertele</span>
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-white border border-emerald-300 text-left animate-fade-in shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-black text-sm mb-1.5">
                    <Check className="w-4 h-4 stroke-[3] text-emerald-600" />
                    <span>Otomasyon Tamamlandı!</span>
                  </div>
                  
                  {/* Dokümandaki bildirim metni */}
                  <p className="text-xs font-bold text-slate-800 leading-relaxed bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                    "Bugünkü 3 kayıtlı öğrenciye otomatik erteleme bildirimi iletildi ve takvim açıldı"
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                    {activePortalInstructor.todayStudents?.map((st, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
                        <span className="font-bold text-slate-800">{st.name} ({st.time}) - {st.phone}</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp &amp; SMS İletildi
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 text-right">
                    <button
                      onClick={() => setEmergencyCancelled(false)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Bildirimi Sıfırla
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Günlük Seans Programı & Kazanç */}
            <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">BUGÜNKÜ TAHMİNİ HAKEDİŞ</span>
                <span className="text-lg font-black text-slate-900">
                  {(activePortalInstructor.price * 3).toLocaleString('tr-TR')} TL
                </span>
                <span className="text-[11px] text-emerald-600 font-bold block">
                  %100 Doğrudan Eğitmene (0 TL Platform Kesintisi)
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">TOPLAM REZERVASYON</span>
                <span className="text-base font-black text-[#FF5500]">3 Seans Dolu</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          FOOTER
         ========================================================================= */}
      <footer className="w-full bg-[#F8FAFC] border-t border-slate-200 mt-20 pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF5500] to-amber-500 flex items-center justify-center p-[2px] shadow-xs">
                  <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-black text-[#0F172A]">
                  Rider<span className="text-[#FF5500]">Pass</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] max-w-md leading-relaxed font-normal">
                Kaykay, Kitesurf, Snowboard ve BMX tutkunlarını uzman eğitmenlerle buluşturan, WhatsApp karmaşasını ortadan kaldıran canlı takvimli pazaryeri.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>%100 Doğrulanmış Sporcular • Öğrenciye 0 TL Komisyon</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3.5">
                BRANŞLAR
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => { setSelectedBranch('Kaykay'); setActiveTab('explore'); }}>Kaykay (Street &amp; Bowl)</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => { setSelectedBranch('Kitesurf'); setActiveTab('explore'); }}>Kitesurf &amp; Wingfoil</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => { setSelectedBranch('Snowboard'); setActiveTab('explore'); }}>Snowboard Freestyle &amp; Pist</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => { setSelectedBranch('BMX'); setActiveTab('explore'); }}>BMX Flatland &amp; Street</li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3.5">
                POPÜLER SPOTLAR
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => { setSelectedSpot('Kadıköy (Kalamış)'); setActiveTab('explore'); }}>Kadıköy Kalamış Skatepark</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => { setSelectedSpot('Akyaka (Muğla)'); setActiveTab('explore'); }}>Akyaka Sahili (Gökova)</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => { setSelectedSpot('Uludağ (Bursa)'); setActiveTab('explore'); }}>Uludağ 2. Gelişim Bölgesi</li>
                <li className="hover:text-slate-900 cursor-pointer transition-colors" onClick={() => { setSelectedSpot('Avcılar Skatepark'); setActiveTab('explore'); }}>Avcılar Sahil Parkuru</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
            <div>
              © 2026 RiderPass Platformu. Tüm hakları saklıdır. Ekstrem Spor Pazaryeri.
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="hover:text-slate-800 cursor-pointer">Gizlilik Politikası</span>
              <span>•</span>
              <span className="hover:text-slate-800 cursor-pointer">Kullanıcı Sözleşmesi</span>
              <span>•</span>
              <span className="text-[#FF5500] font-black">Canlı Destek: 0850 440 RIDE</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
