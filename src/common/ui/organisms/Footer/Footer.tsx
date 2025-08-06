"use client"

import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import './Footer.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const shopLinks = [
    { label: 'Mujer', href: '/productos' },
    { label: 'Hombre', href: '/productos' },
    { label: 'Ofertas', href: '/productos' },
    { label: 'Nuevos', href: '/productos' },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="footer__container">
        <div className="footer__content">
          
          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="footer__logo">
              <span className="footer__logo-text">
                StyleStore
              </span>
              <motion.span
                className="footer__logo-dot"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                .
              </motion.span>
            </Link>
            
            <p className="footer__description">
              Moda moderna y elegante para tu estilo único. Calidad premium en cada prenda.
            </p>

            <div className="footer__social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="footer__social-link"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer__section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="footer__section-title">
              Comprar
            </h3>
            
            <ul className="footer__links">
              {shopLinks.map((link, linkIndex) => (
                <motion.li
                  key={link.label}
                  className="footer__link-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + linkIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="footer__link"
                  >
                    <motion.span
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} StyleStore. Todos los derechos reservados.
            </p>
            
            <div className="footer__legal">
              <motion.button
                onClick={() => {}}
                className="footer__legal-link"
                whileHover={{ y: -1 }}
              >
                Política de Privacidad
              </motion.button>
              <span className="footer__separator">|</span>
              <motion.button
                onClick={() => {}}
                className="footer__legal-link"
                whileHover={{ y: -1 }}
              >
                Términos y Condiciones
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
