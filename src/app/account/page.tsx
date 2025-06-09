"use client"

import { useEffect, useState } from "react";
import TextInput from "../components/inputs/TextInput";
import { useAuth } from "../context/AuthProvider";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Spinner from "../components/inputs/Spinner";
import { UserAddress } from "../model/User";



const Page = () => {
    function isNumber(value: string): boolean {
        return !isNaN(Number(value));
    }
    const { user, logout, userData } = useAuth();
    const [displayName, setDisplayName] = useState<string>(user?.displayName ?? "");
    const [phone, setPhone] = useState<string>(user?.phoneNumber ?? "");
    const [loading, setLoading] = useState<boolean>(false);
    const [address, setAddress] = useState<UserAddress>({ street: "", city: "", zipCode: "", country: "" });
    const [canSave, setCanSave] = useState<boolean>(false);

    useEffect(() => {
        if (userData) {
            setDisplayName(userData.displayName ?? "");
            setPhone(userData.phoneNumber ?? "");
            setAddress(userData.address ?? { street: "", city: "", zipCode: "", country: "" });
        }
    }, [userData]);

    useEffect(() => {
        if (userData) {
            if (
                displayName !== userData.displayName ||
                phone !== userData.phoneNumber ||
                address.street !== userData.address?.street ||
                address.city !== userData.address?.city ||
                address.zipCode !== userData.address?.zipCode
            ) {
                setCanSave(true);
            }
        }

    }, [displayName, phone, address, user, userData]);

    const updateUserInfo = async () => {
        if (user) {
            setLoading(true);
            const userRef = doc(db, "users", user.uid);
            void setDoc(userRef, { displayName: displayName, phoneNumber: phone, address: address }, { merge: true })
                .then(() => {
                    toast("Zapisano zmiany", { icon: "✅" });
                    setCanSave(false);
                })
                .finally(() => setLoading(false));
        }
    }

    return (<div className="account-inside">
        <h1>Twoje konto</h1>
        <TextInput label="Email" value={user?.email ?? ""} disabled={true} onChange={() => { }} />
        <TextInput label="Imię i nazwisko" value={displayName} onChange={setDisplayName} />
        <TextInput type="tel" label="Numer telefonu" value={phone} onChange={(v) => { if (v.length <= 9 && isNumber(v)) setPhone(v) }} />
        <TextInput label="Ulica" value={address.street} onChange={(e) => { setAddress({ ...address, street: e }) }} />
        <TextInput label="Kod pocztowy" value={address.zipCode} onChange={e => { setAddress({ ...address, zipCode: e }) }} />
        <TextInput label="Miasto" value={address.city} onChange={e => { setAddress({ ...address, city: e }) }} />
        <TextInput label="Państwo" value={address.country} onChange={() => { }} />
        {loading && <Spinner />}
        <div className="account-info-buttons">
            <button disabled={!canSave} className={`${!canSave ? "disabled" : ""}`} onClick={
                async () => await updateUserInfo()
            }>Zapisz zmiany</button>
            <button onClick={
                async () => await logout().then(() => toast("Wylogowano", { icon: "✅" }))
            }>Wyloguj</button>
        </div>
    </div>);
}

export default Page;