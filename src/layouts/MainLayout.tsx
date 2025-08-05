import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="main-layout__header">
        <div className="header">
          <Link to="/" className="header__brand">
            Mi App
          </Link>
          
          <nav className="header__nav">
            <ul className="nav">
              <li className="nav__item">
                <Link to="/" className="nav__link">
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/login" className="nav__link">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-layout__main">
        <Outlet />
      </main>

      <footer className="main-layout__footer">
        <div className="footer">
          <div className="footer__content">
            <h3 className="footer__title">Mi Aplicación</h3>
            <p className="footer__description">
              Una aplicación moderna construida con React, TypeScript y SCSS.
            </p>
          </div>
          
          <div className="footer__divider"></div>
          
          <div className="footer__copyright">
            © 2025 Mi Aplicación. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
