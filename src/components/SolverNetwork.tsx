import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Award, TrendingUp, UserPlus, Search, Shuffle, Zap, Network, ArrowRight, FolderSync as Sync, CheckCircle, AlertCircle, Clock, Copy, Send, Lightbulb, Target } from 'lucide-react';
import { superConnectorService } from '../services/superconnector';
import { useSuperConnectorSync } from '../hooks/useSuperConnectorSync';
import { promptGenerator } from '../services/promptGenerator';

interface SolverNetworkProps {
  seedData?: any;
}

export const SolverNetwork: React.FC<SolverNetworkProps> = ({ seedData }) => {
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [currentChallenge, setCurrentChallenge] = useState('quantum-error-correction');
  const [showWildcards, setShowWildcards] = useState(false);
  const [recombinationMode, setRecombinationMode] = useState(false);
  const [liveProfiles, setLiveProfiles] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  
  const { 
    isConnected, 
    syncStatus, 
    lastSync, 
    connectToSuperConnector, 
    enrichSuperConnector,
    shareRecombinationOpportunities 
  } = useSuperConnectorSync();
  
  // Handle seeded data from Explore Edges
  React.useEffect(() => {
    if (seedData) {
      // Map the seeded opportunity to a challenge if possible
      const challengeMapping = {
        'Quantum Biology': 'quantum-error-correction',
        'Climate AI': 'climate-modeling',
        'Neurotechnology': 'neural-interfaces'
      };
      const mappedChallenge = challengeMapping[seedData.domain];
      if (mappedChallenge) {
        setCurrentChallenge(mappedChallenge);
      }
    }
  }, [seedData]);
  
  // Simulated auto-search results based on current challenge
  const challengeBasedSolvers = {
    'quantum-error-correction': [
      {
        id: 1,
        name: 'Dr. Sarah Chen',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400&h=400&fit=crop&crop=face',
        title: 'Quantum Systems Researcher',
        expertise: ['Quantum Computing', 'Error Correction', 'Theoretical Physics'],
        solvedProblems: 23,
        rating: 4.9,
        currentProjects: 3,
        availabilityScore: 85,
        location: 'Stanford, CA',
        isAI: false,
        relevanceScore: 95,
        matchReason: 'Direct expertise in quantum error correction protocols'
      },
      {
        id: 2,
        name: 'QuantumSim AI',
        avatar: '/api/placeholder/400/400',
        title: 'Quantum System Simulator',
        expertise: ['Quantum Simulation', 'Error Analysis', 'Protocol Optimization'],
        solvedProblems: 147,
        rating: 4.7,
        currentProjects: 12,
        availabilityScore: 98,
        location: 'Cloud-based',
        isAI: true,
        relevanceScore: 92,
        matchReason: 'Specialized in quantum error correction simulations'
      }
    ]
  };

  // Wildcard solvers from different fields that could contribute novel approaches
  const wildcardSolvers = [
    {
      id: 10,
      name: 'Dr. Maria Santos',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400&h=400&fit=crop&crop=face',
      title: 'Biological Error Correction Expert',
      expertise: ['DNA Repair Mechanisms', 'Cellular Error Correction', 'Evolutionary Biology'],
      solvedProblems: 34,
      rating: 4.8,
      currentProjects: 2,
      availabilityScore: 70,
      location: 'Harvard Medical',
      isAI: false,
      relevanceScore: 78,
      matchReason: 'Biological systems have evolved sophisticated error correction - potential biomimetic approaches',
      wildcard: true,
      recombinationPotential: 'High - DNA repair mechanisms could inspire quantum error correction protocols'
    },
    {
      id: 11,
      name: 'Prof. James Liu',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=400&h=400&fit=crop&crop=face',
      title: 'Network Resilience Researcher',
      expertise: ['Distributed Systems', 'Fault Tolerance', 'Network Theory'],
      solvedProblems: 28,
      rating: 4.6,
      currentProjects: 4,
      availabilityScore: 55,
      location: 'MIT CSAIL',
      isAI: false,
      relevanceScore: 72,
      matchReason: 'Network fault tolerance principles could apply to quantum system architectures',
      wildcard: true,
      recombinationPotential: 'Medium - Distributed error correction strategies from network theory'
    },
    {
      id: 12,
      name: 'CodeCorrect AI',
      avatar: '/api/placeholder/400/400',
      title: 'Software Error Detection System',
      expertise: ['Static Analysis', 'Bug Detection', 'Code Verification'],
      solvedProblems: 203,
      rating: 4.5,
      currentProjects: 15,
      availabilityScore: 95,
      location: 'Distributed',
      isAI: true,
      relevanceScore: 68,
      matchReason: 'Software error correction patterns could inform quantum error detection algorithms',
      wildcard: true,
      recombinationPotential: 'High - Recursive error checking patterns from software engineering'
    }
  ];

  const challenges = [
    { id: 'quantum-error-correction', name: 'Quantum Error Correction', domain: 'Quantum Computing' },
    { id: 'protein-folding', name: 'Protein Folding Prediction', domain: 'Biotechnology' },
    { id: 'climate-modeling', name: 'Climate System Modeling', domain: 'Environmental Science' },
    { id: 'neural-interfaces', name: 'Neural Interface Safety', domain: 'Neurotechnology' }
  ];

  const expertiseAreas = [
    { id: 'all', name: 'All Areas', count: 247 },
    { id: 'quantum', name: 'Quantum', count: 34 },
    { id: 'bio', name: 'Biotechnology', count: 67 },
    { id: 'materials', name: 'Materials', count: 45 },
    { id: 'ai', name: 'AI/ML', count: 89 },
    { id: 'energy', name: 'Energy', count: 23 }
  ];

  const currentSolvers = challengeBasedSolvers[currentChallenge] || [];
  const displaySolvers = showWildcards ? [...currentSolvers, ...wildcardSolvers] : currentSolvers;

  const handleAutoSearch = async () => {
    setIsSearching(true);
    try {
      const challengeName = challenges.find(c => c.id === currentChallenge)?.name || '';
      const profiles = await superConnectorService.searchProfiles(challengeName, {
        domains: [challenges.find(c => c.id === currentChallenge)?.domain || ''],
        includeWildcards: showWildcards
      });
      setLiveProfiles(profiles);
      
      // Enrich SuperConnector with our current insights
      const insights = [
        {
          id: `insight-${Date.now()}`,
          type: 'problem' as const,
          title: challengeName,
          description: `EdgeFinder analysis of ${challengeName}`,
          domain: challenges.find(c => c.id === currentChallenge)?.domain || '',
          tags: ['edgefinder', 'research-gap', 'collaboration'],
          relevanceScore: 95,
          contributors: ['EdgeFinder System'],
          timestamp: new Date().toISOString(),
          methodology: 'Multi-Dimensional Problem Finding',
          crossDomainPotential: showWildcards ? 85 : 60
        }
      ];
      
      await enrichSuperConnector(insights);
      
      if (recombinationMode && showWildcards) {
        const opportunities = [
          {
            id: `recomb-${Date.now()}`,
            domains: ['Quantum Computing', 'Biology', 'Network Theory'],
            description: `Cross-domain recombination opportunity for ${challengeName}`,
            potentialImpact: 'high' as const,
            confidence: 0.78,
            requiredExpertise: ['Quantum Systems', 'Biological Error Correction', 'Network Resilience'],
            suggestedCollaborators: displaySolvers.map(s => s.name)
          }
        ];
        
        await shareRecombinationOpportunities(opportunities);
      }
      
    } catch (error) {
      console.error('Auto-search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const generateIntelligentPrompt = () => {
    const currentChallengeData = challenges.find(c => c.id === currentChallenge);
    
    const context = {
      currentChallenge,
      domain: currentChallengeData?.domain || '',
      activeGaps: [
        'Scalable error correction protocols',
        'Hardware-software integration challenges',
        'Real-time error detection methods'
      ],
      methodsUsed: ['systems-mapping', 'problem-finding', 'cross-domain-analysis'],
      insights: [
        'Cross-domain patterns from biology',
        'Network resilience principles',
        'Recursive error correction strategies'
      ],
      recombinationMode,
      wildcardMode: showWildcards
    };
    
    const prompt = promptGenerator.generateSuperConnectorPrompt(context);
    const copyablePrompt = promptGenerator.generateCopyablePrompt(prompt);
    const intelligentURL = promptGenerator.generateSuperConnectorURL(prompt, context);
    
    setGeneratedPrompt(copyablePrompt);
    setShowPromptModal(true);
    
    // Also update the SuperConnector URL to include the intelligent prompt
    return intelligentURL;
  };

  const copyPromptToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };

  const openSuperConnectorWithPrompt = () => {
    // Open SuperConnector main page where users can manually search with the generated prompt
    window.open('https://superconnector.network', '_blank');
    setShowPromptModal(false);
  };

  useEffect(() => {
    if (isConnected) {
      handleAutoSearch();
    }
  }, [currentChallenge]);

  useEffect(() => {
    // Auto-connect on component mount
    connectToSuperConnector();
  }, [connectToSuperConnector]);

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing': return <Clock size={16} className="text-blue-600 animate-spin" />;
      case 'success': return <CheckCircle size={16} className="text-green-600" />;
      case 'error': return <AlertCircle size={16} className="text-red-600" />;
      default: return <Sync size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
              <Users className="text-blue-600" size={24} />
              <span>Intelligent Solver Network</span>
            </h2>
            <p className="text-slate-600 mt-2">
              AI-powered matching with cross-domain discovery and recombination insights
            </p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setRecombinationMode(!recombinationMode)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-md transition-colors duration-200 ${
                recombinationMode 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Network size={16} />
              <span>Recombination Mode</span>
            </button>
            <div className={`flex items-center space-x-2 px-3 py-2 border rounded-md ${
              isConnected ? 'border-green-300 bg-green-50' : 'border-slate-300 bg-slate-50'
            }`}>
              {getSyncStatusIcon()}
              <span className="text-sm">
                {isConnected ? 'Connected' : 'Offline'}
              </span>
            </div>
            <button
              onClick={generateIntelligentPrompt}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              <Lightbulb size={16} />
              <span>Generate Smart Prompt</span>
            </button>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://superconnector.network', '_blank');
              }}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <UserPlus size={16} />
              <span>Search SuperConnector</span>
            </a>
          </div>
        </div>

        {/* Challenge Selection */}
        <div className="mb-6 p-4 bg-slate-50 rounded-lg">
          {seedData && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-1 flex items-center space-x-2">
                <Target size={16} />
                <span>Seeded from Edge: {seedData.title}</span>
              </h4>
              <p className="text-sm text-blue-800">{seedData.domain} • {seedData.funding}</p>
            </div>
          )}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Current Challenge Context</h3>
            <button 
              onClick={handleAutoSearch}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors duration-200 text-sm ${
                isSearching 
                  ? 'bg-blue-400 text-white cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
              disabled={isSearching}
            >
              <Search size={14} className={isSearching ? 'animate-spin' : ''} />
              <span>{isSearching ? 'Searching...' : 'Auto-Search'}</span>
            </button>
          </div>
          <select 
            value={currentChallenge}
            onChange={(e) => setCurrentChallenge(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {challenges.map(challenge => (
              <option key={challenge.id} value={challenge.id}>
                {challenge.name} ({challenge.domain})
              </option>
            ))}
          </select>
        </div>

        {/* Discovery Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-700">Discovery Mode:</span>
            <div className="flex space-x-2">
              {expertiseAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setSelectedExpertise(area.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedExpertise === area.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {area.name} ({area.count})
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowWildcards(!showWildcards)}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-md transition-colors duration-200 ${
              showWildcards 
                ? 'border-amber-500 bg-amber-50 text-amber-700' 
                : 'border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Shuffle size={16} />
            <span>Include Wildcards</span>
          </button>
        </div>

        {/* Recombination Insights Panel */}
        {recombinationMode && (
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2 flex items-center space-x-2">
              <Zap size={16} />
              <span>Recombination Opportunities {isConnected && '(Live from SuperConnector)'}</span>
            </h3>
            <p className="text-purple-700 text-sm mb-3">
              Based on "The Genesis of Technoscientific Revolutions" - breakthrough innovations emerge from 
              unexpected combinations across domains and recursive application of successful patterns.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded border border-purple-200">
                <h4 className="font-medium text-slate-900 text-sm mb-1">Cross-Domain Patterns</h4>
                <p className="text-slate-600 text-xs">Biological error correction → Quantum systems</p>
              </div>
              <div className="bg-white p-3 rounded border border-purple-200">
                <h4 className="font-medium text-slate-900 text-sm mb-1">Recursive Applications</h4>
                <p className="text-slate-600 text-xs">Software debugging → Hardware fault tolerance</p>
              </div>
              {isConnected && (
                <div className="bg-white p-3 rounded border border-purple-200">
                  <h4 className="font-medium text-slate-900 text-sm mb-1">Live Sync Status</h4>
                  <p className="text-slate-600 text-xs">
                    {lastSync ? `Last sync: ${lastSync.toLocaleTimeString()}` : 'Never synced'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Solver Grid */}
        <div className="space-y-4">
          {liveProfiles.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
                <Network size={16} />
                <span>Live Results from SuperConnector ({liveProfiles.length} found)</span>
              </h3>
              <p className="text-blue-700 text-sm">
                Real-time matches based on your current challenge. These profiles are actively enriching SuperConnector with EdgeFinder insights.
              </p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
          {displaySolvers.map((solver) => (
            <div key={solver.id} className={`border rounded-lg p-5 hover:shadow-md transition-all duration-200 ${
              solver.wildcard ? 'border-amber-300 bg-amber-50' : 'border-slate-200'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="relative">
                  {solver.isAI ? (
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">AI</span>
                    </div>
                  ) : (
                    <img 
                      src={solver.avatar} 
                      alt={solver.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    solver.availabilityScore > 80 ? 'bg-green-500' : 
                    solver.availabilityScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  {solver.wildcard && (
                    <div className="absolute -top-1 -left-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                      <Shuffle size={10} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-slate-900">{solver.name}</h3>
                    {solver.isAI && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">AI</span>
                    )}
                    {solver.wildcard && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">Wildcard</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{solver.title}</p>
                  <p className="text-xs text-slate-500 mb-3">{solver.location}</p>
                  
                  {/* Relevance and Match Reason */}
                  <div className="mb-3 p-2 bg-slate-50 rounded text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-700">Relevance Score</span>
                      <span className="font-bold text-blue-600">{solver.relevanceScore}%</span>
                    </div>
                    <p className="text-slate-600">{solver.matchReason}</p>
                  </div>

                  {/* Recombination Potential for Wildcards */}
                  {solver.wildcard && recombinationMode && (
                    <div className="mb-3 p-2 bg-purple-50 rounded text-xs border border-purple-200">
                      <div className="font-medium text-purple-700 mb-1 flex items-center space-x-1">
                        <Network size={12} />
                        <span>Recombination Potential</span>
                      </div>
                      <p className="text-purple-600">{solver.recombinationPotential}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {solver.expertise.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                    {solver.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">
                        +{solver.expertise.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Award size={14} className="text-amber-500" />
                        <span className="text-slate-600">{solver.solvedProblems}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp size={14} className="text-green-500" />
                        <span className="text-slate-600">{solver.rating}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-slate-500 hover:text-slate-700 transition-colors duration-200">
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {solver.currentProjects} active projects
                      </span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-slate-300 text-slate-700 text-xs rounded-md hover:bg-slate-50 transition-colors duration-200">
                          View Profile
                        </button>
                        <a 
                          href="https://superconnector.network"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1"
                        >
                          <span>Connect</span>
                          <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Recombination Suggestions */}
        {recombinationMode && showWildcards && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
              <Network size={18} className="text-purple-600" />
              <span>Suggested Recombination Teams</span>
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-slate-900">Quantum + Biology Team</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">High Potential</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Combine Dr. Chen's quantum expertise with Dr. Santos's biological error correction knowledge
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Breakthrough probability: 78%</span>
                  <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded-md hover:bg-purple-700 transition-colors duration-200">
                    Form Team
                  </button>
                </div>
              </div>
              {isConnected && (
                <div className="bg-white p-3 rounded border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-slate-900">SuperConnector Integration</span>
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    This recombination opportunity has been shared with SuperConnector network
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Network reach: 12,000+ researchers</span>
                    <a 
                      href="https://superconnector.network"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      View on SuperConnector
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Intelligent Prompt Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                  <Lightbulb className="text-purple-600" size={20} />
                  <span>Intelligent SuperConnector Prompt</span>
                </h3>
                <button
                  onClick={() => setShowPromptModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                AI-generated prompt based on your current exploration context, gaps, and methodology
              </p>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap border">
                {generatedPrompt}
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  This prompt captures your current research context and collaboration needs
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={copyPromptToClipboard}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded-md transition-colors duration-200 ${
                      promptCopied 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Copy size={16} />
                    <span>{promptCopied ? 'Copied!' : 'Copy Prompt'}</span>
                  </button>
                  <button
                    onClick={openSuperConnectorWithPrompt}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Send size={16} />
                    <span>Search SuperConnector</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};