/**
 * Usage Analytics System for Sales Log Pro
 * Tracks feature usage, errors, and engagement metrics
 * Privacy-first: No PII collected, all data anonymized
 */

// Analytics Configuration
const ANALYTICS_CONFIG = {
  enabled: true, // Set to false to disable analytics entirely
  endpoint: 'https://script.google.com/macros/s/YOUR_WEBHOOK_ID/exec', // Your data collection endpoint
  batchSize: 10, // Send events in batches
  sessionTimeout: 30 * 60 * 1000, // 30 minutes in milliseconds
  anonymousId: null, // Generated once per installation
  propertyKeys: {
    anonymousId: 'ANALYTICS_ANONYMOUS_ID',
    sessionId: 'ANALYTICS_SESSION_ID',
    sessionStart: 'ANALYTICS_SESSION_START',
    eventQueue: 'ANALYTICS_EVENT_QUEUE',
    installDate: 'ANALYTICS_INSTALL_DATE',
    lastActiveDate: 'ANALYTICS_LAST_ACTIVE',
    totalSessions: 'ANALYTICS_TOTAL_SESSIONS',
    featureUsage: 'ANALYTICS_FEATURE_USAGE'
  }
};

/**
 * Initialize analytics on first run
 */
function initializeAnalytics() {
  if (!ANALYTICS_CONFIG.enabled) return;

  const props = PropertiesService.getDocumentProperties();

  // Generate anonymous ID if doesn't exist
  if (!props.getProperty(ANALYTICS_CONFIG.propertyKeys.anonymousId)) {
    const anonymousId = generateAnonymousId();
    props.setProperty(ANALYTICS_CONFIG.propertyKeys.anonymousId, anonymousId);
    props.setProperty(ANALYTICS_CONFIG.propertyKeys.installDate, new Date().toISOString());
    props.setProperty(ANALYTICS_CONFIG.propertyKeys.totalSessions, '0');
    props.setProperty(ANALYTICS_CONFIG.propertyKeys.eventQueue, '[]');

    // Track installation
    trackEvent('product_installed', {
      version: SETUP_CONFIG.version,
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Generate anonymous user ID
 */
function generateAnonymousId() {
  return 'user_' + Utilities.getUuid().replace(/-/g, '').substring(0, 16);
}

/**
 * Get or create session ID
 */
function getSessionId() {
  const props = PropertiesService.getDocumentProperties();
  const now = new Date().getTime();

  let sessionId = props.getProperty(ANALYTICS_CONFIG.propertyKeys.sessionId);
  const sessionStart = props.getProperty(ANALYTICS_CONFIG.propertyKeys.sessionStart);

  // Check if session expired
  if (!sessionId || !sessionStart || (now - parseInt(sessionStart)) > ANALYTICS_CONFIG.sessionTimeout) {
    // Create new session
    sessionId = 'session_' + now;
    props.setProperty(ANALYTICS_CONFIG.propertyKeys.sessionId, sessionId);
    props.setProperty(ANALYTICS_CONFIG.propertyKeys.sessionStart, now.toString());

    // Increment session count
    const totalSessions = parseInt(props.getProperty(ANALYTICS_CONFIG.propertyKeys.totalSessions) || '0');
    props.setProperty(ANALYTICS_CONFIG.propertyKeys.totalSessions, (totalSessions + 1).toString());

    // Track new session
    trackEvent('session_started', {
      sessionNumber: totalSessions + 1
    });
  }

  // Update last active
  props.setProperty(ANALYTICS_CONFIG.propertyKeys.lastActiveDate, new Date().toISOString());

  return sessionId;
}

/**
 * Main event tracking function
 */
function trackEvent(eventName, properties = {}) {
  if (!ANALYTICS_CONFIG.enabled) return;

  try {
    const props = PropertiesService.getDocumentProperties();

    // Ensure analytics initialized
    if (!props.getProperty(ANALYTICS_CONFIG.propertyKeys.anonymousId)) {
      initializeAnalytics();
    }

    const event = {
      event: eventName,
      anonymousId: props.getProperty(ANALYTICS_CONFIG.propertyKeys.anonymousId),
      sessionId: getSessionId(),
      timestamp: new Date().toISOString(),
      properties: {
        ...properties,
        version: SETUP_CONFIG.version,
        timezone: Session.getScriptTimeZone()
      }
    };

    // Add to queue
    addEventToQueue(event);

    // Update feature usage counter
    updateFeatureUsage(eventName);

    // Try to flush queue if batch size reached
    const queue = getEventQueue();
    if (queue.length >= ANALYTICS_CONFIG.batchSize) {
      flushEventQueue();
    }

  } catch (error) {
    // Silently fail - don't break functionality if analytics fails
    Logger.log('Analytics error: ' + error.message);
  }
}

/**
 * Add event to queue
 */
function addEventToQueue(event) {
  const props = PropertiesService.getDocumentProperties();
  const queue = getEventQueue();
  queue.push(event);
  props.setProperty(ANALYTICS_CONFIG.propertyKeys.eventQueue, JSON.stringify(queue));
}

/**
 * Get event queue
 */
function getEventQueue() {
  const props = PropertiesService.getDocumentProperties();
  const queueJson = props.getProperty(ANALYTICS_CONFIG.propertyKeys.eventQueue) || '[]';
  try {
    return JSON.parse(queueJson);
  } catch (e) {
    return [];
  }
}

/**
 * Send events to analytics endpoint
 */
function flushEventQueue() {
  if (!ANALYTICS_CONFIG.enabled) return;

  const queue = getEventQueue();
  if (queue.length === 0) return;

  try {
    const payload = {
      events: queue,
      batchTimestamp: new Date().toISOString()
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(ANALYTICS_CONFIG.endpoint, options);

    if (response.getResponseCode() === 200) {
      // Clear queue on successful send
      const props = PropertiesService.getDocumentProperties();
      props.setProperty(ANALYTICS_CONFIG.propertyKeys.eventQueue, '[]');
      Logger.log('Analytics: Sent ' + queue.length + ' events');
    }

  } catch (error) {
    Logger.log('Analytics flush error: ' + error.message);
    // Keep events in queue for next attempt
  }
}

/**
 * Update feature usage counter
 */
function updateFeatureUsage(eventName) {
  const props = PropertiesService.getDocumentProperties();
  const usageJson = props.getProperty(ANALYTICS_CONFIG.propertyKeys.featureUsage) || '{}';

  try {
    const usage = JSON.parse(usageJson);
    usage[eventName] = (usage[eventName] || 0) + 1;
    props.setProperty(ANALYTICS_CONFIG.propertyKeys.featureUsage, JSON.stringify(usage));
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Get analytics summary for current installation
 */
function getAnalyticsSummary() {
  const props = PropertiesService.getDocumentProperties();

  const summary = {
    anonymousId: props.getProperty(ANALYTICS_CONFIG.propertyKeys.anonymousId),
    installDate: props.getProperty(ANALYTICS_CONFIG.propertyKeys.installDate),
    lastActive: props.getProperty(ANALYTICS_CONFIG.propertyKeys.lastActiveDate),
    totalSessions: parseInt(props.getProperty(ANALYTICS_CONFIG.propertyKeys.totalSessions) || '0'),
    featureUsage: JSON.parse(props.getProperty(ANALYTICS_CONFIG.propertyKeys.featureUsage) || '{}'),
    queuedEvents: getEventQueue().length
  };

  return summary;
}

// ===========================================
// WRAPPED ANALYTICS FUNCTIONS
// Add these to your existing functions
// ===========================================

/**
 * Wrapped version of processDaily with analytics
 */
function processDailyWithAnalytics() {
  const startTime = new Date().getTime();

  try {
    // Track function start
    trackEvent('process_daily_started');

    // Call original function
    processDaily(); // Your existing function

    // Track success
    const duration = new Date().getTime() - startTime;
    trackEvent('process_daily_completed', {
      duration_ms: duration,
      success: true
    });

    // Flush events
    flushEventQueue();

  } catch (error) {
    // Track error
    trackEvent('process_daily_error', {
      error_message: error.message,
      error_type: error.name
    });

    // Re-throw error to maintain original behavior
    throw error;
  }
}

/**
 * Wrapped version of recalcMtdFromMonthly with analytics
 */
function recalcMtdFromMonthlyWithAnalytics() {
  const startTime = new Date().getTime();

  try {
    trackEvent('recalc_mtd_started');

    recalcMtdFromMonthly(); // Your existing function

    const duration = new Date().getTime() - startTime;
    trackEvent('recalc_mtd_completed', {
      duration_ms: duration,
      success: true
    });

    flushEventQueue();

  } catch (error) {
    trackEvent('recalc_mtd_error', {
      error_message: error.message,
      error_type: error.name
    });
    throw error;
  }
}

/**
 * Wrapped version of rolloverMonth with analytics
 */
function rolloverMonthWithAnalytics() {
  try {
    trackEvent('rollover_month_started');

    rolloverMonth(); // Your existing function

    trackEvent('rollover_month_completed', {
      success: true
    });

    flushEventQueue();

  } catch (error) {
    trackEvent('rollover_month_error', {
      error_message: error.message,
      error_type: error.name
    });
    throw error;
  }
}

/**
 * Wrapped setup wizard with analytics
 */
function runSetupWizardWithAnalytics() {
  try {
    trackEvent('setup_wizard_started');

    runSetupWizard(); // Your existing function

    trackEvent('setup_wizard_completed', {
      success: true
    });

    flushEventQueue();

  } catch (error) {
    trackEvent('setup_wizard_error', {
      error_message: error.message,
      error_type: error.name
    });
    throw error;
  }
}

/**
 * Track spreadsheet open
 */
function onOpenWithAnalytics(e) {
  // Initialize analytics if needed
  initializeAnalytics();

  // Track spreadsheet open
  trackEvent('spreadsheet_opened', {
    trigger: e && e.authMode ? e.authMode : 'manual'
  });

  // Call original onOpen
  onOpen(e);

  // Periodic queue flush (don't do every time to avoid delays)
  const random = Math.random();
  if (random < 0.1) { // 10% of the time
    flushEventQueue();
  }
}

/**
 * Manual flush trigger (can be called from menu or time-based trigger)
 */
function flushAnalyticsNow() {
  flushEventQueue();
  SpreadsheetApp.getActiveSpreadsheet().toast('Analytics synced', 'Analytics', 2);
}

/**
 * Show analytics dashboard in sidebar
 */
function showAnalyticsDashboard() {
  const summary = getAnalyticsSummary();

  const html = HtmlService.createHtmlOutput(`
    <style>
      body { font-family: Arial, sans-serif; padding: 15px; }
      h3 { color: #4a86e8; margin-top: 0; }
      .stat { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
      .label { font-weight: bold; color: #666; font-size: 12px; }
      .value { font-size: 18px; color: #333; margin-top: 5px; }
      .feature { padding: 5px 0; border-bottom: 1px solid #eee; }
      .feature-name { font-size: 13px; }
      .feature-count { float: right; color: #4a86e8; font-weight: bold; }
      .note { font-size: 11px; color: #999; margin-top: 15px; font-style: italic; }
    </style>

    <h3>📊 Usage Analytics</h3>

    <div class="stat">
      <div class="label">Install Date</div>
      <div class="value">${new Date(summary.installDate).toLocaleDateString()}</div>
    </div>

    <div class="stat">
      <div class="label">Last Active</div>
      <div class="value">${new Date(summary.lastActive).toLocaleDateString()}</div>
    </div>

    <div class="stat">
      <div class="label">Total Sessions</div>
      <div class="value">${summary.totalSessions}</div>
    </div>

    <div class="stat">
      <div class="label">Feature Usage</div>
      ${Object.entries(summary.featureUsage)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([feature, count]) => `
          <div class="feature">
            <span class="feature-name">${feature.replace(/_/g, ' ')}</span>
            <span class="feature-count">${count}</span>
          </div>
        `).join('')}
    </div>

    ${summary.queuedEvents > 0 ? `
      <div class="stat">
        <div class="label">Queued Events</div>
        <div class="value">${summary.queuedEvents} pending sync</div>
      </div>
    ` : ''}

    <div class="note">
      🔒 All data is anonymized. Your privacy is protected.<br>
      Anonymous ID: ${summary.anonymousId.substring(0, 12)}...
    </div>
  `)
    .setTitle('Usage Analytics')
    .setWidth(300);

  SpreadsheetApp.getUi().showSidebar(html);
}

// ===========================================
// DATA COLLECTION ENDPOINT (SEPARATE SCRIPT)
// Deploy this as a separate web app to collect data
// ===========================================

/**
 * This goes in a SEPARATE Google Apps Script project
 * Deploy as Web App with "Anyone" access
 *
 * This receives analytics data and stores it in a Google Sheet
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Open your analytics data spreadsheet
    const ss = SpreadsheetApp.openById('YOUR_ANALYTICS_SPREADSHEET_ID');
    const sheet = ss.getSheetByName('Events') || ss.insertSheet('Events');

    // Ensure headers exist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Anonymous ID', 'Session ID', 'Event', 'Properties', 'Version']);
    }

    // Append each event
    data.events.forEach(event => {
      sheet.appendRow([
        event.timestamp,
        event.anonymousId,
        event.sessionId,
        event.event,
        JSON.stringify(event.properties),
        event.properties.version || 'unknown'
      ]);
    });

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      received: data.events.length
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ===========================================
// INSTALLATION INSTRUCTIONS
// ===========================================

/**
 * SETUP INSTRUCTIONS:
 *
 * 1. Add this entire file to your Sales Log project
 *
 * 2. Create a separate Google Apps Script project for data collection:
 *    - Create new standalone script
 *    - Copy the doPost() function above
 *    - Deploy as Web App with "Anyone" access
 *    - Copy the deployment URL
 *
 * 3. Update ANALYTICS_CONFIG.endpoint with your deployment URL
 *
 * 4. Replace your menu function names:
 *    - processDaily → processDailyWithAnalytics
 *    - recalcMtdFromMonthly → recalcMtdFromMonthlyWithAnalytics
 *    - rolloverMonth → rolloverMonthWithAnalytics
 *    - onOpen → onOpenWithAnalytics
 *
 * 5. Add analytics dashboard to menu:
 *    menu.addItem('📊 View Analytics', 'showAnalyticsDashboard')
 *
 * 6. Optional: Set up a time-based trigger for flushAnalyticsNow()
 *    to run every 6 hours
 */
