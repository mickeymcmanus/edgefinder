import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ExploreEdges } from './components/ExploreEdges';
import { IdeaSpaceMap } from './components/IdeaSpaceMap';
import { TechnoscientificFramework } from './components/TechnoscientificFramework';
import { ProblemFinding } from './components/ProblemFinding';
import { SolverNetwork } from './components/SolverNetwork';
import { LUMAMethods } from './components/LUMAMethods';
import { Insights } from './components/Insights';
import { KnowledgeAccumulation } from './components/KnowledgeAccumulation';

function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [seedData, setSeedData] = useState(null);

  // Listen for seeding events from other components
  useEffect(() => {
    const handleSeedProblemFinding = (event) => {
      setSeedData(event.detail);
      setActiveTab('problems');
    };

    const handleSeedSolverNetwork = (event) => {
      setSeedData(event.detail);
      setActiveTab('community');
    };

    window.addEventListener('seedProblemFinding', handleSeedProblemFinding);
    window.addEventListener('seedSolverNetwork', handleSeedSolverNetwork);

    return () => {
      window.removeEventListener('seedProblemFinding', handleSeedProblemFinding);
      window.removeEventListener('seedSolverNetwork', handleSeedSolverNetwork);
    };
  }, []);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'explore':
        return <ExploreEdges />;
      case 'map':
        return <IdeaSpaceMap />;
      case 'framework':
        return <TechnoscientificFramework />;
      case 'problems':
        return <ProblemFinding seedData={seedData} />;
      case 'community':
        return <SolverNetwork seedData={seedData} />;
      case 'methodology':
        return <LUMAMethods />;
      case 'insights':
        return <Insights />;
      case 'knowledge':
        return <KnowledgeAccumulation />;
      default:
        return <ExploreEdges />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {renderActiveComponent()}
      </main>
      
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">EdgeFinder</h3>
            <p className="text-slate-400 text-sm">
              Exploring the frontiers of research and innovation through systematic problem discovery
            </p>
            <div className="mt-4 text-xs text-slate-500 px-4">
              Integrates with Convergent Research • Powered by LUMA Institute Methods
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;