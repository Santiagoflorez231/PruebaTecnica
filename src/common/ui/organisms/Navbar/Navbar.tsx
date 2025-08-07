import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCart } from '@/common/context/CartContext';
import CartModal from '@/common/ui/molecules/CartModal';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();

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
        <div className="navbar__left-section">
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

        <div className="navbar__right-section">
          <motion.div
            className="navbar__actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="navbar__cart"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Carrito de compras"
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="navbar__cart-icon"
              >
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" />
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" />
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" />
              </svg>
              {getTotalItems() > 0 && (
                <motion.span
                  className="navbar__cart-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={getTotalItems()}
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </motion.button>
          </motion.div>

          <motion.button
            className="navbar__cart-mobile"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Carrito de compras"
            onClick={() => setIsCartOpen(true)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" />
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" />
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" />
            </svg>
            {getTotalItems() > 0 && (
              <motion.span
                className="navbar__cart-count"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={getTotalItems()}
              >
                {getTotalItems()}
              </motion.span>
            )}
          </motion.button>

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
        </motion.ul>
      </motion.div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  );
};

export default Navbar;
