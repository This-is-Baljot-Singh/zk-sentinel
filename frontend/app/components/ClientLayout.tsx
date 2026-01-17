'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import { LandingPage } from './LandingPage';
import { FloatingNav } from './FloatingNav';
import { Login } from './Login';
import { Signup } from './Signup';
import { Dashboard } from './Dashboard';
import { Documents } from './Documents';
import { Activity } from './Activity';
import { VoiceInterview } from './VoiceInterview';
import { Settings } from './Settings';

type NavItem = 'home' | 'documents' | 'activity' | 'settings' | 'voice';

export default function ClientLayout() {
  const { state, setHasLaunched } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  // Handling "Routing" logic locally to mimic SPA behavior if strictly needed, 
  // OR standard Next.js routing. 
  // Given the project code, it switches components based on path. 
  // We can render specific components based on the current pathname.

  const getActiveItem = (path: string): NavItem => {
    switch (path) {
      case '/': return 'home';
      case '/documents': return 'documents';
      case '/activity': return 'activity';
      case '/voice': return 'voice';
      case '/settings': return 'settings';
      default: return 'home';
    }
  };

  const handleNavigate = (item: NavItem) => {
    switch (item) {
      case 'home': router.push('/'); break;
      case 'documents': router.push('/documents'); break;
      case 'activity': router.push('/activity'); break;
      case 'voice': router.push('/voice'); break;
      case 'settings': router.push('/settings'); break;
    }
  };

  if (!state.hasLaunched) {
    return <LandingPage onLaunch={() => setHasLaunched(true)} />;
  }

  // Auth Checks
  if (!state.isAuthenticated) {
     if (pathname === '/signup') return <Signup />;
     return <Login />;
  }

  // Authenticated Views
  const renderContent = () => {
    switch (pathname) {
      case '/': return <Dashboard />;
      case '/documents': return <Documents />;
      case '/activity': return <Activity />;
      case '/voice': return <VoiceInterview />;
      case '/settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      {renderContent()}
      <FloatingNav activeItem={getActiveItem(pathname)} onNavigate={handleNavigate} />
    </>
  );
}