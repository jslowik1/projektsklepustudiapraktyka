"use client";
import { useEffect, useState } from "react";

export const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);

        handleResize(); // Ustaw wartość przy pierwszym renderze

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenWidth;
};
