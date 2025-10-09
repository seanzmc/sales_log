/**
 * DEPRECATED: This file has been replaced by sales_analytics.js
 * 
 * The original usage analytics (user tracking) functionality has been removed
 * and replaced with sales analytics functionality in a dedicated module.
 * 
 * All sales analytics functionality is now in sales_analytics.js, including:
 * - calculateMonthlyAnalytics() - Main entry point for analytics calculation
 * - writeAnalyticsToMonthly() - Writes analytics to MONTHLY sheet columns S-Z
 * - getMonthlyAnalyticsSummary() - Retrieves current analytics
 * - refreshAnalyticsManually() - Manual refresh callable from menu
 * - invalidateAnalyticsCache() - Cache management
 * 
 * Integration points in 7.9.8.js:
 * - Analytics automatically calculated after processDaily() completes
 * - Analytics preserved during rolloverMonth() archiving
 * - Manual refresh available via "🔄 Refresh Analytics" menu item
 * 
 * For implementation details, see:
 * - sales_analytics.js (implementation)
 * - docs/Sales_Analytics_Architecture.md (architecture specification)
 */

// This file is intentionally left minimal as all sales analytics
// functionality has been migrated to sales_analytics.js