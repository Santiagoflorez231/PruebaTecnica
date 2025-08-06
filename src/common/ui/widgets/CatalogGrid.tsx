import { motion } from 'framer-motion';
import './CatalogGrid.scss';

interface CatalogGridProps {
  onExploreClick?: () => void;
}

const CatalogGrid = ({  }: CatalogGridProps) => {
  const isMobile = window.innerWidth <= 768;

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
            whileHover={!isMobile ? { scale: 1.02, transition: { duration: 0.3 } } : {}}
          >
            <div className="catalog-grid__text-content">
              <motion.p 
                className="catalog-grid__category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Nueva Colección
              </motion.p>
              <motion.h2 
                className="catalog-grid__title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Estilo Atemporal
              </motion.h2>
              <motion.p 
                className="catalog-grid__subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Descubre piezas únicas que definen tu personalidad y te acompañan en cada momento especial
              </motion.p>
           
            </div>
          </motion.div>

          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={!isMobile ? { scale: 1.05, transition: { duration: 0.4 } } : {}}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center"
              alt="Ropa elegante en tienda"
              className="catalog-grid__image"
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={!isMobile ? { scale: 1.05, transition: { duration: 0.4 } } : {}}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&crop=faces"
              alt="Vestidos elegantes"
              className="catalog-grid__image"
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={!isMobile ? { scale: 1.05, transition: { duration: 0.4 } } : {}}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&crop=faces"
              alt="Accesorios y moda"
              className="catalog-grid__image"
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={!isMobile ? { scale: 1.05, transition: { duration: 0.4 } } : {}}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&crop=faces"
              alt="Ropa casual moderna"
              className="catalog-grid__image"
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={!isMobile ? { scale: 1.05, transition: { duration: 0.4 } } : {}}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop&crop=center"
              alt="Zapatos y accesorios"
              className="catalog-grid__image"
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          <motion.div 
            className="catalog-grid__item catalog-grid__image-card"
            variants={itemVariants}
            whileHover={!isMobile ? { scale: 1.05, transition: { duration: 0.4 } } : {}}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&crop=faces"
              alt="Moda urbana"
              className="catalog-grid__image"
              whileHover={!isMobile ? { scale: 1.1 } : {}}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          <motion.div 
            className="catalog-grid__item catalog-grid__cta-card"
            variants={itemVariants}
            whileHover={!isMobile ? { scale: 1.02, transition: { duration: 0.3 } } : {}}
          >
            <div className="catalog-grid__cta-content">
              <motion.h3 
                className="catalog-grid__cta-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                ¿Listo para empezar?
              </motion.h3>
              
            <motion.p 
                className="catalog-grid__cta-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                Encuentra las prendas perfectas para expresar tu estilo único.
            </motion.p>

              <motion.button 
                className="catalog-grid__cta-button"
                onClick={() => console.log('Explorar clicked')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={!isMobile ? { scale: 1.05, transition: { duration: 0.2 } } : {}}
                whileTap={{ scale: 0.95 }}
              >
                Explorar Más
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogGrid;
