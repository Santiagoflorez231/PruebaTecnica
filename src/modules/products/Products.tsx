import { motion } from 'framer-motion';
import { useState } from 'react';
import ProductCard from '@/common/ui/molecules/ProductCard';
import Title from '@/common/ui/atoms/Title';
import Button from '@/common/ui/atoms/Button';
import './Products.scss';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', name: 'Todos los Productos' },
    { id: 'dresses', name: 'Vestidos' },
    { id: 'tops', name: 'Blusas & Tops' },
    { id: 'pants', name: 'Pantalones' },
    { id: 'accessories', name: 'Accesorios' },
    { id: 'shoes', name: 'Calzado' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Destacados' },
    { id: 'price-low', name: 'Precio: Menor a Mayor' },
    { id: 'price-high', name: 'Precio: Mayor a Menor' },
    { id: 'newest', name: 'Más Recientes' }
  ];

  const products = [
    {
      id: 1,
      name: "Vestido Elegante Parisino",
      description: "Seda Premium con Bordados Artesanales",
      price: "€890.00",
      category: "dresses",
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop&crop=faces"
      ],
      totalImages: 8,
      additionalColors: 3,
      isNew: true
    },
    {
      id: 2,
      name: "Blazer Ejecutivo Premium",
      description: "Lana Italiana 100% - Corte Tailored",
      price: "€1.250.00",
      category: "tops",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=center"
      ],
      totalImages: 6,
      additionalColors: 2,
      isNew: false
    },
    {
      id: 3,
      name: "Pantalón Wide Leg Minimalista",
      description: "Algodón Orgánico - Diseño Atemporal",
      price: "€450.00",
      category: "pants",
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop&crop=faces",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop&crop=faces"
      ],
      totalImages: 5,
      additionalColors: 4,
      isNew: true
    },
    {
      id: 4,
      name: "Bolso Tote Signature",
      description: "Cuero Genuino - Edición Limitada",
      price: "€680.00",
      category: "accessories",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=center"
      ],
      totalImages: 4,
      additionalColors: 1,
      isNew: false
    },
    {
      id: 5,
      name: "Camisa Oversized Contemporánea",
      description: "Lino Natural - Confección Artesanal",
      price: "€320.00",
      category: "tops",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop&crop=faces"
      ],
      totalImages: 7,
      additionalColors: 5,
      isNew: true
    },
    {
      id: 6,
      name: "Zapatos Oxford Premium",
      description: "Cuero Italiano - Suela de Cuero",
      price: "€950.00",
      category: "shoes",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop&crop=center"
      ],
      totalImages: 6,
      additionalColors: 2,
      isNew: false
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
                  onClick={() => setSelectedCategory(category.id)}
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
                onChange={(e) => setSortBy(e.target.value)}
                className="products-filters__select"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <div className="container">
          <motion.div
            className="products-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
                className="products-grid__item"
              >
                <ProductCard
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  images={product.images}
                  totalImages={product.totalImages}
                  additionalColors={product.additionalColors}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Load More Section */}
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
                onClick={() => console.log('Loading more products...')}
              >
                Ver Más Productos
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
