import { useNavigate } from 'react-router-dom';
import HeroSection from '@/common/ui/molecules/HeroSection';

import CatalogGrid from '@/common/ui/widgets/CatalogGrid';

const Home = () => {
  const navigate = useNavigate();

  const handleHeroCtaClick = (_slideId: number) => {
    navigate('/productos');
  };

  const handleExploreClick = () => {
    navigate('/productos');
  };

  return (
    <>
      <HeroSection onCtaClick={handleHeroCtaClick} />

      <CatalogGrid onExploreClick={handleExploreClick} />

     
    </>
  );
};

export default Home;
