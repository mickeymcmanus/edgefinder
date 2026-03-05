# EdgeFinder Architecture

This document provides a comprehensive overview of EdgeFinder's architecture, design patterns, and technical decisions.

## 🏗️ System Overview

EdgeFinder is a React-based single-page application (SPA) designed for systematic research exploration and innovation discovery. The architecture follows modern React patterns with TypeScript, emphasizing modularity, maintainability, and scalability.

## 📁 Project Structure

```
edgefinder/
├── src/
│   ├── components/           # React components
│   │   ├── ExploreEdges.tsx
│   │   ├── IdeaSpaceMap.tsx
│   │   ├── SolverNetwork.tsx
│   │   ├── ProblemFinding.tsx
│   │   ├── LUMAMethods.tsx
│   │   ├── Insights.tsx
│   │   ├── KnowledgeAccumulation.tsx
│   │   ├── TechnoscientificFramework.tsx
│   │   ├── Navigation.tsx
│   │   └── DataSyncStatus.tsx
│   ├── services/             # External API integrations
│   │   ├── superconnector.ts
│   │   └── promptGenerator.ts
│   ├── hooks/                # Custom React hooks
│   │   └── useSuperConnectorSync.ts
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── docs/                     # Documentation
└── .github/                  # GitHub templates and workflows
```

## 🧩 Component Architecture

### **Core Components**

#### **1. ExploreEdges**
- **Purpose**: Research frontier discovery and opportunity identification
- **Key Features**: Multi-dimensional analysis, real-time data integration
- **Dependencies**: Research database APIs, AI analysis services

#### **2. IdeaSpaceMap**
- **Purpose**: Interactive visualization of research landscapes
- **Key Features**: Google Earth-style navigation, terrain mapping, solver contributions
- **Dependencies**: Visualization libraries, real-time data sync

#### **3. SolverNetwork**
- **Purpose**: Intelligent researcher matching and collaboration
- **Key Features**: AI-powered matching, SuperConnector integration, recombination mode
- **Dependencies**: SuperConnector API, prompt generation service

#### **4. ProblemFinding**
- **Purpose**: Multi-dimensional problem discovery
- **Key Features**: 5-dimension exploration, AI-generated questions, seeded exploration
- **Dependencies**: AI services, knowledge databases

#### **5. LUMAMethods**
- **Purpose**: Human-centered design method library
- **Key Features**: Interactive method recipes, drag-and-drop interface, session management
- **Dependencies**: LUMA Institute methodology

#### **6. Insights**
- **Purpose**: Research intelligence dashboard
- **Key Features**: Deep analytics, pattern recognition, breakthrough prediction
- **Dependencies**: Analytics services, data aggregation

#### **7. KnowledgeAccumulation**
- **Purpose**: Crowd wisdom and concept fitness testing
- **Key Features**: Multiple algorithms, real-time testing, solver participation
- **Dependencies**: Crowd wisdom algorithms, real-time communication

#### **8. TechnoscientificFramework**
- **Purpose**: Innovation theory visualization and education
- **Key Features**: Interactive framework, co-evolution visualization, concept definitions
- **Dependencies**: Theoretical framework data

## 🔧 Service Layer

### **SuperConnector Integration**
```typescript
class SuperConnectorService {
  // Profile search and matching
  async searchProfiles(query: string, filters?: SearchFilters): Promise<Profile[]>
  
  // Data enrichment
  async enrichSuperConnector(insights: EdgeFinderInsight[]): Promise<boolean>
  
  // Recombination opportunities
  async shareRecombinationOpportunities(opportunities: RecombinationOpportunity[]): Promise<boolean>
  
  // Cross-domain suggestions
  async getCrossDomainSuggestions(domain: string, challenge: string): Promise<Profile[]>
}
```

### **Prompt Generation Service**
```typescript
class PromptGenerator {
  // Context-aware prompt generation
  generateSuperConnectorPrompt(context: ExplorationContext): SuperConnectorPrompt
  
  // Human-readable prompts
  generateCopyablePrompt(prompt: SuperConnectorPrompt): string
  
  // URL generation with embedded context
  generateSuperConnectorURL(prompt: SuperConnectorPrompt, context: ExplorationContext): string
}
```

## 🔄 Data Flow

### **State Management**
EdgeFinder uses React's built-in state management with hooks:
- **Local State**: `useState` for component-specific state
- **Shared State**: Custom hooks for cross-component state
- **Persistent State**: `localStorage` for user preferences and session data

### **Data Synchronization**
```typescript
// Real-time sync hook
const useSuperConnectorSync = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle');
  
  // Auto-sync every 5 minutes
  useEffect(() => {
    const syncInterval = setInterval(syncDiscoveries, 300000);
    return () => clearInterval(syncInterval);
  }, []);
  
  return { isConnected, syncStatus, syncDiscoveries };
};
```

### **Event System**
Cross-component communication using custom events:
```typescript
// Seed Problem Finding from other components
window.dispatchEvent(new CustomEvent('seedProblemFinding', { 
  detail: { title, domain, gapAnalysis } 
}));

// Seed Solver Network from exploration
window.dispatchEvent(new CustomEvent('seedSolverNetwork', { 
  detail: { opportunity, domain, funding } 
}));
```

## 🎨 Design System

### **Color Palette**
```css
:root {
  /* Primary Colors */
  --blue-600: #2563eb;    /* Primary actions */
  --purple-600: #9333ea;  /* Innovation/creativity */
  --green-600: #16a34a;   /* Success/completion */
  --amber-600: #d97706;   /* Warnings/attention */
  --red-600: #dc2626;     /* Errors/critical */
  
  /* Neutral Colors */
  --slate-50: #f8fafc;    /* Background */
  --slate-600: #475569;   /* Secondary text */
  --slate-900: #0f172a;   /* Primary text */
}
```

### **Spacing System**
- **8px base unit** - All spacing follows 8px increments
- **Consistent margins** - `space-2` (8px), `space-4` (16px), `space-6` (24px)
- **Visual hierarchy** - Larger spacing for section breaks

### **Typography**
- **Font weights**: 3 maximum (normal, medium, bold)
- **Line spacing**: 150% for body text, 120% for headings
- **Hierarchy**: Clear distinction between heading levels

## 🔌 Integration Patterns

### **API Integration**
```typescript
// Service pattern with fallback
class APIService {
  async fetchData(): Promise<Data[]> {
    try {
      const response = await fetch(this.endpoint);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn('API unavailable, using fallback');
      return this.getFallbackData();
    }
  }
}
```

### **Error Handling**
- **Graceful degradation** - Fallback data when APIs are unavailable
- **User feedback** - Clear error messages and recovery options
- **Logging** - Comprehensive error logging for debugging

### **Performance Optimization**
- **Code splitting** - Dynamic imports for large components
- **Lazy loading** - Load components on demand
- **Memoization** - React.memo for expensive components
- **Debouncing** - User input debouncing for search

## 🧪 Testing Strategy

### **Testing Pyramid**
1. **Unit Tests** - Individual component and function testing
2. **Integration Tests** - Component interaction testing
3. **E2E Tests** - Complete user workflow testing

### **Testing Tools**
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **Cypress** - End-to-end testing (planned)

## 🚀 Deployment Architecture

### **Build Process**
```bash
# Development
npm run dev          # Vite dev server with HMR

# Production
npm run build        # TypeScript compilation + Vite build
npm run preview      # Preview production build
```

### **Static Site Deployment**
- **Bolt Hosting** - Current deployment platform
- **CDN Distribution** - Global content delivery
- **Custom Domains** - Support for production domains

## 🔒 Security Considerations

### **API Security**
- **Environment variables** - Secure API key storage
- **CORS handling** - Proper cross-origin request management
- **Input validation** - Client-side input sanitization

### **Data Privacy**
- **Local storage** - Minimal sensitive data storage
- **API communication** - HTTPS-only communication
- **User consent** - Clear data usage policies

## 📈 Scalability Patterns

### **Component Scalability**
- **Modular architecture** - Independent, reusable components
- **Props interface** - Clear component contracts
- **Composition over inheritance** - Flexible component composition

### **Data Scalability**
- **Pagination** - Large dataset handling
- **Caching** - Intelligent data caching strategies
- **Lazy loading** - On-demand data loading

### **Performance Monitoring**
- **Bundle analysis** - Regular bundle size monitoring
- **Performance metrics** - Core Web Vitals tracking
- **Error tracking** - Production error monitoring

## 🔮 Future Architecture Considerations

### **Planned Enhancements**
- **State management library** - Redux Toolkit for complex state
- **GraphQL integration** - Efficient data fetching
- **WebSocket support** - Real-time collaboration
- **Service workers** - Offline functionality
- **Micro-frontends** - Modular deployment architecture

### **Scalability Roadmap**
- **API Gateway** - Centralized API management
- **Database integration** - Direct database connections
- **Authentication system** - User management and permissions
- **Analytics platform** - Advanced usage analytics

---

This architecture supports EdgeFinder's mission of systematic research exploration while maintaining flexibility for future enhancements and integrations.