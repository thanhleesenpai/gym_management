

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "", role: 1 });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 shadow-md py-4 sticky top-0 z-50">

      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo (Stylized Text) */}
        
        <Link to="/" className="flex items-center">
          <img
            src="https://bluegym.vn/wp-content/uploads/2023/09/logo-8.png"
            alt="GymBlue Logo"
            className="h-15 w-15 sm:h-8 object-contain ml-1"
          />
        </Link>
        


        {/* Hamburger Menu for Mobile */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-8 items-center">
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link to="/" className="text-white hover:text-yellow-400 transition-all duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/exercise" className="text-white hover:text-yellow-400 transition-all duration-300">
                Exercises
              </Link>
            </li>
            {auth?.user?.role != 3 && (
              <li>
                <Link to="/feedback" className="text-white hover:text-yellow-400 transition-all duration-300">
                  Feedback
                </Link>
              </li>
            )}
            {auth?.user?.role === 3 && (
              <li>
                <Link to="/dashboard/admin/create-plane" className="text-white hover:text-yellow-400 transition-all duration-300">
                  Create Plan
                </Link>
              </li>
            )}
          </ul>
          {auth?.user ? (
            <>

              <Link
                to={
                  auth.user.role === 3
                    ? "/dashboard/admin"
                    : auth.user.role === 2
                      ? "/dashboard/trainer"
                      : "/dashboard/user"
                }
                className="text-white font-semibold hover:text-yellow-400 transition-all duration-300 capitalize"
              >
                {auth.user.name}
              </Link>

              <button
                onClick={handleLogout}
                className="text-white hover:text-yellow-400 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-white hover:text-yellow-400 transition-all duration-300"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white hover:text-yellow-400 transition-all duration-300"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {/* {isMobileMenuOpen && (
        <div className="lg:hidden bg-blue-600 py-4">
          <ul className="flex flex-col space-y-4 items-center text-lg">
            <li>
              <Link to="/" className="text-white hover:text-yellow-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/exercise" className="text-white hover:text-yellow-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                Exercises
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="text-white hover:text-yellow-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                Feedback
              </Link>
            </li>
            {auth?.user?.name === "admin" && (
              <li>
                <Link to="/dashboard/admin/create-plane" className="text-white hover:text-yellow-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                  Create Plan
                </Link>
              </li>
            )}
            {auth?.user ? (
              <>
                <Link to={auth.user.name === "admin" ? "/dashboard/admin" : "/dashboard/user"} className="text-white font-semibold hover:text-yellow-400 transition-all duration-300 capitalize" onClick={() => setMobileMenuOpen(false)}>
                  {auth.user.name}
                </Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-white hover:text-yellow-400 transition-all duration-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="text-white hover:text-yellow-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
                <Link to="/login" className="text-white hover:text-yellow-400 transition-all duration-300" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </>
            )}
          </ul>
        </div>
      )} */}
    </header>
  );
};

export default Header;



