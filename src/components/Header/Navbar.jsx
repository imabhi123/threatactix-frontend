import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import logo from "../../assets/images/threatactix_logo_dark.png";
import { ThemeContext } from "../../context/ThemeContext";
import PromotionBar from "./PromotionBar";

const Navbar = ({ isVisible, setIsVisible }) => {
  const { token, signOut } = useContext(AuthContext);
  const { theme: isDarkMode, toggleTheme: toggleDarkMode } =
    useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  const navLinkClass = `relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
    ${
      isDarkMode
        ? "text-gray-300 hover:text-white hover:bg-gray-700"
        : "text-gray-700 hover:text-black hover:bg-gray-200"
    }`;

  const activeNavLinkClass = `${navLinkClass} ${
    isDarkMode ? "bg-gray-900" : "bg-gray-100"
  }`;

  const dropdownItems = [
    { to: "/malware", label: "Malware" },
    { to: "/attacks", label: "Attacks" },
    { to: "/victims", label: "Victims" },
    { to: "/threat-feed", label: "ThreatFeed" },
    { to: "/threat-actors", label: "ThreatActors" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out
      ${
        isScrolled
          ? isDarkMode
            ? "bg-gray-900 shadow-lg"
            : "bg-white shadow-md"
          : isDarkMode
          ? "bg-gray-800"
          : "bg-gray-50"
      }
      ${isMenuOpen ? "h-screen md:h-auto" : ""}`}
    >
      {/* <PromotionBar setIsVisible={setIsVisible} isVisible={isVisible} /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-12  rounded-sm w-auto"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {token && (
                <>
                  <Link
                    to="/dashboard"
                    className={
                      location.pathname === "/dashboard"
                        ? activeNavLinkClass
                        : navLinkClass
                    }
                  >
                    Dashboard
                  </Link>
                  <div
                    className="relative inline-block text-left"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`${navLinkClass} inline-flex items-center`}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      Threats{" "}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {dropdownOpen && (
                      <div
                        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 
                        ${isDarkMode ? "bg-gray-800" : "bg-white"} 
                        ring-1 ring-black ring-opacity-5`}
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {dropdownItems.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`${navLinkClass} block px-4 py-2 w-full text-left`}
                            onClick={() => setDropdownOpen(false)}
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
              {/* Rest of the navigation links */}
              <Link
                to="/pricing"
                className={
                  location.pathname === "/pricing"
                    ? activeNavLinkClass
                    : navLinkClass
                }
              >
                Pricing
              </Link>
              {/* <Link
                to="/docs"
                className={
                  location.pathname === "/docs"
                    ? activeNavLinkClass
                    : navLinkClass
                }
              >
                Docs
              </Link> */}
              <Link
                to="/blogs"
                className={
                  location.pathname === "/blogs"
                    ? activeNavLinkClass
                    : navLinkClass
                }
              >
                Blogs
              </Link>
              <Link
                to="/contact"
                className={
                  location.pathname === "/contact"
                    ? activeNavLinkClass
                    : navLinkClass
                }
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                {isDarkMode ? (
                  <Sun className="h-5 text-white w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              {!token ? (
                <>
                  <Link to="/login" className={`${navLinkClass} ml-4`}>
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      isDarkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className={`${navLinkClass} ml-4`}>
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={`${navLinkClass} ml-4`}
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md 
              ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  : "text-gray-700 hover:text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {token && (
              <>
                <Link to="/dashboard" className={navLinkClass + " block"}>
                  Dashboard
                </Link>
                {dropdownItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={navLinkClass + " block"}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
            <Link to="/pricing" className={navLinkClass + " block"}>
              Pricing
            </Link>
            {/* <Link to="/docs" className={navLinkClass + " block"}>
              Docs
            </Link> */}
            <Link to="/blogs" className={navLinkClass + " block"}>
              Blogs
            </Link>
            <Link to="/contact" className={navLinkClass + " block"}>
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className={
                      navLinkClass +
                      " block px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className={`ml-4 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      isDarkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className={
                      navLinkClass +
                      " block px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className={
                      navLinkClass +
                      " block px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Sign out
                  </button>
                </>
              )}
              <button
                onClick={toggleDarkMode}
                className={`ml-auto p-2 rounded-full ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                } transition-colors duration-200`}
              >
                {isDarkMode ? (
                  <Sun className="h-5 text-white w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
