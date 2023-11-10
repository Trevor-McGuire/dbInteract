import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style/normalize.css";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Category from "./pages/Category";
import Product from "./pages/Product/Product";
import About from "./pages/About";
import SearchList from "./pages/SearchList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart/Cart.jsx";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/category/:categoryName",
        element: <Category />,
      },
      {
        path: '/product/:productId',
        element: <Product />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/search/:searchText',
        element: <SearchList />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/profile',
        element: <Profile />
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
