Key Features:
📊 What Gets Tracked

Feature usage: Which functions customers use most
Session data: How often they open the spreadsheet
Performance: How long operations take
Errors: When things go wrong (helps you improve)
User journey: Setup completion, daily workflow patterns

🔒 Privacy-First Design

No PII collected: No names, emails, or personal data
Anonymous IDs: Each installation gets a random ID
Opt-out ready: Single flag to disable entirely
Transparent: Built-in dashboard shows users what's tracked

🎯 Business Intelligence You'll Get
- Which features are most used (prioritize development)
- Daily vs. monthly active users
- Average session length
- Error rates (identify bugs)
- Setup completion rate
- Feature adoption over time
How It Works:

Events are queued locally (no delays in user experience)
Batched sends (every 10 events or periodically)
Separate collection endpoint (clean architecture)
Data stored in Google Sheets (easy to analyze)

Setup Process:
Step 1: Create Data Collection Endpoint
1. New Google Apps Script project
2. Copy the doPost() function
3. Deploy as Web App
4. Get the URL
Step 2: Update Your Code
Replace function calls in your menu:
javascriptmenu.addItem('Log Sales', 'processDailyWithAnalytics')
    .addItem('Recalculate', 'recalcMtdFromMonthlyWithAnalytics')
Step 3: Add Analytics Dashboard
javascriptmenu.addItem('📊 View Analytics', 'showAnalyticsDashboard')
What You'll See in Your Data:
Sample Analytics Dashboard:
📊 Install Date: Jan 15, 2025
📈 Total Sessions: 47
🔥 Most Used: process_daily_completed (142 times)
⏱️ Avg Duration: 1.2 seconds
❌ Error Rate: 0.8%
Monetization Insights:
This data helps you:

Identify power users for testimonials
Find inactive users for re-engagement campaigns
Optimize pricing based on usage patterns
Build the right features (data-driven roadmap)
Reduce churn by catching errors early

Privacy Compliance:
✅ GDPR compliant (no personal data)
✅ No third-party services
✅ User-visible dashboard
✅ Easy opt-out mechanism
