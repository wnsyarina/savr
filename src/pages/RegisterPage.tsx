
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password || !name) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (role === 'business' && (!businessName || !businessAddress)) {
      toast.error('Please fill in business details');
      return;
    }
    
    try {
      await register({
        email,
        name,
        role,
        businessName: role === 'business' ? businessName : undefined,
        businessAddress: role === 'business' ? businessAddress : undefined
      }, password);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      // Error is handled in AuthContext
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="flex-1">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-darkPurple mb-2">Create Account</h1>
            <p className="text-gray-500">Join the food waste reduction community</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
                placeholder="John Doe"
              />
            </div>
            
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
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Account Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={role === 'customer'}
                    onChange={() => setRole('customer')}
                    className="h-4 w-4 text-orange focus:ring-orange"
                  />
                  <span className="ml-2">Customer</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="business"
                    checked={role === 'business'}
                    onChange={() => setRole('business')}
                    className="h-4 w-4 text-orange focus:ring-orange"
                  />
                  <span className="ml-2">Business</span>
                </label>
              </div>
            </div>
            
            {role === 'business' && (
              <>
                <div className="space-y-2">
                  <label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
                    placeholder="Your Business Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="businessAddress" className="text-sm font-medium text-gray-700">
                    Business Address
                  </label>
                  <input
                    id="businessAddress"
                    type="text"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:outline-none"
                    placeholder="123 Main St, City, Country"
                  />
                </div>
              </>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange hover:bg-orange-dark text-white font-semibold py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-orange font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
