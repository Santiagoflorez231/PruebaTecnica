import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/common/context/CartContext';
import { useNotification } from '@/common/context/NotificationContext';
import './CartModal.scss';

type CartStep = 'cart' | 'checkout' | 'confirmation';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const { showNotification } = useNotification();
  const [currentStep, setCurrentStep] = useState<CartStep>('cart');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    setCurrentStep('checkout');
  };

  const handleBackToCart = () => {
    setCurrentStep('cart');
  };

  const handleConfirmPurchase = () => {
    setCurrentStep('confirmation');
    showNotification('¡Compra realizada con éxito!', 'success');
  };

  const handleFinishPurchase = () => {
    clearCart();
    setCurrentStep('cart');
    onClose();
  };

  const handleClose = () => {
    setCurrentStep('cart');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={handleClose}>
      <motion.div
        className="cart-modal"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-modal__header">
          <h2>
            {currentStep === 'cart' && 'Carrito de Compras'}
            {currentStep === 'checkout' && 'Resumen de Compra'}
            {currentStep === 'confirmation' && '¡Compra Exitosa!'}
          </h2>
          {currentStep === 'checkout' && (
            <button 
              className="cart-modal__back" 
              onClick={handleBackToCart}
              aria-label="Volver al carrito"
            >
              ←
            </button>
          )}
          <button className="cart-modal__close" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="cart-modal__content">
          {currentStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="cart-modal__empty">
                  <div className="empty-cart-icon">🛒</div>
                  <h3>Tu carrito está vacío</h3>
                  <p>Agrega productos para comenzar tu compra</p>
                </div>
              ) : (
                <>
                  <div className="cart-modal__items">
                    <AnimatePresence>
                      {items.map((item, index) => (
                        <motion.div
                          key={`${item.id}-${item.color}-${item.size}`}
                          className="cart-item"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="cart-item__image">
                            <img src={item.image} alt={item.name} />
                          </div>
                          
                          <div className="cart-item__details">
                            <h4 className="cart-item__name">{item.name}</h4>
                            <p className="cart-item__brand">{item.brand}</p>
                            
                            {(item.color || item.size) && (
                              <div className="cart-item__variants">
                                {item.color && <span>Color: {item.color}</span>}
                                {item.size && <span>Talla: {item.size}</span>}
                              </div>
                            )}
                            
                            <div className="cart-item__price">
                              {item.originalPrice && item.originalPrice > item.price && (
                                <span className="cart-item__original-price">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                              <span className="cart-item__current-price">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="cart-item__controls">
                            <div className="quantity-controls">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                                className="quantity-btn"
                              >
                                -
                              </button>
                              <span className="quantity">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                                className="quantity-btn"
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id, item.color, item.size)}
                              className="remove-btn"
                            >
                              🗑️
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="cart-modal__footer">
                    <div className="cart-modal__total">
                     
                      <div className="total-row total-row--main">
                        <span>Total:</span>
                        <span>{formatPrice(getTotalPrice())}</span>
                      </div>
                    </div>
                    
                    <div className="cart-modal__actions">
                      <button className="btn-secondary" onClick={clearCart}>
                        Vaciar Carrito
                      </button>
                      <button className="btn-primary" onClick={handleCheckout}>
                        Proceder al Pago
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {currentStep === 'checkout' && (
            <>
              <div className="checkout-content">
                <div className="checkout-summary">
                  <h3>Resumen de tu pedido</h3>
                  <div className="checkout-items">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.color}-${item.size}`} className="checkout-item">
                        <div className="checkout-item__image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="checkout-item__details">
                          <h4>{item.name}</h4>
                          <p>{item.brand}</p>
                          {(item.color || item.size) && (
                            <div className="checkout-item__variants">
                              {item.color && <span>Color: {item.color}</span>}
                              {item.size && <span>Talla: {item.size}</span>}
                            </div>
                          )}
                          <div className="checkout-item__quantity">
                            Cantidad: {item.quantity}
                          </div>
                        </div>
                        <div className="checkout-item__price">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-totals">
                    <div className="checkout-row">
                      <span>Subtotal:</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="checkout-row">
                      <span>Envío:</span>
                      <span>Gratis</span>
                    </div>
                    <div className="checkout-row checkout-row--total">
                      <span>Total:</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkout-footer">
                <div className="checkout-actions">
                  <button className="btn-secondary" onClick={handleBackToCart}>
                    Volver al Carrito
                  </button>
                  <button className="btn-primary" onClick={handleConfirmPurchase}>
                    Confirmar Compra
                  </button>
                </div>
              </div>
            </>
          )}

          {currentStep === 'confirmation' && (
            <>
              <div className="confirmation-content">
                <div className="confirmation-icon">✅</div>
                <h3>¡Tu compra ha sido procesada!</h3>
                <p>Gracias por tu compra. Recibirás un correo electrónico con los detalles de tu pedido.</p>
                
                <div className="confirmation-summary">
                  <h4>Resumen del pedido:</h4>
                  <div className="confirmation-total">
                    <strong>Total pagado: {formatPrice(getTotalPrice())}</strong>
                  </div>
                  <div className="confirmation-items-count">
                    {items.reduce((total, item) => total + item.quantity, 0)} artículo(s)
                  </div>
                </div>
              </div>

              <div className="confirmation-footer">
                <div className="confirmation-actions">
                  <button className="btn-primary" onClick={handleFinishPurchase}>
                    Continuar Comprando
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CartModal;
