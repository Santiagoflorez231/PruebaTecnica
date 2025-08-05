import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Comprar',
      links: [
        { label: 'Mujer', to: '/mujer' },
        { label: 'Hombre', to: '/hombre' },
        { label: 'Accesorios', to: '/accesorios' },
        { label: 'Ofertas', to: '/ofertas' },
      ]
    },
    {
      title: 'Ayuda',
      links: [
        { label: 'Guía de Tallas', to: '/guia-tallas' },
        { label: 'Envíos', to: '/envios' },
        { label: 'Devoluciones', to: '/devoluciones' },
        { label: 'Contacto', to: '/contacto' },
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Nosotros', to: '/nosotros' },
        { label: 'Sustentabilidad', to: '/sustentabilidad' },
        { label: 'Trabaja con nosotros', to: '/empleos' },
        { label: 'Prensa', to: '/prensa' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Pinterest', icon: '�', url: '#' },
    { name: 'TikTok', icon: '🎵', url: '#' },
  ];

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__content">
          {/* Brand Section */}
          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="footer__logo">
              <span className="footer__logo-text">StyleStore</span>
              <span className="footer__logo-dot">.</span>
            </Link>
            <p className="footer__description">
              Descubre las últimas tendencias en moda. Calidad, estilo y elegancia en cada prenda para expresar tu personalidad única.
            </p>
            <div className="footer__social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="footer__social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={social.name}
                >
                  <span>{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="footer__section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="footer__section-title">{section.title}</h3>
              <ul className="footer__links">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    className="footer__link-item"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.to}
                      className="footer__link"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

     

        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} StyleStore. Todos los derechos reservados.
            </p>
            <div className="footer__legal">
              <Link to="/privacy" className="footer__legal-link">
                Privacidad
              </Link>
              <Link to="/terms" className="footer__legal-link">
                Términos
              </Link>
              <Link to="/cookies" className="footer__legal-link">
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
