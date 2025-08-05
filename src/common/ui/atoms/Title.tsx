import type { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const Title = ({ children, level = 1, className = '' }: TitleProps) => {
  const getClasses = () => {
    let classes = ['title', `title--h${level}`];
    if (className) classes.push(className);
    return classes.join(' ');
  };

  switch (level) {
    case 1:
      return <h1 className={getClasses()}>{children}</h1>;
    case 2:
      return <h2 className={getClasses()}>{children}</h2>;
    case 3:
      return <h3 className={getClasses()}>{children}</h3>;
    case 4:
      return <h4 className={getClasses()}>{children}</h4>;
    case 5:
      return <h5 className={getClasses()}>{children}</h5>;
    case 6:
      return <h6 className={getClasses()}>{children}</h6>;
    default:
      return <h1 className={getClasses()}>{children}</h1>;
  }
};

export default Title;
