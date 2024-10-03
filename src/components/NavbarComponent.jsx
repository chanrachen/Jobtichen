import React, { useState, useEffect } from "react";
import { Button, Dropdown, Navbar, Avatar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, logout } from "../../src/redux/features/Users/userSlice.js";
import { selectUserProfile } from "../../src/redux/features/Users/userSlice.js";
import {
  getAccessToken,
  removeAccessToken,
} from "../../src/lib/secureLocalStorage.js";
import "../../src/style/custom-buttons.css";
import "../../src/style/custom-navbar.css";

export default function NavbarComponent() {
  const [navbarList, setNavbarList] = useState([
    { title: "Home", url: "/", active: true },
    { title: "Find Jobs", url: "/find-jobs", active: false },
    { title: "Contact Us", url: "/contact-us", active: false },
  ]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getAccessToken();
  const userProfile = useSelector(selectUserProfile);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile()); // Fetch user profile when token exists
    }
  }, [token, dispatch]);

  const handleClick = (list) => {
    setNavbarList((preValue) => {
      return preValue.map((item) => {
        return { ...item, active: item.title === list.title };
      });
    });
  };

  const handleLogout = () => {
    removeAccessToken();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-white w-full shadow">
      <Navbar
        fluid
        rounded
        className="max-w-[1440px] mx-auto xl:px-[100px] py-4"
      >
        <Navbar.Brand as={Link} to={"/"}>
          <span className="cursor-pointer self-center whitespace-nowrap text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-bold dark:text-white">
            Jobtichen
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-2">
          {token ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={
                    userProfile.avatar ||
                    "../../src/assets/placeholder.jpg"
                  }
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {userProfile.username || "User"}
                </span>
                <span className="block truncate text-sm font-medium">
                  {userProfile.email || "email@example.com"}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => navigate("/profile")}>
                Profile Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/saved-jobs")}>
                My Saved Jobs
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/request-password-reset")}>
                Change Password
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/dashboard")}>
                Dashboard
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="flex gap-2">
              <Button className="custom-button" as={Link} to="./login">
                Log in
              </Button>
              <Button className="custom-button" as={Link} to="./register">
                Register
              </Button>
            </div>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {navbarList.map((list, index) => {
            return (
              <Navbar.Link
                key={index}
                as={Link}
                to={list.url}
                className={`${
                  list.active ? "text-[#525451] font-bold" : "text-gray-700"
                }  navbar-link`}
                onClick={() => handleClick(list)}
              >
                {list.title}
              </Navbar.Link>
            );
          })}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
