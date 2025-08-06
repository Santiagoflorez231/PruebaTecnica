import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProducts } from '@/api/queries/products';
import ProductCard from '@/common/ui/molecules/ProductCard';
import Title from '@/common/ui/atoms/Title';
import './Products.scss';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const { 
    data: allProducts = [], 
    isLoading, 
    error 
  } = useProducts({});

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const products = allProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="products-error">
            <h2>Error al cargar productos</h2>
            <p>Por favor, intenta nuevamente más tarde.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <motion.div
            className="products-hero__content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="products-hero__category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Colección Premium
            </motion.p>
            <Title level={1} className="products-hero__title">
              Descubre Tu Estilo Único
            </Title>
            <motion.p 
              className="products-hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Piezas cuidadosamente seleccionadas que combinan elegancia atemporal con diseño contemporáneo
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="products-grid-section">
        <div className="container">
          {isLoading ? (
            <div className="products-loading">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="products-loading__content"
              >
                <p>Cargando productos...</p>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="products-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  layout
                  className="products-grid__item"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {totalPages > 1 && (
        <section className="products-pagination">
          <div className="container">
            <div className="pagination">
              <button 
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className="pagination__btn pagination__btn--prev"
              >
                ← Anterior
              </button>
              
              <div className="pagination__numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`pagination__number ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className="pagination__btn pagination__btn--next"
              >
                Siguiente →
              </button>
            </div>
            
            <div className="pagination__info">
              <p>
                Mostrando {startIndex + 1}-{Math.min(endIndex, allProducts.length)} de {allProducts.length} productos
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Products;
