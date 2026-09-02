import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { accountLogin } from "../../features/accountSlice";
import { useDispatch, useSelector } from "react-redux";
function Authentication({
    setIsAuthenticated,
    setCurrentUser,
}) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const account = useSelector((state) => state.account.account);
    const message2 = useSelector((state) => state.account.message);
    const navigate = useNavigate(); //хук для редиректа

    const handleLogin = (e) => {
        //очистка предыдущих сообщений
        setError("");
        setMessage("");
        e.preventDefault();

        if (email !== "" && password !== "") {

            dispatch(accountLogin({ email, password }));
            //setMessage("Проверка");
        }
        else {
            setError("Заполните все поля!");
        }

    };

useEffect(()=>{
    setMessage("");
    if (message2 != "") {
                setMessage(message2);
                setCurrentUser(account);
                //очищаем поля ввода после выполнения запроса
                setEmail("");
                setPassword("");
            } 
}, [message2]);

    useEffect(() => {
        //проверяем, что сообщение не пустое
        if (message != "") {
            const timer = setTimeout(() => {
                setMessage("");
                setIsAuthenticated(true);
                navigate("/");

                //очистка таймера при размонтировании
                return () => clearTimeout(timer);
            }, 2000);
        }
    }, [message]);
    return (
        <>
            <form className="my-4" onSubmit={handleLogin}>
                <h1 className="mb-4">Аутентификация</h1>
                <div className="row d-flex align-items-end">
                    <div className="form-group col-12">
                        <label htmlFor="email" className="form-label">
                            Почта:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="form-label">
                            Пароль:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-success col-12 mt-3">
                        Войти
                    </button>

                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => navigate("/register")}
                    >
                        Нет учетной записи? Зарегистрироваться
                    </button>
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

export default Authentication