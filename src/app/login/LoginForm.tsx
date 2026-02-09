/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import IconButton from "../components/inputs/IconButton";
import Spinner from "../components/inputs/Spinner";
import TextInput from "../components/inputs/TextInput";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const router = useRouter();

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const isValidForm = (): boolean => {
    const emailOk = Boolean(email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return false;

    if (isRegister) {
      if (!password || !repeatPassword) return false;
      if (password !== repeatPassword) return false;
      if (password.length < 6) return false; // simple rule
      return true;
    }

    if (email && password) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const emailOk = email ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) : false;
    setIsEmailValid(emailOk || email.length === 0);
    setIsValid(isValidForm());
  }, [email, password, repeatPassword, isRegister]);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        if (token)
          await fetch("/api/set-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

        localStorage.setItem("token", token);
        setIsLoading(false);
        toast("Zalogowano pomyslnie. Za chwilę zostaniesz przekierowany", { icon: "✅" });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
        toast("Podczas logowania wystąpił błąd", { icon: "⚠️" });
      }
    }, 2000);
  };

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(async () => {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            toast("Rejestracja przebiegła pomyslnie", { icon: "✅" });
            setIsRegister(false);
          } else if (res.status !== 200) {
            setIsLoading(false);
            toast("Podczas rejestracji wystąpił błąd", { icon: "⚠️" });
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }, 2000);
  };

  useEffect(() => {
    console.log(isValid);
  }, [isValid]);

  return (
    <div className="login-page">
      <div className="login-dialog" role="region" aria-labelledby="login-title">
        <h2 id="login-title" className="login-title">{isRegister ? 'Zarejestruj się' : 'Zaloguj się'}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isLoading) return;
            if (!isValid) return;
            if (isRegister) handleRegister();
            else handleLogin();
          }}
        >
          <div className="login-form_inputs">
            <TextInput
              disabled={isLoading}
              onChange={setEmail}
              type="email"
              placeholder="Twój adres e-mail"
              label="E-Mail"
              invalid={!isEmailValid}
            />
            {!isEmailValid && (
              <div className="field-error">Podaj poprawny adres e-mail</div>
            )}

            <div className="login-form_inputs-password">
              <TextInput
                onChange={setPassword}
                disabled={isLoading}
                type={passwordVisible ? "text" : "password"}
                placeholder="Twoje hasło"
                label="Hasło"
                aria-invalid={!isValid && !isRegister ? true : false}
              />
              <IconButton
                Icon={passwordVisible ? () => <FaEyeSlash /> : () => <FaEye />}
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            </div>

            {isRegister && (
              <div className="login-form_inputs-password">
                <TextInput
                  disabled={isLoading}
                  onChange={setRepeatPassword}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Powtórz hasło"
                  label="Powtórz hasło"
                  aria-invalid={isRegister && password !== repeatPassword}
                />
              </div>
            )}

            {isRegister && password && repeatPassword && password !== repeatPassword && (
              <div className="field-error">Hasła nie są takie same</div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isValid}
              className={`login-button primary ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <div className="btn-loading"><Spinner size={18} /></div>
              ) : isRegister ? (
                "Zarejestruj się"
              ) : (
                "Zaloguj się"
              )}
            </button>
          </div>
        </form>

        <div className="login-form_register">
          <p>{isRegister ? 'Masz już konto?' : 'Nie masz konta?'}</p>
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setIsValid(isValidForm());
            }}
            className="login-button secondary"
          >
            {isRegister ? "Zaloguj się" : "Zarejestruj się"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
