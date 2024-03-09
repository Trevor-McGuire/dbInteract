import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreatePreDraft from "./pages/CreatePreDraft.jsx";
import Wearhousing from "./pages/Wearhousing.jsx";
import ViewPreDraft from "./pages/ViewPreDraft.jsx";
import ViewPreDraftDetail from "./pages/ViewPreDraftDetail.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/create-pre-draft", element: <CreatePreDraft /> },
      { path: "/wearhousing", element: <Wearhousing /> },
      { path: "/view-pre-draft", element: <ViewPreDraft /> },
      { path: "/view-pre-draft/:id", element: <ViewPreDraftDetail /> },
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;