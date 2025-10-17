// src\services\api\index.ts
// Export all our API services
export { fetchJobsWithFallback } from './fallbacks/jobsFallback';

// Export direct API adapters
export { fetchAdzunaJobs } from './adapters/adzuna';
export { fetchGitHubJobs } from './adapters/github';

// Note: We don't have a seattle client yet, so we've removed that export
// We can add it later when we implement Seattle Open Data API

// export { fetchJobsWithFallback } from './fallbacks/jobsFallback';
export { fetchSeattleEconomicData } from './client'; // Now this exists as a placeholder TODO
// export { fetchAdzunaJobs } from './adapters/adzuna';
// export { fetchGitHubJobs } from './adapters/github';