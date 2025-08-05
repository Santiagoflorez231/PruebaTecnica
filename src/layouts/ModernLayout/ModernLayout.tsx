import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/common/ui/organisms/Navbar';
import Footer from '@/common/ui/organisms/Footer/Footer';
import './ModernLayout.scss';

const ModernLayout = () => {
  return (
    <div className="modern-layout">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          className="modern-layout__main"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ModernLayout;
