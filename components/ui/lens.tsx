"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LensProps {
    children: React.ReactNode;
    zoomFactor?: number;
    lensSize?: number;
    position?: { x: number; y: number };
    isHovering?: boolean;
}

export function Lens({
    children,
    zoomFactor = 1.6,
    lensSize = 170,
    position = { x: 0, y: 0 },
    isHovering = false,
}: LensProps) {
    return (
        <div className="relative overflow-hidden z-10">
            {children}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.58, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 z-50 overflow-hidden rounded-[80px]"
                        style={{
                            maskImage: `radial-gradient(circle ${lensSize / 2}px at ${position.x}px ${position.y}px, black 100%, transparent 100%)`,
                            WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${position.x}px ${position.y}px, black 100%, transparent 100%)`,
                            transformOrigin: `${position.x}px ${position.y}px`,
                        }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                transform: `scale(${zoomFactor}) translate(${-position.x / zoomFactor + position.x}px, ${-position.y / zoomFactor + position.y}px)`,
                                transformOrigin: "0 0",
                            }}
                        >
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
