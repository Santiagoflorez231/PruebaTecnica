import Button from '../atoms/Button';
import Title from '../atoms/Title';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
}

const HeroSection = ({ title, subtitle, ctaText, onCtaClick }: HeroSectionProps) => {
  return (
    <section className="section section--hero">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <Title level={1} className="mb-4">
            {title}
          </Title>
          <p className="lead mb-8">
            {subtitle}
          </p>
          <Button size="lg" onClick={onCtaClick}>
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
