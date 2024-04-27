import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home.jsx";
import SendWord from "./pages/SendWord.jsx";
import OtherProfile from "./pages/OtherProfile.jsx";
import UserSearchResults from "./pages/UserSearchResults.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/user/:otherPersonsId",
        element: <OtherProfile />,
      },
      { path: "/sendABouquet", element: <SendWord /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/usersearch/:searchTerm",
        element: <UserSearchResults />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "*",
        element: <Error />,
      },
    ],
    errorElement: <Error />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
