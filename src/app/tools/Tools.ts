"use client"

import { useEffect, useState } from "react";

export const translateCategory = (category: string): string =>
    category === "keyboard" ? "Klawiatura" :
        category === "mouse" ? "Mysz" :
            category === "mousepad" ? "Podkładka" :
                category === "microphone" ? "Mikrofon" :
                    category === "sale" ? "Promocje" :
                        "Akcesoria";

export const useScreenWidth = () => {
    "use client"
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenWidth;
}