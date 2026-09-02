import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { accountRegister } from "../../features/accountSlice";

function Registration(){
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/   
    const dispatch = useDispatch(); 
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [birthday, setBirthday]  = useState("2006-04-24");
    const [error2, setError2] = useState("");
    const navigate = useNavigate(); //хук для редиректа

    const handleRegister = async (e) => {
        //очистка предыдущих сообщений
        setError("");
        setMessage("");
        e.preventDefault();
        if(username!== "" && email!== "" && phoneNumber!=="" && password!=="" && confirmPassword!=="")//Давайте без проверки правильно ли почту\пароль\ник написали, а то он через раз работает
        {
            if (!passRegex.test(password))
                {
                    setError("Ваш пароль дожен содержать минимум? 8 символов, цифры, буквы и знаки");
                    return;

                }
            if (password !== confirmPassword) 
                {
                    setError("Пароли не совпадают!")
                    return;

                }
                
            await dispatch(accountRegister({username, email, phoneNumber, birthday, password}));
            setMessage("Аккаунт создан!")

        setUsername("");
        setPassword("");
        setBirtday("2006-04-24");
        setEmail("");
        setPhone("");
        setConfirmPassword("");

        }
        else{

            setError("Заполните все поля!")

        }
    };

    useEffect(() => {
        //проверяем, что сообщение не пустое
        if (message) {
            const timer = setTimeout(() => {
                setMessage("Вы зарегистрировались!!");
                navigate("/login");

                //очистка таймера при размонтировании
                return () => clearTimeout(timer);
            }, 2000);
        }
    }, [message]);

    const handlePassword = (e)=>
            {
                setPassword(e.target.value);
                if (!passRegex.test(password))
                {
                    setError2("Ваш пароль дожен содержать минимум? 8 символов, цифры, буквы и знаки");

                }
                else setError2("")
            }


    return (
        <>
            <form className="my-4" onSubmit={handleRegister}> 
            <h1 className="mb-4">Регистрация</h1>
            <div className="row d-flex align-items-end">
                <div className="form-group col-12 ">
                    <label htmlFor="username" className="form-label">
                        Никнейм:
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 ">
                    <label htmlFor="email" className="form-label">
                        Почта:
                    </label>
                    <input
                        type="email"
                        id="Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 ">
                    <label htmlFor="phoneNumber" className="form-label">
                        Номер телефона:
                    </label>
                    <input
                        type="phone"
                        id="phoneNumber"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 ">
                    <label htmlFor="birthday" className="form-label">
                        День рождение:
                    </label>
                    <input
                        type="date"
                        id="Birthday"
                        className="form-control"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="form-group col-12 ">
                    <label htmlFor="password" className="form-label">
                        Пароль:
                    </label>
                    <input
                        type="password"
                        id="Password"
                        className="form-control"
                        value={password}
                        onChange={handlePassword}
                    />
                    {error2? <p style={{ color: "red" }}>{error2}</p>: <p style={{ color: "green" }}>{}</p>}
                </div>
                <div className="form-group col-12 ">
                    <label htmlFor="passwordConfirm" className="form-label">
                        ПОВТОРИТЕ Пароль:
                    </label>
                    <input
                        type="password"
                        id="PasswordConfirm"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button
                    type="submit"
                    className="btn btn-outline-success col-12 mt-3"
                >
                    Регистрация
                </button>

                </div>
                
                <div className="d-flex align-items-center justify-content-between mt-3">
                <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => navigate("/login")}>
                        Уже есть учетная запись? Войти
                    </button>
                </div>
            </div>
        </form>
        {/* выводим сообщения от сервера, когда они запишутся */}
            {message && (
                <div className="alert alert-success mt-4" role="alert">
                    {message}
                </div>
            )}
            {error && (
                <div className="alert alert-danger mt-4" role="alert">
                    {error}
                </div>
            )}
        </>
    );
}
export default Registration