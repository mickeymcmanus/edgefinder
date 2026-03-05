import React, { useState, useRef, useEffect } from 'react';
import { Map, Users, Wrench, Target, Search, Zap, Mountain, Waves, Compass, Navigation, MapPin, Eye, EyeOff, Filter, Info, User, Lightbulb, Globe } from 'lucide-react';

interface MapNode {
  id: string;
  type: 'edge' | 'solver' | 'method' | 'unexplored';
  x: number;
  y: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  terrain: 'mountain' | 'ocean' | 'forest' | 'desert' | 'arctic';
  connections: string[];
  expertise?: string[];
  tools?: string[];
  funding?: string;
  explorationLevel: number; // 0-100, how well explored this area is
  sherpaNeeded: boolean;
  recommendedGear: string[];
  solverContributions?: SolverContribution[];
  ideaEvolution?: IdeaEvolution[];
}

interface SolverContribution {
  solverId: string;
  solverName: string;
  contributionType: 'luma-method' | 'modification' | 'evolution' | 'insight';
  method?: string;
  originalIdea?: string;
  modifiedIdea: string;
  timestamp: Date;
  impact: 'low' | 'medium' | 'high';
  votes: number;
}

interface IdeaEvolution {
  id: string;
  originalIdea: string;
  evolvedIdea: string;
  evolutionPath: string[];
  contributors: string[];
  fitnessScore: number;
}

interface Connection {
  from: string;
  to: string;
  type: 'collaboration' | 'methodology' | 'knowledge' | 'resource';
  strength: number; // 0-1
}

export const IdeaSpaceMap: React.FC = () => {
  const [viewMode, setViewMode] = useState<'terrain' | 'exploration' | 'difficulty' | 'connections'>('terrain');
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [showConnections, setShowConnections] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'edge' | 'solver' | 'method' | 'unexplored'>('all');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showContributions, setShowContributions] = useState(true);
  const [showEvolution, setShowEvolution] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  // Sample data representing the idea space
  const mapNodes: MapNode[] = [
    // Quantum Computing Region (Mountain terrain - high difficulty)
    {
      id: 'quantum-error-correction',
      type: 'edge',
      x: 200,
      y: 150,
      title: 'Quantum Error Correction',
      description: 'Scalable fault-tolerant quantum systems',
      difficulty: 'expert',
      terrain: 'mountain',
      connections: ['dr-sarah-chen', 'quantum-sim-ai', 'luma-systems-mapping'],
      explorationLevel: 35,
      sherpaNeeded: true,
      recommendedGear: ['Quantum Simulation Tools', 'Error Analysis Methods', 'Theoretical Physics Background'],
      solverContributions: [
        {
          solverId: 'dr-sarah-chen',
          solverName: 'Dr. Sarah Chen',
          contributionType: 'luma-method',
          method: 'Systems Mapping',
          modifiedIdea: 'Applied systems mapping to quantum error propagation - revealed unexpected feedback loops',
          timestamp: new Date(Date.now() - 3600000),
          impact: 'high',
          votes: 12
        },
        {
          solverId: 'quantum-sim-ai',
          solverName: 'QuantumSim AI',
          contributionType: 'evolution',
          originalIdea: 'Basic error correction protocols',
          modifiedIdea: 'Adaptive error correction that learns from biological DNA repair mechanisms',
          timestamp: new Date(Date.now() - 7200000),
          impact: 'high',
          votes: 18
        }
      ],
      ideaEvolution: [
        {
          id: 'qec-evolution-1',
          originalIdea: 'Static quantum error correction',
          evolvedIdea: 'Bio-inspired adaptive quantum error correction',
          evolutionPath: ['Static protocols', 'Pattern recognition', 'Biological inspiration', 'Adaptive systems'],
          contributors: ['Dr. Sarah Chen', 'Dr. Maria Santos', 'QuantumSim AI'],
          fitnessScore: 8.7
        }
      ]
    },
    {
      id: 'quantum-biology',
      type: 'edge',
      x: 280,
      y: 200,
      title: 'Quantum Biology Interface',
      description: 'Quantum effects in biological systems',
      difficulty: 'expert',
      terrain: 'mountain',
      connections: ['dr-maria-santos', 'quantum-drug-discovery'],
      explorationLevel: 15,
      sherpaNeeded: true,
      recommendedGear: ['Quantum Sensors', 'Biological Modeling', 'Cross-Domain Thinking'],
      solverContributions: [
        {
          solverId: 'dr-maria-santos',
          solverName: 'Dr. Maria Santos',
          contributionType: 'modification',
          originalIdea: 'Quantum sensors for biological systems',
          modifiedIdea: 'Quantum-enhanced biological sensors that mimic cellular navigation mechanisms',
          timestamp: new Date(Date.now() - 1800000),
          impact: 'medium',
          votes: 8
        }
      ]
    },

    // Biotechnology Region (Forest terrain - medium difficulty)
    {
      id: 'synthetic-biology',
      type: 'edge',
      x: 500,
      y: 300,
      title: 'Synthetic Biology Manufacturing',
      description: 'Engineered organisms for production',
      difficulty: 'advanced',
      terrain: 'forest',
      connections: ['bio-manufacturing-team', 'crispr-tools'],
      explorationLevel: 60,
      sherpaNeeded: false,
      recommendedGear: ['CRISPR Tools', 'Bioreactor Design', 'Safety Protocols']
    },
    {
      id: 'personalized-immunotherapy',
      type: 'edge',
      x: 450,
      y: 250,
      title: 'AI-Driven Immunotherapy',
      description: 'Personalized cancer treatment design',
      difficulty: 'advanced',
      terrain: 'forest',
      connections: ['ai-bio-team', 'single-cell-analysis'],
      explorationLevel: 45,
      sherpaNeeded: false,
      recommendedGear: ['Single-Cell Sequencing', 'AI Models', 'Clinical Validation']
    },

    // Climate Tech Region (Ocean terrain - variable difficulty)
    {
      id: 'distributed-fusion',
      type: 'edge',
      x: 700,
      y: 400,
      title: 'Distributed Fusion Networks',
      description: 'Small-scale fusion in grid architecture',
      difficulty: 'expert',
      terrain: 'ocean',
      connections: ['fusion-team', 'grid-integration'],
      explorationLevel: 25,
      sherpaNeeded: true,
      recommendedGear: ['Plasma Physics', 'Grid Integration', 'Materials Science']
    },
    {
      id: 'carbon-capture-bio',
      type: 'edge',
      x: 650,
      y: 350,
      title: 'Biological Carbon Capture',
      description: 'Engineered organisms for CO2 removal',
      difficulty: 'intermediate',
      terrain: 'ocean',
      connections: ['climate-bio-team', 'synthetic-biology'],
      explorationLevel: 70,
      sherpaNeeded: false,
      recommendedGear: ['Metabolic Engineering', 'Scale-up Methods', 'Environmental Testing']
    },

    // Neurotechnology Region (Arctic terrain - high precision needed)
    {
      id: 'metamaterial-bci',
      type: 'edge',
      x: 150,
      y: 400,
      title: 'Metamaterial Neural Interfaces',
      description: 'Non-invasive brain-computer interfaces',
      difficulty: 'expert',
      terrain: 'arctic',
      connections: ['neuro-team', 'metamaterial-experts'],
      explorationLevel: 20,
      sherpaNeeded: true,
      recommendedGear: ['Metamaterial Fabrication', 'Neural Signal Processing', 'Biocompatibility Testing']
    },

    // Unexplored Regions
    {
      id: 'quantum-consciousness',
      type: 'unexplored',
      x: 300,
      y: 100,
      title: 'Quantum Consciousness Interface',
      description: 'Unexplored intersection of quantum computing and consciousness',
      difficulty: 'expert',
      terrain: 'arctic',
      connections: [],
      explorationLevel: 5,
      sherpaNeeded: true,
      recommendedGear: ['Quantum Sensors', 'Consciousness Models', 'Interdisciplinary Team']
    },
    {
      id: 'bio-quantum-materials',
      type: 'unexplored',
      x: 400,
      y: 150,
      title: 'Bio-Quantum Materials',
      description: 'Living materials with quantum properties',
      difficulty: 'expert',
      terrain: 'mountain',
      connections: [],
      explorationLevel: 10,
      sherpaNeeded: true,
      recommendedGear: ['Quantum Materials', 'Synthetic Biology', 'Materials Characterization']
    },
    {
      id: 'climate-quantum-sensing',
      type: 'unexplored',
      x: 600,
      y: 200,
      title: 'Quantum Climate Sensing',
      description: 'Ultra-precise climate monitoring with quantum sensors',
      difficulty: 'advanced',
      terrain: 'ocean',
      connections: [],
      explorationLevel: 15,
      sherpaNeeded: true,
      recommendedGear: ['Quantum Sensors', 'Climate Modeling', 'Satellite Integration']
    },

    // Solvers (Sherpas)
    {
      id: 'dr-sarah-chen',
      type: 'solver',
      x: 220,
      y: 180,
      title: 'Dr. Sarah Chen',
      description: 'Quantum Systems Expert - Mountain Guide',
      difficulty: 'expert',
      terrain: 'mountain',
      connections: ['quantum-error-correction', 'quantum-biology'],
      expertise: ['Quantum Computing', 'Error Correction', 'Cross-Domain Applications'],
      explorationLevel: 90,
      sherpaNeeded: false,
      recommendedGear: ['Quantum Simulation', 'Theoretical Analysis', 'Collaboration Skills']
    },
    {
      id: 'dr-maria-santos',
      type: 'solver',
      x: 320,
      y: 220,
      title: 'Dr. Maria Santos',
      description: 'Biological Systems Expert - Forest Guide',
      difficulty: 'advanced',
      terrain: 'forest',
      connections: ['quantum-biology', 'synthetic-biology'],
      expertise: ['DNA Repair', 'Cellular Systems', 'Bio-Quantum Interfaces'],
      explorationLevel: 85,
      sherpaNeeded: false,
      recommendedGear: ['Biological Modeling', 'Cross-Domain Thinking', 'Lab Techniques']
    },
    {
      id: 'fusion-team',
      type: 'solver',
      x: 720,
      y: 420,
      title: 'Commonwealth Fusion Team',
      description: 'Fusion Energy Specialists - Ocean Navigators',
      difficulty: 'expert',
      terrain: 'ocean',
      connections: ['distributed-fusion'],
      expertise: ['Plasma Physics', 'Tokamak Design', 'Grid Integration'],
      explorationLevel: 80,
      sherpaNeeded: false,
      recommendedGear: ['Plasma Diagnostics', 'Superconducting Magnets', 'Power Systems']
    },

    // Methods (Tools/Gear)
    {
      id: 'luma-systems-mapping',
      type: 'method',
      x: 180,
      y: 120,
      title: 'LUMA Systems Mapping',
      description: 'Tool for understanding complex relationships',
      difficulty: 'intermediate',
      terrain: 'mountain',
      connections: ['quantum-error-correction', 'metamaterial-bci'],
      tools: ['Stakeholder Analysis', 'Relationship Mapping', 'Systems Thinking'],
      explorationLevel: 75,
      sherpaNeeded: false,
      recommendedGear: ['Facilitation Skills', 'Visual Thinking', 'Domain Knowledge']
    },
    {
      id: 'crispr-tools',
      type: 'method',
      x: 520,
      y: 320,
      title: 'CRISPR Gene Editing',
      description: 'Precision biological modification toolkit',
      difficulty: 'advanced',
      terrain: 'forest',
      connections: ['synthetic-biology', 'personalized-immunotherapy'],
      tools: ['Gene Editing', 'Protein Design', 'Cellular Engineering'],
      explorationLevel: 85,
      sherpaNeeded: false,
      recommendedGear: ['Lab Equipment', 'Bioinformatics', 'Safety Protocols']
    },
    {
      id: 'quantum-sim-ai',
      type: 'method',
      x: 240,
      y: 120,
      title: 'Quantum Simulation AI',
      description: 'AI-powered quantum system modeling',
      difficulty: 'expert',
      terrain: 'mountain',
      connections: ['quantum-error-correction', 'quantum-biology'],
      tools: ['Machine Learning', 'Quantum Algorithms', 'Simulation Software'],
      explorationLevel: 70,
      sherpaNeeded: false,
      recommendedGear: ['Quantum Hardware Access', 'AI Expertise', 'Physics Background']
    }
  ];

  const connections: Connection[] = [
    { from: 'quantum-error-correction', to: 'dr-sarah-chen', type: 'collaboration', strength: 0.9 },
    { from: 'quantum-error-correction', to: 'luma-systems-mapping', type: 'methodology', strength: 0.7 },
    { from: 'quantum-biology', to: 'dr-maria-santos', type: 'collaboration', strength: 0.8 },
    { from: 'synthetic-biology', to: 'crispr-tools', type: 'methodology', strength: 0.9 },
    { from: 'dr-sarah-chen', to: 'dr-maria-santos', type: 'knowledge', strength: 0.6 },
    { from: 'quantum-sim-ai', to: 'quantum-error-correction', type: 'resource', strength: 0.8 },
  ];

  const getNodeColor = (node: MapNode) => {
    if (viewMode === 'terrain') {
      const terrainColors = {
        mountain: node.type === 'unexplored' ? '#94a3b8' : '#7c3aed',
        ocean: node.type === 'unexplored' ? '#94a3b8' : '#0ea5e9',
        forest: node.type === 'unexplored' ? '#94a3b8' : '#059669',
        desert: node.type === 'unexplored' ? '#94a3b8' : '#d97706',
        arctic: node.type === 'unexplored' ? '#94a3b8' : '#06b6d4'
      };
      return terrainColors[node.terrain];
    } else if (viewMode === 'exploration') {
      if (node.explorationLevel < 25) return '#ef4444'; // Red - unexplored
      if (node.explorationLevel < 50) return '#f59e0b'; // Amber - partially explored
      if (node.explorationLevel < 75) return '#eab308'; // Yellow - well explored
      return '#22c55e'; // Green - fully explored
    } else if (viewMode === 'difficulty') {
      const difficultyColors = {
        beginner: '#22c55e',
        intermediate: '#eab308',
        advanced: '#f59e0b',
        expert: '#ef4444'
      };
      return difficultyColors[node.difficulty];
    } else {
      const typeColors = {
        edge: '#8b5cf6',
        solver: '#06b6d4',
        method: '#10b981',
        unexplored: '#6b7280'
      };
      return typeColors[node.type];
    }
  };

  const getNodeIcon = (node: MapNode) => {
    switch (node.type) {
      case 'edge': return Target;
      case 'solver': return Users;
      case 'method': return Wrench;
      case 'unexplored': return Search;
      default: return MapPin;
    }
  };

  const getTerrainIcon = (terrain: string) => {
    switch (terrain) {
      case 'mountain': return Mountain;
      case 'ocean': return Waves;
      case 'forest': return '🌲';
      case 'desert': return '🏜️';
      case 'arctic': return '🧊';
      default: return Globe;
    }
  };

  const filteredNodes = mapNodes.filter(node => 
    filterType === 'all' || node.type === filterType
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = Math.max(0.5, Math.min(3, zoom + (e.deltaY > 0 ? -0.1 : 0.1)));
    setZoom(newZoom);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2 mb-2">
            <Map className="text-blue-600" size={24} />
            <span>Idea Space Navigation Map</span>
          </h2>
          <p className="text-slate-600">
            Interactive map of research frontiers, expert guides, and exploration tools. Navigate like Google Earth through the landscape of innovation.
          </p>
        </div>

        {/* Map Controls */}
        <div className="mb-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Eye size={16} className="text-slate-500" />
                <span className="text-sm font-medium text-slate-700">View Mode:</span>
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as any)}
                  className="px-3 py-1 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="terrain">Terrain</option>
                  <option value="exploration">Exploration Level</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="connections">Node Types</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Filter:</span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-1 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="edge">Research Edges</option>
                  <option value="solver">Expert Guides</option>
                  <option value="method">Tools & Methods</option>
                  <option value="unexplored">Unexplored Areas</option>
                </select>
              </div>

              <button
                onClick={() => setShowConnections(!showConnections)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                  showConnections 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {showConnections ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>Connections</span>
              </button>
              
              <button
                onClick={() => setShowContributions(!showContributions)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                  showContributions 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {showContributions ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>Solver Ideas</span>
              </button>
              
              <button
                onClick={() => setShowEvolution(!showEvolution)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                  showEvolution 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {showEvolution ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>Idea Evolution</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Zoom: {Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(1)}
                className="px-3 py-1 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors duration-200 text-sm"
              >
                Reset View
              </button>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <Target size={12} className="text-purple-600" />
              <span>Research Edges</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={12} className="text-cyan-600" />
              <span>Expert Guides (Sherpas)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wrench size={12} className="text-green-600" />
              <span>Tools & Methods</span>
            </div>
            <div className="flex items-center space-x-2">
              <Search size={12} className="text-slate-500" />
              <span>Unexplored Areas</span>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-slate-200 overflow-hidden cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div
              className="relative w-full h-full"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center'
              }}
            >
              {/* Connections */}
              {showConnections && connections.map((connection, index) => {
                const fromNode = mapNodes.find(n => n.id === connection.from);
                const toNode = mapNodes.find(n => n.id === connection.to);
                if (!fromNode || !toNode) return null;

                const connectionColors = {
                  collaboration: '#8b5cf6',
                  methodology: '#10b981',
                  knowledge: '#f59e0b',
                  resource: '#06b6d4'
                };

                return (
                  <svg
                    key={index}
                    className="absolute inset-0 pointer-events-none"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={connectionColors[connection.type]}
                      strokeWidth={connection.strength * 3}
                      strokeOpacity={0.6}
                      strokeDasharray={connection.type === 'knowledge' ? '5,5' : 'none'}
                    />
                  </svg>
                );
              })}

              {/* Nodes */}
              {filteredNodes.map((node) => {
                const Icon = getNodeIcon(node);
                const isSelected = selectedNode?.id === node.id;
                const isHovered = hoveredNode === node.id;

                return (
                  <div
                    key={node.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                      isSelected || isHovered ? 'scale-125 z-10' : 'z-0'
                    }`}
                    style={{
                      left: node.x,
                      top: node.y,
                    }}
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-lg ${
                        isSelected ? 'ring-2 ring-blue-500' : ''
                      }`}
                      style={{ backgroundColor: getNodeColor(node) }}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                    
                    {/* Node label */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-white rounded shadow-sm border text-xs font-medium whitespace-nowrap">
                      {node.title}
                    </div>

                    {/* Sherpa indicator */}
                    {node.sherpaNeeded && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                        <Mountain size={8} className="text-white" />
                      </div>
                    )}

                    {/* Exploration level indicator */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border border-white" 
                         style={{ 
                           backgroundColor: node.explorationLevel < 25 ? '#ef4444' : 
                                          node.explorationLevel < 50 ? '#f59e0b' : 
                                          node.explorationLevel < 75 ? '#eab308' : '#22c55e' 
                         }}>
                    </div>
                    
                    {/* Solver contributions indicator */}
                    {showContributions && node.solverContributions && node.solverContributions.length > 0 && (
                      <div className="absolute -top-2 -left-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-white text-xs font-bold">{node.solverContributions.length}</span>
                      </div>
                    )}
                    
                    {/* Idea evolution indicator */}
                    {showEvolution && node.ideaEvolution && node.ideaEvolution.length > 0 && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Zap size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Node Details */}
        {selectedNode && (
          <div className="mt-6 bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getNodeColor(selectedNode) }}
                  >
                    {React.createElement(getNodeIcon(selectedNode), { size: 14, className: 'text-white' })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedNode.title}</h3>
                  {selectedNode.sherpaNeeded && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium flex items-center space-x-1">
                      <Mountain size={10} />
                      <span>Sherpa Recommended</span>
                    </span>
                  )}
                </div>
                <p className="text-slate-600 mb-4">{selectedNode.description}</p>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Terrain & Difficulty */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2 flex items-center space-x-2">
                    <Compass size={16} className="text-blue-600" />
                    <span>Navigation Info</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Terrain:</span>
                      <span className="font-medium capitalize flex items-center space-x-1">
                        <span>{typeof getTerrainIcon(selectedNode.terrain) === 'string' ? getTerrainIcon(selectedNode.terrain) : React.createElement(getTerrainIcon(selectedNode.terrain) as any, { size: 14 })}</span>
                        <span>{selectedNode.terrain}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Difficulty:</span>
                      <span className={`font-medium capitalize px-2 py-1 rounded-full text-xs ${
                        selectedNode.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        selectedNode.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        selectedNode.difficulty === 'advanced' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedNode.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Explored:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${selectedNode.explorationLevel}%`,
                              backgroundColor: selectedNode.explorationLevel < 25 ? '#ef4444' : 
                                             selectedNode.explorationLevel < 50 ? '#f59e0b' : 
                                             selectedNode.explorationLevel < 75 ? '#eab308' : '#22c55e'
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{selectedNode.explorationLevel}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Gear */}
              <div>
                <h4 className="font-medium text-slate-900 mb-2 flex items-center space-x-2">
                  <Wrench size={16} className="text-green-600" />
                  <span>Recommended Gear</span>
                </h4>
                <div className="space-y-2">
                  {selectedNode.recommendedGear.map((gear, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">{gear}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expertise/Tools */}
              <div>
                <h4 className="font-medium text-slate-900 mb-2 flex items-center space-x-2">
                  <Lightbulb size={16} className="text-purple-600" />
                  <span>{selectedNode.type === 'solver' ? 'Expertise' : selectedNode.type === 'method' ? 'Tools' : 'Connections'}</span>
                </h4>
                <div className="space-y-2">
                  {(selectedNode.expertise || selectedNode.tools || ['Click connections to explore']).map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Solver Contributions */}
            {selectedNode.solverContributions && selectedNode.solverContributions.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center space-x-2">
                  <Users size={16} className="text-purple-600" />
                  <span>Solver Contributions ({selectedNode.solverContributions.length})</span>
                </h4>
                <div className="space-y-3">
                  {selectedNode.solverContributions.map((contribution, index) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <User size={12} className="text-white" />
                          </div>
                          <span className="font-medium text-slate-900">{contribution.solverName}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            contribution.contributionType === 'luma-method' ? 'bg-blue-100 text-blue-700' :
                            contribution.contributionType === 'evolution' ? 'bg-amber-100 text-amber-700' :
                            contribution.contributionType === 'modification' ? 'bg-green-100 text-green-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {contribution.contributionType}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-500">👍 {contribution.votes}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            contribution.impact === 'high' ? 'bg-red-100 text-red-700' :
                            contribution.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {contribution.impact} impact
                          </span>
                        </div>
                      </div>
                      {contribution.method && (
                        <div className="text-xs text-purple-700 mb-1">
                          <strong>Method:</strong> {contribution.method}
                        </div>
                      )}
                      {contribution.originalIdea && (
                        <div className="text-xs text-slate-600 mb-1">
                          <strong>Original:</strong> {contribution.originalIdea}
                        </div>
                      )}
                      <div className="text-sm text-slate-700 mb-2">{contribution.modifiedIdea}</div>
                      <div className="text-xs text-slate-500">
                        {contribution.timestamp.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Idea Evolution */}
            {selectedNode.ideaEvolution && selectedNode.ideaEvolution.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center space-x-2">
                  <Zap size={16} className="text-amber-600" />
                  <span>Idea Evolution</span>
                </h4>
                <div className="space-y-3">
                  {selectedNode.ideaEvolution.map((evolution, index) => (
                    <div key={index} className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">Evolution Path</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                          Fitness: {evolution.fitnessScore}/10
                        </span>
                      </div>
                      <div className="text-sm text-slate-700 mb-2">
                        <strong>From:</strong> {evolution.originalIdea}
                      </div>
                      <div className="text-sm text-slate-700 mb-2">
                        <strong>To:</strong> {evolution.evolvedIdea}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {evolution.evolutionPath.map((step, stepIndex) => (
                          <React.Fragment key={stepIndex}>
                            <span className="px-2 py-1 bg-white rounded text-xs border border-amber-300">
                              {step}
                            </span>
                            {stepIndex < evolution.evolutionPath.length - 1 && (
                              <ArrowRight size={12} className="text-amber-600 mt-1" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="text-xs text-slate-600">
                        <strong>Contributors:</strong> {evolution.contributors.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {selectedNode.type === 'unexplored' ? 'Ready to pioneer this frontier?' :
                 selectedNode.type === 'solver' ? 'Connect with this expert guide?' :
                 selectedNode.type === 'method' ? 'Use this tool for exploration?' :
                 'Explore this research edge?'}
              </div>
              <div className="flex space-x-3">
                {selectedNode.type === 'solver' && (
                  <button className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors duration-200 flex items-center space-x-2">
                    <User size={16} />
                    <span>Connect with Guide</span>
                  </button>
                )}
                {selectedNode.type === 'method' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
                    <Wrench size={16} />
                    <span>Use This Tool</span>
                  </button>
                )}
                <button 
                  onClick={() => {
                    // Add a new solver contribution
                    const newContribution = {
                      solverId: 'current-user',
                      solverName: 'You',
                      contributionType: 'insight' as const,
                      modifiedIdea: 'Your insight or modification to this idea...',
                      timestamp: new Date(),
                      impact: 'medium' as const,
                      votes: 0
                    };
                    // This would normally update the node data
                    console.log('Adding contribution:', newContribution);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add Idea</span>
                </button>
                <button 
                  onClick={() => {
                    // Switch to Problem Finding with this node context
                    window.dispatchEvent(new CustomEvent('seedProblemFinding', { 
                      detail: {
                        title: selectedNode.title,
                        domain: selectedNode.terrain,
                        gapAnalysis: selectedNode.description,
                        difficulty: selectedNode.difficulty,
                        explorationLevel: selectedNode.explorationLevel,
                        recommendedGear: selectedNode.recommendedGear
                      }
                    }));
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Target size={16} />
                  <span>Explore Problems</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Map Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{mapNodes.filter(n => n.type === 'edge').length}</div>
            <div className="text-sm text-slate-600">Research Edges</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-600">{mapNodes.filter(n => n.type === 'solver').length}</div>
            <div className="text-sm text-slate-600">Expert Guides</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{mapNodes.filter(n => n.type === 'method').length}</div>
            <div className="text-sm text-slate-600">Tools & Methods</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {mapNodes.reduce((total, node) => total + (node.solverContributions?.length || 0), 0)}
            </div>
            <div className="text-sm text-slate-600">Solver Ideas</div>
          </div>
        </div>
      </div>
    </div>
  );
};