"use client";

import * as React from "react";

// --- MOCK UTILS ---
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- RISO SKELETON ---
const SkeletonComponent = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
}) => (
  <div
    className={cn("animate-pulse bg-[var(--riso-ink)]/10", className)}
    style={{ width, height }}
  />
);

// --- ICONS ---
const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// --- TYPES ---

type SelectOption = {
  label: string;
  value: string;
};

type SelectGroupType = {
  groupLabel?: string;
  options: SelectOption[];
};

type SelectComponentProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[] | SelectGroupType[];
  className?: string;
  grouped?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

// --- MAIN COMPONENT ---

export function SelectComponent({
  placeholder = "SELECT OPTION",
  value,
  onChange,
  options,
  className,
  grouped = false,
  loading = false,
  disabled = false,
}: SelectComponentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Handle clicking outside to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  // Find selected label
  const getSelectedLabel = () => {
    if (!value) return null;
    if (grouped) {
      for (const group of options as SelectGroupType[]) {
        const found = group.options.find((o) => o.value === value);
        if (found) return found.label;
      }
    } else {
      const found = (options as SelectOption[]).find((o) => o.value === value);
      if (found) return found.label;
    }
    return value;
  };

  if (loading) {
    return (
      <div className={className}>
        <SkeletonComponent height="3rem" className="w-full" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full font-sans", className)}
    >
      {/* --- TRIGGER BUTTON --- */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          // Base Riso Styles
          "flex h-12 w-full items-center justify-between px-4 py-2",
          "bg-[var(--riso-paper)] text-[var(--riso-ink)]",
          "border-2 border-[var(--riso-ink)]",
          "font-mono text-sm font-bold uppercase tracking-wide",
          "transition-all duration-100 ease-out",

          // State Styles
          isOpen
            ? "shadow-[4px_4px_0px_var(--riso-yellow)] translate-x-[-1px] translate-y-[-1px]"
            : "hover:shadow-[2px_2px_0px_var(--riso-blue)]",

          disabled && "opacity-50 cursor-not-allowed border-dashed"
        )}
      >
        <span className={cn(!value && "opacity-50 italic normal-case")}>
          {getSelectedLabel() || placeholder}
        </span>
        <div
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        >
          <ChevronDownIcon />
        </div>
      </button>

      {/* --- DROPDOWN CONTENT --- */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-0 z-50 mt-1 w-full max-h-60 overflow-auto",
            "bg-[var(--riso-paper)] border-2 border-[var(--riso-ink)]",
            "shadow-[6px_6px_0px_var(--riso-blue)]",
            "animate-in fade-in-0 zoom-in-95 duration-100"
          )}
        >
          <div className="p-1">
            {grouped
              ? (options as SelectGroupType[]).map((group, idx) => (
                  <div key={idx}>
                    {group.groupLabel && (
                      <div className="px-2 py-1.5 text-[10px] font-black text-[var(--riso-red)] uppercase tracking-widest border-b-2 border-[var(--riso-ink)] mb-1 mx-1">
                        {group.groupLabel}
                      </div>
                    )}
                    {group.options.map((option) => (
                      <SelectItem
                        key={option.value}
                        option={option}
                        isSelected={value === option.value}
                        onSelect={() => handleSelect(option.value)}
                      />
                    ))}
                  </div>
                ))
              : (options as SelectOption[]).map((option) => (
                  <SelectItem
                    key={option.value}
                    option={option}
                    isSelected={value === option.value}
                    onSelect={() => handleSelect(option.value)}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- INTERNAL COMPONENT: SELECT ITEM ---

function SelectItem({
  option,
  isSelected,
  onSelect,
}: {
  option: SelectOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center py-2 pl-8 pr-2 text-xs outline-none",
        "font-mono uppercase font-bold transition-colors",
        // Hover State
        "hover:bg-[var(--riso-yellow)] hover:text-[var(--riso-ink)]",
        // Selected State
        isSelected
          ? "bg-[var(--riso-blue)] text-white hover:bg-[var(--riso-blue)]"
          : "text-[var(--riso-ink)]"
      )}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <CheckIcon />
        </span>
      )}
      <span>{option.label}</span>
    </div>
  );
}
