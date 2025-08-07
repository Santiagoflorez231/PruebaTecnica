import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/common/ui/organisms/Navbar';
import Footer from '@/common/ui/organisms/Footer/Footer';
import './Layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          className="layout__main"
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

export default Layout;
