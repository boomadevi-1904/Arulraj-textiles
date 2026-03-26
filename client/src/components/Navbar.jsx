import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const profileBtnRef = useRef(null);
  const studioRef = useRef(null);
  const studioBtnRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (profileOpen) {
        if (
          profileRef.current &&
          !profileRef.current.contains(e.target) &&
          profileBtnRef.current &&
          !profileBtnRef.current.contains(e.target)
        ) {
          setProfileOpen(false);
        }
      }
      if (studioOpen) {
        if (
          studioRef.current &&
          !studioRef.current.contains(e.target) &&
          studioBtnRef.current &&
          !studioBtnRef.current.contains(e.target)
        ) {
          setStudioOpen(false);
        }
      }
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') {
        setProfileOpen(false);
        setStudioOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [profileOpen, studioOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed w-full z-50 bg-brand-cream/90 backdrop-blur-sm border-b border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-3xl font-serif text-brand-dark tracking-wider">
            ARULRAJ TEXTILES
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-brand-dark hover:text-brand-gold transition-colors">Home</Link>
            <Link to="/shop" className="text-brand-dark hover:text-brand-gold transition-colors">Collections</Link>
            <Link to="/about" className="text-brand-dark hover:text-brand-gold transition-colors">About</Link>
            <Link to="/contact" className="text-brand-dark hover:text-brand-gold transition-colors">Contact</Link>
            <div className="relative dropdown">
              <button
                ref={studioBtnRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setStudioOpen((v) => !v);
                }}
                aria-haspopup="menu"
                aria-expanded={studioOpen}
                className="text-brand-dark hover:text-brand-gold"
              >
                Studio
              </button>
              {studioOpen && (
                <div
                  ref={studioRef}
                  className="dropdown-menu absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 border border-brand-gold/10 z-50"
                >
                  <NavLink to="/studio/try-on" onClick={() => setStudioOpen(false)} className={({isActive}) => `dropdown-item block px-4 py-2 ${isActive ? 'bg-brand-cream text-brand-gold' : 'text-brand-dark hover:bg-brand-cream'}`}>Fabric Try-On</NavLink>
                  <NavLink to="/studio/customizer" onClick={() => setStudioOpen(false)} className={({isActive}) => `dropdown-item block px-4 py-2 ${isActive ? 'bg-brand-cream text-brand-gold' : 'text-brand-dark hover:bg-brand-cream'}`}>Color Customizer</NavLink>
                  <NavLink to="/studio/zoom" onClick={() => setStudioOpen(false)} className={({isActive}) => `dropdown-item block px-4 py-2 ${isActive ? 'bg-brand-cream text-brand-gold' : 'text-brand-dark hover:bg-brand-cream'}`}>Fabric Zoom</NavLink>
                  <NavLink to="/studio/quiz" onClick={() => setStudioOpen(false)} className={({isActive}) => `dropdown-item block px-4 py-2 ${isActive ? 'bg-brand-cream text-brand-gold' : 'text-brand-dark hover:bg-brand-cream'}`}>Smart Quiz</NavLink>
                  <NavLink to="/studio/room" onClick={() => setStudioOpen(false)} className={({isActive}) => `dropdown-item block px-4 py-2 ${isActive ? 'bg-brand-cream text-brand-gold' : 'text-brand-dark hover:bg-brand-cream'}`}>Room Visualizer</NavLink>
                  <NavLink to="/studio/moodboard" onClick={() => setStudioOpen(false)} className={({isActive}) => `dropdown-item block px-4 py-2 ${isActive ? 'bg-brand-cream text-brand-gold' : 'text-brand-dark hover:bg-brand-cream'}`}>Moodboard</NavLink>
                  <NavLink to="/studio/ar" onClick={() => setStudioOpen(false)} className={({isActive}) => `dropdown-item block px-4 py-2 ${isActive ? 'bg-brand-cream text-brand-gold' : 'text-brand-dark hover:bg-brand-cream'}`}>AR Preview</NavLink>
                </div>
              )}
            </div>
            {user && user.isAdmin && (
              <Link to="/admin" className="text-brand-gold font-bold">Admin</Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative text-brand-dark hover:text-brand-gold">
              <FiShoppingBag size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  ref={profileBtnRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen((v) => !v);
                  }}
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  className="flex items-center space-x-2 text-brand-dark hover:text-brand-gold"
                >
                  <FiUser size={24} />
                </button>
                {profileOpen && (
                  <div
                    ref={profileRef}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 border border-brand-gold/10 z-50"
                  >
                    <p className="px-4 py-2 text-sm text-gray-500 border-b">Hi, {user.name}</p>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-brand-dark hover:bg-brand-cream"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-brand-dark hover:bg-brand-cream flex items-center"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-brand-dark hover:text-brand-gold">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-dark">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-gold/20">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/shop" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>Collections</Link>
            <Link to="/about" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>Contact</Link>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link to="/studio/try-on" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>Try-On</Link>
              <Link to="/studio/customizer" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>Customizer</Link>
              <Link to="/studio/zoom" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>Zoom</Link>
              <Link to="/studio/quiz" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>Quiz</Link>
              <Link to="/studio/room" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>Room</Link>
              <Link to="/studio/moodboard" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>Moodboard</Link>
              <Link to="/studio/ar" className="block py-2 text-brand-dark" onClick={() => setIsOpen(false)}>AR</Link>
            </div>
            {user && user.isAdmin && (
              <Link to="/admin" className="block py-2 text-brand-gold font-bold" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
            )}
            <div className="pt-4 border-t border-brand-gold/10 flex justify-between items-center">
               <Link to="/cart" className="flex items-center text-brand-dark" onClick={() => setIsOpen(false)}>
                 <FiShoppingBag className="mr-2" /> Cart ({cartItems.length})
               </Link>
               {user ? (
                 <div className="flex items-center space-x-4">
                   <Link to="/profile" className="text-brand-dark" onClick={() => setIsOpen(false)}>Profile</Link>
                   <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-brand-dark">Logout</button>
                 </div>
               ) : (
                 <Link to="/login" className="text-brand-dark" onClick={() => setIsOpen(false)}>Login</Link>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
