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
import { useEffect } from "react";
import { Button } from "@/Components/ui/Button/Button";
import { CardComponent } from "@/Components/ui/CardComponent";
import { useRouter } from "next/navigation"; // 1. Import useRouter

interface LobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  // In a real app, these would come from context or props
  bookId: string; // 2. Add bookId Prop
  bookAccess?: AccessType;
  userStatus?: UserStatus;
  isOwned?: boolean;
  price?: number;
  releaseDate?: string;
}

export function LobbyModal({
  isOpen,
  onClose,
  bookId, // 3. Destructure bookId
  bookAccess = "guest",
  userStatus = "guest",
  isOwned = false,
  price = 199,
  releaseDate,
}: LobbyModalProps) {
  const router = useRouter(); // 4. Initialize Router

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

  const onInitialize = () => {
    // 5. Check if action is 'allowed' (Start/Resume/Initialize)
    if (config.state === "allowed") {
      // Navigate to the Exam Page
      // We aren't passing ?mode= or ?timer= yet, just the ID to start defaults
      router.push(`/exam/${bookId}`);
    } else {
      console.log("Action Triggered:", config.state);
      // Handle other actions like 'login-required' -> router.push('/login')
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f2f0e9]/90 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <CardComponent
        className="w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] bg-white animate-in zoom-in-95 duration-300 z-50 border-[3px]"
        noPadding={true}
        enableHover={false}
      >
        {/* Main Flex Column Container */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* HEADER: Fixed at Top (shrink-0) */}
          <div className="bg-[#111111] text-white p-4 flex justify-between items-center border-b-2 border-[#111111] shrink-0 z-10 relative">
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5" />
              <h2 className="text-lg font-black uppercase tracking-wider">
                Mission Lobby
              </h2>
            </div>
            <button
              onClick={onClose}
              className="hover:text-[#ff3333] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* BODY: Scrollable Middle Section (flex-1 overflow-y-auto) */}
          {/* bg-white ensures content background is solid */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-white">
            <SetupConsole accessState={config} />
          </div>

          {/* FOOTER: Fixed at Bottom (shrink-0) */}
          {/* Added flex-wrap for very small screens to prevent button squashing */}
          <div className="p-4 border-t-2 border-[#111111] bg-gray-50 flex flex-wrap items-center justify-end gap-4 shrink-0 z-10 relative">
            {config.badge && (
              <span className="px-2 py-1 text-[10px] font-bold uppercase bg-[#86efac] border border-[#111111] shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                {config.badge}
              </span>
            )}
            <div className="flex gap-4 w-full md:w-auto justify-end">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-2 bg-white hover:bg-gray-100 flex-1 md:flex-none"
              >
                Cancel
              </Button>
              <Button
                onClick={onInitialize}
                disabled={config.actionDisabled}
                variant={config.variant}
                className="px-8 min-w-[120px] md:min-w-[160px] flex-1 md:flex-none"
              >
                {config.actionLabel}
                {config.state === "allowed" && (
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
