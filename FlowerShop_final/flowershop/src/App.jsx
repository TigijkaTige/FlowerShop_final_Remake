import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import Main from './components/Main'
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainPage from './pages/MainPage'
import Authentication from "./pages/autofication/Authentication";
import Registration from "./pages/autofication/Registration";
import Product from "./pages/Todos/ProductTodo";
import Category from "./pages/Todos/CategoryTodo";
import Catalog from "./pages/catalog/Catalog";
import EditProduct from "./pages/Todos/component/EditProduct";
import ShopList from "./pages/cart/ShopList";
import AboutProduct from "./pages/catalog/AboutProduct";
import OrderList from "./pages/order/OrderList";
import OrderInfo from "./pages/cart/info";
import OrderListAdmin from "./pages/order/OrderListAdmin";
import OrderCurrentList from "./pages/order/OrderCurrentList";
import OrderDeliveredList from "./pages/order/OrderDeliveredList";
import AboutOrders from "./pages/order/AboutOrder";

function App() {
    const loadStatus = () => {
        const savedStatus = localStorage.getItem("auth-status");
        return savedStatus ? JSON.parse(savedStatus) : false;
    };
    const loadCurrentUser = () => {
        const savedUser = localStorage.getItem("current-user");
        return savedUser ? JSON.parse(savedUser) : null;
    };
    const [isAuthenticated, setIsAuthenticated] = useState(loadStatus);
    const [currentUser, setCurrentUser] = useState(loadCurrentUser);
    //текущий аутентифицированный пользователь

    //текущий аутентифицированный пользователь

    useEffect(() => {
        localStorage.setItem("auth-status", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    // //при изменении текущего аутентифицированного пользователя записываем изменения в localStorage
    useEffect(() => {
        localStorage.setItem("current-user", JSON.stringify(currentUser));
    }, [currentUser]);


    return (
        <div className="container-fluid- d-flex flex-column min-vh-100">
            <Router>
                <Header
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    setIsAuthenticated={setIsAuthenticated}
                    setCurrentUser={setCurrentUser} />
                <Main>
                    <Routes>
                        <Route index element={<MainPage />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/cart" element={<ShopList />} />

                        <Route path="/order" element={<OrderList />} />
                        <Route path="/order/all" element={<OrderListAdmin />} />
                        <Route path="/order/all/current" element={<OrderCurrentList/>} />
                        <Route path="/order/all/delivered" element={<OrderDeliveredList/>} />
                        <Route path="/order/about/:id" element={<AboutOrders/>} />
                        <Route path="/order/info" element={<OrderInfo />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/product/editProduct/:id" element={<EditProduct />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/login" element={<Authentication
                            setIsAuthenticated={setIsAuthenticated}
                            setCurrentUser={setCurrentUser} />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/catalog/about/:id" element={<AboutProduct />} />
                    </Routes>
                </Main>
                <Footer />
            </Router>
        </div>
    )
}

export default App
