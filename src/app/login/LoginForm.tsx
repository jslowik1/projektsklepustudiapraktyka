/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import TextInput from "../components/inputs/TextInput";
import IconButton from "../components/inputs/IconButton";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Spinner from "../components/inputs/Spinner";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const LoginForm = () => {

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(false);
    const router = useRouter();

    const isValidForm = (): boolean => {
        if (isRegister && email && password && repeatPassword) {
            if (password === repeatPassword) return true;
            else return false;
        } else if (email && password) {
            return true;
        }
        return false;
    }

    useEffect(() => {

        console.log(isValid);
        setIsValid(isValidForm())
    }, [email, password, repeatPassword])

    const handleLogin = () => {

        setIsLoading(true);
        setTimeout(async () => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const token = await user.getIdToken();
                await fetch("/api/set-token", { method: "POST", headers: { "authorization": token } });
                console.log(token);
                localStorage.setItem("token", token);
                setIsLoading(false);
                toast("Zalogowano pomyslnie", { icon: "✅" });
                setTimeout(() => {
                    router.push("/account")
                }, 2000)
            } catch (error: any) {
                console.log(error);
                setIsLoading(false);
                toast("Podczas logowania wystąpił błąd", { icon: "⚠️" });
            }
        }, 2000)
    }

    const handleRegister = () => {
        setIsLoading(true);
        setTimeout(async () => {
            await fetch("/api/register", { method: "POST", body: JSON.stringify({ email, password }) })
                .then(
                    (res) => {
                        if (res.status === 200) {
                            setIsLoading(false);
                            toast("Rejestracja przebiegła pomyslnie", { icon: "✅" });
                            setIsRegister(false);
                        } else if (res.status !== 200) {
                            setIsLoading(false)
                            toast("Podczas rejestracji wystąpił błąd", { icon: "⚠️" });

                        }
                    }
                )
                .catch(
                    (err) => {
                        console.log(err);
                        setIsLoading(false);
                    }
                )
        }, 2000)
    }

    useEffect(() => {
        console.log(isValid);
    }, [isValid])

    return (<div className="login-form">
        <form onSubmit={(e) => {
            e.preventDefault()
            if (isLoading) return;
            if (isValid === false) return;
            if (isRegister) handleRegister()
            else handleLogin()
        }}>
            <div className="login-form_inputs">
                <TextInput disabled={isLoading} onChange={setEmail} type="email" placeholder="Twój adres e-mail" label="E-Mail" />
                <div className="login-form_inputs-password">
                    <TextInput onChange={setPassword} disabled={isLoading} type={passwordVisible ? "text" : "password"} placeholder="Twoje hasło" label="Hasło" />
                    <IconButton Icon={passwordVisible ? () => <FaEyeSlash /> : () => <FaEye />} onClick={() => setPasswordVisible(!passwordVisible)} />
                </div>
                {isRegister && <div className="login-form_inputs-password">
                    <TextInput disabled={isLoading} onChange={setRepeatPassword} type={passwordVisible ? "text" : "password"} placeholder="Twoje hasło" label="Powtórz hasło" />
                </div>}

                <button disabled={isLoading || !isValid} onClick={() => isRegister ? handleRegister() : handleLogin()} className="login-button">{isLoading ? <Spinner /> : isRegister ? "Zarejestruj się" : "Zaloguj się"}</button>
            </div>
        </form>

        <div className="login-form_register">
            <p>Nie masz konta?</p>
            <button onClick={() => { setIsRegister(!isRegister) }} className="login-button">{isRegister ? "Zaloguj się" : "Zarejestruj się"}</button>
        </div>
    </div >);
}

export default LoginForm;