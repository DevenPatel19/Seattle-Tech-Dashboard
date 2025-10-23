# Seattle Tech Insights Dashboard 🚀

A professional, data-driven dashboard built with Next.js and TypeScript to visualize the Seattle tech industry landscape. This project demonstrates modern frontend development practices and real-world API integration.

![Dashboard Preview](https://github.com/DevenPatel19/Seattle-Tech-Dashboard/blob/main/public/screentshot.svg)
## ✨ Features

- **Real-time Job Market Data** - Live integration with Adzuna & GitHub Jobs APIs
- **Professional Data Visualization** - Beautiful gradient charts with Chart.js
- **Type-Safe Architecture** - Full TypeScript implementation with proper interfaces
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Smart API Fallbacks** - Multiple data sources with graceful degradation
- **Modern React Patterns** - Components, hooks, and state management
- **Comprehensive Testing** - Jest + React Testing Library with 85%+ coverage

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **APIs**: Adzuna Jobs, GitHub Jobs, Seattle Open Data
- **Testing**: Jest, React Testing Library, @testing-library/user-event
- **Deployment**: Vercel


## 🧪 Testing Strategy

### ✅ COMPREHENSIVE TEST COVERAGE ACHIEVED

### Testing Philosophy
- **Behavior Over Implementation**: Tests focus on user-observable behavior rather than implementation details
- **Critical Paths First**: Test the most important user flows and data integration points
- **Realistic Scenarios**: Mock external dependencies but test real component behavior
- **User Experience Focus**: Ensure smooth interactions and proper feedback

### Test Architecture
```bash
src/
├__tests__/
├── components/          # Component integration tests
├── services/api/        # API service unit tests  
│   ├── adapters/        # Adzuna, GitHub API tests
│   └── fallbacks/       # Fallback mechanism tests
└── setup/               # Test configuration
```

### Testing Stack
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **@testing-library/user-event** - User interaction testing

### Current Test Coverage (Week 4 - COMPLETED ✅)
### API Service Tests - FULLY COVERED

- ✅ **Adzuna API Adapter**: 5/5 tests passing
  - Environment variable validation
  - Successful API response transformation
  - Network error handling
  - HTTP status code handling
  - Missing optional field defaults
- ✅ **Jobs Fallback Service**: 4/4 tests passing
  - Primary API success scenarios
  - Fallback activation on API failure
  - Empty DAta handling
  - Generic error messaging

### Component Integration Tests
- ✅ **AdzunaTest Component**: 3/3 tests passing
  - Loading state management
  - Error message display
  - Button state transitions
- ✅ **StatsGrid Component**: Loading, success, error states

### Test infrastructure
- ✅ Jest + React Testing Library fully configured
- ✅ Environment variable handling in test environment
- ✅ Async/await patterns for reliable testing
- ✅ Mock external dependencies effectively
- ✅ TypeScript integration for type safety

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test suites
npm test -- --testPathPattern="adzuna"
npm test -- --testPathPattern="fallback"
npm test -- --testPathPattern="integration"

# Run with coverage
npm test -- --coverage

```

### Example: API Service Test
```TypeScript
// Tests API adapter with environment variables, success, and error scenarios
test('handles API errors gracefully', async () => {
  // Mock network error
  // Call fetchAdzunaJobs
  // Verify error response structure and message
});
```


### Example: Component Integration Test
```TypeScript
// Tests user experience, not implementation details
test('displays loading state during API call', async () => {
  // Mock API delay
  // Click test button
  // Verify loading state appears
  // Wait for results and verify display
});
```


### Testing Principles Demonstrated
- **1. User-Centric Testing:** Verify what users actually experience

- **2. Resilient Tests:** Tests don't break with UI/text changes

- **3. Clear Boundaries:** Mock external dependencies, test internal logic

- **4. Progressive Enhancement:** Start with critical paths, expand coverage

### Current Test Coverage (Week 4)
- ✅ **Components**: StatsGrid (loading, success, error states)
- ✅ **API Services**: Adzuna API client with error handling
- ✅ **Fallback System**: Multi-layer fallback (Adzuna → GitHub → Mock)
- ✅ **Test Utilities**: Mock data, API responses, environment setup

### Recent Test Additions:
- `adzuna.test.ts` - API client with 4 test scenarios
- `jobsFallback.test.ts` - Fallback system with priority testing
- Test coverage for critical data flow paths

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Adzuna API account (free tier)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/DevenPatel19/Seattle-Tech-Dashboard.git
   cd seattle-tech-dashboard
```
2 **Install Dependencies**
```bash
    npm install
```

3 **Set up environment variables**
```bash 
cp .env.local.example .env.local
```
Add your API credentials:
```env
NEXT_PUBLIC_ADZUNA_APP_ID=your_app_id_here
NEXT_PUBLIC_ADZUNA_APP_KEY=your_app_key_here
```
4. **Run the development server
```bash
npm run dev
```
5. **Run the test suite**
```bash
npm test
```
6. **Open [localhost](http://localhost:3000) in your browser**


## 📁 Project Structure
```text
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx       # Root layout with HTML structure
│   └── page.tsx         # Main dashboard page
├── components/          # React components
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── StatsGrid.tsx    # Key metrics display
│   │   └── TechJobsChart.tsx # Data visualization
│   ├── test/           # Development test components
│   └── ui/             # Reusable UI components
│       └── Header.tsx      # Dashboard header
├── services/           # API services and data layer
│   └── api/
│       ├── adapters/    # External API clients
│       │   ├── adzuna.ts    # Adzuna Jobs API
│       │   └── github.ts    # GitHub Jobs API
│       ├── fallbacks/   # Smart fallback system
│       ├── cache/       # Performance caching
│       └── index.ts     # Service exports
├── types/              # TypeScript definitions
│   ├── api.ts          # API response types
│   └── dashboard.ts    # Component prop types
└── (other folders)     # context, hooks, lib, styles
```
## 🎯 Technical Highlights
**TypeScript Excellence**
- Full type safety across all components
- Generic interfaces for API responses
- Proper error handling with typed exceptions

**Professional API Layer**
- Multi-source fallbacks (Adzuna → GitHub Jobs → Mock data)
- Request caching to respect rate limits
- Error resilience with graceful degradation

**Comprehensive Testing Suite**
- Unit tests for API services and data transformation
- Integration tests for user interactions and component behavior
- Mocked external dependencies for reliable testing
- Environment variable handling in test



**Modern UI/UX**
- Blue-to-Emerald gradients matching Seattle's "Emerald City" theme
- Responsive grid layouts with Tailwind CSS
- Smooth hover interactions and transitions

**Production Ready**
- Environment variable configuration
- Component-based architecture
- Performance-optimized chart rendering
- Robust error boundaries and fallback UI


## 🚧 Development Phases
### ✅ Phase 1: Foundation & API Integration
- Next.js + TypeScript setup
- Tailwind CSS styling system
- Adzuna & GitHub Jobs API integration
- Professional chart visualizations

### ✅ Phase 2: Testing & Robustness (COMPLETED)
- Comprehensive test suite with Jest and React Testing Library
- API service tests for Adzuna and fallback mechanisms
- Component integration tests for user interactions
- Error handling and graceful degradation


### 🔄 Phase 3: Advanced Features (In Progress)
- Real-time data updates
- Interactive filters and date ranges
- Additional data sources
- User authentication

### 📋 Phase 4: Production Polish
- Performance optimization
- Accessibility improvements
- Comprehensive testing (expansion)
- Deployment pipeline

## 🌐 API Integration
This project demonstrates real-world API integration with:

- Adzuna Jobs API - Primary data source for tech job postings
- GitHub Jobs API - Fallback data source
- Seattle Open Data - Economic indicators (planned)


## 🎨 Design System
- **Colors**: Professional blue-to-emerald gradients
- **Typography**: Clean, readable fonts
- **Layout**: Responsive grid with consistent spacing
- **Charts**: Accessible data visualizations with proper contrast

🎨 Design System
- Colors: Professional blue-to-emerald gradients
- Typography: Clean, readable fonts
- Layout: Responsive grid with consistent spacing
- Charts: Accessible data visualizations with proper contrast


## 🤝 Contributing
This is a portfolio project demonstrating professional development practices. Feel free to fork and adapt for your own learning!

## 📄 License
MIT License - feel free to use this project for learning and portfolio purposes.

# Built with ❤️ for the Seattle tech community