import Button from '@/common/ui/atoms/Button';
import Title from '@/common/ui/atoms/Title';

import HeroSection from '@/common/ui/molecules/HeroSection';

import FeaturesWidget from '@/common/ui/widgets/FeaturesWidget';

const Home = () => {
  const handleHeroCtaClick = (slideId: number) => {
    console.log(`Navegando a producto/colección ${slideId}`);
  };

  return (
    <>
      <HeroSection onCtaClick={handleHeroCtaClick} />

      <FeaturesWidget />

      <section className="section">
        <div className="container">
          <div className="text-center">
            <Title level={2} className="mb-4">¿Listo para empezar?</Title>
            <p className="text-secondary mb-6">
              Explora todas las funcionalidades que tenemos para ti.
            </p>
            <Button 
              variant="secondary" 
              onClick={() => console.log('Explorar clicked')}
            >
              Explorar Más
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
