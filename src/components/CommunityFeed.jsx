import React, { useState } from 'react';
import { 
  COMMUNITY_POSTS 
} from '../data/mockData';
import { 
  Users, 
  Wind, 
  MapPin, 
  Heart, 
  MessageSquare, 
  Check, 
  Plus, 
  Send,
  AlertTriangle,
  Compass,
  Radio,
  CalendarDays
} from 'lucide-react';

export default function CommunityFeed({ onBookInstructor }) {
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [newCommentText, setNewCommentText] = useState({});
  const [activeCommentsPostId, setActiveCommentsPostId] = useState(null);

  // Toggle RSVP to event (Bora Hoca's workshop)
  const handleToggleRSVP = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId && post.type === 'event') {
        const currentlyJoined = post.isJoined;
        return {
          ...post,
          isJoined: !currentlyJoined,
          initialAttendees: currentlyJoined 
            ? post.initialAttendees - 1 
            : post.initialAttendees + 1
        };
      }
      return post;
    }));
  };

  // Toggle Like
  const handleToggleLike = (postId) => {
    setPosts(prev => prev.map(post => {
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

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>TOPLULUK AKIŞI &amp; YEREL ETKİNLİKLER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Spotlardaki Anlık Nabız &amp; Atölyeler
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            RiderPass topluluğundan hafta sonu buluşmaları, rüzgar uyarıları ve ücretsiz spor atölyeleri.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>3 Aktif Spot Etkinliği</span>
          </div>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {posts.map((post) => {
          return (
            <article 
              key={post.id}
              className={`bg-white border rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 ${
                post.isAlert 
                  ? 'border-orange-300 bg-orange-50/20' 
                  : 'border-slate-200/90'
              }`}
            >
              {/* Post Author / Header */}
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

                {/* Badge */}
                <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wide border ${
                  post.type === 'event' 
                    ? 'bg-orange-50 text-[#FF5500] border-orange-200'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                }`}>
                  {post.badge}
                </span>
              </div>

              {/* Post Title & Content */}
              <div className="mb-4">
                {post.title && (
                  <h3 className="text-xl font-black text-slate-900 mb-2">
                    {post.title}
                  </h3>
                )}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80 font-normal">
                  {post.content}
                </p>
              </div>

              {/* Special Event Block for Post 1 (Kalamış Free Skateboard Workshop) */}
              {post.type === 'event' && (
                <div className="mb-5 p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                      <MapPin className="w-4 h-4 text-[#FF5500]" />
                      <span>{post.spot}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-black text-slate-900">
                        Katılımcı Kontenjanı: {post.initialAttendees} / {post.maxCapacity} Kişi
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-52 h-2 rounded-full bg-slate-200 overflow-hidden mt-1.5">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FF5500] to-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${(post.initialAttendees / post.maxCapacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Interactive '+ Katılıyorum' Button */}
                  <button
                    id="rsvp-button-event"
                    onClick={() => handleToggleRSVP(post.id)}
                    className={`px-6 py-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                      post.isJoined
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-[#FF5500] hover:bg-[#FF6B1A] text-white shadow-neon-orange'
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
                        <span>+ Katılıyorum ({post.maxCapacity - post.initialAttendees} Yer Kaldı)</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Wind Speed Telemetry Widget (Post 2) */}
              {post.windKnots && (
                <div className="my-5 p-4.5 rounded-2xl bg-cyan-50/50 border border-cyan-200 flex flex-col md:flex-row items-center justify-between gap-4">
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
                        <Compass className="w-4 h-4 text-cyan-600" />
                      </div>
                      <div className="text-xs text-emerald-700 font-bold mt-0.5">
                        ✓ Kitesurf &amp; Wingfoil dersleri için tam uygun
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

              {/* Post Footer & Engagement Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      post.userLiked ? 'text-[#FF5500] font-bold' : 'hover:text-slate-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-[#FF5500] text-[#FF5500]' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <button 
                    onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments} Yorum</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {post.spot}
                  </span>
                </div>
              </div>

              {/* Expandable Comment Box */}
              {activeCommentsPostId === post.id && (
                <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Spot veya atölye hakkında soru sor..."
                      value={newCommentText[post.id] || ''}
                      onChange={(e) => setNewCommentText({ ...newCommentText, [post.id]: e.target.value })}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#FF5500]"
                    />
                    <button 
                      onClick={() => {
                        if (newCommentText[post.id]?.trim()) {
                          setPosts(prev => prev.map(p => p.id === post.id ? { ...p, comments: p.comments + 1 } : p));
                          setNewCommentText({ ...newCommentText, [post.id]: '' });
                        }
                      }}
                      className="px-4 py-2 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-slate-800 transition cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </article>
          );
        })}
      </div>
    </section>
  );
}
