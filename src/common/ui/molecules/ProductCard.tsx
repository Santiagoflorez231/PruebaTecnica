import { useState } from 'react';
import './ProductCard.scss';

interface ProductCardProps {
  name?: string;
  description?: string;
  price?: string;
  images?: string[];
  totalImages?: number;
  additionalColors?: number;
}

const ProductCard = ({
  name = "Aoyama Totepack M",
  description = "100% High-End Recycled Nylon",
  price = "€340.00",
  images = ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop&crop=center"],
  totalImages = 12,
  additionalColors = 2
}: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="product-card">
      {/* Header con info del producto y colores */}
      <div className="product-card__header">
        <div className="product-card__info">
          <h2 className="product-card__title">{name}</h2>
          <p className="product-card__description">{description}</p>
          <p className="product-card__price">{price}</p>
        </div>

        {/* Indicador de colores adicionales */}
        {additionalColors > 0 && (
          <div className="product-card__colors">
            <span className="product-card__colors-count">+{additionalColors}</span>
          </div>
        )}
      </div>

      {/* Imagen del producto */}
      <div className="product-card__image-container">
        <img
          src={images[currentImageIndex]}
          alt={name}
          className="product-card__image"
        />
      </div>

      {/* Navegación inferior */}
      <div className="product-card__navigation">
        <div className="product-card__counter">
          <span className="product-card__current">{currentImageIndex + 1}</span>
          <span className="product-card__divider"> / </span>
          <span className="product-card__total">{totalImages}</span>
        </div>

        <div className="product-card__controls">
          <button
            className="product-card__nav-btn"
            onClick={prevImage}
            aria-label="Imagen anterior"
          >
            ←
          </button>
          
          <button
            className="product-card__nav-btn"
            onClick={nextImage}
            aria-label="Siguiente imagen"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
