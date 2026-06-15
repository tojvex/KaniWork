import type { Locale } from "@/types/floor";

type LocaleSwitcherProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

const locales: Array<{ value: Locale; label: string }> = [
  { value: "ka", label: "ქარ" },
  { value: "en", label: "EN" }
];

export function LocaleSwitcher({ locale, onChange }: LocaleSwitcherProps) {
  return (
    <div className="locale-switcher" role="group" aria-label="Language selector">
      {locales.map((item) => (
        <button
          key={item.value}
          type="button"
          className="locale-button"
          aria-pressed={locale === item.value}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
