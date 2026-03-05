# Contributing to EdgeFinder

Thank you for your interest in contributing to EdgeFinder! This document provides guidelines and information for contributors.

## 🎯 Project Vision

EdgeFinder aims to revolutionize research exploration by providing systematic tools for discovering breakthrough opportunities at the edges of knowledge. We're building a platform that combines human-centered design with AI-powered insights to accelerate innovation.

## 🤝 How to Contribute

### **Types of Contributions**

1. **🐛 Bug Reports** - Help us identify and fix issues
2. **✨ Feature Requests** - Suggest new capabilities
3. **📝 Documentation** - Improve guides and explanations
4. **🔧 Code Contributions** - Implement features and fixes
5. **🎨 Design Improvements** - Enhance user experience
6. **🧪 Testing** - Add tests and improve coverage

### **Getting Started**

1. **Fork the repository**
```bash
git clone https://github.com/yourusername/edgefinder.git
cd edgefinder
```

2. **Set up development environment**
```bash
npm install
cp .env.example .env
npm run dev
```

3. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

## 📋 Development Guidelines

### **Code Style**

- **TypeScript** - All new code should be in TypeScript
- **Functional Components** - Use React functional components with hooks
- **Tailwind CSS** - Use Tailwind for styling (avoid custom CSS when possible)
- **ESLint** - Follow the existing ESLint configuration
- **Prettier** - Code formatting is handled automatically

### **Component Structure**
```typescript
// Component template
import React, { useState } from 'react';
import { IconName } from 'lucide-react';

interface ComponentProps {
  // Define props with TypeScript
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  const [state, setState] = useState();

  return (
    <div className="space-y-6">
      {/* Component JSX */}
    </div>
  );
};
```

### **File Organization**
- **Components** - `/src/components/` - React components
- **Services** - `/src/services/` - API integrations and external services
- **Hooks** - `/src/hooks/` - Custom React hooks
- **Types** - Define interfaces in component files or separate type files

### **Naming Conventions**
- **Components** - PascalCase (`ComponentName.tsx`)
- **Files** - camelCase (`serviceFile.ts`)
- **Variables** - camelCase (`variableName`)
- **Constants** - UPPER_SNAKE_CASE (`CONSTANT_VALUE`)

## 🎨 Design Principles

### **Apple-Level Design Aesthetics**
- **Attention to Detail** - Every pixel matters
- **Intuitive UX** - Users should understand without explanation
- **Clean Visual Hierarchy** - Clear information architecture
- **Thoughtful Animations** - Enhance, don't distract
- **Responsive Design** - Works beautifully on all devices

### **Color System**
```css
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
```

### **Spacing System**
- Use Tailwind's 8px spacing system (`space-2`, `space-4`, etc.)
- Consistent margins and padding throughout
- Proper visual hierarchy with spacing

## 🧪 Testing Guidelines

### **Testing Strategy**
- **Unit Tests** - Test individual components and functions
- **Integration Tests** - Test component interactions
- **E2E Tests** - Test complete user workflows

### **Writing Tests**
```typescript
// Example test structure
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## 🔌 Integration Guidelines

### **SuperConnector Integration**
- Use the `superConnectorService` for all API calls
- Handle offline/fallback scenarios gracefully
- Implement proper error handling and user feedback

### **API Integration Patterns**
```typescript
// Service pattern
export class ServiceName {
  private baseUrl = 'https://api.example.com';
  
  async fetchData(): Promise<DataType[]> {
    try {
      const response = await fetch(`${this.baseUrl}/endpoint`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Service error:', error);
      return this.getFallbackData();
    }
  }
}
```

## 📝 Documentation Standards

### **Code Documentation**
- **JSDoc comments** for complex functions
- **README updates** for new features
- **Inline comments** for complex logic
- **Type definitions** with clear interfaces

### **Component Documentation**
```typescript
/**
 * ComponentName - Brief description of what it does
 * 
 * @param prop1 - Description of prop1
 * @param prop2 - Description of prop2
 * @returns JSX element representing the component
 */
export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Implementation
};
```

## 🚀 Pull Request Process

### **Before Submitting**
1. **Test your changes** - Ensure everything works
2. **Run linting** - `npm run lint`
3. **Update documentation** - If needed
4. **Write clear commit messages**

### **Commit Message Format**
```
type(scope): brief description

Longer description if needed

- List any breaking changes
- Reference issues: Fixes #123
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### **PR Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] No breaking changes

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## 🐛 Bug Reports

### **Bug Report Template**
```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. macOS]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]
```

## ✨ Feature Requests

### **Feature Request Template**
```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution you'd like**
Clear description of desired feature

**Describe alternatives considered**
Other solutions you've considered

**Additional context**
Any other context or screenshots
```

## 🏆 Recognition

Contributors will be recognized in:
- **README.md** - Contributors section
- **Release notes** - Feature attribution
- **GitHub** - Contributor graphs and statistics

## 📞 Getting Help

- **GitHub Discussions** - General questions and ideas
- **GitHub Issues** - Bug reports and feature requests
- **Discord** - Real-time community chat (if available)

## 📄 Code of Conduct

### **Our Standards**
- **Be respectful** - Treat everyone with respect
- **Be inclusive** - Welcome diverse perspectives
- **Be constructive** - Provide helpful feedback
- **Be patient** - Help others learn and grow

### **Unacceptable Behavior**
- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Publishing private information

## 🎉 Thank You!

Your contributions help make EdgeFinder better for the entire research and innovation community. Every contribution, no matter how small, is valuable and appreciated!

---

**Happy Contributing! 🚀**