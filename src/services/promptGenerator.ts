interface ExplorationContext {
  currentChallenge: string;
  domain: string;
  activeGaps: string[];
  methodsUsed: string[];
  insights: string[];
  recombinationMode: boolean;
  wildcardMode: boolean;
}

interface SuperConnectorPrompt {
  searchQuery: string;
  contextualPrompt: string;
  collaboratorCriteria: string[];
  crossDomainHints: string[];
  methodologyNeeds: string[];
}

export class PromptGenerator {
  generateSuperConnectorPrompt(context: ExplorationContext): SuperConnectorPrompt {
    const challenge = this.extractChallengeKeywords(context.currentChallenge);
    const domainExpertise = this.mapDomainToExpertise(context.domain);
    const gapAnalysis = this.analyzeGaps(context.activeGaps);
    const methodologyNeeds = this.identifyMethodologyNeeds(context.methodsUsed);
    
    // Generate main search query
    const searchQuery = this.buildSearchQuery(challenge, domainExpertise, gapAnalysis);
    
    // Generate contextual prompt for SuperConnector
    const contextualPrompt = this.buildContextualPrompt(context, challenge, gapAnalysis);
    
    // Define collaborator criteria
    const collaboratorCriteria = this.defineCollaboratorCriteria(context, domainExpertise);
    
    // Generate cross-domain hints if in wildcard mode
    const crossDomainHints = context.wildcardMode ? 
      this.generateCrossDomainHints(context.domain, challenge) : [];
    
    return {
      searchQuery,
      contextualPrompt,
      collaboratorCriteria,
      crossDomainHints,
      methodologyNeeds
    };
  }

  private extractChallengeKeywords(challenge: string): string[] {
    const challengeMap = {
      'quantum-error-correction': ['quantum computing', 'error correction', 'fault tolerance', 'quantum systems', 'decoherence'],
      'protein-folding': ['protein folding', 'structural biology', 'molecular dynamics', 'computational biology', 'drug discovery'],
      'climate-modeling': ['climate science', 'atmospheric modeling', 'environmental systems', 'earth science', 'sustainability'],
      'neural-interfaces': ['brain-computer interfaces', 'neurotechnology', 'neural engineering', 'biomedical devices', 'neuroscience']
    };
    
    return challengeMap[challenge] || [challenge.replace('-', ' ')];
  }

  private mapDomainToExpertise(domain: string): string[] {
    const domainMap = {
      'Quantum Computing': ['quantum mechanics', 'quantum algorithms', 'quantum hardware', 'quantum information theory'],
      'Biotechnology': ['molecular biology', 'genetic engineering', 'bioinformatics', 'synthetic biology'],
      'Environmental Science': ['climate modeling', 'environmental engineering', 'sustainability science', 'earth systems'],
      'Neurotechnology': ['neuroscience', 'biomedical engineering', 'signal processing', 'medical devices']
    };
    
    return domainMap[domain] || [domain.toLowerCase()];
  }

  private analyzeGaps(gaps: string[]): { primary: string[], secondary: string[] } {
    // Categorize gaps into primary (direct) and secondary (related) areas
    const primary = gaps.slice(0, 3); // Most relevant gaps
    const secondary = gaps.slice(3); // Additional context gaps
    
    return { primary, secondary };
  }

  private identifyMethodologyNeeds(methodsUsed: string[]): string[] {
    const methodologyMap = {
      'rose-thorn-bud': ['design thinking', 'user research', 'problem identification'],
      'systems-mapping': ['systems thinking', 'complexity science', 'network analysis'],
      'rapid-prototyping': ['prototyping', 'iterative design', 'experimental validation'],
      'scenario-planning': ['futures research', 'strategic planning', 'risk assessment']
    };
    
    const needs = [];
    methodsUsed.forEach(method => {
      if (methodologyMap[method]) {
        needs.push(...methodologyMap[method]);
      }
    });
    
    return [...new Set(needs)]; // Remove duplicates
  }

  private buildSearchQuery(challenge: string[], expertise: string[], gaps: { primary: string[], secondary: string[] }): string {
    const primaryTerms = [...challenge.slice(0, 2), ...expertise.slice(0, 2)];
    const gapTerms = gaps.primary.slice(0, 2);
    
    return [...primaryTerms, ...gapTerms].join(' OR ');
  }

  private buildContextualPrompt(context: ExplorationContext, challenge: string[], gaps: { primary: string[], secondary: string[] }): string {
    const challengeDesc = challenge.join(', ');
    const primaryGaps = gaps.primary.join(', ');
    
    let prompt = `I'm exploring ${challengeDesc} and have identified key research gaps including: ${primaryGaps}. `;
    
    if (context.recombinationMode) {
      prompt += `I'm particularly interested in cross-domain collaboration and novel recombination approaches. `;
    }
    
    if (context.wildcardMode) {
      prompt += `I'm open to wildcard collaborators from unexpected fields who might bring fresh perspectives. `;
    }
    
    if (context.methodsUsed.length > 0) {
      prompt += `I'm using systematic innovation methods including ${context.methodsUsed.join(', ')} to structure my exploration. `;
    }
    
    prompt += `Looking for collaborators who can contribute expertise, novel approaches, or complementary perspectives to advance this research frontier.`;
    
    return prompt;
  }

  private defineCollaboratorCriteria(context: ExplorationContext, expertise: string[]): string[] {
    const criteria = [
      `Direct expertise in: ${expertise.join(', ')}`,
      'Active in research or innovation',
      'Open to collaboration'
    ];
    
    if (context.recombinationMode) {
      criteria.push('Experience with interdisciplinary work');
      criteria.push('Track record of cross-domain innovation');
    }
    
    if (context.wildcardMode) {
      criteria.push('Unconventional background or perspective');
      criteria.push('Experience applying methods from other fields');
    }
    
    return criteria;
  }

  private generateCrossDomainHints(currentDomain: string, challenge: string[]): string[] {
    const crossDomainMap = {
      'Quantum Computing': [
        'Biology: DNA error correction mechanisms',
        'Network Theory: Distributed fault tolerance',
        'Materials Science: Error-resistant structures',
        'Information Theory: Coding theory applications'
      ],
      'Biotechnology': [
        'Computer Science: Algorithm optimization',
        'Materials Science: Biomimetic materials',
        'Physics: Molecular dynamics',
        'Engineering: Process optimization'
      ],
      'Environmental Science': [
        'Data Science: Predictive modeling',
        'Economics: Market mechanisms',
        'Social Science: Behavior change',
        'Engineering: System optimization'
      ],
      'Neurotechnology': [
        'Computer Science: Signal processing',
        'Materials Science: Biocompatible materials',
        'Psychology: Human factors',
        'Engineering: Device design'
      ]
    };
    
    return crossDomainMap[currentDomain] || [
      'Look for analogous problems in other fields',
      'Consider experts who have solved similar challenges',
      'Explore adjacent domains with relevant methodologies'
    ];
  }

  // Generate URL with embedded prompt for SuperConnector
  generateSuperConnectorURL(prompt: SuperConnectorPrompt, baseContext: ExplorationContext): string {
    // Since SuperConnector's search URL structure is unknown, 
    // just open the main page where users can manually search
    return 'https://superconnector.network';
  }

  // Generate a human-readable prompt that users can copy/paste
  generateCopyablePrompt(prompt: SuperConnectorPrompt): string {
    let copyablePrompt = `🔍 COLLABORATION REQUEST\n\n`;
    copyablePrompt += `${prompt.contextualPrompt}\n\n`;
    
    copyablePrompt += `🎯 LOOKING FOR:\n`;
    prompt.collaboratorCriteria.forEach(criteria => {
      copyablePrompt += `• ${criteria}\n`;
    });
    
    if (prompt.crossDomainHints.length > 0) {
      copyablePrompt += `\n🌐 CROSS-DOMAIN OPPORTUNITIES:\n`;
      prompt.crossDomainHints.forEach(hint => {
        copyablePrompt += `• ${hint}\n`;
      });
    }
    
    if (prompt.methodologyNeeds.length > 0) {
      copyablePrompt += `\n🛠️ METHODOLOGY EXPERTISE NEEDED:\n`;
      prompt.methodologyNeeds.forEach(method => {
        copyablePrompt += `• ${method}\n`;
      });
    }
    
    copyablePrompt += `\n📊 Generated by EdgeFinder - Systematic Research Exploration Platform`;
    
    return copyablePrompt;
  }
}

export const promptGenerator = new PromptGenerator();