import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Category from "./pages/Category.jsx";
import Product from "./pages/Product/Product.jsx";
import About from "./pages/About.jsx";
import SearchList from "./pages/SearchList.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import WithAuth from "./withAuth.jsx"; // Import your WithAuth HOC

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "category/:categoryId", element: <Category /> },
      { path: "product/:productId", element: <Product /> },
      { path: "about", element: <About /> },
      { path: "search", element: <SearchList /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <Cart /> },
      { path: "profile", element: <Profile /> }
    ].map(childRoute => ({
      ...childRoute,
      element: <WithAuth>{childRoute.element}</WithAuth> // Wrap each child route with WithAuth
    }))
  }
];

const router = createBrowserRouter(routes);

export default router;