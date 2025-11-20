import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import FadeIn from "../../components/FadeIn/FadeIn"
import styles from "./Login.module.css";
import { loginUser, registerUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [registerOpen, setRegisterOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [error, setError] = useState<string | null>();

    const timerRef = useRef<number | null>(null);

    const startTimeout = () => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            timerRef.current = null;
            setError(null);
        }, 3000);
    };

    useEffect(() => {
        return () => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }
        };
    }, []);

    const submitRegister = async () => {
        if (password !== passwordConfirm) {
            setError("Passwords don't match");
            startTimeout();
            return;
        }

        try {
            await registerUser(username, password);
            setError(null);
            setRegisterOpen(false);
            alert("Registration successful! Please login.");
        } catch (err: any) {
            setError(err.message);
            startTimeout();
        }
    };


    const submitLogin = async () => {
        try {
            const data = await loginUser(username, password);
            setError(null);

            // Save tokens in localStorage
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            // Redirect / update state
            navigate("/");
        } catch (err: any) {
            setError(err.message);
            startTimeout();
        }
    };


    return (
        <FadeIn>
            <div className={styles.login}>
                <div className={styles.logo}><b>DARTS</b> SCORES</div>
                {
                    registerOpen &&
                    <>
                        <div className={styles.form}>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" className={styles.loginInput} placeholder="Username" />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className={styles.loginInput} placeholder="Password" />
                            <input onChange={(e) => setPasswordConfirm(e.target.value)} type="password" className={styles.loginInput} placeholder="Confirm password" />
                        </div>
                        <div className={styles.buttons}>
                            <Button onClick={() => setRegisterOpen(false)} text={"Back to login"} />
                            <Button onClick={() => submitRegister()} text={"Register"} variant={"green"} />
                        </div>
                    </>
                }
                {
                    !registerOpen &&
                    <>
                        <div className={styles.form}>
                            <input 
                                type="text" 
                                className={styles.loginInput}
                                placeholder="Username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                            <input 
                                type="password" 
                                className={styles.loginInput} 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />

                        </div>
                        <div className={styles.buttons}>
                            <Button onClick={() => setRegisterOpen(true)} text={"Register"} />
                            <Button onClick={() => submitLogin()} text={"Login"} variant={"green"} />
                        </div>
                    </>
                }
                { error && <div className={styles.error}>{error}</div> }
            </div>
        </FadeIn>
    )
}

export default Login;