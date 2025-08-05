import { useState } from 'react';
import type { ProductDisplay } from '@/api/types';
import './ProductCard.scss';

interface ProductCardProps {
  product: ProductDisplay;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    const newIndex = currentImageIndex < product.images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : product.images.length - 1;
    setCurrentImageIndex(newIndex);
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

  const additionalColors = product.color_variants ? product.color_variants.length - 1 : 0;

  const shortDescription = product.brand ? 
    `${product.brand} - ${product.description?.length > 25 ? 
      `${product.description.substring(0, 25)}...` : 
      product.description}` :
    (product.description?.length > 35 ? 
      `${product.description.substring(0, 35)}...` : 
      product.description);

  const currentImage = product.images?.[currentImageIndex] || product.image;

  return (
    <div className="product-card">
      <div className="product-card__header">
        <div className="product-card__info">
          <h2 className="product-card__title">{product.name}</h2>
          <p className="product-card__description">{shortDescription}</p>
          <div className="product-card__pricing">
            <p className="product-card__price">{formattedPrice}</p>
            {formattedListPrice && (
              <div className="product-card__original-price">
                <span className="product-card__list-price">{formattedListPrice}</span>
                {discount && <span className="product-card__discount">-{discount}%</span>}
              </div>
            )}
          </div>
        </div>

        <div className="product-card__indicators">
          {!product.available && (
            <div className="product-card__out-of-stock">
              Agotado
            </div>
          )}
          {additionalColors > 0 && (
            <div className="product-card__colors">
              <span className="product-card__colors-count">+{additionalColors}</span>
            </div>
          )}
        </div>
      </div>

      <div className="product-card__image-container">
        <img
          src={currentImage}
          alt={product.name}
          className="product-card__image"
        />
      </div>

      <div className="product-card__navigation">
        <div className="product-card__counter">
          <span className="product-card__current">{currentImageIndex + 1}</span>
          <span className="product-card__divider"> / </span>
          <span className="product-card__total">{product.images?.length || 1}</span>
        </div>

        <div className="product-card__controls">
          <button
            className="product-card__nav-btn"
            onClick={prevImage}
            aria-label="Imagen anterior"
            disabled={!product.images || product.images.length <= 1}
          >
            ←
          </button>
          
          <button
            className="product-card__nav-btn"
            onClick={nextImage}
            aria-label="Siguiente imagen"
            disabled={!product.images || product.images.length <= 1}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
