import React, { useState } from 'react';
import { Target, ArrowRight, CheckCircle, Circle, Brain, Search, Lightbulb, FileText, Plus } from 'lucide-react';

interface ProblemFindingProps {
  seedData?: any;
}

export const ProblemFinding: React.FC<ProblemFindingProps> = ({ seedData }) => {
  const [activeMethod, setActiveMethod] = useState('problem');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [seededContext, setSeededContext] = useState<string>('');
  const [stepNotes, setStepNotes] = useState<{[key: string]: string}>({});
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  // Handle seeded data from Explore Edges
  React.useEffect(() => {
    if (seedData) {
      let context = `Exploring: ${seedData.title}`;
      if (seedData.domain) context += ` (${seedData.domain})`;
      if (seedData.method) context += `\n\nMethod: ${seedData.method}`;
      if (seedData.gapAnalysis) context += `\n\nGap Analysis: ${seedData.gapAnalysis}`;
      if (seedData.humanAspect) context += `\n\nHuman-Centered Aspect: ${seedData.humanAspect}`;
      if (seedData.questions) {
        context += `\n\nKey Research Questions:\n${seedData.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
      } else if (seedData.detailedGapAnalysis?.researchQuestions) {
        context += `\n\nKey Research Questions from Edge Analysis:\n${seedData.detailedGapAnalysis.researchQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
      }
      setSeededContext(context);
    }
  }, [seedData]);

  const findingMethods = [
    {
      id: 'problem',
      name: 'Problem Finding',
      description: 'Identify gaps, contradictions, and unaddressed challenges',
      color: 'bg-red-500',
      steps: [
        'Map existing solutions and their limitations',
        'Identify user pain points and unmet needs',
        'Analyze system breakdowns and failures',
        'Explore edge cases and corner scenarios'
      ]
    },
    {
      id: 'form',
      name: 'Form Finding',
      description: 'Discover new structural and design possibilities',
      color: 'bg-blue-500',
      steps: [
        'Study natural forms and biomimetic opportunities',
        'Explore unconventional material combinations',
        'Investigate topological and geometric constraints',
        'Prototype novel structural arrangements'
      ]
    },
    {
      id: 'function',
      name: 'Function Finding',
      description: 'Uncover new capabilities and operational modes',
      color: 'bg-green-500',
      steps: [
        'Map functional requirements and constraints',
        'Explore multi-functional and adaptive systems',
        'Investigate emergent properties and behaviors',
        'Discover unexpected use cases and applications'
      ]
    },
    {
      id: 'fact',
      name: 'Fact Finding',
      description: 'Establish empirical foundations and data gaps',
      color: 'bg-purple-500',
      steps: [
        'Identify measurement and sensing gaps',
        'Establish baseline data requirements',
        'Map experimental and observational needs',
        'Validate assumptions and hypotheses'
      ]
    },
    {
      id: 'explanation',
      name: 'Explanation Finding',
      description: 'Develop theoretical frameworks and models',
      color: 'bg-amber-500',
      steps: [
        'Map unexplained phenomena and mechanisms',
        'Develop predictive models and theories',
        'Bridge disciplinary knowledge gaps',
        'Create unified explanatory frameworks'
      ]
    }
  ];

  const toggleStep = (methodId: string, stepIndex: number) => {
    const stepId = `${methodId}-${stepIndex}`;
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const updateStepNotes = (methodId: string, stepIndex: number, notes: string) => {
    const stepId = `${methodId}-${stepIndex}`;
    setStepNotes(prev => ({
      ...prev,
      [stepId]: notes
    }));
  };

  const generateResearchQuestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation based on completed steps and notes
    const completedMethodSteps = completedSteps.filter(id => id.startsWith(currentMethod.id));
    const methodNotes = Object.entries(stepNotes)
      .filter(([key]) => key.startsWith(currentMethod.id))
      .map(([, notes]) => notes)
      .filter(notes => notes.length > 0);
    
    // Generate questions based on method type and context
    const questionTemplates = {
      problem: [
        'What fundamental assumptions are preventing breakthrough solutions?',
        'Which user needs remain completely unaddressed by current approaches?',
        'What system failures reveal the deepest structural problems?',
        'Where do edge cases expose critical gaps in understanding?',
        'What contradictions exist between different solution approaches?'
      ],
      form: [
        'What natural structures could inspire novel design approaches?',
        'Which material combinations remain unexplored for this application?',
        'How could topological constraints be turned into advantages?',
        'What unconventional geometries might unlock new capabilities?',
        'Which structural arrangements could enable emergent properties?'
      ],
      function: [
        'What hidden capabilities could emerge from system reconfiguration?',
        'Which functional requirements are actually constraints in disguise?',
        'How could multi-functional approaches revolutionize performance?',
        'What unexpected use cases could drive breakthrough adoption?',
        'Which operational modes remain completely unexplored?'
      ],
      fact: [
        'What critical measurements are impossible with current methods?',
        'Which baseline data gaps prevent accurate modeling?',
        'What experimental approaches could reveal hidden phenomena?',
        'Which assumptions need empirical validation?',
        'What observational blind spots limit understanding?'
      ],
      explanation: [
        'What phenomena lack satisfactory theoretical frameworks?',
        'Which mechanisms remain completely unexplained?',
        'How could cross-disciplinary theories bridge knowledge gaps?',
        'What predictive models could transform the field?',
        'Which unified frameworks could connect disparate observations?'
      ]
    };
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const baseQuestions = questionTemplates[currentMethod.id] || questionTemplates.problem;
    let contextualQuestions = [...baseQuestions];
    
    // Add context-specific questions if seeded data exists
    if (seededContext) {
      if (seededContext.includes('Quantum')) {
        contextualQuestions.push('How could quantum effects be leveraged in unexpected ways?');
      }
      if (seededContext.includes('Biology') || seededContext.includes('Bio')) {
        contextualQuestions.push('What biological principles could inspire breakthrough approaches?');
      }
      if (seededContext.includes('AI') || seededContext.includes('Neural')) {
        contextualQuestions.push('How could AI/ML approaches transform this domain?');
      }
    }
    
    // Add questions based on user notes
    if (methodNotes.length > 0) {
      contextualQuestions.push('How do the patterns identified in your exploration connect to broader research gaps?');
      contextualQuestions.push('What novel research directions emerge from your systematic analysis?');
    }
    
    setGeneratedQuestions(contextualQuestions.slice(0, 6)); // Limit to 6 questions
    setShowQuestions(true);
    setIsGenerating(false);
  };

  const currentMethod = findingMethods.find(m => m.id === activeMethod) || findingMethods[0];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2 mb-2">
            <Target className="text-blue-600" size={24} />
            <span>Multi-Dimensional Problem Finding</span>
          </h2>
          <p className="text-slate-600">
            Systematic exploration across five dimensions of discovery based on "The Genesis of Technoscientific Revolutions" framework
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Finding Methods</h3>
            <div className="space-y-2">
              {findingMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setActiveMethod(method.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    activeMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${method.color}`}></div>
                    <span className="font-medium text-slate-900">{method.name}</span>
                  </div>
                  <p className="text-sm text-slate-600">{method.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="border border-slate-200 rounded-lg p-6">
              {seededContext && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
                    <Target size={16} />
                    <span>Seeded from Edge Exploration</span>
                  </h4>
                  <pre className="text-sm text-blue-800 whitespace-pre-wrap font-mono bg-white p-3 rounded border">{seededContext}</pre>
                </div>
              )}
              
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-4 h-4 rounded-full ${currentMethod.color}`}></div>
                <h3 className="text-xl font-semibold text-slate-900">{currentMethod.name}</h3>
              </div>
              
              <p className="text-slate-600 mb-6">{currentMethod.description}</p>
              
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900 flex items-center space-x-2">
                  <Brain size={16} className="text-blue-600" />
                  <span>Systematic Exploration Steps</span>
                </h4>
                
                {currentMethod.steps.map((step, index) => {
                  const stepId = `${currentMethod.id}-${index}`;
                  const isCompleted = completedSteps.includes(stepId);
                  const notesForStep = stepNotes[stepId] || '';
                  
                  return (
                    <div key={index} className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors duration-200">
                      <div className="flex items-start space-x-3 mb-2">
                      <button
                        onClick={() => toggleStep(currentMethod.id, index)}
                        className="mt-1 flex-shrink-0"
                      >
                        {isCompleted ? (
                          <CheckCircle size={20} className="text-green-600" />
                        ) : (
                          <Circle size={20} className="text-slate-400 hover:text-slate-600" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                          {step}
                        </p>
                      </div>
                      </div>
                      
                      {isCompleted && (
                        <div className="mt-2 pl-8">
                          <textarea
                            placeholder="Add your insights, observations, or findings for this step..."
                            value={notesForStep}
                            onChange={(e) => updateStepNotes(currentMethod.id, index, e.target.value)}
                            className="w-full p-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            rows={2}
                          />
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-slate-500">Document your findings</span>
                            <FileText size={12} className="text-slate-400" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <span>Progress:</span>
                    <span className="font-medium">
                      {completedSteps.filter(id => id.startsWith(currentMethod.id)).length} / {currentMethod.steps.length}
                    </span>
                  </div>
                  <button 
                    onClick={generateResearchQuestions}
                    disabled={isGenerating || completedSteps.filter(id => id.startsWith(currentMethod.id)).length === 0}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Search size={16} className="animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Lightbulb size={16} />
                        <span>Generate Research Questions</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Research Questions */}
        {showQuestions && generatedQuestions.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Lightbulb className="text-amber-600" size={18} />
              <span>Generated Research Questions</span>
              <span className="text-sm font-normal text-slate-500">({currentMethod.name})</span>
            </h3>
            <div className="space-y-3">
              {generatedQuestions.map((question, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 font-medium">{question}</p>
                  </div>
                  <button className="flex-shrink-0 p-1 text-slate-400 hover:text-slate-600 transition-colors duration-200">
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Questions generated based on your {currentMethod.name.toLowerCase()} exploration
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200 text-sm">
                  Export Questions
                </button>
                <button className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm">
                  Find Collaborators
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};