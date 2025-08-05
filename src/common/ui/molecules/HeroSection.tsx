import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../atoms/Button';
import './HeroSection.scss';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  image: string;
  category: string;
  discount?: string;
}

interface HeroSectionProps {
  onCtaClick?: (slideId: number) => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: HeroSlide[] = [
    {
      id: 1,
      category: "Nueva Colección",
      title: "Estilo Urbano Moderno",
      subtitle: "Descubre las últimas tendencias",
      description: "Ropa cómoda y elegante para tu día a día. Combina estilo y comodidad en cada prenda.",
      ctaText: "Explorar Colección",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=faces",
      discount: "30% OFF"
    },
    {
      id: 2,
      category: "Temporada Otoño",
      title: "Elegancia Atemporal",
      subtitle: "Piezas que nunca pasan de moda",
      description: "Invierte en prendas de calidad que te acompañarán durante años. Estilo clásico renovado.",
      ctaText: "Ver Ofertas",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&crop=faces"
    },
    {
      id: 3,
      category: "Exclusivo Online",
      title: "Casual Premium",
      subtitle: "Comodidad sin comprometer el estilo",
      description: "La perfecta fusión entre confort y elegancia. Ideal para cualquier ocasión casual.",
      ctaText: "Comprar Ahora",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop&crop=faces",
      discount: "NUEVO"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleCtaClick = () => {
    onCtaClick?.(slides[currentSlide].id);
  };

  return (
    <section className="hero-section">
      <div className="hero-section__container">
        {/* Contenido del lado izquierdo */}
        <div className="hero-section__content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="hero-section__text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {slides[currentSlide].discount && (
                <motion.span 
                  className="hero-section__badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {slides[currentSlide].discount}
                </motion.span>
              )}
              
              <motion.p 
                className="hero-section__category"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {slides[currentSlide].category}
              </motion.p>
              
              <motion.h1 
                className="hero-section__title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.h2 
                className="hero-section__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p 
                className="hero-section__description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              
              <motion.div 
                className="hero-section__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  size="lg" 
                  onClick={handleCtaClick}
                  className="hero-section__cta"
                >
                  {slides[currentSlide].ctaText}
                </Button>
                <motion.button 
                  className="hero-section__secondary-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Catálogo
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Indicadores */}
          <div className="hero-section__indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`hero-section__indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => handleSlideChange(index)}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Carrusel de imágenes del lado derecho */}
        <div className="hero-section__carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="hero-section__image-container"
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="hero-section__image-wrapper">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="hero-section__image"
                />
                <motion.div 
                  className="hero-section__image-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navegación del carrusel */}
          <button 
            className="hero-section__nav hero-section__nav--prev"
            onClick={() => handleSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
            aria-label="Imagen anterior"
          >
            ←
          </button>
          <button 
            className="hero-section__nav hero-section__nav--next"
            onClick={() => handleSlideChange(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
            aria-label="Siguiente imagen"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
