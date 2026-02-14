import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage onGetStarted={() => setCurrentView('dashboard')} />
      ) : (
        <Dashboard
          onBack={() => setCurrentView('landing')}
          onSearch={() => {}}
        />
      )}
    </>
  );
}

export default App;
