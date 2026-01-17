'use client';
import { useState } from 'react';
// 🔴 Remove react-router-dom
// import { useNavigate, Link } from 'react-router-dom';
// 🟢 Add Next.js navigation and link
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { User } from '../types';

export const Signup = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();
  
  // 🟢 Use useRouter
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Mock signup - in real app, this would call an API
    const mockUser: User = {
      id: Date.now().toString(),
      email: identifier.includes('@') ? identifier : undefined,
      phone: identifier.includes('@') ? undefined : identifier,
      createdAt: Date.now(),
      avatarUrl: null,
    };

    login(mockUser);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-display font-bold text-white text-center mb-8">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/70 font-body text-sm mb-2">
                Email or Phone
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber focus:border-transparent font-body"
                placeholder="Enter email or phone"
              />
            </div>

            <div>
              <label className="block text-white/70 font-body text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber focus:border-transparent font-body"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-white/70 font-body text-sm mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyber focus:border-transparent font-body"
                placeholder="Confirm password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full backdrop-blur-sm bg-cyber/20 border border-cyber/30 rounded-lg px-6 py-3 text-cyber hover:bg-cyber/30 transition-colors font-body font-semibold"
            >
              Create Account
            </button>
          </form>

          <p className="text-white/60 text-center mt-6 font-body">
            Already have an account?{' '}
            {/* 🟢 Updated Link usage: "to" -> "href" and no react-router-dom Link */}
            <Link href="/login" className="text-cyber hover:text-cyber/80">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};