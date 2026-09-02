import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../features/accountSlice";

function Header({
    isAuthenticated,
    currentUser,
    setIsAuthenticated,
    setCurrentUser,
}) {
    const navigate = useNavigate();
    const dispath = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispath(logout());
        //сбрасываем состояние аутентификации и пользователя
        setIsAuthenticated(false);
        setCurrentUser(null);
        //перенаправляем на страницу входа
        navigate("/login");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark text-bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    COSMEA
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto w-100 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/catalog">
                                Catalog
                            </NavLink>
                        </li>


                        {isAuthenticated ? (
                            <>
                            {(currentUser.role == "Administrator")?(<>
                            <li className="nav-item">
                                    <NavLink className="nav-link" to="/category">
                                        Category
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/product">
                                        Product
                                    </NavLink>
                                </li>
                            </>):
                            <></>}
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cart">
                                        Cart
                                    </NavLink>
                                </li>
                                {(currentUser.role == "Administrator")?
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/order/all">
                                        Order
                                    </NavLink>
                                </li>
                                :
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/order">
                                        Order
                                    </NavLink>
                                </li>
                                }
                                <li className="navbar-brand ms-lg-auto">
                                    Приветствуем вас {currentUser.username}!
                                </li>
                                <li>
                                    <form onSubmit={handleLogout}>
                                        <button
                                            type="submit"
                                            className="nav-link"
                                        >
                                            Выйти
                                        </button>
                                    </form>
                                </li>

                            </>) : (
                            <>
                                <li className="nav-item ms-lg-auto">
                                    <NavLink className="nav-link" to="/register">
                                        Register
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            </>)}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
