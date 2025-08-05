import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/common/ui/atoms/Button';
import Title from '@/common/ui/atoms/Title';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__header">
          <Title level={1} className="login-page__title">
            Iniciar Sesión
          </Title>
          <p className="login-page__subtitle">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        <div className="login-page__form">
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form__input"
                placeholder="tu@email.com"
              />
            </div>

            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form__input"
                placeholder="••••••••"
              />
            </div>

            <div className="form__actions form__actions--vertical">
              <Button type="submit" fullWidth>
                Iniciar Sesión
              </Button>
            </div>
          </form>

          <div className="login-page__link">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="link"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
