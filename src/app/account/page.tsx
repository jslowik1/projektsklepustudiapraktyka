"use client"

import TextInput from "../components/inputs/TextInput";
import { useAuth } from "../context/AuthProvider";

const Page = () => {
    const { user, logout } = useAuth();

    return (<div className="account-inside">
        <h1>Twoje konto</h1>
        <TextInput label="Email" value={user?.email ?? ""} disabled={true} onChange={() => { }} />
        <button onClick={
            async () => await logout()
        }>logout</button>
    </div>);
}

export default Page;