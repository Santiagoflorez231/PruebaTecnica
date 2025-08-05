import { motion } from 'framer-motion';
import { useState } from 'react';
import './CatalogGrid.scss';

interface CatalogGridProps {
  onExploreClick?: () => void;
}

const CatalogGrid = ({  }: CatalogGridProps) => {
  const [currentSlide, setCurrentSlide] = useState(4);
  const totalSlides = 40;

  const nextSlide = () => {
    setCurrentSlide(prev => prev < totalSlides ? prev + 1 : 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev > 1 ? prev - 1 : totalSlides);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <section className="catalog-grid-section">
      <div className="container">
        <motion.div
          className="catalog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div 
            className="catalog-grid__item catalog-grid__text-card"
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="catalog-grid__text-content">
              <motion.h2 
                className="catalog-grid__title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Elegancia Atemporal
              </motion.h2>
              <motion.p 
                className="catalog-grid__subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Descubre nuestra cuidada selección de piezas exclusivas, donde cada prenda cuenta una historia de refinamiento y distinción
              </motion.p>
           
            </div>
          </motion.div>

          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center"
              alt="Ropa elegante en tienda"
              className="catalog-grid__image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Imagen 2 - Vestidos */}
          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&crop=faces"
              alt="Vestidos elegantes"
              className="catalog-grid__image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Imagen 3 - Accesorios y moda */}
          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&crop=faces"
              alt="Accesorios y moda"
              className="catalog-grid__image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Fila Inferior */}
          {/* Imagen 4 - Ropa casual */}
          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&crop=faces"
              alt="Ropa casual moderna"
              className="catalog-grid__image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Imagen 5 - Zapatos y accesorios */}
          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop&crop=center"
              alt="Zapatos y accesorios"
              className="catalog-grid__image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Imagen 6 - Moda urbana */}
          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&crop=faces"
              alt="Moda urbana"
              className="catalog-grid__image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Card de Info - Instagram */}
          <motion.div 
            className="catalog-grid__item catalog-grid__info-card"
            variants={itemVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="catalog-grid__info-content">
              <motion.div 
                className="catalog-grid__counter"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="catalog-grid__current">{currentSlide}</span>
                <span className="catalog-grid__divider">/</span>
                <span className="catalog-grid__total">{totalSlides}</span>
              </motion.div>
              
              <motion.p 
                className="catalog-grid__label"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Instagram
              </motion.p>
              
              <motion.p 
                className="catalog-grid__hashtag"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                #LetsGoFurther
              </motion.p>

              <motion.div 
                className="catalog-grid__navigation"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.button 
                  className="catalog-grid__nav-btn"
                  onClick={prevSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ←
                </motion.button>
                <motion.button 
                  className="catalog-grid__nav-btn"
                  onClick={nextSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  →
                </motion.button>
              </motion.div>

              <motion.div 
                className="catalog-grid__progress-bars"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {[100, 80, 60, 40, 20].map((width, index) => (
                  <motion.div
                    key={index}
                    className="catalog-grid__progress-bar"
                    style={{ width: `${width}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogGrid;
