"use client"

import TextInput from "@/app/components/inputs/TextInput";
import { useAuth } from "@/app/context/AuthProvider";
import { UserAddress } from "@/app/model/User";
import { useEffect, useState } from "react";
import "./checkout.scss";

const Page = () => {
    const { userData, user } = useAuth();
    const [displayName, setDisplayName] = useState<string>(user?.displayName ?? "");
    const [phone, setPhone] = useState<string>(user?.phoneNumber ?? "");
    const [address, setAddress] = useState<UserAddress>({ street: "", city: "", zipCode: "", country: "" });
    function isNumber(value: string): boolean {
        return !isNaN(Number(value));
    }
    useEffect(() => {
        if (userData) {
            setDisplayName(userData.displayName ?? "");
            setPhone(userData.phoneNumber ?? "");
            setAddress(userData.address ?? { street: "", city: "", zipCode: "", country: "" });
        }
    }, [userData]);

    return (<div className="checkout-address">
        <h2>Adres Dostawy</h2>
        <TextInput label="Email" value={user?.email ?? ""} disabled={true} onChange={() => { }} />
        <TextInput label="Imię i nazwisko" value={displayName} onChange={setDisplayName} />
        <TextInput type="tel" label="Numer telefonu" value={phone} onChange={(v) => { if (v.length <= 9 && isNumber(v)) setPhone(v) }} />
        <TextInput label="Ulica" value={address.street} onChange={(e) => { setAddress({ ...address, street: e }) }} />
        <TextInput label="Kod pocztowy" value={address.zipCode} onChange={e => { setAddress({ ...address, zipCode: e }) }} />
        <TextInput label="Miasto" value={address.city} onChange={e => { setAddress({ ...address, city: e }) }} />
        <TextInput disabled label="Państwo" value={address.country} onChange={() => { }} />

    </div>);
}

export default Page;