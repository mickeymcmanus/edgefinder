import React from 'react';
import { TrendingUp, BarChart3, PieChart, Activity, AlertTriangle, CheckCircle, Zap, Brain, Network, Target, Wrench, Clock } from 'lucide-react';

export const Insights: React.FC = () => {
  const metrics = [
    {
      title: 'Active Research Frontiers',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Solver Connections Made',
      value: '1,429',
      change: '+23%',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-600'
    },
    {
      title: 'Problems Identified',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-amber-600'
    },
    {
      title: 'Solutions Deployed',
      value: '34',
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-purple-600'
    }
  ];

  const analogicalMetrics = [
    {
      title: 'Largest Analogical Leap',
      value: 'Biology → Quantum',
      description: 'DNA error correction mechanisms applied to quantum systems',
      leapDistance: 8.7,
      impact: 'Revolutionary',
      icon: Brain,
      color: 'text-purple-600'
    },
    {
      title: 'Cross-Domain Connections',
      value: '23',
      description: 'Active analogical bridges between research domains',
      leapDistance: 6.2,
      impact: 'High',
      icon: Network,
      color: 'text-blue-600'
    },
    {
      title: 'Recursive Pattern Applications',
      value: '12',
      description: 'Successful patterns applied across multiple domains',
      leapDistance: 7.4,
      impact: 'High',
      icon: Zap,
      color: 'text-amber-600'
    },
    {
      title: 'Breakthrough Probability',
      value: '78%',
      description: 'Likelihood of major innovation from current analogies',
      leapDistance: 9.1,
      impact: 'Revolutionary',
      icon: Target,
      color: 'text-green-600'
    }
  ];

  const analogicalLeaps = [
    {
      source: 'DNA Repair Mechanisms',
      target: 'Quantum Error Correction',
      distance: 8.7,
      confidence: 0.84,
      description: 'Biological error correction strategies inspire quantum fault tolerance',
      impact: 'Revolutionary',
      discoveredBy: 'EdgeFinder Cross-Domain Analysis',
      timeframe: '2 hours ago'
    },
    {
      source: 'Swarm Intelligence',
      target: 'Distributed Computing',
      distance: 6.3,
      confidence: 0.76,
      description: 'Ant colony optimization patterns for network resilience',
      impact: 'High',
      discoveredBy: 'LUMA Systems Mapping',
      timeframe: '4 hours ago'
    },
    {
      source: 'Metamaterial Structures',
      target: 'Neural Interface Design',
      distance: 7.8,
      confidence: 0.71,
      description: 'Programmable matter principles for adaptive brain interfaces',
      impact: 'High',
      discoveredBy: 'Problem Finding Method',
      timeframe: '6 hours ago'
    },
    {
      source: 'Economic Market Mechanisms',
      target: 'Scientific Resource Allocation',
      distance: 5.9,
      confidence: 0.68,
      description: 'Prediction markets for research priority setting',
      impact: 'Medium',
      discoveredBy: 'Stakeholder Mapping',
      timeframe: '1 day ago'
    }
  ];

  const topDomains = [
    { name: 'Quantum Computing', problems: 45, impact: 'Revolutionary', funding: '$12.3M' },
    { name: 'Synthetic Biology', problems: 38, impact: 'High', funding: '$8.7M' },
    { name: 'Neuromorphic Computing', problems: 29, impact: 'High', funding: '$6.2M' },
    { name: 'Climate Engineering', problems: 31, impact: 'Critical', funding: '$15.1M' },
    { name: 'Quantum Materials', problems: 22, impact: 'Medium', funding: '$4.5M' }
  ];

  const recentBreakthroughs = [
    {
      title: 'Novel Approach to Protein Folding Prediction',
      domain: 'Biotechnology',
      solver: 'Dr. Sarah Chen + BioSim AI',
      impact: 'High',
      timeframe: '2 hours ago'
    },
    {
      title: 'Scalable Quantum Error Correction Method',
      domain: 'Quantum Computing',
      solver: 'Quantum Team Alpha',
      impact: 'Revolutionary',
      timeframe: '6 hours ago'
    },
    {
      title: 'Biodegradable Electronics Framework',
      domain: 'Materials Science',
      solver: 'Prof. Michael Torres',
      impact: 'High',
      timeframe: '1 day ago'
    }
  ];

  // Deep Craft Matrix data - Domain Knowledge vs Paradigm Challenge
  const deepCraftMatrix = [
    {
      name: 'Dr. Sarah Chen',
      domain: 'Quantum Computing',
      domainKnowledge: 9.2, // 0-10 scale
      paradigmChallenge: 7.8, // 0-10 scale
      quadrant: 'Revolutionary Innovator',
      projects: ['Quantum Error Correction', 'Bio-Quantum Interfaces'],
      breakthroughPotential: 0.94
    },
    {
      name: 'Dr. Maria Santos',
      domain: 'Biology',
      domainKnowledge: 8.9,
      paradigmChallenge: 8.5,
      quadrant: 'Revolutionary Innovator',
      projects: ['DNA Repair Mechanisms', 'Cross-Domain Applications'],
      breakthroughPotential: 0.91
    },
    {
      name: 'Prof. James Liu',
      domain: 'Network Theory',
      domainKnowledge: 8.1,
      paradigmChallenge: 6.2,
      quadrant: 'Domain Expert',
      projects: ['Distributed Systems', 'Fault Tolerance'],
      breakthroughPotential: 0.73
    },
    {
      name: 'CodeCorrect AI',
      domain: 'Software Engineering',
      domainKnowledge: 7.8,
      paradigmChallenge: 5.9,
      quadrant: 'Domain Expert',
      projects: ['Static Analysis', 'Bug Detection'],
      breakthroughPotential: 0.68
    },
    {
      name: 'Dr. Alex Rivera',
      domain: 'Climate Science',
      domainKnowledge: 6.4,
      paradigmChallenge: 8.7,
      quadrant: 'Paradigm Challenger',
      projects: ['Geoengineering Ethics', 'Alternative Models'],
      breakthroughPotential: 0.76
    },
    {
      name: 'Maya Patel',
      domain: 'Materials Science',
      domainKnowledge: 5.8,
      paradigmChallenge: 4.2,
      quadrant: 'Emerging Contributor',
      projects: ['Sustainable Materials', 'Basic Research'],
      breakthroughPotential: 0.42
    }
  ];

  // Pasteur's Quadrant data - Fundamental Understanding vs Practical Application
  const pasteursQuadrant = [
    {
      name: 'Quantum Error Correction',
      domain: 'Quantum Computing',
      fundamentalUnderstanding: 9.1, // 0-10 scale
      practicalApplication: 8.7, // 0-10 scale
      quadrant: 'Pasteur\'s Quadrant',
      researchers: ['Dr. Sarah Chen', 'Quantum Team Alpha'],
      funding: '$12.3M',
      timeToApplication: '2-3 years',
      breakthroughPotential: 0.94
    },
    {
      name: 'DNA Repair Mechanisms',
      domain: 'Biology',
      fundamentalUnderstanding: 8.9,
      practicalApplication: 6.2,
      quadrant: 'Bohr\'s Quadrant',
      researchers: ['Dr. Maria Santos'],
      funding: '$4.8M',
      timeToApplication: '5-7 years',
      breakthroughPotential: 0.78
    },
    {
      name: 'Biodegradable Electronics',
      domain: 'Materials Science',
      fundamentalUnderstanding: 6.4,
      practicalApplication: 8.9,
      quadrant: 'Edison\'s Quadrant',
      researchers: ['Prof. Michael Torres', 'Maya Patel'],
      funding: '$3.7M',
      timeToApplication: '1-2 years',
      breakthroughPotential: 0.71
    },
    {
      name: 'Metamaterial Structures',
      domain: 'Advanced Materials',
      fundamentalUnderstanding: 7.8,
      practicalApplication: 7.6,
      quadrant: 'Pasteur\'s Quadrant',
      researchers: ['Prof. James Liu'],
      funding: '$7.3M',
      timeToApplication: '3-4 years',
      breakthroughPotential: 0.85
    },
    {
      name: 'Theoretical Quantum Models',
      domain: 'Physics',
      fundamentalUnderstanding: 9.5,
      practicalApplication: 3.2,
      quadrant: 'Bohr\'s Quadrant',
      researchers: ['Dr. Alex Rivera'],
      funding: '$2.1M',
      timeToApplication: '10+ years',
      breakthroughPotential: 0.45
    },
    {
      name: 'Climate Monitoring Sensors',
      domain: 'Environmental Tech',
      fundamentalUnderstanding: 4.1,
      practicalApplication: 8.8,
      quadrant: 'Edison\'s Quadrant',
      researchers: ['Climate Tech Team'],
      funding: '$5.2M',
      timeToApplication: '6 months',
      breakthroughPotential: 0.62
    }
  ];

  // Pasteur's Quadrant metrics
  const pasteurMetrics = [
    {
      title: 'Pasteur\'s Quadrant Projects',
      value: '12',
      description: 'High fundamental understanding + high practical application',
      percentage: 34,
      change: '+18%',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Edison\'s Quadrant Projects',
      value: '18',
      description: 'Low fundamental understanding + high practical application',
      percentage: 51,
      change: '+12%',
      icon: Wrench,
      color: 'text-amber-600'
    },
    {
      title: 'Bohr\'s Quadrant Projects',
      value: '8',
      description: 'High fundamental understanding + low practical application',
      percentage: 23,
      change: '-5%',
      icon: Brain,
      color: 'text-blue-600'
    },
    {
      title: 'Average Time to Application',
      value: '2.8 years',
      description: 'Weighted average across all solution spaces',
      percentage: 100,
      change: '-15%',
      icon: Clock,
      color: 'text-green-600'
    }
  ];

  // Collaboration convergence/divergence metrics
  const collaborationMetrics = [
    {
      title: 'Collaboration Convergence',
      value: '73%',
      description: 'Teams forming around shared research questions',
      trend: 'converging',
      change: '+12%',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Disciplinary Divergence',
      value: '8.4',
      description: 'Average domains per collaboration (higher = more interdisciplinary)',
      trend: 'diverging',
      change: '+23%',
      icon: Network,
      color: 'text-purple-600'
    },
    {
      title: 'Cross-Paradigm Teams',
      value: '34',
      description: 'Active teams spanning different research paradigms',
      trend: 'growing',
      change: '+18%',
      icon: Zap,
      color: 'text-amber-600'
    },
    {
      title: 'Revolutionary Potential',
      value: '0.82',
      description: 'Weighted average breakthrough probability across teams',
      trend: 'increasing',
      change: '+15%',
      icon: Brain,
      color: 'text-blue-600'
    }
  ];

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case 'Revolutionary Innovator': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Domain Expert': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Paradigm Challenger': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Emerging Contributor': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getPasteurQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case 'Pasteur\'s Quadrant': return 'bg-purple-500 border-purple-600';
      case 'Edison\'s Quadrant': return 'bg-amber-500 border-amber-600';
      case 'Bohr\'s Quadrant': return 'bg-blue-500 border-blue-600';
      default: return 'bg-slate-500 border-slate-600';
    }
  };

  const impactColors = {
    'Critical': 'bg-red-100 text-red-800',
    'Revolutionary': 'bg-purple-100 text-purple-800',
    'High': 'bg-blue-100 text-blue-800',
    'Medium': 'bg-green-100 text-green-800'
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
          <BarChart3 className="text-blue-600" size={24} />
          <span>Research Intelligence Dashboard</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-slate-50 rounded-lg p-5 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <Icon size={20} className={metric.color} />
                  <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div className="text-sm text-slate-600">{metric.title}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Deep Craft Matrix */}
          <div className="lg:col-span-2 border border-slate-200 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Target size={18} className="text-blue-600" />
              <span>Deep Craft Matrix: Domain Knowledge vs Paradigm Challenge</span>
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Revolutionary innovations emerge from high domain knowledge combined with willingness to challenge current paradigms
            </p>
            
            {/* Matrix Visualization */}
            <div className="relative bg-slate-50 rounded-lg p-6 mb-4" style={{ height: '400px' }}>
              {/* Axis Labels */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-slate-700">
                Domain Knowledge →
              </div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-slate-700">
                ← Challenges Current Paradigm
              </div>
              
              {/* Quadrant Labels */}
              <div className="absolute top-4 left-4 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
                Paradigm Challenger
              </div>
              <div className="absolute top-4 right-4 text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">
                Revolutionary Innovator
              </div>
              <div className="absolute bottom-16 left-4 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                Emerging Contributor
              </div>
              <div className="absolute bottom-16 right-4 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">
                Domain Expert
              </div>
              
              {/* Grid Lines */}
              <div className="absolute inset-6 border-l border-b border-slate-300"></div>
              <div className="absolute left-1/2 top-6 bottom-6 border-l border-slate-200"></div>
              <div className="absolute top-1/2 left-6 right-6 border-b border-slate-200"></div>
              
              {/* Data Points */}
              {deepCraftMatrix.map((person, index) => (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `${6 + (person.domainKnowledge / 10) * 88}%`,
                    bottom: `${16 + (person.paradigmChallenge / 10) * 78}%`
                  }}
                >
                  <div className={`w-3 h-3 rounded-full border-2 ${
                    person.quadrant === 'Revolutionary Innovator' ? 'bg-purple-500 border-purple-600' :
                    person.quadrant === 'Domain Expert' ? 'bg-blue-500 border-blue-600' :
                    person.quadrant === 'Paradigm Challenger' ? 'bg-amber-500 border-amber-600' :
                    'bg-green-500 border-green-600'
                  } hover:scale-150 transition-transform duration-200`}></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-slate-900 text-white text-xs rounded-lg p-2 whitespace-nowrap">
                      <div className="font-medium">{person.name}</div>
                      <div className="text-slate-300">{person.domain}</div>
                      <div className="text-slate-300">Knowledge: {person.domainKnowledge}/10</div>
                      <div className="text-slate-300">Challenge: {person.paradigmChallenge}/10</div>
                      <div className="text-slate-300">Breakthrough: {Math.round(person.breakthroughPotential * 100)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Matrix Legend */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {['Revolutionary Innovator', 'Domain Expert', 'Paradigm Challenger', 'Emerging Contributor'].map((quadrant) => {
                const count = deepCraftMatrix.filter(p => p.quadrant === quadrant).length;
                const avgBreakthrough = deepCraftMatrix
                  .filter(p => p.quadrant === quadrant)
                  .reduce((sum, p) => sum + p.breakthroughPotential, 0) / count;
                
                return (
                  <div key={quadrant} className={`p-3 rounded-lg border ${getQuadrantColor(quadrant)}`}>
                    <div className="font-medium text-sm">{quadrant}</div>
                    <div className="text-xs mt-1">{count} researchers</div>
                    <div className="text-xs">Avg breakthrough: {Math.round(avgBreakthrough * 100)}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pasteur's Quadrant Analysis */}
          <div className="lg:col-span-2 border border-slate-200 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Target size={18} className="text-purple-600" />
              <span>Pasteur's Quadrant: Solution Space Analysis</span>
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Maps research projects by fundamental understanding vs practical application potential
            </p>
            
            {/* Pasteur's Quadrant Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {pasteurMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <Icon size={18} className={metric.color} />
                      <span className={`text-sm font-medium ${
                        metric.change.startsWith('+') ? 'text-green-600' : 
                        metric.change.startsWith('-') ? 'text-red-600' : 'text-slate-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mb-1">{metric.value}</div>
                    <div className="text-sm font-medium text-slate-700 mb-1">{metric.title}</div>
                    <div className="text-xs text-slate-600 mb-2">{metric.description}</div>
                    {metric.percentage < 100 && (
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            metric.color.includes('purple') ? 'bg-purple-600' :
                            metric.color.includes('amber') ? 'bg-amber-600' :
                            metric.color.includes('blue') ? 'bg-blue-600' :
                            'bg-green-600'
                          }`}
                          style={{ width: `${metric.percentage}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Pasteur's Quadrant Matrix Visualization */}
            <div className="relative bg-slate-50 rounded-lg p-6 mb-4" style={{ height: '400px' }}>
              {/* Axis Labels */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-slate-700">
                Practical Application Potential →
              </div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-slate-700">
                ← Fundamental Understanding
              </div>
              
              {/* Quadrant Labels */}
              <div className="absolute top-4 left-4 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">
                Bohr's Quadrant<br/>(Pure Research)
              </div>
              <div className="absolute top-4 right-4 text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">
                Pasteur's Quadrant<br/>(Use-Inspired Research)
              </div>
              <div className="absolute bottom-16 left-4 text-xs font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                Unexplored<br/>(Low-Low)
              </div>
              <div className="absolute bottom-16 right-4 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
                Edison's Quadrant<br/>(Applied Research)
              </div>
              
              {/* Grid Lines */}
              <div className="absolute inset-6 border-l border-b border-slate-300"></div>
              <div className="absolute left-1/2 top-6 bottom-6 border-l border-slate-200"></div>
              <div className="absolute top-1/2 left-6 right-6 border-b border-slate-200"></div>
              
              {/* Data Points */}
              {pasteursQuadrant.map((project, index) => (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{
                    left: `${6 + (project.practicalApplication / 10) * 88}%`,
                    bottom: `${16 + (project.fundamentalUnderstanding / 10) * 78}%`
                  }}
                >
                  <div className={`w-4 h-4 rounded-full border-2 ${getPasteurQuadrantColor(project.quadrant)} hover:scale-150 transition-transform duration-200`}></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-slate-900 text-white text-xs rounded-lg p-3 whitespace-nowrap">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-slate-300">{project.domain}</div>
                      <div className="text-slate-300">Understanding: {project.fundamentalUnderstanding}/10</div>
                      <div className="text-slate-300">Application: {project.practicalApplication}/10</div>
                      <div className="text-slate-300">Funding: {project.funding}</div>
                      <div className="text-slate-300">Time to App: {project.timeToApplication}</div>
                      <div className="text-slate-300">Breakthrough: {Math.round(project.breakthroughPotential * 100)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quadrant Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              {['Pasteur\'s Quadrant', 'Edison\'s Quadrant', 'Bohr\'s Quadrant'].map((quadrant) => {
                const projects = pasteursQuadrant.filter(p => p.quadrant === quadrant);
                const avgBreakthrough = projects.reduce((sum, p) => sum + p.breakthroughPotential, 0) / projects.length;
                const totalFunding = projects.reduce((sum, p) => {
                  const funding = parseFloat(p.funding.replace(/[$M£€]/g, ''));
                  return sum + funding;
                }, 0);
                
                return (
                  <div key={quadrant} className={`p-4 rounded-lg border ${
                    quadrant === 'Pasteur\'s Quadrant' ? 'bg-purple-50 border-purple-200' :
                    quadrant === 'Edison\'s Quadrant' ? 'bg-amber-50 border-amber-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="font-medium text-slate-900 text-sm mb-2">{quadrant}</div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <div>{projects.length} projects</div>
                      <div>${totalFunding.toFixed(1)}M total funding</div>
                      <div>{Math.round(avgBreakthrough * 100)}% avg breakthrough potential</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Solution Space Insights */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-amber-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-medium text-slate-900 mb-2 flex items-center space-x-2">
                <Brain size={16} className="text-purple-600" />
                <span>Solution Space Intelligence</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-slate-800 mb-1">Pasteur's Quadrant Dominance</div>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Quantum error correction leading breakthrough potential</li>
                    <li>• Metamaterials bridging theory and application</li>
                    <li>• 34% of projects in optimal innovation zone</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-slate-800 mb-1">Application Timeline Insights</div>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Edison's quadrant: 6 months - 2 years to market</li>
                    <li>• Pasteur's quadrant: 2-4 years for breakthrough</li>
                    <li>• Bohr's quadrant: 5+ years fundamental research</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Convergence/Divergence Metrics */}
          <div className="lg:col-span-2 border border-slate-200 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Network size={18} className="text-purple-600" />
              <span>Collaboration Dynamics: Convergence vs Divergence</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {collaborationMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <Icon size={18} className={metric.color} />
                      <span className={`text-sm font-medium ${
                        metric.trend === 'converging' || metric.trend === 'growing' || metric.trend === 'increasing' 
                          ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mb-1">{metric.value}</div>
                    <div className="text-sm font-medium text-slate-700 mb-1">{metric.title}</div>
                    <div className="text-xs text-slate-600">{metric.description}</div>
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Trend</span>
                        <span className={`font-medium capitalize ${
                          metric.trend === 'converging' ? 'text-green-600' :
                          metric.trend === 'diverging' ? 'text-purple-600' :
                          metric.trend === 'growing' ? 'text-blue-600' :
                          'text-amber-600'
                        }`}>
                          {metric.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Collaboration Insights */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-medium text-slate-900 mb-2 flex items-center space-x-2">
                <Brain size={16} className="text-purple-600" />
                <span>Collaboration Intelligence</span>
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-slate-800 mb-1">Convergence Patterns</div>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Teams forming around quantum-bio interfaces</li>
                    <li>• Climate-AI collaborations increasing 34%</li>
                    <li>• Materials-computing convergence accelerating</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-slate-800 mb-1">Divergence Opportunities</div>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 8.4 avg domains per team (up from 6.2)</li>
                    <li>• Revolutionary innovators bridging 3+ paradigms</li>
                    <li>• Cross-paradigm teams show 82% breakthrough potential</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Analogical Thinking Metrics */}
          <div className="lg:col-span-2 border border-slate-200 rounded-lg p-5 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Brain size={18} className="text-purple-600" />
              <span>Analogical Thinking Metrics</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {analogicalMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <Icon size={18} className={metric.color} />
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${impactColors[metric.impact]}`}>
                        {metric.impact}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mb-1">{metric.value}</div>
                    <div className="text-sm font-medium text-slate-700 mb-1">{metric.title}</div>
                    <div className="text-xs text-slate-600">{metric.description}</div>
                    {metric.leapDistance && (
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Leap Distance</span>
                          <span className="font-medium text-purple-600">{metric.leapDistance}/10</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(metric.leapDistance / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Recent Analogical Leaps */}
            <div>
              <h4 className="font-medium text-slate-900 mb-3 flex items-center space-x-2">
                <Zap size={16} className="text-amber-600" />
                <span>Recent Analogical Leaps</span>
              </h4>
              <div className="space-y-3">
                {analogicalLeaps.map((leap, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-slate-900 text-sm">{leap.source}</span>
                          <span className="text-slate-400">→</span>
                          <span className="font-medium text-slate-900 text-sm">{leap.target}</span>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{leap.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span>By {leap.discoveredBy}</span>
                          <span>•</span>
                          <span>{leap.timeframe}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs text-slate-500">Distance:</span>
                          <span className="font-bold text-purple-600 text-sm">{leap.distance}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs text-slate-500">Confidence:</span>
                          <span className="font-medium text-blue-600 text-sm">{Math.round(leap.confidence * 100)}%</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[leap.impact]}`}>
                          {leap.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <PieChart size={18} className="text-blue-600" />
              <span>Top Research Domains</span>
            </h3>
            <div className="space-y-3">
              {topDomains.map((domain, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{domain.name}</div>
                    <div className="text-sm text-slate-600">{domain.problems} active problems</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[domain.impact]}`}>
                      {domain.impact}
                    </span>
                    <div className="text-sm text-green-600 font-medium mt-1">{domain.funding}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <TrendingUp size={18} className="text-green-600" />
              <span>Recent Breakthroughs</span>
            </h3>
            <div className="space-y-4">
              {recentBreakthroughs.map((breakthrough, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="font-medium text-slate-900 mb-1">{breakthrough.title}</div>
                  <div className="text-sm text-slate-600 mb-2">{breakthrough.domain}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{breakthrough.solver}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[breakthrough.impact]}`}>
                        {breakthrough.impact}
                      </span>
                      <span className="text-xs text-slate-500">{breakthrough.timeframe}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};