import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useState } from 'react';
import Title from '../atoms/Title';
import Button from '../atoms/Button';
import './ProductsWidget.scss';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  discount?: number;
  rating?: number;
  description?: string;
  features?: string[];
}

interface ProductsWidgetProps {
  onProductClick?: (productId: number) => void;
}

const ProductsWidget = ({ onProductClick }: ProductsWidgetProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: 'Chaqueta Urbana Premium',
      category: 'Chaquetas',
      price: 89990,
      originalPrice: 129990,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&crop=faces',
      discount: 30,
      rating: 4.8,
      isNew: false,
      description: 'Chaqueta urbana de alta calidad confeccionada con materiales premium. Perfecta para cualquier ocasión.',
      features: ['Material impermeable', 'Bolsillos internos', 'Diseño moderno', 'Tallas disponibles: S-XXL']
    },
    {
      id: 2,
      name: 'Vestido Elegante Casual',
      category: 'Vestidos',
      price: 65990,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&crop=faces',
      rating: 4.9,
      isNew: true,
      description: 'Vestido elegante que combina comodidad y estilo. Ideal para eventos casuales y formales.',
      features: ['Tela suave y transpirable', 'Corte favorecedor', 'Fácil de lavar', 'Colores disponibles']
    },
    {
      id: 3,
      name: 'Camisa Oxford Clásica',
      category: 'Camisas',
      price: 45990,
      originalPrice: 59990,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop&crop=faces',
      discount: 23,
      rating: 4.7,
      description: 'Camisa Oxford de corte clásico, perfecta para el uso diario y ocasiones especiales.',
      features: ['100% algodón', 'Corte clásico', 'Cuello abotonado', 'Disponible en varios colores']
    },
    {
      id: 4,
      name: 'Pantalón Slim Fit',
      category: 'Pantalones',
      price: 54990,
      image: 'https://images.unsplash.com/photo-1624378515195-6bbdb73dff1a?w=600&h=800&fit=crop&crop=faces',
      rating: 4.6,
      isNew: true,
      description: 'Pantalón slim fit de alta calidad, diseñado para comodidad y estilo contemporáneo.',
      features: ['Corte slim fit', 'Tela elástica', 'Resistente al desgaste', 'Múltiples tallas']
    },
    {
      id: 5,
      name: 'Blazer Moderno',
      category: 'Blazers',
      price: 98990,
      originalPrice: 139990,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=faces',
      discount: 29,
      rating: 4.8,
      description: 'Blazer moderno de corte impecable, perfecto para reuniones de trabajo y eventos formales.',
      features: ['Corte moderno', 'Solapa estilizada', 'Bolsillos funcionales', 'Forro de calidad']
    },
    {
      id: 6,
      name: 'Falda Midi Elegante',
      category: 'Faldas',
      price: 39990,
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d44?w=600&h=800&fit=crop&crop=faces',
      rating: 4.5,
      isNew: false,
      description: 'Falda midi elegante que combina versatilidad y sofisticación para cualquier ocasión.',
      features: ['Largo midi', 'Cintura ajustable', 'Tela de calidad', 'Fácil combinación']
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    onProductClick?.(product.id);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <LayoutGroup>
      <section className="products-section">
        <div className="container">
          <motion.div 
            className="products-section__header"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Title level={2} className="products-section__title">
                Colección Exclusiva
              </Title>
            </motion.div>
            <motion.p 
              className="products-section__subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Descubre nuestra selección de prendas más populares diseñadas para destacar tu estilo único.
            </motion.p>
          </motion.div>

          <motion.div 
            className="products-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                layoutId={`product-${product.id}`}
                className="product-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product)}
              >
                <motion.div 
                  className="product-card__image-container"
                  layoutId={`product-image-${product.id}`}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  <AnimatePresence>
                    {product.discount && (
                      <motion.span 
                        className="product-card__badge product-card__badge--discount"
                        initial={{ scale: 0, rotate: -12 }}
                        animate={{ scale: 1, rotate: -12 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", damping: 15, stiffness: 300 }}
                      >
                        -{product.discount}%
                      </motion.span>
                    )}
                    
                    {product.isNew && (
                      <motion.span 
                        className="product-card__badge product-card__badge--new"
                        initial={{ scale: 0, x: 20 }}
                        animate={{ scale: 1, x: 0 }}
                        exit={{ scale: 0, x: 20 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                      >
                        NUEVO
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <motion.div 
                        className="product-card__hover-info"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="product-card__quick-info">
                          <span className="product-card__info-label">Tallas disponibles</span>
                          <div className="product-card__sizes">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                              <span key={size} className="product-card__size">{size}</span>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Button 
                            size="sm" 
                            className="product-card__cta"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductClick(product);
                            }}
                          >
                            Ver Detalles
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div 
                  className="product-card__content"
                  layoutId={`product-content-${product.id}`}
                >
                  <motion.span 
                    className="product-card__category"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {product.category}
                  </motion.span>
                  
                  <motion.h3 
                    className="product-card__name"
                    layoutId={`product-name-${product.id}`}
                  >
                    {product.name}
                  </motion.h3>
                  
                  {product.rating && (
                    <motion.div 
                      className="product-card__rating"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="product-card__stars">
                        {[...Array(5)].map((_, i) => (
                          <motion.span 
                            key={i}
                            className={`product-card__star ${i < Math.floor(product.rating!) ? 'product-card__star--filled' : ''}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                          >
                            ★
                          </motion.span>
                        ))}
                      </div>
                      <span className="product-card__rating-value">({product.rating})</span>
                    </motion.div>
                  )}

                  <motion.div 
                    className="product-card__pricing"
                    layoutId={`product-pricing-${product.id}`}
                  >
                    <span className="product-card__price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="product-card__original-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="products-section__footer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button size="lg" variant="outline">
              Explorar Toda la Colección
            </Button>
          </motion.div>
        </div>

        {/* Modal con Shared Layout */}
        <AnimatePresence mode="wait">
          {selectedProduct && (
            <motion.div
              className="product-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            >
              <motion.div
                className="product-modal__content"
                layoutId={`product-${selectedProduct.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="product-modal__close"
                  onClick={closeModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>

                <div className="product-modal__grid">
                  <motion.div 
                    className="product-modal__image-container"
                    layoutId={`product-image-${selectedProduct.id}`}
                  >
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="product-modal__image"
                    />
                  </motion.div>

                  <motion.div 
                    className="product-modal__details"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <motion.span className="product-modal__category">
                      {selectedProduct.category}
                    </motion.span>
                    
                    <motion.h2 
                      className="product-modal__name"
                      layoutId={`product-name-${selectedProduct.id}`}
                    >
                      {selectedProduct.name}
                    </motion.h2>

                    {selectedProduct.rating && (
                      <div className="product-modal__rating">
                        <div className="product-modal__stars">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i}
                              className={`product-modal__star ${i < Math.floor(selectedProduct.rating!) ? 'product-modal__star--filled' : ''}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="product-modal__rating-value">({selectedProduct.rating})</span>
                      </div>
                    )}

                    <motion.div 
                      className="product-modal__pricing"
                      layoutId={`product-pricing-${selectedProduct.id}`}
                    >
                      <span className="product-modal__price">{formatPrice(selectedProduct.price)}</span>
                      {selectedProduct.originalPrice && (
                        <span className="product-modal__original-price">
                          {formatPrice(selectedProduct.originalPrice)}
                        </span>
                      )}
                      {selectedProduct.discount && (
                        <span className="product-modal__discount">
                          Ahorra {selectedProduct.discount}%
                        </span>
                      )}
                    </motion.div>

                    <motion.p 
                      className="product-modal__description"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {selectedProduct.description}
                    </motion.p>

                    {selectedProduct.features && (
                      <motion.div 
                        className="product-modal__features"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4>Características:</h4>
                        <ul>
                          {selectedProduct.features.map((feature, index) => (
                            <motion.li 
                              key={index}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.5 + (index * 0.1) }}
                            >
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    <motion.div 
                      className="product-modal__actions"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button size="lg" className="product-modal__add-to-cart">
                        Agregar al Carrito
                      </Button>
                      <Button size="lg" variant="outline" className="product-modal__wishlist">
                        ♡ Favoritos
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
};

export default ProductsWidget;
