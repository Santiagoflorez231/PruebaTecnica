import { useNavigate } from 'react-router-dom';
import Button from '@/common/ui/atoms/Button';
import Title from '@/common/ui/atoms/Title';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="section section--hero">
      <div className="container">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="text-6xl mb-4">😵</div>
            <Title level={1} className="mb-4">
              404
            </Title>
            <Title level={2} className="text-secondary mb-4">
              Página no encontrada
            </Title>
            <p className="text-muted">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <Button onClick={() => navigate('/')}>
              Volver al inicio
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={() => navigate(-1)}
            >
              Volver atrás
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
