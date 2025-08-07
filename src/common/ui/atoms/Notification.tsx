import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Notification.scss';

interface NotificationProps {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ isVisible, message, type, onClose }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`notification notification--${type}`}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="notification__content">
            <div className="notification__icon">
              {type === 'success' && '✅'}
              {type === 'error' && '❌'}
              {type === 'info' && 'ℹ️'}
            </div>
            <span className="notification__message">{message}</span>
            <button className="notification__close" onClick={onClose}>
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
