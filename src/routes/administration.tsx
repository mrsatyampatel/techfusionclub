import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  GraduationCap,
  Image as ImageIcon,
  Trash2,
  LogOut,
  Plus,
  Search,
  Edit3,
  X,
  Save,
  Loader2,
  AlertCircle,
  ShieldAlert,
  RotateCcw,
  Menu,
  ExternalLink,
  ChevronRight,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Filter,
  Eye,
  ArrowUpRight,
  Lock,
  Database,
  Linkedin,
  Github,
  Instagram,
  Clock,
  Layers,
  Download,
  Settings2,
  Sliders,
  Check,
  Copy,
  RefreshCw,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { auth, signInWithGoogle, logout } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  getAlumni,
  createAlumnus,
  updateAlumnus,
  deleteAlumnus,
  getGalleryPhotos,
  createGalleryPhoto,
  deleteGalleryPhoto,
  getTrashItems,
  restoreTrashItem,
  deleteTrashItemPermanently,
  getSiteSettings,
  updateSiteSettings,
  type TrashItem,
  type SiteSettings,
} from "@/lib/db";
import type { ClubEvent } from "@/data/events";
import type { Member, MemberTier } from "@/data/members";
import { tierMeta } from "@/data/members";
import type { Alumnus } from "@/data/alumni";
import type { GalleryPhoto } from "@/data/gallery";
import { toast } from "sonner";

export const Route = createFileRoute("/administration")({
  head: () => ({
    meta: [
      { title: "Executive Admin Console | Tech Fusion Club" },
      { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
      { name: "googlebot", content: "noindex, nofollow, noarchive, nosnippet" },
    ],
  }),
  component: AdminShell,
});

// Strict authorization list for club Admin
const AUTHORIZED_EMAILS = ["webdevpraveen@gmail.com", "techfusionclub@srmu.ac.in"];

function AdminShell() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "Dashboard" | "Events" | "Members" | "Alumni" | "Gallery" | "Settings" | "Trash"
  >("Dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const email = currentUser.email || "";
        if (AUTHORIZED_EMAILS.length > 0 && !AUTHORIZED_EMAILS.includes(email)) {
          setAuthError(`Unauthorized access. ${email} is not an authorized club officer.`);
          await logout();
          setUser(null);
        } else {
          setAuthError(null);
          setUser(currentUser);
          toast.success(`Welcome back, ${currentUser.displayName || "Officer"}`);
        }
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (loadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex items-center justify-center">
            <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 animate-pulse flex items-center justify-center">
              <Logo className="size-10 object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin text-primary" />
            <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
              Verifying Officer Credentials...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  LOGIN SCREEN (PROFESSIONAL SAAS PORTAL)
  // ═══════════════════════════════════════════════════════════════════════
  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12 overflow-hidden selection:bg-primary/20">
        {/* Futuristic Background Auras */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-primary/15 via-amber-500/5 to-transparent blur-3xl rounded-full" />
          <div className="absolute -bottom-40 right-10 w-[500px] h-[350px] bg-primary/10 blur-3xl rounded-full" />
          <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-amber-600/5 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-md w-full rounded-3xl p-8 sm:p-10 bg-surface/90 backdrop-blur-2xl border border-border/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] text-center">
          {/* Official Logo with Glowing Aura */}
          <div className="relative mx-auto flex items-center justify-center size-24 mb-6">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/30 to-amber-500/20 blur-xl animate-pulse" />
            <div className="relative flex size-full items-center justify-center rounded-2xl bg-surface-strong/90 border border-primary/30 shadow-inner">
              <Logo className="size-16 object-contain drop-shadow-[0_8px_20px_rgba(234,88,12,0.35)]" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
              SRMU STUDENT CHAPTER
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight mt-1 text-foreground">
              TECH FUSION CLUB
            </h1>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold mb-6">
            <ShieldCheck className="size-3.5" />
            <span>Executive Admin Console</span>
          </div>

          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Restricted workspace for club secretaries, faculty coordinators, and leads to manage
            events, registrations, members, and portal settings.
          </p>

          {authError && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl bg-destructive/10 border border-destructive/25 p-4 text-left animate-in fade-in">
              <ShieldAlert className="size-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-destructive font-mono">
                  Authentication Failed
                </p>
                <p className="text-sm text-destructive font-medium leading-relaxed mt-0.5">
                  {authError}
                </p>
              </div>
            </div>
          )}

          {/* Google Sign-in Button */}
          <button
            onClick={async () => {
              setAuthError(null);
              try {
                await signInWithGoogle();
              } catch (err: unknown) {
                console.error("Sign-in error:", err);
                const error = err as { code?: string; message?: string };
                const code = error?.code || "";
                if (code === "auth/unauthorized-domain") {
                  setAuthError(
                    `Unauthorized Domain: '${window.location.hostname}' is not authorized in Firebase Authentication Settings.`,
                  );
                } else if (code === "auth/popup-blocked") {
                  setAuthError(
                    "Sign-in popup was blocked by browser. Please allow popups for this site.",
                  );
                } else if (code === "auth/popup-closed-by-user") {
                  setAuthError("Sign-in popup was closed before completing.");
                } else {
                  setAuthError(error?.message || "Sign-in failed. Please verify console logs.");
                }
              }
            }}
            className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-surface-strong hover:bg-surface border border-border/80 hover:border-primary/50 px-6 py-4 font-semibold text-foreground transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.01]"
          >
            <svg viewBox="0 0 24 24" className="size-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign in with Google</span>
            <ArrowUpRight className="size-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto" />
          </button>

          {/* Footer Security Note */}
          <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <Lock className="size-3 text-emerald-500" /> Authorized SRMU SSO
            </span>
            <a
              href="/"
              className="hover:text-foreground hover:underline transition-colors flex items-center gap-1 font-medium"
            >
              Public Site <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const tabs: {
    name: "Dashboard" | "Events" | "Members" | "Alumni" | "Gallery" | "Settings" | "Trash";
    icon: typeof LayoutDashboard;
    description: string;
  }[] = [
    { name: "Dashboard", icon: LayoutDashboard, description: "Overview & metrics" },
    { name: "Events", icon: Calendar, description: "Manage events & schedules" },
    { name: "Members", icon: Users, description: "Members directory" },
    { name: "Alumni", icon: GraduationCap, description: "Honors wall & past leads" },
    { name: "Gallery", icon: ImageIcon, description: "Campus photos & media" },
    { name: "Settings", icon: Settings2, description: "Portal controls & diagnostics" },
    { name: "Trash", icon: Trash2, description: "100-hour safe recovery" },
  ];

  return (
    <div className="flex min-h-screen bg-background selection:bg-primary/20">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 border-r border-border/70 bg-surface/95 backdrop-blur-2xl flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Brand Header with Official Logo */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-border/70">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-auto object-contain shrink-0 drop-shadow-sm" />
            <div className="flex flex-col">
              <span className="font-display text-sm font-black tracking-wider uppercase text-foreground leading-none">
                TECH FUSION
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary font-bold mt-1">
                ADMIN CONSOLE
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-surface-strong hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-2">
            Operations & Data
          </p>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                  setMobileSidebarOpen(false);
                }}
                className={`group flex w-full items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-amber-600 text-white shadow-[0_4px_20px_rgba(234,88,12,0.35)]"
                    : "text-muted-foreground hover:bg-surface-strong hover:text-foreground"
                }`}
              >
                <tab.icon
                  className={`size-4 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span className="flex-1 text-left">{tab.name}</span>
                {isActive && <span className="size-1.5 rounded-full bg-white shadow-sm" />}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-border/50">
            <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              Quick Shortcuts
            </p>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-3.5 rounded-xl px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-surface-strong hover:text-foreground transition-all group"
            >
              <Globe className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>Live Website</span>
              <ExternalLink className="size-3.5 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Current Officer Profile Card */}
        <div className="p-4 border-t border-border/70 bg-surface/50">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-strong/80 border border-border/60 mb-3 shadow-sm">
            <div className="size-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-xs text-primary overflow-hidden shrink-0">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Admin"}
                  className="size-full object-cover"
                />
              ) : (
                (user?.displayName?.charAt(0) || user?.email?.charAt(0) || "A").toUpperCase()
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold truncate text-foreground">
                {user?.displayName || "Club Officer"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate font-mono">{user?.email}</p>
            </div>
            <span className="size-2 rounded-full bg-emerald-500 shrink-0" title="Officer Active" />
          </div>

          <button
            onClick={() => {
              logout();
              toast.info("Signed out successfully");
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors border border-transparent hover:border-destructive/20"
          >
            <LogOut className="size-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-72 flex-1 flex flex-col min-h-screen bg-background">
        {/* Sticky Header with Breadcrumbs & Live Status */}
        <header className="h-20 border-b border-border/70 bg-background/80 backdrop-blur-xl flex items-center px-6 sm:px-10 sticky top-0 z-30 justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-border/70 bg-surface text-muted-foreground hover:text-foreground"
            >
              <Menu className="size-5" />
            </button>
            <div>
              {/* Breadcrumbs */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                <span>Console</span>
                <ChevronRight className="size-3 text-muted-foreground/60" />
                <span className="text-foreground font-semibold">{activeTab}</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-0.5">
                {activeTab} Management
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Database Status Indicator */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border/60 text-xs font-mono shadow-sm">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-muted-foreground">Firestore Live Sync</span>
            </div>

            {/* Quick Live Site Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-surface hover:bg-surface-strong text-xs font-semibold text-foreground transition-all"
            >
              <Globe className="size-3.5 text-primary" />
              <span>Live Site</span>
              <ExternalLink className="size-3 opacity-60" />
            </a>

            {/* User Pill */}
            <div className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full bg-surface border border-border/60 shadow-sm">
              <div className="size-7 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs text-primary border border-primary/40 overflow-hidden shrink-0">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Officer" className="size-full object-cover" />
                ) : (
                  (user?.email?.charAt(0) || "A").toUpperCase()
                )}
              </div>
              <span className="text-xs font-semibold text-foreground hidden sm:block max-w-[130px] truncate">
                {user?.displayName || "Officer"}
              </span>
            </div>
          </div>
        </header>

        {/* View Content Container */}
        <div className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full">
          <div className="animate-in fade-in duration-300">
            {activeTab === "Dashboard" && (
              <DashboardAdmin
                user={user}
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                }}
              />
            )}
            {activeTab === "Events" && <EventsAdmin />}
            {activeTab === "Members" && <MembersAdmin />}
            {activeTab === "Alumni" && <AlumniAdmin />}
            {activeTab === "Gallery" && <GalleryAdmin />}
            {activeTab === "Settings" && <SettingsAdmin />}
            {activeTab === "Trash" && <TrashAdmin />}
          </div>
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  DASHBOARD OVERVIEW (MODERN BENTO COMMAND CENTER)
// ═══════════════════════════════════════════════════════════════════════

function DashboardAdmin({
  user,
  onNavigateTab,
}: {
  user: User | null;
  onNavigateTab: (tab: "Events" | "Members" | "Alumni" | "Gallery" | "Settings" | "Trash") => void;
}) {
  const [stats, setStats] = useState({
    events: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    members: 0,
    coreMembers: 0,
    photos: 0,
    alumni: 0,
  });
  const [recentEvents, setRecentEvents] = useState<ClubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [events, members, alumni, photos] = await Promise.all([
          getEvents(true),
          getMembers(),
          getAlumni(),
          getGalleryPhotos(),
        ]);
        const upcoming = events.filter((e) => e.status === "upcoming").length;
        const past = events.filter((e) => e.status === "past").length;
        const core = members.filter((m) => m.tier === "core" || m.tier === "head").length;

        setStats({
          events: events.length,
          upcomingEvents: upcoming,
          pastEvents: past,
          members: members.length,
          coreMembers: core,
          photos: photos.length,
          alumni: alumni.length,
        });
        setRecentEvents(events.slice(0, 5));
      } catch (e) {
        toast.error("Failed to load dashboard metrics");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-8">
      {/* Executive Welcome Hero Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-surface to-surface-strong border border-border/80 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-primary/10 via-amber-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
              <Sparkles className="size-3.5" />
              <span>Officer Control Center</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Welcome back, {user?.displayName?.split(" ")[0] || "Officer"}
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Real-time synchronization across club events, active council directories, and campus
              media library.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateTab("Members")}
              className="inline-flex items-center gap-2 rounded-xl bg-surface-strong border border-border/80 px-4 py-2.5 text-xs font-bold text-foreground hover:border-primary/50 hover:bg-surface transition-all"
            >
              <Users className="size-3.5 text-emerald-500" /> Directory
            </button>
            <button
              onClick={() => onNavigateTab("Gallery")}
              className="inline-flex items-center gap-2 rounded-xl bg-surface-strong border border-border/80 px-4 py-2.5 text-xs font-bold text-foreground hover:border-primary/50 hover:bg-surface transition-all"
            >
              <ImageIcon className="size-3.5 text-purple-500" /> Media Library
            </button>
            <button
              onClick={() => onNavigateTab("Settings")}
              className="inline-flex items-center gap-2 rounded-xl bg-surface-strong border border-border/80 px-4 py-2.5 text-xs font-bold text-foreground hover:border-primary/50 hover:bg-surface transition-all"
            >
              <Settings2 className="size-3.5 text-muted-foreground" /> Settings
            </button>
          </div>
        </div>
      </div>

      {/* 4 Bento KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Events */}
        <div
          onClick={() => onNavigateTab("Events")}
          className="group relative cursor-pointer rounded-2xl bg-surface border border-border/80 p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Total Events
            </span>
            <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Calendar className="size-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display text-4xl font-black text-foreground">{stats.events}</p>
            <span className="text-xs text-muted-foreground font-mono">hosted</span>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span className="text-emerald-500 font-semibold">{stats.upcomingEvents} Upcoming</span>
            <span>{stats.pastEvents} Past</span>
          </div>
        </div>

        {/* Active Members */}
        <div
          onClick={() => onNavigateTab("Members")}
          className="group relative cursor-pointer rounded-2xl bg-surface border border-border/80 p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Members Directory
            </span>
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Users className="size-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display text-4xl font-black text-foreground">{stats.members}</p>
            <span className="text-xs text-muted-foreground font-mono">members</span>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span className="text-primary font-semibold">{stats.coreMembers} Core & Leads</span>
            <span>SRMU Campus</span>
          </div>
        </div>

        {/* Gallery & Media */}
        <div
          onClick={() => onNavigateTab("Gallery")}
          className="group relative cursor-pointer rounded-2xl bg-surface border border-border/80 p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Media Library
            </span>
            <div className="size-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
              <ImageIcon className="size-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display text-4xl font-black text-foreground">{stats.photos}</p>
            <span className="text-xs text-muted-foreground font-mono">campus photos</span>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span className="text-muted-foreground font-medium">Public Gallery</span>
            <span className="text-primary font-semibold">Manage →</span>
          </div>
        </div>

        {/* Alumni Honors */}
        <div
          onClick={() => onNavigateTab("Alumni")}
          className="group relative cursor-pointer rounded-2xl bg-surface border border-border/80 p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
              Alumni Honors
            </span>
            <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
              <GraduationCap className="size-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display text-4xl font-black text-foreground">{stats.alumni}</p>
            <span className="text-xs text-muted-foreground font-mono">graduates</span>
          </div>
          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
            <span className="text-muted-foreground font-medium">Wall of Fame</span>
            <span className="text-primary font-semibold">View wall →</span>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Recent Events + Active Council Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Events Column */}
        <div className="lg:col-span-2 bg-surface rounded-3xl border border-border/80 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Calendar className="size-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Recent Club Events
                </h3>
                <p className="text-xs text-muted-foreground">
                  Latest published workshops, hackathons, and meetups
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab("Events")}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="size-3" />
            </button>
          </div>

          {recentEvents.length > 0 ? (
            <div className="divide-y divide-border/40">
              {recentEvents.map((e) => (
                <div
                  key={e.slug || e.title}
                  className="p-5 flex items-center justify-between gap-4 hover:bg-surface-strong/50 transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <EventCoverThumbnail cover={e.cover} title={e.title} />
                    <div className="min-w-0">
                      <p className="font-bold text-foreground text-sm truncate group-hover:text-primary transition-colors">
                        {e.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {e.date} {e.venue ? `· ${e.venue}` : ""}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-surface-strong px-2 py-0.5 rounded-md border border-border/50">
                        {e.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={e.status} />
                    <button
                      onClick={() => onNavigateTab("Events")}
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-strong hover:bg-surface text-xs font-semibold border border-border/70 transition-colors"
                    >
                      <Edit3 className="size-3 text-muted-foreground" /> Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No events in database yet. Click 'New Event' to publish one." />
          )}
        </div>

        {/* Operations Launchpad & Quick Actions Column */}
        <div className="bg-surface rounded-3xl border border-border/80 overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-border/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Sliders className="size-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Quick Launchpad</h3>
                <p className="text-xs text-muted-foreground">Shortcuts & Operations</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono font-bold">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync
            </span>
          </div>

          <div className="p-6 space-y-3 flex-1">
            {/* Action 1: Gallery */}
            <button
              onClick={() => onNavigateTab("Gallery")}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-strong/60 border border-border/50 hover:bg-surface-strong hover:border-purple-500/30 transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <ImageIcon className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground group-hover:text-purple-500 transition-colors">
                    Media Library
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {stats.photos} campus photos published
                  </p>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Action 2: Alumni */}
            <button
              onClick={() => onNavigateTab("Alumni")}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-strong/60 border border-border/50 hover:bg-surface-strong hover:border-amber-500/30 transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <GraduationCap className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground group-hover:text-amber-500 transition-colors">
                    Alumni Wall of Fame
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {stats.alumni} graduates honored
                  </p>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Action 3: Settings */}
            <button
              onClick={() => onNavigateTab("Settings")}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-strong/60 border border-border/50 hover:bg-surface-strong hover:border-blue-500/30 transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <Settings2 className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground group-hover:text-blue-500 transition-colors">
                    System & Backups
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Snapshot data & officer matrix
                  </p>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Action 4: Trash */}
            <button
              onClick={() => onNavigateTab("Trash")}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-surface-strong/60 border border-border/50 hover:bg-surface-strong hover:border-rose-500/30 transition-all group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 group-hover:scale-110 transition-transform">
                  <Trash2 className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground group-hover:text-rose-500 transition-colors">
                    Recycle Bin
                  </p>
                  <p className="text-[11px] text-muted-foreground">Recover soft-deleted items</p>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          {/* Quick Footer: Live Site Link */}
          <div className="p-4 border-t border-border/60 bg-surface/30 flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
              <Globe className="size-3.5 text-blue-500" /> Public Portal
            </span>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              Open Website <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  EVENTS ADMIN (WITH 1-CLICK STATUS SWITCH)
// ═══════════════════════════════════════════════════════════════════════

function EventsAdmin() {
  const [events, setEvents] = useState<(ClubEvent & { id?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<(ClubEvent & { id?: string }) | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showHomepageEvents, setShowHomepageEvents] = useState(true);
  const [updatingSetting, setUpdatingSetting] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const [data, siteSettings] = await Promise.all([getEvents(true), getSiteSettings()]);
      setEvents(data);
      setShowHomepageEvents(siteSettings.showHomepageEvents ?? true);
    } catch {
      toast.error("Failed to load events data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleToggleHomepageEvents = async () => {
    const nextVal = !showHomepageEvents;
    setShowHomepageEvents(nextVal);
    setUpdatingSetting(true);
    try {
      await updateSiteSettings({ showHomepageEvents: nextVal });
      toast.success(
        nextVal
          ? "Homepage Events Section enabled (Visible on homepage)"
          : "Homepage Events Section disabled (Hidden from homepage)",
      );
    } catch {
      setShowHomepageEvents(!nextVal);
      toast.error("Failed to update homepage events setting");
    } finally {
      setUpdatingSetting(false);
    }
  };

  const handleQuickStatusChange = async (
    event: ClubEvent & { id?: string },
    nextStatus: ClubEvent["status"],
  ) => {
    if (!event.id) return;
    try {
      await updateEvent(event.id, { status: nextStatus });
      toast.success(`Event status marked as '${nextStatus}'`);
      fetchEvents();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event? This will move it to Trash.")) return;
    try {
      await deleteEvent(id);
      toast.success("Event moved to trash (Recoverable for 100 hours)");
      fetchEvents();
    } catch {
      toast.error("Failed to delete event.");
    }
  };

  const handleSaveEvent = async (data: Partial<ClubEvent>) => {
    try {
      if (editingEvent?.id) {
        await updateEvent(editingEvent.id, data);
        toast.success("Event updated successfully");
      } else {
        await createEvent(data);
        toast.success("Event created successfully");
      }
      setShowAddForm(false);
      setEditingEvent(null);
      fetchEvents();
    } catch {
      toast.error("Failed to save event.");
    }
  };

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      searchQuery === "" ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.summary && e.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.venue && e.venue.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      categoryFilter === "all" || e.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus =
      statusFilter === "all" || e.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Homepage Events Section Toggle Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-surface border border-border/80 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="size-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Sliders className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-foreground">Homepage Events Grid</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  showHomepageEvents
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                    : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                }`}
              >
                {showHomepageEvents ? "VISIBLE ON HOMEPAGE" : "HIDDEN FROM HOMEPAGE"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Controls whether the upcoming events section is displayed on the public landing page.
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={showHomepageEvents}
          disabled={updatingSetting}
          onClick={handleToggleHomepageEvents}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${
            showHomepageEvents
              ? "bg-primary shadow-[0_0_10px_rgba(217,72,15,0.4)]"
              : "bg-muted-foreground/30"
          } ${updatingSetting ? "opacity-60 cursor-wait" : ""}`}
        >
          <span
            className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
              showHomepageEvents ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      {/* Filter and Actions Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, venue..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-border/70 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-2xl border border-border/70 bg-surface px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          >
            <option value="all">All Categories</option>
            <option value="Workshop">Workshop</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Fest">Fest</option>
            <option value="Competition">Competition</option>
            <option value="Seminar">Seminar</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-border/70 bg-surface px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          >
            <option value="all">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button
          onClick={() => {
            setEditingEvent(null);
            setShowAddForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 transition-all shrink-0"
        >
          <Plus className="size-4" /> Create Event
        </button>
      </div>

      {showAddForm && (
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={() => {
            setShowAddForm(false);
            setEditingEvent(null);
          }}
        />
      )}

      {/* Events Table */}
      <div className="bg-surface rounded-3xl border border-border/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] font-mono text-muted-foreground uppercase bg-surface-strong/70 border-b border-border/70">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Event & Poster</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status & Quick Toggle</th>
                <th className="px-6 py-4 font-bold tracking-wider">Date & Venue</th>
                <th className="px-6 py-4 font-bold tracking-wider">Category</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-0">
                    <LoadingState />
                  </td>
                </tr>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((e) => {
                  return (
                    <tr
                      key={e.id || e.slug || e.title}
                      className="hover:bg-surface-strong/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <EventCoverThumbnail cover={e.cover} title={e.title} />
                          <div className="min-w-0">
                            <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                              {e.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-sm">
                              {e.summary || "Campus event"}
                            </p>
                            {(e.link1Url || e.link2Url || e.googleFormUrl) && (
                              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                                {e.googleFormUrl && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-semibold">
                                    Registration Form
                                  </span>
                                )}
                                {e.link1Url && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
                                    {e.link1Title || "Link 1"}
                                  </span>
                                )}
                                {e.link2Url && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20 font-semibold">
                                    {e.link2Title || "Link 2"}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={e.status} />
                          {e.id && (
                            <button
                              onClick={() => {
                                const next =
                                  e.status === "upcoming"
                                    ? "past"
                                    : e.status === "past"
                                      ? "upcoming"
                                      : "upcoming";
                                handleQuickStatusChange(e, next);
                              }}
                              className="text-[10px] font-mono text-muted-foreground hover:text-foreground px-2 py-0.5 rounded-lg border border-border/60 hover:bg-surface-strong transition-colors"
                              title="Toggle status"
                            >
                              Toggle
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <p className="font-medium text-foreground text-xs">{e.date}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {e.venue || "Campus"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-strong text-foreground border border-border/70 capitalize">
                          {e.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          <a
                            href={`/events`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl text-muted-foreground hover:bg-surface-strong hover:text-foreground transition-colors"
                            title="View on site"
                          >
                            <Eye className="size-4" />
                          </a>
                          <button
                            onClick={() => {
                              setEditingEvent(e);
                              setShowAddForm(true);
                            }}
                            className="p-2 rounded-xl text-muted-foreground hover:bg-surface-strong hover:text-foreground transition-colors"
                            title="Edit Details"
                          >
                            <Edit3 className="size-4" />
                          </button>
                          {e.id && (
                            <button
                              onClick={() => handleDelete(e.id!)}
                              className="p-2 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-0">
                    <EmptyState message="No events matched your search or filters." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EventForm({
  event,
  onSave,
  onCancel,
}: {
  event: (ClubEvent & { id?: string }) | null;
  onSave: (data: Partial<ClubEvent>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<ClubEvent>>({
    title: (event?.title || "") as string,
    slug: (event?.slug || "") as string,
    summary: (event?.summary || "") as string,
    description: event?.description || [],
    date: (event?.date || "") as string,
    endDate: event?.endDate || "",
    venue: (event?.venue || "") as string,
    category: event?.category || "Workshop",
    status: event?.status || "upcoming",
    cover: (event?.cover || "") as string,
    googleFormUrl: event?.googleFormUrl || "",
    link1Title: event?.link1Title || "",
    link1Url: event?.link1Url || "",
    link2Title: event?.link2Title || "",
    link2Url: event?.link2Url || "",
  });

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim() || !form.date || !form.summary?.trim()) {
      toast.error("Title, Date, and Summary are required");
      return;
    }
    const finalForm: Partial<ClubEvent> = { ...form };
    if (!finalForm.slug) {
      finalForm.slug = event?.slug || generateSlug(finalForm.title!);
    }

    const parsedDate = new Date(finalForm.date!);
    const parsedYear = !isNaN(parsedDate.getFullYear())
      ? parsedDate.getFullYear()
      : new Date().getFullYear();
    finalForm.year =
      typeof finalForm.year === "number" && !isNaN(finalForm.year) ? finalForm.year : parsedYear;

    if (!finalForm.description || finalForm.description.length === 0) {
      finalForm.description = [finalForm.summary!.trim()];
    }

    if (!finalForm.domains) finalForm.domains = [];
    if (!finalForm.gallery) finalForm.gallery = [];

    if ((finalForm.status as string) === "completed") {
      finalForm.status = "past";
    }

    if (finalForm.link1Title) finalForm.link1Title = finalForm.link1Title.trim();
    if (finalForm.link1Url) finalForm.link1Url = finalForm.link1Url.trim();
    if (finalForm.link2Title) finalForm.link2Title = finalForm.link2Title.trim();
    if (finalForm.link2Url) finalForm.link2Url = finalForm.link2Url.trim();

    onSave(finalForm);
  };

  return (
    <div className="bg-surface rounded-3xl border border-border/80 p-6 sm:p-8 mb-8 shadow-md animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-6 border-b border-border/70 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
            Event Management
          </span>
          <h3 className="font-display font-extrabold text-xl text-foreground">
            {event ? "Edit Event Record" : "Create New Club Event"}
          </h3>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl hover:bg-surface-strong text-muted-foreground transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Title *
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Full-Stack Web Development Bootcamp"
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Summary * (Brief teaser for cards)
            </label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              rows={2}
              placeholder="Write a catchy 1-2 sentence overview of the event..."
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Start Date *
            </label>
            <input
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              placeholder="e.g. May 15, 2026"
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              End Date (Optional)
            </label>
            <input
              value={form.endDate || ""}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              placeholder="e.g. May 16, 2026"
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Venue
            </label>
            <input
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              placeholder="e.g. CS Lab 3 / Audi B"
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as ClubEvent["category"] })
              }
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            >
              <option value="Workshop">Workshop</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Fest">Fest</option>
              <option value="Competition">Competition</option>
              <option value="Seminar">Seminar</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as ClubEvent["status"] })}
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past / Completed</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Registration URL (Google Form / Unstop)
            </label>
            <input
              value={form.googleFormUrl || ""}
              onChange={(e) => setForm({ ...form, googleFormUrl: e.target.value })}
              placeholder="https://forms.gle/... or https://unstop.com/..."
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          {/* Additional Action Links Section */}
          <div className="md:col-span-2 lg:col-span-3 pt-2">
            <div className="rounded-2xl border border-border/70 bg-surface-strong/40 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <ExternalLink className="size-3.5 text-primary" />
                    Additional Resource Links (Optional)
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Add direct links for WhatsApp group, Rulebook, Event Brochure, or Discord. These
                    will show as buttons beside "Register Now" only when entered.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Link 1 Title
                  </label>
                  <input
                    value={form.link1Title || ""}
                    onChange={(e) => setForm({ ...form, link1Title: e.target.value })}
                    placeholder="e.g. WhatsApp Group or Rulebook"
                    className="w-full rounded-xl border border-border/70 bg-surface px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Link 1 URL
                  </label>
                  <input
                    value={form.link1Url || ""}
                    onChange={(e) => setForm({ ...form, link1Url: e.target.value })}
                    placeholder="https://chat.whatsapp.com/... or https://drive.google.com/..."
                    className="w-full rounded-xl border border-border/70 bg-surface px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Link 2 Title
                  </label>
                  <input
                    value={form.link2Title || ""}
                    onChange={(e) => setForm({ ...form, link2Title: e.target.value })}
                    placeholder="e.g. Event Brochure or Discord"
                    className="w-full rounded-xl border border-border/70 bg-surface px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Link 2 URL
                  </label>
                  <input
                    value={form.link2Url || ""}
                    onChange={(e) => setForm({ ...form, link2Url: e.target.value })}
                    placeholder="https://drive.google.com/... or https://..."
                    className="w-full rounded-xl border border-border/70 bg-surface px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Cover Poster URL
            </label>
            <input
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              placeholder="https://... (WebP, JPG or PNG URL)"
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
            {form.cover && (
              <div className="mt-3 p-3 rounded-2xl bg-surface-strong border border-border/70 flex items-center gap-4">
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-surface border border-border shadow-sm shrink-0">
                  <img
                    src={form.cover}
                    alt="Preview"
                    className="size-full object-cover"
                    onError={(e) => ((e.target as HTMLElement).style.display = "none")}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Live Cover Preview:</span> Poster
                  will appear with rounded corners across event cards and hero banner.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-border/70">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl px-5 py-2.5 text-sm font-semibold hover:bg-surface-strong transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            <Save className="size-4" /> {event ? "Update Event" : "Publish Event"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  MEMBERS ADMIN (WITH AVATAR PHOTOS & TIER CHIPS)
// ═══════════════════════════════════════════════════════════════════════

function MembersAdmin() {
  const [members, setMembers] = useState<(Member & { id?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<(Member & { id?: string }) | null>(null);
  const [filterTier, setFilterTier] = useState<MemberTier | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMembers = async () => {
    setLoading(true);
    const data = await getMembers();
    setMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Move this member record to Trash?")) return;
    try {
      await deleteMember(id);
      toast.success("Member moved to trash (Recoverable for 100 hours)");
      fetchMembers();
    } catch {
      toast.error("Failed to delete member.");
    }
  };

  const handleSave = async (data: Partial<Member>) => {
    try {
      if (editingMember?.id) {
        await updateMember(editingMember.id, data);
        toast.success("Member record updated successfully");
      } else {
        await createMember(data);
        toast.success("New member added to directory");
      }
      setShowForm(false);
      setEditingMember(null);
      fetchMembers();
    } catch {
      toast.error("Failed to save member.");
    }
  };

  const filteredMembers = members.filter((m) => {
    const matchesTier = filterTier === "all" || m.tier === filterTier;
    const matchesSearch =
      searchQuery === "" ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.course && m.course.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search member name, designation..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-border/70 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Tier Selector */}
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value as MemberTier | "all")}
            className="rounded-2xl border border-border/70 bg-surface px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
          >
            <option value="all">All Tiers ({members.length})</option>
            {(Object.keys(tierMeta) as MemberTier[]).map((t) => (
              <option key={t} value={t}>
                {tierMeta[t].label} ({members.filter((m) => m.tier === t).length})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setEditingMember(null);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 transition-all shrink-0"
        >
          <Plus className="size-4" /> Add Officer
        </button>
      </div>

      {showForm && (
        <MemberForm
          member={editingMember}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingMember(null);
          }}
        />
      )}

      {/* Members Table */}
      <div className="bg-surface rounded-3xl border border-border/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] font-mono text-muted-foreground uppercase bg-surface-strong/70 border-b border-border/70">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Member Avatar & Name</th>
                <th className="px-6 py-4 font-bold tracking-wider">Tier</th>
                <th className="px-6 py-4 font-bold tracking-wider">Designation</th>
                <th className="px-6 py-4 font-bold tracking-wider">Course</th>
                <th className="px-6 py-4 font-bold tracking-wider">Social Links</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-0">
                    <LoadingState />
                  </td>
                </tr>
              ) : filteredMembers.length > 0 ? (
                filteredMembers.map((m) => (
                  <tr
                    key={m.id || m.name}
                    className="hover:bg-surface-strong/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <MemberAvatar photo={m.photo} name={m.name} size="md" />
                        <div>
                          <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                            {m.name}
                          </p>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">
                            {m.club || "TFC"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase font-mono tracking-wider border ${
                          m.tier === "faculty"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                            : m.tier === "gsec"
                              ? "bg-purple-500/10 text-purple-500 border-purple-500/30"
                              : m.tier === "jsec"
                                ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/30"
                                : m.tier === "head"
                                  ? "bg-blue-500/10 text-blue-500 border-blue-500/30"
                                  : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                        }`}
                      >
                        {m.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground text-xs">
                      {m.designation}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {m.course || "SRMU"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {m.socials?.linkedin && (
                          <a
                            href={m.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                            title="LinkedIn"
                          >
                            <Linkedin className="size-3.5" />
                          </a>
                        )}
                        {m.socials?.github && (
                          <a
                            href={m.socials.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-strong transition-colors"
                            title="GitHub"
                          >
                            <Github className="size-3.5" />
                          </a>
                        )}
                        {m.socials?.instagram && (
                          <a
                            href={m.socials.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10 transition-colors"
                            title="Instagram"
                          >
                            <Instagram className="size-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingMember(m);
                            setShowForm(true);
                          }}
                          className="p-2 rounded-xl text-muted-foreground hover:bg-surface-strong hover:text-foreground transition-colors"
                          title="Edit Officer"
                        >
                          <Edit3 className="size-4" />
                        </button>
                        {m.id && (
                          <button
                            onClick={() => handleDelete(m.id!)}
                            className="p-2 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-0">
                    <EmptyState message="No members found matching selected criteria." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MemberForm({
  member,
  onSave,
  onCancel,
}: {
  member: (Member & { id?: string }) | null;
  onSave: (data: Partial<Member>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Member>>({
    name: member?.name || "",
    designation: member?.designation || "",
    tier: member?.tier || "core",
    course: member?.course || "",
    bio: member?.bio || "",
    photo: member?.photo || "",
    club: member?.club || "TFC",
    socials: member?.socials || {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.designation?.trim()) {
      toast.error("Name and designation are required");
      return;
    }
    const cleanedSocials: Record<string, string> = {};
    if (form.socials) {
      for (const [k, v] of Object.entries(form.socials)) {
        if (typeof v === "string" && v.trim() !== "") {
          cleanedSocials[k] = v.trim();
        }
      }
    }
    const finalForm: Partial<Member> = {
      ...form,
      name: form.name.trim(),
      designation: form.designation.trim(),
      course: form.course?.trim() || "SRMU",
      bio: form.bio?.trim().slice(0, 100) || "",
      photo: form.photo?.trim() || "",
      club: form.club || "TFC",
      socials: cleanedSocials,
    };
    onSave(finalForm);
  };

  return (
    <div className="bg-surface rounded-3xl border border-border/80 p-6 sm:p-8 mb-8 shadow-md animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-6 border-b border-border/70 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
            Officer Profile
          </span>
          <h3 className="font-display font-extrabold text-xl text-foreground">
            {member ? "Edit Officer Record" : "Add Officer to Directory"}
          </h3>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl hover:bg-surface-strong text-muted-foreground transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField
            label="Full Name *"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            placeholder="e.g. Rahul Sharma"
          />
          <InputField
            label="Designation *"
            value={form.designation}
            onChange={(v) => setForm({ ...form, designation: v })}
            placeholder="e.g. Technical Lead / Coordinator"
          />
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Club Tier *
            </label>
            <select
              value={form.tier}
              onChange={(e) => setForm({ ...form, tier: e.target.value as MemberTier })}
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            >
              {(Object.keys(tierMeta) as MemberTier[]).map((t) => (
                <option key={t} value={t}>
                  {tierMeta[t].label}
                </option>
              ))}
            </select>
          </div>
          <InputField
            label="Course / Program"
            value={form.course}
            onChange={(v) => setForm({ ...form, course: v })}
            placeholder="e.g. B.Tech CSE, BCA, MCA"
          />
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Club Affiliation
            </label>
            <select
              value={form.club || "TFC"}
              onChange={(e) => setForm({ ...form, club: e.target.value as "TFC" | "Esports" })}
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            >
              <option value="TFC">Tech Fusion Club (TFC)</option>
              <option value="Esports">Esports Division</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Badge Bio (Max 100)
              </label>
              <span className="text-[10px] font-mono text-muted-foreground">
                {form.bio?.length || 0}/100
              </span>
            </div>
            <input
              value={form.bio || ""}
              onChange={(e) => setForm({ ...form, bio: e.target.value.slice(0, 100) })}
              maxLength={100}
              placeholder="Short bio for member pass..."
              className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
            />
          </div>

          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Profile Photo URL
            </label>
            <div className="flex items-center gap-4">
              <input
                value={form.photo}
                onChange={(e) => setForm({ ...form, photo: e.target.value })}
                placeholder="https://... (direct image URL)"
                className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
              {form.photo && (
                <div className="size-12 rounded-full overflow-hidden bg-surface-strong border-2 border-primary/50 shrink-0 shadow-md">
                  <img
                    src={form.photo}
                    alt="Preview"
                    className="size-full object-cover"
                    onError={(e) => ((e.target as HTMLElement).style.display = "none")}
                  />
                </div>
              )}
            </div>
          </div>

          <InputField
            label="LinkedIn Profile"
            value={form.socials?.linkedin || ""}
            onChange={(v) => setForm({ ...form, socials: { ...form.socials, linkedin: v } })}
            placeholder="https://linkedin.com/in/..."
          />
          <InputField
            label="GitHub Profile"
            value={form.socials?.github || ""}
            onChange={(v) => setForm({ ...form, socials: { ...form.socials, github: v } })}
            placeholder="https://github.com/..."
          />
          <InputField
            label="Instagram Profile"
            value={form.socials?.instagram || ""}
            onChange={(v) => setForm({ ...form, socials: { ...form.socials, instagram: v } })}
            placeholder="https://instagram.com/..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-border/70">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl px-5 py-2.5 text-sm font-semibold hover:bg-surface-strong transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            <Save className="size-4" /> {member ? "Update Member" : "Save Member"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  ALUMNI ADMIN
// ═══════════════════════════════════════════════════════════════════════

function AlumniAdmin() {
  const [alumni, setAlumni] = useState<(Alumnus & { id?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAlumnus, setEditingAlumnus] = useState<(Alumnus & { id?: string }) | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAlumni = async () => {
    setLoading(true);
    const data = await getAlumni();
    setAlumni(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Move this alumnus record to trash?")) return;
    try {
      await deleteAlumnus(id);
      toast.success("Alumnus moved to trash");
      fetchAlumni();
    } catch {
      toast.error("Failed to delete alumnus.");
    }
  };

  const handleSave = async (data: Partial<Alumnus>) => {
    try {
      if (editingAlumnus?.id) {
        await updateAlumnus(editingAlumnus.id, data);
        toast.success("Alumnus record updated");
      } else {
        await createAlumnus(data);
        toast.success("Alumnus added to honors wall");
      }
      setShowForm(false);
      setEditingAlumnus(null);
      fetchAlumni();
    } catch {
      toast.error("Failed to save alumnus.");
    }
  };

  const filteredAlumni = alumni.filter(
    (a) =>
      searchQuery === "" ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.post.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.course.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search alumni by name, post..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-border/70 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
          />
        </div>

        <button
          onClick={() => {
            setEditingAlumnus(null);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 transition-all shrink-0"
        >
          <Plus className="size-4" /> Add Alumnus
        </button>
      </div>

      {showForm && (
        <AlumnusForm
          alumnus={editingAlumnus}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingAlumnus(null);
          }}
        />
      )}

      {/* Alumni Table */}
      <div className="bg-surface rounded-3xl border border-border/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] font-mono text-muted-foreground uppercase bg-surface-strong/70 border-b border-border/70">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Alumnus & Photo</th>
                <th className="px-6 py-4 font-bold tracking-wider">Course</th>
                <th className="px-6 py-4 font-bold tracking-wider">Tenure</th>
                <th className="px-6 py-4 font-bold tracking-wider">Past Role / Post</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-0">
                    <LoadingState />
                  </td>
                </tr>
              ) : filteredAlumni.length > 0 ? (
                filteredAlumni.map((a) => (
                  <tr
                    key={a.id || a.name}
                    className="hover:bg-surface-strong/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <MemberAvatar photo={a.photo} name={a.name} size="md" />
                        <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                          {a.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{a.course}</td>
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-primary">
                      {a.tenure}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground text-xs">{a.post}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingAlumnus(a);
                            setShowForm(true);
                          }}
                          className="p-2 rounded-xl text-muted-foreground hover:bg-surface-strong hover:text-foreground transition-colors"
                        >
                          <Edit3 className="size-4" />
                        </button>
                        {a.id && (
                          <button
                            onClick={() => handleDelete(a.id!)}
                            className="p-2 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-0">
                    <EmptyState message="No alumni records found." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AlumnusForm({
  alumnus,
  onSave,
  onCancel,
}: {
  alumnus: (Alumnus & { id?: string }) | null;
  onSave: (data: Partial<Alumnus>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Alumnus>>({
    name: alumnus?.name || "",
    course: alumnus?.course || "",
    tenure: alumnus?.tenure || "",
    post: alumnus?.post || "",
    photo: alumnus?.photo || "",
    socials: alumnus?.socials || {},
  });

  return (
    <div className="bg-surface rounded-3xl border border-border/80 p-6 sm:p-8 mb-8 shadow-md animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-6 border-b border-border/70 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
            Alumni Wall
          </span>
          <h3 className="font-display font-extrabold text-xl text-foreground">
            {alumnus ? "Edit Alumnus Details" : "Add Former Officer / Alumnus"}
          </h3>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl hover:bg-surface-strong text-muted-foreground transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InputField
          label="Full Name *"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          placeholder="e.g. Priyanshu Gupta"
        />
        <InputField
          label="Course / Program"
          value={form.course}
          onChange={(v) => setForm({ ...form, course: v })}
          placeholder="e.g. B.Tech CSE (2020-2024)"
        />
        <InputField
          label="Tenure / Batch"
          value={form.tenure}
          onChange={(v) => setForm({ ...form, tenure: v })}
          placeholder="e.g. 2022 - 2024"
        />
        <InputField
          label="Past Role / Position"
          value={form.post}
          onChange={(v) => setForm({ ...form, post: v })}
          placeholder="e.g. Former General Secretary"
        />
        <InputField
          label="Photo URL"
          value={form.photo}
          onChange={(v) => setForm({ ...form, photo: v })}
          placeholder="https://..."
        />
        <InputField
          label="LinkedIn Profile"
          value={form.socials?.linkedin || ""}
          onChange={(v) => setForm({ ...form, socials: { ...form.socials, linkedin: v } })}
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-border/70">
        <button
          onClick={onCancel}
          className="rounded-2xl px-5 py-2.5 text-sm font-semibold hover:bg-surface-strong transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!form.name?.trim()) {
              toast.error("Name is required");
              return;
            }
            const cleanedSocials: Record<string, string> = {};
            if (form.socials) {
              for (const [k, v] of Object.entries(form.socials)) {
                if (typeof v === "string" && v.trim() !== "") {
                  cleanedSocials[k] = v.trim();
                }
              }
            }
            onSave({
              ...form,
              name: form.name.trim(),
              course: form.course?.trim() || "B.Tech CSE",
              tenure: form.tenure?.trim() || "Alumni",
              post: form.post?.trim() || "Past Member",
              photo: form.photo?.trim() || "",
              socials: cleanedSocials,
            });
          }}
          className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 transition-all"
        >
          <Save className="size-4" /> {alumnus ? "Update Record" : "Save Alumnus"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  GALLERY ADMIN (WITH PHOTO MASONRY & LIVE PREVIEWS)
// ═══════════════════════════════════════════════════════════════════════

function GalleryAdmin() {
  const [photos, setPhotos] = useState<(GalleryPhoto & { id?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    const data = await getGalleryPhotos();
    setPhotos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery photo?")) return;
    try {
      await deleteGalleryPhoto(id);
      toast.success("Photo removed from gallery");
      fetchPhotos();
    } catch {
      toast.error("Failed to delete photo.");
    }
  };

  const handleAdd = async (data: Partial<GalleryPhoto>) => {
    try {
      await createGalleryPhoto(data);
      toast.success("Photo published to campus gallery");
      setShowForm(false);
      fetchPhotos();
    } catch {
      toast.error("Failed to add photo.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-foreground">Campus Gallery</h3>
          <p className="text-xs text-muted-foreground">{photos.length} photos published live</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 transition-all"
        >
          <Plus className="size-4" /> Upload Photo
        </button>
      </div>

      {showForm && <GalleryForm onSave={handleAdd} onCancel={() => setShowForm(false)} />}

      {loading ? (
        <LoadingState />
      ) : photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {photos.map((p) => (
            <div
              key={p.id || p.src}
              className="group relative rounded-2xl overflow-hidden border border-border/80 bg-surface shadow-sm aspect-square"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 backdrop-blur-[2px]">
                <p className="text-xs font-bold text-foreground truncate">{p.event}</p>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{p.year}</p>
                {p.id && (
                  <button
                    onClick={() => handleDelete(p.id!)}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-xl bg-destructive/15 text-destructive border border-destructive/25 py-1.5 text-xs font-semibold hover:bg-destructive hover:text-white transition-colors"
                  >
                    <Trash2 className="size-3" /> Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No photos in gallery. Click 'Upload Photo' to publish one." />
      )}
    </div>
  );
}

function GalleryForm({
  onSave,
  onCancel,
}: {
  onSave: (data: Partial<GalleryPhoto>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<GalleryPhoto>>({
    src: "",
    alt: "",
    event: "",
    eventSlug: "",
    year: new Date().getFullYear(),
  });

  return (
    <div className="bg-surface rounded-3xl border border-border/80 p-6 sm:p-8 mb-8 shadow-md animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-6 border-b border-border/70 pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
            Media Library
          </span>
          <h3 className="font-display font-extrabold text-xl text-foreground">Publish New Photo</h3>
        </div>
        <button
          onClick={onCancel}
          className="p-2 rounded-xl hover:bg-surface-strong text-muted-foreground transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2 md:col-span-2">
          <InputField
            label="Image URL *"
            value={form.src}
            onChange={(v) => setForm({ ...form, src: v })}
            placeholder="https://..."
          />
          {form.src && (
            <div className="mt-2 h-28 rounded-2xl overflow-hidden bg-surface-strong border border-border/70 max-w-xs shadow-sm">
              <img
                src={form.src}
                alt="Preview"
                className="size-full object-cover"
                onError={(e) => ((e.target as HTMLElement).style.display = "none")}
              />
            </div>
          )}
        </div>
        <InputField
          label="Alt Text / Caption *"
          value={form.alt}
          onChange={(v) => setForm({ ...form, alt: v })}
          placeholder="e.g. Students coding at HackFusion 2025"
        />
        <InputField
          label="Event Name"
          value={form.event}
          onChange={(v) => setForm({ ...form, event: v })}
          placeholder="e.g. HackFusion 2025"
        />
        <div className="space-y-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Year
          </label>
          <input
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
            className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-border/70">
        <button
          onClick={onCancel}
          className="rounded-2xl px-5 py-2.5 text-sm font-semibold hover:bg-surface-strong transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (!form.src?.trim() || !form.alt?.trim()) {
              toast.error("Image URL and Alt text are required");
              return;
            }
            const parsedYear = Number(form.year) || new Date().getFullYear();
            const autoSlug = (form.event?.trim() || "campus")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");
            onSave({
              ...form,
              src: form.src.trim(),
              alt: form.alt.trim(),
              event: form.event?.trim() || "Campus Event",
              eventSlug: autoSlug,
              year: isNaN(parsedYear) ? new Date().getFullYear() : parsedYear,
            });
          }}
          className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 transition-all"
        >
          <Save className="size-4" /> Save Photo
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  SETTINGS & PORTAL CONTROLS ADMIN (REAL ESSENTIAL UTILITIES)
// ═══════════════════════════════════════════════════════════════════════

function SettingsAdmin() {
  const handleExportBackup = async () => {
    try {
      toast.info("Generating full portal snapshot...");
      const [events, members, alumni, gallery] = await Promise.all([
        getEvents(true),
        getMembers(),
        getAlumni(),
        getGalleryPhotos(),
      ]);
      const backup = {
        exportedAt: new Date().toISOString(),
        club: "Tech Fusion Club (SRMU)",
        counts: {
          events: events.length,
          members: members.length,
          alumni: alumni.length,
          gallery: gallery.length,
        },
        data: { events, members, alumni, gallery },
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `TechFusion_Backup_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Database snapshot downloaded successfully");
    } catch {
      toast.error("Failed to create snapshot");
    }
  };

  return (
    <div className="space-y-8">
      {/* 2-Column Grid of System Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authorized Members Security Matrix */}
        <div className="bg-surface rounded-3xl border border-border/80 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-border/70 pb-4">
            <div className="size-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">
                Authorized Admin Matrix
              </h3>
              <p className="text-xs text-muted-foreground">
                Accounts permitted to access and modify portal data
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {AUTHORIZED_EMAILS.map((email) => (
              <div
                key={email}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-strong border border-border/60"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-mono font-bold text-xs">
                    {email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground font-mono">{email}</p>
                    <p className="text-[10px] text-muted-foreground">Google OAuth Verified</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                  Super Admin
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed pt-2">
            Authorization is strictly validated at both application runtime and in Google Cloud
            Firestore Security Rules.
          </p>
        </div>

        {/* Database & System Architecture Diagnostics */}
        <div className="bg-surface rounded-3xl border border-border/80 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-border/70 pb-4">
            <div className="size-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Database className="size-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">Cloud Architecture</h3>
              <p className="text-xs text-muted-foreground">Underlying services & environment</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-surface-strong border border-border/60">
              <p className="text-muted-foreground font-mono text-[10px] uppercase">Database</p>
              <p className="font-bold text-foreground mt-0.5">Google Cloud Firestore</p>
              <span className="text-emerald-500 text-[10px] font-mono">● Connected (v11)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-strong border border-border/60">
              <p className="text-muted-foreground font-mono text-[10px] uppercase">
                Authentication
              </p>
              <p className="font-bold text-foreground mt-0.5">Google Identity SSO</p>
              <span className="text-emerald-500 text-[10px] font-mono">● Enforced</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-strong border border-border/60">
              <p className="text-muted-foreground font-mono text-[10px] uppercase">
                Retention Buffer
              </p>
              <p className="font-bold text-foreground mt-0.5">100-Hour Trash Bin</p>
              <span className="text-primary text-[10px] font-mono">● Active</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-strong border border-border/60">
              <p className="text-muted-foreground font-mono text-[10px] uppercase">Institution</p>
              <p className="font-bold text-foreground mt-0.5">SRMU Lucknow</p>
              <span className="text-muted-foreground text-[10px] font-mono">Faculty of CS</span>
            </div>
          </div>
        </div>

        {/* Point-in-Time Data Backup */}
        <div className="lg:col-span-2 bg-surface rounded-3xl border border-border/80 p-6 sm:p-8 space-y-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                <Download className="size-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Data Backup & Archive
                </h3>
                <p className="text-xs text-muted-foreground">
                  Download full offline JSON snapshot of portal
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Export an instant JSON snapshot containing all events, members, alumni wall entries,
              and gallery records. Keep this backup safe before major campus fests or transitions.
            </p>
          </div>

          <button
            onClick={handleExportBackup}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs py-3.5 px-6 transition-all shadow-sm hover:shadow-primary/20 shrink-0"
          >
            <Download className="size-4" /> Download Full JSON Backup
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  TRASH ADMIN (WITH RECOVERY TIMELINE & CONFIRMATIONS)
// ═══════════════════════════════════════════════════════════════════════

function TrashAdmin() {
  const [items, setItems] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    setLoading(true);
    const data = await getTrashItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id: string) => {
    try {
      await restoreTrashItem(id);
      toast.success("Item restored back to its collection");
      fetchTrash();
    } catch {
      toast.error("Failed to restore item");
    }
  };

  const handlePermanentDelete = async (id: string) => {
    if (!confirm("Are you sure? This cannot be recovered once permanently erased.")) return;
    try {
      await deleteTrashItemPermanently(id);
      toast.success("Item permanently purged from database");
      fetchTrash();
    } catch {
      toast.error("Failed to delete item");
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6">
      {/* 100-Hour Safety Notice Banner */}
      <div className="p-6 rounded-3xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md flex items-start gap-4">
        <Clock className="size-6 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-display font-bold text-sm text-foreground">
            Automatic 100-Hour Retention Window
          </h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Items deleted by club admin are safeguarded here for 100 hours before automated
            permanent garbage collection. You can restore items at any point during this grace
            period.
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-3xl border border-border/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] font-mono text-muted-foreground uppercase bg-surface-strong/70 border-b border-border/70">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Item Details</th>
                <th className="px-6 py-4 font-bold tracking-wider">Original Collection</th>
                <th className="px-6 py-4 font-bold tracking-wider">Retention Countdown</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {items.length > 0 ? (
                items.map((item) => {
                  const msLeft = item.expiresAt - Date.now();
                  const hoursLeft = Math.max(0, Math.floor(msLeft / (1000 * 60 * 60)));
                  const itemLabel = String(
                    item.data?.["title"] ||
                      item.data?.["name"] ||
                      item.data?.["headline"] ||
                      item.originalId,
                  );

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-surface-strong/50 transition-colors group"
                    >
                      <td className="px-6 py-4 font-bold text-foreground text-sm">{itemLabel}</td>
                      <td className="px-6 py-4 font-mono text-xs uppercase text-muted-foreground">
                        <span className="px-2.5 py-1 rounded-full bg-surface-strong border border-border/60">
                          {item.originalCollection}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                            hoursLeft < 24
                              ? "bg-destructive/10 text-destructive border-destructive/25"
                              : "bg-surface-strong text-muted-foreground border-border/60"
                          }`}
                        >
                          {hoursLeft}h remaining
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-emerald-500 hover:bg-emerald-500/10 font-semibold text-xs transition-colors border border-emerald-500/20"
                            title="Restore"
                          >
                            <RotateCcw className="size-3.5" /> Restore
                          </button>
                          <button
                            onClick={() => handlePermanentDelete(item.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-destructive hover:bg-destructive/10 font-semibold text-xs transition-colors border border-destructive/20"
                            title="Delete Permanently"
                          >
                            <Trash2 className="size-3.5" /> Purge
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="p-0">
                    <EmptyState message="Trash bin is clean. No deleted items awaiting purge." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  SHARED REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════

function MemberAvatar({
  photo,
  name,
  size = "md",
}: {
  photo?: string | undefined;
  name: string;
  size?: "sm" | "md" | "lg" | undefined;
}) {
  const [error, setError] = useState(false);
  const sizeClasses = {
    sm: "size-9 text-xs",
    md: "size-11 text-sm",
    lg: "size-14 text-base",
  }[size];

  const initial = (name || "O").trim().charAt(0).toUpperCase();

  return (
    <div
      className={`${sizeClasses} rounded-full bg-surface-strong overflow-hidden border-2 border-border shadow-sm shrink-0 flex items-center justify-center`}
    >
      {photo && !error ? (
        <img
          src={photo}
          alt={name}
          onError={() => setError(true)}
          className="size-full object-cover transition-transform duration-300"
        />
      ) : (
        <div className="size-full flex items-center justify-center font-bold font-display bg-primary/10 text-primary">
          {initial}
        </div>
      )}
    </div>
  );
}

function EventCoverThumbnail({ cover, title }: { cover?: string | undefined; title: string }) {
  const [error, setError] = useState(false);
  return (
    <div className="w-16 h-11 rounded-xl overflow-hidden bg-surface-strong border border-border shadow-sm shrink-0 flex items-center justify-center">
      {cover && !error ? (
        <img
          src={cover}
          alt={title}
          onError={() => setError(true)}
          className="size-full object-cover transition-transform duration-300"
        />
      ) : (
        <div className="size-full flex items-center justify-center bg-primary/10 text-primary">
          <Calendar className="size-4" />
        </div>
      )}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value?: string | undefined;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border/70 bg-surface-strong px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/60"
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isUpcoming = status === "upcoming";
  const isCompleted = status === "completed" || status === "past";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase font-mono font-bold tracking-wider ${
        isUpcoming
          ? "text-blue-500 border-blue-500/30 bg-blue-500/10"
          : isCompleted
            ? "text-emerald-500 border-emerald-500/30 bg-emerald-500/10"
            : "text-muted-foreground border-border bg-surface-strong"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${
          isUpcoming ? "bg-blue-500 animate-pulse" : isCompleted ? "bg-emerald-500" : "bg-zinc-400"
        }`}
      />
      {status}
    </span>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-muted-foreground">
      <div className="relative mb-4">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Loading Records...
      </p>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center">
      <div className="size-16 rounded-2xl bg-surface-strong flex items-center justify-center mb-4 border border-border/70 shadow-inner">
        <AlertCircle className="size-7 text-muted-foreground/60" />
      </div>
      <h3 className="font-display font-bold text-base text-foreground mb-1">No Records Found</h3>
      <p className="text-muted-foreground text-xs max-w-sm leading-relaxed">{message}</p>
    </div>
  );
}
