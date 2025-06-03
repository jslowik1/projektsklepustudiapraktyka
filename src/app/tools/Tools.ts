export const translateCategory = (category: string): string =>
    category === "keyboard" ? "Klawiatura" :
        category === "mouse" ? "Mysz" :
            category === "mousepad" ? "Podkładka" :
                category === "microphone" ? "Mikrofon" :
                    category === "sale" ? "Promocje" :
                        "Akcesoria";