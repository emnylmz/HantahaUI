import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import Hamburger from 'hamburger-react';
import Logo from 'components/admin/Logo';
import { useEffect } from 'react';
import { getCookie } from 'utils/utils';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileSection from 'views/layout/MainLayout/Header/ProfileSection';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [lastSection, setLastSection] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const location = useLocation();

  useEffect(() => {
    const token = getCookie('hanTaha-auth-token');
    const lastSection= window.location.pathname.split("/").pop();
    setLastSection(lastSection);
    setUsername(getCookie('username'));
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo" onClick={()=>window.location.href="/"}>
          <Logo/>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements ${showNavbar ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/home" className={lastSection == "" || lastSection == 'home'?"active":""}>Anasayfa</NavLink>
            </li>
            <li>
              <NavLink to="/contact"  className={lastSection == 'contact'?"active":""}>Bize Ulaşın</NavLink>
            </li>
            {isAuthenticated ? (
              <li>
                <ProfileSection/>
                </li>
            ) : (
              <li>
                <Button variant="outlined" href='/auth/login' startIcon={<AccountCircleIcon />}>
                  Giriş Yap
                </Button>
              </li>
            )}
          </ul>
        </div>

        
      </div>
    </nav>
  );
};

export default Navbar;
