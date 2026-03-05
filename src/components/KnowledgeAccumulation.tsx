import React, { useState } from 'react';
import { Brain, TrendingUp, Users, Zap, Database, Target, ThumbsUp, ThumbsDown, Star, Award, Filter, BarChart3, PieChart, Activity, Lightbulb, FileText, MessageSquare, Eye, EyeOff, Send, Clock, CheckCircle, AlertTriangle, Play, Pause, RotateCcw, Plus } from 'lucide-react';

interface SolverProfile {
  id: string;
  name: string;
  expertise: string[];
  domain: string;
  avatar?: string;
  isAI: boolean;
  responseRate: number;
  rating: number;
  participationCount: number;
}

interface ConceptSubmission {
  id: string;
  title: string;
  description: string;
  submittedBy: string;
  domain: string;
  timestamp: string;
  tags: string[];
  status: 'pending' | 'testing' | 'completed';
}

interface FitnessTest {
  id: string;
  conceptId: string;
  algorithm: 'surprisingly-popular' | 'prediction-market' | 'bayesian-truth-serum' | 'wisdom-of-crowds';
  status: 'setup' | 'active' | 'completed';
  participants: SolverProfile[];
  responses: {
    solverId: string;
    ownPrediction: number;
    othersPrediction: number;
    confidence: number;
    reasoning?: string;
    timestamp: string;
  }[];
  results?: {
    fitness: number;
    surprisinglyPopularScore?: number;
    marketPrice?: number;
    truthScore?: number;
    consensus: number;
    confidence: number;
  };
  settings: {
    duration: number; // minutes
    minParticipants: number;
    maxParticipants: number;
    incentiveStructure: string;
  };
}

interface KnowledgeMetric {
  type: 'insight' | 'assertion' | 'conjecture' | 'hypothesis' | 'framing' | 'tacit';
  title: string;
  content: string;
  contributor: string;
  domain: string;
  timestamp: string;
  votes: {
    surprising: number;
    useful: number;
    novel: number;
    feasible: number;
  };
  confidence: number;
  validationScore: number;
  tags: string[];
}

export const KnowledgeAccumulation: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'insight' | 'assertion' | 'conjecture' | 'hypothesis' | 'framing' | 'tacit'>('all');
  const [viewMode, setViewMode] = useState<'metrics' | 'fitness' | 'training' | 'testing'>('metrics');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [activeTest, setActiveTest] = useState<FitnessTest | null>(null);
  const [newConceptTitle, setNewConceptTitle] = useState('');
  const [newConceptDescription, setNewConceptDescription] = useState('');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  // Sample solver profiles
  const solvers: SolverProfile[] = [
    {
      id: 'solver-1',
      name: 'Dr. Sarah Chen',
      expertise: ['Quantum Computing', 'Error Correction'],
      domain: 'Quantum Computing',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400&h=400&fit=crop&crop=face',
      isAI: false,
      responseRate: 0.95,
      rating: 4.9,
      participationCount: 23
    },
    {
      id: 'solver-2',
      name: 'Dr. Maria Santos',
      expertise: ['DNA Repair', 'Cellular Systems'],
      domain: 'Biology',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400&h=400&fit=crop&crop=face',
      isAI: false,
      responseRate: 0.88,
      rating: 4.7,
      participationCount: 18
    },
    {
      id: 'solver-3',
      name: 'QuantumSim AI',
      expertise: ['Quantum Simulation', 'Pattern Recognition'],
      domain: 'AI Systems',
      isAI: true,
      responseRate: 0.99,
      rating: 4.6,
      participationCount: 156
    },
    {
      id: 'solver-4',
      name: 'Prof. James Liu',
      expertise: ['Network Theory', 'Distributed Systems'],
      domain: 'Computer Science',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=400&h=400&fit=crop&crop=face',
      isAI: false,
      responseRate: 0.82,
      rating: 4.5,
      participationCount: 31
    }
  ];

  // Sample concept submissions
  const conceptSubmissions: ConceptSubmission[] = [
    {
      id: 'concept-1',
      title: 'Quantum Error Correction via DNA Repair Mechanisms',
      description: 'Apply biological DNA repair strategies to quantum error correction protocols',
      submittedBy: 'Dr. Maria Santos',
      domain: 'Quantum Biology',
      timestamp: '2 hours ago',
      tags: ['cross-domain', 'biomimetic', 'quantum-computing'],
      status: 'testing'
    },
    {
      id: 'concept-2',
      title: 'Metamaterial Neural Interfaces',
      description: 'Non-invasive brain-computer interfaces using programmable metamaterials',
      submittedBy: 'Prof. James Liu',
      domain: 'Neurotechnology',
      timestamp: '4 hours ago',
      tags: ['metamaterials', 'BCI', 'non-invasive'],
      status: 'pending'
    },
    {
      id: 'concept-3',
      title: 'Swarm Intelligence for Climate Modeling',
      description: 'Apply ant colony optimization to distributed climate prediction systems',
      submittedBy: 'QuantumSim AI',
      domain: 'Climate Science',
      timestamp: '6 hours ago',
      tags: ['swarm-intelligence', 'climate', 'distributed-systems'],
      status: 'completed'
    }
  ];

  // Sample active fitness tests
  const fitnessTests: FitnessTest[] = [
    {
      id: 'test-1',
      conceptId: 'concept-1',
      algorithm: 'surprisingly-popular',
      status: 'active',
      participants: solvers.slice(0, 3),
      responses: [
        {
          solverId: 'solver-1',
          ownPrediction: 0.85,
          othersPrediction: 0.65,
          confidence: 0.9,
          reasoning: 'Biological error correction is highly sophisticated and could inspire quantum protocols',
          timestamp: '1 hour ago'
        },
        {
          solverId: 'solver-2',
          ownPrediction: 0.78,
          othersPrediction: 0.55,
          confidence: 0.85,
          reasoning: 'DNA repair mechanisms are well-understood and could translate to quantum systems',
          timestamp: '45 minutes ago'
        }
      ],
      settings: {
        duration: 120,
        minParticipants: 3,
        maxParticipants: 10,
        incentiveStructure: 'Accuracy-based rewards'
      }
    },
    {
      id: 'test-2',
      conceptId: 'concept-3',
      algorithm: 'surprisingly-popular',
      status: 'completed',
      participants: solvers,
      responses: [
        {
          solverId: 'solver-1',
          ownPrediction: 0.72,
          othersPrediction: 0.45,
          confidence: 0.8,
          timestamp: '2 days ago'
        },
        {
          solverId: 'solver-3',
          ownPrediction: 0.88,
          othersPrediction: 0.60,
          confidence: 0.95,
          timestamp: '2 days ago'
        },
        {
          solverId: 'solver-4',
          ownPrediction: 0.75,
          othersPrediction: 0.50,
          confidence: 0.85,
          timestamp: '2 days ago'
        }
      ],
      results: {
        fitness: 0.84,
        surprisinglyPopularScore: 0.89,
        consensus: 0.71,
        confidence: 0.87
      },
      settings: {
        duration: 180,
        minParticipants: 3,
        maxParticipants: 8,
        incentiveStructure: 'Accuracy-based rewards'
      }
    }
  ];

  // Sample knowledge accumulation data
  const knowledgeMetrics: KnowledgeMetric[] = [
    {
      type: 'insight',
      title: 'Quantum Error Correction Mirrors DNA Repair',
      content: 'The redundancy and error-checking mechanisms in DNA repair could inspire more robust quantum error correction protocols.',
      contributor: 'Dr. Maria Santos',
      domain: 'Quantum Biology',
      timestamp: '2 hours ago',
      votes: { surprising: 23, useful: 31, novel: 28, feasible: 19 },
      confidence: 0.84,
      validationScore: 0.78,
      tags: ['cross-domain', 'biomimetic', 'quantum-computing']
    },
    {
      type: 'hypothesis',
      title: 'Metamaterials Enable Non-Invasive Neural Reading',
      content: 'Programmable metamaterials could focus and amplify neural signals through the skull, eliminating need for invasive BCIs.',
      contributor: 'Prof. James Liu',
      domain: 'Neurotechnology',
      timestamp: '4 hours ago',
      votes: { surprising: 18, useful: 25, novel: 32, feasible: 14 },
      confidence: 0.71,
      validationScore: 0.82,
      tags: ['metamaterials', 'BCI', 'non-invasive']
    },
    {
      type: 'framing',
      title: 'Climate Tech as Immune System for Earth',
      content: 'Reframing climate interventions as planetary immune responses - detection, response, and adaptation mechanisms.',
      contributor: 'Dr. Alex Rivera',
      domain: 'Climate Science',
      timestamp: '6 hours ago',
      votes: { surprising: 15, useful: 22, novel: 19, feasible: 21 },
      confidence: 0.67,
      validationScore: 0.73,
      tags: ['systems-thinking', 'climate', 'biological-metaphor']
    }
  ];

  // Training data readiness metrics
  const trainingMetrics = {
    totalContributions: 2847,
    uniqueContributors: 234,
    domainCoverage: 0.78,
    qualityScore: 0.82,
    diversityIndex: 0.91,
    readinessScore: 0.75,
    estimatedTokens: 12500000,
    targetTokens: 50000000,
    domains: [
      { name: 'Quantum Computing', contributions: 456, quality: 0.89 },
      { name: 'Biotechnology', contributions: 623, quality: 0.85 },
      { name: 'Climate Science', contributions: 389, quality: 0.78 },
      { name: 'Neurotechnology', contributions: 234, quality: 0.82 },
      { name: 'Materials Science', contributions: 345, quality: 0.80 },
      { name: 'Energy Systems', contributions: 278, quality: 0.76 }
    ]
  };

  const startFitnessTest = (conceptId: string, algorithm: string) => {
    const concept = conceptSubmissions.find(c => c.id === conceptId);
    if (!concept) return;

    const newTest: FitnessTest = {
      id: `test-${Date.now()}`,
      conceptId,
      algorithm: algorithm as any,
      status: 'setup',
      participants: [],
      responses: [],
      settings: {
        duration: 120,
        minParticipants: 3,
        maxParticipants: 10,
        incentiveStructure: 'Accuracy-based rewards'
      }
    };

    setActiveTest(newTest);
  };

  const inviteSolvers = (testId: string, solverIds: string[]) => {
    if (!activeTest) return;
    
    const invitedSolvers = solvers.filter(s => solverIds.includes(s.id));
    setActiveTest({
      ...activeTest,
      participants: [...activeTest.participants, ...invitedSolvers],
      status: 'active'
    });
  };

  const submitConcept = () => {
    if (!newConceptTitle || !newConceptDescription) return;

    const newConcept: ConceptSubmission = {
      id: `concept-${Date.now()}`,
      title: newConceptTitle,
      description: newConceptDescription,
      submittedBy: 'Current User',
      domain: 'Mixed',
      timestamp: 'Just now',
      tags: ['user-submitted'],
      status: 'pending'
    };

    // Add to submissions (in real app, this would be an API call)
    conceptSubmissions.unshift(newConcept);
    
    setNewConceptTitle('');
    setNewConceptDescription('');
    setShowSubmissionForm(false);
  };

  const getAlgorithmDescription = (algorithm: string) => {
    switch (algorithm) {
      case 'surprisingly-popular':
        return {
          name: 'Surprisingly Popular (MIT)',
          description: 'Identifies ideas that are more popular than people predict they will be - often the most innovative ideas.',
          mechanism: 'Asks: "How good is this idea?" and "How good do you think others will rate it?" Ideas rated higher than predicted are surprisingly popular.',
          reference: 'Prelec, Seung & McCoy (2017) - Solution to the single-question crowd wisdom problem'
        };
      case 'prediction-market':
        return {
          name: 'Prediction Markets',
          description: 'Market-based mechanism where participants bet on idea success using virtual currency.',
          mechanism: 'Participants buy/sell shares in idea outcomes. Market price reflects collective belief in success probability.',
          reference: 'Hanson (1999) - Decision markets for policy advice'
        };
      case 'bayesian-truth-serum':
        return {
          name: 'Bayesian Truth Serum',
          description: 'Incentivizes honest reporting by rewarding surprising but commonly held opinions.',
          mechanism: 'Rewards participants for giving answers that are more common than they predict, encouraging truthful responses.',
          reference: 'Prelec (2004) - A Bayesian Truth Serum for Subjective Data'
        };
      case 'wisdom-of-crowds':
        return {
          name: 'Wisdom of Crowds',
          description: 'Aggregates diverse opinions to find collective intelligence and consensus.',
          mechanism: 'Simple averaging of independent judgments from diverse participants.',
          reference: 'Surowiecki (2004) - The Wisdom of Crowds'
        };
      default:
        return { name: 'Unknown', description: '', mechanism: '', reference: '' };
    }
  };

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'insight': return Lightbulb;
      case 'assertion': return FileText;
      case 'conjecture': return MessageSquare;
      case 'hypothesis': return Target;
      case 'framing': return Eye;
      case 'tacit': return Brain;
      default: return Database;
    }
  };

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'insight': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'assertion': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'conjecture': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hypothesis': return 'bg-green-100 text-green-800 border-green-200';
      case 'framing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'tacit': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const calculateSurprisinglyPopular = (responses: any[]) => {
    if (responses.length < 2) return 0;
    
    const avgOwnPrediction = responses.reduce((sum, r) => sum + r.ownPrediction, 0) / responses.length;
    const avgOthersPrediction = responses.reduce((sum, r) => sum + r.othersPrediction, 0) / responses.length;
    
    return Math.max(0, avgOwnPrediction - avgOthersPrediction);
  };

  const filteredMetrics = selectedMetric === 'all' ? knowledgeMetrics : knowledgeMetrics.filter(m => m.type === selectedMetric);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2 mb-2">
            <Database className="text-purple-600" size={24} />
            <span>Knowledge Accumulation & Idea Fitness</span>
          </h2>
          <p className="text-slate-600">
            Track solver contributions and test idea fitness through crowd wisdom algorithms
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-700">View:</span>
            <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
              {[
                { id: 'metrics', label: 'Knowledge Metrics', icon: BarChart3 },
                { id: 'fitness', label: 'Concept Testing', icon: Target },
                { id: 'testing', label: 'Active Tests', icon: Activity },
                { id: 'training', label: 'Training Readiness', icon: Brain }
              ].map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      viewMode === mode.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Concept Testing View */}
        {viewMode === 'fitness' && (
          <div className="space-y-6">
            {/* Submit New Concept */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                  <Lightbulb className="text-blue-600" size={18} />
                  <span>Submit Concept for Fitness Testing</span>
                </h3>
                <button
                  onClick={() => setShowSubmissionForm(!showSubmissionForm)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus size={16} />
                  <span>New Concept</span>
                </button>
              </div>

              {showSubmissionForm && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Concept Title</label>
                      <input
                        type="text"
                        value={newConceptTitle}
                        onChange={(e) => setNewConceptTitle(e.target.value)}
                        placeholder="e.g., Quantum-Enhanced Biological Drug Discovery"
                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                      <textarea
                        value={newConceptDescription}
                        onChange={(e) => setNewConceptDescription(e.target.value)}
                        placeholder="Describe your concept and its potential impact..."
                        rows={3}
                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={submitConcept}
                        disabled={!newConceptTitle || !newConceptDescription}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                      >
                        <Send size={16} />
                        <span>Submit for Testing</span>
                      </button>
                      <button
                        onClick={() => setShowSubmissionForm(false)}
                        className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Concept Submissions */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Target className="text-purple-600" size={18} />
                <span>Concept Submissions</span>
              </h3>
              
              <div className="space-y-4">
                {conceptSubmissions.map((concept) => (
                  <div key={concept.id} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-slate-900">{concept.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            concept.status === 'completed' ? 'bg-green-100 text-green-800' :
                            concept.status === 'testing' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {concept.status}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-3">{concept.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span className="font-medium">{concept.submittedBy}</span>
                          <span>•</span>
                          <span>{concept.domain}</span>
                          <span>•</span>
                          <span>{concept.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {concept.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Test Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <div className="text-sm text-slate-600">
                        Test this concept's fitness using crowd wisdom algorithms
                      </div>
                      <div className="flex space-x-2">
                        {['surprisingly-popular', 'prediction-market', 'bayesian-truth-serum', 'wisdom-of-crowds'].map((algorithm) => (
                          <button
                            key={algorithm}
                            onClick={() => startFitnessTest(concept.id, algorithm)}
                            className="px-3 py-1 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200 text-xs"
                          >
                            {algorithm.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Testing View */}
        {viewMode === 'testing' && (
          <div className="space-y-6">
            {/* Algorithm Explanations */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Brain className="text-blue-600" size={18} />
                <span>Crowd Wisdom Algorithms</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {['surprisingly-popular', 'prediction-market', 'bayesian-truth-serum', 'wisdom-of-crowds'].map((algorithm) => {
                  const info = getAlgorithmDescription(algorithm);
                  return (
                    <div key={algorithm} className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-medium text-slate-900 mb-2">{info.name}</h4>
                      <p className="text-sm text-slate-600 mb-2">{info.description}</p>
                      <div className="text-xs text-slate-500">
                        <div className="font-medium mb-1">Mechanism:</div>
                        <div className="mb-2">{info.mechanism}</div>
                        <div className="font-medium">Reference: {info.reference}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Tests */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Activity className="text-green-600" size={18} />
                <span>Active Fitness Tests</span>
              </h3>
              
              {fitnessTests.filter(test => test.status !== 'completed').length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Target size={32} className="mx-auto mb-3 opacity-50" />
                  <p>No active tests. Start a fitness test from the Concept Testing tab.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {fitnessTests.filter(test => test.status !== 'completed').map((test) => {
                    const concept = conceptSubmissions.find(c => c.id === test.conceptId);
                    const algorithmInfo = getAlgorithmDescription(test.algorithm);
                    
                    return (
                      <div key={test.id} className="border border-slate-200 rounded-lg p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-slate-900">{concept?.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                test.status === 'active' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {test.status}
                              </span>
                            </div>
                            <p className="text-slate-600 mb-3">{concept?.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <span className="font-medium">{algorithmInfo.name}</span>
                              <span>•</span>
                              <span>{test.participants.length} participants</span>
                              <span>•</span>
                              <span>{test.responses.length} responses</span>
                            </div>
                          </div>
                        </div>

                        {/* Test Progress */}
                        {test.status === 'active' && (
                          <div className="mb-4 p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-slate-700">Test Progress</span>
                              <span className="text-sm text-slate-600">
                                {test.responses.length} / {test.participants.length} responses
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(test.responses.length / test.participants.length) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Participants */}
                        <div className="mb-4">
                          <h5 className="font-medium text-slate-900 mb-2">Participants</h5>
                          <div className="flex flex-wrap gap-2">
                            {test.participants.map((participant) => (
                              <div key={participant.id} className="flex items-center space-x-2 bg-slate-100 rounded-full px-3 py-1">
                                {participant.avatar ? (
                                  <img src={participant.avatar} alt={participant.name} className="w-6 h-6 rounded-full" />
                                ) : (
                                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">
                                      {participant.isAI ? 'AI' : participant.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <span className="text-sm text-slate-700">{participant.name}</span>
                                {test.responses.some(r => r.solverId === participant.id) && (
                                  <CheckCircle size={14} className="text-green-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Surprisingly Popular Responses */}
                        {test.algorithm === 'surprisingly-popular' && test.responses.length > 0 && (
                          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h5 className="font-medium text-blue-900 mb-3">Surprisingly Popular Analysis</h5>
                            <div className="space-y-3">
                              {test.responses.map((response) => {
                                const solver = solvers.find(s => s.id === response.solverId);
                                const surprise = response.ownPrediction - response.othersPrediction;
                                
                                return (
                                  <div key={response.solverId} className="bg-white rounded-lg p-3 border border-blue-200">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium text-slate-900">{solver?.name}</span>
                                      <span className={`text-sm font-bold ${
                                        surprise > 0.1 ? 'text-green-600' : 
                                        surprise < -0.1 ? 'text-red-600' : 'text-slate-600'
                                      }`}>
                                        Surprise: {surprise > 0 ? '+' : ''}{(surprise * 100).toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-slate-600">Own Rating:</span>
                                        <span className="font-medium ml-2">{(response.ownPrediction * 100).toFixed(0)}%</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-600">Predicted Others:</span>
                                        <span className="font-medium ml-2">{(response.othersPrediction * 100).toFixed(0)}%</span>
                                      </div>
                                    </div>
                                    {response.reasoning && (
                                      <div className="mt-2 pt-2 border-t border-slate-200">
                                        <p className="text-xs text-slate-600">{response.reasoning}</p>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            
                            {test.responses.length >= 2 && (
                              <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-purple-900">Surprisingly Popular Score</span>
                                  <span className="text-lg font-bold text-purple-600">
                                    {(calculateSurprisinglyPopular(test.responses) * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <p className="text-xs text-purple-700 mt-1">
                                  Higher scores indicate ideas that are more popular than predicted - often the most innovative
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Test Controls */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                          <div className="text-sm text-slate-600">
                            {test.status === 'setup' ? 'Invite solvers to participate' : 
                             test.status === 'active' ? 'Test in progress' : 'Test completed'}
                          </div>
                          <div className="flex space-x-2">
                            {test.status === 'setup' && (
                              <button
                                onClick={() => inviteSolvers(test.id, ['solver-1', 'solver-2', 'solver-3'])}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
                              >
                                Invite Solvers
                              </button>
                            )}
                            {test.status === 'active' && (
                              <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm">
                                <Clock size={14} className="inline mr-1" />
                                Active
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Active Tests Management */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Activity className="text-green-600" size={18} />
                <span>Live Testing Dashboard</span>
              </h3>
              
              {/* Solver Participation Overview */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {solvers.map((solver) => {
                  const activeParticipation = fitnessTests.filter(test => 
                    test.status === 'active' && test.participants.some(p => p.id === solver.id)
                  ).length;
                  
                  return (
                    <div key={solver.id} className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center space-x-3 mb-2">
                        {solver.avatar ? (
                          <img src={solver.avatar} alt={solver.name} className="w-8 h-8 rounded-full" />
                        ) : (
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {solver.isAI ? 'AI' : solver.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-slate-900 text-sm">{solver.name}</div>
                          <div className="text-xs text-slate-600">{solver.domain}</div>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Active Tests:</span>
                          <span className="font-medium">{activeParticipation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Response Rate:</span>
                          <span className="font-medium">{Math.round(solver.responseRate * 100)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Participation:</span>
                          <span className="font-medium">{solver.participationCount}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Test Details */}
              <div className="space-y-4">
                {fitnessTests.filter(test => test.status === 'active').map((test) => {
                  const concept = conceptSubmissions.find(c => c.id === test.conceptId);
                  const algorithmInfo = getAlgorithmDescription(test.algorithm);
                  
                  return (
                    <div key={test.id} className="bg-white rounded-lg p-5 border border-slate-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-slate-900 mb-2">{concept?.title}</h4>
                          <p className="text-slate-600 mb-3">{algorithmInfo.description}</p>
                          
                          {/* Algorithm Mechanism */}
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-4">
                            <div className="font-medium text-blue-900 mb-1">How it works:</div>
                            <p className="text-sm text-blue-800">{algorithmInfo.mechanism}</p>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-green-600 mb-1">
                            {test.responses.length}/{test.participants.length}
                          </div>
                          <div className="text-xs text-slate-500">Responses</div>
                        </div>
                      </div>

                      {/* Real-time Results Preview */}
                      {test.algorithm === 'surprisingly-popular' && test.responses.length >= 2 && (
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                          <h5 className="font-medium text-purple-900 mb-2">Live Results Preview</h5>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-purple-600">
                                {(test.responses.reduce((sum, r) => sum + r.ownPrediction, 0) / test.responses.length * 100).toFixed(0)}%
                              </div>
                              <div className="text-xs text-purple-700">Avg Own Rating</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-purple-600">
                                {(test.responses.reduce((sum, r) => sum + r.othersPrediction, 0) / test.responses.length * 100).toFixed(0)}%
                              </div>
                              <div className="text-xs text-purple-700">Avg Others Prediction</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-purple-600">
                                {(calculateSurprisinglyPopular(test.responses) * 100).toFixed(1)}%
                              </div>
                              <div className="text-xs text-purple-700">Surprise Score</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Participant Status */}
                      <div className="mt-4">
                        <h5 className="font-medium text-slate-900 mb-2">Participant Status</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {test.participants.map((participant) => {
                            const hasResponded = test.responses.some(r => r.solverId === participant.id);
                            return (
                              <div key={participant.id} className={`flex items-center space-x-2 p-2 rounded-lg border ${
                                hasResponded ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'
                              }`}>
                                <div className={`w-3 h-3 rounded-full ${
                                  hasResponded ? 'bg-green-500' : 'bg-slate-400'
                                }`}></div>
                                <span className="text-sm text-slate-700">{participant.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completed Tests */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <CheckCircle className="text-green-600" size={18} />
                <span>Completed Tests</span>
              </h3>
              
              <div className="space-y-4">
                {fitnessTests.filter(test => test.status === 'completed').map((test) => {
                  const concept = conceptSubmissions.find(c => c.id === test.conceptId);
                  const algorithmInfo = getAlgorithmDescription(test.algorithm);
                  
                  return (
                    <div key={test.id} className="border border-slate-200 rounded-lg p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-slate-900">{concept?.title}</h4>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Completed
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <span className="font-medium">{algorithmInfo.name}</span>
                            <span>•</span>
                            <span>{test.participants.length} participants</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {test.results ? Math.round(test.results.fitness * 100) : 0}%
                          </div>
                          <div className="text-xs text-slate-500">Fitness Score</div>
                        </div>
                      </div>

                      {/* Results */}
                      {test.results && (
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-lg font-bold text-blue-800">{Math.round(test.results.confidence * 100)}%</div>
                            <div className="text-xs text-blue-600">Confidence</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-lg font-bold text-green-800">{Math.round(test.results.consensus * 100)}%</div>
                            <div className="text-xs text-green-600">Consensus</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-lg font-bold text-purple-800">
                              {test.results.surprisinglyPopularScore ? Math.round(test.results.surprisinglyPopularScore * 100) + '%' :
                               test.results.marketPrice ? '$' + test.results.marketPrice.toFixed(2) :
                               test.results.truthScore ? Math.round(test.results.truthScore * 100) + '%' : 'N/A'}
                            </div>
                            <div className="text-xs text-purple-600">
                              {test.algorithm === 'surprisingly-popular' ? 'Surprise Score' :
                               test.algorithm === 'prediction-market' ? 'Market Price' :
                               test.algorithm === 'bayesian-truth-serum' ? 'Truth Score' : 'Special Metric'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Knowledge Metrics View */}
        {viewMode === 'metrics' && (
          <div className="space-y-6">
            {/* Metrics Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <Database size={20} className="text-purple-600" />
                  <span className="text-sm font-medium text-green-600">+15%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">2,847</div>
                <div className="text-sm text-slate-600">Total Contributions</div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <Users size={20} className="text-blue-600" />
                  <span className="text-sm font-medium text-green-600">+8%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">234</div>
                <div className="text-sm text-slate-600">Active Contributors</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp size={20} className="text-green-600" />
                  <span className="text-sm font-medium text-green-600">+12%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">82%</div>
                <div className="text-sm text-slate-600">Quality Score</div>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <Brain size={20} className="text-amber-600" />
                  <span className="text-sm font-medium text-blue-600">75%</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">12.5M</div>
                <div className="text-sm text-slate-600">Training Tokens</div>
              </div>
            </div>

            {/* Knowledge Type Filter */}
            <div className="flex items-center space-x-4">
              <Filter size={16} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Knowledge Type:</span>
              <div className="flex flex-wrap gap-2">
                {['all', 'insight', 'assertion', 'conjecture', 'hypothesis', 'framing', 'tacit'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedMetric(type as any)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedMetric === type
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)} ({
                      type === 'all' ? knowledgeMetrics.length : 
                      knowledgeMetrics.filter(m => m.type === type).length
                    })
                  </button>
                ))}
              </div>
            </div>

            {/* Knowledge Contributions */}
            <div className="space-y-4">
              {filteredMetrics.map((metric, index) => {
                const Icon = getMetricIcon(metric.type);
                return (
                  <div key={index} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-lg ${getMetricColor(metric.type).replace('text-', 'text-white ').replace('bg-', 'bg-').split(' ')[0]}`}>
                            <Icon size={16} className="text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900">{metric.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getMetricColor(metric.type)}`}>
                            {metric.type}
                          </span>
                        </div>
                        <p className="text-slate-700 mb-3">{metric.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span className="font-medium">{metric.contributor}</span>
                          <span>•</span>
                          <span>{metric.domain}</span>
                          <span>•</span>
                          <span>{metric.timestamp}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-purple-600 mb-1">
                          {Math.round(metric.validationScore * 100)}%
                        </div>
                        <div className="text-xs text-slate-500">Validation Score</div>
                      </div>
                    </div>

                    {/* Voting Metrics */}
                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <div className="text-sm font-bold text-yellow-800">{metric.votes.surprising}</div>
                        <div className="text-xs text-yellow-600">Surprising</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="text-sm font-bold text-blue-800">{metric.votes.useful}</div>
                        <div className="text-xs text-blue-600">Useful</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="text-sm font-bold text-green-800">{metric.votes.novel}</div>
                        <div className="text-xs text-green-600">Novel</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded">
                        <div className="text-sm font-bold text-purple-800">{metric.votes.feasible}</div>
                        <div className="text-xs text-purple-600">Feasible</div>
                      </div>
                    </div>

                    {/* Test This Concept */}
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-sm text-slate-600">Test this concept's fitness</span>
                      <button
                        onClick={() => startFitnessTest(`concept-${index}`, 'surprisingly-popular')}
                        className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm"
                      >
                        Start Fitness Test
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Training Readiness View */}
        {viewMode === 'training' && (
          <div className="space-y-6">
            {/* Training Readiness Overview */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center space-x-2">
                <Brain size={20} className="text-purple-600" />
                <span>Foundation Model Training Readiness</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Training Data Progress</span>
                      <span className="text-sm font-bold text-purple-600">
                        {trainingMetrics.estimatedTokens.toLocaleString()} / {trainingMetrics.targetTokens.toLocaleString()} tokens
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(trainingMetrics.estimatedTokens / trainingMetrics.targetTokens) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {Math.round((trainingMetrics.estimatedTokens / trainingMetrics.targetTokens) * 100)}% complete
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Quality Score</span>
                      <span className="font-medium text-green-600">{Math.round(trainingMetrics.qualityScore * 100)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Domain Coverage</span>
                      <span className="font-medium text-blue-600">{Math.round(trainingMetrics.domainCoverage * 100)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Diversity Index</span>
                      <span className="font-medium text-purple-600">{Math.round(trainingMetrics.diversityIndex * 100)}%</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {Math.round(trainingMetrics.readinessScore * 100)}%
                  </div>
                  <div className="text-lg font-medium text-slate-900 mb-2">Training Readiness</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    trainingMetrics.readinessScore >= 0.8 ? 'bg-green-100 text-green-800' :
                    trainingMetrics.readinessScore >= 0.6 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {trainingMetrics.readinessScore >= 0.8 ? 'Ready for Training' :
                     trainingMetrics.readinessScore >= 0.6 ? 'Approaching Readiness' :
                     'More Data Needed'}
                  </div>
                </div>
              </div>
            </div>

            {/* Domain Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <PieChart size={18} className="text-blue-600" />
                <span>Domain Coverage Analysis</span>
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trainingMetrics.domains.map((domain, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900">{domain.name}</h4>
                      <span className="text-sm font-bold text-blue-600">{domain.contributions}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Quality</span>
                        <span className="font-medium">{Math.round(domain.quality * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${domain.quality * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};