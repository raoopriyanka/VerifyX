import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext'; // 1. Import your auth hook

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Pull the live login function from context
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    // 3. Call your live backend login function
    const result = await login(formData.email, formData.password);

    setIsLoading(false);

    if (result.success) {
      // 4. Route securely based on the role returned from the backend
      if (result.role === 'MANUFACTURER') {
        navigate('/dashboard/manufacturer');
      } else if (result.role === 'ADMIN') {
        navigate('/dashboard/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      // Display the backend error message
      setErrorMessage(result.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
        <p className="text-sm text-slate-500 mt-2">
          Sign in to your VerifyX supply-chain node.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-5">
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="name@organization.com"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-slate-600">Remember me</span>
          </label>
          <button type="button" className="font-semibold text-blue-600 hover:text-blue-700">
            Forgot password?
          </button>
        </div>

        <Button type="submit" className="w-full mt-2" isLoading={isLoading} icon={ArrowRight}>
          Sign In
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Don't have an organizational account?{' '}
        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Register your node
        </Link>
      </p>
    </div>
  );
}