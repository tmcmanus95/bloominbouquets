import { Link } from "react-router-dom";
import { useState } from "react";
import Auth from "../utils/auth";
import flowerIcon from "../assets/flowerfavicon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import UserSearchBar from "./UserSearchBar";
import { RiUserSearchLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { IoFlowerOutline } from "react-icons/io5";
import { useQuery } from "@apollo/client";
import { NAVBAR_QUERY } from "../utils/queries";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userSearchOpen, setUserSearchOpen] = useState(false);
  const { data, loading, error } = useQuery(NAVBAR_QUERY);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleUserSearch = () => {
    setUserSearchOpen(!userSearchOpen);
  };
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  if (data) {
    console.log("data", data);
  }
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mx-auto px-4 md:flex items-center dark:bg-slate-900 bg-slate-200 gap-6 py-1">
      <div className="flex w-full items-center dark:text-white">
        <Link to="/">
          <img className="h-5 lg:h-10 mr-5" src={flowerIcon}></img>{" "}
        </Link>
        {data ? <IoFlowerOutline style={{ color: data.me.color }} /> : <></>}
        <div className="md:hidden flex items-center ml-5 text-right dark:text-white">
          <GiHamburgerMenu
            onClick={toggleMenu}
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
        </div>

        <div className="hidden md:gap-5 md:flex md:flex-row ">
          {data ? (
            <div className="hidden md:gap-5 md:flex md:flex-row">
              {Auth.loggedIn ? (
                <Link to="/me" className="hover:bg-blue-300 lg:p-2 rounded-lg">
                  Welcome {data.me.username}
                </Link>
              ) : (
                <Link className="hover:bg-blue-300 lg:p-2 rounded-lg" to="/">
                  Bloomin Bouquets
                </Link>
              )}
            </div>
          ) : (
            <div className="hidden md:gap-5 md:flex md:flex-row">
              <Link className="hover:bg-blue-300 lg:p-2 rounded-lg" to="/">
                Bloomin Bouquets
              </Link>
            </div>
          )}

          <Link to="/about" className="hover:bg-blue-300 lg:p-2 rounded-lg">
            About
          </Link>
          <Link to="/contact" className="hover:bg-blue-300 lg:p-2 rounded-lg">
            Contact
          </Link>
        </div>
        {userSearchOpen ? (
          <div className="mx-5 flex justify-center align-center items-center">
            <UserSearchBar />
            <IoCloseOutline onClick={toggleUserSearch} />
          </div>
        ) : (
          <RiUserSearchLine onClick={toggleUserSearch} />
        )}
        {/* <div className="mx-5 flex justify-center align-center items-center"></div> */}
        {menuOpen && (
          <div className="absolute inset-x-0 md:relative top-full md:top-auto md:left-auto md:flex flex-col items-center space-x-1 pb-3 md:pb-0  dark:bg-slate-900 bg-slate-200">
            <Link
              onClick={toggleMenu}
              to="/about"
              className="py-2 px-3 block w-full hover:bg-blue-300"
            >
              About
            </Link>
            <Link
              onClick={toggleMenu}
              to="/contact"
              className="py-2 px-3 block w-full hover:bg-blue-300"
            >
              Contact
            </Link>

            {Auth.loggedIn() ? (
              <>
                <Link
                  onClick={toggleMenu}
                  to="/me"
                  className="py-2 px-3 block w-full hover:bg-blue-300 "
                >
                  View My Profile
                </Link>
                <button
                  onClick={logout}
                  className="btn text-left py-2 px-3 block w-full hover:bg-blue-300 "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-3 block w-full hover:bg-blue-300 "
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-3 block w-full hover:bg-blue-300 "
                  onClick={toggleMenu}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex space-x-4">
        {Auth.loggedIn() ? (
          <>
            <Link to="/me">
              <button className="hover:bg-blue-300 p-2 rounded-lg">
                Profile
              </button>
            </Link>
            <button
              onClick={logout}
              className="hover:bg-blue-300 p-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="hover:bg-blue-300 p-2 rounded-lg">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="hover:bg-blue-300 p-2 rounded-lg">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
