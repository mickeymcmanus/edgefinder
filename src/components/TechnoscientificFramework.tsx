import React, { useState } from 'react';
import { Brain, Zap, Users, Target, ArrowRight, Clock, Lightbulb, Wrench, Database, Search, Eye, Dna, Waves, Info, HelpCircle, X } from 'lucide-react';

export const TechnoscientificFramework: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'technology' | 'culture' | 'science' | 'all'>('all');
  const [hoveredConcept, setHoveredConcept] = useState<string | null>(null);
  const [showMikeLevinPopup, setShowMikeLevinPopup] = useState(false);

  const phases = [
    {
      id: 'technology',
      title: 'Technology',
      subtitle: 'Captured Phenomena & Tools',
      description: 'From primordial ooze to fish using photons for predator detection - life has always captured and used phenomena from the universe for survival and flourishing',
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      elements: ['Functions', 'Forms', 'Captured Phenomena'],
      timeline: '~3.8B years ago - Present',
      examples: ['Photosynthesis', 'Echolocation', 'Stone tools', 'Fire control', 'Agriculture', 'Metallurgy'],
      biologicalExamples: [
        'Fish using photons to detect predators overhead',
        'Cells using electrical gradients for morphological goals',
        'Bacterial chemotaxis and environmental sensing',
        'Collective cellular decision-making in development'
      ]
    },
    {
      id: 'culture',
      title: 'Culture',
      subtitle: 'Collective Memory & Methods',
      description: 'Co-evolved with technology - collective memory, shared methods, design thinking, iterative experimentation, and cultural transmission of knowledge across generations through mutualistic survival strategies',
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      elements: ['Memory', 'Methods', 'Design', 'Iterative Experimentation', 'Transmission'],
      timeline: '~100,000 years ago - Present',
      examples: ['Language', 'Design thinking', 'Rituals', 'Apprenticeship', 'Iterative refinement', 'Written records', 'Universities', 'Scientific societies'],
      biologicalExamples: [
        'Single-cell organisms working mutualistically',
        'Collective cellular intelligence in morphogenesis',
        'Iterative adaptation in biological systems',
        'Design patterns in natural selection',
        'Cultural transmission in animal societies',
        'Emergent collective behaviors in biological systems'
      ]
    },
    {
      id: 'science',
      title: 'Science',
      subtitle: 'Systematic Understanding',
      description: 'Recent systematic investigation that reveals facts, develops explanations, and creates generalizable knowledge - building on millennia of technological practice and cultural wisdom',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      elements: ['Facts', 'Explanations', 'Generalizations'],
      timeline: '~400 years ago - Present',
      examples: ['Scientific method', 'Peer review', 'Controlled experiments', 'Mathematical models', 'Theories'],
      biologicalExamples: [
        'Understanding DNA repair mechanisms',
        'Mapping cellular communication networks',
        'Modeling morphogenetic fields',
        'Explaining emergent collective behaviors'
      ]
    }
  ];

  const findingMethods = [
    {
      id: 'function',
      name: 'Function-finding',
      description: 'Technology ↔ Culture',
      detail: 'Co-evolutionary discovery of new capabilities through technological and cultural interaction',
      icon: Target,
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      exaptationExample: 'Feathers evolved for temperature regulation, later exapted for flight'
    },
    {
      id: 'fact',
      name: 'Fact-finding', 
      description: 'Culture → Science',
      detail: 'Cultural practices and collective wisdom guide systematic scientific inquiry',
      icon: Database,
      color: 'bg-purple-100 text-purple-800 border-purple-300',
      exaptationExample: 'Traditional medicine practices exapted into systematic pharmacology'
    },
    {
      id: 'form',
      name: 'Form-finding',
      description: 'Technology ↔ Science',
      detail: 'Bidirectional flow between technological innovation and scientific understanding',
      icon: Lightbulb,
      color: 'bg-green-100 text-green-800 border-green-300',
      exaptationExample: 'Steam engines (technology) exapted into thermodynamics (science)'
    },
    {
      id: 'explanation',
      name: 'Explanation-finding',
      description: 'Science → Culture → Technology',
      detail: 'Scientific explanations become cultural knowledge that enables new technologies',
      icon: Brain,
      color: 'bg-amber-100 text-amber-800 border-amber-300',
      exaptationExample: 'Quantum mechanics exapted from physics into quantum computing technology'
    }
  ];

  const conceptDefinitions = {
    exaptation: {
      title: 'Exaptation',
      definition: 'A feature that evolved for one purpose but is later used for a different function',
      examples: [
        'Feathers: Originally for temperature regulation → Later for flight',
        'Internet: Originally for military communication → Later for global information sharing',
        'DNA repair mechanisms → Inspiring quantum error correction protocols'
      ],
      relevance: 'Key mechanism for breakthrough innovation - existing solutions repurposed for new challenges'
    },
    generalization: {
      title: 'Generalization', 
      definition: 'The process of deriving general principles from specific instances or observations',
      examples: [
        'From specific DNA repair → General error correction principles',
        'From bird flight → General principles of aerodynamics',
        'From ant colonies → General swarm intelligence algorithms'
      ],
      relevance: 'Enables transfer of solutions across domains and scales innovation impact'
    },
    coevolution: {
      title: 'Co-evolution',
      definition: 'Mutual evolutionary influence between two or more systems over time',
      examples: [
        'Technology & Culture: Tools shape society, society shapes tools',
        'Flowers & Pollinators: Each influences the other\'s evolution',
        'Humans & Domesticated species: Mutual adaptation over millennia'
      ],
      relevance: 'Technology and Culture co-evolved - neither came first, they developed together'
    }
  };

  const getPhasePosition = (phaseId: string) => {
    switch (phaseId) {
      case 'technology': return 'left-8 top-20';
      case 'culture': return 'left-1/2 top-8 transform -translate-x-1/2';
      case 'science': return 'right-8 top-20';
      default: return '';
    }
  };

  const getPhaseSize = (phaseId: string) => {
    switch (phaseId) {
      case 'technology': return 'w-80 h-80';
      case 'culture': return 'w-96 h-96'; // Larger to show central bridging role
      case 'science': return 'w-80 h-80';
      default: return 'w-80 h-80';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 border border-slate-200">
        <div className="mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
            <Brain className="text-purple-600" size={32} />
            <span>The Genesis of Technoscientific Revolutions</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-5xl">
            Understanding how breakthrough innovations emerge from the co-evolutionary dance between 
            <strong className="text-blue-600"> Technology</strong> and 
            <strong className="text-purple-600"> Culture</strong>, with 
            <strong className="text-green-600"> Science</strong> as the recent systematic understanding that builds on both.
          </p>
        </div>

        {/* Phase Selector */}
        <div className="mb-6 lg:mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-sm font-medium text-slate-700">Focus on:</span>
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'Co-Evolution View', icon: Dna },
                ...phases.map(phase => ({ id: phase.id, label: phase.title, icon: Brain }))
              ].map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setActivePhase(option.id as any)}
                    className={`flex items-center space-x-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-lg border transition-colors duration-200 text-xs sm:text-sm ${
                      activePhase === option.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Concept Definitions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <span className="text-sm font-medium text-slate-700 whitespace-nowrap">Key Concepts:</span>
            {Object.entries(conceptDefinitions).map(([key, concept]) => (
              <button
                key={key}
                onMouseEnter={() => setHoveredConcept(key)}
                onMouseLeave={() => setHoveredConcept(null)}
                className="relative flex items-center space-x-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors duration-200"
              >
                <HelpCircle size={12} />
                <span>{concept.title}</span>
                
                {/* Tooltip */}
                {hoveredConcept === key && (
                  <div className="absolute bottom-full right-0 mb-2 w-80 bg-slate-900 text-white text-xs rounded-lg p-4 z-20 shadow-xl">
                    <div className="font-semibold mb-2">{concept.title}</div>
                    <div className="mb-3 text-slate-300">{concept.definition}</div>
                    <div className="mb-2 font-medium text-slate-200">Examples:</div>
                    <ul className="space-y-1 text-slate-300 mb-3">
                      {concept.examples.map((example, idx) => (
                        <li key={idx} className="text-xs">• {example}</li>
                      ))}
                    </ul>
                    <div className="text-slate-400 text-xs border-t border-slate-700 pt-2">
                      {concept.relevance}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Co-Evolution Visualization */}
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 rounded-2xl p-4 sm:p-8 lg:p-12 mb-6 lg:mb-8 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Science - Left */}
            <div className={`transition-all duration-500 ${
              activePhase === 'all' || activePhase === 'science' 
                ? 'opacity-100 scale-100' 
                : 'opacity-40 scale-90'
            }`}>
              <div className="bg-green-50 border-green-200 border-2 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-2 sm:mb-3">
                  <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                    <span className="text-white font-bold text-sm sm:text-base lg:text-lg">S</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Science</h3>
                  <p className="text-xs sm:text-sm font-semibold text-green-700 mb-1 sm:mb-2">Systematic Understanding</p>
                  <p className="text-xs text-slate-600 leading-relaxed">Recent systematic investigation that reveals facts, develops explanations, and creates generalizable knowledge</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                      <Target size={12} />
                      <span>Core Elements</span>
                    </h4>
                    <div className="space-y-0.5">
                      {['Facts', 'Explanations', 'Generalizations'].slice(0, 3).map((element, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-slate-700 font-medium">{element}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                      <Dna size={12} />
                      <span>Examples</span>
                    </h4>
                    <div className="space-y-0.5 text-xs">
                      {['Scientific method', 'Peer review', 'Mathematical models'].slice(0, 3).map((example, idx) => (
                        <div key={idx} className="text-slate-600 bg-white rounded p-1.5 border border-slate-200">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                      <Clock size={12} />
                      <span>Timeline</span>
                    </h4>
                    <div className="text-slate-600 bg-white rounded p-1.5 border border-slate-200">
                      ~400 years ago - Present
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Culture - Center (Larger) */}
            <div className={`transition-all duration-500 ${
              activePhase === 'all' || activePhase === 'culture' 
                ? 'opacity-100 scale-100' 
                : 'opacity-40 scale-90'
            }`}>
              <div className="bg-purple-50 border-purple-200 border-2 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-2 sm:mb-3">
                  <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                    <span className="text-white font-bold text-base sm:text-lg lg:text-xl">C</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Culture</h3>
                  <p className="text-xs sm:text-sm font-semibold text-purple-700 mb-1 sm:mb-2">Collective Memory & Methods</p>
                  <p className="text-xs text-slate-600 leading-relaxed">Co-evolved with technology - collective memory, shared methods, and cultural transmission across generations</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                      <Target size={12} />
                      <span>Core Elements</span>
                    </h4>
                    <div className="space-y-0.5">
                      {['Memory', 'Methods', 'Design', 'Iterative Experimentation'].slice(0, 4).map((element, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          <span className="text-slate-700 font-medium">{element}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                      <Dna size={12} />
                      <span>Examples</span>
                    </h4>
                    <div className="space-y-0.5 text-xs">
                      {['Language', 'Design thinking', 'Apprenticeship', 'Iterative refinement'].slice(0, 4).map((example, idx) => (
                        <div key={idx} className="text-slate-600 bg-white rounded p-1.5 border border-slate-200">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                      <Clock size={12} />
                      <span>Timeline</span>
                    </h4>
                    <div className="text-slate-600 bg-white rounded p-1.5 border border-slate-200">
                      ~100,000 years ago - Present
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology - Right */}
            <div className={`transition-all duration-500 ${
              activePhase === 'all' || activePhase === 'technology' 
                ? 'opacity-100 scale-100' 
                : 'opacity-40 scale-90'
            }`}>
              <div className="bg-blue-50 border-blue-200 border-2 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-2 sm:mb-3">
                  <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                    <span className="text-white font-bold text-sm sm:text-base lg:text-lg">T</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Technology</h3>
                  <p className="text-xs sm:text-sm font-semibold text-blue-700 mb-1 sm:mb-2">Harnessing Phenomena</p>
                  <p className="text-xs text-slate-600 leading-relaxed">Most broadly, as framed by W. Brian Arthur, technology is "the harnessing of some phenomena for use" - and in our case, human use</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                      <Target size={12} />
                      <span>Core Elements</span>
                    </h4>
                    <div className="space-y-0.5">
                      {['Functions', 'Forms', 'Captured Phenomena'].slice(0, 3).map((element, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-slate-700 font-medium">{element}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                      <Dna size={12} />
                      <span>Examples</span>
                    </h4>
                    <div className="space-y-0.5 text-xs">
                      {['Fish using photons', 'Cells using gradients', 'Fire control'].slice(0, 3).map((example, idx) => (
                        <div key={idx} className="text-slate-600 bg-white rounded p-1.5 border border-slate-200">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center space-x-1">
                      <Clock size={12} />
                      <span>Timeline</span>
                    </h4>
                    <div className="text-slate-600 bg-white rounded p-1.5 border border-slate-200">
                      ~3.8B years ago - Present
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Timeline with Co-evolution Emphasis */}
        <div className="mb-6 lg:mb-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 via-purple-50 to-blue-50 rounded-xl border border-slate-200">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6 flex items-center space-x-2">
            <Clock size={20} className="text-slate-600" />
            <span>Three-way Co-Evolutionary Timeline</span>
          </h3>
          <div className="relative overflow-x-auto">
            <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-green-500 via-purple-500 to-blue-500 rounded-full"></div>
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 sm:ml-12">
              
              {/* Primordial Co-evolution - Technology & Culture */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="hidden sm:block w-6 h-6 bg-purple-500 rounded-full -ml-14 border-4 border-white shadow-md flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm sm:text-base cursor-pointer hover:text-purple-600 transition-colors duration-200" 
                      onClick={() => setShowMikeLevinPopup(true)}>
                    ~3.8B years ago: Technology & Culture Begin Co-evolution
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Fish use photons for predator detection. Single-cell organisms harness phenomena (photons, chemicals, electrical gradients) while developing 
                    collective behaviors and mutualistic strategies. Technology and culture emerge together.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Photosynthesis</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Collective Behavior</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Chemical Sensing</span>
                  </div>
                </div>
              </div>

              {/* Human Cultural Acceleration */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="hidden sm:block w-6 h-6 bg-purple-500 rounded-full -ml-14 border-4 border-white shadow-md flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm sm:text-base cursor-pointer hover:text-purple-600 transition-colors duration-200"
                      onClick={() => setShowMikeLevinPopup(true)}>
                    ~100,000 years ago: Human Cultural Acceleration
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Human culture accelerates the co-evolution through language, memory, and systematic knowledge transmission.
                    Technology and culture become increasingly intertwined.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Language</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Tool Making</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Cultural Transmission</span>
                  </div>
                </div>
              </div>

              {/* Science Joins Co-evolution */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="hidden sm:block w-6 h-6 bg-green-500 rounded-full -ml-14 border-4 border-white shadow-md flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm sm:text-base cursor-pointer hover:text-purple-600 transition-colors duration-200"
                      onClick={() => setShowMikeLevinPopup(true)}>
                    ~400 years ago: Science Joins the Co-evolution
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Systematic scientific method emerges and joins the co-evolutionary dance. All three now co-evolve together:
                    Science explains phenomena, Culture transmits knowledge, Technology harnesses discoveries.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1 sm:gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Scientific Method</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Peer Review</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Mathematical Models</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Finding Methods with Exaptation Examples */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 sm:p-6 lg:p-8 border border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center space-x-2">
            <Zap size={20} className="text-amber-600" />
            <span>Finding Methods: How Innovation Emerges</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {findingMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div 
                  key={method.id} 
                  className={`${method.color} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative group`}
                  onMouseEnter={() => setHoveredConcept(`method-${method.id}`)}
                  onMouseLeave={() => setHoveredConcept(null)}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <Icon size={24} />
                    <div>
                      <h4 className="font-bold text-base sm:text-lg">{method.name}</h4>
                      <p className="text-xs sm:text-sm opacity-90">{method.description}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm mb-3 sm:mb-4">{method.detail}</p>
                  
                  {/* Exaptation Example */}
                  <div className="bg-white bg-opacity-70 rounded-lg p-3 border border-white border-opacity-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb size={14} className="text-amber-600" />
                      <span className="text-xs font-semibold text-slate-800">Exaptation Example</span>
                    </div>
                    <p className="text-xs text-slate-700">{method.exaptationExample}</p>
                  </div>

                  {/* Hover Details */}
                  {hoveredConcept === `method-${method.id}` && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-slate-900 text-white text-xs rounded-lg p-4 z-20 shadow-xl">
                      <div className="font-semibold mb-2">How {method.name} Works</div>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-slate-300">Process:</span>
                          <span className="text-slate-400 ml-2">{method.detail}</span>
                        </div>
                        <div>
                          <span className="font-medium text-slate-300">Innovation Pattern:</span>
                          <span className="text-slate-400 ml-2">
                            Existing solutions are exapted (repurposed) for new challenges, then generalized across domains
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Framework Insights */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6 lg:p-8 border border-amber-200">
          <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-4 sm:mb-6 flex items-center space-x-2">
            <Lightbulb size={20} className="text-amber-600" />
            <span>Key Framework Insights</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div>
              <h4 className="font-bold text-amber-900 mb-3 flex items-center space-x-2">
                <Dna size={16} />
                <span>Three-way Co-Evolutionary Reality</span>
              </h4>
              <ul className="text-sm text-amber-800 space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Technology and Culture co-evolved</strong> from 3.8B years ago - fish using photons, cells working mutualistically</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Science joined the dance</strong> (~400 years ago) and now all three co-evolve together</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>W. Brian Arthur:</strong> Technology is "the harnessing of some phenomena for use"</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Mike Levin:</strong> Morphological goal-directed agentic matter - cells collectively navigate using gradients</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Culture includes design:</strong> Iterative experimentation and design thinking as core cultural practices</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-3 flex items-center space-x-2">
                <Zap size={16} />
                <span>Innovation Emergence Patterns</span>
              </h4>
              <ul className="text-sm text-amber-800 space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Exaptation drives breakthroughs:</strong> Existing solutions repurposed for new challenges</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Generalization scales impact:</strong> Specific solutions become general principles</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Cross-domain transfer:</strong> Solutions migrate between fields through analogical thinking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>EdgeFinder navigates</strong> these complex co-evolutionary relationships to find breakthrough opportunities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Design-driven evolution:</strong> Cultural design practices accelerate technological and scientific advancement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Morphological Space Reference */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-purple-200">
          <h3 className="text-base sm:text-lg font-semibold text-purple-900 mb-3 flex items-center space-x-2">
            <Waves size={18} className="text-purple-600" />
            <span>Morphological Space Navigation</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h4 className="font-medium text-purple-900 mb-2">Biological Precedent</h4>
              <p className="text-sm text-purple-800">
                Cells collectively decide to become a frog from birth using pointers into morphological space - 
                navigating through electrical, geometric, physical, and chemical gradients toward specific forms and functions.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-purple-900 mb-2">Innovation Application</h4>
              <p className="text-sm text-purple-800">
                EdgeFinder helps researchers navigate the "morphological space" of possible solutions by identifying 
                gradients in knowledge, technology, and cultural design practices that point toward breakthrough innovations through iterative experimentation.
              </p>
            </div>
          </div>
        </div>

        {/* Mike Levin Popup */}
        {showMikeLevinPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center space-x-2">
                    <Waves className="text-purple-600" size={20} />
                    <span>Mike Levin's Research: Morphological Goal-Directed Matter</span>
                  </h3>
                  <button
                    onClick={() => setShowMikeLevinPopup(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Morphological Goal-Directed Agentic "Matter"</h4>
                    <p className="text-sm text-slate-700 mb-3">
                      Cells collectively decide to become a frog from birth using pointers into morphological space - 
                      navigating through electrical, geometric, physical, and chemical gradients toward specific forms and functions.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Co-Evolutionary Implications</h4>
                    <ul className="text-sm text-slate-700 space-y-2">
                      <li>• <strong>Technology:</strong> Fish using photons to detect predators - harnessing phenomena for survival</li>
                      <li>• <strong>Culture:</strong> Single-cell organisms working mutualistically - collective survival strategies</li>
                      <li>• <strong>Co-evolution:</strong> Neither came first - they developed together as life harnessed phenomena and developed collective behaviors</li>
                      <li>• <strong>Design in Nature:</strong> Biological systems exhibit iterative experimentation and design optimization</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <p className="text-sm text-purple-800">
                      <strong>EdgeFinder Application:</strong> Just as cells navigate morphological space using gradients, 
                      EdgeFinder helps researchers navigate the "morphological space" of possible solutions 
                      to find breakthrough opportunities through systematic design and iterative experimentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};