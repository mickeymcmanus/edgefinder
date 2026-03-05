// SuperConnector API Integration Service
export interface SuperConnectorProfile {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  location: string;
  avatar?: string;
  bio: string;
  projects: string[];
  skills: string[];
  interests: string[];
  availability: 'available' | 'busy' | 'unavailable';
  responseRate: number;
  rating: number;
  connections: number;
  verified: boolean;
}

export interface EdgeFinderInsight {
  id: string;
  type: 'gap' | 'problem' | 'solution' | 'method' | 'connection';
  title: string;
  description: string;
  domain: string;
  tags: string[];
  relevanceScore: number;
  contributors: string[];
  timestamp: string;
  methodology?: string;
  crossDomainPotential?: number;
}

export interface RecombinationOpportunity {
  id: string;
  domains: string[];
  description: string;
  potentialImpact: 'low' | 'medium' | 'high' | 'revolutionary';
  confidence: number;
  requiredExpertise: string[];
  suggestedCollaborators: string[];
}

class SuperConnectorService {
  private baseUrl = 'https://api.superconnector.network/v1';
  private edgeFinderApiKey = import.meta.env.VITE_EDGEFINDER_API_KEY;

  // Fetch relevant profiles based on challenge
  async searchProfiles(query: string, filters?: {
    domains?: string[];
    availability?: string;
    location?: string;
    includeWildcards?: boolean;
  }): Promise<SuperConnectorProfile[]> {
    try {
      const params = new URLSearchParams({
        q: query,
        source: 'edgefinder',
        include_wildcards: filters?.includeWildcards ? 'true' : 'false',
        ...filters
      });

      const response = await fetch(`${this.baseUrl}/search/profiles?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.edgeFinderApiKey}`,
          'Content-Type': 'application/json',
          'X-Source-App': 'EdgeFinder'
        }
      });

      if (!response.ok) {
        console.warn(`SuperConnector API unavailable (${response.status}), using fallback data`);
        return this.getFallbackProfiles(query);
      }

      return await response.json();
    } catch (error) {
      console.warn('SuperConnector API connection failed, using fallback data:', error);
      return this.getFallbackProfiles(query);
    }
  }

  // Send EdgeFinder insights to SuperConnector
  async enrichSuperConnector(insights: EdgeFinderInsight[]): Promise<boolean> {
    try {
      const payload = {
        source: 'edgefinder',
        insights: insights.map(insight => ({
          ...insight,
          metadata: {
            generatedBy: 'EdgeFinder',
            methodology: insight.methodology,
            crossDomainPotential: insight.crossDomainPotential,
            timestamp: new Date().toISOString()
          }
        }))
      };

      const response = await fetch(`${this.baseUrl}/insights/enrich`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.edgeFinderApiKey}`,
          'Content-Type': 'application/json',
          'X-Source-App': 'EdgeFinder'
        },
        body: JSON.stringify(payload)
      });

      return response.ok;
    } catch (error) {
      console.error('Error enriching SuperConnector:', error);
      return false;
    }
  }

  // Send recombination opportunities discovered by EdgeFinder
  async shareRecombinationOpportunities(opportunities: RecombinationOpportunity[]): Promise<boolean> {
    try {
      const payload = {
        source: 'edgefinder',
        opportunities: opportunities.map(opp => ({
          ...opp,
          discoveryMethod: 'EdgeFinder Multi-Dimensional Analysis',
          timestamp: new Date().toISOString()
        }))
      };

      const response = await fetch(`${this.baseUrl}/opportunities/recombination`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.edgeFinderApiKey}`,
          'Content-Type': 'application/json',
          'X-Source-App': 'EdgeFinder'
        },
        body: JSON.stringify(payload)
      });

      return response.ok;
    } catch (error) {
      console.error('Error sharing recombination opportunities:', error);
      return false;
    }
  }

  // Get cross-domain suggestions from SuperConnector
  async getCrossDomainSuggestions(currentDomain: string, challenge: string): Promise<SuperConnectorProfile[]> {
    try {
      const response = await fetch(`${this.baseUrl}/suggestions/cross-domain`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.edgeFinderApiKey}`,
          'Content-Type': 'application/json',
          'X-Source-App': 'EdgeFinder'
        },
        body: JSON.stringify({
          currentDomain,
          challenge,
          requestWildcards: true,
          recombinationFocus: true
        })
      });

      if (!response.ok) {
        throw new Error(`SuperConnector API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting cross-domain suggestions:', error);
      return [];
    }
  }

  // Sync EdgeFinder discoveries with SuperConnector profiles
  async syncDiscoveries(discoveries: {
    gaps: any[];
    problems: any[];
    methods: any[];
    insights: any[];
  }): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/sync/edgefinder`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.edgeFinderApiKey}`,
          'Content-Type': 'application/json',
          'X-Source-App': 'EdgeFinder'
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          discoveries,
          metadata: {
            version: '1.0',
            methodology: 'LUMA + Multi-Dimensional Problem Finding'
          }
        })
      });
    } catch (error) {
      console.error('Error syncing discoveries:', error);
    }
  }

  // Fallback data when API is unavailable
  public getFallbackProfiles(query: string): SuperConnectorProfile[] {
    // Return mock data as fallback
    return [
      {
        id: 'fallback-1',
        name: 'Dr. Sarah Chen',
        title: 'Quantum Systems Researcher',
        expertise: ['Quantum Computing', 'Error Correction', 'Theoretical Physics'],
        location: 'Stanford, CA',
        bio: 'Leading researcher in quantum error correction protocols',
        projects: ['Quantum Error Correction', 'Fault-Tolerant Computing'],
        skills: ['Python', 'Qiskit', 'Theoretical Analysis'],
        interests: ['Quantum Algorithms', 'Error Mitigation'],
        availability: 'available',
        responseRate: 0.95,
        rating: 4.9,
        connections: 234,
        verified: true
      }
    ];
  }
}

export const superConnectorService = new SuperConnectorService();