import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const Login = () => {
  const loginProviders = [
    { 
      name: 'Google', 
      url: '/.auth/login/google', 
      variant: 'danger'
    },
    { 
      name: 'Facebook', 
      url: '/.auth/login/facebook', 
      variant: 'primary'
    },
    { 
      name: 'GitHub', 
      url: '/.auth/login/github', 
      variant: 'dark'
    }
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 text-center">
        <h2 className="mb-4">Login</h2>
        <div className="d-grid gap-2">
          {loginProviders.map((provider) => (
            <Button 
              key={provider.name} 
              variant={provider.variant} 
              href={provider.url}
              size="lg"
            >
              Login with {provider.name}
            </Button>
          ))}
        </div>
      </Card>
    </Container>
  );
};

export default Login;