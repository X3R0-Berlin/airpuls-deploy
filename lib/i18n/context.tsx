"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Locale, TranslationDict } from "./types";
import { defaultLocale } from "./types";
import de from "./translations/de";
import en from "./translations/en";

/**
 * GDPR / ePrivacy note:
 * Persisting the user's language preference in localStorage is classified as
 * "technically necessary" (functional) under the ePrivacy Directive Art. 5(3)
 * exemption.  A multilingual site needs to remember the chosen language to
 * deliver the service the user explicitly requested, so no prior cookie
 * consent is required for this storage.
 */
const STORAGE_KEY = "airimpuls_lang";

const dictionaries: Record<Locale, TranslationDict> = { de, en };

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "de") {
        setLocaleState(stored);
        document.documentElement.lang = stored;
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // localStorage unavailable
    }
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      let value =
        dictionaries[locale][key] ?? dictionaries[defaultLocale][key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(`{{${k}}}`, String(v));
        });
      }
      return value;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
