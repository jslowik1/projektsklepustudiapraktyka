import { OrderStatus } from "../model/Order";

export const translateCategory = (category: string): string => {
    return category === "keyboard" ? "Klawiatura" :
        category === "mouse" ? "Mysz" :
            category === "mousepad" ? "Podkładka" :
                category === "microphone" ? "Mikrofon" :
                    category === "sale" ? "Promocje" :
                        "Akcesoria";
}
export const translateStatus = (status: OrderStatus): string => {
    return status === "new" ? "Nowe" :
        status === "paid" ? "Opłacone" :
            status === "cancelled" ? "Anulowane" :
                status === "shipped" ? "Wysłane" :
                    status === "delivered" ? "Dostarczone" :
                        status === "refunded" ? "Zwrot" :
                            "";
}
