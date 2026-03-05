import React, { useState } from 'react';
import { Brain, Target, Users, Lightbulb, ArrowRight, Clock, CheckCircle, X, Plus, Play, Square } from 'lucide-react';

interface LUMAMethod {
  id: string;
  name: string;
  category: 'looking' | 'understanding' | 'making';
  description: string;
  timeEstimate: string;
  participants: string;
  materials: string[];
  steps: string[];
  outcomes: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bestFor: string[];
}

interface ActiveMethod {
  method: LUMAMethod;
  startTime: Date;
  currentStep: number;
  notes: string[];
  completed: boolean;
}

export const LUMAMethods: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'looking' | 'understanding' | 'making'>('all');
  const [activeRecipe, setActiveRecipe] = useState<ActiveMethod[]>([]);
  const [sessionActive, setSessionActive] = useState(false);
  const [draggedMethod, setDraggedMethod] = useState<LUMAMethod | null>(null);

  const methods: LUMAMethod[] = [
    // Looking Methods
    {
      id: 'rose-thorn-bud',
      name: 'Rose, Thorn, Bud',
      category: 'looking',
      description: 'Reflect on positives, challenges, and opportunities',
      timeEstimate: '15-30 minutes',
      participants: '3-8 people',
      materials: ['Sticky notes', 'Markers', 'Wall space'],
      steps: [
        'Set up three columns: Rose (positives), Thorn (challenges), Bud (opportunities)',
        'Have participants write one idea per sticky note',
        'Place notes in appropriate columns',
        'Discuss patterns and themes',
        'Identify priority thorns and promising buds'
      ],
      outcomes: ['Clear view of current state', 'Identified challenges', 'Future opportunities'],
      difficulty: 'beginner',
      bestFor: ['Project retrospectives', 'Situation analysis', 'Team alignment']
    },
    {
      id: 'stakeholder-mapping',
      name: 'Stakeholder Mapping',
      category: 'looking',
      description: 'Identify and analyze all people affected by or influencing your challenge',
      timeEstimate: '45-60 minutes',
      participants: '4-8 people',
      materials: ['Large paper', 'Sticky notes', 'Markers'],
      steps: [
        'Place your challenge/project in the center',
        'Brainstorm all stakeholders (users, influencers, decision-makers)',
        'Map stakeholders by influence vs. interest',
        'Identify relationships between stakeholders',
        'Highlight key insights and gaps'
      ],
      outcomes: ['Comprehensive stakeholder view', 'Influence relationships', 'Engagement strategy'],
      difficulty: 'intermediate',
      bestFor: ['Complex projects', 'System understanding', 'Strategy planning']
    },
    {
      id: 'problem-definition',
      name: 'Problem Definition',
      category: 'looking',
      description: 'Frame and reframe the challenge to find the right problem to solve',
      timeEstimate: '30-45 minutes',
      participants: '3-6 people',
      materials: ['Worksheets', 'Markers', 'Timer'],
      steps: [
        'Write initial problem statement',
        'Ask "What problem does this problem create?"',
        'Ask "What problem does this problem solve?"',
        'Reframe from different stakeholder perspectives',
        'Select the most actionable problem frame'
      ],
      outcomes: ['Clear problem statement', 'Multiple perspectives', 'Actionable focus'],
      difficulty: 'intermediate',
      bestFor: ['Problem clarity', 'Strategic alignment', 'Innovation focus']
    },

    // Understanding Methods
    {
      id: 'affinity-diagramming',
      name: 'Affinity Diagramming',
      category: 'understanding',
      description: 'Group related ideas to reveal patterns and themes',
      timeEstimate: '30-60 minutes',
      participants: '3-8 people',
      materials: ['Sticky notes', 'Wall space', 'Markers'],
      steps: [
        'Collect all ideas/observations on sticky notes',
        'Silently group related notes together',
        'Discuss groupings and create theme headers',
        'Look for patterns across groups',
        'Identify insights and next steps'
      ],
      outcomes: ['Organized insights', 'Pattern recognition', 'Shared understanding'],
      difficulty: 'beginner',
      bestFor: ['Data synthesis', 'Pattern finding', 'Team alignment']
    },
    {
      id: 'systems-mapping',
      name: 'Systems Mapping',
      category: 'understanding',
      description: 'Visualize relationships and dependencies in complex systems',
      timeEstimate: '60-90 minutes',
      participants: '4-8 people',
      materials: ['Large paper', 'Sticky notes', 'Colored markers', 'String/yarn'],
      steps: [
        'Identify system elements (actors, processes, resources)',
        'Map elements spatially on large surface',
        'Draw connections showing relationships',
        'Identify feedback loops and dependencies',
        'Highlight leverage points and bottlenecks'
      ],
      outcomes: ['System visualization', 'Leverage points', 'Intervention opportunities'],
      difficulty: 'advanced',
      bestFor: ['Complex challenges', 'System design', 'Strategic planning']
    },
    {
      id: 'journey-mapping',
      name: 'Journey Mapping',
      category: 'understanding',
      description: 'Map the end-to-end experience from a user perspective',
      timeEstimate: '90-120 minutes',
      participants: '4-10 people',
      materials: ['Large paper', 'Sticky notes', 'Markers', 'Templates'],
      steps: [
        'Define the journey scope and user persona',
        'Map journey phases and touchpoints',
        'Add user actions, thoughts, and emotions',
        'Identify pain points and opportunities',
        'Prioritize improvement areas'
      ],
      outcomes: ['User experience map', 'Pain point identification', 'Improvement priorities'],
      difficulty: 'intermediate',
      bestFor: ['User experience', 'Service design', 'Process improvement']
    },

    // Making Methods
    {
      id: 'rapid-prototyping',
      name: 'Rapid Prototyping',
      category: 'making',
      description: 'Quickly build testable versions of ideas',
      timeEstimate: '60-180 minutes',
      participants: '2-6 people',
      materials: ['Craft materials', 'Digital tools', 'Testing materials'],
      steps: [
        'Define what you want to test',
        'Choose appropriate fidelity level',
        'Build minimum viable prototype',
        'Test with real users',
        'Iterate based on feedback'
      ],
      outcomes: ['Testable prototype', 'User feedback', 'Validated assumptions'],
      difficulty: 'intermediate',
      bestFor: ['Idea validation', 'User testing', 'Iterative design']
    },
    {
      id: 'concept-poster',
      name: 'Concept Poster',
      category: 'making',
      description: 'Create visual representation of ideas for communication',
      timeEstimate: '45-90 minutes',
      participants: '2-5 people',
      materials: ['Large paper', 'Markers', 'Images', 'Glue'],
      steps: [
        'Define key message and audience',
        'Sketch layout and visual hierarchy',
        'Add compelling visuals and minimal text',
        'Test comprehension with others',
        'Refine for clarity and impact'
      ],
      outcomes: ['Visual communication tool', 'Shared understanding', 'Stakeholder alignment'],
      difficulty: 'beginner',
      bestFor: ['Idea communication', 'Stakeholder buy-in', 'Vision alignment']
    },
    {
      id: 'business-model-canvas',
      name: 'Business Model Canvas',
      category: 'making',
      description: 'Design and visualize business model components',
      timeEstimate: '90-120 minutes',
      participants: '3-8 people',
      materials: ['Canvas template', 'Sticky notes', 'Markers'],
      steps: [
        'Start with value propositions and customer segments',
        'Map customer relationships and channels',
        'Define key activities and resources',
        'Identify key partnerships',
        'Analyze cost structure and revenue streams'
      ],
      outcomes: ['Business model design', 'Strategic clarity', 'Implementation roadmap'],
      difficulty: 'advanced',
      bestFor: ['Business planning', 'Strategy design', 'Innovation projects']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Methods', count: methods.length, color: 'bg-slate-600' },
    { id: 'looking', name: 'Looking', count: methods.filter(m => m.category === 'looking').length, color: 'bg-blue-600' },
    { id: 'understanding', name: 'Understanding', count: methods.filter(m => m.category === 'understanding').length, color: 'bg-purple-600' },
    { id: 'making', name: 'Making', count: methods.filter(m => m.category === 'making').length, color: 'bg-green-600' }
  ];

  const filteredMethods = methods.filter(method => 
    selectedCategory === 'all' || method.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'looking': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'understanding': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'making': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleDragStart = (e: React.DragEvent, method: LUMAMethod) => {
    setDraggedMethod(method);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedMethod) {
      const newActiveMethod: ActiveMethod = {
        method: draggedMethod,
        startTime: new Date(),
        currentStep: 0,
        notes: [],
        completed: false
      };
      setActiveRecipe([...activeRecipe, newActiveMethod]);
      setSessionActive(true);
      setDraggedMethod(null);
    }
  };

  const removeFromRecipe = (index: number) => {
    setActiveRecipe(prev => prev.filter((_, i) => i !== index));
    if (activeRecipe.length === 1) {
      setSessionActive(false);
    }
  };

  const updateMethodStep = (methodIndex: number, stepIndex: number) => {
    setActiveRecipe(prev => prev.map((activeMethod, i) => 
      i === methodIndex 
        ? { ...activeMethod, currentStep: stepIndex }
        : activeMethod
    ));
  };

  const updateMethodNotes = (methodIndex: number, stepIndex: number, note: string) => {
    setActiveRecipe(prev => prev.map((activeMethod, i) => 
      i === methodIndex 
        ? { 
            ...activeMethod, 
            notes: { ...activeMethod.notes, [stepIndex]: note }
          }
        : activeMethod
    ));
  };

  const completeMethod = (methodIndex: number) => {
    setActiveRecipe(prev => prev.map((activeMethod, i) => 
      i === methodIndex 
        ? { ...activeMethod, completed: true }
        : activeMethod
    ));
  };

  const endSession = () => {
    setActiveRecipe([]);
    setSessionActive(false);
  };

  const startNewSession = () => {
    setActiveRecipe([]);
    setSessionActive(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-slate-200">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
            <Brain className="text-purple-600" size={24} />
            <span>LUMA Innovation Methods</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Human-centered design methods for systematic innovation. Drag methods into the workspace to build your exploration recipe.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <span className="text-sm font-medium text-slate-700">Category:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white`
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Methods Library */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Target size={18} className="text-blue-600" />
              <span>Methods Library</span>
            </h3>
            
            <div className="grid gap-4">
              {filteredMethods.map((method) => (
                <div
                  key={method.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, method)}
                  className={`border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-move ${
                    draggedMethod?.id === method.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                        <h4 className="font-semibold text-slate-900">{method.name}</h4>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(method.category)}`}>
                            {method.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(method.difficulty)}`}>
                            {method.difficulty}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{method.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="font-medium text-slate-700">Time:</span>
                      <div className="text-slate-600">{method.timeEstimate}</div>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Participants:</span>
                      <div className="text-slate-600">{method.participants}</div>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Materials:</span>
                      <div className="text-slate-600">{method.materials.slice(0, 2).join(', ')}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="text-xs text-slate-600">
                      <span className="font-medium">Best for:</span> {method.bestFor.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Recipe Workspace */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                  <Lightbulb size={18} className="text-amber-600" />
                  <span>Method Recipe</span>
                </h3>
                {sessionActive && activeRecipe.length > 0 && (
                  <button
                    onClick={endSession}
                    className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm"
                  >
                    <Square size={14} />
                    <span>End Session</span>
                  </button>
                )}
              </div>
              
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`min-h-64 border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
                  activeRecipe.length === 0
                    ? 'border-slate-300 bg-slate-50'
                    : 'border-green-300 bg-green-50'
                }`}
              >
                {activeRecipe.length === 0 ? (
                  <div className="text-center text-slate-500 py-8">
                    <Target size={32} className="mx-auto mb-3 opacity-50" />
                    <p className="text-sm mb-2">Drag methods here to build your exploration recipe</p>
                    <p className="text-xs">Combine multiple methods for comprehensive analysis</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeRecipe.map((activeMethod, methodIndex) => (
                      <div key={`${activeMethod.method.id}-${methodIndex}`} className="bg-white rounded-lg border border-slate-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                              activeMethod.completed ? 'bg-green-600' : 'bg-blue-600'
                            }`}>
                              {methodIndex + 1}
                            </div>
                            <h4 className="font-medium text-slate-900">{activeMethod.method.name}</h4>
                            {activeMethod.completed && (
                              <CheckCircle size={16} className="text-green-600" />
                            )}
                          </div>
                          <button
                            onClick={() => removeFromRecipe(methodIndex)}
                            className="text-slate-400 hover:text-red-600 transition-colors duration-200"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="text-xs text-slate-600 mb-3">
                          Started: {activeMethod.startTime.toLocaleTimeString()}
                        </div>
                        
                        {/* Method Steps */}
                        <div className="space-y-2">
                          {activeMethod.method.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start space-x-2">
                              <button
                                onClick={() => updateMethodStep(methodIndex, stepIndex)}
                                className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                                  activeMethod.currentStep > stepIndex
                                    ? 'bg-green-600 border-green-600'
                                    : activeMethod.currentStep === stepIndex
                                    ? 'border-blue-600 bg-blue-100'
                                    : 'border-slate-300'
                                }`}
                              >
                                {activeMethod.currentStep > stepIndex && (
                                  <CheckCircle size={12} className="text-white" />
                                )}
                              </button>
                              <div className="flex-1">
                                <p className={`text-xs ${
                                  activeMethod.currentStep > stepIndex 
                                    ? 'text-slate-500 line-through' 
                                    : activeMethod.currentStep === stepIndex
                                    ? 'text-slate-900 font-medium'
                                    : 'text-slate-600'
                                }`}>
                                  {step}
                                </p>
                                {activeMethod.currentStep === stepIndex && (
                                  <textarea
                                    placeholder="Add notes for this step..."
                                    className="w-full mt-2 p-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    rows={2}
                                    onChange={(e) => updateMethodNotes(methodIndex, stepIndex, e.target.value)}
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {activeMethod.currentStep >= activeMethod.method.steps.length && !activeMethod.completed && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <button
                              onClick={() => completeMethod(methodIndex)}
                              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm"
                            >
                              <CheckCircle size={16} />
                              <span>Complete Method</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Recipe Summary */}
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <h4 className="font-medium text-slate-900 mb-2 text-sm">Recipe Progress</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Methods:</span>
                          <span className="font-medium">{activeRecipe.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completed:</span>
                          <span className="font-medium">{activeRecipe.filter(m => m.completed).length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. Time:</span>
                          <span className="font-medium">
                            {activeRecipe.reduce((total, m) => {
                              const time = parseInt(m.method.timeEstimate.split('-')[1] || m.method.timeEstimate.split('-')[0]);
                              return total + time;
                            }, 0)} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Method Details Modal */}
        {/* Add detailed method view if needed */}
      </div>
    </div>
  );
};