# Seattle Tech Insights Dashboard 🚀

A professional, data-driven dashboard built with Next.js and TypeScript to visualize the Seattle tech industry landscape. This project demonstrates modern frontend development practices and real-world API integration.

![Dashboard Preview](public\screentshot.svg)
## ✨ Features

- **Real-time Job Market Data** - Live integration with Adzuna & GitHub Jobs APIs
- **Professional Data Visualization** - Beautiful gradient charts with Chart.js
- **Type-Safe Architecture** - Full TypeScript implementation with proper interfaces
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Smart API Fallbacks** - Multiple data sources with graceful degradation
- **Modern React Patterns** - Components, hooks, and state management

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **APIs**: Adzuna Jobs, GitHub Jobs, Seattle Open Data
- **Deployment**: Vercel

## 🧪 Testing Strategy

### Testing Philosophy
- **Behavior Over Implementation**: Tests focus on user-observable behavior rather than implementation details
- **Critical Paths First**: Test the most important user flows and data integration points
- **Realistic Scenarios**: Mock external dependencies but test real component behavior

### Test Architecture
```bash
src/
├── tests/
│ ├── components/ # Component unit tests
│ ├── utils/ # Test utilities and mocks
│ └── integration/ # Integration tests
├── services/ # API service tests (coming soon)
└── ...
```

### Testing Stack
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom DOM matchers
- **@testing-library/user-event** - User interaction testing

### Test Coverage
- ✅ Component rendering states (loading, success, error)
- ✅ API integration and error handling
- ✅ User interface behavior
- ✅ Data transformation logic

### Example: StatsGrid Component Tests
```typescript
// Tests user experience, not implementation details
test('displays fallback data on API error', async () => {
  // Mock API failure
  // Render component
  // Verify user sees proper fallback UI with formatted data
  // Test passes even if exact numbers change (business logic)
});
```

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- StatsGrid.test.tsx

# Watch mode for development
npm run test:watch
```

### Testing Principles Demonstrated
- **1. User-Centric Testing:** Verify what users actually experience

- **2. Resilient Tests:** Tests don't break with UI/text changes

- **3. Clear Boundaries:** Mock external dependencies, test internal logic

- **4. Progressive Enhancement:** Start with critical paths, expand coverage



## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Adzuna API account (free tier)

### Installation

1. **Clone the repository**
```bash
   git clone <your-repo-url>
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
5. ** Open [localhost](http://localhost:3000) in your browser**

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
TypeScript Excellence
Full type safety across all components

Generic interfaces for API responses

Proper error handling with typed exceptions

Professional API Layer
Multi-source fallbacks (Adzuna → GitHub Jobs → Mock data)

Request caching to respect rate limits

Error resilience with graceful degradation

Modern UI/UX
Blue-to-Emerald gradients matching Seattle's "Emerald City" theme

Responsive grid layouts with Tailwind CSS

Smooth hover interactions and transitions

Production Ready
Environment variable configuration

Component-based architecture

Performance-optimized chart rendering

## 🚧 Development Phases
### ✅ Phase 1: Foundation & API Integration
Next.js + TypeScript setup

Tailwind CSS styling system

Adzuna & GitHub Jobs API integration

Professional chart visualizations

### 🔄 Phase 2: Advanced Features (In Progress)
Real-time data updates

Interactive filters and date ranges

Additional data sources

User authentication

### 📋 Phase 3: Production Polish
Performance optimization

Accessibility improvements

Comprehensive testing

Deployment pipeline

## 🌐 API Integration
This project demonstrates real-world API integration with:

Adzuna Jobs API - Primary data source for tech job postings

GitHub Jobs API - Fallback data source

Seattle Open Data - Economic indicators (planned)

## 🎨 Design System
Colors: Professional blue-to-emerald gradients

Typography: Clean, readable fonts

Layout: Responsive grid with consistent spacing

Charts: Accessible data visualizations with proper contrast

## 🤝 Contributing
This is a portfolio project demonstrating professional development practices. Feel free to fork and adapt for your own learning!

## 📄 License
MIT License - feel free to use this project for learning and portfolio purposes.

# Built with ❤️ for the Seattle tech community