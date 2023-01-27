import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import SharedLayout from "./pages/SharedLayout/SharedLayout";

function App() {
    const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const currentUser = user && JSON.parse(user).currentUser;
    const isAdmin = currentUser?.isAdmin;
    // const admin = useSelector((state) => state.user?.currentUser.isAdmin);
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                {isAdmin && (
                    <Route path="/" element={<SharedLayout />}>
                        <Route index element={<Home />} />
                        <Route exact path="/users" element={<UserList />} />
                        <Route exact path="/user/:userId" element={<User />} />
                        <Route exact path="/newUser" element={<NewUser />} />
                        <Route exact path="/products" element={<ProductList />} />
                        <Route exact path="/product/:productId" element={<Product />} />
                        <Route exact path="/newproduct" element={<NewProduct />} />
                    </Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
