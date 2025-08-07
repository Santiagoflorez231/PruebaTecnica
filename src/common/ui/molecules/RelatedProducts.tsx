import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../../api/queries/products';
import type { ProductDisplay } from '../../../api/types/products';
import './RelatedProducts.scss';

interface RelatedProductsProps {
  currentProductId: string;
  onProductClick: (productId: string) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  onProductClick,
}) => {
  const { data: allProducts, isLoading } = useProducts();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getRelatedProducts = (): ProductDisplay[] => {
    if (!allProducts) return [];
    
    const related = allProducts
      .filter(product => product.id !== currentProductId)
      .slice(0, 6);
    
    return related;
  };

  const relatedProducts = getRelatedProducts();

  if (isLoading || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="related-products">
      <h3 className="related-products__title">Productos Relacionados</h3>
      <div className="related-products__grid">
        {relatedProducts.map((product, index) => {
          const hasDiscount = product.listPrice && product.listPrice > product.price;

          return (
            <motion.div
              key={product.id}
              className="related-product-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => onProductClick(product.id)}
            >
              <div className="related-product-card__image">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="no-image">
                    <span>📦</span>
                  </div>
                )}
                {hasDiscount && (
                  <div className="discount-badge">
                    {Math.round(((product.listPrice! - product.price) / product.listPrice!) * 100)}% OFF
                  </div>
                )}
              </div>
              
              <div className="related-product-card__info">
                <h4 className="product-name" title={product.name}>
                  {product.name}
                </h4>
                <p className="product-brand">{product.brand}</p>
                
                <div className="product-pricing">
                  {hasDiscount && (
                    <span className="original-price">
                      {formatPrice(product.listPrice!)}
                    </span>
                  )}
                  <span className="current-price">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
