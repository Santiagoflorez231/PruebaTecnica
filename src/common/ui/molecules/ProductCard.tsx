import { useState } from 'react';
import type { ProductDisplay } from '@/api/types';
import './ProductCard.scss';

interface ProductCardProps {
  product: ProductDisplay;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (product.images && product.images.length > 1) {
      const newIndex = currentImageIndex < product.images.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 1) {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : product.images.length - 1;
      setCurrentImageIndex(newIndex);
    }
  };

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(product.price);

  const formattedListPrice = product.listPrice && product.listPrice > product.price ? 
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(product.listPrice) : null;

  const discount = formattedListPrice && product.listPrice ? 
    Math.round(((product.listPrice - product.price) / product.listPrice) * 100) : null;

  // Imagen actual a mostrar
  const currentImage = product.images?.[currentImageIndex] || product.image;

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img
          src={currentImage}
          alt={product.name}
          className="product-card__image"
        />
        
        {/* Controles de navegación de imágenes */}
        {product.images && product.images.length > 1 && (
          <div className="product-card__image-nav">
            <button
              className="product-card__nav-btn product-card__nav-btn--prev"
              onClick={prevImage}
              aria-label="Imagen anterior"
            >
              ←
            </button>
            <button
              className="product-card__nav-btn product-card__nav-btn--next"
              onClick={nextImage}
              aria-label="Siguiente imagen"
            >
              →
            </button>
          </div>
        )}
        
        {/* Indicador de imágenes */}
        {product.images && product.images.length > 1 && (
          <div className="product-card__image-indicator">
            {currentImageIndex + 1} / {product.images.length}
          </div>
        )}
      </div>

      <div className="product-card__content">
        <div className="product-card__header">
          <div className="product-card__brand">{product.brand}</div>
          <h2 className="product-card__title">{product.name}</h2>
          <p className="product-card__description">{product.description}</p>
        </div>

        <div className="product-card__footer">
          <div className="product-card__pricing">
            <p className="product-card__price">{formattedPrice}</p>
            {formattedListPrice && (
              <div className="product-card__original-price">
                <span className="product-card__list-price">{formattedListPrice}</span>
                {discount && <span className="product-card__discount">-{discount}%</span>}
              </div>
            )}
          </div>

          <div className="product-card__status">
            {!product.available && (
              <div className="product-card__availability product-card__availability--unavailable">
                Agotado
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
