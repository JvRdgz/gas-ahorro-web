"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { mounted, theme, toggleTheme } = useTheme();
  const isDark = mounted ? theme === "dark" : false;

  return (
    <button
      type="button"
      className={["theme-toggle", className].filter(Boolean).join(" ")}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-slider" aria-hidden="true">
        <span className="theme-toggle-knob" />
      </span>
      <span className="theme-toggle-label">
        {isDark ? "Modo claro" : "Modo oscuro"}
      </span>
    </button>
  );
}
