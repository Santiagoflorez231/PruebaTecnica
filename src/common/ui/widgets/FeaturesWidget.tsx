import Title from '../atoms/Title';

const FeaturesWidget = () => {
  const features = [
    {
      id: 1,
      title: 'React Router',
      description: 'Navegación dinámica y fluida entre páginas',
      icon: '🚀'
    },
    {
      id: 2,
      title: 'Arquitectura Atómica',
      description: 'Componentes organizados en atoms, molecules y widgets',
      icon: '⚛️'
    },
    {
      id: 3,
      title: 'TypeScript',
      description: 'Tipado estático para mayor seguridad en el desarrollo',
      icon: '📝'
    },
    {
      id: 4,
      title: 'SCSS',
      description: 'Estilos organizados con variables, mixins y arquitectura escalable',
      icon: '🎨'
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-12">
          <Title level={2} className="mb-4">
            Características Principales
          </Title>
          <p className="text-secondary max-w-2xl mx-auto">
            Descubre las tecnologías y patrones que hacen que esta aplicación sea escalable y mantenible.
          </p>
        </div>

        <div className="card-grid card-grid--4-cols">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <span className="feature-card__icon">
                {feature.icon}
              </span>
              <h3 className="feature-card__title">
                {feature.title}
              </h3>
              <p className="feature-card__description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesWidget;
