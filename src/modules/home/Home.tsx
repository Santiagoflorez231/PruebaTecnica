import HeroSection from '@/common/ui/molecules/HeroSection';

import CatalogGrid from '@/common/ui/widgets/CatalogGrid';

const Home = () => {
  const handleHeroCtaClick = (slideId: number) => {
    console.log(`Navegando a producto/colección ${slideId}`);
  };

  const handleExploreClick = () => {
    console.log('Explorando catálogo en Instagram');
  };

  return (
    <>
      <HeroSection onCtaClick={handleHeroCtaClick} />

      <CatalogGrid onExploreClick={handleExploreClick} />

     
    </>
  );
};

export default Home;
