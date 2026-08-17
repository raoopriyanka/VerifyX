import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building2, UserPlus } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear error for the field being typed in
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.organization) newErrors.organization = 'Organization name is required';
    if (!formData.role) newErrors.role = 'Please select a role';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMockRegister = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Mocking an API call delay
    setTimeout(() => {
      setIsLoading(false);
      alert('Mock Registration Successful! Please sign in.');
      navigate('/login'); 
    }, 1500);
  };

  const roleOptions = [
    { value: '', label: 'Select your supply-chain role...' },
    { value: 'manufacturer', label: 'Manufacturer (Origin Node)' },
    { value: 'distributor', label: 'Distributor (Transit Node)' },
    { value: 'retailer', label: 'Retailer (Endpoint Node)' },
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Register Node</h1>
        <p className="text-sm text-slate-500 mt-2">
          Join the VerifyX network as an authorized supply-chain participant.
        </p>
      </div>

      <form onSubmit={handleMockRegister} className="space-y-4">
        <Input
          id="fullName"
          label="Full Name"
          placeholder="John Doe"
          icon={User}
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="email"
            type="email"
            label="Work Email"
            placeholder="john@company.com"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            id="organization"
            label="Organization"
            placeholder="Company Ltd."
            icon={Building2}
            value={formData.organization}
            onChange={handleChange}
            error={errors.organization}
          />
        </div>

        <Select
          id="role"
          label="Network Role"
          options={roleOptions}
          value={formData.role}
          onChange={handleChange}
          error={errors.role}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full mt-4" isLoading={isLoading} icon={UserPlus}>
          Create Account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Sign in instead
        </Link>
      </p>
    </div>
  );
}