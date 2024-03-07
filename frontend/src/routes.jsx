import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Users from "./pages/Users.jsx";
import Auth from "./pages/Auth.jsx";
import EbayAuth from "./pages/EbayAuth.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/user", element: <User /> },
      { path: "/users", element: <Users /> },
      { path: "/auth", element: <Auth /> },
      { path: "/ebay-auth", element: <EbayAuth /> }
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;