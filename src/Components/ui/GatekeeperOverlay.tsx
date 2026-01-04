import React from "react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

interface GatekeeperOverlayProps {
  title: string;
  description: string;
  badge?: string;
  onUpgrade?: () => void;
}

export const GatekeeperOverlay = ({
  title,
  description,
  badge = "LOCKED",
  onUpgrade,
}: GatekeeperOverlayProps) => {
  return (
    <div className="w-full h-full grid place-items-center p-6 text-center z-20 bg-[#f2f0e9]/80 backdrop-blur-md dark:bg-black/80">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-sm w-full riso-border bg-[#111111] text-white p-8 md:p-10 riso-shadow-red relative overflow-hidden"
      >
        <div className="absolute -top-4 -right-8 rotate-12 border-2 border-[#ff3333] text-[#ff3333] font-black text-xl px-3 opacity-60 bg-[#111111]">
          {badge}
        </div>

        <Lock size={40} className="mx-auto mb-4 text-[#ffe800]" />
        <h3 className="font-serif text-xl font-bold mb-3 uppercase tracking-tight">
          {title}
        </h3>
        <p className="font-mono text-[11px] opacity-70 mb-8 leading-relaxed">
          {description}
        </p>

        {onUpgrade && (
          <button
            onClick={onUpgrade}
            className="w-full bg-[#ff3333] text-white border-2 border-white py-4 font-black text-lg hover:translate-x-[-2px] hover:translate-y-[-2px] riso-shadow-ink transition-all active:translate-x-0 active:translate-y-0 cursor-pointer"
          >
            UPGRADE_NOW
          </button>
        )}
      </motion.div>
    </div>
  );
};
