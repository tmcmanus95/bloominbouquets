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
import HowToPlay from "./pages/HowToPlay.jsx";
import Home from "./pages/Home.jsx";
import SendWord from "./pages/SendWord.jsx";
import OtherProfile from "./pages/OtherProfile.jsx";
import UserSearchResults from "./pages/UserSearchResults.jsx";
import BouquetTesting from "./pages/BouquetTesting.jsx";
import BuySeeds from "./pages/BuySeeds.jsx";
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
        path: "/howToPlay",
        element: <HowToPlay />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/buySeeds",
        element: <BuySeeds />,
      },
      {
        path: "/bouquetTesting",
        element: <BouquetTesting />,
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
