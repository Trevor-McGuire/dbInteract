import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Users from "./pages/Users.jsx";
import Auth from "./pages/Auth.jsx";
import EbayAuth from "./pages/EbayAuth.jsx";
import Products from "./pages/Products.jsx";
import Locations from "./pages/Locations.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user", element: <User /> },
      { path: "/users", element: <Users /> },
      { path: "/auth", element: <Auth /> },
      { path: "/ebay-auth", element: <EbayAuth /> },
      { path: "/products", element: <Products /> },
      { path: "/locations", element: <Locations /> }
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;