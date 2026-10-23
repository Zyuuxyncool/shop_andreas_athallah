import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface CustomSelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  className?: string;
}

export function CustomSelect<T extends string>({
  value,
  onChange,
  options,
  className = "",
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-card border border-border text-foreground text-xs font-semibold hover:bg-accent hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[32px] cursor-pointer"
      >
        <span>{selectedOption.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
          }`}
        />
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1.5 z-30 w-44 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-xl p-1.5 space-y-1 transition-all duration-150"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer text-left ${
                  isSelected
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
