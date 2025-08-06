import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProductDetail } from '@/api/queries/productDetail';
import ProductModal from '@/common/ui/molecules/ProductModal';
import Button from '@/common/ui/atoms/Button';
import './ProductDetailModal.scss';

interface ProductDetailModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  productId,
  isOpen,
  onClose,
}) => {
  const { data: product, isLoading, error } = useProductDetail(productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [variationError, setVariationError] = useState<string>('');

  const selectedItem = useMemo(() => {
    if (!product?.items) return null;

    const matchingItem = product.items.find((item) => {
      return Object.entries(selectedVariations).every(([variation, value]) => {
        if (variation === 'Color' && item.Color) {
          return item.Color.includes(value);
        }
        if (variation === 'Talla' && item.Talla) {
          return item.Talla.includes(value);
        }
        return false;
      });
    });

    return matchingItem || product.items[0];
  }, [product, selectedVariations]);

  const currentImages = useMemo(() => {
    return selectedItem?.images || [];
  }, [selectedItem]);

  React.useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedItem]);

  React.useEffect(() => {
    if (product && Object.keys(selectedVariations).length === 0) {
      const firstAvailableItem = product.items?.find(item => 
        item.sellers?.[0]?.commertialOffer?.IsAvailable
      );
      
      if (firstAvailableItem) {
        const initialVariations: Record<string, string> = {};
        if (firstAvailableItem.Color?.[0]) {
          initialVariations.Color = firstAvailableItem.Color[0];
        }
        if (firstAvailableItem.Talla?.[0]) {
          initialVariations.Talla = firstAvailableItem.Talla[0];
        }
        setSelectedVariations(initialVariations);
      }
    }
  }, [product, selectedVariations]);

  const handleVariationChange = (variationType: string, value: string) => {
    const availableInSomeItem = product?.items?.some((item) => {
      if (variationType === 'Color' && item.Color) {
        return item.Color.includes(value);
      }
      if (variationType === 'Talla' && item.Talla) {
        return item.Talla.includes(value);
      }
      return false;
    });

    if (!availableInSomeItem) {
      setVariationError(`${variationType} "${value}" no está disponible para este producto.`);
      setTimeout(() => setVariationError(''), 3000); 
      return;
    }

    const newVariations = {
      ...selectedVariations,
      [variationType]: value,
    };

    const matchingItem = product?.items?.find((item) => {
      return Object.entries(newVariations).every(([variation, selectedValue]) => {
        if (variation === 'Color' && item.Color) {
          return item.Color.includes(selectedValue);
        }
        if (variation === 'Talla' && item.Talla) {
          return item.Talla.includes(selectedValue);
        }
        return false;
      });
    });

    if (!matchingItem) {
      setVariationError(`Esta combinación de ${Object.keys(newVariations).join(' y ')} no está disponible.`);
      setTimeout(() => setVariationError(''), 3000);
      return;
    }

    setVariationError(''); 
    setSelectedVariations(newVariations);
  };

  const formatErrorMessage = (errorMessage: string) => {
    const match = errorMessage.match(/Message:\s*(.+)$/);
    return match ? match[1] : errorMessage;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getAvailableVariations = () => {
    if (!product?.skuSpecifications) return [];
    
    return product.skuSpecifications.map((spec) => ({
      name: spec.field.name,
      values: spec.values.map((value) => ({
        id: value.id,
        name: value.name,
        position: value.position,
      })),
    }));
  };

  const isVariationAvailable = (variationType: string, value: string) => {
    if (!product?.items) return false;
    
    const testVariations = {
      ...selectedVariations,
      [variationType]: value,
    };

    return product.items.some((item) => {
      return Object.entries(testVariations).every(([variation, selectedValue]) => {
        if (variation === 'Color' && item.Color) {
          return item.Color.includes(selectedValue);
        }
        if (variation === 'Talla' && item.Talla) {
          return item.Talla.includes(selectedValue);
        }
        return false;
      });
    });
  };

  const renderSpecifications = () => {
    if (!product) return null;

    const specs = [
      { label: 'Marca', value: product.brand },
      { label: 'Referencia', value: product.productReference },
      { label: 'País de Origen', value: product['PAÍS DE ORIGEN']?.[0] },
      { label: 'Composición', value: product['COMPOSICIÓN']?.[0] },
    ].filter((spec) => spec.value);

    return specs;
  };

  if (!isOpen) return null;

  return (
    <ProductModal isOpen={isOpen} onClose={onClose}>
      <div className="product-detail">
        {isLoading && (
          <div className="product-detail__loading">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="loading-spinner"
            >
              <div className="spinner"></div>
              <p>Cargando detalles del producto...</p>
            </motion.div>
          </div>
        )}

        {error && (
          <div className="product-detail__error">
            <h3>Error al cargar el producto</h3>
            <p>Por favor, intenta nuevamente más tarde.</p>
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        )}

        {product && selectedItem && (
          <div className="product-detail__content">
            <div className="product-detail__images">
              <div className="main-image">
                {currentImages.length > 0 ? (
                  <motion.img
                    key={selectedImageIndex}
                    src={currentImages[selectedImageIndex]?.imageUrl}
                    alt={currentImages[selectedImageIndex]?.imageText || product.productName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <div className="no-image">
                    <p>Imagen no disponible</p>
                  </div>
                )}
              </div>
              
              {currentImages.length > 1 && (
                <div className="image-thumbnails">
                  {currentImages.map((image, index) => (
                    <button
                      key={image.imageId}
                      className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image.imageUrl}
                        alt={`Vista ${index + 1}`}
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-detail__info">
              <div className="product-header">
                <h1 className="product-title">{product.productName}</h1>
                <p className="product-brand">{product.brand}</p>
              </div>

              {selectedItem.sellers?.[0]?.commertialOffer && (
                <div className="product-pricing">
                  {selectedItem.sellers[0].commertialOffer.ListPrice > 
                   selectedItem.sellers[0].commertialOffer.Price && (
                    <span className="original-price">
                      {formatPrice(selectedItem.sellers[0].commertialOffer.ListPrice)}
                    </span>
                  )}
                  <span className="current-price">
                    {formatPrice(selectedItem.sellers[0].commertialOffer.Price)}
                  </span>
                </div>
              )}

              <div className="product-variations-container">
                {getAvailableVariations().map((variation) => (
                  <div key={variation.name} className="product-variation">
                    <h4>{variation.name}</h4>
                    <div className="variation-options">
                      {variation.values.map((value) => {
                        const isAvailable = isVariationAvailable(variation.name, value.name);
                        return (
                          <button
                            key={value.id}
                            className={`variation-option ${
                              selectedVariations[variation.name] === value.name ? 'selected' : ''
                            } ${!isAvailable ? 'disabled' : ''}`}
                            onClick={() => {
                              if (isAvailable) {
                                handleVariationChange(variation.name, value.name);
                              } else {
                                setVariationError(`${variation.name} "${value.name}" no está disponible con las opciones seleccionadas.`);
                                setTimeout(() => setVariationError(''), 3000);
                              }
                            }}
                            disabled={!isAvailable}
                          >
                            {value.name}
                          </button>
                        );
                      })}
                    </div>
                    {variationError && (
                      <div className="variation-error-message">
                        {variationError}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="product-availability">
                {selectedItem.sellers?.[0]?.commertialOffer?.IsAvailable ? (
                  <div className="availability available">
                    <span className="status-indicator"></span>
                    <span>Disponible</span>
                  </div>
                ) : (
                  <div className="availability unavailable">
                    <span className="status-indicator"></span>
                    <span>No disponible</span>
                    {selectedItem.sellers?.[0]?.commertialOffer?.GetInfoErrorMessage && (
                      <p className="error-message">
                        {formatErrorMessage(selectedItem.sellers[0].commertialOffer.GetInfoErrorMessage)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {selectedItem.sellers?.[0]?.commertialOffer?.IsAvailable && (
                <div className="product-actions">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      window.open(selectedItem.sellers![0].addToCartLink, '_blank');
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              )}

              {product.metaTagDescription && (
                <div className="product-description">
                  <p>{product.metaTagDescription}</p>
                </div>
              )}

              <div className="product-specifications">
                <h3>Especificaciones</h3>
                <div className="specs-grid">
                  {renderSpecifications()?.map((spec, index) => (
                    <div key={index} className="spec-item">
                      <dt>{spec.label}:</dt>
                      <dd dangerouslySetInnerHTML={{ __html: spec.value || 'No especificado' }} />
                    </div>
                  )) || null}
                </div>
                
                {(renderSpecifications()?.length || 0) === 0 && (
                  <p className="no-specs">Especificaciones no disponibles</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProductModal>
  );
};

export default ProductDetailModal;
