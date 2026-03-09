"use client";

import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useAnimationFrame,
    useMotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

interface VelocityScrollProps {
    text: string;
    defaultVelocity?: number;
    className?: string;
}

export function VelocityScroll({
    text,
    defaultVelocity = 5,
    className,
}: VelocityScrollProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v: number) => `${v}%`);
    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * defaultVelocity * (delta / 1000);

        // change direction based on scroll velocity
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() - moveBy);

        // Loop logic to reset X
        if (baseX.get() < -50) {
            baseX.set(baseX.get() + 50);
        } else if (baseX.get() > 0) {
            baseX.set(baseX.get() - 50);
        }
    });

    return (
        <div className={cn("relative overflow-hidden m-0 flex flex-nowrap", className)}>
            <motion.div
                className="flex flex-nowrap whitespace-nowrap m-0 items-center justify-center gap-10"
                style={{ x }}
            >
                {/* Render the text multiple times to ensure enough width for seamless scrolling */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="block">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}
