import React, { useState } from 'react';
import { Search, ExternalLink, Zap, AlertCircle, Lightbulb, Globe, Target, TrendingUp, Filter, RefreshCw, Users, Plus, Edit, Trash2, Building, Settings } from 'lucide-react';
import { DataSyncStatus } from './DataSyncStatus';

export const ExploreEdges: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('All');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showGapAnalysis, setShowGapAnalysis] = useState(false);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [showAddSource, setShowAddSource] = useState(false);
  const [showManageSources, setShowManageSources] = useState(false);
  const [customSources, setCustomSources] = useState([]);
  const [newSource, setNewSource] = useState({
    name: '',
    url: '',
    description: '',
    type: 'agency', // 'agency', 'office', 'foundation', 'program'
    parentAgency: '',
    focusAreas: [],
    color: 'bg-indigo-600'
  });
  
  const defaultSources = [
    {
      id: 'DARPA',
      name: 'DARPA',
      url: 'https://www.darpa.mil/work-with-us/opportunities',
      description: 'Defense Advanced Research Projects Agency',
      type: 'agency',
      color: 'bg-blue-600',
      challenges: 45,
      focusAreas: ['Defense Technology', 'Emerging Threats', 'National Security']
    },
    {
      id: 'ARPA-H',
      name: 'ARPA-H',
      url: 'https://arpa-h.gov/research-and-funding',
      description: 'Advanced Research Projects Agency for Health',
      type: 'agency',
      color: 'bg-green-600',
      challenges: 23,
      focusAreas: ['Health Innovation', 'Biomedical Research', 'Medical Technology']
    },
    {
      id: 'SPRIND',
      name: 'SPRIND',
      url: 'https://www.sprind.org/en/challenges/',
      description: 'Federal Agency for Disruptive Innovation (Germany)',
      type: 'agency',
      color: 'bg-purple-600',
      challenges: 18,
      focusAreas: ['Disruptive Innovation', 'Deep Tech', 'European Innovation']
    },
    {
      id: 'ARIA',
      name: 'ARIA',
      url: 'https://www.aria.org.uk/opportunities/',
      description: 'Advanced Research and Invention Agency (UK)',
      type: 'agency',
      color: 'bg-red-600',
      challenges: 12,
      focusAreas: ['High-Risk Research', 'Transformative Technology', 'UK Innovation']
    },
    {
      id: 'Convergent Research',
      name: 'Convergent Research',
      url: 'https://convergentresearch.org/gap-map',
      description: 'Focused Research Organizations',
      type: 'foundation',
      color: 'bg-amber-600',
      challenges: 34,
      focusAreas: ['Coordinated Research', 'Scientific Infrastructure', 'Research Gaps']
    },
    {
      id: 'Polyplexus',
      name: 'Polyplexus',
      url: 'https://polyplexus.com/challenges',
      description: 'Research Challenge Platform',
      type: 'platform',
      color: 'bg-indigo-600',
      challenges: 67,
      focusAreas: ['Open Innovation', 'Research Collaboration', 'Challenge-Based Research']
    },
    // DARPA Offices
    {
      id: 'DARPA-BTO',
      name: 'DARPA BTO',
      url: 'https://www.darpa.mil/about-us/offices/bto',
      description: 'Biological Technologies Office',
      type: 'office',
      parentAgency: 'DARPA',
      color: 'bg-blue-500',
      challenges: 15,
      focusAreas: ['Synthetic Biology', 'Biotechnology', 'Bio-Defense', 'Human Performance']
    },
    {
      id: 'DARPA-DSO',
      name: 'DARPA DSO',
      url: 'https://www.darpa.mil/about-us/offices/dso',
      description: 'Defense Sciences Office',
      type: 'office',
      parentAgency: 'DARPA',
      color: 'bg-blue-500',
      challenges: 12,
      focusAreas: ['Quantum Science', 'Materials Science', 'Physics', 'Mathematics']
    },
    {
      id: 'DARPA-I2O',
      name: 'DARPA I2O',
      url: 'https://www.darpa.mil/about-us/offices/i2o',
      description: 'Information Innovation Office',
      type: 'office',
      parentAgency: 'DARPA',
      color: 'bg-blue-500',
      challenges: 18,
      focusAreas: ['AI/ML', 'Cybersecurity', 'Information Systems', 'Human-Machine Teaming']
    },
    // European JEDI
    {
      id: 'JEDI',
      name: 'JEDI',
      url: 'https://www.jedi.foundation/',
      description: 'Joint European Disruptive Initiative',
      type: 'foundation',
      color: 'bg-purple-500',
      challenges: 8,
      focusAreas: ['European Deep Tech', 'Disruptive Innovation', 'Strategic Autonomy', 'Dual-Use Technology']
    }
  ];

  // Comprehensive DARPA challenge database
  const darpaOpportunities = [
    {
      id: 1,
      title: 'Neuromorphic Climate Modeling',
      source: 'DARPA',
      domain: 'Climate AI',
      description: 'Brain-inspired computing architectures for real-time climate prediction',
      novelty: 'High',
      funding: '$8.5M available',
      deadline: '2025-08-30',
      tags: ['neuromorphic computing', 'climate modeling', 'AI'],
      gapAnalysis: 'Traditional supercomputers are energy-intensive and struggle with real-time adaptation',
      edgeReason: 'Convergence of neuromorphic chip availability and climate urgency'
    },
    {
      id: 2,
      title: 'Quantum Sensing for Underground Facilities',
      source: 'DARPA',
      domain: 'Quantum Sensing',
      description: 'Ultra-sensitive quantum sensors for detecting underground structures and activities',
      novelty: 'Revolutionary',
      funding: '$12.3M available',
      deadline: '2025-09-15',
      tags: ['quantum sensing', 'underground detection', 'national security'],
      gapAnalysis: 'Current ground-penetrating radar limited by depth and resolution',
      edgeReason: 'Quantum sensor technology reaching practical deployment thresholds'
    },
    {
      id: 3,
      title: 'Biological Manufacturing at Scale',
      source: 'DARPA',
      domain: 'Synthetic Biology',
      description: 'Engineering biological systems for large-scale manufacturing of critical materials',
      novelty: 'High',
      funding: '$15.7M available',
      deadline: '2025-07-20',
      tags: ['synthetic biology', 'biomanufacturing', 'materials'],
      gapAnalysis: 'Traditional manufacturing vulnerable to supply chain disruptions',
      edgeReason: 'CRISPR advances enable precise biological manufacturing control'
    },
    {
      id: 4,
      title: 'Swarm Intelligence for Autonomous Systems',
      source: 'DARPA',
      domain: 'Autonomous Systems',
      description: 'Distributed intelligence across swarms of autonomous vehicles and robots',
      novelty: 'High',
      funding: '$9.8M available',
      deadline: '2025-10-01',
      tags: ['swarm intelligence', 'autonomous systems', 'distributed AI'],
      gapAnalysis: 'Current autonomous systems lack coordinated group intelligence',
      edgeReason: 'Edge computing and 5G enabling real-time swarm coordination'
    },
    {
      id: 5,
      title: 'Metamaterial Cloaking Technologies',
      source: 'DARPA',
      domain: 'Advanced Materials',
      description: 'Programmable metamaterials for adaptive camouflage and stealth applications',
      novelty: 'Revolutionary',
      funding: '$11.2M available',
      deadline: '2025-06-30',
      tags: ['metamaterials', 'stealth technology', 'adaptive systems'],
      gapAnalysis: 'Static camouflage ineffective against multi-spectrum detection',
      edgeReason: 'Metamaterial fabrication reaching real-time programmability'
    }
  ];

  // ARPA-H opportunities
  const arpaHOpportunities = [
    {
      id: 10,
      title: 'Quantum-Enhanced Drug Discovery',
      source: 'ARPA-H',
      domain: 'Quantum Biology',
      description: 'Leveraging quantum computing for molecular simulation in pharmaceutical research',
      novelty: 'Revolutionary',
      funding: '$15M available',
      deadline: '2025-06-15',
      tags: ['quantum computing', 'drug discovery', 'molecular simulation'],
      gapAnalysis: 'Current classical computers cannot simulate complex molecular interactions at quantum scale',
      edgeReason: 'Intersection of quantum computing maturity and urgent need for faster drug discovery',
      detailedGapAnalysis: {
        currentState: 'Classical computers can only simulate small molecules (< 100 atoms) accurately. Drug discovery relies on expensive wet lab experiments with 90% failure rates.',
        technicalBarriers: [
          'Exponential scaling of quantum states in classical simulation',
          'Lack of quantum algorithms optimized for molecular dynamics',
          'Limited quantum hardware coherence times',
          'Integration challenges between quantum and classical systems'
        ],
        marketBarriers: [
          'Pharmaceutical industry risk aversion to new computational methods',
          'Regulatory uncertainty around quantum-designed drugs',
          'High capital requirements for quantum hardware access'
        ],
        whyNow: [
          'IBM, Google quantum computers reaching 100+ qubit threshold',
          'COVID-19 highlighted urgent need for faster drug discovery',
          'Venture capital flowing into quantum computing startups',
          'Major pharma companies (Roche, Merck) investing in quantum research'
        ],
        keyPlayers: [
          { name: 'IBM Quantum Network', role: 'Hardware platform provider' },
          { name: 'Menten AI', role: 'Quantum protein design startup' },
          { name: 'Cambridge Quantum Computing', role: 'Quantum software for pharma' },
          { name: 'Roche', role: 'Pharmaceutical partner and validator' }
        ],
        researchQuestions: [
          'How can quantum advantage be demonstrated in drug-target binding prediction?',
          'What hybrid quantum-classical algorithms work best for molecular simulation?',
          'How do we validate quantum-designed drugs through regulatory pathways?',
          'What quantum hardware specifications are needed for practical drug discovery?'
        ],
        successMetrics: [
          'Demonstrate 10x speedup in molecular simulation vs classical methods',
          'Design and synthesize quantum-discovered drug candidate',
          'Achieve FDA breakthrough therapy designation for quantum-designed drug',
          'Establish quantum drug discovery as standard pharma practice'
        ]
      }
    },
    {
      id: 11,
      title: 'Personalized Cancer Immunotherapy',
      source: 'ARPA-H',
      domain: 'Precision Medicine',
      description: 'AI-driven personalized immunotherapy design based on individual tumor profiles',
      novelty: 'High',
      funding: '$18.5M available',
      deadline: '2025-11-30',
      tags: ['immunotherapy', 'AI', 'precision medicine'],
      gapAnalysis: 'Current immunotherapies have low response rates due to lack of personalization',
      edgeReason: 'Single-cell sequencing and AI converging to enable true personalization',
      detailedGapAnalysis: {
        currentState: 'Immunotherapy works for only 20-30% of patients. Treatment selection is largely trial-and-error.',
        technicalBarriers: [
          'Tumor heterogeneity makes personalization extremely complex',
          'Limited understanding of immune system-tumor interactions',
          'Lack of real-time biomarkers for treatment response',
          'Computational challenges in processing multi-omics data'
        ],
        marketBarriers: [
          'FDA approval pathways unclear for AI-designed therapies',
          'High cost of personalized treatment development',
          'Insurance coverage challenges for novel approaches'
        ],
        whyNow: [
          'Single-cell RNA sequencing costs dropping dramatically',
          'Large cancer genomics databases now available',
          'AI models achieving breakthrough performance in biology',
          'CAR-T cell therapy success proving immunotherapy potential'
        ],
        keyPlayers: [
          { name: 'Memorial Sloan Kettering', role: 'Clinical expertise and patient data' },
          { name: 'DeepMind', role: 'AI for protein structure and drug discovery' },
          { name: 'Genentech', role: 'Immunotherapy development and manufacturing' },
          { name: '10x Genomics', role: 'Single-cell sequencing technology' }
        ],
        researchQuestions: [
          'How can AI predict immunotherapy response from tumor profiles?',
          'What combination biomarkers best predict treatment success?',
          'How do we design personalized immune cell therapies?',
          'Can real-time monitoring guide treatment adaptation?'
        ],
        successMetrics: [
          'Achieve 80%+ response rate in personalized immunotherapy trials',
          'Reduce time from diagnosis to personalized treatment to <2 weeks',
          'Demonstrate cost-effectiveness vs standard care',
          'Gain FDA approval for AI-designed personalized immunotherapy'
        ]
      }
    }
  ];

  // SPRIND opportunities
  const sprindOpportunities = [
    {
      id: 20,
      title: 'Synthetic Biology for Space Manufacturing',
      source: 'SPRIND',
      domain: 'Space Biotechnology',
      description: 'Engineered organisms for in-situ resource utilization in space environments',
      novelty: 'High',
      funding: '€6.2M available',
      deadline: '2025-09-15',
      tags: ['synthetic biology', 'space manufacturing', 'ISRU'],
      gapAnalysis: 'Space missions rely on Earth-supplied materials, limiting mission scope and duration',
      edgeReason: 'Maturation of synthetic biology tools meets growing space exploration needs',
      detailedGapAnalysis: {
        currentState: 'Space missions carry all materials from Earth at $10,000+ per kg launch cost. Manufacturing in space is limited to 3D printing of simple structures.',
        technicalBarriers: [
          'Organisms must survive extreme space radiation and microgravity',
          'Limited understanding of biological processes in space environments',
          'Containment challenges for engineered organisms in closed systems',
          'Integration of biological and mechanical manufacturing systems'
        ],
        marketBarriers: [
          'Space industry conservative about biological contamination risks',
          'Regulatory uncertainty around releasing organisms in space',
          'High cost and complexity of space-qualified biological systems'
        ],
        whyNow: [
          'CRISPR and synthetic biology tools becoming standardized',
          'SpaceX reducing launch costs enabling more space manufacturing',
          'NASA Artemis program requiring sustainable lunar presence',
          'Private space companies (Blue Origin, Virgin) expanding operations'
        ],
        keyPlayers: [
          { name: 'NASA Ames', role: 'Space synthetic biology research' },
          { name: 'Ginkgo Bioworks', role: 'Synthetic biology platform' },
          { name: 'Made In Space', role: 'Space manufacturing expertise' },
          { name: 'SpaceX', role: 'Launch and space infrastructure' }
        ],
        researchQuestions: [
          'Which organisms can be engineered to survive and thrive in space?',
          'How do we contain and control biological manufacturing in space?',
          'What materials can be produced biologically from space resources?',
          'How do we integrate biological and mechanical space manufacturing?'
        ],
        successMetrics: [
          'Demonstrate biological material production on International Space Station',
          'Engineer organisms that can process lunar or Martian regolith',
          'Achieve 90% reduction in Earth-supplied materials for space missions',
          'Establish self-sustaining biological manufacturing on Moon or Mars'
        ]
      }
    },
    {
      id: 21,
      title: 'Quantum Internet Infrastructure',
      source: 'SPRIND',
      domain: 'Quantum Communications',
      description: 'Building the foundational infrastructure for secure quantum communication networks',
      novelty: 'Revolutionary',
      funding: '€8.9M available',
      deadline: '2025-12-01',
      tags: ['quantum internet', 'quantum cryptography', 'infrastructure'],
      gapAnalysis: 'Current internet vulnerable to quantum computing attacks',
      edgeReason: 'Quantum key distribution technology reaching commercial viability'
    }
  ];

  // ARIA opportunities
  const ariaOpportunities = [
    {
      id: 30,
      title: 'Metamaterial-Based Neural Interfaces',
      source: 'ARIA',
      domain: 'Neurotechnology',
      description: 'Programmable metamaterials for non-invasive brain-computer interfaces',
      novelty: 'Revolutionary',
      funding: '£4.8M available',
      deadline: '2025-07-20',
      tags: ['metamaterials', 'neural interfaces', 'BCI'],
      gapAnalysis: 'Current BCIs require invasive procedures or have poor signal quality',
      edgeReason: 'Breakthrough in metamaterial control meets BCI safety requirements',
      detailedGapAnalysis: {
        currentState: 'Brain-computer interfaces either require surgical implantation (high risk) or use external EEG (poor signal quality and spatial resolution).',
        technicalBarriers: [
          'Skull and tissue attenuate and distort neural signals',
          'Current metamaterials lack real-time programmability',
          'Limited understanding of optimal metamaterial geometries for neural signals',
          'Integration challenges between metamaterials and neural signal processing'
        ],
        marketBarriers: [
          'Medical device regulatory pathway extremely rigorous and slow',
          'High development costs for novel medical technologies',
          'Patient and physician acceptance of new BCI approaches'
        ],
        whyNow: [
          'Metamaterial fabrication becoming precise and scalable',
          'AI advances enabling real-time metamaterial control',
          'Growing BCI market driven by paralysis and neurological disorders',
          'Successful demonstrations of Neuralink increasing BCI interest'
        ],
        keyPlayers: [
          { name: 'Meta Reality Labs', role: 'Non-invasive BCI research' },
          { name: 'Metamaterial Technologies', role: 'Programmable metamaterial platforms' },
          { name: 'Kernel', role: 'Advanced neural interface development' },
          { name: 'Johns Hopkins APL', role: 'Neural interface research and validation' }
        ],
        researchQuestions: [
          'What metamaterial structures can focus and amplify neural signals?',
          'How do we achieve real-time programmable metamaterial control?',
          'Can metamaterials enable selective neural signal detection?',
          'What safety and biocompatibility requirements apply to metamaterial BCIs?'
        ],
        successMetrics: [
          'Demonstrate 10x improvement in non-invasive neural signal quality',
          'Achieve single-neuron resolution through skull with metamaterials',
          'Complete FDA approval pathway for metamaterial BCI device',
          'Enable high-bandwidth brain-computer communication without surgery'
        ]
      }
    },
    {
      id: 31,
      title: 'Programmable Matter Systems',
      source: 'ARIA',
      domain: 'Smart Materials',
      description: 'Materials that can change their physical properties on command',
      novelty: 'Revolutionary',
      funding: '£7.3M available',
      deadline: '2025-08-15',
      tags: ['programmable matter', 'smart materials', 'adaptive systems'],
      gapAnalysis: 'Current materials have fixed properties limiting adaptability',
      edgeReason: 'Advances in molecular machines enabling programmable material properties'
    }
  ];

  // Convergent Research opportunities
  const convergentOpportunities = [
    {
      id: 40,
      title: 'Distributed Fusion Energy Networks',
      source: 'Convergent Research',
      domain: 'Energy Systems',
      description: 'Small-scale fusion reactors in distributed grid architecture',
      novelty: 'High',
      funding: '$12.3M available',
      deadline: '2025-10-01',
      tags: ['fusion energy', 'distributed systems', 'grid technology'],
      gapAnalysis: 'Centralized fusion plants face transmission losses and grid stability issues',
      edgeReason: 'Miniaturization of fusion technology enables distributed deployment',
      detailedGapAnalysis: {
        currentState: 'Fusion research focuses on massive centralized plants (ITER, NIF). Power grids struggle with intermittent renewables and need distributed, controllable generation.',
        technicalBarriers: [
          'Scaling fusion reactions down while maintaining net energy gain',
          'Developing compact magnetic confinement systems',
          'Grid integration and control systems for distributed fusion',
          'Economic viability of smaller fusion reactors'
        ],
        marketBarriers: [
          'Utility industry preference for large, centralized power plants',
          'Regulatory framework designed for large nuclear facilities',
          'High capital costs even for smaller fusion systems'
        ],
        whyNow: [
          'Commonwealth Fusion, TAE Technologies achieving compact fusion milestones',
          'Grid instability from renewables creating demand for distributed controllable power',
          'Advances in high-temperature superconductors enabling smaller reactors',
          'Climate urgency driving investment in all clean energy approaches'
        ],
        keyPlayers: [
          { name: 'Commonwealth Fusion Systems', role: 'Compact tokamak development' },
          { name: 'TAE Technologies', role: 'Alternative confinement approaches' },
          { name: 'General Fusion', role: 'Magnetized target fusion' },
          { name: 'National Grid', role: 'Grid integration expertise' }
        ],
        researchQuestions: [
          'What is the minimum viable scale for net energy gain fusion?',
          'How do distributed fusion reactors integrate with smart grids?',
          'What safety and regulatory frameworks apply to small fusion reactors?',
          'Can fusion provide both baseload and load-following grid services?'
        ],
        successMetrics: [
          'Demonstrate net energy gain in sub-100MW fusion reactor',
          'Deploy pilot distributed fusion network in test community',
          'Achieve cost parity with natural gas peaker plants',
          'Scale to 1000+ distributed fusion reactors providing grid services'
        ]
      }
    },
    {
      id: 41,
      title: 'Focused Research Organizations for Climate',
      source: 'Convergent Research',
      domain: 'Climate Science',
      description: 'Coordinated research initiatives targeting specific climate intervention technologies',
      novelty: 'High',
      funding: '$25.0M available',
      deadline: '2025-11-15',
      tags: ['climate intervention', 'coordinated research', 'geoengineering'],
      gapAnalysis: 'Climate research fragmented across institutions with poor coordination',
      edgeReason: 'Climate urgency demanding coordinated breakthrough research approaches'
    }
  ];

  // Polyplexus opportunities
  const polyplexusOpportunities = [
    {
      id: 50,
      title: 'AI-Designed Biodegradable Electronics',
      source: 'Polyplexus',
      domain: 'Sustainable Computing',
      description: 'Machine learning for designing fully biodegradable electronic components',
      novelty: 'High',
      funding: '$3.7M available',
      deadline: '2025-11-30',
      tags: ['AI design', 'biodegradable materials', 'sustainable electronics'],
      gapAnalysis: 'Electronic waste crisis requires fundamental rethinking of device lifecycles',
      edgeReason: 'AI materials discovery meets urgent sustainability requirements',
      detailedGapAnalysis: {
        currentState: 'Electronic devices use non-biodegradable materials creating 50+ million tons of e-waste annually. Current recycling recovers <20% of materials.',
        technicalBarriers: [
          'Biodegradable materials typically have poor electrical properties',
          'Balancing device performance with biodegradability requirements',
          'Limited understanding of biodegradable semiconductor physics',
          'Manufacturing processes not designed for biodegradable materials'
        ],
        marketBarriers: [
          'Consumer expectations for device durability and performance',
          'Electronics industry optimized for silicon-based manufacturing',
          'Regulatory standards not designed for biodegradable electronics'
        ],
        whyNow: [
          'AI materials discovery (DeepMind AlphaFold) proving transformative',
          'E-waste crisis reaching critical levels globally',
          'EU Right to Repair legislation driving sustainable electronics',
          'Advances in organic electronics and bio-based materials'
        ],
        keyPlayers: [
          { name: 'Google DeepMind', role: 'AI materials discovery platforms' },
          { name: 'Soluboard', role: 'Biodegradable PCB development' },
          { name: 'Jiva Materials', role: 'Bio-based electronic materials' },
          { name: 'Ellen MacArthur Foundation', role: 'Circular economy advocacy' }
        ],
        researchQuestions: [
          'Can AI discover biodegradable materials with semiconductor properties?',
          'How do we design electronics for controlled biodegradation?',
          'What manufacturing processes work for biodegradable electronics?',
          'How do we balance performance, cost, and biodegradability?'
        ],
        successMetrics: [
          'AI discovers biodegradable material with silicon-level performance',
          'Demonstrate fully biodegradable smartphone prototype',
          'Achieve regulatory approval for biodegradable electronics',
          'Scale to commercial production of biodegradable consumer electronics'
        ]
      }
    },
    {
      id: 51,
      title: 'Decentralized Scientific Computing',
      source: 'Polyplexus',
      domain: 'Distributed Computing',
      description: 'Blockchain-based platform for sharing and validating scientific computations',
      novelty: 'High',
      funding: '$4.2M available',
      deadline: '2025-09-30',
      tags: ['blockchain', 'scientific computing', 'decentralization'],
      gapAnalysis: 'Scientific computing resources concentrated in few institutions',
      edgeReason: 'Blockchain technology enabling trustless scientific collaboration'
    }
  ];

  // Combine all opportunities
  const allOpportunities = [
    ...darpaOpportunities,
    ...arpaHOpportunities, 
    ...sprindOpportunities,
    ...ariaOpportunities,
    ...convergentOpportunities,
    ...polyplexusOpportunities
  ];

  // Combine default and custom sources
  const allSources = [...defaultSources, ...customSources];

  const addCustomSource = () => {
    if (newSource.name && newSource.url) {
      const source = {
        ...newSource,
        id: newSource.name.toLowerCase().replace(/\s+/g, '-'),
        challenges: 0, // Will be populated when data is synced
        focusAreas: newSource.focusAreas.length > 0 ? newSource.focusAreas : ['General Research']
      };
      setCustomSources([...customSources, source]);
      setNewSource({
        name: '',
        url: '',
        description: '',
        type: 'agency',
        parentAgency: '',
        focusAreas: [],
        color: 'bg-indigo-600'
      });
      setShowAddSource(false);
    }
  };

  const removeCustomSource = (sourceId: string) => {
    setCustomSources(customSources.filter(s => s.id !== sourceId));
  };

  const colorOptions = [
    'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-red-600', 
    'bg-amber-600', 'bg-indigo-600', 'bg-pink-600', 'bg-teal-600',
    'bg-orange-600', 'bg-cyan-600', 'bg-lime-600', 'bg-rose-600'
  ];

  const noveltyColors = {
    'Revolutionary': 'bg-purple-100 text-purple-800 border-purple-200',
    'High': 'bg-blue-100 text-blue-800 border-blue-200',
    'Medium': 'bg-green-100 text-green-800 border-green-200'
  };

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call to search across challenge sources
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  const openGapAnalysis = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowGapAnalysis(true);
  };

  // Filter opportunities based on search and source
  React.useEffect(() => {
    const filtered = allOpportunities.filter(opp => {
      const matchesSearch = searchQuery === '' || 
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSource = selectedSource === 'All' || opp.source === selectedSource;
      
      return matchesSearch && matchesSource;
    });
    setFilteredOpportunities(filtered);
  }, [searchQuery, selectedSource]);

  // Update challenge source counts based on actual data
  const getSourceCount = (sourceName) => {
    return allOpportunities.filter(opp => opp.source === sourceName).length;
  };

  const updatedSources = allSources.map(source => ({
    ...source,
    challenges: source.name === 'All' ? allOpportunities.length : getSourceCount(source.name)
  }));

  const filteredOpportunities2 = allOpportunities.filter(opp => {
    const matchesSearch = searchQuery === '' || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSource = selectedSource === 'All' || opp.source === selectedSource;
    
    return matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-6">
      <DataSyncStatus />
      <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Research Frontier Explorer</h2>
          <p className="text-slate-600">
            Discover cutting-edge research opportunities from leading innovation agencies and challenge platforms
          </p>
        </div>

        {/* Search Interface */}
        <div className="mb-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search domains, technologies, or unmet needs (e.g., 'quantum biology', 'climate adaptation', 'neural interfaces')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                isSearching 
                  ? 'bg-blue-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSearching ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search size={16} />
                  <span>Explore Edges</span>
                </>
              )}
            </button>
          </div>

          {/* Source Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
            <Filter size={16} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Sources:</span>
            <button
              onClick={() => setSelectedSource('All')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedSource === 'All'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({allOpportunities.length})
            </button>
            {updatedSources.slice(0, 6).map((source) => (
              <button
                key={source.id}
                onClick={() => setSelectedSource(source.name)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedSource === source.name
                    ? `${source.color} text-white`
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {source.name} ({source.challenges})
              </button>
            ))}
            {updatedSources.length > 6 && (
              <button
                onClick={() => setShowManageSources(true)}
                className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-200"
              >
                +{updatedSources.length - 6} more
              </button>
            )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAddSource(true)}
                className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm"
              >
                <Plus size={14} />
                <span>Add Source</span>
              </button>
              <button
                onClick={() => setShowManageSources(true)}
                className="flex items-center space-x-2 px-3 py-1 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200 text-sm"
              >
                <Settings size={14} />
                <span>Manage</span>
              </button>
            </div>
          </div>
        </div>

        {/* Challenge Sources Overview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <Globe size={18} className="text-blue-600" />
            <span>Grand Challenge Sources</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {updatedSources.map((source) => (
              <div key={source.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                    {source.type === 'office' && (
                      <Building size={12} className="text-slate-400" />
                    )}
                  </div>
                  <a 
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <button
                  onClick={() => setSelectedSource(source.name)}
                  className="font-semibold text-slate-900 mb-1 hover:text-blue-600 transition-colors duration-200 text-left"
                >
                  {source.name}
                  {source.parentAgency && (
                    <span className="text-xs text-slate-500 ml-1">({source.parentAgency})</span>
                  )}
                </button>
                <p className="text-sm text-slate-600 mb-2">{source.description}</p>
                {source.focusAreas && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {source.focusAreas.slice(0, 2).map((area, index) => (
                      <span key={index} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                        {area}
                      </span>
                    ))}
                    {source.focusAreas.length > 2 && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">
                        +{source.focusAreas.length - 2}
                      </span>
                    )}
                  </div>
                )}
                <button
                  onClick={() => setSelectedSource(source.name)}
                  className="text-xs text-slate-500 hover:text-blue-600 transition-colors duration-200"
                >
                  {source.challenges} active challenges
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Edge Opportunities */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <Zap size={18} className="text-amber-600" />
              <span>Current Edge Opportunities ({filteredOpportunities.length})</span>
            </h3>
            {searchQuery && (
              <div className="text-sm text-slate-600">
                Showing results for "{searchQuery}"
              </div>
            )}
          </div>

          {filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-slate-900">{opportunity.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${noveltyColors[opportunity.novelty]}`}>
                      {opportunity.novelty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-3">
                    <span className="font-medium">{opportunity.source}</span>
                    <span>•</span>
                    <span>{opportunity.domain}</span>
                    <span>•</span>
                    <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-700 mb-4">{opportunity.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-semibold text-green-600 mb-1">{opportunity.funding}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {opportunity.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <h5 className="font-medium text-amber-900 mb-1 flex items-center space-x-2">
                    <AlertCircle size={14} />
                    <span>Gap Analysis</span>
                  </h5>
                  <p className="text-amber-800 text-sm">{opportunity.gapAnalysis}</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-1 flex items-center space-x-2">
                    <TrendingUp size={14} />
                    <span>Why This is an Edge</span>
                  </h5>
                  <p className="text-blue-800 text-sm">{opportunity.edgeReason}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span className="flex items-center space-x-1">
                    <Target size={14} className="text-blue-500" />
                    <span>High Impact Potential</span>
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200">
                    Analyze Gap
                  </button>
                  <button 
                    onClick={() => openGapAnalysis(opportunity)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Lightbulb size={16} />
                    <span>Explore This Edge</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredOpportunities.length === 0 && searchQuery && (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
              <Search size={48} className="text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No edges found</h3>
              <p className="text-slate-600">Try different search terms or explore all available opportunities</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Show All Opportunities
              </button>
              {selectedSource !== 'All' && (
                <button
                  onClick={() => setSelectedSource('All')}
                  className="mt-2 ml-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200"
                >
                  Show All Sources
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Detailed Gap Analysis Modal */}
      {showGapAnalysis && selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                    <Target className="text-blue-600" size={24} />
                    <span>{selectedOpportunity.title}</span>
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mt-2">
                    <span className="font-medium">{selectedOpportunity.source}</span>
                    <span>•</span>
                    <span>{selectedOpportunity.domain}</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">{selectedOpportunity.funding}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowGapAnalysis(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors duration-200 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {selectedOpportunity.detailedGapAnalysis ? (
                <div className="space-y-6">
                  {/* Current State */}
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center space-x-2">
                      <AlertCircle size={16} className="text-slate-600" />
                      <span>Current State</span>
                    </h4>
                    <p className="text-slate-700">{selectedOpportunity.detailedGapAnalysis.currentState}</p>
                  </div>

                  {/* Technical Barriers */}
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center space-x-2">
                      <AlertCircle size={16} className="text-red-600" />
                      <span>Technical Barriers</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedOpportunity.detailedGapAnalysis.technicalBarriers?.map((barrier, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-red-800">{barrier}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Market Barriers */}
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-3 flex items-center space-x-2">
                      <TrendingUp size={16} className="text-orange-600" />
                      <span>Market Barriers</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedOpportunity.detailedGapAnalysis.marketBarriers?.map((barrier, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span className="text-orange-800">{barrier}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Why Now */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
                      <Zap size={16} className="text-green-600" />
                      <span>Why Now? (Convergent Factors)</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedOpportunity.detailedGapAnalysis.whyNow?.map((factor, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-green-800">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Players */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                      <Users size={16} className="text-blue-600" />
                      <span>Key Players</span>
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedOpportunity.detailedGapAnalysis.keyPlayers?.map((player, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-blue-200">
                          <div className="font-medium text-blue-900">{player.name}</div>
                          <div className="text-sm text-blue-700">{player.role}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Research Questions */}
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-3 flex items-center space-x-2">
                      <Lightbulb size={16} className="text-purple-600" />
                      <span>Key Research Questions</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedOpportunity.detailedGapAnalysis.researchQuestions?.map((question, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-purple-600 mt-1 font-bold">{index + 1}.</span>
                          <span className="text-purple-800">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Success Metrics */}
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-3 flex items-center space-x-2">
                      <Target size={16} className="text-amber-600" />
                      <span>Success Metrics</span>
                    </h4>
                    <ul className="space-y-2">
                      {selectedOpportunity.detailedGapAnalysis.successMetrics?.map((metric, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-amber-600 mt-1">✓</span>
                          <span className="text-amber-800">{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle size={48} className="text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Limited Analysis Available</h3>
                  <p className="text-slate-600 mb-4">
                    Detailed gap analysis is not available for this opportunity yet.
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 text-left max-w-md mx-auto">
                    <h4 className="font-medium text-slate-900 mb-2">Basic Information:</h4>
                    <div className="space-y-2 text-sm text-slate-700">
                      <p><strong>Gap:</strong> {selectedOpportunity.gapAnalysis}</p>
                      <p><strong>Edge Reason:</strong> {selectedOpportunity.edgeReason}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Ready to explore this frontier? Choose your next step:
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowGapAnalysis(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setShowGapAnalysis(false);
                      // Switch to Problem Finding tab and seed with this opportunity
                      window.dispatchEvent(new CustomEvent('seedProblemFinding', { 
                        detail: selectedOpportunity 
                      }));
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Target size={16} />
                    <span>Deep Dive Problems</span>
                  </button>
                  <button 
                    onClick={() => {
                      setShowGapAnalysis(false);
                      // Switch to Solver Network tab and seed with this opportunity
                      window.dispatchEvent(new CustomEvent('seedSolverNetwork', { 
                        detail: selectedOpportunity 
                      }));
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Users size={16} />
                    <span>Find Collaborators</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Source Modal */}
      {showAddSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                  <Plus className="text-green-600" size={20} />
                  <span>Add Custom Research Source</span>
                </h3>
                <button
                  onClick={() => setShowAddSource(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Source Name *</label>
                  <input
                    type="text"
                    value={newSource.name}
                    onChange={(e) => setNewSource({...newSource, name: e.target.value})}
                    placeholder="e.g., JEDI Foundation"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                  <select
                    value={newSource.type}
                    onChange={(e) => setNewSource({...newSource, type: e.target.value})}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="agency">Government Agency</option>
                    <option value="office">Agency Office/Division</option>
                    <option value="foundation">Foundation/Institute</option>
                    <option value="program">Research Program</option>
                    <option value="platform">Challenge Platform</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">URL *</label>
                <input
                  type="url"
                  value={newSource.url}
                  onChange={(e) => setNewSource({...newSource, url: e.target.value})}
                  placeholder="https://www.jedi.foundation/"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={newSource.description}
                  onChange={(e) => setNewSource({...newSource, description: e.target.value})}
                  placeholder="Brief description of the research source and its focus"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={2}
                />
              </div>
              
              {newSource.type === 'office' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Parent Agency</label>
                  <input
                    type="text"
                    value={newSource.parentAgency}
                    onChange={(e) => setNewSource({...newSource, parentAgency: e.target.value})}
                    placeholder="e.g., DARPA"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Focus Areas</label>
                <input
                  type="text"
                  value={newSource.focusAreas.join(', ')}
                  onChange={(e) => setNewSource({...newSource, focusAreas: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                  placeholder="e.g., Deep Tech, Disruptive Innovation, Strategic Autonomy"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-slate-500 mt-1">Separate multiple areas with commas</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Color Theme</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewSource({...newSource, color})}
                      className={`w-8 h-8 rounded-full ${color} ${
                        newSource.color === color ? 'ring-2 ring-slate-400 ring-offset-2' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Add custom research sources to track specialized R&D opportunities
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddSource(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addCustomSource}
                    disabled={!newSource.name || !newSource.url}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Source
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Sources Modal */}
      {showManageSources && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[85vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
                  <Settings className="text-blue-600" size={20} />
                  <span>Manage Research Sources</span>
                </h3>
                <button
                  onClick={() => setShowManageSources(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-6">
                {/* Default Sources */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Default Sources</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {defaultSources.map((source) => (
                      <div key={source.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                          <div>
                            <div className="font-medium text-slate-900">{source.name}</div>
                            <div className="text-xs text-slate-500">{source.type} • {source.challenges} challenges</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedSource(source.name)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
                        >
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Custom Sources */}
                {customSources.length > 0 && (
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Custom Sources</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {customSources.map((source) => (
                        <div key={source.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                            <div>
                              <div className="font-medium text-slate-900">{source.name}</div>
                              <div className="text-xs text-slate-500">{source.type} • {source.challenges} challenges</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedSource(source.name)}
                              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
                            >
                              Select
                            </button>
                            <button
                              onClick={() => removeCustomSource(source.id)}
                              className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  {allSources.length} total sources • {customSources.length} custom
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowManageSources(false);
                      setShowAddSource(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add Source</span>
                  </button>
                  <button
                    onClick={() => setShowManageSources(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors duration-200"
                  >
                    Close
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