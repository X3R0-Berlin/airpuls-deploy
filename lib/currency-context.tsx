"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import { formatCurrency as formatEur } from "./brand";

const STORAGE_KEY = "airimpuls_currency";

type CurrencyCode = "EUR" | "CHF";

interface CurrencyContextValue {
    currencyCode: CurrencyCode;
    setCurrencyCode: (code: CurrencyCode) => void;
    formatPrice: (eurPrice: number, chfPrice?: number) => string;
    getPriceForCurrency: (eurPrice: number, chfPrice?: number) => number;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currencyCode, setCurrencyState] = useState<CurrencyCode>("EUR");

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === "EUR" || stored === "CHF") {
                setCurrencyState(stored);
            } else {
                // Simple heuristic: if timezone is Zurich, default to CHF
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (tz === "Europe/Zurich") {
                    setCurrencyState("CHF");
                    localStorage.setItem(STORAGE_KEY, "CHF");
                }
            }
        } catch {
            // localStorage unavailable
        }
    }, []);

    const setCurrencyCode = useCallback((newCode: CurrencyCode) => {
        setCurrencyState(newCode);
        try {
            localStorage.setItem(STORAGE_KEY, newCode);
        } catch {
            // localStorage unavailable
        }
    }, []);

    const formatPrice = useCallback(
        (eurPrice: number, chfPrice?: number) => {
            if (currencyCode === "CHF" && chfPrice !== undefined) {
                return new Intl.NumberFormat("de-CH", {
                    style: "currency",
                    currency: "CHF",
                }).format(chfPrice / 100);
            }
            return formatEur(eurPrice);
        },
        [currencyCode]
    );

    const getPriceForCurrency = useCallback(
        (eurPrice: number, chfPrice?: number) => {
            if (currencyCode === "CHF" && chfPrice !== undefined) {
                return chfPrice;
            }
            return eurPrice;
        },
        [currencyCode]
    );

    return (
        <CurrencyContext.Provider value={{ currencyCode, setCurrencyCode, formatPrice, getPriceForCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context)
        throw new Error("useCurrency must be used within CurrencyProvider");
    return context;
}
