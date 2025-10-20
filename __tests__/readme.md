# Testing Tracker

## Components

- `StatsGrid.tsx` - Main data display with API integration
- `TechJobsChart.tsx` - Data visualization
- `Header.tsx` - Layout component

## Services(Critical)

- `services/api/adapters/adzuna.ts` - Primary data source

- `services/api/fallbacks/jobsFallback.ts` - Error handling

- `services/api/cache/memoryCache.ts` - Performance

- `services/api/client.ts` - Main API client

## Priority 1 (critical)

`adzuna.ts` API adapter - Data source

`jobsFallback.ts` - Error scenarios

`StatsGrid.tsx` - Main user interface

## PRIORITY 2 (IMPORTANT):

`memoryCache.ts` - Performance

`TechJobsChart.tsx` - Data visualization

API integration tests

## PRIORITY 3 (NICE TO HAVE):

`Header.tsx` - Layout

Other API clients