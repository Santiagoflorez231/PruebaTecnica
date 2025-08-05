import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProducts } from '@/api/queries/products';
import ProductCard from '@/common/ui/molecules/ProductCard';
import Title from '@/common/ui/atoms/Title';
import Button from '@/common/ui/atoms/Button';
import './Products.scss';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { 
    data: products = [], 
    isLoading, 
    error 
  } = useProducts({ 
    limit: currentPage * itemsPerPage,
    sort: sortBy === 'featured' ? 'name' : sortBy.includes('price') ? 'price' : 'name',
    order: sortBy === 'price-high' ? 'desc' : 'asc'
  });

  // Extraer categorías reales de los productos de la API
  const categories = [
    { id: 'all', name: 'Todos los Productos' },
    ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))
      .map(brand => ({ id: brand, name: brand }))
  ];

  const sortOptions = [
    { id: 'featured', name: 'Destacados' },
    { id: 'price-low', name: 'Precio: Menor a Mayor' },
    { id: 'price-high', name: 'Precio: Mayor a Menor' },
    { id: 'newest', name: 'Más Recientes' }
  ];

  // Filtrar productos por categoría usando solo datos reales
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.brand === selectedCategory);

  // Solo ordenar si es necesario (la API ya puede manejar el ordenamiento)
  const sortedProducts = [...filteredProducts];

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset página al cambiar categoría
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset página al cambiar ordenamiento
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
      {/* Hero Section */}
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

      {/* Filters Section */}
      <section className="products-filters">
        <div className="container">
          <div className="products-filters__content">
            {/* Category Filters */}
            <div className="products-filters__categories">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`products-filters__category ${
                    selectedCategory === category.id ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryChange(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="products-filters__sort">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="products-filters__select"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="products-filters__count">
              {isLoading ? (
                <span>Cargando...</span>
              ) : (
                <span>{sortedProducts.length} productos encontrados</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <div className="container">
          {isLoading && currentPage === 1 ? (
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
            <>
              <motion.div
                className="products-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sortedProducts.map((product) => (
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

              {/* No results message */}
              {sortedProducts.length === 0 && !isLoading && (
                <div className="products-no-results">
                  <h3>No se encontraron productos</h3>
                  <p>Intenta ajustar los filtros de búsqueda</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Load More Section */}
      {sortedProducts.length > 0 && sortedProducts.length >= currentPage * itemsPerPage && (
        <section className="products-load-more">
          <div className="container">
            <div className="products-load-more__content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button 
                  variant="secondary"
                  className="products-load-more__button"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? 'Cargando...' : 'Ver Más Productos'}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Products;
