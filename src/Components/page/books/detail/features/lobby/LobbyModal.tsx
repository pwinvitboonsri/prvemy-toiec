"use client";
import {
  X,
  Settings2,
  Play,
  ShoppingCart,
  LogIn,
  Zap,
  Calendar,
} from "lucide-react";
import { SetupConsole, AccessType, UserStatus } from "./SetupConsole";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button/Button";
import { CardComponent } from "@/Components/ui/CardComponent";
import { useRouter } from "next/navigation";
import { LobbySettings } from "@/types/feature/exam";

interface LobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  // In a real app, these would come from context or props
  bookId: string;
  bookAccess?: AccessType;
  userStatus?: UserStatus;
  isOwned?: boolean;
  price?: number;
  releaseDate?: string;
}

export function LobbyModal({
  isOpen,
  onClose,
  bookId,
  bookAccess = "guest",
  userStatus = "guest",
  isOwned = false,
  price = 199,
  releaseDate,
}: LobbyModalProps) {
  const router = useRouter();

  // --- STATE MANAGEMENT ---
  const [settings, setSettings] = useState<LobbySettings>({
    mode: "simulation",
    parts_enabled: [1, 2, 3, 4, 5, 6, 7],
    audio_speed: 1.0,
    time_limit: 120, // Default 2 hours
    hardcore_flags: { no_skip: false, no_review: false },
    target_score: undefined,
    focus_notes: ""
  });

  const [isAudioVerified, setIsAudioVerified] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Load persistence (simplified)
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("lobby_settings_v1");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Merge carefully or just set
          setSettings(prev => ({ ...prev, ...parsed }));
        } catch (e) { }
      }
    }
  }, [isOpen]);

  // Save persistence
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem("lobby_settings_v1", JSON.stringify(settings));
    }
  }, [settings, isOpen]);


  // --- Logic Moved Here (Parent controls the footer) ---
  const getAccessConfig = () => {
    if (releaseDate) {
      const release = new Date(releaseDate);
      const now = new Date();
      if (release > now && userStatus !== "premium") {
        return {
          state: "early-access",
          icon: Calendar,
          title: "Coming Soon",
          message: `This mission unlocks on ${releaseDate}.`,
          actionLabel: `Available ${releaseDate}`,
          actionDisabled: true,
          variant: "outline" as const,
        };
      }
    }

    if (isOwned) {
      return {
        state: "allowed",
        actionLabel: "Initialize Mission",
        variant: "default" as const,
      };
    }

    if (bookAccess === "guest") {
      return {
        state: "allowed",
        actionLabel: "Start (Guest)",
        badge: "Guest Free",
        variant: "default" as const,
      };
    }

    if (bookAccess === "free") {
      if (userStatus === "guest")
        return {
          state: "login-required",
          icon: LogIn,
          title: "Login Required",
          message: "Please login to access free materials.",
          actionLabel: "Login to Start",
          variant: "default" as const,
        };
      return {
        state: "allowed",
        actionLabel: "Initialize Mission",
        variant: "default" as const,
      };
    }

    if (bookAccess === "premium") {
      if (userStatus === "premium")
        return {
          state: "allowed",
          actionLabel: "Initialize Mission",
          variant: "default" as const,
        };
      return {
        state: "upgrade-required",
        icon: Zap,
        title: "Premium Only",
        message: "This mission requires high-level clearance.",
        actionLabel: "Upgrade Clearance",
        variant: "destructive" as const,
      };
    }

    if (bookAccess === "one-time") {
      return {
        state: "purchase-required",
        icon: ShoppingCart,
        title: "Purchase Required",
        message: "One-time acquisition required for this resource.",
        actionLabel: `Buy ฿${price}`,
        variant: "default" as const,
      };
    }

    return {
      state: "allowed",
      actionLabel: "Start",
      variant: "default" as const,
    };
  };

  const config = getAccessConfig();

  // VALIDATION
  const isReady = () => {
    // 1. Audio Check Required (Simulated for session)
    if (!isAudioVerified) return false;
    // 2. At least one part
    if (settings.parts_enabled.length === 0) return false;
    // 3. Practice Mode: Target score should exist (Soft constraint, maybe optional?) 
    // FSD says: Persistence is mandatory if "Practice" is active. But maybe we assume user inputs it. 
    // Let's enforce Target Score > 0 if Practice
    if (settings.mode === "practice" && (!settings.target_score)) return false;

    return true;
  };

  const isValid = isReady();

  const onInitialize = async () => {
    // 5. Check if action is 'allowed' (Start/Resume/Initialize)
    if (config.state === "allowed") {
      if (!isValid) return;

      setIsInitializing(true);
      try {
        // CALL API
        const res = await fetch("/api/exam/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId,
            mode: settings.mode,
            settings: settings
          })
        });

        if (!res.ok) throw new Error("Failed to init session");
        const data = await res.json();
        const { sessionId } = data;

        // Navigate to the Exam Page with Session ID logic
        // Or just standard book URL which will pick up the active session
        // Let's navigate to the book page but maybe we need a dedicated route? 
        // Current: router.push(`/exam/${bookId}`);
        router.push(`/exam/${bookId}`);
      } catch (e) {
        console.error(e);
        alert("Failed to initialize mission. Please try again.");
      } finally {
        setIsInitializing(false);
      }

    } else {
      console.log("Action Triggered:", config.state);
      // Handle other actions like 'login-required' -> router.push('/login')
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 animate-in fade-in duration-200">
      <CardComponent
        className="w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] bg-white dark:bg-neutral-900 animate-in zoom-in-95 duration-300 z-50 border-[3px] border-foreground"
        noPadding={true}
        enableHover={false}
      >
        {/* Main Flex Column Container */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* HEADER: Fixed at Top (shrink-0) */}
          <div className="bg-foreground text-background p-4 flex justify-between items-center border-b-2 border-foreground shrink-0 z-10 relative">
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-wider">
                Mission Lobby
              </h2>
            </div>
            <button
              onClick={onClose}
              className="hover:text-destructive transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* BODY: Scrollable Middle Section (flex-1 overflow-y-auto) */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-white dark:bg-neutral-900">
            <SetupConsole
              accessState={config}
              settings={settings}
              onSettingsChange={setSettings}
              isAudioVerified={isAudioVerified}
              onAudioCheck={setIsAudioVerified}
            />
          </div>

          {/* FOOTER: Fixed at Bottom (shrink-0) */}
          {/* Added flex-wrap for very small screens to prevent button squashing */}
          <div className="p-4 border-t-2 border-foreground bg-muted dark:bg-neutral-800 flex flex-wrap items-center justify-end gap-4 shrink-0 z-10 relative">
            {config.badge && (
              <span className="px-2 py-1 text-[10px] font-bold uppercase bg-[#86efac] border border-foreground shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                {config.badge}
              </span>
            )}

            {/* Validation Message (Optional) */}
            {config.state === "allowed" && !isValid && (
              <span className="text-[10px] font-bold text-destructive uppercase animate-pulse">
                {!isAudioVerified ? "Please verify audio check" : "Settings Invalid (Parts > 0, Target > 0)"}
              </span>
            )}

            <div className="flex gap-4 w-full md:w-auto justify-end">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-2 bg-background hover:bg-muted flex-1 md:flex-none"
              >
                Cancel
              </Button>
              <Button
                onClick={onInitialize}
                disabled={config.actionDisabled || (config.state === "allowed" && !isValid) || isInitializing}
                variant={config.variant}
                className="px-8 min-w-[120px] md:min-w-[160px] flex-1 md:flex-none"
              >
                {isInitializing ? "Initializing..." : config.actionLabel}
                {!isInitializing && config.state === "allowed" && (
                  <Play className="ml-2 h-4 w-4" />
                )}
                {config.state === "purchase-required" && (
                  <ShoppingCart className="ml-2 h-4 w-4" />
                )}
                {config.state === "upgrade-required" && (
                  <Zap className="ml-2 h-4 w-4" />
                )}
                {config.state === "login-required" && (
                  <LogIn className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardComponent>
    </div>
  );
}
