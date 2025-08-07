import AppRouter from '@/common/router';
import { CartProvider } from '@/common/context/CartContext';
import { ModalProvider } from '@/common/context/ModalContext';
import { NotificationProvider } from '@/common/context/NotificationContext';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <ModalProvider>
        <CartProvider>
          <AppRouter />
        </CartProvider>
      </ModalProvider>
    </NotificationProvider>
  );
}

export default App;
