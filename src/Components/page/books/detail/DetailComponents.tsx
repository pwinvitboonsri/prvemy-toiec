"use client";

import { cn } from "@/lib/utils";
import { Check, Crown } from "lucide-react";

// --- SPEED PILL BUTTON ---
interface SpeedPillProps {
  active: boolean;
  disabled?: boolean;
  value: string;
  isPremium?: boolean;
  onClick: () => void;
}

export function SpeedPill({
  active,
  disabled,
  value,
  isPremium,
  onClick,
}: SpeedPillProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative border-2 border-foreground px-3 py-1 text-xs font-bold cursor-pointer transition-all",
        active
          ? "bg-foreground text-background"
          : "bg-background hover:bg-accent",
        disabled &&
          "opacity-60 cursor-not-allowed bg-muted text-muted-foreground hover:bg-muted"
      )}
    >
      {value}
      {isPremium && (
        <div className="absolute -top-1.5 -right-1.5 bg-accent text-foreground border border-foreground rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px]">
          <Crown className="w-2 h-2" />
        </div>
      )}
    </button>
  );
}

// --- PART CHECKBOX ---
interface PartCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export function PartCheckbox({ label, checked, onChange }: PartCheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        className={cn(
          "w-4 h-4 border-2 border-foreground flex items-center justify-center transition-colors relative",
          checked ? "bg-primary" : "bg-background group-hover:bg-accent"
        )}
      >
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        {checked && (
          <Check
            className="w-3 h-3 text-primary-foreground absolute -top-1 left-0.5"
            strokeWidth={4}
          />
        )}
      </div>
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </label>
  );
}

// --- MODE TAB ---
export function ModeTab({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 py-2.5 text-center font-bold text-xs uppercase border-2 border-foreground flex items-center justify-center gap-2 transition-all",
        active
          ? "bg-accent shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]"
          : "bg-background hover:bg-accent/20"
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </button>
  );
}
