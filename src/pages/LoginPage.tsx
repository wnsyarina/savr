
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      // Error is handled in AuthContext
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-darkPurple mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
                placeholder="email@example.com"
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-orange hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange hover:bg-orange-dark text-white font-semibold py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6">
            <p className="text-xs text-center text-gray-500">
              For demo purposes, use these credentials:
              <br />
              Business: business@example.com / password
              <br />
              Customer: customer@example.com / password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
