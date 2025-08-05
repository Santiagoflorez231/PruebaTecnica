import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/productos', label: 'Productos' },
   
    
   
  ];

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <motion.header
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="navbar__container">
        {/* Sección izquierda: Logo + Navegación */}
        <div className="navbar__left-section">
          {/* Logo/Brand */}
          <motion.div
            className="navbar__brand"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="navbar__logo">
              <span className="navbar__logo-text">StyleStore</span>
              <span className="navbar__logo-dot">.</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="navbar__nav navbar__nav--desktop">
            <ul className="navbar__menu">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.to}
                  className="navbar__item"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    to={item.to}
                    className={`navbar__link ${isActiveLink(item.to) ? 'navbar__link--active' : ''}`}
                  >
                    {item.label}
                    {isActiveLink(item.to) && (
                      <motion.div
                        className="navbar__link-indicator"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sección derecha: CTA + Toggle */}
        <div className="navbar__right-section">
          <motion.div
            className="navbar__actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/login" className="navbar__cta">
              <motion.button
                className="btn btn--primary btn--sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ingresar
              </motion.button>
            </Link>
          </motion.div>

          <motion.button
            className="navbar__toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            <motion.div
              className="navbar__hamburger"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 }
                }}
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
              />
            </motion.div>
          </motion.button>
        </div>
      </nav>

      <motion.div
        className="navbar__mobile"
        initial={false}
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={{
          open: {
            opacity: 1,
            height: "auto",
            transition: {
              duration: 0.3,
              ease: "easeOut",
              staggerChildren: 0.05,
              delayChildren: 0.1
            }
          },
          closed: {
            opacity: 0,
            height: 0,
            transition: {
              duration: 0.3,
              ease: "easeIn",
              staggerChildren: 0.05,
              staggerDirection: -1
            }
          }
        }}
      >
        <motion.ul className="navbar__mobile-menu">
          {navItems.map((item) => (
            <motion.li
              key={item.to}
              className="navbar__mobile-item"
              variants={{
                open: { opacity: 1, y: 0 },
                closed: { opacity: 0, y: -20 }
              }}
            >
              <Link
                to={item.to}
                className={`navbar__mobile-link ${isActiveLink(item.to) ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
          <motion.li
            className="navbar__mobile-item"
            variants={{
              open: { opacity: 1, y: 0 },
              closed: { opacity: 0, y: -20 }
            }}
          >
            <Link
              to="/login"
              className="navbar__mobile-cta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ingresar
            </Link>
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
