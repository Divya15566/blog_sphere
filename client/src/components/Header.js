import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              BLOG SPHERE 
            </Link>
          </div>
          
          {token ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/create" 
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Create Post
              </Link>
              
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                </button>
                
                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Link
                        to="/myblogs"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        My Posts
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-200"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;